import React,{useState, useEffect} from 'react';
import servicesData from '../../datas';
import note from '../../datasNote';
import Revieuws from '../../components/Revieuws';


const About = () => {

    //gestion du state de l'affichage progressive de la page
    const [isVisibleHome, setIsVisibleHome] = useState(false);

    useEffect(() => {

        
        setTimeout(() => {
            setIsVisibleHome(true); // Déclenche l'affichage progressif
        }, 100); // Délai de 100ms avant de lancer l'animation
      
        
    }
    , []);
    
    // Divise la liste en deux parties
    const half = Math.ceil(servicesData.length / 2);  // Division de la liste en deux si elle est impaire (Math.ceil() arrondi supérieur) la première moitié contiendra un élément de plus
    const firstHalf = servicesData.slice(0, half);    // slice permet de découper la liste avec deux paramètres, le premier est l'index de départ et le deuxième est l'index de fin sans modification de la liste d'origine
    const secondHalf = servicesData.slice(half);      // débute à l'index half et finit à la fin de la liste sans modification de la liste d'origine

    let number = note; // Nombre d'étoiles à afficher 

    //console.log('number', number); 

    //fonction pour afficher les étoiles
    const displayStars = () => {

        let stars = [];
        let fullStars = Math.floor(number); // Récupère la partie entière du nombre (nombre d'étoiles pleines) (Math.floor() arrondi inférieur)
        let hasHalfStar = number % 1 >= 0.5; // Vérifie s'il y a une demi-étoile (partie decimale >= 0.5) renvoie true ou false
        let totalStars = 5; // Le nombre total d'étoiles affichées (ici 5)

        //Ajout des étoiles pleines en premier car Math.floor() arrondi inférieur
        for(let i = 0; i < fullStars; i++) {
            stars.push(<i key={i} className="fa-solid fa-star"></i>); // Ajoute une étoile pleine
        }

        if(hasHalfStar) {
            stars.push(<i className="fa-regular fa-star-half-stroke"></i>); // Ajoute une demi-étoile si nécessaire
        }

        // Ajouter les étoiles vides pour compléter jusqu'à 5 étoiles
        let emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
        }
        return stars;
    };
   
    console.log('servicesData', servicesData);

    console.log('firstHalf', firstHalf);
    console.log('secondHalf', secondHalf);
    
    return (
        <div className= {`About ${isVisibleHome ? 'visibleHome' : ''}`}>

            <h1> Nos valeurs</h1>

            <div className='About__cartContainer'>

            
                {/* Première moitié de la liste */}
                <div className='About__cartContainer--itemGroupe'>

                    {firstHalf.map(service => {
                        return (
                            <div key={`about0-${service.id}-${service.title}`} className='About__cartItem'
                                style={{
                                    backgroundImage: `url(${service.picture})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                            
                            </div>
                        );
                    })}

               </div>

                <div className='About__cartContainer--describ'>
                    <p >
                        Notre entreprise est spécialisée dans la vente de produits de qualité. Nous mettons tout en oeuvre pour vous satisfaire.
                    </p>
                </div>

                <div className='About__cartContainer--itemGroupe'>
                    {/* Deuxième moitié de la liste */}
                    {secondHalf.map(service => {
                        return (
                            <div key={`about1-${service.id}-${service.title}`}  className='About__cartItem'
                                style={{
                                    backgroundImage: `url(${service.picture})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    borderRadius: '10px',
                                    position: 'relative',
                                    overflow: 'hidden',
                                }}
                            >
                            
                            </div>
                        );
                    })}

                </div>

            </div>

            <div className='About__describ'>

                <h2>Notre entreprise</h2>
                <p className='About__describ--us'>
                    Nickel Propre est une entreprise de nettoyage de canapés, matelas, tapis et véhicules à domicile.
                    Nous sommes votre spécialiste du nettoyage de tissus d'ameublement et de véhicules à domicile, partout en France. Que vous souhaitiez rafraîchir ou nettoyer en profondeur votre canapé, désinfecter votre matelas, redonner éclat à vos tapis, moquettes, ou remettre à neuf l’intérieur de votre voiture, notre équipe de professionnels est prête à vous offrir un service de nettoyage haut de gamme.
                </p>
            </div>

            <div className='About__reviews'>

           
                <div className='reviews'>
                    {
                        servicesData.map(service => {
                            return (
                                <div key={`about3-${service.id}-${service.title}`} className='services'>
                                    <i className="fa-regular fa-square-check"></i>
                                    <h3>{service.title}</h3>
                                    
                                </div>
                            );
                        })
                    }
                </div>

                <div className='containerRang'>

                    <div className='revieuws'>
                        <Revieuws/>
                    </div>
                   
                    <div className='certicate'>

                        <div className='certicate__container'>
                            <div className='contenu'>
                                <p className='contenu__title'>Bio</p>
                                <p>Produit non-toxique</p>
                                <p> <i className="fa-solid fa-ribbon"></i></p>
                        
                               
                            </div>
                        </div>
                        <div className='certicate__container'>
                            <div className='contenu'>
                                <p className='contenu__title'>Bio</p>
                                <p>Produit non-toxique</p>
                                <p> <i className="fa-solid fa-trophy"></i></p>
                               
                            </div>
                        </div>
                        <div className='certicate__container'>
                            <div className='contenu'>
                                <p className='contenu__title'>Bio</p>
                                <p>Produit non-toxique</p>
                                <p>  <i className="fa-solid fa-euro-sign"></i></p>
                               
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <button className='btn__contact'>Nous contacter</button>

            <div className='About__team'>
                <h2>Nos Equipes</h2>
                <div className='About__team--descrip'>
                    <p>Tous nos collaborateurs s'engagent ensemble pour :</p>
                    <ul>
                        <li>Relever les défis du nettoyage en utilisant des produits qui préservent la qualité de vos tissus. </li>
                        <li>Suivre l'évolution des attentes de nos clients et les accompagner dans l'entretien et la rénovation de leurs meubles et intérieurs.</li>
                    </ul>
                    <p>Nos équipes mettent tout en œuvre au quotidien pour garantir des résultats impeccables, en veillant à ne jamais compromettre la durabilité de vos tissus et à toujours satisfaire nos clients.</p>
                   
                </div>
                
                
            
            </div>

            {/*<div className='footer'>
                <p className='title'>Suivez notre actualité sur nos réseaux sociaux</p>
                <div className='social'>
                    <i className="fa-brands fa-facebook"></i>
                    <i className="fa-brands fa-instagram"></i>
                </div>
                <div className='triangle'><i className="fa-solid fa-caret-up"></i></div>
            </div>*/}

        </div>
    );
};

export default About;
