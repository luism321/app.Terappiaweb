import React, { useState,useEffect } from "react";
import {  useHistory,Link } from "react-router-dom";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faBusinessTime,faClinicMedical,faPowerOff,faBars,faGift,faIdBadge,faCalendar, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import {db} from "../firebase"
import firebase from "../firebase"
import { set } from "react-hook-form";



export default function Agendas() {
    const [error, setError] = useState("");
    const history = useHistory()
    const { currentUser,logout } = useAuth();
    const [currentDatos, setcurrenDatos ] = useState();
    const [UpdateProfilePa,setFirstUpda] = useState("")
    const [firtMain,setFirstMain] = useState(true)
    const [firtinforme,setFirstinforme] = useState(true)
    const [currentPerfil, setCurrentPerfil] = useState("");
    
    

firebase.auth().onAuthStateChanged(function(user) {
db.collection("Usuarios")
                .doc(user.uid)
                .get().then(function (doc) {
                    let users = doc.data()
                    setcurrenDatos(users.nombres);
                   }).catch(function (error) {
                       console.log("Error getting User:", error);
                       alert(error);
                   });
                });

const [dispo,setdispo]=useState(true)
const OnActivo=(e)=>{
if(e==="Activo"){
setdispo(true)
db.collection("Usuarios").doc(currentUser.uid).update({
    "disponible_emergencia":dispo,
  })
}if(dispo===true){
    setdispo(false)
    db.collection("Usuarios").doc(currentUser.uid).update({
        "disponible_emergencia":dispo,
      }) 
}
}
const [currentDatosPaDe, setLinks ] = useState([]);
const [currentId, setCurrentId] = useState("");
const [status, setstatus] = useState("");
const [statusSelect, setstatusSelect] = useState("");


if(currentId!==""){
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


  function EstatusSelect(e){
    setstatusSelect(e)
    if(e==="0"){
        db.collection("Citas").where("uid_especialista","==",currentUser.uid).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
              docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
            console.log(currentDatosPaDe)
          }); 
      }
  }

  function Estatus(e){
      setstatus(e)
    db.collection("Citas").where("uid_especialista","==",currentUser.uid).where("estatus","==",statusSelect).where("fecha","==",e).onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLinks(docs);
        console.log(currentDatosPaDe)
      });
      
  }
  

  return (
    <div>
    {error && <Alert variant="danger">{error}</Alert>}
      <input type="checkbox" id="sidebar-toggle"/>
    <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="brand">
            <span className="ti-unlink"></span>
            <span ><div id="ig"/></span>
           </h3>
           
           <label for="sidebar-toggle"><FontAwesomeIcon icon={faBars}/></label>
        </div>
      
    
    <div className="sidebar-menu" id="sidebar">
        <ul>
            <li>
                <Link to="/DashboardEs">
                <a>
                    <a><FontAwesomeIcon icon={faHome}/></a>
                    <span>Inicio</span>
                </a>
                </Link>
            </li>
            <li>
                <Link to="Emergencias">
                <a>
                    <a id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance}/></a>
                    <span >Emergencias</span>
                </a>
                </Link>
            </li>
            <li>
                <Link to="/Agenda">
                <a>
                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical}/></a>
                    <span>Agenda de citas</span>
                </a>
                </Link>
            </li>
            <li>
                <Link to="/Horarios">
                <a >
                    <a className="ti-clipboard"><FontAwesomeIcon icon={faBusinessTime}/></a>
                    <span>Mis Horarios</span>
                </a>
                </Link>
            </li>
            
            <li>
                <Link to="/Contact">
                <a>
                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUser}/></a>
                    <span>Contactos</span>
                </a>
                </Link>
            </li>
            <li>
                <Link to="/UpdateProfile">
                <a >
                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUserEdit}/></a>
                    <span>Editar Perfil</span>
                </a>
                </Link>
            </li>
            <li id="cerrar">
                <a onClick={handleLogout}>
                    <a ><FontAwesomeIcon icon={faPowerOff}/><span >Cerrar sesíon</span></a>
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
                Emergencia<span className="ti-bell"><label class="switchBtn">
                <input type="checkbox"/>
                <p class="slide round" onClick={(e)=>OnActivo("Activo",e)}></p>
            </label></span>
                <div></div>&nbsp;&nbsp;{currentDatos}
            </div>
            
        </header>
        <main>
        <th>
        <select className="selectEspe" onChange={(e) => EstatusSelect(e.target.value, e)}>
            <option value="" >Seleccionar</option>
            <option value="0" >Todos</option>
            <option value="Pendiente" >Pendientes</option>
            <option value="Reprogramada" >Reprogramadas</option>
            <option value="Cancelada" >Canceladas</option>
        </select>
        
        </th><div className="col-2"><input className="form-control" type="date" onChange={(e) => Estatus(e.target.value, e)}/></div>
        <h2 className="dash-title_2 a"><h1>Citas Agendadas</h1></h2>
        <div className="dash-cards">
        {currentDatosPaDe.length ? (
                currentDatosPaDe.map(array => (
                <div className="card-single">
                    <div className="card-body">
                        <div className="container" id="A-1"></div>
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
                        <di className="mr-3"><a>Reprogramar</a></di>
                        {status!=="Cancelada"?
                        <div className="mr-3"><a>Cancelar</a></div>
                        :<div></div>
                    }  
                        {status==="Cancelada"?
                        <div className="mr-3"><a>Retomar</a></div>
                        :<div></div>
                    }   
                    </div>
                    <div className="card-footer" id="ini">
                        <div className="mr-3 text-center"  onClickCapture={() => setCurrentId(array.uid_paciente)} >Ver paciente</div>
                    </div>
                </div>
                ))
                ) : (
                  <p></p>
                )}
                </div>
        </main>

    </div> 
    </div> 
  )
}