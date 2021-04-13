import React, { useState,useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {  Link,useHistory } from "react-router-dom";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faReceipt,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"
import {db} from "../firebase"
import Planes from "./Planes"
import Destacados from "./Destacados";
import Directorio from "./DirectorioMedico";
import Emergencia from "./Emergencia";
import DashboardEs from "./DashboardEs";
import UpdateProfile from "./UpdateProfile";

export default function Dashboard() {
    const [error, setError] = useState("");
    const { currentUser, logout } = useAuth();
    const [currentDatos, setcurrenDatos ] = useState();
    const [currentDatosPa, setcurrenDatosPa ] = useState();
    const [currentTipo, setcurrenTipo ] = useState();
    const [currentDatosPare, setcurrenDatosPare ] = useState();
    const [currentDatosParan, setcurrenDatosParan] = useState();
    const [currentDatossuci, setcurrenDatosSuici] = useState();
    const [currentDatossuciHijo, setcurrenDatosSuiciHijo] = useState();
    const [currentDatosMalos, setcurrenDatosMalos] = useState();
    const [currentDatosMiedo, setcurrenDatosMiedo] = useState();
    const [currentDatosMedicacion, setcurrenDatosMedicacion] = useState();
    const history = useHistory()
    const id=currentUser.uid

 db.collection("Usuarios")
                .doc(id)
                .get().then((doc) => {
                        let users = doc.data()
                        setcurrenDatos(users.Nombres);
                        setcurrenTipo(users.TipoUSer);
                }).catch(function (error) {
                    console.log("Error getting User:", error);
                    alert(error);
                });

if(currentTipo==="Paciente"){
db.collection("Hamilton")
                .doc(id)
                .get().then( (doc) =>{
                        let users = doc.data()
                        setcurrenDatosPare(users.a);
                        setcurrenDatosParan(users.b);
                        setcurrenDatosSuici(users.c);
                        setcurrenDatosMiedo(users.d);
                        setcurrenDatosMedicacion(users.f);
                        setcurrenDatosSuiciHijo(users.g);
                        setcurrenDatosMalos(users.h);
                }).catch(function (error) {
                    console.log("Error getting User:", error);
                    alert(error);
                });
            }

if(currentDatosParan==="N/A"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psicologo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let use=doc.data()
            array.push(use);
            });
     setcurrenDatosPa(array);
    });  
}
if(currentDatossuci==="¿Has tenido pensamientos suicidas?=Nunca"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psicologo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let use=doc.data()
            array.push(use);
            });
     setcurrenDatosPa(array);
    });  
}
if(currentDatossuci==="Su hijo ha tenido pensamientos y/o intentos suicidas=Nunca"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psicologo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let use=doc.data()
            array.push(use);
            });
     setcurrenDatosPa(array);
    });  
}
if(currentDatossuciHijo==="Su hijo ha tenido pensamientos y/o intentos suicidas=No lo sé"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psicologo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let use=doc.data()
            array.push(use);
            });
     setcurrenDatosPa(array);
    });  
}
if(currentDatosMalos==="¿Has tenido pensamientos suicidas adolecente?=Nunca"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psicologo").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            let use=doc.data()
            array.push(use);
            });
     setcurrenDatosPa(array);
    });  
}
        
