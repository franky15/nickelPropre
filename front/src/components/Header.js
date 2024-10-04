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

    return (
        <header>
            <div className="topHeader">
                <ul className="ulMenu">
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
                    <div className='social'>
                        
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
                    <li className="nav-item">
                        <i className="fas fa-envelope"></i> fv@nickelpropre.fr
                    </li>
                </ul>
            </div>

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        <img src={logo} alt="logo" width="50" height="50" />
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarNav">
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
                            <li className="nav-item contact">
                                <Link className="nav-link linkContact" to="/contact"
                                    style={isActive.contact ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                                >
                                    Nous contacter
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
