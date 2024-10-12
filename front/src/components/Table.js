import React,{useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Contact from '../pages/public/Contact';





const Table = ({
    ComponentShowTable, users, setUsers, allUsers,
    chantiers, setchantiers, allChantiers, setItemUpdateChoice, itemUpdateChoice,
    indexPage, nombreLignes, setNombreLignes,
    sousListe, setSousListe, actionsTable, setactionsTable,
    setExecuteUseEffectFetchDashboard,

    setShowItemUser, showItemUser,
}) => {


    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedValues, setCheckedValues] = useState([]);
    
    const propsValidated = (ComponentShowTable === "chantiers") 
        ? (chantiers && allChantiers)
        : (users && allUsers );
        
    // Affichage pendant la validation des props
    if (!propsValidated) {
        return <div>Chargement des données...</div>;
    }

    // Initialiser les checkedItems en fonction des chantiers ou users
    useEffect(() => {

        const listeItems = ComponentShowTable === "chantiers" ? chantiers : users;
        
        if (listeItems && listeItems.length > 0) {

            const checkedItemsValue = listeItems
                .filter(item => item && item.id) // Vérifier que item et item.id sont définis
                .map(item => item.id);

            setCheckedItems(
                checkedItemsValue.reduce((acc, itemId) => {
                    acc[itemId] = false;
                    return acc;
                }, {})
            );
        }

    }, [chantiers, users, ComponentShowTable]);

    const headerTableChantiers = ["Services", "Statut", "Nbr de places/TV", "Date Prestation", "Prestataire", "Heure", "Nom du client", "Tel", "Adresse", "Actions"];
    const hearderTableUsers = ["Nom Prospect", "Service", "Date arrivée", "Ville", "Adresse", "Tel", "Statu", "Nbr de relances", "Historique d'actions", "Commentaire", "Actions"];
    
    // Fonction pour gérer les actions de chaque ligne
    const actionsLineTable = (item, choice) => {
        setItemUpdateChoice(item);
        if (choice === "modifier") {
            //setModalContact((prev) => !prev);
            //setBtnCreate((prev) => !prev);

            setShowItemUser({
                tableIsOpen: false,
                paginationIsOpen: false,
                contactIsOpen: true,
            });

            // setactionsTable({
            //     telecharger: false,
            //     modifier: !actionsTable.modifier,
            //     supprimer: false,
            // });

        } else if (choice === "telecharger") {
            setactionsTable({
                telecharger: !actionsTable.telecharger,
                modifier: false,
                supprimer: false,
            });
        } else if (choice === "supprimer") {
            setactionsTable({
                telecharger: false,
                modifier: false,
                supprimer: !actionsTable.supprimer,
            });
        }
    };

    // Fonction pour gérer la case "Select All"
    const handleSelectAll = (e) => {
        const isChecked = e.target.checked;
        setSelectAll(isChecked);
        const updatedCheckedItems = Object.keys(checkedItems).reduce((acc, key) => {
            acc[key] = isChecked;
            return acc;
        }, {});
        setCheckedItems(updatedCheckedItems);
    };

    // Fonction pour gérer chaque checkbox individuelle
    const handleCheckboxChange = (e) => {
        const { name, checked } = e.target;
        setCheckedItems((prevState) => ({
            ...prevState,
            [name]: checked
        }));

        const allChecked = Object.keys(checkedItems).every((item) =>
            item === name ? checked : checkedItems[item]
        );
        setSelectAll(allChecked);
    };

    // Fonction pour gérer le nombre de lignes par tableau
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNombreLignes(value);
    };

    // Constitution des sous-listes en fonction du nombre d'éléments par page
    useEffect(() => {
        const listeItems = ComponentShowTable === "chantiers" ? chantiers : users;

        if (listeItems && listeItems.length > 0) {
            const filteredListeItems = listeItems.filter(item => item && item.id);

            const listElementsPerPage = filteredListeItems.reduce((accumulateur, _, indexAcc, array) => {
                if (indexAcc % nombreLignes === 0) {
                    accumulateur.push(array.slice(indexAcc, indexAcc + nombreLignes));
                }
                return accumulateur;
            }, []);

            setSousListe(listElementsPerPage);
        }
    }, [chantiers, users, nombreLignes, ComponentShowTable]);

    return (

    <>
        { 
           
            <table className='table'>
                <thead>
                    <tr>
                        <th>
                            <input
                                type="checkbox"
                                checked={selectAll}
                                onChange={handleSelectAll}
                            />
                        </th>
                        {
                            ComponentShowTable === "chantiers" ? headerTableChantiers.map((header, index) => (
                                <th key={index}>{header}</th>
                            )) : hearderTableUsers.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))

                        }
                    </tr>
                </thead>
                <tbody>
                    {(ComponentShowTable && ComponentShowTable === "chantiers" ? 
                        (sousListe && sousListe.length > 0 ? sousListe[indexPage - 1] : chantiers) :
                        (sousListe && sousListe.length > 0 ? sousListe[indexPage - 1] : users))
                    .map((item, index) => (
                        <tr key={index}>
                            <td>
                                {item && item.id ? (
                                    <input
                                        type="checkbox"
                                        name={`${item.id}`}
                                        checked={checkedItems[item.id]}
                                        onChange={(e) => {
                                            handleCheckboxChange(e);
                                            setCheckedValues([...checkedValues, item.id]);
                                        }}
                                    />
                                ) : null}
                            </td>
                            {
                                ComponentShowTable === "chantiers" ?

                                <>
                                    <td> 
                                        <div className='btnChantier' onClick={() => item && item.id && actionsLineTable(item, "modifier")}>
                                            {item && item.service ? item.service : ''} 
                                            {item && item.id && <i className="fa-solid fa-star"></i>}
                                        </div>
                                    </td>
                                    <td>{item && item.status ? item.status : ''}</td>
                                    <td>{item && item.nombrePlaces ? item.nombrePlaces : ''}</td>
                                    <td>{item && item.datePrestation ? item.datePrestation : ''}</td>
                                    <td>{item && `${item.nom} ${item.prenom}`}</td>
                                    <td>{item && item.heurePrestation ? item.heurePrestation : ''}</td>
                                    <td>{item && item.nom ? item.nom : ''}</td>
                                    <td>{item && item.tel ? item.tel : ''}</td>
                                    <td>{item && item.adresse ? item.adresse : ''}</td>
                                    <td>
                                        <div className='tdIcons'>
                                            <i className="fa-solid fa-download" onClick={() => actionsLineTable(item, "telecharger")}></i>
                                            <i className="fa-solid fa-pencil" onClick={() => actionsLineTable(item, "modifier")}></i>
                                            <i className="fa-solid fa-trash" onClick={() => actionsLineTable(item, "supprimer")}></i>
                                        </div>
                                    </td>
                                </>
                                :
                                <>
                                    <td>{item && item.nom ? item.nom + " " + item.prenom : ''}</td>
                                    <td>{item && item.service ? item.service : ''}</td>
                                    <td>{item && item.dateUseCreate ? item.dateUseCreate.slice(0, 10) : ''}</td>
                                    <td>{item && item.ville ? item.ville : ''}</td>
                                    <td>{item && item.adresse ? item.adresse : ''}</td>
                                    <td>{item && item.tel ? item.tel : ''}</td>

                                    <td>{item && item.statu ? item.statu : ''}</td>
                                    <td>{item && item.nombreRelances ? item.nombreRelances : ''}</td>
                                    <td>{item && item.historiqueActions ? item.historiqueActions : ''}</td>
                                    <td>{item && item.commentaire ? item.commentaire : ''}</td>
                                    <td>
                                        <div className='tdIcons'>
                                            <i className="fa-solid fa-download" onClick={() => actionsLineTable(item, "telecharger")}></i>
                                            <i className="fa-solid fa-pencil" onClick={() => actionsLineTable(item, "modifier")}></i>
                                            <i className="fa-solid fa-trash" onClick={() => actionsLineTable(item, "supprimer")}></i>
                                        </div>
                                    </td>
                                </>
                                
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        
        }
    </>

    );
};

export default Table
