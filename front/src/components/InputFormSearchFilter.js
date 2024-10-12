import React, { useState, useEffect } from 'react';

import Contact from '../pages/public/Contact';

const InputFormSearchFilter = ({ 
    setchantiers, allChantiers, component,
    btnCreate, setShowItemUser, showItemUser,
    

}) => {

    // liste des statuts
    const statusChantier = ["Fait", "Abandonner", "Relancer", "Prospect", "Appeler", "Qualifier", "NonConverti", "En cours"];

    // State pour stocker les valeurs des inputs
    const [formValues, setFormValues] = useState({
        searchText: "",
        status: "",
        startDate: "",
        endDate: ""
    });

    // Fonction pour afficher le formulaire de contact
    const [showContactSearchFilter, setShowContactSearchFilter] = useState(false);

    // Fonction pour convertir la date ISO en format YYYY-MM-DD
    const formatDate = (isoDate) => {
        return isoDate.split('T')[0]; // Garde seulement la partie "YYYY-MM-DD"
    };

    // Vérifie si une date est complète (au format 'YYYY-MM-DD')
    const isCompleteDate = (date) => {
        return date && date.length === 10;
    };

    // Fonction pour récupérer les valeurs des inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value
        });
    };

    
    // Utilisation de useEffect pour filtrer les chantiers lorsque formValues ou allChantiers changent
    useEffect(() => {

        if (allChantiers && allChantiers.length > 0 && 
            (formValues.searchText !== "" || formValues.status !== "" || 
            (isCompleteDate(formValues.startDate) && isCompleteDate(formValues.endDate)))) {

            const filteredChantiers = allChantiers.filter((chantier) => {
               
                const chantierStatus = chantier.status ? chantier.status.toLowerCase() : "";
                const chantierService = chantier.service ? chantier.service.toLowerCase() : "";
                const chantierVille = chantier.ville ? chantier.ville.toLowerCase() : "";
                const chantierPrestataire = chantier.prestataire ? chantier.prestataire.toLowerCase() : "";
                const chantierDate = chantier.datePrestation ? formatDate(chantier.datePrestation) : ""; // Conversion de la date

                return (
                    // Filtrer par statut
                    (formValues.status && chantierStatus === formValues.status.toLowerCase()) ||
                    // Recherche par texte
                    (formValues.searchText && chantierService.includes(formValues.searchText.toLowerCase().trim())) ||
                    (formValues.searchText && chantierVille.includes(formValues.searchText.toLowerCase().trim())) ||
                    (formValues.searchText && chantierPrestataire.includes(formValues.searchText.toLowerCase().trim())) ||
                    // Filtrer par date de début et de fin
                    (isCompleteDate(formValues.startDate) && isCompleteDate(formValues.endDate) && 
                        chantierDate >= formValues.startDate && chantierDate <= formValues.endDate)
                );
            });

            console.log("***filteredChantiers", filteredChantiers);

            if(filteredChantiers.length > 0) {

                // Mettre à jour l'état avec les chantiers filtrés
                setchantiers(filteredChantiers);
            }
        }

    }, [formValues, allChantiers, setchantiers]);

    // Fonction de réinitialisation du champ de recherche
    const handleReset = () => {
        setFormValues({
            searchText: "",
            status: "",
            startDate: "",
            endDate: ""
        });
        setchantiers(allChantiers);
    };

    // Fonction pour afficher les statuts
    const displayStatus = (status) => {
        switch (status) {
            case "Fait": return "Fait";
            case "Abandonner": return "Abandonner";
            case "Relancer": return "Relancer";
            case "Prospect": return "Prospect";
            case "Appeler": return "Appeler";
            case "Qualifier": return "Qualifier";
            case "NonConverti": return "Non converti";
            case "Encours": return "En cours";
            default: return "Inconnu";
        }
    };

   

    return (
        <>
            {   
                btnCreate &&
                <div className='InputFormSearchFilter__filterBtn'>
                    <div className='InputFormSearchFilter__filterBtn--search'>
                        <i className="fa-solid fa-magnifying-glass"></i>
                        <input
                            type='text'
                            name='searchText'
                            placeholder='Rechercher sur un chantier'
                            value={formValues.searchText}
                            onChange={handleChange}
                        />
                        <i className="fa-solid fa-xmark" onClick={handleReset} style={{ cursor: "pointer" }}></i>
                    </div>

                    <div className='InputFormSearchFilter__filterBtn--filter'>
                        <select
                            name='status'
                            value={formValues.status}
                            onChange={handleChange}
                        >
                            <option value="">Trier par statut</option>
                            {statusChantier.map((status, index) => (
                                <option key={index} value={status}>
                                    {displayStatus(status).charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
                                </option>
                            ))}
                        </select>
                        <i className="fa-solid fa-filter"></i>
                    </div>

                    <div className='InputFormSearchFilter__filterBtn--date'>
                        <div className='containerDate'>
                            <label>Date minimale</label>
                            <input
                                type='date'
                                name='startDate'
                                value={formValues.startDate}
                                onChange={handleChange}
                            />
                        </div>
                        <div className='containerDate'>
                            <label>Date maximale</label>
                            <input
                                type='date'
                                name='endDate'
                                value={formValues.endDate}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button className='contact'
                        onClick={
                            ()=>{
                                setShowContactSearchFilter((prev) => !prev)
                                setShowItemUser({tableIsOpen: false, paginationIsOpen: false})
                    
                            }
                           
                        }
                    >
                        <i className="fa-solid fa-plus"></i>
                        {
                           component &&  component === "GetChantiers" ? "Créer un chantier" : "Ajouter un Prospect"
                        }
                    </button>
                </div>
            
            }

            {
                showContactSearchFilter &&
                    <Contact 
                    component={component} 
                    setShowItemUser={setShowItemUser} showItemUser={showItemUser}

                    showContactSearchFilter={showContactSearchFilter} setShowContactSearchFilter={setShowContactSearchFilter}
                />
            }
        </>
    );
};

export default InputFormSearchFilter;
