import React, { useState,useEffect } from "react";
import {  useHistory,Link } from "react-router-dom";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faBusinessTime,faClinicMedical,faPowerOff,faBars,faGift,faIdBadge,faCalendar, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import {db} from "../firebase"
import firebase from "../firebase"



export default function DashboardEs() {
    const [error, setError] = useState("");
    const history = useHistory()
    const { currentUser,logout } = useAuth();
    const [currentDatos, setcurrenDatos ] = useState();
    const [UpdateProfilePa,setFirstUpda] = useState("")
    const [firtMain,setFirstMain] = useState(true)
    const [currentPerfil, setCurrentPerfil] = useState("");
    
    
    
const datosPrici = async () => {
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
 }
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
const [tabla, settabla] = useState(true);


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

const getLinks = async () => {
    db.collection("Citas").where("uid_especialista","==",currentUser.uid).onSnapshot((querySnapshot) => {
        const docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({ ...doc.data(), id: doc.id });
        });
        setLinks(docs);
        console.log(currentDatosPaDe)
      });
    
};

  useEffect(() => {
    datosPrici()
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
  function onOcultar(e){
    var a=e
    if(a==="Ocultar"){
        setFirstMain(false)
    }
    console.log(a)
    }
    function onOcultar1(e){
        var a=e
        if(a==="Ocultar"){
            setFirstMain(false)
        }
        console.log(a)
        }


        function OnMostrar(e){
            var a=e
            if(a==="Mostrar"){
                setFirstMain(true)
                setCurrentId("")
            }
            console.log(a)
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
                <a id="Agenda">
                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical}/></a>
                    <span>Agendas</span>
                </a>
                </Link>
                <Link to="/ListadoPaciente">
                <a className="listado">
                    <a className="ti-face-smile"></a>
                    <span>Listado Pacientes</span>
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
       
        {currentId!=="" ?(
        <main>
          
            <div className="card-single">
            <div className="text-right cerrar" Style="font-size:20px" onClick={(e)=>OnMostrar("Mostrar",e)}>Cerrar</div>
            <div className="card-single">
                    <div className="card-body">
                    <div className="container" id="A-1"></div>
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
                            <label>Direcci??n:</label>
                            <h5>{currentPerfil.direccion}</h5>
                            <label>N??mero principal:</label>
                            <h5>{currentPerfil.num_principal}</h5>
                            <label>N??mero secundario:</label>
                            <h5>{currentPerfil.num_secundario}</h5>
                        </div>
                    </div>
                </div>
                </div>
        </main>
        ) : (
            <p></p>
            )}

        <main>   
<section className="recent">
    <div className="activity-grip">
    {tabla? (
        <div className="activity-card">
            <h3 className="c"><h1>Listado de Pacientes</h1></h3>
            
            <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Perfil</th>
                        <th>Evaluaci??n de Formulario</th>
                    </tr>
                </thead>
                <tbody>
                {currentDatosPaDe? (
                currentDatosPaDe.map(array => (
                      <tr>
                          <td>{array.nombres}</td>
                          <td className="td-team">
                            <div onClickCapture={() => setCurrentId(array.uid)} onClick={(e) => onOcultar1("Ocultar",e)}><div className="img-1"></div></div>
                          </td>
                          <td><div>Ver Historia</div></td>
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
                        <small>Cumplea??os hoy</small>
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
    </div>
</body>
    </>
  )
}
