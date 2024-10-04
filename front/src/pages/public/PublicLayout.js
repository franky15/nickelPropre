import React,{useState,useEffect} from 'react';
import {Outlet } from 'react-router-dom';
import Header from '../../components/Header';

const PublicLayout = () => {

    //gestion du state de l'affichage progressive de la page
    // const [isVisibleHome, setIsVisibleHome] = useState(false);

    useEffect(() => {

        // //exécution de cette fonction 100ms après le chargement de la page donc au début rien n'est visible
        // setTimeout(() => {
        //     setIsVisibleHome(true); // Déclenche l'affichage progressif
        // }, 100); // Délai de 100ms avant de lancer l'animation
       
    } ,[]);

    //{`PublicLayout ${ isVisibleHome ? "visibleHome" : ""}`}
    return (
        <div className="PublicLayout">
             <Header/>
            <Outlet/>
          
        </div>
    );
};

export default PublicLayout;