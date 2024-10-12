import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import InputFormSearchFilter from '../../../components/InputFormSearchFilter';
import Contact from '../../public/Contact';

const GetUsers = ({
    ComponentShowTable,
    sousListe, setSousListe, nombreLignes, setNombreLignes, indexPage, setIndexPage, actionsTable, setactionsTable,
    users, setUsers, allUsers, setAllUsers, setExecuteUseEffectFetchDashboard,
    itemUpdateChoice, setItemUpdateChoice, setModalContact, modalContact,
    setBtnCreate, btnCreate, btnChoice
}) => {

    //state pour afficher le formulaire de contact
    const [showContact, setShowContact] = useState(false);

     //affichage du composant contact
    const [showItemUser, setShowItemUser] = useState({
        tableIsOpen: true,
        paginationIsOpen: true,
        contactIsOpen: false,
       // btnAddProspect: false
    });

    const [propsLoaded, setPropsLoaded] = useState(false);  // Pour suivre la réception des props

    //gestion de reinitialisation du formulaire de contact quand on veut ajouter un prospect

    
    // Vérification des props à l'aide d'un useEffect
    useEffect(() => {
        if (users && allUsers && sousListe && setSousListe && nombreLignes && indexPage && setUsers && setAllUsers && setExecuteUseEffectFetchDashboard && setItemUpdateChoice && setModalContact
            && setBtnCreate && btnCreate 
        ) {
            // Si tous les props nécessaires sont présents
            setPropsLoaded(true);
            console.log('Props reçus dans GetUsers:', { users, allUsers, sousListe, nombreLignes, indexPage });
        } else {
            setPropsLoaded(false);
        }
    }, [users, allUsers, sousListe, nombreLignes, indexPage]);  // Mettre à jour lors de la réception des props

    if (!propsLoaded) {
        // Si les props ne sont pas encore chargés, on peut afficher un loader ou rien
        return <div>Chargement des données...</div>;
    }

   console.log("itemUpdateChoice", itemUpdateChoice);

   console.log("showItemUser", showItemUser);

    return (
        <div className='GetUsers'>
            <InputFormSearchFilter  
                allUsers={allUsers} 
                setUsers={setUsers} 
                setModalContact={setModalContact}
                modalContact={modalContact}
                component={"GetUsers"}
                btnCreate={btnCreate}
                setItemUpdateChoice={setItemUpdateChoice}
                setShowItemUser={setShowItemUser} showItemUser={showItemUser}
               
            />
            {
                btnChoice.Prospects && showItemUser.tableIsOpen &&
                <Table 
                    ComponentShowTable={ComponentShowTable}
                    users={users} 
                    setUsers={setUsers} 
                    allUsers={allUsers}
                    setItemUpdateChoice={setItemUpdateChoice} 
                    itemUpdateChoice={itemUpdateChoice} 
                    setExecuteUseEffectFetchDashboard={setExecuteUseEffectFetchDashboard}
                    sousListe={sousListe} 
                    setSousListe={setSousListe}
                    nombreLignes={nombreLignes} 
                    setNombreLignes={setNombreLignes}
                    indexPage={indexPage} 
                    setIndexPage={setIndexPage}
                    setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                />
            }

            {
                btnChoice.Prospects && showItemUser.paginationIsOpen &&
                <Pagination 
                    sousListe={sousListe} 
                    nombreLignes={nombreLignes} 
                    setNombreLignes={setNombreLignes}
                    indexPage={indexPage} 
                    setIndexPage={setIndexPage}
                />
            }

            { 
                btnChoice.Prospects && showItemUser.contactIsOpen &&
                <Contact 
                    ComponentShowTable={ComponentShowTable}
                    itemUpdateChoice={itemUpdateChoice} 
                    setItemUpdateChoice={setItemUpdateChoice}
                    actionsTable={actionsTable}
                    allUsers={allUsers}
                    component={"GetUsers"}
                    modalContact={modalContact}
                    setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                />
            
            
            }
        </div>
    );
};

export default GetUsers;
