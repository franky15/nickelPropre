import React, { useState } from 'react';

const Contact = () => {
    // State pour stocker les valeurs du formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        service: '',
        message: '',
        date: ''
    });

    // State pour stocker les erreurs de validation
    const [errors, setErrors] = useState({});

    // State pour suivre les champs touchés
    const [touchedFields, setTouchedFields] = useState({});

    // Fonction de gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;

        // Met à jour les valeurs des champs
        setFormData({
            ...formData,
            [name]: value
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
        }

        if (!formData.prenom) {
            isValid = false;
            formErrors.prenom = "Le prénom est requis.";
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email || !emailPattern.test(formData.email)) {
            isValid = false;
            formErrors.email = "Un email valide est requis.";
        }

        const telPattern = /^\d{10,15}$/;
        if (!formData.tel || !telPattern.test(formData.tel)) {
            isValid = false;
            formErrors.tel = "Un numéro de téléphone valide est requis (10 chiffres).";
        }

        if (!formData.service) {
            isValid = false;
            formErrors.service = "Veuillez sélectionner un service.";
        }

        if (!formData.message) {
            isValid = false;
            formErrors.message = "Veuillez fournir plus de détails sur votre besoin.";
        }

        if (!formData.date) {
            isValid = false;
            formErrors.date = "Veuillez choisir une date.";
        }

        setErrors(formErrors);
        return isValid;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            // Si le formulaire est valide, tu peux traiter les données ici
            console.log("Formulaire envoyé avec succès", formData);

            // Réinitialise le formulaire après la soumission réussie
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                tel: '',
                service: '',
                message: '',
                date: ''
            });

            // Réinitialise les champs touchés et les erreurs
            setTouchedFields({});
            setErrors({});
        } else {
            console.log("Formulaire non valide");
        }
    };

    // Style dynamique pour les champs en erreur
    const getInputStyle = (fieldName) => {
        return errors[fieldName] && touchedFields[fieldName] 
            ? { borderColor: 'red', color: 'red' } 
            : {};
    };

    return (
        <form className='Contact' onSubmit={handleSubmit}>
            <div className='form-group'>
                <div className='itemInputContainer'>
                    <input 
                        type='text' 
                        id='nom' 
                        name='nom' 
                        className='form-control itemInput'  
                        placeholder='Nom*'
                        value={formData.nom}
                        onChange={handleChange}
                        style={getInputStyle('nom')}
                    />
                    {errors.nom && <p className="error">{errors.nom}</p>}
                </div>

                <div className='itemInputContainer'>
                    <input 
                        type='text' 
                        id='prenom' 
                        name='prenom' 
                        className='form-control itemInput' 
                        placeholder='Prénom*' 
                        value={formData.prenom}
                        onChange={handleChange}
                        style={getInputStyle('prenom')}
                    />
                    {errors.prenom && <p className="error">{errors.prenom}</p>}
                </div>
            </div>

            <div className='form-group'>
                <div className='itemInputContainer'>
                    <input 
                        type='email' 
                        id='email' 
                        name='email' 
                        className='form-control itemInput' 
                        placeholder='E-mail*' 
                        value={formData.email}
                        onChange={handleChange}
                        style={getInputStyle('email')}
                    />
                    {errors.email && <p className="error">{errors.email}</p>}
                </div>

                <div className='itemInputContainer'>
                    <input 
                        type='tel' 
                        id='tel' 
                        name='tel' 
                        className='form-control itemInput' 
                        placeholder='Tel*' 
                        value={formData.tel}
                        onChange={handleChange}
                        style={getInputStyle('tel')}
                    />
                    {errors.tel && <p className="error">{errors.tel}</p>}
                </div>
            </div>

            <div className='form-group'>
                <div className='itemInputContainer'>
                    <select
                        id='service'
                        name='service'
                        className='form-control itemInput'
                        value={formData.service}
                        onChange={handleChange}
                        style={getInputStyle('service')}
                    >
                        <option value="">Quel service souhaitez-vous ?*</option>
                        <option value="Canapé">Canapé</option>
                        <option value="Tapis">Tapis</option>
                        <option value="Fauteuil">Fauteuil</option>
                        <option value="Matelas">Matelas</option>
                        <option value="Voiture">Voiture</option>
                    </select>
                    {errors.service && <p className="error">{errors.service}</p>}
                </div>
            </div>

            <div className='form-group'>
                <textarea 
                    id='message' 
                    name='message' 
                    className='form-control' 
                    placeholder='Dites-nous en plus sur votre besoin*'
                    value={formData.message}
                    onChange={handleChange}
                    style={getInputStyle('message')}
                />
                {errors.message && <p className="error">{errors.message}</p>}
            </div>

            <div className='form-group dateInputContainer'>
                <input 
                    type='date' 
                    id='date' 
                    name='date' 
                    className='form-control dateInput'
                    value={formData.date}
                    onChange={handleChange}
                    style={getInputStyle('date')}
                />
                {errors.date && <p className="error">{errors.date}</p>}
            </div>

            <button type='submit' className='btn__contact'>Envoyer</button>
        </form>
    );
};

export default Contact;
