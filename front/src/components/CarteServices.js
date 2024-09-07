import React from 'react';

//importations des datas
import servicesData from '../datas';

const CarteServices = () => {

    console.log(servicesData);

    return (
        <div className='CarteServices'>
           
            {
                servicesData.map((service, index) => {
                    return (
                        <div 
                            key={index}
                            className='service'
                            style={{
                                backgroundImage: `url(${service.picture})`, // Utilisation correcte de backgroundImage via style
                                backgroundSize: 'cover', // Ajuster la taille de l'image
                                backgroundPosition: 'center', // Centrer l'image
                                height: '400px', // Ajuster la hauteur
                                width: '48%', // Largeur à 100%
                                marginBottom: '35px', // Espacement entre les services
                                borderRadius: '10px', // Coins arrondis
                                display: 'flex', // Utilisation de flexbox
                                alignItems: 'flex-start', // Aligner le texte en bas
                             
                                position: 'relative', // Permet d'utiliser position: absolute à l'intérieur
                                overflow: 'hidden', // Masquer tout contenu dépassant

                                boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Ombre portée

                            }}
                        >
                            <h2>{service.title}</h2>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default CarteServices;
