import React, { useState, useEffect } from "react";
import './Dashboard.css';
import { Alert } from "react-bootstrap"
import { db } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import { faHome, faUser, faAmbulance,faTrash, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import 'moment/locale/es'
import firebase from "../firebase"

export default function DoctorParaEmergencia() {
    const [currentDatosEmergencia, setcurrenEmergencia ] = useState([]);

    const history = useHistory("");
    const [error, setError] = useState("");
    const [currentDatos_4, setcurrenDatos_4] = useState("");
    const { currentUser, logout } = useAuth("");

    
                        
const Emerge = async () => {
    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Usuarios")
          .doc(user.uid)
          .get().then(function (doc) {
            let users = doc.data()
            setcurrenDatos_4(users.nombres); 
          });
      })
    db.collection("Usuarios").where("disponible_emergencia","==",true).onSnapshot((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
     docs.push({ ...doc.data(), id: doc.id });
        });
    setcurrenEmergencia(docs);
    });
    
    
        }
useEffect(() => {
    Emerge();
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
              <div></div>&nbsp;{currentDatos_4}
            </div>
          </header>
          <main>
           <section className="recent">
               <div className="activity-grip">
                   <div className="activity-card">
                       <h3>Especialista disponibles para emergencias</h3>
                       <div className="table-responsive">
                       <table>
                           <thead>
                               <tr>
                                   <th>Nombre</th>
                                   <th>Perfil</th>
                                   <th>Estatus</th>
                                   <th>Opciones</th>
                               </tr>
                           </thead>
                           <tbody>
                           {currentDatosEmergencia.length  ? (
                           currentDatosEmergencia.map(array => (
                                 <tr>
                                     <td>{array.nombres}&nbsp;{array.apellidos}</td>
                                     <td className="td-team">
                                       <div className="img-2"></div>
                                     </td>
                                     <td><span className="badge success">Disponible</span></td>
                                     <td>
                                       <a className="text-center">
                                           <button>
                                           Conferencia
                                           </button>
                                       </a>
                                   </td>
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
