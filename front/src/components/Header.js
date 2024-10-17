import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

//importation des éléments de redux
import { useDispatch, useSelector } from 'react-redux';

//importation des éléments de redux
import { logout } from "../pages/auth/AuthSlice";

import servicesData from "../datas";

//importation des styles
import { Colors } from "../styles/GlobalStyles";

const Header = () => {

    const dispatch = useDispatch();
    const userStore = useSelector((state) => state.auth); //auth est le nom du reducer de la page auth

    const location = useLocation(); // Utilisé pour suivre la route active

    // // Exemple de définition de flagUsers dans Header.js
    // const [flagUsers, setFlagUsers] = useState({
    //     componentflag: "Home", // Assurez-vous que c'est initialisé
    //     value: true,
    // });


    // État pour chaque survol individuel (hover)
    const [hoveredItem, setHoveredItem] = useState(null); 

    const [isActive, setIsActive] = useState({
        home: false,
        about: false,
        services: false,
        blog: false,
        contact: false,
        login: false,
        dashboard: false
    });

    // État pour gérer l'ouverture des sous-menus (isOpenArrow)
    const [isOpenArrow, setIsOpenArrow] = useState({
      services: false,
      zone: false,
    });

    //gestion du state d'affichage du login et logout
    const [isTokenExist, setIsTokenExist] = useState(false);

    //affichage du premier menu
    const [isOpenMenuOne, setIsOpenMenuOne] = useState(false);

    //affichage du deuxième menu
    const [isOpenMenuTwo, setIsOpenMenuTwo] = useState(false);

    const barHeight = "5px";

    // Utilisation de useEffect pour synchroniser isActive avec l'URL
    useEffect(() => {

        if (location.pathname === '/') {
            setIsActive({ home: true, about: false, services: false, blog: false, contact: false });
        } else if (location.pathname.startsWith('/about')) {
            setIsActive({ home: false, about: true, services: false, blog: false, contact: false });
        } else if (location.pathname.startsWith('/service')) {
            setIsActive({ home: false, about: false, services: true, blog: false, contact: false });
        } else if (location.pathname.startsWith('/blog')) {
            setIsActive({ home: false, about: false, services: false, blog: true, contact: false });
        } else if (location.pathname.startsWith('/contact')) {
            setIsActive({ home: false, about: false, services: false, blog: false, contact: true });
        } else if (location.pathname.startsWith('/auth')) {
            setIsActive({ home: false, about: false, services: false, blog: false, contact: false, login: true });
        } else if (location.pathname.startsWith('/admin')) {
            setIsActive({ home: false, about: false, services: false, blog: false, contact: false, dashboard: true });
        } else {
            // Reset if no match
            setIsActive({ home: false, about: false, services: false, blog: false, contact: false });
        }
        
       

        //récupération du token dans le localstorage
        const token = localStorage.getItem('token');
        if (token) {
            setIsTokenExist(true);
        }

    }, [location.pathname, userStore]);

    // Gérer les événements de survol (hover)
    const handleMouseOver = (item) => setHoveredItem(item);
    const handleMouseOut = () => setHoveredItem(null);

    //récupération de la taille de page
    const [width, setWidth] = useState(window.innerWidth);
    const breakpointMobile = 738;

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        //NB: le resize est un événement qui se déclenche à chaque fois que la taille de la fenêtre change
        window.addEventListener('resize', handleResize);
        
        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);


    // console.log("isOpenMenuTwo", isOpenMenuTwo);

    return (
        <header>
            <div className="topHeader">

                {
                    <div className='socialFirst'>
                            
                        <Link className="navbar-social" to="https://www.facebook.com/profile.php?id=61563849463248"
                            target="_blank"   // Ouvre le lien dans un nouvel onglet
                            rel="noopener noreferrer"  // Sécurise l'ouverture du lien
                        >
                            <i className="fa-brands fa-facebook"></i>
                        </Link>
                        <Link className="navbar-social" to="/">
                            <i className="fa-brands fa-instagram"></i>
                        </Link>
                
                    </div>
                }

                {
                    //  !isOpenMenuOne &&
                    <div className="menuIcon"

                    style={isOpenMenuOne ? { color: "#1093EB" } : { color: "white" }}
                    onClick={() => setIsOpenMenuOne((prev) => !prev)}
                   
                >
                    <i className="fas fa-bars"></i>

                    
                </div>}

                {
                    // isOpenMenuOne &&
                    <ul className="ulMenu"

                        style={!isOpenMenuOne && width <= breakpointMobile ? { display: "none" } : { 
                            display: "block",
                            width: "90%",
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            paddingLeft: "10px",
                            fontSize: "13px",
                            fontWeight: "bold",
                            // border: "1px solid #1093EB",
                        }}
                        

                    >
                        
                        <div className="topHeaderLeft">

                            <li className="nav-item">
                                <span className="nav-link"
                                    onClick={() => setIsOpenArrow({ ...isOpenArrow, zone: !isOpenArrow.zone })}
                                >
                                    <i className="fas fa-location-dot"></i>
                                    Zones d’intervention {isOpenArrow.zone ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                                </span>

                                {isOpenArrow.zone &&
                                    <div className="subMenuZoneContainer">
                                        <ul className="ulMenuZone">
                                            <li>Paris</li>
                                            <li>Limoges</li>
                                        </ul>
                                    </div>
                                }
                            </li>

                            <li className="nav-item">
                                <i className="fas fa-phone"></i> +33768893729
                            </li>

                        </div>

                        <div className='social socialTwo'>
                            
                            <Link className="navbar-social" to="https://www.facebook.com/profile.php?id=61563849463248"
                                target="_blank"   // Ouvre le lien dans un nouvel onglet
                                rel="noopener noreferrer"  // Sécurise l'ouverture du lien
                            >
                                <i className="fa-brands fa-facebook"></i>
                            </Link>
                            <Link className="navbar-social" to="/">
                                <i className="fa-brands fa-instagram"></i>
                            </Link>
                        
                        </div>

                        <li className="nav-item emailNav">
                            <i className="fas fa-envelope"></i> fv@nickelpropre.fr
                        </li>
                    </ul>
                
                }
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">

                <div className="container-fluid">

                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" width="50" height="50" />
           
                    </Link>
                    
                   { 
                        // width && width < breakpointMobile &&
                   
                        <i class="fa-solid fa-chevron-down menuIcon"
                            style={isOpenMenuTwo ? { color: "#1093EB" } 
                            
                            : { color: "#1093EB" } }


                            onClick={() => setIsOpenMenuTwo((prev) => !prev)}
                        ></i>

                    }
                    
            

                    {

                        <div className="collapse navbar-collapse"
                       
                            id="navbarNav"

                            style={!isOpenMenuTwo && width <= breakpointMobile ? { display: "none" } : { display: "block" }}

                        >
                            <ul className="ulMenu ulMenuNav">
                                {/* Lien Accueil */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/"
                                        style={hoveredItem === "home" || isActive.home ? { color: "#1093EB" } : { color: "black" }}
                                        onMouseOver={() => handleMouseOver("home")}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Accueil
                                    </Link>
                                </li>

                                {/* Lien Société */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/about"
                                        style={hoveredItem === "about" || isActive.about ? { color: "#1093EB" } : { color: "black" }}
                                        onMouseOver={() => handleMouseOver("about")}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Société
                                    </Link>
                                </li>

                                {/* Lien Services */}
                                <li className="nav-item" onClick={() => setIsOpenArrow({ ...isOpenArrow, services: !isOpenArrow.services })}>
                                    <Link className="nav-link" 
                                        style={hoveredItem === "services" || isActive.services ? { color: "#1093EB" } : { color: "black" }}
                                        onMouseOver={() => handleMouseOver("services")}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Services
                                    </Link>
                                    {isOpenArrow.services ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                                    {isOpenArrow.services &&
                                        <div className="subMenuServices">
                                            <ul className="ulMenu">
                                                {
                                                    servicesData.map((service, index) => {
                                                        return (
                                                            <li key={`nav-${service.id}-${service.title}`}>
                                                                <Link className="services-link" to={`/service/${service.id}`}>
                                                                    {service.keyWords}
                                                                </Link>
                                                            </li>
                                                        );
                                                    })
                                                }
                                            </ul>
                                        </div>
                                    }
                                </li>

                                {/* Lien Blog */}
                                <li className="nav-item">
                                    <Link className="nav-link" to="/blog"
                                        style={hoveredItem === "blog" || isActive.blog ? { color: "#1093EB" } : { color: "black" }}
                                        onMouseOver={() => handleMouseOver("blog")}
                                        onMouseOut={handleMouseOut}
                                    >
                                        Blog
                                    </Link>
                                </li>

                                {
                                    isTokenExist &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/admin/dashboard"
                                            onClick={() => {
                                                
                                            }}
                                            style={hoveredItem === "dashboard" || isActive.dashboard ? { color: "#1093EB" } : { color: "black" }}
                                            onMouseOver={() => handleMouseOver("dashboard")}
                                            onMouseOut={handleMouseOut}
                                        >
                                            Dashboard
                                        </Link>
                                    </li>
                                }

                                {/* Login / Logout */}
                                {
                                    !isTokenExist &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/auth/login"
                                            style={hoveredItem === "login" || isActive.login ? { color: "#1093EB" } : { color: "black" }}
                                            onMouseOver={() => handleMouseOver("login")}
                                            onMouseOut={handleMouseOut}
                                        >
                                            Login
                                        </Link>
                                    </li>
                                }

                                {
                                    isTokenExist &&
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/auth/login"
                                            onClick={() => {
                                                dispatch(logout());
                                                localStorage.removeItem('userId');
                                            }}
                                            style={hoveredItem === "logout" || isActive.logout ? { color: "#1093EB" } : { color: "black" }}
                                            onMouseOver={() => handleMouseOver("logout")}
                                            onMouseOut={handleMouseOut}
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                }

                                {/* Lien Contact */}
                                {/* <li className="nav-item contact">
                                    <Link className="nav-link linkContact" to="/contact"
                                        style={isActive.contact ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                                    >
                                        Nous contacter
                                    </Link>
                                </li> */}
                            </ul>
                        </div>
                    
                    }

                </div>

            </nav>
        </header>
    );
};

export default Header;
