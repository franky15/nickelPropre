import React,{useState, useEffect} from 'react';
import { useParams } from 'react-router-dom';

//importations des datas
import servicesData from '../../datas';
import Revieuws from '../../components/Revieuws';

const Service = () => {

    const { id } = useParams();
    
    // console.log('id', id);
    // console.log('servicesData', servicesData);

        //gestion du state de l'affichage progressive de la page
        const [isVisibleHome, setIsVisibleHome] = useState(false);

    const [service, setService] = useState({});

    useEffect(() => {

        if(id && servicesData  && servicesData.length > 0){

            //console.log('***Bienvenue dans  use effect condition', servicesData);

            const serviceData = servicesData.find(service => service.id === parseInt(id));
            setService({...serviceData});

        }

        setTimeout(() => {
            setIsVisibleHome(true); // Déclenche l'affichage progressif
        }, 100); // Délai de 100ms avant de lancer l'animation
      
        
    }
    , [id]);

    //console.log('service', service);

    //récupération de la taille de page
    const [widthPage, setWidthPage] = useState(window.innerWidth);
    const breakpointMobile = 738;

    useEffect(() => {
        const handleResize = () => {
            setWidthPage(window.innerWidth);
        };

        //NB: le resize est un événement qui se déclenche à chaque fois que la taille de la fenêtre change
        window.addEventListener('resize', handleResize);
        
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div className={`ServiceContainer ${isVisibleHome ? 'visibleHome' : ''}`}>

            {
                service  !== undefined && 
                <>
                
                <div 
                    className='service serviceImg'
                    style={{
                        backgroundImage: `url(${service.picture})`, // Utilisation correcte de backgroundImage via style
                        backgroundSize: 'cover', // Ajuster la taille de l'image
                        backgroundPosition: 'center', // Centrer l'image
                        
                        borderRadius: '10px', // Coins arrondis
                        // display: 'flex', // Utilisation de flexbox
                        // alignItems: 'flex-start', // Aligner le texte en bas
                    
                        position: 'relative', // Permet d'utiliser position: absolute à l'intérieur
                        overflow: 'hidden', // Masquer tout contenu dépassant
                        width: '100%',

                        height: widthPage && widthPage < breakpointMobile ? '250px' : '500px',
                        // height: '250px',
                       // boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Ombre portée

                    }}
                >
                  
                </div>
              

                </>
            
            }


            <div className='ServiceContainer__describ'>

                <h1>{service.title}</h1>
                <p className='ServiceContainer__describ--item'>{service.description}</p>
                
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