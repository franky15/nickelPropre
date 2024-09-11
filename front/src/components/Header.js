import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/logo.png";

import servicesData from "../datas";

//importation des styles
import { Colors } from "../styles/GlobalStyles";

const Header = () => {

    const location = useLocation(); // Utilisé pour suivre la route active

    const [isOpenArrow, setIsOpenArrow] = useState({
        services: false,
        zone: false
    });

    const [isActive, setIsActive] = useState({
        home: false,
        about: false,
        services: false,
        blog: false,
        contact: false
    });

    console.log('isOpenArrow', isOpenArrow);

    const barHeight = "2px";

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
        } else {
            // Reset if no match
            setIsActive({ home: false, about: false, services: false, blog: false, contact: false });
        }
    }, [location.pathname]); // Cette fonction se déclenche à chaque changement de route

    
    

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
                            <li className="nav-item"
                                style={isActive.home ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                            >
                                <Link className="nav-link" to="/">Accueil</Link>
                            </li>
                            <li className="nav-item"
                                style={isActive.about ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                            >
                                <Link className="nav-link" to="/about">Société</Link>
                            </li>
                            <li className="nav-item"
                                onClick={() => setIsOpenArrow({ ...isOpenArrow, services: !isOpenArrow.services })}
                                style={isActive.services ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                            >
                                <Link className="nav-link" >Services</Link>
                                {isOpenArrow.services ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                                {isOpenArrow.services &&
                                    <div className="subMenuServices">
                                        <ul className="ulMenu ">
                                       
                                            {
                                                servicesData.map((service, index) => {
                                                    return (
                                                        <li key={index-"nav"} >
                                                            
                                                            <Link 
                                                                className="services-link"
                                                                to={`/service/${service.id}`}
                                                            >{service.keyWords}</Link>
                                                        </li>
                                                    );
                                                })

                                                
                                            }
                                            

                                        </ul>
                                    </div>
                                }
                            </li>
                            <li className="nav-item"
                                style={isActive.blog ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                            >
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                            <li className="nav-item contact"
                                style={isActive.contact ? { borderTop: `${barHeight} solid ${Colors.primary}` } : { border: "none" }}
                            >
                                <Link className="nav-link linkContact" to="/contact"> Nous contacter</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
