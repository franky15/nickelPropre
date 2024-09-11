import React from 'react';
import { Link } from 'react-router-dom';

//importations des datas
import servicesData from '../datas';

const CarteServices = () => {

    //console.log(servicesData);

    return (
        <div className='CarteServices'>
           
            {
                servicesData.map((service, index) => {
                    return (

                        <Link 
                            to={`/service/${service.id}`} // Lien redirigeant vers la page du service
                            key={`service-${service.id}-${service.title}`}
                            style={{
                                textDecoration: 'none', // Pour enlever la décoration du texte sur le lien
                                color: 'inherit' // Hérite la couleur du texte
                            }}
                            className='service-link'
                        >
                            <div 
                               
                                className='service'
                                style={{
                                    backgroundImage: `url(${service.picture})`, // Utilisation correcte de backgroundImage via style
                                    backgroundSize: 'cover', // Ajuster la taille de l'image
                                    backgroundPosition: 'center', // Centrer l'image
                                    height: '100%', // Ajuster la hauteur
                                    width: '100%', // Largeur à 100%
                                   
                                    borderRadius: '10px', // Coins arrondis
                                    display: 'flex', // Utilisation de flexbox
                                    alignItems: 'flex-start', // Aligner le texte en bas
                                
                                    position: 'relative', // Permet d'utiliser position: absolute à l'intérieur
                                    overflow: 'hidden', // Masquer tout contenu dépassant

                                    // boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Ombre portée

                                }}
                            >
                                <h2>{service.title}</h2>
                            </div>
                        </Link>
                    )
                })
            }
        </div>
    );
};

export default CarteServices;
