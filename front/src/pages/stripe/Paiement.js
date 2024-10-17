import React, { useState } from 'react';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('VOTRE_PUB_KEY_STRIPE'); // Remplacez par votre clé publique Stripe

const Paiment = () => {
    const stripe = useStripe();
    const elements = useElements();

    const [formData, setFormData] = useState({
        email: '',
        nom: '',
        prenom: '',
        tel: '',
        service: 'Nettoyage de canapé',
        prix: 150,
        adresse: '',
        ville: '',
        codePostal: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email requis';
        if (!formData.nom) newErrors.nom = 'Nom requis';
        if (!formData.prenom) newErrors.prenom = 'Prénom requis';
        if (!formData.tel) newErrors.tel = 'Numéro de téléphone requis';
        if (!formData.adresse) newErrors.adresse = 'Adresse requise';
        if (!formData.ville) newErrors.ville = 'Ville requise';
        if (!formData.codePostal) newErrors.codePostal = 'Code postal requis';
        return newErrors;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return; // Ne pas soumettre si des erreurs existent

        setLoading(true);
        const { data } = await axios.post('/stripe/create-checkout-session', formData);

        if (data.id) {
            const result = await stripe.redirectToCheckout({ sessionId: data.id });
            if (result.error) {
                console.error(result.error.message);
            }
        }

        setLoading(false);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} />
                {errors.email && <p>{errors.email}</p>}
            </div>
            <div>
                <label>Nom</label>
                <input type="text" name="nom" value={formData.nom} onChange={handleChange} />
                {errors.nom && <p>{errors.nom}</p>}
            </div>
            <div>
                <label>Prénom</label>
                <input type="text" name="prenom" value={formData.prenom} onChange={handleChange} />
                {errors.prenom && <p>{errors.prenom}</p>}
            </div>
            <div>
                <label>Téléphone</label>
                <input type="tel" name="tel" value={formData.tel} onChange={handleChange} />
                {errors.tel && <p>{errors.tel}</p>}
            </div>
            <div>
                <label>Adresse</label>
                <input type="text" name="adresse" value={formData.adresse} onChange={handleChange} />
                {errors.adresse && <p>{errors.adresse}</p>}
            </div>
            <div>
                <label>Ville</label>
                <input type="text" name="ville" value={formData.ville} onChange={handleChange} />
                {errors.ville && <p>{errors.ville}</p>}
            </div>
            <div>
                <label>Code Postal</label>
                <input type="text" name="codePostal" value={formData.codePostal} onChange={handleChange} />
                {errors.codePostal && <p>{errors.codePostal}</p>}
            </div>
            <div>
                <label>Service</label>
                <input type="text" name="service" value={formData.service} readOnly />
            </div>
            <div>
                <label>Prix</label>
                <input type="number" name="prix" value={formData.prix} readOnly />
            </div>
            <button type="submit" disabled={!stripe || loading}>
                {loading ? 'Chargement...' : 'Payer'}
            </button>
        </form>
    );
};

export default Paiment;