if(currentDatosPare==="¿Qué tipo de asesoramiento adulto estás buscando?=Pareja"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Terapeuta").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatosParan==="¿Has estado experimentado algunos de estos síntomas?=Paranoia, sensación de persecución, interpretación de mensajes a través de señales"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuci==="¿Has tenido pensamientos suicidas?=Desde hace un tiempo"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuci==="¿Has tenido pensamientos suicidas?=Desde hace un tiempo"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuci==="¿Has tenido pensamientos suicidas?=Desde hace menos de dos semanas"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuci==="¿Has tenido pensamientos suicidas?=Justo ahora"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatosMiedo==="¿Actualmente sientes ansiedad, ataques de pánico o tienes algún miedo?=Si"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatosMedicacion==="¿Actualmente estás tomando alguna medicación (psicofármaco)?=Si"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuciHijo==="Su hijo ha tenido pensamientos y/o intentos suicidas=Desde hace un tiempo un tiempo"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuciHijo==="Su hijo ha tenido pensamientos y/o intentos suicidas=Desde hace menos de dos semanas"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatossuciHijo==="Su hijo ha tenido pensamientos y/o intentos suicidas=Justo ahora"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatosMalos==="¿Has tenido pensamientos suicidas adolecente?=Desde hace un tiempo un tiempo"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatosMalos==="¿Has tenido pensamientos suicidas adolecente?=Desde hace menos de dos semanas"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
    });  
}
if(currentDatosMalos==="¿Has tenido pensamientos suicidas adolecente?=Justo ahora"){   
    const array=[];
    db.collection("Usuarios").where("Especialista","==","Psiquiatra").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPa(array);
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

  const [firtPlanes,setFirstPlanes] = useState("")
  const [firtDestacado,setFirstDestacado] = useState(true)
  const [firtMain,setFirstMain] = useState(true)

const onCheck=(e)=>{
let res=e
if(res="Planes"){
setFirstPlanes(res)
setFirstMain(false)

setFirstDestacado(false)
}
}
const onplanes=(e)=>{
    let res=e
    if(res="Directorio"){
        setFirstPlanes(res)
        setFirstMain(false)
        setFirstDestacado(false)
        }
    }
    const onEmer=(e)=>{
        let res=e
        if(res="Emergencia"){
            setFirstPlanes(res)
            setFirstMain(false)
            setFirstDestacado(false)
            }
        }
        const onupda=(e)=>{
            let res=e
            if(res="UpdateProfile"){
                setFirstPlanes(res)
                setFirstMain(false)
                setFirstDestacado(false)
                }
            }

const onInicio=(e)=>{
    let res=e
    if(res="Inicio"){
    setFirstPlanes(res)
    setFirstDestacado(true)
    setFirstMain(true)
    }
    
    }

  return (
    <body>
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
      
    <div className="sidebar-menu">
        <ul>
            <li>
                <a onClick={(e)=>onInicio("Inicio",e)}>
                    <a><FontAwesomeIcon icon={faHome}/></a>
                    <span>Inicio</span>
                </a>
            </li>
            <li>
                <a  onClick={(e)=>onEmer("Emergencia",e)}>
                    <a Id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance}/></a>
                    <span Id="ti-face-smile">Emergencia</span>
                </a>
            </li>
            <li>
                <a onClick={(e)=>onplanes("Directorio",e)}>
                    <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical}/></a>
                    <span>Directotio Médico</span>
                </a>
            </li>
            <li>
                <a onClick={(e)=>onCheck("Planes",e)}>
                    <a Id="planes"><FontAwesomeIcon icon={faDollarSign}/></a>
                    <span id="planes" >Planes Disponibles</span>
                </a>
            </li>
            <li>
                <a >
                    <a className="ti-agenda"><FontAwesomeIcon icon={faBriefcaseMedical}/></a>
                    <span>Agendas de citas</span>
                </a>
            </li>
            <li>
                <a >
                    <a className="ti-folder"><FontAwesomeIcon icon={faReceipt}/></a>
                    <span>Recipes</span>
                </a>
            </li>
            <li>
                <a onClick={(e)=>onupda("UpdateProfile",e)}>
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
        {firtPlanes==="Directorio"?
        <Directorio/>
        :
        <span></span>
        }
        {firtPlanes==="Planes"?
        <Planes/>
        :
        <span></span>
        }
        {firtPlanes==="Emergencia"?
        <Emergencia/>
        :
        <span></span>
        }
        {firtPlanes==="UpdateProfile"?
        <UpdateProfile/>
        :
        <span></span>
        }
{firtMain=== true?
        <main>
            <h2 className="dash-title">Especialistas sugeridos Para ti</h2>
            <div className="dash-cards ">
            {currentDatosPa? (
                currentDatosPa.map(array => (
                
                <div className="card-single">
                    <div className="card-body">
                        <span id="A-1"></span>
                        <div>
                            <label>Nombre:</label>
                            <h5>{array.Nombres}</h5>
                            <label>Especialidad:</label>
                            <h4>{array.Especialista}</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Agendar cita</a>
                    </div>
                </div>
                 ) 
                 ) ) : (
                     <p></p>
                   )}
            </div>

        </main>
        :
        <span></span>
    }
{firtDestacado===true?
        <Destacados/>
        :
        <span></span>
        }
    </div>
    </div> 
</body>

  )
}
