import React from 'react';


import note from '../datasNote';


const Revieuws = () => {

     let number = note; // Nombre d'étoiles à afficher 

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
 

    return (
        

        <div className='rang'>
            <h2> AVIS CLIENTS</h2>
            <p className='star'> {displayStars()}</p>
            <p className='note'>Noté {note}/5</p>
        </div>
    );
};

export default Revieuws;