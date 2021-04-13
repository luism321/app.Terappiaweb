import React from 'react';
import '../assets/main.css';
// import CustomNavbar from '../components/CustomNavbar';
import {  useHistory } from "react-router-dom"
// import HRService from '../components/Service/HRService';
// import PrototypeService from '../components/Service/Sservice/PrototypeService';
// import Partner from '../components/Partner';
// import ServiceSubscribe from '../components/ServiceSubscribe';
// import FooterTwo from '../components/Footer/FooterTwo';
// import ServiceData from '../components/Service/ServiceData';
// import FooterData from '../components/Footer/FooterData';
import { useState } from 'react';
import { useAuth } from "../contexts/AuthContext";
import Reveal from 'react-reveal/Reveal';
//import db from '../firebase.config'
import {db} from "../firebase"


const titulos = [
    "Para culminar su registro ud debe ser evaluado, para nosotros es importante que responda este formulario correctamente, ya que nos permitira hacer una breve evaluacion sobre su salud mental",
    "Si aún no estás muy claro, vamos a hacerte unas preguntas para guiarte:",
    "¿Qué tipo de asesoramiento adulto estás buscando?",
    "¿Has estado alguna vez en psicoterapia?",
    "¿En qué país estás actualmente?",
    "¿Cómo calificarías tu salud mental actualmente?",
    "¿Has estado experimentado algunos de estos síntomas?",
    //----de 7 al 11-------------Tristeza----------------////

    "¿Ha sentido últimamente poco interés en la ejecución de sus labores cotidianas?",
    "¿Has tenido pensamientos de minusvalía o culpa?",
    "¿Has pensado en lastimarte de alguna manera?",
    "¿Has pensado que todo estaría mejor si murieras?",
    "¿Has tenido pensamientos suicidas?",

    //------de 12 al 19-----------Preocupaciones----------------////
    "¿Has tenido problemas para concentrarte en actividades como leer o ver televisión?",
    "¿Qué tanto te han afectado en tu desempeño cotidiano?",
    "¿Has tenido problemas para quedarte dormido, mantenerte dormido o dormir demasiado?",
    "¿Sueles sentirte cansado o con poca energía?",
    "¿Has tenido poco apetito o ganas de comer en exceso?",
    "¿Has sentido un incremento de vitalidad y energía?",
    "¿Actualmente sientes ansiedad, ataques de pánico o tienes algún miedo?",
    "¿Actualmente estás tomando alguna medicación (psicofármaco)?",

    //-----------------ADOLESCENTE O INFANTIL----------------////
    "Pregunta general",

    //--------de 21 al 32------------Soy padre-------------------////
    "¿Cómo está relacionado con el adolescente?",
    "¿Qué edad tiene su hijo/a?",
    "¿Ha estado su hijo/a en terapia anteriormente?",
    "Basado en lo que observas. ¿Cómo calificarías los hábitos de sueño de tu hijo/a?",
    "Basado en lo que observas. ¿Cómo calificarías los hábitos alimenticios de tu hijo?",
    "Basado en lo que observas. ¿Está tu hijo experimentando ansiedad, ataques de pánico o alguna fobia?",
    "¿Está experimentando tristeza, dolor, angustia o desesperanza?",
    "En las últimas dos semanas, ¿con qué frecuencia ha observado que su hijo experimenta alguna de las siguientes situaciones?",
    "Poco interés o placer en hacer cosas",
    "Tiene arrebatos de ira, grita o es violento con otros",
    "Problemas para concentrarse en actividades como ver televisión o tener una conversación",
    "Su hijo ha tenido pensamientos y/o intentos suicidas",
    //---------de 33 al 37-----------Soy adolescente-------------------////
    "¿Qué edad tienes?",
    "¿Qué problemas estás enfrentando?",
    "¿Has estado en terapia antes?",
    "¿Cómo calificarías tu relación con tus padres?",
    "¿Has tenido pensamientos suicidas adolecente?",
    "¿Qué tipo de asesoramiento adolescente estás buscando?",
    "¿En que Pais estas?:",
    "¿Tipo de asesoramiento?:",
    

]
let tipoEstilo = "fadeInRight"

