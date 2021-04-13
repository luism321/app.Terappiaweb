import React, { useState } from "react";
import {  Link,useHistory } from "react-router-dom";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faReceipt,faVideo,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import {db} from "../firebase"
import firebase from "../firebase"
import UpdatePro from "./UpdateProfilePa";


export default function DashboardEs() {
    const [error, setError] = useState("");
    const history = useHistory()
    const {  currentUser,logout } = useAuth();
    const [currentDatos, setcurrenDatos ] = useState();
    const [UpdateProfilePa,setFirstUpda] = useState("")
    const [firtMain,setFirstMain] = useState(true)
    const id=currentUser.uid
    


firebase.auth().onAuthStateChanged(function(user) {
db.collection("Usuarios")
                .doc(id)
                .get().then(function (doc) {
                    let users = doc.data()
                    setcurrenDatos(users.Nombres);
                   }).catch(function (error) {
                       console.log("Error getting User:", error);
                       alert(error);
                   });
                });
const [currentDatosPaDe, setcurrenDatosPaDe ] = useState();
    
    const array=[];
    db.collection("Usuarios").where("TipoUSer","==","Paciente").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPaDe(array);
    });

  async function handleLogout() {
    setError("")
    try {
      await logout()
      history.push("/login")
    } catch {
      setError("No se pudo cerrar la sesión")
    }
  }

const onupda=(e)=>{
    let res=e
    if(res="UpdateProfilePa"){
        setFirstUpda(res)
        setFirstMain(false)
       
        }
    }

const onInicio=(e)=>{
let res=e
if(res="Inicio"){
setFirstUpda(res)
setFirstMain(true)
}

}

  return (
    <>
    <body>
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
      
    
    <div className="sidebar-menu">
        <ul>
            <li>
                <a  onClick={(e)=>onInicio("Inicio",e)}>
                    <a><FontAwesomeIcon icon={faHome}/></a>
                    <span>Inicio</span>
                </a>
            </li>
            <li>
                <a>
                    <a Id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance}/></a>
                    <span >Emergencias</span>
                </a>
            </li>
            <li>
                <a >
                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical}/></a>
                    <span>Citas Diarias</span>
                </a>
            </li>
            <li>
                <a >
                    <a className="ti-agenda"><FontAwesomeIcon icon={faNotesMedical}/></a>
                    <span>Pacientes</span>
                </a>
            </li>
            <li>
                <a >
                    <a className="ti-agenda"><FontAwesomeIcon icon={faBriefcaseMedical}/></a>
                    <span>Tarifa de consulta.</span>
                </a>
            </li>
            <li>
            <a >
                <a className="ti-folder"><FontAwesomeIcon icon={faReceipt}/></a>
                    <span>Cobrar sesión médica</span>
                </a>
            </li>
            <li>
            <a >
                <a className="ti-folder"><FontAwesomeIcon icon={faReceipt}/></a>
                    <span>Pagar suscripción</span>
                </a>
            </li>
            <li>
            <a >
                <a className="ti-folder"><FontAwesomeIcon icon={faReceipt}/></a>
                    <span>Cambiar suscripción</span>
                </a>
            </li>
            <li>
            <a >
                <a className="ti-folder"><FontAwesomeIcon icon={faReceipt}/></a>
                    <span>Gestionar servicios</span>
                </a>
            </li>
            <li>
            <a >
                <a className="ti-folder"><FontAwesomeIcon icon={faReceipt}/></a>
                    <span>Gestionar recetas</span>
                </a>
            </li>
            <li>
            <a >
                <a className="ti-folder"><FontAwesomeIcon icon={faVideo}/></a>
                    <span>videoconferencia</span>
                </a>
            </li>
            <li>
            <a>
                <a className="ti-folder"><FontAwesomeIcon icon={faCommentAlt}/></a>
                    <span>Chat al paciente.

                    </span>
                </a>
            </li>
            <li>
                <a  onClick={(e)=>onupda("UpdateProfilePa",e)}>
                    <a className="ti-clipboard"><FontAwesomeIcon icon={faUser}/></a>
                    <span>Actulizar Perfil</span>
                </a>
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
                <span className="ti-search"><FontAwesomeIcon icon={faSearch}/></span>
                <input  type="search" placeholder="search"/>
            </div>
            <div className="social-icons">
                  <span className="ti-bell"><FontAwesomeIcon icon={faBell}/></span>
                  <span className="ti-comment"><FontAwesomeIcon icon={faCommentAlt}/></span>
                <div></div>{currentDatos}
            </div>
            
        </header>
        {UpdateProfilePa==="UpdateProfilePa"?
        <UpdatePro/>
        :
        <span></span>
        }
        {firtMain=== true?
        <main>
            <h2 className="dash-title a"><h1>Consultas para hoy</h1></h2>
            <div className="dash-cards">
            {currentDatosPaDe? (
                currentDatosPaDe.map(array => (
                <div className="card-single">
                    <div className="card-body">
                        <span id="A-1"></span>
                        <div>
                            <label>Paciente:</label>
                            <h5>{array.Nombres}</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ir a consulta</a>
                    </div>
                </div>
                        ))
                        ) : (
                          <p></p>
                        )}
                </div>
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
                        <a href="">Atender emergencia</a>
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
                    <a href="">Atender emergencia</a>
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
                    <a href="">Atender emergencia</a>
                    </div>
                </div>
            </div> 
<section className="recent">
    <div className="activity-grip">
        <div className="activity-card">
            <h3 className="c"><h1>Listado de Pacientes</h1></h3>
            <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Perfil</th>
                        <th>Evaluación de Formulario</th>
                    </tr>
                </thead>
                <tbody>
                {currentDatosPaDe? (
                currentDatosPaDe.map(array => (
                      <tr>
                          <td>{array.Nombres}</td>
                          <td>{array.Especialista}</td>
                          <td className="td-team">
                            <div className="img-1"></div>
                          </td>
                          <td><a>Ver resultados</a></td>
                      </tr>
                      ))
             ) : (
               <p></p>
             )}
                </tbody>
            </table>
            </div>
        </div>

        <div className="summary">
            <div className="summary-card">
                <div className="summary-single">
                    <span ><FontAwesomeIcon icon={faIdBadge}/></span>
                    <div>
                        <h5>5</h5>
                        <small>Consultas para hoy</small>
                    </div>
                </div>
                <div className="summary-single">
                    <span><FontAwesomeIcon icon={faCalendar}/></span>
                    <div>
                        <h5>25</h5>
                        <small>Mis Pacientes</small>
                    </div>
                </div>
                
            </div>
            <div className="bday-card">
                <div className="bday-flex">
                    <div className="bday-img"></div>
                    <div className="bday-info">
                        <label>Paciente:</label>
                        <h5>Manuel Alvarado</h5>
                        <small>Cumpleaños hoy</small>
                    </div>

                </div>
                <div className="text-center">
                  <button>
                      <span><FontAwesomeIcon icon={faGift}/></span>
                        Desearle
                  </button>
                </div>
            </div>

        </div>
    </div>
    </section>

        </main>
        :
        <span></span>
     }
    </div>
</body>
    </>
  )
}
