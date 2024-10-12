import React,{useState, useEffect} from 'react';

const Pagination = ({
    sousListe, nombreLignes, setNombreLignes,
    indexPage, setIndexPage

}) => {

    // Fonction pour gérer le nombre de lignes par tableau
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNombreLignes(value);
        
    };

    // Pagination next/previous
    const changeIndexPrev = () => setIndexPage((prev) => Math.max(prev - 1, 1));
    const changeIndexNext = () => setIndexPage((prev) => Math.min(prev + 1, sousListe.length));


    return (
        <div className='containerPage'>
            <div className='choiceNomberLine'>
                <label>Choisir le nombre de lignes par tableau</label>
                <input type='number' min='1' max='10'
                    name='nombreLignes'
                    value={nombreLignes}
                    onChange={handleChange}
                />
            </div>
        
            <div className='btnNextPrev'>
                <i className="fa-solid fa-caret-left" onClick={changeIndexPrev}></i>
                <p>{sousListe && sousListe.length > 0 ? `${indexPage}/${sousListe.length}` : 'Pas de pages disponibles'}</p>
                <i className="fa-solid fa-caret-right" onClick={changeIndexNext}></i>
            </div>
        </div>
    );
};

export default Pagination;