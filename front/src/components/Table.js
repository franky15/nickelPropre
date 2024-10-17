import React, { useState, useEffect } from 'react';
import { useDispatch} from 'react-redux';

import HistoriqueActionEffectuees from './HistoriqueActionEffectuees';
import { updateUser } from '../pages/admin/user/SliceUser';

const Table = ({
    ComponentShowTable, users,allUsers,
    chantiers, allChantiers, setItemUpdateChoice, itemUpdateChoice,
    indexPage, nombreLignes, setNombreLignes,
    sousListe, setSousListe, actionsTable, setactionsTable,
    component,

    setShowItemUser,setShowContactSearchFilter,
    setShowHideInputUser,
}) => {
    const dispatch = useDispatch();


   
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

        //constitution des clés via les id des users 
        if(users && users.length > 0){

            const clésUsers = users.reduce((accumulateur, item) => {
                accumulateur[item.id] = false;
                return accumulateur;
            }
            , {});

            if (clésUsers) {
                // setKeysActionsEffectueesRelances(clésUsers);
                // setKeysActionsEffectueesRelances({
                //     appel: clésUsers,
                //     mail: clésUsers,
                //     sms: clésUsers,
                // });
    
                setStatusKeyUser(clésUsers);
                setNbRelanceKeyUser(clésUsers);
    
                
                //fonction pour constitution des actionsEffectuees+clé pour avoir un nom de clé dynamique et suffisament unique pour chaque action effectuée
                const keyactionEffectuéFunction = () => {
    
                    // const actionsEffectuees = ["appel", "mail", "sms"];
                    const clésActionsEffectuees = Object.keys(clésUsers).reduce((accumulateur, action) => {
                    
                        for (let i = 0; i < listeActionsEffectuees.length; i++) {
    
                            accumulateur[listeActionsEffectuees[i] + action] = 0;
    
                        }
    
                        return accumulateur;
                    }
                    , {});
    
                    setKeysActionsEffectueesRelances(clésActionsEffectuees);
                }
    
                keyactionEffectuéFunction();
               
            }

        }

        
        

    }, [chantiers, users, ComponentShowTable, component]);

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

            console.log("users", users);
        }

    }, [chantiers, users, nombreLignes, ComponentShowTable, component]);




    // State for modal management and selection
    const [modalHistorique, setModalHistorique] = useState(true);
    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedValues, setCheckedValues] = useState([]);
    const [quantiteActionsEffectuees, setQuantiteActionsEffectuees] = useState({
        appel: 0,
        mail: 0,
        sms: 0,
    });
    const [keysQuantiteActionsEffectuees, setKeysQuantiteActionsEffectuees] = useState({});
    const [statusValue, setStatusValue] = useState("");
    const [statusKeyUser, setStatusKeyUser] = useState("");
    const [nbRelanceValue, setNbRelanceValue] = useState("");
    const [nbRelanceKeyUser, setNbRelanceKeyUser] = useState("");
    const [keysactionsEffectueesRelances, setKeysActionsEffectueesRelances] = useState({});
    
    // State for user forms
    const [usersForm, setUsersForm] = useState({
        nom: users?.nom || "",
        prenom: users?.prenom || "",
        dateUseCreate: users?.dateUseCreate || "",
        ville: users?.ville || null,
        adresse: users?.adresse || null,
        tel: users?.tel || null,
        codePostal: users?.codePostal || null,
        password: users?.password || "",
        email: users?.email || "",
        reduction: users?.reduction || null,
        region: users?.region || "",
        role: users?.role || "",
        typeClient: users?.typeClient || "",
        id: users?.id || null,
        status: users?.status || "",
        nombreRelances: users?.nombreRelances || 0,
        nombreAppel: users?.nombreAppel || 0,
        nombreMail: users?.nombreMail || 0,
        nombreSms: users?.nombreSms || 0,
    });

    const listeActionsEffectuees = ["nombreAppel", "nombreMail", "nombreSms"];
    const listeStatutUser = ["Nouveau", "Contacté", "Converti", "Non converti", "Qualifié", "Chantiers"];
    const headerTableChantiers = ["Services", "Statut", "Nbr de places/TV", "Date Prestation", "Prestataire", "Heure", "Nom du client", "Tel", "Adresse", "Actions"];
    const hearderTableUsers = ["Nom Prospect", "Service", "Date arrivée", "Ville", "Adresse", "Tel", "Statu", "Nbr de relances", "Historique d'actions", "Besoin", "Actions"];
    
    // Validate props
    const propsValidated = (ComponentShowTable === "chantiers") 
        ? (chantiers && allChantiers)
        : (users && allUsers);
    
    // Display loading state
    if (!propsValidated) {
        return <div>Chargement des données...</div>;
    }

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

            if(component === "GetUsers" || component === "GetChantiers"){
                setShowContactSearchFilter(false);

                console.log("test dans Contact");
            }

            if(component === "GetUsers"){
                setShowHideInputUser((prev) => !prev);
            }

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
        }else if(choice === "voirPlus"){

            setModalHistorique(false);

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

     //soumission du formulaire global
     const handleSubmit = (e, item, choice) => {

        e.preventDefault();

        const { name, value } = e.target;
        
        // console.log("item", item);
        // console.log("[item.id]", [item.id]);
        console.log("name", name, "value", value);

        console.log("choice", choice);
       console.log("item de Table avant", item);

        if(choice === "status"){

           item.status = value;

           console.log("item status", item);

            //pour mettre à jour le statut de l'utilisateur dans la base de données
            setUsersForm((prev) => ({
                ...prev,
                ...item,
                status: value
            }));

            setStatusKeyUser((prev) => ({
                ...prev,
                [item.id]: true
            }));

            if(item.status !== "" && item.status){

                console.log("item status", item);

                dispatch(updateUser(item))
            }

        }else if(choice === "nomberRelances"){

            
             item.nombreRelances = parseInt(value);

          

            //pour mettre à jour le nombre de relances de l'utilisateur dans la base de données
            setUsersForm((prev) => ( {
                ...prev,
                ...item,
                nombreRelances: value
            } ));

            setNbRelanceKeyUser((prev) => ({
                ...prev,
                [item.id]: parseInt(value)
            }));

            if(item.nombreRelances !== "" && item.nombreRelances){

                console.log("item nomberRelances", item);

                dispatch(updateUser(item))
            }

           
        }else if(choice === "actionsEffectuees"){
                
            //retrait du chiffre de la clé pour avoir le nom de l'action
            
           

            const nameKey = name.split(item.id)[0];
            console.log("nameKey", nameKey);

            item[nameKey] = parseInt(value); 

            setUsersForm((prev) => ({
                ...prev,
                ...item,
                [nameKey]: parseInt(value)
            }));

            setKeysActionsEffectueesRelances((prev) => ({
                ...prev,
                [name]: parseInt(value)
            }));

            if(item[nameKey] !== "" && item[nameKey]){

                console.log("item actionsEffectuees", item);

                dispatch(updateUser(item))
            }

        }
 
    };


    return (
        <>
            {modalHistorique ?
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
                        {(ComponentShowTable === "chantiers" ? 
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
                                        <td>
                                            <div className='btnChantier' onClick={() => item && item.id && actionsLineTable(item, "modifier")}>
                                                {item && item.service ? item.service : 'Votre service'} 
                                                {item && item.id && <i className="fa-solid fa-star"></i>}
                                            </div>
                                        </td>
                                        <td>{item && item.dateUseCreate ? item.dateUseCreate.slice(0, 10) : ''}</td>
                                        <td>{item && item.ville ? item.ville : ''}</td>
                                        <td>{item && item.adresse ? item.adresse : ''}</td>
                                        <td>{item && item.tel ? item.tel : ''}</td>
                                        <td>
                                            <select className="statusInput" name={[item.id]} value={statusValue[item.id] || item.status} 
                                                onChange={(e) => handleSubmit(e, item, "status")}>
                                                <option value="">Sélectionnez un statut</option>
                                                {listeStatutUser.map((statut, index) => (
                                                    <option key={index} value={statut}>
                                                        {statut.charAt(0).toUpperCase() + statut.slice(1).toLowerCase()}
                                                    </option>
                                                ))}
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                className='nombreRelancesInput'
                                                type='number'
                                                min={0}
                                                name={[item.id]}
                                                value={item.nombreRelances || 0}
                                                onChange={(e) => handleSubmit(e, item, "nomberRelances")}
                                            />
                                        </td>
                                        <td>
                                            {listeActionsEffectuees.map((action, index) => (
                                                <div key={index} className='containerAction'>
                                                    <span className='containerAction__title'>{action.slice(6)}</span>
                                                    <div className='containerAction__btn'>
                                                        <input
                                                            type='number'
                                                            name={action + item.id}
                                                            min={0}
                                                            value={keysactionsEffectueesRelances[action + item.id] || item[action]}
                                                            onChange={(e) => handleSubmit(e, item, "actionsEffectuees")}
                                                        />
                                                    </div>
                                                </div>
                                            ))}
                                            <p className='seeMoreTable' onClick={() => actionsLineTable(item, "voirPlus")}>
                                                Voir Plus...
                                            </p>
                                        </td>
                                        <td>{item && item.besoin ? item.besoin : ''}</td>
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
                :
                <HistoriqueActionEffectuees itemUpdateChoice={itemUpdateChoice} setModalHistorique={setModalHistorique}/>
            }
        </>
    );
};

export default Table;
