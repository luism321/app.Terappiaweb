import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"
import 'moment/locale/es'
import moment from 'moment';
moment.locale('es');



export default function Inicio() {
  const [error, setError] = useState("");
  const [currentDatos_2, setcurrenDatos_2] = useState("");
  const { currentUser, logout } = useAuth("");
  const [currentDatosPa, setcurrenDatosPa] = useState([]);
  const history = useHistory("")
  const id = currentUser.uid
  const [Panel, setPanel] = useState(true)


  const Hamil = async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("Usuarios")
        .doc(user.uid)
        .get().then(function (doc) {
          let users = doc.data()
          setcurrenDatos_2(users.nombres);
        });
    })
    db.collection("Citas").where("uid_paciente","==",currentUser.uid).onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setcurrenDatosPa(docs);
      }); 

  }
  useEffect(() => {
    Hamil();
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
    <>
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
              <Link to="/Miscitas">
                <a>
                  <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical} /></a>
                  <span>Mis citas</span>
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
            <div></div>&nbsp;{currentDatos_2}
          </div>
        </header>
        <main>
          {Panel === true ?
            <div>
              <h2 className="dash-title">MisCitas</h2>
              <div className="dash-cards ">
                {currentDatosPa ? (
                  currentDatosPa.map(array => (
                    <div className="card-single">
                      <div className="card-body">
                        <div className="container" id="A-1"></div>
                        <div className="text-center">
                        <label>Especialista:</label>
                          <h5 className="">{array.nombre_especialista}&nbsp;&nbsp;{array.apellido_especialista}</h5>
                          <label></label>
                          <h5>{array.especialista}</h5>
                          <label>Fecha:</label>
                          <h5>{array.fecha}</h5>
                          <h5></h5>
                          <label>Hora:</label>
                          <h5>{array.hora}</h5>
                          <label>Estatus:</label>
                          <h5>{array.estatus}</h5>
                        </div>
                      </div>
                    </div>
                  )
                  )) : (
                  <div></div>
                )}
              </div>

            </div>
            : <div></div>}
        </main>
      </div>

    </>

  )
}
