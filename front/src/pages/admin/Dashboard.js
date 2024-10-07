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
    // const userStore = useSelector((state) => state.chantier);

    // console.log("***userStore dans GetChantiers:", userStore);

    const [allChantiers, setAllChantiers] = useState([]);  // Stocke tous les chantiers
    const [chantiers, setchantiers] = useState([]);


    //gestion du state de l'affichage progressive de la page
    const [isVisibleHome, setIsVisibleHome] = useState(false);

    const [services, setServices] = useState([]);

    //gestion du state des différentes fenêtres modales
    let [modal, setModal] = useState({
        blogIsopen: false,
        banqueImagesIsopen: false,
        chantiersIsopen: true,
        servicesIsopen: false,
        utilisateursIsopen: false,

    });


    ///////////////////////////////////

    useEffect(() => {

        const fetchData = async () => {

            try {

                const response = await dispatch(getChantiers());

                if (response.payload) {

                    const chantiersData = response.payload.data.resGetAllChantiers;
                    
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
                        const updatedChantiers = chantiersData.map(chantier => {
                            
                            // Clonage de chaque chantier avant modification car chantier provient de redux et est en lecture seule on ne peut pas le modifier directement
                            const chantierClone = { ...chantier };
                            
                            const userMatch = usersData.find(user => parseInt(chantierClone.Users_id) === parseInt(user.id));
                            if (userMatch) {
                                chantierClone.Users_id = `${userMatch.nom} ${userMatch.prenom}`;
                            }
                            return chantierClone;
                        });

                        setchantiers(updatedChantiers);
                        setAllChantiers(updatedChantiers);
                    }
                }
            } catch (error) {
                console.log("error dans GetChantiers:", error);
            }

        }
        fetchData();

        
       
    } ,[dispatch]); 




    

    ///////////////////////////////////

    useEffect(() => {


        setTimeout(() => {
            setIsVisibleHome(true); // Déclenche l'affichage progressif
          }, 100); // Délai de 100ms avant de lancer l'animation
      

       
    } ,[]);


     const optionBtn = ["Chantiers", "Prospects", "Clients", "villes", "Services","Salariés"  ]

    const optionState = [  "blogIsopen", "banqueImagesIsopen", "chantiersIsopen",  "servicesIsopen", "utilisateursIsopen"]


    const handleModal = (option) => {

        // Ferme toutes les fenêtres modales ou reinitialise les fenêtres modales
        setModal({
            blogIsopen: false,
            banqueImagesIsopen: false,
            chantiersIsopen: false,
            servicesIsopen: false,
            utilisateursIsopen: false
        });

        switch(option) {
            case "Blog":
                setModal({...modal,  blogIsopen: !true,
                    banqueImagesIsopen: false,
                    chantiersIsopen: false,
                    servicesIsopen: false,
                    utilisateursIsopen: false


                });


                break;
            case "Banque Images":
                setModal({...modal, blogIsopen: false,
                    banqueImagesIsopen: true,
                    chantiersIsopen: false,
                    servicesIsopen: false,
                    utilisateursIsopen: false});
                break;
            case "Chantiers":
                setModal({...modal,blogIsopen: false,
                    banqueImagesIsopen: false,
                    chantiersIsopen: true,
                    servicesIsopen: false,
                    utilisateursIsopen: false});
                break;
            case "Services":
                setModal({...modal, blogIsopen: false,
                    banqueImagesIsopen: false,
                    chantiersIsopen: false,
                    servicesIsopen: true,
                    utilisateursIsopen: false});
                break;
            case "Utilisateurs":
                setModal({...modal, blogIsopen: false,
                    banqueImagesIsopen: false,
                    chantiersIsopen: false,
                    servicesIsopen: false,
                    utilisateursIsopen: true});
                break;
            default:
                break;
        }
    }

    // console.log('***modal', modal);


    return (
        <>
            <Header/>
            <div className= {`Dashboard ${isVisibleHome ? 'visibleHome' : ''}`}>
        
                <div className='Dashboard__globalMenu'>
                    {optionBtn.map((option, index) => (
                        <div className={`DashboardBtn ${modal[optionState[index]] ? 'active' : ''}`} key={index}
                         
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

                        { modal.blogIsopen && <GetArticles />}
                        { modal.banqueImagesIsopen && <GetArticles />}
                        { modal.chantiersIsopen && <GetChantiers chantiers={chantiers} setchantiers={setchantiers}  allChantiers = {allChantiers} />}
                        { modal.servicesIsopen && <GetServices />}
                        { modal.utilisateursIsopen && <GetUsers />}
                        
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