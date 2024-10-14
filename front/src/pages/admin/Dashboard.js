import React,{useState, useEffect} from 'react';

//importation des éléments de redux
import { useDispatch, useSelector } from 'react-redux';

import Header from '../../components/Header';
import { GetArticles } from '../blog';
import { GetChantiers } from './chantier';
import { GetServices } from './service';
import { GetUsers } from './user';

//importation des éléments de redux
import { getChantiers } from '../../pages/admin/chantier/SliceChantier';
import { getUsers } from '../../pages/admin/user/SliceUser';


const Dashboard = () => {

    const dispatch = useDispatch();
    const chantiersStore = useSelector((state) => state.chantier.chantiers);

    // console.log("***chantiersStore dans GetChantiers:", chantiersStore);

    ///////////////////////////////

    //gestion du state des sous listes pour la pagination
    const [sousListe, setSousListe] = useState([]);

    //gestion du state du nombre de lignes du tableau par page
    const [nombreLignes, setNombreLignes] = useState(5);

    //gestion du state de l'item à modifier ou à supprimer ou à télécharger ou à afficher dans le tableau
    const [itemUpdateChoice, setItemUpdateChoice] = useState({});

    //gestion du state de l'index de la page
    const [indexPage, setIndexPage] = useState(1);

    //gestion du state des actions du tableau
    const [actionsTable, setactionsTable] = useState({
        telecharger: false,
        modifier: false,
        supprimer: false,
    });

    //gestion du state du bouton créer un chantier ou un utilisateur du composant InputFormSearchFilter
    const [btnCreate, setBtnCreate] = useState(true);


    ///////////////////////////////

    //gestion de l'affichage des différentes fenêtres modales ou des boutons
    const [btnChoice, setBtnChoice] = useState({

        Chantiers: false,
        Prospects: true,
        Clients: false,
        Villes: false,
        Services: false,
        Salariés: false,
        Blog: false,

    });

    const [allChantiers, setAllChantiers] = useState([]);  
    const [chantiers, setchantiers] = useState([]);

    const [allUsers, setAllUsers] = useState([]); 
    const [users, setUsers] = useState([]);


    //gestion du state de l'affichage progressive de la page
    const [isVisibleHome, setIsVisibleHome] = useState(false);


    //state pour gérer le décclenchemment du useEffect pour la récupération des chantiers et utilisateurs ces derniers sont mis à jour dans le store
    const [executeUseEffectFetchDashboard, setExecuteUseEffectFetchDashboard] = useState(false);


    ///////////////////////////////////

    useEffect(() => {

        const fetchData = async () => {

            console.log("Bienvenue dans le useEffect de Dashboard");

            try {

                const response = await dispatch(getChantiers());

                if (response.payload) {

                    const chantiersData = response.payload.data.resGetAllChantiers;
                    
                    // console.log("chantiersData dans Dashboard:", chantiersData);
                    /*const checkedItemsValue = chantiersData.map((item) => item.id);

                    //stockage des valeurs en clé/valeur
                    setCheckedItems(checkedItemsValue.reduce((acc, item) => {
                        acc[item] = false;
                        return acc;
                    }, {}));*/

                    // Récupération des utilisateurs
                    const responseUsers = await dispatch(getUsers());

                    if (responseUsers.payload) {

                        const usersData = responseUsers.payload.data;

                        //console.log("usersData dans GetChantiers:", usersData);

                        //console.log("usersData dans GetChantiers:", usersData);

                        //rajout des noms et prénoms des utilisateurs dans les chantiers
                        const updatedChantiers = chantiersData
                        .filter(user => user !== undefined) // Filtrer les utilisateurs indéfinis
                        .filter(chantier => chantier !== undefined && chantier.Users_id) // Filtrer les chantiers indéfinis
                        .map(chantier => {
                            
                            // Clonage de chaque chantier avant modification car chantier provient de redux et est en lecture seule on ne peut pas le modifier directement
                            const chantierClone = { ...chantier };
                            
                            
                            
                            const userMatch = usersData.find(user => parseInt(chantierClone.Users_id) === parseInt(user.id));
                            
                            // console.log("***userMatch dans GetChantiers:", userMatch);

                            if (userMatch) {
                                // chantierClone.Users_id = `${userMatch.nom} ${userMatch.prenom}`;
                                chantierClone.nom = userMatch.nom;
                                chantierClone.prenom = userMatch.prenom;
                                chantierClone.userCreatorId = userMatch.email;
                                chantierClone.tel = userMatch.tel;

                                //rajout de services et besoin dans usersData

                               
                            }
                            return chantierClone;
                        });

                        //rajout de services et besoin dans les utilisateurs
                        const updatedUsers = usersData
                        .filter(user => user !== undefined) // Filtrer les utilisateurs indéfinis
                        .map(user => {
                            const userClone = { ...user }; // Clonage de l'utilisateur

                            // Vérifie que le chantier correspondant est trouvé
                            const serviceMatch = chantiersData.find(chantier => parseInt(userClone.id) === parseInt(chantier.Users_id));

                            // console.log("serviceMatch dans usersData:", serviceMatch);

                            if (serviceMatch) {
                            // Assigner uniquement si les champs existent
                            userClone.service = serviceMatch.service || 'Service non défini';
                            userClone.besoin = serviceMatch.besoin || 'Besoin non défini';
                            }

                            // console.log("userClone dans usersData:", userClone); // Vérification du contenu de userClone

                            return userClone; // Retourner le clone modifié
                        });


                        // console.log("updatedChantiers dans Dashboard:", updatedChantiers);

                        // console.log("usersData dans Dashboard:", usersData);
                        // console.log("updatedUsers dans Dashboard:", updatedUsers);
                        

                        setchantiers(updatedChantiers);
                        setAllChantiers(updatedChantiers);

                        setUsers(updatedUsers);
                        setAllUsers(usersData);
                    }
                }
            } catch (error) {
                console.log("error dans GetChantiers:", error);
            }

        }
        fetchData();

        
       
    } ,[ executeUseEffectFetchDashboard]); 


    //mise à jour des chantiers quand le store est mis à jour
    /*useEffect(() => {

    

        if(chantiersStore && chantiersStore.length > 0) {

            console.log("chantiersStore dans GetChantiers:", chantiersStore);

            //cette condition permet de ne pas mettre à jour le state si le store est égal à chantiers ainsi éviter une boucle infinie ou  des rendus inutiles
            setchantiers((prevChantiers) => {
                if (prevChantiers !== chantiersStore) {
                    return chantiersStore;
                }
                return prevChantiers;
            });

            setAllChantiers((prevAllChantiers) => {
                if (prevAllChantiers !== chantiersStore) {
                    return chantiersStore;
                }
                return prevAllChantiers;
            });

        }else {

            console.log("Aucun chantier trouvé");

        }

        console.log("chantiers dans GetChantiers dans useEffect:", chantiers);

    }, [chantiersStore]);*/

    // console.log("chantiers dans Dashboars:", chantiers);
    // console.log("users dan Dashboars:", users);

    


    ///////////////////////////////////

    useEffect(() => {


        setTimeout(() => {
            setIsVisibleHome(true); // Déclenche l'affichage progressif
          }, 100); // Délai de 100ms avant de lancer l'animation
      

       
    } ,[]);


   
    const optionBtn = ["Chantiers", "Prospects", "Clients", "Villes", "Services","Salariés", "Blog"  ]


    const handleModal = (option) => {

        switch(option) {
            case "Chantiers":
                setBtnChoice({
                    Chantiers: true,
                    Prospects: false,
                    Clients: false,
                    Villes: false,
                    Services: false,
                    Salariés: false,
                    Blog: false
                });
                break;
            case "Prospects":
                setBtnChoice({
                    Chantiers: false,
                    Prospects: true,
                    Clients: false,
                    Villes: false,
                    Services: false,
                    Salariés: false,
                    Blog: false
                });
                break;
            case "Clients":
                setBtnChoice({
                    Chantiers: false,
                    Prospects: false,
                    Clients: true,
                    Villes: false,
                    Services: false,
                    Salariés: false,
                    Blog: false
                });
                break;
            case "Villes":
                setBtnChoice({
                    Chantiers: false,
                    Prospects: false,
                    Clients: false,
                    Villes: true,
                    Services: false,
                    Salariés: false,
                    Blog: false
                });
                break;
            case "Services":
                setBtnChoice({
                    Chantiers: false,
                    Prospects: false,
                    Clients: false,
                    Villes: false,
                    Services: true,
                    Salariés: false,
                    Blog: false
                });
                break;
            case "Salariés":
                setBtnChoice({
                    Chantiers: false,
                    Prospects: false,
                    Clients: false,
                    Villes: false,
                    Services: false,
                    Salariés: true,
                    Blog: false
                });
                break;
            case "Blog":
                setBtnChoice({
                    Chantiers: false,
                    Prospects: false,
                    Clients: false,
                    Villes: false,
                    Services: false,
                    Salariés: false,
                    Blog: true
                });
                break;
            default:
                break;
        }

       
    }

    // console.log('***btnChoice', btnChoice);

    return (
        <>
            <Header/>
            <div className= {`Dashboard ${isVisibleHome ? 'visibleHome' : ''}`}>
        
                <div className='Dashboard__globalMenu'>
                    {optionBtn.map((option, index) => (
                        <div className={`DashboardBtn ${btnChoice[option] ? 'active' : ''}`} key={index}
                         
                          onClick={() => handleModal(option)}

                        >
                            <p >
                                {option}
                            </p>
                        </div>
                    ))}
                </div>

                <div className='Dashboard__content'>

                {   chantiers.length > 0 && allChantiers.length > 0 &&
                    <div className='children'>

                        { btnChoice.Blog && <GetArticles ComponentShowTable="GetArticles"/>}

                        { btnChoice.Chantiers && 
                            <GetChantiers
                                ComponentShowTable="chantiers" 
                                chantiers={chantiers} setchantiers={setchantiers}  allChantiers = {allChantiers} setExecuteUseEffectFetchDashboard={setExecuteUseEffectFetchDashboard}
                                sousListe={sousListe} setSousListe={setSousListe} nombreLignes={nombreLignes} setNombreLignes={setNombreLignes} indexPage={indexPage} setIndexPage={setIndexPage}
                                actionsTable={actionsTable} setactionsTable={setactionsTable} 
                                itemUpdateChoice={itemUpdateChoice} setItemUpdateChoice={setItemUpdateChoice}
                                setBtnCreate={setBtnCreate} btnCreate={btnCreate}
                                btnChoice={btnChoice}
                            />
                        }
                        { btnChoice.Services && <GetServices ComponentShowTable="Services"/>}
                        { btnChoice.Prospects && 
                            <GetUsers
                             ComponentShowTable="users" users={users} setUsers ={setUsers} allUsers={allUsers} setAllUsers ={setAllUsers} setExecuteUseEffectFetchDashboard={setExecuteUseEffectFetchDashboard}
                             sousListe={sousListe} setSousListe={setSousListe} nombreLignes={nombreLignes} setNombreLignes={setNombreLignes} indexPage={indexPage} setIndexPage={setIndexPage} actionsTable={actionsTable} setactionsTable={setactionsTable}
                             itemUpdateChoice={itemUpdateChoice} setItemUpdateChoice={setItemUpdateChoice}
                             setBtnCreate={setBtnCreate} btnCreate={btnCreate}
                             btnChoice={btnChoice}  allChantiers = {allChantiers} 
                             />
                        }
                        
                    </div>
                }
                    <div className='containerIcons'>
                        <i class="fa-regular fa-bell"></i>
                        <i class="fa-regular fa-comment"></i>
                        <i class="fa-regular fa-user"></i>
                        <i class="fa-regular fa-calendar"></i>
                        <i class="fa-regular fa-credit-card"></i>
                    </div>

                </div>
              
                    
            </div>
        </>
       
    );
};

export default Dashboard;