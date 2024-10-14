import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  useNavigate, useLocation } from "react-router-dom";


import { createUser } from '../admin/user/SliceUser';
import { GetUsers } from '../admin/user';
import { addChantier } from '../admin/chantier/SliceChantier';
import contactimg from '../../images/contactimg.png';
import { getChantiers } from '../admin/chantier/SliceChantier';
import { updateUser } from '../admin/user/SliceUser';
import { updateChantier } from '../admin/chantier/SliceChantier';




const Contact = ({allChantiers, itemUpdateChoice, setItemUpdateChoice, 
      setShowItemUser, setShowContactSearchFilter, showContactSearchFilter, flagUsers, setFlagUsers, 
      component, //,componentHome ,  //showContactSearchFilter, setShowContactSearchFilter
      setShowHideInputUser, showHideInputUser,
}) => {  

   

    const location = useLocation();

    const navigate = useNavigate();

    // console.log("***itemUpdateChoice dans Contact", itemUpdateChoice);

    const dispatch = useDispatch();
    // const userStore = useSelector((state) => state.auth);

    // console.log("userStore dans Contact", userStore);


    const [propsValidated, setPropsValidated] = useState(false); // Pour vérifier si les props sont valides
    
    // Validation des props si elles sont présentes
    // useEffect(() => {
    //     if (
    //         allChantiers && 
    //         itemUpdateChoice && 
    //         setItemUpdateChoice && 
    //         setShowItemUser && 
    //         flagUsers && 
    //         setFlagUsers && 
    //         component
    //     ) {

    //         console.log('Validation des props dans Contact');

    //         setPropsValidated(true);
    //     } else {
    //         console.warn('Erreur dans la validation des props dans Contact');
    //         setPropsValidated(false);
    //     }
    // }, [allChantiers, itemUpdateChoice, setItemUpdateChoice, setShowItemUser, flagUsers, component]);

    // // Assurez-vous de ne pas exécuter le reste du code si component est undefined ou null
    // if (!component) {
    //     console.warn("La prop 'component' est undefined");
    //     return null;  // Vous pouvez choisir d'afficher un fallback ici
    // }
    
    // State pour stocker les valeurs du formulaire
    const [formData, setFormData] = useState({
        nom: itemUpdateChoice && itemUpdateChoice.nom ? itemUpdateChoice.nom : null,
        prenom: itemUpdateChoice && itemUpdateChoice.prenom ? itemUpdateChoice.prenom : null,
        email: itemUpdateChoice && itemUpdateChoice.email ? itemUpdateChoice.email : null,
        tel: itemUpdateChoice && itemUpdateChoice.tel ? itemUpdateChoice.tel : null,
        service: itemUpdateChoice && itemUpdateChoice.service ? itemUpdateChoice.service : null,
        besoin: itemUpdateChoice && itemUpdateChoice.besoin ? itemUpdateChoice.besoin : null,
        dateAppel: itemUpdateChoice && itemUpdateChoice.dateAppel ? itemUpdateChoice.dateAppel : null,
        heureAppel: itemUpdateChoice && itemUpdateChoice.heureAppel ? itemUpdateChoice.heureAppel : null,
        genre: itemUpdateChoice && itemUpdateChoice.genre ? itemUpdateChoice.genre : null,
        typeClient: itemUpdateChoice && itemUpdateChoice.typeClient ? itemUpdateChoice.typeClient : 'Particulier',
        codePostal: itemUpdateChoice && itemUpdateChoice.codePostal ? itemUpdateChoice.codePostal : null,
        region: itemUpdateChoice && itemUpdateChoice.region ? itemUpdateChoice.region : null,
        ville: itemUpdateChoice && itemUpdateChoice.ville ? itemUpdateChoice.ville : null,
        adresse: itemUpdateChoice && itemUpdateChoice.adresse ? itemUpdateChoice.adresse : null,
        password: itemUpdateChoice && itemUpdateChoice.password ? itemUpdateChoice.password : null,
        age: itemUpdateChoice && itemUpdateChoice.age ? itemUpdateChoice.age : null,
        role: itemUpdateChoice && itemUpdateChoice.role ? itemUpdateChoice.role : 'Client',
        id: itemUpdateChoice && itemUpdateChoice.Users_id ? parseInt(itemUpdateChoice.Users_id) : null,
        status: itemUpdateChoice && itemUpdateChoice.status ? itemUpdateChoice.status : null,
        prix: itemUpdateChoice && itemUpdateChoice.prix ? itemUpdateChoice.prix : null,
        datePrestation : itemUpdateChoice && itemUpdateChoice.datePrestation ? itemUpdateChoice.datePrestation : null,
        heurePrestation : itemUpdateChoice && itemUpdateChoice.heurePrestation ? itemUpdateChoice.heurePrestation : null,
        infoComplementaire : itemUpdateChoice && itemUpdateChoice.infoComplementaire ? itemUpdateChoice.infoComplementaire : null,
        prestataire : itemUpdateChoice && itemUpdateChoice.prestataire ? itemUpdateChoice.prestataire : null,
        // userCreatorId : itemUpdateChoice && itemUpdateChoice.userCreatorId ? itemUpdateChoice.userCreatorId : null,
        nombrePlaces : itemUpdateChoice && itemUpdateChoice.nombrePlaces ? itemUpdateChoice.nombrePlaces : null,
        
        Users_id : itemUpdateChoice && itemUpdateChoice.Users_id ? parseInt(itemUpdateChoice.Users_id) : null,

    });


    //fonction de reinitialisation des champs du formulaire
    const resetFormDatas = () => {

        console.log("****resetFormDatas");

            setFormData({
                nom: null,
                prenom: null,
                email: null,
                tel: null,
                service: null,
                besoin: null,
                dateAppel: null,
                heureAppel: null,
                genre: null,
                typeClient: null,
                codePostal: null,
                region: null,
                ville: null,
                adresse: null,
                password: null,
                age: null,
                role: null,

                status: null,
                prix: null,
                datePrestation: null,
                heurePrestation: null,
                infoComplementaire: null,
                prestataire: null,
                userCreatorId: null,
                nombrePlaces: null,
                commentaire: null,
                // userCreatorId : null,

            });


            setTouchedFields({});
            setErrors({});


        };


    // State pour stocker les erreurs de validation
    const [errors, setErrors] = useState({});

    // State pour suivre les champs touchés
    const [touchedFields, setTouchedFields] = useState({});

    //gestion du state de l'affichage des bons éléments
    let [isDashboard, setIsDashboard] = useState(false);

    //gestion de l'affichage des champs pour les chantiers et utilisateurs
    let [valComponentExist, setValComponentExist] = useState("");

    //gestion du state de la liste des doublons de chantiers
    let [doublonsChantiers, setDoublonsChantiers] = useState([]);

    //gestion du state d'ajout de service ou de chantier ou d'utilisateur quand on est dans le dashboard
    let [ createUserChantier, setCreateUserChantier ] = useState({
        isAddchantier: false,
        isAddUser: false,
    });

    
        

    // Fonction de gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            id: (itemUpdateChoice && itemUpdateChoice.id && valComponentExist  )? parseInt(itemUpdateChoice.id) : '',
            Users_id: (itemUpdateChoice && itemUpdateChoice.Users_id && valComponentExist ) ? parseInt(itemUpdateChoice.Users_id) : '',
        });

        // Enlève l'erreur pour le champ concerné
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }

        // Marque le champ comme touché
        setTouchedFields({
            ...touchedFields,
            [name]: true
        });
    };

    // Validation des champs
    const validateForm = () => {

        let formErrors = {};
        let isValid = true;

        if (!formData.nom) {
            isValid = false;
            formErrors.nom = "Le nom est requis.";

            console.log("****formErrors.nom", formErrors.nom);
        }

        if (!formData.prenom) {
            isValid = false;
            formErrors.prenom = "Le prénom est requis.";

            console.log("****formErrors.prenom", formErrors.prenom);
        }

        
        if(isDashboard && valComponentExist === "GetUsers"){

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!formData.email || !emailPattern.test(formData.email)) {
                isValid = false;
                formErrors.email = "Un email valide est requis.";

                console.log("****emailPattern", emailPattern);
            }

            if (!formData.password) {
                isValid = false;
                formErrors.password = "Le mot de passe est requis.";

                console.log("****form Errors password", formErrors.password);
            }


            if (!formData.role) {
                isValid = false;
                formErrors.role = "Veuillez sélectionner un rôle.";

                console.log("****form Errors role", formErrors.role);
            }

            if (!formData.typeClient) {
                isValid = false;
                formErrors.typeClient = "Veuillez sélectionner le type de client.";
            
                console.log("****form Errors typeClient", formErrors.typeClient);
            
            }

            if (!formData.genre) {
                isValid = false;
                formErrors.genre = "Veuillez sélectionner votre genre.";

                console.log("****form Errors genre", formErrors.genre);
            }

            if (!formData.codePostal) {
                isValid = false;
                formErrors.codePostal = "Le code postal est requis.";

                console.log("****form Errors codePostal", formErrors.codePostal);
            }
    
            if (!formData.region) {
                isValid = false;
                formErrors.region = "La région est requise.";

                console.log("****form Errors region", formErrors.region);
            }

            if (!formData.age || isNaN(formData.age)) {
                isValid = false;
                formErrors.age = "Veuillez entrer un âge valide.";

                console.log("****form Errors age", formErrors.age);
            }

            //////////////////

        }

        //validation des champs qui sont présent dans les chantiers et les utilisateurs
        if(!valComponentExist || (valComponentExist === "GetChantiers" || valComponentExist === "GetUsers") ){
            
            const telPattern = /^\d{10,15}$/;
            if (!formData.tel || !telPattern.test(formData.tel)) {
                isValid = false;
                formErrors.tel = "Un numéro de téléphone valide est requis (10 chiffres).";

                console.log("****formErrors.tel", formErrors.tel);
            }

            if (!formData.ville) {
                isValid = false;
                formErrors.ville = "La ville est requise.";

                console.log("****formErrors.ville", formErrors.ville);
            }

            if (!formData.adresse) {
                isValid = false;
                formErrors.adresse = "L'adresse est requise.";

                console.log("****formErrors.adresse", formErrors.adresse);
            }

        }


        //validation des champs pour les chantiers qui sont présent uniquement dans le chantier
        if(!valComponentExist || valComponentExist === "GetChantiers" ){
        

            if (!formData.service) {
                isValid = false;
                formErrors.service = "Veuillez sélectionner un service.";

                console.log("****formErrors.service", formErrors.service);
            }

            if (!formData.besoin) {
                isValid = false;
                formErrors.besoin = "Veuillez fournir plus de détails sur votre besoin.";

                console.log("****formErrors.besoin", formErrors.besoin);
            }

            // if (!formData.commentaire) {
            //     isValid = false;
            //     formErrors.besoin = "Veuillez fournir plus de détails sur votre commentaire.";

            //     console.log("****formErrors.besoin", formErrors.besoin);
            // }

            if (!formData.dateAppel) {
                isValid = false;
                formErrors.dateAppel = "Veuillez choisir une date.";

                console.log("****formErrors.dateAppel", formErrors.dateAppel);
            }

            if (!formData.heureAppel) {
                isValid = false;
                formErrors.heureAppel = "Veuillez indiquer une heure pour vous appeler.";

                console.log("****formErrors.heureAppel", formErrors.heureAppel);
            }

            if (!formData.status) {
                isValid = false;
                formErrors.status = "Veuillez sélectionner un statut.";

                console.log("****formErrors.status", formErrors.status);
            }

            if (!formData.prix || isNaN(formData.prix)) {
                isValid = false;
                formErrors.prix = "Veuillez entrer un prix valide.";

                console.log("****formErrors.prix", formErrors.prix);
            }

            if (!formData.datePrestation) {
                isValid = false;
                formErrors.datePrestation = "Veuillez choisir une date de prestation.";

                console.log("****formErrors.datePrestation", formErrors.datePrestation);
            }

            if (!formData.heurePrestation) {
                isValid = false;
                formErrors.heurePrestation = "Veuillez indiquer une heure de prestation.";

                console.log("****formErrors.heurePrestation", formErrors.heurePrestation);
            }

            if (!formData.infoComplementaire) {
                isValid = false;
                formErrors.infoComplementaire = "Veuillez fournir des informations complémentaires.";

                console.log("****formErrors.infoComplementaire", formErrors.infoComplementaire);
            }

            if (!formData.prestataire) {
                isValid = false;
                formErrors.prestataire = "Le prestataire est requis.";

                console.log("****formErrors.prestataire", formErrors.prestataire);
            }

            if (!formData.nombrePlaces || isNaN(formData.nombrePlaces)) {
                isValid = false;
                formErrors.nombrePlaces = "Veuillez entrer un nombre de places valide.";

                console.log("****formErrors.nombrePlaces", formErrors.nombrePlaces);

            }

        }

       
        setErrors(formErrors);
        return isValid;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {

        e.preventDefault();

        
         
        // if (validateForm() ) {   

            // console.log("Formulaire envoyé avec succès", formData);

            //création d'un utilisateur si on est pas dans le dashboard
            if( isDashboard === false || (isDashboard && createUserChantier.isAddUser ) ){

                // console.log("****creation de l'utilisateur dans Contact");

                dispatch(createUser(formData));

                setCreateUserChantier({
                    isAddchantier: false,
                    isAddUser: false,
                });

            }else if( valComponentExist === "GetUsers"  ){  //mise à jour d'un utilisateur

                // console.log("****modification de l'utilisateur dans Contact");

                

                // console.log("***formData dans Contact", formData);

                if(formData.id){

                    dispatch(updateUser(formData));
                    
                }else{

                    console.log("Erreur dans la récupération de l'id de l'utilisateur");
                }

                setCreateUserChantier({
                    isAddchantier: false,
                    isAddUser: false,
                });

            }else if(valComponentExist === "GetChantiers" && (isDashboard && createUserChantier.isAddchantier === false )){  //mise à jour d'un chantier

                // console.log("****Modification du chantier dans Contact");

                // console.log("***formData dans Contact", formData);

                if(formData.id){

                    dispatch(updateChantier(formData));

                }else{

                    console.log("Erreur dans la récupération de l'id du chantier");
                }

                setCreateUserChantier({
                    isAddchantier: false,
                    isAddUser: false,
                });

            }else if(valComponentExist === "GetChantiers" && (isDashboard && createUserChantier.isAddchantier )){  //création d'un chantier quand on est dans le dashboard

                

                dispatch(addChantier(formData));

                setCreateUserChantier({
                    isAddchantier: false,
                    isAddUser: false,
                });

            }

         

            //déclenchement de l'effet pour récupérer les données du dashboard
            //setExecuteUseEffectFetchDashboard(prev => !prev);  //ici on inverse la valeur de prev pour déclencher l'effet ainsi elle change à chaque fois qu'on clique sur le bouton

            //resetFormDatas();
            

        // } else {

        //     console.log("****Formulaire non valide");


        // }
    };

    // console.log("**itemUpdateChoice dans Contact", itemUpdateChoice); 
    // console.log("valComponentExist", valComponentExist);

    // Style dynamique pour les champs en erreur
    const getInputStyle = (fieldName) => {
        return errors[fieldName] && touchedFields[fieldName] 
            ? { borderColor: 'red', color: 'red' } 
            : {};
    };

    //fonction de gestion de l'affichage des bons éléments et champs
    useEffect(() => {

        if(location.pathname.includes("/admin/dashboard") ){
           
            setIsDashboard(true);
            
            if(component && component.length > 0){

                setValComponentExist(component);
            }


        }else{
            setIsDashboard(false);
        }

    } , [ location.pathname]);

    // console.log("isDashboard dans Contact", isDashboard);
    // console.log("valComponentExist dans Contact", valComponentExist);

    //fonction de fermeture de la fenêtre modale
    // const closeModal = () => {
    //     setModalIsOpen(false);
       
    // };
   
    const statusChantier = ["Fait", "Abandonner", "Relancer", "Prospect", "Appeler", "Qualifier", "NonConverti", "En cours"];
    
    // Fonction pour afficher les statuts
    const displayStatus = (status) => {
        switch (status) {
            case "Fait": return "Fait";
            case "Abandonner": return "Abandonner";
            case "Relancer": return "Relancer";
            case "Prospect": return "Prospect";
            case "Appeler": return "Appeler";
            case "Qualifier": return "Qualifier";
            case "NonConverti": return "Non converti";
            case "Encours": return "En cours";
            default: return "Inconnu";
        }
    };
    
    //récupération de tous les doublons de allChantiers qui ont le même id que le itemUpdateChoice
    useEffect(() => {

        if( (allChantiers && allChantiers.length > 0) && itemUpdateChoice && itemUpdateChoice.id){
            
            console.log("allChantiers dans Contact", allChantiers);
            console.log("itemUpdateChoice dans Contact", itemUpdateChoice.id);

            if( component && component === "GetUsers"){
            
                console.log("component dans Contact GetUsers", component);
                console.log("itemUpdateChoice dans Contact GetUsers", itemUpdateChoice);

                console.log("allChantiers dans Contact avant", allChantiers);

                //retrait des objets undefined ou null dans allChantiers
                allChantiers = allChantiers.filter((item) => item !== null && item !== undefined);

                const listeChantiers = allChantiers.filter((item) => {

                        
                    // console.log("item.Users_id", item.Users_id ,);
                   
                   return  item.Users_id === itemUpdateChoice.id 
                });
                
                console.log("listeChantiers dans Contact", listeChantiers);

                setDoublonsChantiers(listeChantiers);

            }else if(component && component === "GetChantiers"){

                //retrait des objets undefined ou null dans allChantiers
                allChantiers = allChantiers.filter((item) => item !== null && item !== undefined);

                const listeDoublonChantiers = allChantiers.filter((item) => item.Users_id === itemUpdateChoice.Users_id  && (item.status !== "Fait" && item.status !== "Abandonner" ));
                
                // console.log("listeDoublonChantiers dans Contact", listeDoublonChantiers);

                setDoublonsChantiers(listeDoublonChantiers);

            }

        }

    }, [allChantiers, itemUpdateChoice, component]);
    
    console.log("doublonsChantiers dans Contact", doublonsChantiers);

    // Fonction pour gérer les actions de chaque ligne
    const actionsLineTable = (item, choice, choice2 ) => {

        console.log("item choice dans Contact", item);

        
        if (choice === "modifier") {

            setItemUpdateChoice(item);
            
            //setShowContactSearchFilter(true);
            if(choice2 === "btnUserModifierChantier"){

                setFlagUsers({
                    ...flagUsers,
                    value: !flagUsers.value
                });

            }

            console.log("test dans Contact");

            // if(component === "GetUsers" || component === "GetChantiers"){
            //     setShowContactSearchFilter(false);

            //     console.log("test dans Contact");
            // }

                setCreateUserChantier({
                    isAddchantier: true,
                    isAddUser: false,
                });

            //setModalContact(true);
            //closeModalContact();
            

            // setFormData({itemUpdateChoice});


        } else if (choice === "telecharger") {
           
            // setactionsTable({
            //     telecharger: !actionsTable.telecharger,
            //     modifier: false,
            //     supprimer: false,
            // });

            //setFormData({item});

        } else if (choice === "supprimer") {
            
            // setactionsTable({
            //     telecharger: false,
            //     modifier: false,
            //     supprimer: !actionsTable.supprimer,
            // });

        }

    };

    console.log("flagUsers dans Contact", flagUsers);

    //mise à jour du state formData si itemUpdateChoice est modifié
    useEffect(() => {

        if (itemUpdateChoice && itemUpdateChoice.id) {

            //utilisation du callback pour éviter une boucle infinie ainsi on compare les anciennes valeurs avec les nouvelles valeurs si c'est différent on met à jour le state si non on retourne les anciennes valeurs
            setFormData((prevFormData) => {

                if (JSON.stringify(prevFormData) !== JSON.stringify(itemUpdateChoice)) {
                    return {
                        ...formData,
                        nom: itemUpdateChoice.nom, // || '',
                        prenom: itemUpdateChoice.prenom, // || '',
                        email: itemUpdateChoice.email, // || '',
                        tel: itemUpdateChoice.tel, // || '',
                        service: itemUpdateChoice.service, // || '',
                        besoin: itemUpdateChoice.besoin, // || '',
                        dateAppel: itemUpdateChoice.dateAppel,// || ''
                        heureAppel: itemUpdateChoice.heureAppel ,// || ''
                        genre: itemUpdateChoice.genre, // || '',
                        typeClient: itemUpdateChoice.typeClient || 'Particulier',
                        codePostal: itemUpdateChoice.codePostal,// || ''
                        region: itemUpdateChoice.region || '',
                        ville: itemUpdateChoice.ville ,// || ''
                        adresse: itemUpdateChoice.adresse ,// || ''
                        password: itemUpdateChoice.password ,// || ''
                        age: itemUpdateChoice.age,// || ''
                        role: itemUpdateChoice.role,// || ''
                        status: itemUpdateChoice.status,// || ''
                        prix: itemUpdateChoice.prix,// || ''
                        datePrestation: itemUpdateChoice.datePrestation,// || '',
                        heurePrestation: itemUpdateChoice.heurePrestation ,//|| '',
                        infoComplementaire: itemUpdateChoice.infoComplementaire || '',
                        prestataire: itemUpdateChoice.prestataire,// || ''
                        nombrePlaces: itemUpdateChoice.nombrePlaces,// || ''
                        commentaire: itemUpdateChoice.commentaire || null
                        // userCreatorId: itemUpdateChoice.userCreatorId,// || ''
                    };
                }
                return prevFormData;

            });


        }

    }, [itemUpdateChoice]);
    

    // console.log("formData dans Contact", formData);

    const listeEnteteServices = ["Service", "Status", "Prix", "Date", "Heure", "Prestataire"];

    //réinitialisation des champs du formulaire en cliquant sur le bouton ajouter chantier
    const resetForm = (choice, addUser) => {

        console.log("choice dans resetForm", choice, "addUser", addUser);
        
        if(choice === "chantier"){

            setCreateUserChantier({
                isAddchantier: true,
                isAddUser: false,
            });

        }else if(choice === "user" || flagUsers.value === "GetUsers"){

            console.log("flagUsers dans resetForm", flagUsers);

            setCreateUserChantier({
                isAddchantier: false,
                isAddUser: true,
            });
        }

       if(flagUsers && flagUsers.componentflag === "GetUsers" && addUser === undefined  ){
            
            setFormData(prevFormData => ({
                ...prevFormData,  // Conservation des valeurs actuelles
                service: null,    // Réinitialise uniquement les champs spécifiques
                besoin: null,
                dateAppel: null,
                heureAppel: null,
                status: 'Prospect',  // Réinitialiser certains champs à des valeurs par défaut
                prix: null,
                datePrestation: null,
                heurePrestation: null,
                infoComplementaire: null,
                prestataire: null,
                nombrePlaces: null,
                commentaire: null,

                
            }));

       }

        if(flagUsers && flagUsers.componentflag === "GetUsers" && addUser === "addUser" ){

            setFormData(prevFormData => ({
                ...prevFormData,  // Conservation des valeurs actuelles
                nom: null,
                prenom: null,
                email: null,
                tel: null,
                genre: null,
                typeClient: 'Particulier',
                codePostal: null,
                region: null,
                ville: null,
                adresse: null,
                password: null,
                age: null,
                role: 'Client',
                commentaire: null,

                service: "",    
                besoin: "",
            
            }));
        }

        setErrors({});

        console.log("***itemUpdateChoice dans resetForm", itemUpdateChoice);
       

        // console.log("allChantiers dans Contact", allChantiers);
    };

    console.log("formData dans Contact", formData);

    

    return (
     
            
            <div className="containerContact" >
           
                
                
                <form className='Contact' 
                    style={{ 
                        width: isDashboard && "90%",
                        zIndex: isDashboard && "100",
                    }}
                    onSubmit={handleSubmit}

                >

                    {
                        isDashboard &&
                        <div className='iconLock'
                            onClick={
                                () => { 
                                    
                                    setShowItemUser({tableIsOpen: true, paginationIsOpen: true, contactIsOpen: false});
                                    setShowContactSearchFilter && setShowContactSearchFilter(true);
                              
                                }
                              
                            }
                        >
                            <p>Fermer </p>
                        
                            
                        </div>
                    }

                    {
                        isDashboard && itemUpdateChoice && itemUpdateChoice.id && doublonsChantiers && doublonsChantiers.length > 0 &&

                        <div className='serviceItem'>

                            <div className='serviceItem__header'>
                                <p className='espace'></p>
                                <p className='serviceItem__header--titleService'> Liste des services</p>

                                <div className='serviceItem__btnAdd'
                                    onClick={ () => resetForm( valComponentExist === "GetUsers" ? "user" : "chantier", valComponentExist === "GetUsers" && "addUser" ) }
                                >
                                    <p>Ajouter   <i className="fa-solid fa-plus"></i></p>
                               
                                </div>

                            </div>

                            <div className='serviceItem__item'>

                                {
                                    doublonsChantiers.length > 0 && doublonsChantiers.map((item, index) => (
                                        <div key={index} className='serviceItem__item--service'>
                                            <div  className='service serviceEqual'> <span>Service:</span> {item.service}</div>
                                            <div  className='service serviceEqual'> <span>Prestataire:</span> {item.prestataire}</div>
                                            <div  className='service servive2'><span>Status:</span> {item.status}</div>
                                            <div  className='service service3'> <span>Prix:</span> {item.prix}</div>
                                            <div  className='service service4'> <span>Date :</span> { item && item.datePrestation ? (item.datePrestation).slice(0, 10): "" }</div>
                                            <div  className='service service5'> <span>Heure :</span> {item.heurePrestation }</div>

                                            
                                            <div className='tdIcons'>
                                                <i className="fa-solid fa-download" onClick={() => actionsLineTable(item, "telecharger", "btnUserTelechargerChantier")}></i>
                                                <i className="fa-solid fa-pencil" onClick={() => actionsLineTable(item, "modifier", "btnUserModifierChantier")}></i>
                                                <i className="fa-solid fa-trash" onClick={() => actionsLineTable(item, "supprimer", "btnUserSupprimerChantier")}></i>
                                            </div>
                                        </div>

                                    ))
                                }
                            </div>
                            
                        </div>


                    }

                   { !isDashboard && <p className='titleForm'>Faites-nous part de vos souhaits en</p>}

                    {
                        
                        // !isDashboard && (valComponentExist === "GetUsers" || !valComponentExist ) &&  //////////////////////////
                        <div className='form-group'>
                            <div className='itemInputContainer'>
                                <label>Nom</label>
                                <input type='text' name='nom' placeholder='Nom*' value={formData.nom} onChange={handleChange} className='form-control itemInput' style={getInputStyle('nom')} />
                                {errors.nom && <p className="error">{errors.nom}</p>}
                            </div>

                            <div className='itemInputContainer'>
                                <label>Prénom</label>
                                <input type='text' name='prenom' placeholder='Prénom*' value={formData.prenom} onChange={handleChange} className='form-control itemInput' style={getInputStyle('prenom')} />
                                {errors.prenom && <p className="error">{errors.prenom}</p>}
                            </div>
                        </div>
                    
                    }

                    {
                        // !isDashboard && (valComponentExist === "GetUsers" || !valComponentExist ) &&   ////////////////////////////
                        <div className='form-group'>
                            <div className='itemInputContainer'>
                                <label>E-mail</label>
                                <input type='email' name='email' placeholder='E-mail*' value={formData.email} onChange={handleChange} className='form-control itemInput' style={getInputStyle('email')} />
                                {errors.email && <p className="error">{errors.email}</p>}
                            </div>

                            <div className='itemInputContainer'>
                                <label>Tel</label>
                                <input type='tel' name='tel' placeholder='Tel*' value={formData.tel} onChange={handleChange} className='form-control itemInput' style={getInputStyle('tel')} />
                                {errors.tel && <p className="error">{errors.tel}</p>}
                            </div>
                        </div>
                    
                    }

                    <div className='form-group'>

                        {
                            isDashboard && valComponentExist === "GetUsers" &&
                            <div className='itemInputContainer'>
                                <label>Genre</label>
                                <select name='genre' value={formData.genre} onChange={handleChange} className='form-control itemInput' style={getInputStyle('genre')}>
                                    <option value="">Sélectionnez votre genre*</option>
                                    <option value="Masculin">Masculin</option>
                                    <option value="Féminin">Féminin</option>
                                </select>
                                {errors.genre && <p className="error">{errors.genre}</p>}
                            </div>
                        
                        }

                        {

                            !showHideInputUser && //  (!valComponentExist || valComponentExist === "GetChantiers" || (valComponentExist === "GetUsers" &&  showHideInputUser)  ) && 
                            <div className='itemInputContainer'>
                                <label>Service</label>
                                <select name='service' value={formData.service} onChange={handleChange} className='form-control itemInput' style={getInputStyle('service')}>
                                    <option value="">Sélectionnez un service*</option>
                                    <option value="Nettoyage de moquettes à domicile">Nettoyage de moquettes à domicile</option>
                                    <option value="Remise à neuf et Siège Automobile">Remise à neuf et Siège Automobile</option>
                                    <option value="Nettoyage de Matelas">Nettoyage de Matelas</option>
                                    <option value="Nettoyage de Canapé">Nettoyage de Canapé</option>
                                </select>
                                {errors.service && <p className="error">{errors.service}</p>}
                            </div>
                        
                        }
                    </div>

                    {
                       !showHideInputUser &&//(!valComponentExist || valComponentExist === "GetChantiers" || valComponentExist === "GetUsers" ) &&
                        <div className='form-group'>
                            <label>Besoin</label>
                            <textarea name='besoin' placeholder='Dites-nous en plus sur votre besoin*' value={formData.besoin} onChange={handleChange} className='form-control' style={getInputStyle('besoin')} />
                            {errors.besoin && <p className="error">{errors.besoin}</p>}
                        </div>
                    }

                    {
                        !showHideInputUser && valComponentExist === "GetUsers" &&
                        <div className='form-group'>
                            <label>Commentaire</label>
                            <textarea name='commentaire' placeholder='Plus detail sur le prospect' value={formData.commentaire} onChange={handleChange} className='form-control' style={getInputStyle('commentaire')} />
                            {/* {errors.besoin && <p className="error">{errors.besoin}</p>} */}
                        </div>
                    }

                    {
                        isDashboard && valComponentExist === "GetUsers" &&
                        <div className='form-group'>
                            <div className='itemInputContainer'>
                                <label>Code Postal</label>
                                <input type='text' name='codePostal' placeholder='Code Postal*' value={formData.codePostal} onChange={handleChange} className='form-control itemInput' style={getInputStyle('codePostal')} />
                                {errors.codePostal && <p className="error">{errors.codePostal}</p>}
                            </div>

                            <div className='itemInputContainer'>
                                <label>Région</label>
                                <input type='text' name='region' placeholder='Région*' value={formData.region} onChange={handleChange} className='form-control itemInput' style={getInputStyle('region')} />
                                {errors.region && <p className="error">{errors.region}</p>}
                            </div>
                        </div>
                    
                    }

                    {
                        isDashboard && (valComponentExist === "GetChantiers" || (flagUsers.componentHome === "GetUsers" && !flagUsers.value )) &&  
                        <>
                           
                            <div className='form-group'>
                                <label>Statut</label>
                                <select
                                    name='status'
                                    className='form-control itemInput'
                                    style={getInputStyle('status')}
                                    value={formData.status}
                                    onChange={handleChange}
                                >
                                    <option value="">Statut</option>
                                    {statusChantier.map((status, index) => (
                                        <option key={index} value={status}>
                                            {displayStatus(status).charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className='form-group'>
                                <div className='itemInputContainer'>
                                    <label>Prix</label>
                                    <input type='number' name='prix' placeholder='Prix*' value={formData.prix} onChange={handleChange} className='form-control itemInput' style={getInputStyle('prix')} />
                                    {errors.prix && <p className="error">{errors.prix}</p>}
                                </div>

                                <div className='itemInputContainer'>
                                    <label>Date de prestation</label>
                                    <input type='date' name='datePrestation' value={formData.datePrestation} onChange={handleChange} className='form-control itemInput' style={getInputStyle('datePrestation')} />
                                    {errors.datePrestation && <p className="error">{errors.datePrestation}</p>}
                                </div>
                            </div>

                            <div className='form-group'>
                                <div className='itemInputContainer'>
                                    <label>Heure de prestation</label>
                                    <input type='time' name='heurePrestation' value={formData.heurePrestation} onChange={handleChange} className='form-control itemInput' style={getInputStyle('heurePrestation')} />
                                    {errors.heurePrestation && <p className="error">{errors.heurePrestation}</p>}
                                </div>

                                <div className='itemInputContainer'>
                                    <label>Informations complémentaires</label>
                                    <input type='text' name='infoComplementaire' placeholder='Informations complémentaires' value={formData.infoComplementaire} onChange={handleChange} className='form-control itemInput' style={getInputStyle('infoComplementaire')} />
                                    {errors.infoComplementaire && <p className="error">{errors.infoComplementaire}</p>}
                                </div>
                            </div>

                            <div className='form-group'>
                                <div className='itemInputContainer'>
                                    <label>Prestataire</label>
                                    <input type='text' name='prestataire' placeholder='Prestataire*' value={formData.prestataire} onChange={handleChange} className='form-control itemInput' style={getInputStyle('prestataire')} />
                                    {errors.prestataire && <p className="error">{errors.prestataire}</p>}
                                </div>

                                {/*<div className='itemInputContainer'>
                                    <label>Utilisateur ayant crée cette fiche</label>
                                    <input type='text' name='userCreatorId' placeholder='UserCreatorId*' value={formData.userCreatorId} onChange={handleChange} className='form-control itemInput' style={getInputStyle('userCreatorId')} />
                                    {errors.userCreatorId && <p className="error">{errors.userCreatorId}</p>}
                                </div>*/}
                            </div>
                            
                            <div className='form-group'>
                                <div className='itemInputContainer'>
                                    <label>Nombre de places</label>
                                    <input type='number' name='nombrePlaces' placeholder='Nombre de places*' value={formData.nombrePlaces} onChange={handleChange} className='form-control itemInput' style={getInputStyle('nombrePlaces')} />
                                    {errors.nombrePlaces && <p className="error">{errors.nombrePlaces}</p>}
                                </div>
                            </div>

                        </>


                    }

                    <div className='form-group'>
                        <div className='itemInputContainer'>
                            <label>Ville</label>
                            <input type='text' name='ville' placeholder='Ville*' value={formData.ville} onChange={handleChange} className='form-control itemInput' style={getInputStyle('ville')} />
                            {errors.ville && <p className="error">{errors.ville}</p>}
                        </div>

                       { 
                         isDashboard && 
                       
                       <div className='itemInputContainer'>
                            <label>Adresse</label>
                            <input type='text' name='adresse' placeholder='Adresse*' value={formData.adresse} onChange={handleChange} className='form-control itemInput' style={getInputStyle('adresse')} />
                            {errors.adresse && <p className="error">{errors.adresse}</p>}
                        </div>
                        
                        }

                    </div>

                    {
                         isDashboard && valComponentExist === "GetUsers" &&
                        <div className='form-group'>

                            <div className='itemInputContainer'>
                                <label>Mot de passe</label>
                                <input type='password' name='password' placeholder='Mot de passe*' value={formData.password} onChange={handleChange} className='form-control itemInput' style={getInputStyle('password')} />
                                {errors.password && <p className="error">{errors.password}</p>}
                            </div>

                            <div className='itemInputContainer'>
                                <label>Âge</label>
                                <input type='number' name='age' placeholder='Âge*' value={formData.age} onChange={handleChange} className='form-control itemInput' style={getInputStyle('age')} />
                                {errors.age && <p className="error">{errors.age}</p>}
                            </div>
                        </div>
                    
                    }

                    {       
                         (!valComponentExist || valComponentExist === "GetChantiers" || valComponentExist === "GetUsers"  ) &&
                        <div className='form-group'>
                            <div className='itemInputContainer'>
                                <label>Quand pouvons-nous vous appeler ?</label>
                                <input type='date' name='dateAppel' value={formData.dateAppel} onChange={handleChange} className='form-control itemInput' style={getInputStyle('dateAppel')} />
                                {errors.dateAppel && <p className="error">{errors.dateAppel}</p>}
                            </div>

                            <div className='itemInputContainer'>
                                <label> A quelles Heure ?</label>
                                <input type='time' name='heureAppel' value={formData.heureAppel} onChange={handleChange} className='form-control itemInput' style={getInputStyle('heureAppel')} />
                                {errors.heureAppel && <p className="error">{errors.heureAppel}</p>}
                            </div>
                        </div>
                    
                    }

                    {
                         (isDashboard && valComponentExist === "GetUsers" || (flagUsers.componentHome === "GetUsers" && !flagUsers.value ) ) &&
                        <div className='form-group'>
                            <div className='itemInputContainer'>

                                <label>Type de client</label>
                                <select name='typeClient' value={formData.typeClient} onChange={handleChange} className='form-control itemInput' style={getInputStyle('typeClient')}>
                                    <option value="">Type de client*</option>
                                    <option value="Professionnel">Professionnel</option>
                                    <option value="Particulier">Particulier</option>
                                </select>
                                {errors.typeClient && <p className="error">{errors.typeClient}</p>}
                            
                            
                            </div>
                        </div>
                    
                    }

                    {
                         (isDashboard && valComponentExist === "GetUsers") &&
                        
                        <div className='form-group'>
                            <label>Rôle</label>
                            <select name='role' value={formData.role} onChange={handleChange} className='form-control itemInput' style={getInputStyle('role')}>
                                <option value="">Sélectionnez un rôle*</option>
                                <option value="Admin">Admin</option>
                                <option value="User">User</option>
                                <option value="Client">Client</option>
                                <option value="Prestataire">Prestataire</option>
                            </select>
                            {errors.role && <p className="error">{errors.role}</p>}
                        </div>
                    }

                    

                    

                    <button type='submit' className='btn__contact'>{
                        !isDashboard ? "Envoyer" : "Enregistrer"
                    }</button>
                </form>

                {
                    !isDashboard &&
                    <div className='containerContact__im'
                    style={{
                        backgroundImage: `url(${contactimg})`,
                        backgroundSize: 'cover',
                        backgroundRepeat: "no-repeat",
                    }}
                    ></div>
                
                }
            </div>
      
    );
};

export default Contact;
