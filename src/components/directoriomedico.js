import React, { useState, useEffect } from "react";
import './Dashboard.css';
import { useHistory, Link } from "react-router-dom";
import { db } from "../firebase";
import { useAuth } from "../contexts/AuthContext";
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import firebase from "../firebase"

export default function Directorio() {

    const [error, setError] = useState("");
    const { logout } = useAuth("");
    const [currentDatos, setcurrenDatos] = useState("");
    const history = useHistory("")
    
    const [currentDirectorio, setcurrenDirectorio] = useState([]);
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
          db.collection("Usuarios")
            .doc(user.uid)
            .get().then(function (doc) {
              let users = doc.data()
              setcurrenDatos(users.nombres); 
            });
        })
        db.collection("Usuarios").where("tipouser", "==", "Especialista").onSnapshot((querySnapshot) => {
          const docs = [];
          querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
          });
          setcurrenDirectorio(docs);
          console.log(currentDirectorio)
      });
        
      }, []);

    function Direct(e) {
        db.collection("Usuarios").where("especialidad", "==", e).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setcurrenDirectorio(docs);
            console.log(currentDirectorio)
        });
        if(e==="0"){
          db.collection("Usuarios").where("tipouser", "==", "Especialista").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setcurrenDirectorio(docs);
            console.log(currentDirectorio)
        });
        }
    }
    function ObtenerId(e) {
        console.log(e)
        localStorage.setItem("id", JSON.stringify(e))
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
              <div></div>&nbsp;{currentDatos}
            </div>
          </header>
          <main>
            <section className="recent">
                <div className="activity-grip">
                    <div className="activity-card">
                        <h3>Directorio</h3>

                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Perfil</th>
                                        <th>Opciones</th>
                                        <th>

                                            <select className="selectEspe" onChange={(e) => Direct(e.target.value, e)}>
                                                <option value="1" >seleccionar</option>
                                                <option value="0" >Todos</option>
                                                <option value="Psicólogo" >Psicológos</option>
                                                <option value="Psiquiatra" >Psiquitras</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDirectorio.length ? (
                                        currentDirectorio.map(arrayDire => (
                                            <tr>
                                                <td>{arrayDire.nombres}&nbsp;{arrayDire.apellidos}</td>
                                                <td className="td-team">
                                                    <div className="img-1"></div>
                                                </td>
                                                <td><Link to="/AgendarCitas"><div className="agendar" onClick={(e) => ObtenerId(arrayDire.uid, e)}><button>Agendar cita</button></div></Link></td>
                                            </tr>
                                        ))
                                    ) : (
                                        <p></p>
                                    )}
                                </tbody>
                            </table>
                        </div>

                    </div>

                   
                </div>
            </section>
            </main>
            </div>
        </>


    )
}