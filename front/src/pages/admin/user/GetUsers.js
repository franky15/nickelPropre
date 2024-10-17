import React, { useState, useEffect } from 'react';
import Table from '../../../components/Table';
import Pagination from '../../../components/Pagination';
import InputFormSearchFilter from '../../../components/InputFormSearchFilter';
import Contact from '../../public/Contact';

const GetUsers = ({
    ComponentShowTable,
    sousListe, setSousListe, nombreLignes, setNombreLignes, indexPage, setIndexPage, actionsTable, setactionsTable,
    users, setUsers, allUsers, setAllUsers, setExecuteUseEffectFetchDashboard,
    itemUpdateChoice, setItemUpdateChoice,
    setBtnCreate, btnCreate, btnChoice, allChantiers,
}) => {

  

     //affichage du composant contact
    const [showItemUser, setShowItemUser] = useState({
        tableIsOpen: true,
        paginationIsOpen: true,
        contactIsOpen: false,
       // btnAddProspect: false
    });

    const [propsLoaded, setPropsLoaded] = useState(false);  // Pour suivre la réception des props

    const [flagUsers, setFlagUsers] = useState({  
        componentflag: "GetUsers",
        value: true,
        //addUser: false,

    });

    // Fonction pour afficher le formulaire de contact
    const [showContactSearchFilter, setShowContactSearchFilter] = useState(true);

     //gestion du state de du masquage des champs du formulaire de modifcation de l'utilisateur
     const [showHideInputUser, setShowHideInputUser] = useState(false);


    
    // Vérification des props à l'aide d'un useEffect
    useEffect(() => {
        if (users && allUsers && sousListe && setSousListe && nombreLignes && indexPage && setUsers && setAllUsers && setExecuteUseEffectFetchDashboard && setItemUpdateChoice 
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

//    console.log("itemUpdateChoice", itemUpdateChoice);

//    console.log("showItemUser", showItemUser);

    return (
        <div className='GetUsers'>

            {
                //showContactSearchFilter &&
                <InputFormSearchFilter  
                allUsers={allUsers} 
                setUsers={setUsers} 
                // setModalContact={setModalContact}
                // modalContact={modalContact}
                component={"GetUsers"}
                btnCreate={btnCreate}
                setItemUpdateChoice={setItemUpdateChoice}
                setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                flagUsers={ flagUsers }
                setFlagUsers={setFlagUsers}

                // showContactSearchFilter={showContactSearchFilter}
                // setShowContactSearchFilter={setShowContactSearchFilter}

               
            />
            
            }
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
                    allChantiers = {allChantiers} 

                    showContactSearchFilter={showContactSearchFilter}
                    setShowContactSearchFilter={setShowContactSearchFilter}
                    component={"GetUsers"}

                    setShowHideInputUser={setShowHideInputUser}
                    showHideInputUser={showHideInputUser}
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
                btnChoice.Prospects && showItemUser.contactIsOpen && //showItemUser.contactIsOpen &&
                <Contact 
                    ComponentShowTable={ComponentShowTable}
                    itemUpdateChoice={itemUpdateChoice} 
                    setItemUpdateChoice={setItemUpdateChoice}
                    actionsTable={actionsTable}
                    allUsers={allUsers}
                    component={"GetUsers"}
                    allChantiers = {allChantiers} 
                    //modalContact={modalContact}
                    setShowItemUser={setShowItemUser} showItemUser={showItemUser}
                
                    flagUsers={ flagUsers }
                    setFlagUsers={setFlagUsers}

                    showContactSearchFilter={showContactSearchFilter}
                    setShowContactSearchFilter={setShowContactSearchFilter}

                    setShowHideInputUser={setShowHideInputUser}
                    showHideInputUser={showHideInputUser}
                
                />
            
            
            }
        </div>
    );
};

export default GetUsers;