const Service = () => {
const [userTipo, setUserTipo] = useState('');
const [userIndi, setUserIndi] = useState('');
const [userSigui, setUserSigui] = useState('');
const [userTipoA, setUserTipoA] = useState('');
//---------------------Pareja----------------------////

//---------------------Tristeza----------------------////
const [userEstadoPsico, setUserEstadoPsico] = useState('N/A');
const [userSaludMental, setUserSaludMental] = useState('N/A');
const [userParanoia, setUserParanoia] = useState('N/A');
const [userPocoInteres, setUserPocoInteres] = useState('N/A');
const [userPais, setPais] = useState('N/A');
const [userMinusvalia, setuserMinusvalia] = useState('N/A');
const [userMurieras, setuserMurieras] = useState('N/A');
const [userSuicida, setUserSuicida] = useState('N/A');
const [userLastimarse, setuserLastimarse] = useState('N/A');

//-----------------Preocupaciones------------------------////
const [userActividades, setuserActividades] = useState('N/A')
const [userDesempeño, setuserdesempeño] = useState('N/A')
const [userDormido, setuserDormido] = useState('N/A')
const [userPocaenergia, setuserPocaenergia] = useState('N/A')
const [userApetito, setuserApetito] = useState('N/A')
const [userVitalidad, setuserVitalidad] = useState('N/A')
const [userAnsiedad, setuserAnsiedad] = useState('N/A')
const [userMedicacion, setuserMedicacion] = useState('N/A')

//-----------------ADOLESCENTE O INFANTIL Gereral----------------////
const [userPreguntaGe, setuserPreguntaGe] = useState('N/A')
const [userPaiis, setuserPaiis] = useState('N/A')


//----------------------Soy padre----------------------------////
const [userTipoAsesoria, setuserTipoAsesoria] = useState('N/A')
const [userRelacionado, setuserRelacionado] = useState('N/A')
const [userEdadHijo, setuserEdadHijo] = useState('N/A')
const [userTerappiaHijo, setuserTerappiaHijo] = useState('N/A')
const [userHabitoSueño, setuserHabitoSueño] = useState('N/A')
const [userHabitoAlimenticio, setuserHabitoAlimenticio] = useState('N/A')
const [userFobia, setuserFobia] = useState('N/A')
const [userDesesperanza, setuserDesesperanza] = useState('N/A')
const [userPlacer, setuserPlacer] = useState('N/A')
const [userViolento, setuserViolento] = useState('N/A')
const [userProblemas, setuserProblemas] = useState('N/A')
const [userPensamientosuici, setuserPensasuici] = useState('N/A')

//----------------------adolecente----------------------------////
const [userEdadAdole, setuserEdadAdole] = useState('N/A')
const [userProblemasEfre, setuserProblemasEfre] = useState('N/A')
const [userTerapiaAntes, setuserTerapiaAntes] = useState('N/A')
const [userCalificarRela, setuserCalificarRela] = useState('N/A')
const [userPensamientosMalos, setuserPensamientosMalos] = useState('N/A')

const [userAdo, setUserAdo] = useState('N/A');
const [firstContainer,setFirstContainer] = useState(true)
const history = useHistory()
const { currentUser, logout } = useAuth();

/////////////////////Guardado de formulario/////////////////////
var igual="="
async function handleSubmit(e) {
  
    e.preventDefault()
      db.collection("Hamilton").doc(currentUser.uid).set({
        a:[titulos[2]]+igual+userTipoA,
        [titulos[3]]:userEstadoPsico,
        [titulos[4]]:userPais,
        [titulos[5]]:userSaludMental,
        b:[titulos[6]]+igual+userParanoia,
        [titulos[7]]:userPocoInteres,
        [titulos[8]]:userMinusvalia,
        [titulos[9]]:userLastimarse,
        [titulos[10]]:userMurieras,
        c:[titulos[11]]+igual+userSuicida,
        [titulos[12]]:userActividades,
        [titulos[13]]:userDesempeño,
        [titulos[14]]:userDormido,
        [titulos[15]]:userPocaenergia,
        [titulos[16]]:userApetito,
        [titulos[17]]:userVitalidad,
        d:[titulos[18]]+igual+userAnsiedad,
        f:[titulos[19]]+igual+userMedicacion,
        [titulos[20]]:userPreguntaGe,
        [titulos[39]]:userPaiis,
        [titulos[38]]:userTipoAsesoria,
        [titulos[21]]:userRelacionado,
        [titulos[22]]:userEdadHijo,
        [titulos[23]]:userTerappiaHijo,
        [titulos[24]]:userHabitoSueño,
        [titulos[25]]:userHabitoAlimenticio,
        [titulos[26]]:userFobia,
        [titulos[27]]:userDesesperanza,
        [titulos[29]]:userPlacer,
        [titulos[30]]:userViolento,
        [titulos[31]]:userProblemas,
        g:[titulos[32]]+igual+userPensamientosuici,
        [titulos[33]]:userEdadAdole,
        [titulos[34]]:userProblemasEfre,
        [titulos[35]]:userTerapiaAntes,
        [titulos[36]]:userCalificarRela,
        h:[titulos[37]]+igual+userPensamientosMalos

      }).then(()=>{
        if(userTipoA==="Pareja"){
        history.push("/")
      }
      if(userParanoia==="Paranoia, sensación de persecución, interpretación de mensajes a través de señales"){
        history.push("/")
      }
      if(userSuicida==="Nunca"){
        history.push("/")
      }
      if(userSuicida==="Desde hace un tiempo"){
        history.push("/")
      }
      if(userSuicida==="Desde hace menos de dos semanas"){
        history.push("/")
      }
      if(userSuicida==="Justo ahora"){
        history.push("/")
      }
      if(userAnsiedad==="Si"){
        history.push("/")
      }
      if(userMedicacion==="Si"){
        history.push("/")
      }
      if(userMedicacion==="No"){
        history.push("/")
      }
      if(userPensamientosMalos==="Nunca"){
        history.push("/")
      }
      if(userPensamientosMalos==="Desde hace un tiempo un tiempo"){
        history.push("/")
      }
      if(userPensamientosMalos==="Desde hace menos de dos semanas"){
        history.push("/")
      }
      if(userPensamientosMalos==="Justo ahora"){
        history.push("/")
      }
      
      })
      
    }

 /////////////////////Individual/////////////////////
const onclickti=(e)=>{
    let Tipo=e
if(Tipo==='Tipo'){
    setUserTipo(Tipo)
    setFirstContainer(false)
  }
}
const onclickvolver=(e)=>{
    let Tipo=e
if(Tipo===true){
    setUserTipo("")
    setFirstContainer(true)
  }
  if(Tipo==='Tipo'){
    setUserIndi("")
    setUserTipo(Tipo)
  }
  if(Tipo==='Individual'){
    setUserSigui("")
    setUserIndi(Tipo)
  }
  if(Tipo==='Tipo'){
    setUserAdo("")
    setUserTipo(Tipo)
  }
}
const onclickin=(e)=>{
    let Indi=e
if(Indi==='Individual'){
    setUserIndi(Indi)
    setUserTipo("")
  }
}
const onclickSiguiente=(e)=>{
    let sigui=e
if(sigui==='Si-no'){
    setUserSigui(sigui)
    setUserIndi("")
  }
  
  if(sigui==='Pais'){
    setUserSigui(sigui)
  }
  if(sigui==='SaludM'){
    setUserSigui(sigui)
  }
}
const onclicksintomas=(e)=>{
    let sin=e
    /////////////////////SI RESPONDE TRISTEZA/////////////////////
if(sin==='Tristeza'){
    setUserSigui(sin)
  }
  if(sin==='Pensamientos'){
    setUserSigui(sin)
  }
  if(sin==='Lastimarte'){
    setUserSigui(sin)
  }
  if(sin==='Murieras'){
    setUserSigui(sin)
  }
  if(sin==='Suicida'){
    setUserSigui(sin)
  }
  /////////////////////SI RESPONDE PREOCUPACION/////////////////////
    if(sin==='Preocupacion'){
    setUserSigui(sin)
    }
    if(sin==='Desempeno'){
        setUserSigui(sin)
    }
    if(sin==='Problemas'){
        setUserSigui(sin)
    }
    if(sin==='Cansado'){
        setUserSigui(sin)
    }
      if(sin==='Apetito'){
      setUserSigui(sin)
      }
      if(sin==='Vitalidad'){
        setUserSigui(sin)
      }
      if(sin==='Ataque'){
        setUserSigui(sin)
      }
      if(sin==='Medicacion'){
        setUserSigui(sin)
      }
}
/////////////////////Cierre individual/////////////////////
const onclickAdole=(e)=>{
    let sin=e
    /////////////////////SI RESPONDE soy padre/////////////////////
if(sin==='Adolecente'){
    setUserAdo(sin)
    setUserTipo("")
   }
   if(sin==='Paiss'){
    setUserAdo(sin)
   }
   if(sin==='TipoAse'){
    setUserAdo(sin)
   }
   if(sin==='RelacionAdo'){
    setUserAdo(sin)
   }
   if(sin==='Edad'){
    setUserAdo(sin)
   }
   if(sin==='Terapia'){
    setUserAdo(sin)
   }
   if(sin==='Sueño'){
    setUserAdo(sin)
   }
   if(sin==='Alimenticios'){
    setUserAdo(sin)
   }
   if(sin==='Fobia'){
    setUserAdo(sin)
   }
   if(sin==='Experimentado'){
    setUserAdo(sin)
   }
   if(sin==='Situaciones'){
    setUserAdo(sin)
   }
   if(sin==='Arrebatos'){
    setUserAdo(sin)
   }
   if(sin==='Actividades'){
    setUserAdo(sin)
   }
   if(sin==='Pensamientosui'){
    setUserAdo(sin)
   }
   /////////////////////SI RESPONDE soy Adolecente/////////////////////
   if(sin==='SoyAdolecente'){
    setUserAdo(sin)
   }
   if(sin==='Problemas'){
    setUserAdo(sin)
   }
   if(sin==='PreguntaTe'){
    setUserAdo(sin)
   }
   if(sin==='RelacionPadre'){
    setUserAdo(sin)
   }
   if(sin==='SuicidaAdo'){
    setUserAdo(sin)
   }
}

const onCheck=(e)=>{
let res=e
setuserProblemasEfre(res)
}


    return(
        
        <div className="body_wrapper">
            {/*<CustomNavbar slogo="Terappia" mClass="menu_four" nClass="w_menu ml-auto mr-auto"/>*/}
            <form onSubmit={handleSubmit}>  
            <section className="prototype_service_info">
            
                <div className="symbols-pulse active">
                    <div className="pulse-1"></div>
                    <div className="pulse-2"></div>
                    <div className="pulse-3"></div>
                    <div className="pulse-4"></div>
                    <div className="pulse-x"></div>
                </div>

                {firstContainer === true ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[0]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                    <div className="col-lg-12 text-center" >
                        <a className="seo_btn seo_btn_one btn_hover" onClick={(e) => onclickti('Tipo', e)} value="Tipo" Style="width:55%">ir</a>
                    </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                
                { userTipo==="Tipo" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[40]}</h2></Reveal>

                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClickCapture={(e) => onclickin('Individual', e)} value="Individual">
                            <a 
                            onClickCapture={(e) => setUserTipoA('Individual (Adulto)', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Individual (Adulto)
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center">
                            <button id="Pareja" type="submit"  onClick={(e)=>setUserTipoA("Pareja",e)} value="Pareja" Style="width:55%">Pareja</button>
                        </div>
                    </Reveal>
                    
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClickCapture={(e) => onclickAdole("Adolecente", e) }value="Adolecente">
                            <a
                            onClickCapture={(e) => setUserTipoA('Adolescente o Infantil', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Adolescente o Infantil
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickvolver(true, e)}>
                            <a   className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userIndi==="Individual"?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[3]}</h2></Reveal>

                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('Si-no', e)} value="Si-no">
                            <a  className="seo_btn seo_btn_one btn_hover" onClick={(e)=>setUserEstadoPsico("Si",e)}  Style="width:55%">Si</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('Si-no', e)} value="Si-no">
                            <a onClick={(e)=>setUserEstadoPsico("No",e)}  className="seo_btn seo_btn_one btn_hover" Style="width:55%">No</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclickvolver('Tipo', e)} value="Tipo">
                            <a className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Si-no" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[4]}</h2></Reveal>

                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center">
                        <div className="form-group" id="email">
                        <select className="form-control" type="select" name="Pais"
                            onChange={(e)=>setPais(e.target.value,e)}
                             onChangeCapture={(e) => onclickSiguiente('Pais', e)}  >
                                <option>Seleccionar</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Peru">Peru</option>
                            </select>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickvolver('Individual', e)} value="Individual">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Pais" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[5]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('SaludM', e)} value="SaludM">
                            <a  className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserSaludMental('Buena', e)} Style="width:55%">Buena</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('SaludM', e)} value="SaludM">
                            <a className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserSaludMental('Adecuada', e)} Style="width:55%">Adecuada</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('SaludM', e)} value="SaludM">
                            <a className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserSaludMental('Deficiente', e)} Style="width:55%">Deficiente</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('Si-no', e)} value="Pais">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>   
                    
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="SaludM" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[6]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Tristeza', e)} value="Tristeza">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserParanoia(e.target.value,e)}
                                value="Tristeza profunda, dolor o desesperanza"
                                Style="width:55%">
                                Tristeza profunda, dolor o desesperanza
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Preocupacion', e)} value="Preocupacion">
                        <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserParanoia(e.target.value,e)}
                                value="Preocupación, angustia, ansiedad e irritabilidad"
                                Style="width:55%">
                                Preocupación, angustia, ansiedad e irritabilidad
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserParanoia(e.target.value,e)}
                                value="Paranoia, sensación de persecución, interpretación de mensajes a través de señales"
                                Style="width:55%">
                                Paranoia, sensación de persecución, interpretación de mensajes a través de señales
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('Pais', e)} value="Pais">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>   
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Tristeza" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[7]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Pensamientos', e)} value="Pensamientos">
                            <a  className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserPocoInteres('Para nada', e)} Style="width:55%">Para nada</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Pensamientos', e)} value="Pensamientos">
                            <a className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserPocoInteres('Poco', e)} Style="width:55%">Poco</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Pensamientos', e)} value="Pensamientos">
                            <a className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserPocoInteres('Más de la mitad de los días', e)} Style="width:55%">Más de la mitad de los días</a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Pensamientos', e)} value="Pensamientos">
                            <a className="seo_btn seo_btn_one btn_hover" onClick={(e) => setUserPocoInteres('Casi todos los días', e)}  Style="width:55%">Casi todos los días</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickSiguiente('SaludM', e)} value="SaludM">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal> 
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Pensamientos" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[8]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Lastimarte', e)} value="Lastimarte">
                            <a 
                            className="seo_btn seo_btn_one btn_hover"
                            onClick={(e) => setuserMinusvalia('Para nada', e)}
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Lastimarte', e)} value="Lastimarte">
                            <a
                            onClick={(e) => setuserMinusvalia('Poco', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Lastimarte', e)}>
                            <a
                            onClick={(e) => setuserMinusvalia('Más de la mitad de los días', e)}
                            className="seo_btn seo_btn_one btn_hover"
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Lastimarte', e)}>
                            <a
                            onClick={(e) => setuserMinusvalia('Casi todos los días', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Tristeza', e)}>
                            <a className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Lastimarte" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[9]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Murieras', e)} value="Murieras">
                            <a
                            className="seo_btn seo_btn_one btn_hover"
                            onClick={(e) => setuserLastimarse('Para nada', e)}
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Murieras', e)} value="Murieras">
                            <a
                            className="seo_btn seo_btn_one btn_hover"
                            onClick={(e) => setuserLastimarse('Poco', e)}
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Murieras', e)} value="Murieras">
                            <a
                            onClick={(e) => setuserLastimarse('Más de la mitad de los días', e)}
                            className="seo_btn seo_btn_one btn_hover"
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Murieras', e)} value="Murieras">
                            <a
                            className="seo_btn seo_btn_one btn_hover"
                            onClick={(e) => setuserLastimarse('Casi todos los días', e)}
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Pensamientos', e)}>
                            <a className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Murieras" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[10]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Suicida', e)} value="Si-no">
                            <a
                            onClick={(e) => setuserMurieras('Para nada', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Suicida', e)} value="Suicida">
                            <a
                            onClick={(e) => setuserMurieras('Poco', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Suicida', e)} value="Suicida">
                            <a 
                            onClick={(e) => setuserMurieras('Más de la mitad de los días', e)}
                            className="seo_btn seo_btn_one btn_hover"
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} onClick={(e) => onclicksintomas('Suicida', e)} value="Suicida">
                        
                        <div className="col-lg-12 text-center">
                            <a
                            onClick={(e) => setuserMurieras('Casi todos los días', e)} 
                            className="seo_btn seo_btn_one btn_hover"
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Lastimarte', e)}>
                            <a className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Suicida" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[11]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  value="Si-no">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserSuicida(e.target.value,e)}
                                value="Nunca"
                                Style="width:55%">
                                Nunca
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserSuicida(e.target.value,e)}
                                value="Desde hace un tiempo"
                                Style="width:55%">
                                Desde hace un tiempo
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserSuicida(e.target.value,e)}
                                value="Desde hace menos de dos semanas"
                                Style="width:55%">
                                Desde hace menos de dos semanas
                            </button>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setUserSuicida(e.target.value,e)}
                                value="Justo ahora"
                                Style="width:55%">
                                Justo ahora
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Murieras', e)}>
                            <a className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Preocupacion" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[12]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Desempeno', e)} value="Desempeno">
                            <a  
                            onClick={(e) => setuserActividades('Para nada', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Desempeno', e)} value="Desempeno">
                            <a
                            onClick={(e) => setuserActividades('Poco', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Desempeno', e)} value="Desempeno">
                            <a
                            onClick={(e) => setuserActividades('Más de la mitad de los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Desempeno', e)} value="Desempeno">
                            <a
                            onClick={(e) => setuserActividades('Casi todos los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickSiguiente('SaludM', e)} value="Tristeza">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Desempeno" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[13]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Problemas', e)} value="Problemas">
                            <a
                            onClick={(e) => setuserdesempeño('Para nada', e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Problemas', e)} value="Problemas">
                            <a
                            onClick={(e) => setuserdesempeño('Poco', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Problemas', e)} value="Problemas">
                            <a
                            onClick={(e) => setuserdesempeño('Mucho', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Mucho
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Problemas', e)} value="Problemas">
                            <a
                            onClick={(e) => setuserdesempeño('En todo', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            En todo
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Preocupacion', e)} value="Preocupacion">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Problemas" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[14]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Cansado', e)} value="Cansado">
                            <a 
                            onClick={(e) => setuserDormido('Para nada', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Cansado', e)} value="Cansado">
                            <a
                            onClick={(e) => setuserDormido('Poco', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Cansado', e)} value="Cansado">
                            <a
                            onClick={(e) => setuserDormido('Más de la mitad de los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Cansado', e)} value="Cansado">
                            <a
                            onClick={(e) => setuserDormido('Casi todos los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Desempeno', e)} value="Desempeno">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Cansado" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[15]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Apetito', e)} value="Apetito">
                            <a
                            onClick={(e) => setuserPocaenergia('Para nada', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Apetito', e)} value="Apetito">
                            <a
                            onClick={(e) => setuserPocaenergia('Poco', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Apetito', e)} value="Apetito">
                            <a
                            onClick={(e) => setuserPocaenergia('Más de la mitad de los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Apetito', e)} value="Apetito">
                            <a 
                            onClick={(e) => setuserPocaenergia('Casi todos los días', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Problemas', e)} value="Problemas">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Apetito" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[16]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Vitalidad', e)} value="Vitalidad">
                            <a
                            onClick={(e) => setuserApetito('Para nada', e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Vitalidad', e)} value="Vitalidad">
                            <a 
                            onClick={(e) => setuserApetito('Poco', e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Vitalidad', e)} value="Vitalidad">
                            <a
                            onClick={(e) => setuserApetito('Más de la mitad de los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Vitalidad', e)} value="Vitalidad">
                            <a
                            onClick={(e) => setuserApetito('Casi todos los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Cansado', e)} value="Cansado">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Vitalidad" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[17]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Ataque', e)} value="Ataque">
                            <a
                            onClick={(e) => setuserVitalidad('Para nada', e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Ataque', e)} value="Ataque">
                            <a
                            onClick={(e) => setuserVitalidad('Poco', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Poco
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Ataque', e)} value="Ataque">
                            <a
                            onClick={(e) => setuserVitalidad('Más de la mitad de los días', e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Más de la mitad de los días
                            </a>
                        </div>
                    </Reveal>   
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Ataque', e)} value="Ataque">
                            <a
                            onClick={(e) => setuserVitalidad('Casi todos los días', e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Apetito', e)} value="Apetito">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Ataque" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[18]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  value="Vitalidad">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserAnsiedad(e.target.value,e)}
                                value="Si"
                                Style="width:55%">
                                Si
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" onClick={(e) => onclicksintomas('Medicacion', e)} value="Vitalidad">
                            <a
                            onClick={(e)=>setuserAnsiedad("No",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            No
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Vitalidad', e)} value="Vitalidad">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                   
                    </div>
                    :
                    <span></span>
                }
                { userSigui==="Medicacion" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[19]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  value="Vitalidad">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserMedicacion(e.target.value,e)}
                                value="Si"
                                Style="width:55%">
                                Si
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  value="Vitalidad">
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserMedicacion(e.target.value,e)}
                                value="No"
                                Style="width:55%">
                                No
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclicksintomas('Ataque', e)} value="Ataque">
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Adolecente" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[20]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Paiss", e) } >
                            <a
                            onClick={(e)=>setuserPreguntaGe("Soy padre",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Soy padre
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}  >
                        <div className="col-lg-12 text-center"onClick={(e) => onclickAdole("SoyAdolecente", e) } >
                            <a
                            onClick={(e)=>setuserPreguntaGe("Soy adolescente",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Soy adolescente
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickvolver("Tipo", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Paiss" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[4]}</h2></Reveal>

                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center">
                        <div className="form-group" id="email">
                            <select className="form-control" type="select" name="Pais"
                            onChange={(e)=>setuserPaiis(e.target.value,e)}
                             onChangeCapture={(e) => onclickAdole('TipoAse', e)}  >
                                <option>Seleccionar</option>
                                <option value="Venezuela">Venezuela</option>
                                <option value="Argentina">Argentina</option>
                                <option value="Peru">Peru</option>
                            </select>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" onClick={(e) => onclickAdole('Adolecente', e)} >
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                        :
                    <span></span>
                }
                { userAdo==="TipoAse" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[2]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionAdo", e) } >
                            <a
                            onClick={(e)=>setuserTipoAsesoria("Quiero terapia para mi hijo/a",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Quiero terapia para mi hijo/a
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionAdo", e) }>
                            <a
                            onClick={(e)=>setuserTipoAsesoria("Busco asesoría para padres",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Busco asesoría para padres
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionAdo", e) }>
                            <a 
                            onClick={(e)=>setuserTipoAsesoria("No estoy seguro aún",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            No estoy seguro aún
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Paiss", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="RelacionAdo" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[21]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Edad", e) } >
                            <a
                            onClick={(e)=>setuserRelacionado("Soy la madre",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Soy la madre
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Edad", e) }>
                            <a
                            onClick={(e)=>setuserRelacionado("Soy el Padre",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Soy el Padre
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Edad", e) }>
                            <a 
                            onClick={(e)=>setuserRelacionado("Soy el representante legal",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Soy el representante legal
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Edad", e) }>
                            <a
                            onClick={(e)=>setuserRelacionado("Otro",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Otro
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("TipoAse", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Edad" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[22]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center">
                        <div className="form-group" id="email">
                            <select className="form-control" type="select" name="Pais"
                            onChange={(e)=>setuserEdadHijo(e.target.value,e)}
                             onChangeCapture={(e) => onclickAdole('Terapia', e)}  >
                                <option>Seleccionar</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                            </select>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionAdo", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Terapia" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[23]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Sueño", e) } >
                            <a 
                            onClick={(e)=>setuserTerappiaHijo("Si",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Si
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Sueño", e) }>
                            <a 
                            onClick={(e)=>setuserTerappiaHijo("No",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            No
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Edad", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Sueño" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[24]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Alimenticios", e) } >
                            <a
                            onClick={(e)=>setuserHabitoSueño("Ideales",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Ideales
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Alimenticios", e) }>
                            <a
                            onClick={(e)=>setuserHabitoSueño("Regulares",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Regulares
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Alimenticios", e) }>
                            <a
                            onClick={(e)=>setuserHabitoSueño("Malos",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Malos
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Terapia", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Alimenticios" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[25]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Fobia", e) } >
                            <a
                            onClick={(e)=>setuserHabitoAlimenticio("Ideales",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Ideales
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Fobia", e) }>
                            <a
                            onClick={(e)=>setuserHabitoAlimenticio("Regulares",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Regulares
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Fobia", e) }>
                            <a
                            onClick={(e)=>setuserHabitoAlimenticio("Malos",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">Malos
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Sueño", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Fobia" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[26]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Experimentado", e) } >
                            <a 
                            onClick={(e)=>setuserFobia("Si",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Si
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Experimentado", e) }>
                            <a
                            onClick={(e)=>setuserFobia("No",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            No
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Alimenticios", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Experimentado" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[27]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Situaciones", e) } >
                            <a 
                            onClick={(e)=>setuserDesesperanza("Para nada",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Situaciones", e) }>
                            <a
                            onClick={(e)=>setuserDesesperanza("A veces",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            A veces
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Situaciones", e) } >
                            <a
                            onClick={(e)=>setuserDesesperanza("Con mucha frecuencia",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Con mucha frecuencia
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Situaciones", e) }>
                            <a
                            onClick={(e)=>setuserDesesperanza("Casi todos los días",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Fobia", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Situaciones" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[28]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[29]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Arrebatos", e) } >
                            <a 
                            onClick={(e)=>setuserPlacer("Para nada",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Arrebatos", e) }>
                            <a 
                            onClick={(e)=>setuserPlacer("A veces",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            A veces
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Arrebatos", e) } >
                            <a
                            onClick={(e)=>setuserPlacer("Con mucha frecuencia",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Con mucha frecuencia
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Arrebatos", e) }>
                            <a  
                            onClick={(e)=>setuserPlacer("Casi todos los días",e)}
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Experimentado", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Arrebatos" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[30]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Actividades", e) } >
                            <a
                            onClick={(e)=>setuserViolento("Para nada",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Actividades", e) }>
                            <a
                            onClick={(e)=>setuserViolento("A veces",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            A veces
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Actividades", e) } >
                            <a
                            onClick={(e)=>setuserViolento("Con mucha frecuencia",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Con mucha frecuencia
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Actividades", e) }>
                            <a
                            onClick={(e)=>setuserViolento("Casi todos los días",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Casi todos los días
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Situaciones", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Actividades" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[31]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Pensamientosui", e) } >
                            <a
                            onClick={(e)=>setuserProblemas("Para nada",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Para nada
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Pensamientosui", e) }>
                            <a  
                            onClick={(e)=>setuserProblemas("A veces",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            A veces
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Pensamientosui", e) } >
                            <a
                            onClick={(e)=>setuserProblemas("Con mucha frecuencia",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Con mucha frecuencia
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Pensamientosui", e) }>
                            <a 
                            onClick={(e)=>setuserProblemas("Casi todos los días",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">Casi todos los días</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Arrebatos", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Pensamientosui" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[32]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  >
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensasuici(e.target.value,e)}
                                value="No lo sé"
                                Style="width:55%">
                                No lo sé
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center" >
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensasuici(e.target.value,e)}
                                value="Nunca"
                                Style="width:55%">
                                Nunca
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"   >
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensasuici(e.target.value,e)}
                                value="Desde hace un tiempo un tiempo"
                                Style="width:55%">
                                Desde hace un tiempo un tiempo
                            </button>
                            
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"   >
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensasuici(e.target.value,e)}
                                value="Desde hace menos de dos semanas"
                                Style="width:55%">
                                Desde hace menos de dos semanas
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  >
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensasuici(e.target.value,e)}
                                value="Justo ahora"
                                Style="width:55%">
                                Justo ahora
                            </button>
                           
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Actividades", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                 { userAdo==="SoyAdolecente" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[33]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center">
                        <div className="form-group" id="email">
                            <select className="form-control" type="select" onChange={(e)=>setuserEdadAdole(e.target.value,e)}  onChangeCapture={(e) => onclickAdole('Problemas', e)}  >
                                <option>Seleccionar</option>
                                <option value="0">0</option>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                            </select>
                            </div>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Adolecente", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="Problemas" ?
                <div className="container" Style="margin:auto%">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[34]}</h2></Reveal>
                    
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center" >
                            <label>Estrés o ansiedad
                            <input type="checkbox"  
                            value="Estrés o ansiedad"
                            onChange={(e) => onCheck(e.target.value,e ) } 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Depresión
                            <input type="checkbox"
                            onChange={(e) => onCheck(e.target.value,e ) }  
                            value="Depresión" 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="margin:auto" />
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Bullying
                            <input onChange={(e) => onCheck(e.target.value,e ) } type="checkbox"  value="Bullying" className="seo_btn seo_btn_one btn_hover" Style="margin:auto" />
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Retos escolares
                            <input type="checkbox"  onChange={(e) => onCheck(e.target.value,e ) } value="Retos escolares" className="seo_btn seo_btn_one btn_hover" Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Déficit de atención
                            <input type="checkbox"  onChange={(e) => onCheck(e.target.value,e ) } value="Déficit de atención" className="seo_btn seo_btn_one btn_hover" Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Adicción
                            <input type="checkbox"  onChange={(e) => onCheck(e.target.value,e ) } value="Adicción" className="seo_btn seo_btn_one btn_hover" Style="margin:auto"/> 
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Trauma o abuso</label>
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } className="seo_btn seo_btn_one btn_hover"Style="margin:auto" />
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Pérdida de un ser amado
                            <input type="checkbox"  onChange={(e) => onCheck(e.target.value,e ) } value="Pérdida de un ser amado" className="seo_btn seo_btn_one btn_hover"Style="margin:auto" />
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Relación con los amigos
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Relación con los amigos" className="seo_btn seo_btn_one btn_hover" Style="margin:auto" />
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Conflictos familiares
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Conflictos familiares" className="seo_btn seo_btn_one btn_hover" Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Miedos o fobias
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Miedos o fobias" className="seo_btn seo_btn_one btn_hover"Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Problemas de ira
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Problemas de ira" className="seo_btn seo_btn_one btn_hover"Style="margin:auto" />
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Ataques de pánico
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Ataques de pánico" className="seo_btn seo_btn_one btn_hover"Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Problemas para dormir o insomnio
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Problemas para dormir o insomnio" className="seo_btn seo_btn_one btn_hover" Style="margin:auto"/>
                            </label>
                        </div>
                        <div className="col-lg-12 text-center" >
                            <label>Desordenes alimenticios
                            <input type="checkbox" onChange={(e) => onCheck(e.target.value,e ) } value="Desordenes alimenticios" className="seo_btn seo_btn_one btn_hover" Style="margin:auto"/>
                            </label>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("PreguntaTe", e)}>
                            <a  className="seo_btn seo_btn_one btn_hover" Style="width:55%">Siguinte</a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("SoyAdolecente", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>

                    </div>
                    :
                    <span></span>
                }
                { userAdo==="PreguntaTe" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[35]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionPadre", e) }>
                            <a
                            onClick={(e)=>setuserTerapiaAntes("Nunca",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Nunca
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600}>
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionPadre", e) } >
                            <a
                            onClick={(e)=>setuserTerapiaAntes("Brevemente",e)} 
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Brevemente
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionPadre", e) }>
                            <a
                            onClick={(e)=>setuserTerapiaAntes("Por pocas sesiones",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Por pocas sesiones
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionPadre", e) }>
                            <a
                            onClick={(e)=>setuserTerapiaAntes("Más de 10 sesiones",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Más de 10 sesiones
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("Problemas", e)}>
                            <a  
                            className="seo_btn seo_btn_one_1 btn_hover" 
                            Style="width:55%">
                            Pregunta anterior
                            </a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="RelacionPadre" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[36]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("SuicidaAdo", e) }>
                            <a
                            onClick={(e)=>setuserCalificarRela("Buena",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Buena
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("SuicidaAdo", e) }>
                            <a
                            onClick={(e)=>setuserCalificarRela("Regular",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Regular
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("SuicidaAdo", e) }>
                            <a
                            onClick={(e)=>setuserCalificarRela("Mala",e)}  
                            className="seo_btn seo_btn_one btn_hover" 
                            Style="width:55%">
                            Mala
                            </a>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("PreguntaTe", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }
                { userAdo==="SuicidaAdo" ?
                <div className="container">
                    <Reveal effect={tipoEstilo} duration={1600}><h2 className="f_size_30 f_600 t_color3 l_height45 text-center mb-30">{titulos[37]}</h2></Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("", e) }>
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensamientosMalos(e.target.value,e)}
                                value="Nunca"
                                Style="width:55%">
                                Nunca
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("", e) }>
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensamientosMalos(e.target.value,e)}
                                value="Desde hace un tiempo un tiempo"
                                Style="width:55%">
                                Desde hace un tiempo un tiempo
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("", e) }>
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensamientosMalos(e.target.value,e)}
                                value="Desde hace menos de dos semanas"
                                Style="width:55%">
                                Desde hace menos de dos semanas
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("", e) }>
                            <button 
                                id="Pareja"
                                type="submit"
                                onClick={(e)=>setuserPensamientosMalos(e.target.value,e)}
                                value="Justo ahora"
                                Style="width:55%">
                                Justo ahora
                            </button>
                        </div>
                    </Reveal>
                    <Reveal effect={tipoEstilo} duration={1600} >
                        <div className="col-lg-12 text-center"  onClick={(e) => onclickAdole("RelacionPadre", e)}>
                            <a  className="seo_btn seo_btn_one_1 btn_hover" Style="width:55%">Pregunta anterior</a>
                        </div>
                    </Reveal>
                    </div>
                    :
                    <span></span>
                }


            </section>
            </form> 
            {/* <HRService ServiceData={ServiceData}/> */}
            {/* <PrototypeService/> */}
            {/* <Partner pClass="partner_logo_area_two" pClasst="pt-0 mb-0"/> */}
            {/* <ServiceSubscribe sClass="s_form_info_two"/> */}
            {/* <FooterTwo fClass="pt_150" FooterData={FooterData}/> */}
        </div>
    )
}
export default Service;