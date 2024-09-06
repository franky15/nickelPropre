import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../images/logo.png";

const Header = () => {

    const [isOpenArrow, setIsOpenArrow] = useState({
        services: false,
        zone: false
    });

    return (
        <header >
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
                            <div className="subMenuServices">
                                <ul className="ulMenu">
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
                        <ul className="ulMenu">
                            <li className="nav-item">
                                <Link className="nav-link" to="/">Acceuil</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">Société</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/services"
                                    onClick={() => setIsOpenArrow({ ...isOpenArrow, services: !isOpenArrow.services })}
                                >Services
                                    {isOpenArrow.services ? <i className="fas fa-chevron-up"></i> : <i className="fas fa-chevron-down"></i>}
                                </Link>
                                {isOpenArrow.services &&
                                    <div className="subMenuServices">
                                        <ul className="ulMenu">
                                            <li><Link to="/services">Meubles</Link></li>
                                            <li><Link to="/services">Matelas</Link></li>
                                            <li><Link to="/services">Voitures</Link></li>
                                        </ul>
                                    </div>
                                }
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/blog">Blog</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
