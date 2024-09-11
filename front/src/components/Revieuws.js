import React,{useState, useEffect} from 'react';

import servicesData from '../datas';
import note from '../datasNote';


const Revieuws = () => {

     let number = note; // Nombre d'étoiles à afficher 
 

    return (
        

        <div className='rang'>
            <h2> <i class="fa-solid fa-star"></i>AVIS CLIENTS</h2>
            <Revieuws />
            <p>Noté {note}/5</p>
        </div>
    );
};

export default Revieuws;