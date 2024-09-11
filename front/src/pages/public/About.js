import React from 'react';
import servicesData from '../../datas';
import note from '../../datasNote';
import Revieuws from '../../components/Revieuws';


const About = () => {

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
            stars.push(<i class="fa-regular fa-star-half-stroke"></i>); // Ajoute une demi-étoile si nécessaire
        }

        // Ajouter les étoiles vides pour compléter jusqu'à 5 étoiles
        /*let emptyStars = totalStars - fullStars - (hasHalfStar ? 1 : 0);
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<i key={`empty-${i}`} className="fa-regular fa-star"></i>);
        }*/
        return stars;
    };
   

    return (
        <div className='About'>

            <h1> Nos valeurs</h1>

            <div className='About__cartContainer'>

            
                {/* Première moitié de la liste */}
                {firstHalf.map(service => {
                    return (
                        <div key={service.id-"about0"} className='About__cartContainer--service'
                            style={{
                                backgroundImage: `url(${service.picture})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '10px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <p>{service.description}</p>
                        </div>
                    );
                })}

                <div className='About__describ'>
                    <p >
                        Notre entreprise est spécialisée dans la vente de produits de qualité. Nous mettons tout en oeuvre pour vous satisfaire.
                    </p>
                </div>

                {/* Deuxième moitié de la liste */}
                {secondHalf.map(service => {
                    return (
                        <div key={service.id-"about1"} className='About__cartContainer--service'
                            style={{
                                backgroundImage: `url(${service.picture})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                borderRadius: '10px',
                                position: 'relative',
                                overflow: 'hidden',
                            }}
                        >
                            <p>{service.description}</p>
                        </div>
                    );
                })}

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
                                <div key={service.id-"about2"} className='services'>
                                    <i class="fa-regular fa-square-check"></i>
                                    <h3>{service.title}</h3>
                                    
                                </div>
                            );
                        })
                    }
                </div>

                <div className='containerRang'>

                    <Revieuws/>
                    <div className='certicate'>

                        <div className='certicate__container'>
                            <div className=''>
                                <p>Bio</p>
                                <p>Produit non-toxique</p>
                                <i class="fa-solid fa-ribbon"></i>
                            </div>
                        </div>
                        <div className='certicate__container'>
                            <div className=''>
                                <p>Bio</p>
                                <p>Produit non-toxique</p>
                                <i class="fa-solid fa-trophy"></i>
                            </div>
                        </div>
                        <div className='certicate__container'>
                            <div className=''>
                                <p>Bio</p>
                                <p>Produit non-toxique</p>
                                <i class="fa-solid fa-euro-sign"></i>
                            </div>
                        </div>

                    </div>

                </div>

            </div>
            <button className='btn__contact'>Nous contacter</button>

            <div className='About__team'>
                <h2>Nos Equipes</h2>
                <p>Tous nos collaborateurs s'engagent ensemble pour :</p>
                <ul>
                    <li>Relever les défis du nettoyage en utilisant des produits qui préservent la qualité de vos tissus. </li>
                    <li>Suivre l'évolution des attentes de nos clients et les accompagner dans l'entretien et la rénovation de leurs meubles et intérieurs.</li>
                </ul>
                <p>Nos équipes mettent tout en œuvre au quotidien pour garantir des résultats impeccables, en veillant à ne jamais compromettre la durabilité de vos tissus et à toujours satisfaire nos clients.</p>
                    
                <div className='footer'>
                    <p className='title'>Suivez notre actualité sur nos réseaux sociaux</p>
                    <div className='social'>
                        <i class="fa-brands fa-facebook"></i>
                        <i class="fa-brands fa-instagram"></i>
                    </div>
                    <p className='triangle'><i class="fa-solid fa-caret-up"></i></p>
                </div>
            
            </div>

        </div>
    );
};

export default About;
