import React, { useState,useEffect } from "react";
import {  useHistory,Link } from "react-router-dom";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faPhone,faBusinessTime,faClinicMedical,faPowerOff,faBars,faGift,faIdBadge,faCalendar, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import {db} from "../firebase"
import firebase from "../firebase"



export default function Agendas() {
    const [error, setError] = useState("");
    const history = useHistory()
    const { currentUser,logout } = useAuth();
    const [currentDatos, setcurrenDatos ] = useState();
    
    

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


const getLinks = async () => {
    db.collection("Usuarios").where("tipouser","==","Paciente").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data(), id: doc.id });
      });
      setLinks(docs);
      console.log(currentDatosPaDe)
    });
    
};

  useEffect(() => {
    getLinks();
  }, []);
   
  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("No se pudo cerrar la sesi??n")
    }
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
                    <a ><FontAwesomeIcon icon={faPowerOff}/><span >Cerrar ses??on</span></a>
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
        <h2 className="dash-title_2 b"><h1>Emergencias</h1></h2>
            <div className="dash-cards_1">
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                        <h5>Manuel alvares</h5>
                        <label></label>
                            <h4>Urgente</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href=""><FontAwesomeIcon icon={faPhone}/></a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                        <div>
                            <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label></label>
                            <h4>Urgente</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                    <a href=""><FontAwesomeIcon icon={faPhone}/></a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label></label>
                            <h4>Urgente</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                    <a href=""><FontAwesomeIcon icon={faPhone}/></a>
                    </div>
                </div>
            </div> 
        </main>
    
</div>  
</div>
  )
}