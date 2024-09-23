import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';

const Success = () => {

    console.log('**** bienvenue dans  Success');

    const [searchParams] = useSearchParams();

    // Récupération de l'identifiant de la session  stripe dans l'URL
    const sessionId = searchParams.get('session_id');
   
    const [sessionDetails, setSessionDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    console.log('****sessionId:', sessionId);
    

    useEffect(() => {
        if (sessionId) {
            const fetchSessionDetails = async () => {
                try {
                    // Appel à votre backend pour obtenir les détails de la session
                    const response = await axios.get(`http://localhost:3000/stripe/session/${sessionId}`);
                    setSessionDetails(response.data);
                    setLoading(false);
                } catch (err) {
                    setError('Erreur lors de la récupération des détails de la session');
                    setLoading(false);
                }
            };
            fetchSessionDetails();
        }
    }, [sessionId]);

    if (loading) {
        return <div>Chargement...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div>
            <h1>Paiement réussi !</h1>
            {sessionDetails && (
                <div>
                    <p>Nom du client : {sessionDetails.customer_name}</p>
                    <p>Service : {sessionDetails.service_type}</p>
                    <p>Montant payé : {(sessionDetails.amount_total / 100).toFixed(2)} €</p>
                </div>
            )}
        </div>
    );
};

export default Success;
