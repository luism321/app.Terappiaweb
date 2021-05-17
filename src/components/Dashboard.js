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
import Inicio from './inicio'
import DoctorEmergencia from './DoctorParaEmergencia'
import Directorio from './directoriomedico'
import Planes from './Planes'
import Update from './UpdateProfile'
import Contactos from './contactos'


moment.locale('es');



export default function Dashboard() {
  const [error, setError] = useState("");
  const { logout } = useAuth("");
  const [currentDatos, setcurrenDatos] = useState("");
  const history = useHistory("")
  const [InicioPa,setInicio]=useState(true)
  const [Emer,setEmer]=useState(false)
  const [Direct,setDirect]=useState(false)
  const [planes,setplanes]=useState(false)
  const [update,setupdate]=useState(false)
  const [contact,setcontact]=useState(false)


  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("Usuarios")
        .doc(user.uid)
        .get().then(function (doc) {
          let users = doc.data()
          setcurrenDatos(users.nombres); 
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

  function Cambiar(e){
    if(e==="Inicio"){
      setInicio(true)
      setEmer(false)
      setDirect(false)
      setplanes(false)
      setupdate(false)
      setcontact(false)
    }
    if(e==="Emergencia"){
      setInicio(false)
      setEmer(true)
      setDirect(false)
      setplanes(false)
      setupdate(false)
      setcontact(false)
    }
    if(e==="Directorio"){
      setInicio(false)
      setEmer(false)
      setDirect(true)
      setplanes(false)
      setupdate(false)
      setcontact(false)
    }
    if(e==="Planes"){
      setInicio(false)
      setEmer(false)
      setDirect(false)
      setplanes(true)
      setupdate(false)
      setcontact(false)
    }
    if(e==="Update"){
      setInicio(false)
      setEmer(false)
      setDirect(false)
      setplanes(false)
      setupdate(true)
      setcontact(false)
    }
    if(e==="Contac"){
      setInicio(false)
      setEmer(false)
      setDirect(false)
      setplanes(false)
      setupdate(false)
      setcontact(true)
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
                  <a onClick={(e)=>Cambiar("Inicio",e)}>
                    <a><FontAwesomeIcon icon={faHome} /></a>
                    <span>Inicio</span>
                  </a>
              </li>
              <li>
                  <a onClick={(e)=>Cambiar("Emergencia",e)}> 
                    <a id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance} /></a>
                    <span id="ti-face-smile">Emergencia</span>
                  </a>
              </li>
              <li>
                  <a onClick={(e)=>Cambiar("Directorio",e)}> 
                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical} /></a>
                    <span>Directotio</span>
                  </a>
              </li>
              <li>
                  <a onClick={(e)=>Cambiar("Planes",e)}>
                    <a id="planes"><FontAwesomeIcon icon={faFunnelDollar} /></a>
                    <span id="planes" >Planes</span>
                  </a>
              </li>
              <li>
                  <a onClick={(e)=>Cambiar("Update",e)}>
                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUserEdit} /></a>
                    <span>Editar perfil</span>
                  </a>
              </li>
              <li>
                  <a onClick={(e)=>Cambiar("Contac",e)}>
                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUser} /></a>
                    <span>Contactos</span>
                  </a>
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
          {InicioPa===true?
          <Inicio></Inicio>
          :<div></div>}
          {Emer===true?
          <DoctorEmergencia></DoctorEmergencia>
          :<div></div>}
          {Direct===true?
          <Directorio></Directorio>
          :<div></div>}
          {planes===true?
          <Planes></Planes>
          :<div></div>}
           {update===true?
          <Update></Update>
          :<div></div>}
          {contact===true?
          <Contactos></Contactos>
          :<div></div>}
          </main>
        </div>
    </>

  )
}