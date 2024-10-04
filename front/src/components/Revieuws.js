import React,{useState, useEffect} from 'react';

import servicesData from '../datas';
import note from '../datasNote';


const Revieuws = () => {

     let number = note; // Nombre d'étoiles à afficher 

      // Divise la liste en deux parties
    const half = Math.ceil(servicesData.length / 2);  // Division de la liste en deux si elle est impaire (Math.ceil() arrondi supérieur) la première moitié contiendra un élément de plus
    const firstHalf = servicesData.slice(0, half);    // slice permet de découper la liste avec deux paramètres, le premier est l'index de départ et le deuxième est l'index de fin sans modification de la liste d'origine
    const secondHalf = servicesData.slice(half);      // débute à l'index half et finit à la fin de la liste sans modification de la liste d'origine

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
 

    return (
        

        <div className='rang'>
            <h2> AVIS CLIENTS</h2>
            <p className='star'> {displayStars()}</p>
            <p className='note'>Noté {note}/5</p>
        </div>
    );
};

export default Revieuws;