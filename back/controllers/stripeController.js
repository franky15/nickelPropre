//importation de la base de données
const DB = require("../mysql.config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//const { path } = require("../app");

const path = require("path");
//importation du package pour les variables d'environnement
const dotenv = require("dotenv").config();

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Mettez votre clé secrète Stripe ici


////////////////////////////////////////// 

/*
Résumé du processus complet  pour le checkout session et le webhook de stripe:

1- L'utilisateur remplit le formulaire de paiement.
2- La route /stripe/create-checkout-session est appelée pour créer une session de paiement.
3- L'utilisateur est redirigé vers Stripe pour entrer ses informations de paiement.
4- Après validation du paiement, l'utilisateur est redirigé vers la success_url ou cancel_url.
5- Stripe envoie une notification automatique à la route /stripe/stripe-webhook pour notifier mon  serveur que le paiement a été effectué.
6-  Enfin toute la logique de stripeWebhook est exécutée par exemple j'ai décidé de  mettre à jour le statut du chantier dans la base de données
après que toute la partie stipe soit terminée ce qui signifie que je peux ajouter ma logique que je veux après.

*/ 

//////////////////////////////////////////

/*
cheackout session utilise les pages de paiement de stripe
on ne peut pas personnaliser le formulaire de paiement quand on utilise stripe checkout
en cas de succès ou d'annulation, stripe redirige l'utilisateur vers ses pages success_url ou cancel_url

*/
//POST creation du checkout session stripe
exports.createCheckoutSession = async (req, res) => {

    console.log('****Bienvenue dans createCheckoutSession****');

    console.log('****req.body:', req.body);

    //données provenant du formulaire de paiement
    let {  nom, prenom, email, tel, prix, idChantier} = req.body;
    // let { email, nom, prenom, tel, service, prix, adresse,ville, codePostal } = req.body;

    prix = parseFloat(prix).toFixed(2); // Convertir en decimal avec 2 décimales

    tel = parseInt(tel);
    idChantier = parseInt(idChantier);

    console.log('****idChantier:', idChantier);


    try {
        // Vérification ou création du chantier dans la base de données
        let chantierId;
 
        //récupération du chantier en cours pour un utilisateur
        let sqlSelectChantierUser = `
            SELECT * FROM Users LEFT JOIN Chantiers
            ON Users.id = Chantiers.Users_id
            WHERE  Chantiers.id = ?`;

            // let sqlSelectChantierUser = `
            // SELECT * FROM Users LEFT JOIN Chantiers
            // ON Users.id = Chantiers.Users_id
            // WHERE Users.email = ? OR Users.tel = ? AND Chantiers.id = ?`;

        let resSelectChantierUser = await DB.query(sqlSelectChantierUser, [ idChantier]); 

        console.log('****resSelectChantierUser:', resSelectChantierUser[0]);

        if (resSelectChantierUser[0].length !== 0) {
            // Si le chantier existe  on récupère son ID
            
            chantierId = resSelectChantierUser[0][0].id; 

        
        } else {
            // Si le chantier n'existe pas, 
            console.log('****Chantier non trouvé ');

           // return res.status(404).json({ message: 'Chantier non trouvé' });
        } 

        console.log('****chantierId:', chantierId);
        console.log("resSelectChantierUser[0][0.service", resSelectChantierUser[0][0].service);

        // Création de la session Stripe Checkout
        const session = await stripe.checkout.sessions.create({ 
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'eur',
                        product_data: {
                            name: resSelectChantierUser[0][0].service, // Nom du service
                        },
                        unit_amount: prix * 100, // Montant en centimes
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',

            //redirection après paiement réussi ou annulé de l'utilisateur de façon à ce que stripe puisse rediriger l'utilisateur vers ces pages puis coté front on pourra récupérer les données de la session
            //en faisant un appel à stripe pour récupérer les détails de la session
            success_url: `${process.env.CLIENT_URL}/stripe/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.CLIENT_URL}/stripe/cancel`,
            
            customer_email: email || "Manquant", // Email du client s'il est fourni
            metadata: {
                customer_name: `${nom} ${prenom}`,  // Nom et prénom du client
                customer_tel: tel,  // Numéro de téléphone du client
                service_type: resSelectChantierUser[0][0].service,  // Type de service
                chantier_id: chantierId,  // ID du chantier récupéré 
                customer_Price: parseInt(resSelectChantierUser[0][0].prix), // Prix du service
            }
        });

        // Envoi de l'URL de paiement au client
        res.status(200).json({
            url: session.url,
        });

    } catch (error) {
        res.status(500).json({
            error: 'Une erreur est survenue lors de la création de la session de paiement',
            details: error.message,
        });
    }
};

 

/*
création du webHook pour gérer les événements de paiement ici paiement terminé si le paiement est réussi
alors ce webhook est appelé il permettra de mettre à jour le statut du chantier à Fait dans la base de données
*/
//POST creation du webhook stripe
exports.stripeWebhook = async (req, res) => {

    console.log('****Bienvenue dans stripeWebhook****');

    // Récupération de la signature et de l'événement Stripe
    const sig = req.headers['stripe-signature'];

    console.log('Signature:', sig);

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
   
        console.log('Événement Stripe:', event);
        
          // Réponse au webhook
        //res.status(200).send('Webhook reçu');
    } catch (err) {
        console.error('Erreur de signature du webhook Stripe', err.message);
        return res.sendStatus(400); 
    }

    // Gestion des événements de paiement
    if (event.type === 'checkout.session.completed') {

        const session = event.data.object;  //objet provenant de l'événement Stripe checkout.session.completed

        console.log('Session complétée:', session);

        // Récupération des métadonnées de la session
        const customerName = session.metadata.customer_name;
        const customerPrice = session.metadata.customer_Price;
        const customerTel = session.metadata.customer_tel;
        const serviceType = session.metadata.service_type;
        const chantierId = session.metadata.chantier_id;
       


        // Enregistrement des données de la session dans la base de données
        console.log('****Données de la session:', customerName, customerPrice, chantierId , customerTel);

        //vérification si le chantier existe
        let sqlCheckChantier = `SELECT * FROM Chantiers WHERE id = ?`;

        try {

            let resCheckChantier = await DB.query(sqlCheckChantier, [parseInt(chantierId)]); // Remplacer 1 par l'ID du chantier concerné

            if (resCheckChantier[0].length === 0) {

                console.error('****Chantier non trouvé');
                return res.sendStatus(404);
            }

            console.log('****Chantier trouvé:', resCheckChantier[0]);

        } catch (err) {

            console.error('Erreur lors de la recherche du chantier:', err);
        }

        // Mise à jour du statut du chantier dans la base de données
        let sqlUpdateChantier = `UPDATE Chantiers SET status = ? prix = ? WHERE id = ?`;
        const column = ['Fait', customerPrice, parseInt(chantierId)];
       
        try {
            let resUpdateChantier = await DB.query(sqlUpdateChantier, [column]); // Remplacer 1 par l'ID du chantier concerné

            console.log('****Chantier mis à jour avec succès:', resUpdateChantier[0]);

        } catch (err) {
            console.error('Erreur lors de la mise à jour du chantier:', err);
        }
    }

    res.sendStatus(200); 
};


//GET récupération des détails de la session envue de les afficher sur la page de succès
exports.getSessionDetails = async (req, res) => {

    console.log('****Bienvenue dans getSession');

    const sessionId = req.params.id;

    console.log('****sessionId:', sessionId);

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        // Renvoyer les informations pertinentes au frontend
        res.status(200).json({
            customer_name: session.metadata.customer_name,
            customer_tel: session.metadata.customer_tel,
            service_type: session.metadata.service_type,
            amount_total: session.customer_Price,
        });
    } catch (error) {
        console.error('Erreur lors de la récupération des détails de la session:', error.message);
        res.status(500).json({ error: 'Erreur lors de la récupération des détails de la session' });
    }
};
