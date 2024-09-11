import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

//importations des datas
import servicesData from '../../datas';
import Revieuws from '../../components/Revieuws';

const Service = () => {

    const { id } = useParams();
    
    // console.log('id', id);
    // console.log('servicesData', servicesData);


    const [service, setService] = useState({});

    useEffect(() => {

        if(id && servicesData  && servicesData.length > 0){

            //console.log('***Bienvenue dans  use effect condition', servicesData);

            const serviceData = servicesData.find(service => service.id === parseInt(id));
            setService({...serviceData});

        }
        
    }
    , [id]);

    //console.log('service', service);

    return (
        <div className='ServiceContainer'>

            {
                service  !== undefined && 
                <>
                
                <div 
                    className='service'
                    style={{
                        backgroundImage: `url(${service.picture})`, // Utilisation correcte de backgroundImage via style
                        backgroundSize: 'cover', // Ajuster la taille de l'image
                        backgroundPosition: 'center', // Centrer l'image
                        
                        borderRadius: '10px', // Coins arrondis
                        // display: 'flex', // Utilisation de flexbox
                        // alignItems: 'flex-start', // Aligner le texte en bas
                    
                        position: 'relative', // Permet d'utiliser position: absolute à l'intérieur
                        overflow: 'hidden', // Masquer tout contenu dépassant

                       // boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Ombre portée

                    }}
                >
                  
                </div>
              

                </>
            
            }


            <div className='ServiceContainer__describ'>

                <h1>{service.title}</h1>
                <p>{service.description}</p>
                
                <div className='ServiceContainer__describ--details'>

                        {service.details && service.details.map((detail, index) => {
                            return (
                                <div key={`ServiceContainer-${service.id}-${service.title}`} className='describ--detailsItemp'>
                                    <p> <i className="fa-solid fa-check"></i>{detail}</p>
                                </div>
                            );

                        })
                        }
                </div>

                <Revieuws/>
                <button className='btn__contact'>Nous contacter</button>
            </div>

            
           
           
            
            

        </div>
    );
};

export default Service;