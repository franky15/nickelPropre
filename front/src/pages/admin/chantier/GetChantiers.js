import React, { useState, useEffect } from 'react';
import InputFormSearchFilter from '../../../components/InputFormSearchFilter';
import Contact from '../../public/Contact';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';


const GetChantiers = ({ 
    ComponentShowTable,
    sousListe, setSousListe, nombreLignes, setNombreLignes, indexPage, setIndexPage, actionsTable, setactionsTable, modalContact, setModalContact,
    chantiers, setchantiers, allChantiers, setExecuteUseEffectFetchDashboard, itemUpdateChoice, setItemUpdateChoice,
    setBtnCreate, btnCreate, btnChoice
}) => {

    const [propsValidated, setPropsValidated] = useState(false); // Pour vérifier si les props sont valides

      //affichage du composant contact
      const [showItemUser, setShowItemUser] = useState({
        tableIsOpen: true,
        paginationIsOpen: true,
        contactIsOpen: false,
       // btnAddProspect: false
    });

    // Validation des props
    useEffect(() => {
        console.log('Validation des props dans GetChantiers');

        // Vérifier si tous les props nécessaires sont présents
        if (chantiers && allChantiers && sousListe && setSousListe && nombreLignes && indexPage && setchantiers && setExecuteUseEffectFetchDashboard && setItemUpdateChoice && setModalContact
            && setBtnCreate && btnCreate
        ) {
            
            console.log('Props reçus dans GetChantiers:', { chantiers, allChantiers, sousListe, nombreLignes, indexPage });
            
            setPropsValidated(true); // Une fois la validation réussie, on active le passage des props
        } else {
            setPropsValidated(false); // Si des props manquent, on garde propsValidated à false
        }
    }, [chantiers, allChantiers, sousListe, nombreLignes, indexPage]);

    if (!propsValidated) {
        return <div>Chargement des données...</div>; // Affichage pendant la validation des props
    }

    return (
        <>
            {
                //!modalContact && 
                <div className='GetChantiers'>
                    {
                        <InputFormSearchFilter 
                           // ComponentShowTable={ComponentShowTable} 
                            allChantiers={allChantiers} 
                            setchantiers={setchantiers} 
                            sousListe={sousListe}
                            btnCreate={btnCreate}
                            component={"GetChantiers"}
                            setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                        />
                 
                    }

                    {
                        btnChoice.Chantiers && showItemUser.tableIsOpen &&
                        <Table 
                        ComponentShowTable={ComponentShowTable}
                        chantiers={chantiers} 
                        setchantiers={setchantiers} 
                        allChantiers={allChantiers} 
                        setItemUpdateChoice={setItemUpdateChoice} 
                        itemUpdateChoice={itemUpdateChoice} 
                        setExecuteUseEffectFetchDashboard={setExecuteUseEffectFetchDashboard}
                        sousListe={sousListe} 
                        setSousListe={setSousListe}
                        nombreLignes={nombreLignes} 
                        setNombreLignes={setNombreLignes}
                        indexPage={indexPage} 
                        setIndexPage={setIndexPage}
                        actionsTable={actionsTable} 
                        setactionsTable={setactionsTable}
                        setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                        />
                    }

                    {
                        btnChoice.Chantiers && showItemUser.paginationIsOpen &&
                        <Pagination 
                            sousListe={sousListe}
                            nombreLignes={nombreLignes} 
                            setNombreLignes={setNombreLignes}
                            indexPage={indexPage} 
                            setIndexPage={setIndexPage}
                        />
                    
                    }

                </div>
            }

            { btnChoice.Chantiers && showItemUser.contactIsOpen &&
                <Contact 
                    ComponentShowTable={ComponentShowTable}
                    itemUpdateChoice={itemUpdateChoice} 
                    setItemUpdateChoice={setItemUpdateChoice}
                    allChantiers={allChantiers}
                    component={"GetChantiers"}
                    modalContact={modalContact}

                    setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                />
            }
        </>
    );
};

export default GetChantiers;
