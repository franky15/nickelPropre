import React,{useState, useEffect} from 'react';

//importation des éléments de redux
import { useDispatch, useSelector } from 'react-redux';
import { getChantiers } from './SliceChantier';


const GetChantiers = () => {

    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.chantier.chantiers.data.resGetAllChantiers); //chantier est le nom du reducer de la page auth

    console.log("***userStore dans GetChantiers:", userStore);

    const [chantiers, setchantiers] = useState([]);

    useEffect(() => {

        dispatch(getChantiers())
        
        

       
       
    } ,[ userStore.chantier]);
   
    return (
        <div className='GetChantiers'>

            <div className='GetChantiers__filterBtn'>

                <div className='GetChantiers__filterBtn--filter'>
                    <i class="fa-solid fa-magnifying-glass"></i>
                    <input type='text' placeholder='Rechercher un chantier'/>
                    <i class="fa-solid fa-xmark"></i>
                </div>
                
                <button className='contact'>
                    <i class="fa-solid fa-plus"></i>
                    Créer un chantier
                </button>

               
            </div>

            GetChantiers
        </div>
    );
};

export default GetChantiers;