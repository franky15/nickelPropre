import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createUser } from '../admin/user/SliceUser';
import contactimg from '../../images/contactimg.png';

const Contact = () => {
    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.auth);

    console.log("userStore dans Contact", userStore);

    // State pour stocker les valeurs du formulaire
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        email: '',
        tel: '',
        service: '',
        besoin: '',
        dateAppel: '',
        heureAppel: '',
        genre: '',
        typeClient: '',
        codePostal: '',
        region: '',
        ville: '',
        adresse: '',
        password: '',
        age: '',
        role: ''
    });

    // State pour stocker les erreurs de validation
    const [errors, setErrors] = useState({});

    // State pour suivre les champs touchés
    const [touchedFields, setTouchedFields] = useState({});

    // Fonction de gestion des changements dans les champs du formulaire
    const handleChange = (e) => {
        const { name, value } = e.target;
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

        if (!formData.besoin) {
            isValid = false;
            formErrors.besoin = "Veuillez fournir plus de détails sur votre besoin.";
        }

        if (!formData.dateAppel) {
            isValid = false;
            formErrors.dateAppel = "Veuillez choisir une date.";
        }

        if (!formData.heureAppel) {
            isValid = false;
            formErrors.heureAppel = "Veuillez indiquer une heure pour vous appeler.";
        }

        if (!formData.genre) {
            isValid = false;
            formErrors.genre = "Veuillez sélectionner votre genre.";
        }

        if (!formData.typeClient) {
            isValid = false;
            formErrors.typeClient = "Veuillez sélectionner le type de client.";
        }

        if (!formData.codePostal) {
            isValid = false;
            formErrors.codePostal = "Le code postal est requis.";
        }

        if (!formData.region) {
            isValid = false;
            formErrors.region = "La région est requise.";
        }

        if (!formData.ville) {
            isValid = false;
            formErrors.ville = "La ville est requise.";
        }

        if (!formData.adresse) {
            isValid = false;
            formErrors.adresse = "L'adresse est requise.";
        }

        if (!formData.password) {
            isValid = false;
            formErrors.password = "Le mot de passe est requis.";
        }

        if (!formData.age || isNaN(formData.age)) {
            isValid = false;
            formErrors.age = "Veuillez entrer un âge valide.";
        }

        if (!formData.role) {
            isValid = false;
            formErrors.role = "Veuillez sélectionner un rôle.";
        }

        setErrors(formErrors);
        return isValid;
    };

    // Gestion de la soumission du formulaire
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validateForm()) {
            console.log("Formulaire envoyé avec succès", formData);

            dispatch(createUser(formData));

            // Réinitialise le formulaire après la soumission réussie
            setFormData({
                nom: '',
                prenom: '',
                email: '',
                tel: '',
                service: '',
                besoin: '',
                dateAppel: '',
                heureAppel: '',
                genre: '',
                typeClient: '',
                codePostal: '',
                region: '',
                ville: '',
                adresse: '',
                password: '',
                age: '',
                role: ''
            });

            setTouchedFields({});

            setErrors({});
        } else {
            console.log("****Formulaire non valide");
        }
    };

    // Style dynamique pour les champs en erreur
    const getInputStyle = (fieldName) => {
        return errors[fieldName] && touchedFields[fieldName] 
            ? { borderColor: 'red', color: 'red' } 
            : {};
    };

    return (
        <div className="containerContact">
            <form className='Contact' onSubmit={handleSubmit}>
                <p className='titleForm'>Faites-nous part de vos souhaits en</p>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <input type='text' name='nom' placeholder='Nom*' value={formData.nom} onChange={handleChange} className='form-control itemInput' style={getInputStyle('nom')} />
                        {errors.nom && <p className="error">{errors.nom}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <input type='text' name='prenom' placeholder='Prénom*' value={formData.prenom} onChange={handleChange} className='form-control itemInput' style={getInputStyle('prenom')} />
                        {errors.prenom && <p className="error">{errors.prenom}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <input type='email' name='email' placeholder='E-mail*' value={formData.email} onChange={handleChange} className='form-control itemInput' style={getInputStyle('email')} />
                        {errors.email && <p className="error">{errors.email}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <input type='tel' name='tel' placeholder='Tel*' value={formData.tel} onChange={handleChange} className='form-control itemInput' style={getInputStyle('tel')} />
                        {errors.tel && <p className="error">{errors.tel}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <select name='genre' value={formData.genre} onChange={handleChange} className='form-control itemInput' style={getInputStyle('genre')}>
                            <option value="">Sélectionnez votre genre*</option>
                            <option value="Masculin">Masculin</option>
                            <option value="Féminin">Féminin</option>
                        </select>
                        {errors.genre && <p className="error">{errors.genre}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <select name='typeClient' value={formData.typeClient} onChange={handleChange} className='form-control itemInput' style={getInputStyle('typeClient')}>
                            <option value="">Type de client*</option>
                            <option value="Professionnel">Professionnel</option>
                            <option value="Particulier">Particulier</option>
                        </select>
                        {errors.typeClient && <p className="error">{errors.typeClient}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <select name='service' value={formData.service} onChange={handleChange} className='form-control itemInput' style={getInputStyle('service')}>
                            <option value="">Sélectionnez un service*</option>
                            <option value="Nettoyage de moquettes à domicile">Nettoyage de moquettes à domicile</option>
                            <option value="Remise à neuf et Siège Automobile">Remise à neuf et Siège Automobile</option>
                            <option value="Nettoyage de Matelas">Nettoyage de Matelas</option>
                            <option value="Nettoyage de Canapé">Nettoyage de Canapé</option>
                        </select>
                        {errors.service && <p className="error">{errors.service}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <input type='text' name='codePostal' placeholder='Code Postal*' value={formData.codePostal} onChange={handleChange} className='form-control itemInput' style={getInputStyle('codePostal')} />
                        {errors.codePostal && <p className="error">{errors.codePostal}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <input type='text' name='region' placeholder='Région*' value={formData.region} onChange={handleChange} className='form-control itemInput' style={getInputStyle('region')} />
                        {errors.region && <p className="error">{errors.region}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <input type='text' name='ville' placeholder='Ville*' value={formData.ville} onChange={handleChange} className='form-control itemInput' style={getInputStyle('ville')} />
                        {errors.ville && <p className="error">{errors.ville}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <input type='text' name='adresse' placeholder='Adresse*' value={formData.adresse} onChange={handleChange} className='form-control itemInput' style={getInputStyle('adresse')} />
                        {errors.adresse && <p className="error">{errors.adresse}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <input type='password' name='password' placeholder='Mot de passe*' value={formData.password} onChange={handleChange} className='form-control itemInput' style={getInputStyle('password')} />
                        {errors.password && <p className="error">{errors.password}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <input type='number' name='age' placeholder='Âge*' value={formData.age} onChange={handleChange} className='form-control itemInput' style={getInputStyle('age')} />
                        {errors.age && <p className="error">{errors.age}</p>}
                    </div>
                </div>

                <div className='form-group'>
                    <select name='role' value={formData.role} onChange={handleChange} className='form-control itemInput' style={getInputStyle('role')}>
                        <option value="">Sélectionnez un rôle*</option>
                        <option value="Admin">Admin</option>
                        <option value="User">User</option>
                        <option value="Client">Client</option>
                        <option value="Prestataire">Prestataire</option>
                    </select>
                    {errors.role && <p className="error">{errors.role}</p>}
                </div>

                <div className='form-group'>
                    <textarea name='besoin' placeholder='Dites-nous en plus sur votre besoin*' value={formData.besoin} onChange={handleChange} className='form-control' style={getInputStyle('besoin')} />
                    {errors.besoin && <p className="error">{errors.besoin}</p>}
                </div>

                <div className='form-group'>
                    <div className='itemInputContainer'>
                        <input type='date' name='dateAppel' value={formData.dateAppel} onChange={handleChange} className='form-control itemInput' style={getInputStyle('dateAppel')} />
                        {errors.dateAppel && <p className="error">{errors.dateAppel}</p>}
                    </div>

                    <div className='itemInputContainer'>
                        <input type='time' name='heureAppel' value={formData.heureAppel} onChange={handleChange} className='form-control itemInput' style={getInputStyle('heureAppel')} />
                        {errors.heureAppel && <p className="error">{errors.heureAppel}</p>}
                    </div>
                </div>

                <button type='submit' className='btn__contact'>Envoyer</button>
            </form>

            <div className='containerContact__im'
                style={{
                    backgroundImage: `url(${contactimg})`,
                    backgroundSize: 'cover',
                    backgroundRepeat: "no-repeat",
                }}
            ></div>
        </div>
    );
};

export default Contact;
