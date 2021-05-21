import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faBusinessTime, faClinicMedical, faPowerOff, faBars, faGift, faIdBadge, faCalendar, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase"
import firebase from "../firebase"

import moment from 'moment';

moment.locale('es');

export default function DashboardEs() {

    const [error, setError] = useState("");
    const history = useHistory()
    const { currentUser, logout } = useAuth();
    const [currentDatos, setcurrenDatos] = useState("");
    const [UpdateProfilePa, setFirstUpda] = useState("")
    const [firtMain, setFirstMain] = useState(true)
    const [currentPerfil, setCurrentPerfil] = useState("");
    const [currentDatosEme, setcurrenDatosEme] = useState("");
    const DiaHoy = moment().format("YYYY-MM-DD")
    const datosPrici = async () => {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("Usuarios")
                .doc(user.uid)
                .get().then(function (doc) {
                    let users = doc.data()
                    setcurrenDatos(users);
                    setcurrenDatosEme(users.disponible_emergencia);
                }).catch(function (error) {
                    console.log("Error getting User:", error);
                    alert(error);
                });
        });
    }





    const getLinks = async () => {
        
        console.log(DiaHoy)
        db.collection("Citas").where("uid_especialista", "==", currentUser.uid).where("estatus", "==", "Pendiente").where("fecha", "==",DiaHoy).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks_1(docs);
        });
        db.collection("Citas").where("uid_especialista","==",currentUser.uid).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
          }); 

    };

    useEffect(() => {
        datosPrici()
        getLinks();
    }, []);
    
    const MostrarPa = async (e) => {
        setLinks([])
        db.collection("Citas").where("uid_especialista", "==", currentUser.uid).where("estatus", "==", e).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
        });
        
        if(e==="0"){
            db.collection("Citas").where("uid_especialista","==",currentUser.uid).onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                  docs.push({ ...doc.data(), id: doc.id });
                });
                setLinks(docs);
              }); 
          }
    };

    const [dispo, setdispo] = useState(true)
    const OnActivo = (e) => {
        if (currentDatosEme === true) {
            setcurrenDatosEme(false)
        }
        if (currentDatosEme === false) {
            setcurrenDatosEme(true)
        }
        if (e === "Activo") {
            setdispo(true)
            db.collection("Usuarios").doc(currentUser.uid).update({
                "disponible_emergencia": dispo,
            })
        } if (dispo === true) {
            setdispo(false)
            db.collection("Usuarios").doc(currentUser.uid).update({
                "disponible_emergencia": dispo,
            })
        }
    }
    const [currentDatosPaDe, setLinks] = useState([]);
    const [currentDatosPaDe_1, setLinks_1] = useState([]);
    const [currentId, setCurrentId] = useState("");
    const [tabla, settabla] = useState(true);


    if (currentId !== "") {
        db.collection("Usuarios")
            .doc(currentId)
            .get().then(function (doc) {
                let users = doc.data()
                setCurrentPerfil(users);
            }).catch(function (error) {
                console.log("Error getting User:", error);
                alert(error);
            });
    }
    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("No se pudo cerrar la sesión")
        }
    }
    function onOcultar(e) {
        var a = e
        if (a === "Ocultar") {
            setFirstMain(false)
        }
        console.log(a)
    }
    function onOcultar1(e) {
        var a = e
        if (a === "Ocultar") {
            setFirstMain(false)
        }
        console.log(a)
    }


    function OnMostrar(e) {
        var a = e
        if (a === "Mostrar") {
            setFirstMain(true)
            setCurrentId("")
        }
        console.log(a)
    }
    function Cancelar(e) {
        db.collection("Citas").doc(e).update({
            "estatus": "Cancelada",
        })
    }

    function Reprogramar(e) {

    }

    return (
        <>
            {error && <Alert variant="danger">{error}</Alert>}
            <input type="checkbox" id="sidebar-toggle" />
            <div className="sidebar">
                <div className="sidebar-header">
                    <h3 className="brand">
                        <span className="ti-unlink"></span>
                        <span ><div id="ig" /></span>
                    </h3>

                    <label for="sidebar-toggle"><FontAwesomeIcon icon={faBars} /></label>
                </div>


                <div className="sidebar-menu" id="sidebar">
                    <ul>
                        <li>
                            <Link to="/DashboardEs">
                                <a>
                                    <a><FontAwesomeIcon icon={faHome} /></a>
                                    <span>Inicio</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="Emergencias">
                                <a>
                                    <a id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance} /></a>
                                    <span >Emergencias</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Agenda">
                                <a id="Agenda">
                                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical} /></a>
                                    <span>Agendas</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/Horarios">
                                <a >
                                    <a className="ti-clipboard"><FontAwesomeIcon icon={faBusinessTime} /></a>
                                    <span>Mis Horarios</span>
                                </a>
                            </Link>
                        </li>

                        <li>
                            <Link to="/Contact">
                                <a>
                                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUser} /></a>
                                    <span>Contactos</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link to="/UpdateProfile">
                                <a >
                                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUserEdit} /></a>
                                    <span>Editar Perfil</span>
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
                    <div className="social-icons"><label>¿Esta activo para recibir emergencia?</label>
                        {currentDatosEme === false ?
                            <img id="BotonEmergencia" src="/boton1.jpeg" onClick={(e) => OnActivo("Activo", e)}></img>
                            : <span></span>}
                        {currentDatosEme === true ?
                            <img id="BotonEmergencia" src="/boton2.jpeg" onClick={(e) => OnActivo("Activo", e)}></img>
                            : <span></span>}
                        <div className="updaPrin"><img src={currentDatos.foto_personal}></img></div>&nbsp;{currentDatos.nombres}
                    </div>

                </header>

                {currentId !== "" ? (
                    <main>

                        <div className="card-single">
                            <div className="text-right cerrar" Style="font-size:20px" onClick={(e) => OnMostrar("Mostrar", e)}>Cerrar</div>
                            <div className="card-single">
                                <div className="card-body">
                                    <div className="updaLis text-center"> <img src={currentPerfil.foto_personal}></img></div>
                                    <div className="">
                                        <h5 className="mt-2">{currentPerfil.nombres}&nbsp;&nbsp;{currentPerfil.apellidos}</h5>
                                        <label>Cedula:</label>
                                        <h5>{currentPerfil.cedula}</h5>
                                        <h5></h5>
                                        <label>Edad:</label>
                                        <h5>{currentPerfil.edad}</h5>
                                        <label>Sexo:</label>
                                        <h5>{currentPerfil.sexo}</h5>
                                        <label>Ciudad:</label>
                                        <h5>{currentPerfil.ciudad}</h5>
                                        <label>Dirección:</label>
                                        <h5>{currentPerfil.direccion}</h5>
                                        <label>Número principal:</label>
                                        <h5>{currentPerfil.num_principal}</h5>
                                        <label>Número secundario:</label>
                                        <h5>{currentPerfil.num_secundario}</h5>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>
                ) : (
                    <p></p>
                )}


                {firtMain === true ?
                    <main>
                        <h2 className="dash-title a"><h1>Consultas para hoy&nbsp;&nbsp; {DiaHoy}</h1></h2>
                        <div className="dash-cards">
                            {currentDatosPaDe_1.length ? (
                                currentDatosPaDe_1.map(array => (
                                    <div className="card-single">
                                        <div className="card-body">
                                            <div className="container" id="A-1"></div>
                                            <div className="mr-3 text-center mt-2 mb-2" onClickCapture={() => setCurrentId(array.uid_paciente)} onClick={(e) => onOcultar("Ocultar", e)}>Ver Perfil</div>
                                            <div>
                                                <label>Paciente:</label>
                                                <h5>{array.nombres_paciente}&nbsp;&nbsp;{array.apellidos_paciente}</h5>
                                                <label>Hora:</label>
                                                <h4>{array.hora}</h4>
                                                <label>Estatus:</label>
                                                <h4>{array.estatus}</h4>
                                            </div>
                                        </div>
                                        <div className="card-footer">
                                            <Link to="/videoConferencia"><div className="text-center" id="ini">Iniciar consulta</div></Link>
                                        </div>
                                        <div className="card-footer">
                                            <div className="text-center"onClick={(e) => Reprogramar(array.uid_paciente, e)}>Reprogramar</div>
                                            <div className="text-center" onClick={(e) => Cancelar(array.id, e)}>Cancelar</div>
                                        </div>
        
                                    </div>
                                ))
                            ) : (
                                <p></p>
                            )}
                        </div>
                        <section className="recent">
                            <div className="activity-grip">
                                {tabla ? (
                                    <div className="activity-card">
                                        <h3 className="c"><h1>Listado de Pacientes</h1></h3>

                                        <div className="table-responsive">
                                            <table>
                                                <thead>
                                                    <tr>
                                                        <th>Nombre</th>
                                                        <th>Perfil</th>
                                                        <th>Estatus</th>
                                                        <th>Fecha</th>
                                                        <th>Opción</th>
                                                        <th>
                                                            <select className="selectEspe" onChange={(e) => MostrarPa(e.target.value, e)}>
                                                                <option value="0" >Todos</option>
                                                                <option value="Pendiente" >Pendientes</option>
                                                                <option value="Reprogramada" >Reprogramadas</option>
                                                                <option value="Cancelada" >Canceladas</option>
                                                            </select>
                                                        </th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {currentDatosPaDe.length ? (
                                                        currentDatosPaDe.map(array => (
                                                            <tr>
                                                                <td>{array.nombres_paciente}</td>
                                                                <td className="td-team">
                                                                    <div onClickCapture={() => setCurrentId(array.uid_paciente)} onClick={(e) => onOcultar1("Ocultar", e)}><div className="img-1"></div></div>
                                                                </td>
                                                                
                                                                <td>{array.estatus}</td>
                                                                <td>{array.fecha}</td>
                                                                <td><div>Ir a consulta</div></td>
                                                            </tr>
                                                        )
                                                        )
                                                    ) : (
                                                        <p></p>
                                                    )}
                                                </tbody>

                                            </table>
                                        </div>
                                    </div>
                                ) : (
                                    <p></p>
                                )}
                                
                            </div>
                        </section>

                    </main>
                    :
                    <span></span>
                }
            </div>

        </>
    )
}
