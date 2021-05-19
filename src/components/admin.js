import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faClinicMedical,   faTrash, faUserEdit, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"
import 'moment/locale/es'
import moment from 'moment';
import { set } from "react-hook-form";



moment.locale('es');



export default function Admin() {
    
  const [error, setError] = useState("");
  const { logout } = useAuth("");
  const [currentDatos, setcurrenDatos] = useState("");
  const history = useHistory("")
  const [currentDatosPaDe, setLinks ] = useState([]);
  const [Exito, setExito] = useState("")

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("Usuarios")
        .doc(user.uid)
        .get().then(function (doc) {
          let users = doc.data()
          setcurrenDatos(users.nombres);
        });
    })
    db.collection("Usuarios").where("tipouser","==","Especialista").onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLinks(docs);
        console.log(currentDatosPaDe)
      });
    
  }, []);

  
 const[estatus,setEstatus]=useState("")
  function aprobar(e){
    console.log(estatus)
    db.collection("Usuarios").doc(e).update({
      "aprobado":estatus,
    }).then(() => {
      history.push("/Admin")
      setExito("Usuario aprobado")
    })
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

  function quitar(){
    setExito("")
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
                  <a >
                    <a><FontAwesomeIcon icon={faClinicMedical} /></a>
                    <span>Directorio</span>
                  </a>
              </li>
              <li>
              <Link to="/signupAdmin">
                  <a >
                    <a><FontAwesomeIcon icon={faUserEdit} /></a>
                    <span>Agregar usuario</span>
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
          <div className="activity-card">
            <h3 className="c"><h1>Directorio médico</h1></h3>
            
            <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Perfil</th>
                        <th>Documentos</th>
                        <th>Opción</th>
                    </tr>
                </thead>
                <tbody>
                {currentDatosPaDe.length? (
                currentDatosPaDe.map(array => (
                      <tr>
                          <td>{array.nombres}&nbsp;{array.apellidos}</td>
                          <td className="td-team">
                            <div ><div className="img-1"></div></div>
                          </td>
                          <td>Ver</td>
                          <td><div ><input id="check" type="checkbox"onClick={(e)=>aprobar(array.uid,e, setEstatus(e.target.checked))} checked={array.aprobado}/></div></td>
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
        {Exito && <div variant="success">{Exito}&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} onClick={quitar}/></div>}
          </main>
        </div>
    </>

  )
}