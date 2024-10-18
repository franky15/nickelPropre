import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Paiment = () => {

    //récupération de l'id du chantier dans l'url
    const { id, prix } = useParams();
    const idChantier = id;

    // État pour stocker les données du formulaire
    const [formData, setFormData] = useState({
        email: '',
        nom: '',
        prenom: '',
        tel: '',
        prix: prix || '',
        idChantier: idChantier || '',
    });

    // État pour stocker les erreurs de validation
    const [errors, setErrors] = useState({});

    // Expressions régulières pour valider les champs
    const regex = {
        nom: /^[a-zA-ZÀ-ÿ\s-]+$/, // Lettres, accents, espaces et tirets
        prenom: /^[a-zA-ZÀ-ÿ\s-]+$/, // Lettres, accents, espaces et tirets
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Format d'email
        tel: /^\d{10,15}$/ // Numéro de téléphone : entre 10 et 15 chiffres
    };

    // Gérer les changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Enlever l'erreur pour le champ concerné
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Valider le formulaire
    const validateForm = () => {
        const formErrors = {};
        let isValid = true;

        // Valider chaque champ avec les regex
        if (!regex.nom.test(formData.nom)) {
            isValid = false;
            formErrors.nom = "Le nom ne peut contenir que des lettres, espaces et tirets.";
        }

        if (!regex.prenom.test(formData.prenom)) {
            isValid = false;
            formErrors.prenom = "Le prénom ne peut contenir que des lettres, espaces et tirets.";
        }

        if (!regex.email.test(formData.email)) {
            isValid = false;
            formErrors.email = "Veuillez entrer un email valide.";
        }

        if (!regex.tel.test(formData.tel)) {
            isValid = false;
            formErrors.tel = "Le numéro de téléphone doit contenir entre 10 et 15 chiffres.";
        }

        // Vérification des champs requis
        Object.entries(formData).forEach(([key, value]) => {
            if (!value) {
                isValid = false;
                formErrors[key] = `${key} est requis.`;
            }
        });

        setErrors(formErrors);
        return isValid;
    };

    // Gérer la soumission du formulaire
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            console.log('***Formulaire invalide');
            return; // Ne pas soumettre si le formulaire n'est pas valide
        }

        try {
            const response = await axios.post("http://localhost:3000/stripe/create-checkout-session", formData);
            const { url } = response.data;

            // Rediriger l'utilisateur vers l'URL de paiement Stripe
            window.location.href = url;
        } catch (error) {
            console.error('Erreur lors de la création de la session de paiement:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Veuillez entrer vos informations</h2>
            
            <div>
                <label>Nom*</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
                {errors.nom && <p className="error">{errors.nom}</p>}
            </div>
            <div>
                <label>Prénom*</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
                {errors.prenom && <p className="error">{errors.prenom}</p>}
            </div>

            <div>
                <label>Email*</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div>
                <label>Téléphone*</label>
                <input type="tel" name="tel" value={formData.tel} onChange={handleChange} />
                {errors.tel && <p className="error">{errors.tel}</p>}
            </div>

            <p className='montant'>Montant à payer: {prix} €</p>
            <button type="submit">Payer</button>
        </form>
    );
};

export default Paiment;
