import React,{useState, useEffect} from 'react';

import CarteServices from '../../components/CarteServices';

import canape from '../../images/canapeInfo.png';

import servicesData from '../../datas';
import Contact from './Contact';

const Home = () => {

    const [services, setServices] = useState([]);

    useEffect(() => {

        if(servicesData && servicesData.length > 0){
            setServices(servicesData);
        }
       
    }
    ,[]);
   // console.log('services', services);
   console.log(canape);


    return (
        <div className='Home'>
           
            <CarteServices />

            <div className='blockH1'>
                <h1 className='blockH1__title'> Le Nettoyage En profondeur </h1>
                <p className='blockH1__describ'>Redonnez vie et fraicheur à vos Canapés et intérieur de véhicule  à Domicile</p>
            </div>

            <button className='btn__contact'>Nous contacter</button>

            <h2 className='H2__title'>Particulier et Professionnels</h2>

            <p className='descripConseil'>Ne laissez pas les taches et odeurs masquer la beauté de vos meubles! Fini les housses et parfums : notre service révèle leur éclat authentique.</p>  
            <h3 className='H3__title'>Services</h3>

            <div className='blockServices'>
                
                {

                    services.map((service, index) => {
                        return (
                            <div key={`home-${service.id}-${service.title}`} className='blockServices__service'>
                                <h4>{service.title}</h4>
                                <p>{service.description}</p>
                                <button className='btn__services'>En savoir plus</button>
                            </div>
                        )
                    })
                }
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
                    <p>
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
                    <p>
                        ⚠ Saviez-vous qu’un canapé contient 12 fois plus de bactéries qu’un siège de toilette ? 
                        Un canapé familial abrite 19 200 microbes par 100 cm², contre 1 600 pour un siège de toilette (UNICEF). Nettoyez-le régulièrement pour maintenir une hygiène optimale.
                    </p>
                </div>
            </div>

            <div className='blockMethodTravail'>
                <h3>
                    Nettoyage de Canapés en Tissu, Cuir, Microfibre, Daim et Velours
                </h3>
                <p>
               

                    Chez Nikel Propre, nous intervenons à domicile pour nettoyer tous types de canapés, qu'ils soient en tissu, cuir, microfibre, daim ou velours. 
                    Nous savons que chaque matière nécessite une attention particulière et des techniques de nettoyage spécifiques pour garantir un résultat impeccable.

                    💡 Pourquoi faire appel à nous ?
                    Notre équipe, formée aux meilleures pratiques, utilise des produits écologiques et des méthodes adaptées pour éliminer les taches tenaces et les mauvaises odeurs tout en préservant l’intégrité et l’éclat de votre canapé.

                    Nous proposons aussi des traitements anti-acariens et anti-bactériens pour une hygiène parfaite, ainsi que des soins pour raviver les couleurs et prolonger la durée de vie de vos tissus et cuirs.
                    Avec Nikel Propre, vous êtes assuré d’un nettoyage en profondeur, respectueux de vos meubles et de votre santé.
                </p>
            </div>

            <div className='blockWhy'>
                <h3>
                    Pouquoi Travailler avec Nickel Propre?
                </h3>
                <div className='blockWhy__Item'>

                    <i className="fas fa-check"></i>
                    <p>
                        <span>Expertise multi-matériaux :</span> Nettoyage adapté pour tous types de canapés (tissu, cuir, microfibre, daim, velours).
                    </p>
                </div>
                <div className='blockWhy__Item'>
                    <i className="fas fa-check"></i>
                    <p>
                        <span>Produits écologiques :</span> Utilisation de produits bio, respectueux des tissus et de l’environnement.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                    <i className="fas fa-check"></i>
                    <p>
                        <span>Garantie satisfaction :</span> Si des taches réapparaissent sous 24h, nous revenons gratuitement.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                    <i className="fas fa-check"></i>
                    <p>
                        <span>Déplacement gratuit :</span> Intervention partout en Île-de-France sans frais supplémentaires.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                    <i className="fas fa-check"></i>
                    <p>
                        <span>Traitements anti-acariens et anti-bactériens :</span> Pour une hygiène impeccable.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                    <i className="fas fa-check"></i>
                    <p>
                        <span>Soins des tissus :</span> Ravivement des couleurs et protection longue durée.
                    </p>
                </div>
                <div className='blockWhy__Item'>
                    <i className="fas fa-check"></i>
                    <p>
                        <span>Résultats visibles : </span>Avant/Après qui montrent l’efficacité de notre service.
                    </p>
                </div>
            </div>

            <div className='blockContact'>
                <p className='blockContact__title'>
                    Contact
                </p>
                <h3>
                    Faites-nous part de vos souhaits
                </h3>
                <p>
                    Exprimez vos besoins via ce formulaire, et notre équipe vous répondra rapidement.
                </p>

                <Contact />

            </div>

        </div>
    );
};

export default Home; 