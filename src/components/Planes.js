import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"

export default function Planes() {
    const [error, setError] = useState("");
    const { logout } = useAuth("");
    const [currentDatos_3, setcurrenDatos_3] = useState("");
    const history = useHistory("")


    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("Usuarios")
                .doc(user.uid)
                .get().then(function (doc) {
                    let users = doc.data()
                    setcurrenDatos_3(users.nombres);
                });
        })


    }, []);

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("No se pudo cerrar la sesión")
        }
    }



    return (
        <div>
            {error && <Alert variant="danger">{error}</Alert>}
            <input type="checkbox" id="sidebar-toggle" />

            <div className="sidebar">
                <div className="sidebar-header">
                    <h3 className="brand">
                        <span className="ti-unlink"></span>
                        <span ><div id="ig" /></span>
                    </h3>
                    <label htmlFor="sidebar-toggle"><FontAwesomeIcon icon={faBars} /></label>
                </div>

                <div className="sidebar-menu" id="sidebar">
                    <ul>
                        <li>
                            <Link to="/">
                                <a >
                                    <a><FontAwesomeIcon icon={faHome} /></a>
                                    <span>Inicio</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Emergencia">
                                <a >
                                    <a id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance} /></a>
                                    <span id="ti-face-smile">Emergencia</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Directorio">
                                <a>
                                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical} /></a>
                                    <span>Directotio</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Planes" >
                                <a>
                                    <a id="planes"><FontAwesomeIcon icon={faFunnelDollar} /></a>
                                    <span id="planes" >Planes</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Update">
                                <a >
                                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUserEdit} /></a>
                                    <span>Editar perfil</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Contactos">
                                <a>
                                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUser} /></a>
                                    <span>Contactos</span>
                                </a>
                            </Link>
                        </li>

                        <li id="cerrar">
                            <a onClick={handleLogout}>
                                <a ><FontAwesomeIcon icon={faPowerOff} /><span >Cerrar sesíon</span></a>
                            </a>
                        </li>

                    </ul>
                </div>
            </div>
            <div className="main-content">
                <header className="row" >
                    <div className="search-wrapper">
                    </div>
                    <div className="social-icons">
                        <span className="ti-bell"><FontAwesomeIcon icon={faBell} /></span>
                        <span className="ti-comment"><FontAwesomeIcon icon={faCommentAlt} /></span>
                        <div></div>&nbsp;{currentDatos_3}
                    </div>
                </header>
                <main>
                    <h1 className="dash-title text-center mb-5">Planes Psicólogo</h1>
                    <div className="dash-cards">
                        <div className="card-single_planes text-center">
                            <div className="card-body">
                                <div>
                                    <div id="stars"><div></div></div>
                                    <h3 className="mb-3" id="titleBasico">Plan Básico</h3>
                                    <div>
                                        <h1 className="mb-5" >$10</h1>
                                    </div>

                                    <div className="mb-3">
                                        5% de descuento en las siguientes 4 consultas y/o emergencias.
                            </div>
                                    <div className="mb-5 " >
                                        <button id="buttonPlanes" href="">Elegir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-single_planes text-center" >
                            <div className="card-body">
                                <div className="text-center">
                                    <div id="starsEstandar"><div></div></div>
                                    <h3 className="mb-3 " id="titleEstandar" >Plan Estándar</h3>
                                    <div>
                                        <h1 className="mb-5" >$20</h1>
                                    </div>
                                    <div className="mb-3">
                                        7% de descuento en las siguientes 12 consultas y/o emergencias.
                            </div>
                                    <div className="mb-5 " >
                                        <button id="buttonPlanes" href="">Elegir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-single_planes text-center" >
                            <div className="card-body">
                                <div>
                                    <div id="starsPremiun"><div></div></div>
                                    <h3 className="mb-3" id="titlePremiun">Plan Premium</h3>
                                    <div>
                                        <h1 className="mb-5" >$30</h1>
                                    </div>
                                    <div className="mb-3">
                                        10% de descuento en las siguientes 24 consultas y/o emergencias.
                            </div>
                                    <div className="mb-5 " >
                                        <button id="buttonPlanes" href="">Elegir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h1 className="dash-title text-center">Planes Psiquiatras</h1>
                    <div className="dash-cards">
                        <div className="card-single_planes text-center">
                            <div className="card-body">
                                <div>
                                    <div id="stars"><div></div></div>
                                    <h3 className="mb-3" id="titleBasico">Plan Básico</h3>
                                    <div>
                                        <h1 className="mb-5" >$10</h1>
                                    </div>

                                    <div className="mb-3">
                                        5% de descuento en las siguientes 4 consultas y/o emergencias.
                            </div>
                                    <div className="mb-3">
                                        5% de descuento en traslado de récipe durante un mes.
                            </div>
                                    <div className="mb-5 " >
                                        <button id="buttonPlanes" href="">Elegir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-single_planes text-center">
                            <div className="card-body">
                                <div>
                                    <div id="starsEstandar"><div></div></div>
                                    <h5 className="mb-3" id="titleEstandar" >Plan Estándar</h5>
                                    <div>
                                        <h1 className="mb-5" >$20</h1>
                                    </div>

                                    <div className="mb-3">
                                        7% de descuento en las siguientes 12 consultas y/o emergencias.
                            </div>
                                    <div className="mb-3">
                                        10% de descuento en traslado de récipe durante tres meses.
                            </div>
                                    <div className="mb-5 " >
                                        <button id="buttonPlanes" href="">Elegir</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card-single_planes text-center" >
                            <div className="card-body">
                                <div>
                                    <div id="starsPremiun"><div></div></div>
                                    <h3 className="mb-3" id="titlePremiun">Plan Premium</h3>
                                    <div>
                                        <h1 className="mb-5" >$30</h1>
                                    </div>

                                    <div className="mb-3">
                                        10% de descuento en las siguientes 24 consultas y/o emergencias.
                            </div>
                                    <div className="mb-3">
                                        15% de descuento en el traslado del récipe durante seis meses.
                            </div>
                                    <div className="mb-5 " >
                                        <button id="buttonPlanes" href="">Elegir</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </main>
            </div>
        </div>
    )
}
