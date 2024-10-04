import React,{useState, useEffect} from 'react';

import CarteServices from '../../components/CarteServices';
import { GetServices } from '../admin/service';

import canape from '../../images/canapeInfo.png';
import terrasse from '../../images/terrasse.jpg';



import servicesData from '../../datas';
import Contact from './Contact';

const Home = () => {


    //gestion du state de l'affichage progressive de la page
    const [isVisibleHome, setIsVisibleHome] = useState(false);

    const [services, setServices] = useState([]);



    useEffect(() => {

        if(servicesData && servicesData.length > 0){
            setServices(servicesData);
        }

        setTimeout(() => {
            setIsVisibleHome(true); // Déclenche l'affichage progressif
          }, 100); // Délai de 100ms avant de lancer l'animation
      

       
    } ,[]);
   

    return (
        <div className={`Home ${isVisibleHome ? 'visibleHome' : ''}`}>
           
            <GetServices />

            <div className='blockH1'>
                <h1 className='blockH1__title'> Le Nettoyage En profondeur </h1>
                <p className='blockH1__describ'>Redonnez vie et fraicheur à vos Canapés et intérieur de véhicule  à Domicile</p>
            </div>

            <button className='btn__contact'>Nous contacter</button>

            <h2 className='H2__title'>Particulier et Professionnels</h2>

            <p className='descripConseil'>Ne laissez pas les taches et odeurs masquer la beauté de vos meubles! Fini les housses et parfums : notre service révèle leur éclat authentique.</p>  
            <h3 className='H3__title'>Services</h3>

            <div className='blockServices'>
                
                <div className='blockServices__subService'>
                {

                    services.map((service, index) => {
                        return (
                            <div key={`home-${service.id}-${service.title}`} className='blockServices__subService--cart'>
                                <h4>{service.title}</h4>
                                <p>{service.description}</p>
                                <button className='btn__subService'>En savoir plus</button>
                            </div>
                        )
                    })
                }
                </div>
                <div className='blockServices__appelAction'>
                    Vos Priorités au coeur de nos Prestations
                </div>
                <div className='blockServices__appelAction'>
                    
                </div>
            </div>

            <div className='blockEntreprise'>
                <h2 className='blockEntreprise__title'>
                    Un néttoyage professionnel chez-vous pour un canapé comme neuf 
                </h2>
                <p className='blockEntreprise__describ'>
                    Nickel Propre est une équipe de professionnels équipée de tout le matériel nécessaire pour un nettoyage complet de vos canapés, siège auto et intérieur de véhicule, garantissant un résultat impeccable et une hygiène irréprochable.
                </p>

                <div className='blockEntreprise__garantie'>
                    <div className='blockEntreprise__garantie__item'>
                        <i className="fa-regular fa-square-check"></i>
                        <h3>Satisfaction Garanthies</h3>
                        <p>
                            Nous nous Engageons pour un Résultat impeccable, nous garantissons votre satisfaction.
                        </p>
                    </div>
                    <div className='blockEntreprise__garantie__item'>
                        <i className="fa-solid fa-car"></i>
                        <h3>Déplacement Gratuit</h3>
                        <p>
                            Nos Professionnels se déplace chez vous gratuitement.
                        </p>
                    </div>
                    <div className='blockEntreprise__garantie__item'>
                        <i className="fa-regular fa-circle-check"></i>
                        <h3>Paiement sécurisé</h3>
                        <p>
                            Payez Après le travail vérifié et terminé.
                        </p>
                        
                    </div>
                   
                </div>

                <button className='btn__contact'>Nous contacter</button>
                <p className='blockEntreprise__products'>
                    Nous utilisons des produits écologique et sans risques, qui désinfectent et éliminent des bacteries ou acariens. 
                    Que vous ayez un canapé et ou s!ège auto en tissu ou en cuir nous les traitons.
                </p>

            </div>

            <div className='blockCanap'>

                <div className='blockCanap__imageCanape'

                    style={{
                        backgroundImage: `url(${canape})`,
                        
                    }}
                >
                   
                </div>
               
                <div className='blockCanap__text'>
                    <p className='blockCanap__text--item'>
                        Sans un nettoyage en profondeur, votre canapé peut rapidement se transformer en un véritable foyer de bactéries. Nous utilisons des produits professionnels spécialement conçus pour traiter toutes les taches et tous les types de tissus.
                    </p>
                    <p className='blockCanap__prix'>
                        Le prix inclut les frais de déplacement ainsi que les produits de nettoyage utilisés. Le paiement est fait une fois le travail achevé.
                    </p>
                    <button className='btn__contact'>Nous contacter</button>
                </div>

            </div>

            <div className='blockReviews'>
                

                <div className='blockReviews__avis'>
                    <h3>
                        Nettoyage PROFESSIONNEL à DOMICILE : NOS RÉALISATIONS
                    </h3>
                    <div className='avis'>
                       //////////////////////////////
                    </div>
                    <p className='describTitle'>
                        ⚠ Saviez-vous qu’un canapé contient 12 fois plus de bactéries qu’un siège de toilette ? 
                       
                    </p>
                    <p className='describTitleSub'>
                        Un canapé familial abrite 19 200 microbes par 100 cm², contre 1 600 pour un siège de toilette (UNICEF). Nettoyez-le régulièrement pour maintenir une hygiène optimale.
                    </p>
                </div>
            </div>

            <div className='blockWhy'>
                <h3 className='blockWhy__title'>
                    Pouquoi Travailler avec Nickel Propre?
                </h3>
                <div className='blockWhy__Item'>

                    
                    <p>
                    <i className="fas fa-check"></i><span>Expertise multi-matériaux :</span> Nettoyage adapté pour tous types de canapés (tissu, cuir, microfibre, daim, velours).
                    </p>
                </div>
                <div className='blockWhy__Item'>
                   
                    <p>
                    <i className="fas fa-check"></i><span>Produits écologiques :</span> Utilisation de produits bio, respectueux des tissus et de l’environnement.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                   
                    <p>
                    <i className="fas fa-check"></i><span>Garantie satisfaction :</span> Si des taches réapparaissent sous 24h, nous revenons gratuitement.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                  
                    <p>
                        <i className="fas fa-check"></i><span>Déplacement gratuit :</span> Intervention partout en Île-de-France sans frais supplémentaires.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                  
                    <p>
                        <i className="fas fa-check"></i><span>Traitements anti-acariens et anti-bactériens :</span> Pour une hygiène impeccable.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                   
                    <p>
                        <i className="fas fa-check"></i><span>Soins des tissus :</span> Ravivement des couleurs et protection longue durée.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                   
                    <p>
                        <i className="fas fa-check"></i><span>Résultats visibles : </span>Avant/Après qui montrent l’efficacité de notre service.
                    </p>
                </div>
            </div>

            <div className='blockTerasse'>
                    <div className='blockTerasse__img'
                        style={{
                            backgroundImage: `url(${terrasse})`,
                            backgroundSize: 'cover', // Ajuster la taille de l'image
                            backgroundPosition: 'center', // Centrer l'image
                            // height: '100%', // Ajuster la hauteur
                            // width: '100%', // Largeur à 100%
                        }}
                    >

                    </div>
                    <div className='blockTerasse__text'>
                        <h3 className='blockTerasse__text--title'>
                            Particuliers :
                        </h3>
                        <p className='blockTerasse__text--describ'>
                            Afin de pouvoir pleinement profiter de votre terrasse, il est nécessaire de la nettoyer régulièrement. Lorsqu’on nettoie une terrasse, il faut bien faire attention aux produits et aux outils utilisés pour éviter de l’endommager.
                        </p>
                        <button className='btn__contact'>Nous contacter</button>
                    
                    </div>
            </div>

            <div className='blockTerasseReverse'>
                    <div className='blockTerasseReverse__img'
                        style={{
                            backgroundImage: `url(${terrasse})`,
                            backgroundSize: 'cover', // Ajuster la taille de l'image
                            backgroundPosition: 'center', // Centrer l'image
                            // height: '100%', // Ajuster la hauteur
                            // width: '100%', // Largeur à 100%
                        }}
                    >

                    </div>
                    <div className='blockTerasseReverse__text'>
                        <h3 className='blockTerasseReverse__text--title'>
                            Professionnels :
                        </h3>
                        <p className='blockTerasseReverse__text--describ'>
                            Afin de pouvoir pleinement profiter de votre terrasse, il est nécessaire de la nettoyer régulièrement. Lorsqu’on nettoie une terrasse, il faut bien faire attention aux produits et aux outils utilisés pour éviter de l’endommager.
                        </p>
                        <button className='btn__contact'>Nous contacter</button>
                    
                    </div>
            </div>

            <div className='blockContact'>
               
                <Contact />

            </div>

        </div>
    );
};

export default Home; 