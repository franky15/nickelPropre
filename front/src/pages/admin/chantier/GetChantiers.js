import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getChantiers } from './SliceChantier';
import { getUsers } from '../user/SliceUser';
import InputFormSearchFilter from '../../../components/InputFormSearchFilter';
import Contact from '../../public/Contact';

const GetChantiers = ({ chantiers, setchantiers, allChantiers }) => {
    const [actionsTable, setactionsTable] = useState({
        telecharger: false,
        modifier: false,
        supprimer: false,
    });

    const [selectAll, setSelectAll] = useState(false);
    const [checkedItems, setCheckedItems] = useState({});
    const [checkedValues, setCheckedValues] = useState([]);
    const [chantierChoice, setChantierChoice] = useState({});
    const [nombreLignes, setNombreLignes] = useState(5);
    const [sousListe, setSousListe] = useState([]);
    const [indexPage, setIndexPage] = useState(1);
    const [modalContact, setModalContact] = useState(false);

    // Initialiser les checkedItems en fonction des chantiers
    useEffect(() => {
        if (chantiers.length > 0) {
            const checkedItemsValue = chantiers.map((item) => item.id);
            setCheckedItems(checkedItemsValue.reduce((acc, item) => {
                acc[item] = false;
                return acc;
            }, {}));
        }
    }, [chantiers]);

    const headerTable = ["Services", "Statut", "Nbr de places/TV", "Date Prestation", "Prestataire", "Heure", "Nom du client", "Tel", "Adresse", "Actions"];

    // Fonction pour gérer les actions de chaque ligne
    const actionsLineTable = (item, choice) => {
        setChantierChoice(item);
        if (choice === "modifier") {
            setModalContact(true);
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

    // Fonction de fermeture de la modal contact
    const closeModalContact = () => {
        setModalContact(false);
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
        if (chantiers.length > 0) {
            const listElementsPerPage1 = chantiers.reduce((accumulateur, _, indexAcc, array) => {
                if (indexAcc % nombreLignes === 0) {
                    accumulateur.push(array.slice(indexAcc, indexAcc + nombreLignes));
                }
                return accumulateur;
            }, []);
            setSousListe(listElementsPerPage1);
        }
    }, [nombreLignes, chantiers]);

    // Pagination next/previous
    const changeIndexPrev = () => setIndexPage((prev) => Math.max(prev - 1, 1));
    const changeIndexNext = () => setIndexPage((prev) => Math.min(prev + 1, sousListe.length));

    // Fonction pour soumettre et récupérer les valeurs cochées
    const handleSubmit = () => {
        const checkedValues = Object.keys(checkedItems).filter((key) => checkedItems[key]);
        console.log("Cases cochées:", checkedValues);
    };

    return (
        <div className='GetChantiers'>
            {chantiers.length > 0 && allChantiers.length > 0 && (
                <InputFormSearchFilter allChantiers={allChantiers} setchantiers={setchantiers} sousListe={sousListe} />
            )}
            
            {!modalContact && (
                <table className='GetChantiers__table'>
                    <thead>
                        <tr>
                            <th>
                                <input
                                    type="checkbox"
                                    checked={selectAll}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            {headerTable.map((header, index) => (
                                <th key={index}>{header}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(sousListe.length > 0 ? sousListe[indexPage - 1] : chantiers).map((item, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        name={`${item.id}`}
                                        checked={checkedItems[item.id]}
                                        onChange={(e) => {
                                            handleCheckboxChange(e);
                                            setCheckedValues([...checkedValues, item.id]);
                                        }}
                                    />
                                </td>
                                <td>{item.service}</td>
                                <td>{item.status}</td>
                                <td>{item.nombrePlaces}</td>
                                <td>{item.datePrestation}</td>
                                <td>{item.prestation}</td>
                                <td>{item.heurePrestation}</td>
                                <td>{item.Users_id}</td>
                                <td>{item.telClient}</td>
                                <td>{item.adresse}</td>
                                <td>
                                    <div className='tdIcons'>
                                        <i className="fa-solid fa-download" onClick={() => actionsLineTable(item, "telecharger")}></i>
                                        <i className="fa-solid fa-pencil" onClick={() => actionsLineTable(item, "modifier")}></i>
                                        <i className="fa-solid fa-trash" onClick={() => actionsLineTable(item, "supprimer")}></i>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

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
                    <p>{sousListe.length > 0 ? `${indexPage}/${sousListe.length}` : 'Pas de pages disponibles'}</p>
                    <i className="fa-solid fa-caret-right" onClick={changeIndexNext}></i>
                </div>
            </div>

            {modalContact && (
                <Contact 
                    chantierChoice={chantierChoice} 
                    setactionsTable={setactionsTable}  
                    closeModalContact={closeModalContact} 
                />
            )}
        </div>
    );
};

export default GetChantiers;
