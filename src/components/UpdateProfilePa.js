import React, { useState,useEffect,useRef } from "react";
import {  useHistory,Link } from "react-router-dom";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faPhone,faBusinessTime,faClinicMedical,faPowerOff,faBars,faGift,faIdBadge,faCalendar, faUserEdit} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import {db} from "../firebase"
import firebase from "../firebase"


export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [input, setErrorInput] = useState("")
  const history = useHistory("")
  const [DatosNombre, setDatos ] = useState("");
  const [Exito, setExito] = useState("")
  const [Email,setEmail]=useState("")
  const [Experiencia,setExperiencia]=useState("")
  const [Profesion,setProfesion]=useState("")
  const [Nombres,setNombres]=useState("")
  const [Cedula,setCedula]=useState("")
  const [Edad,setEdad]=useState("") 
  const [Sexo,setSexo]=useState("") 
  const [Pais,setPais]=useState("") 
  const [Ciudad,setCiudad]=useState("") 
  const [Direccion,setDireccion]=useState("") 
  const [numeroPri,setnumeroPri]=useState("") 
  const [numeroSe,setnumeroSe]=useState("")  
  const [HonorarioCita,setHonorarioCita]=useState("")
  const [HonorarioEmergencia,setHonorarioEmergencia]=useState("")
  const [Apellidos,setApellidos]=useState("")
  const [TipoEspecialidades,setTipoEspecialidades]=useState("")
  const [show, setShow] = useState(true);

  const {logout } = useAuth();

  
  useEffect(() => {
  const fetchBusinesses = () => {
  db.collection("Usuarios")
    .doc(currentUser.uid)
    .get().then((doc) => {
            if(doc.exists){
              let users=doc.data()
            setDatos(users);
          } 
    }).catch(function (error) {
        console.log("Error getting User:", error);
        alert(error);
    });
  };
    fetchBusinesses();
  }, []);

  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    
    db.collection("Usuarios").doc(currentUser.uid).update({
      "nombres":Nombres,
      "apellidos":Apellidos,
      "cedula":Cedula,
      "edad":Edad,
      "correo":Email,
      "sexo":Sexo,
      "pais":Pais,
      "ciudad":Ciudad,
      "direccion":Direccion,
      "num_principal":numeroPri,
      "num_secundario":numeroSe,
      "tipos_terapia":TipoEspecialidades,
      "experiencia":Experiencia,
      "profesion":Profesion,
      "precio_consulta":HonorarioCita,
      "precio_emergencia":HonorarioEmergencia,
    })

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/UpdateProfile")
        setExito("Actualizado con éxito")
      })
      .catch(() => {
        setError("No se pudo actualizar la cuenta")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handlkeyPress(){
    var ele = document.querySelectorAll('#validanumericos')[0];
    var ele_2 = document.querySelectorAll('#validanumericos_2')[0];
    ele.onkeypress = function(e) {
       if(isNaN(this.value+String.fromCharCode(e.charCode))){
       setErrorInput("En este campo solo es permitido numeros")
      return false;
    }
    }
    ele.onpaste = function(e){
       e.preventDefault();
    }
    ele_2.onkeypress = function(e) {
      if(isNaN(this.value+String.fromCharCode(e.charCode))){
      setErrorInput("En este campo solo es permitido numeros")
     return false;
   }
   }
   ele_2.onpaste = function(e){
      e.preventDefault();
   }
  }  
  const [state,setState ]=useState({
    uploadValue:0,
    piture:null
  }) 

  function handleChange(e){
    const file=e.target.files[0]
    console.log(file)
    const storageRef= firebase.storage().ref(`fotos/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',(snapshot)=>{
      const porcentage= (snapshot.bytesTransferred/snapshot.totalBytes)* 100
      setState({
        uploadValue: porcentage
      })
    },(error)=>{
       setState({
        message:`error:${error.message}`
      })
    },()=>{
      setState({
        message:"Foto cargada con Exito",
        piture:task.snapshot.downloadURL
      })
    })
  }
  const [stateDocTitulo,setStateDocTitulo ]=useState({
    uploadValueDocTitulo:0,
    DocTitulo:null
  }) 
  function handleChangeDocTiulo(e){
    const file=e.target.files[0]
    console.log(file)
    const storageRef= firebase.storage().ref(`Document/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',(snapshot)=>{
      const porcentage= (snapshot.bytesTransferred/snapshot.totalBytes)* 100
      setStateDocTitulo({
        uploadValueDocTitulo: porcentage
      })
    },(error)=>{
       setStateDocTitulo({
        message:`error:${error.message}`
      })
    },()=>{
      setStateDocTitulo({
        message:"Documento cargado con Exito",
        DocTitulo:task.snapshot.downloadURL
      })
    })
  }
  
  const [stateDocCarnet,setStateDocCarnet ]=useState({
    uploadValueDocCarnet:0,
    DocCarnet:null
  }) 
  function handleChangeDocCarnet(e){
    const file=e.target.files[0]
    console.log(file)
    const storageRef= firebase.storage().ref(`Document/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',(snapshot)=>{
      const porcentage= (snapshot.bytesTransferred/snapshot.totalBytes)* 100
      setStateDocCarnet({
        uploadValueDocCarnet: porcentage
      })
    },(error)=>{
       setStateDocCarnet({
        message:`error:${error.message}`
      })
    },()=>{
      setStateDocCarnet({
        message:"Documento cargado con Exito",
        DocCarnet:task.snapshot.downloadURL
      })
    })
  }
  const [stateDocCedula,setStateDocCedula ]=useState({
    uploadValueDocCedula:0,
    DocCedula:null
  }) 

  function handleChangeDocCedula(e){
    const file=e.target.files[0]
    console.log(file)
    const storageRef= firebase.storage().ref(`Document/${file.name}`)
    const task = storageRef.put(file)

    task.on('state_changed',(snapshot)=>{
      const porcentage= (snapshot.bytesTransferred/snapshot.totalBytes)* 100
      setStateDocCedula({
        uploadValueDocCedula: porcentage
      })
    },(error)=>{
       setStateDocCedula({
        message:`error:${error.message}`
      })
    },()=>{
      setStateDocCedula({
        message:"Documento cargado con Exito",
        DocCedula:task.snapshot.downloadURL
      })
    })
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
                    <a Id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance}/></a>
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
                <div></div>&nbsp;&nbsp;{DatosNombre.Nombres}
            </div>
            
        </header> 
  <main>
 
  <div className="text-center a" ><h1 >Actualizar Perfil</h1></div>
  <section className="contact_info_area sec_pad bg_color">
      <div className="container">
          <div className="row">
          <div className="contact_form col-lg-12">
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
          <div className="container">
          <div className="row">
          <div className="contact_form col-lg-12">
          <div className="form-group" id="email">
              <label><b>Foto:</b></label>
              <br/>
              {/*<progress value={state.uploadValue} max='100'></progress>*/ }
              <input className="form-control"
                name='foto'
                type='file'
                onChange={handleChange}
              />
              {state.message}
            </div>
          <div className="form-group" id="email">
              <label><b>Nombres:</b></label>
              <input className="form-control"
                type="text"
                onInput={(e)=>setNombres(e.target.value)}
                defaultValue={DatosNombre.nombres}
              />
              
            </div>
            <div className="form-group" id="email">
              <label><b>Apellidos:</b></label>
              <input className="form-control"
                 type="text"
                onInput={(e)=>setApellidos(e.target.value)}
                defaultValue={DatosNombre.apellidos}
              />
              
            </div>
            <div className="form-group" id="email">
              <label><b>Cédula:</b></label>
              <input className="form-control"
                 type="text"
                 defaultValue={DatosNombre.cedula}
                onChange={(e)=>setCedula(e.target.value)}
                placeholder="Agregue su Cedula de identidad"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>Edad:</b></label>
              <input className="form-control"
              defaultValue={DatosNombre.edad}
                 type="text"
                onChange={(e)=>setEdad(e.target.value)}
                placeholder="Agregue su edad"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>sexo:</b></label>
              <select type="select" className="form-control" onChange={(e)=>setSexo(e.target.value)}>
                <option value={DatosNombre.Sexo}>{DatosNombre.sexo}</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group" id="email">
              <label><b>País:</b></label>
              <select type="select" className="form-control" onChange={(e)=>setPais(e.target.value)}>
                <option>{DatosNombre.pais}</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Argentina">Argentina</option>
                <option value="Peru">Peru</option>
                <option value="Chile">Chile</option>
                <option value="Panama">Panama</option>
                <option value="Mexico">Mexico</option>
                <option value="Ecuador">Ecuador</option>
                <option value="Salvador">Salvador</option>
                <option value="Costa rica">Costa rica</option>
                <option value="Dominicana">Dominicana</option>
                <option value="Puerto rico">Puerto rico</option>
                <option value="Guatemala">Guatemala</option>
                <option value="Brasil">Brasil</option>
                <option value="Colombia">Colombia</option>
              </select>
            </div>
            <div className="form-group" id="email">
              <label><b>Ciudad:</b></label>
              <input className="form-control"
                 type="text"
                onChange={(e)=>setCiudad(e.target.value)}
                placeholder="Ciudad"
                defaultValue={DatosNombre.ciudad}
              />
            </div>
            <div className="form-group" id="email">
              <label><b>Dirreción:</b></label>
              <textarea className="form-control"
                 type="text"
                onChange={(e)=>setDireccion(e.target.value)}
                placeholder="Agregar dirección"
                defaultValue={DatosNombre.direccion}
              />
            </div>
            <div className="form-group" id="email">
              <div><label><b>Tipos de terapias:</b></label></div>
              <div>
              <input className=""
                type="checkbox"
              />Terappia de pareja&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <input className=""
                type="checkbox"
              />Terappia de niños
              </div>
            </div>
            <div className="form-group" id="email">
            <label><b>Numero principal:</b></label>
              <input className="form-control col-3"
                type="text"
                name="codigo"
                id="validanumericos"
                defaultValue={DatosNombre.num_principal}
                onChange={(e)=>setnumeroPri(e.target.value)}
                placeholder="+58 Numero Telefonico"
                onKeyPress={handlkeyPress}
              />
              {input && <div className="validarInput">{input}</div>}
              </div>
            <div className="form-group" id="email">
              <label><b>Numero Secundario:</b></label>
              <input className="form-control col-3"
              defaultValue={DatosNombre.num_secundario}
              name="codigo"
              type="text"
              id="validanumericos_2"
              onChange={(e)=>setnumeroSe(e.target.value)}
              placeholder="+58 Numero Telefonico"
              onKeyPress={handlkeyPress}
              />
              {input && <div className="validarInput">{input}</div>}
            </div>
            <div className="form-group" id="email">
              <label><b>Correo:</b></label>
              <input className="form-control"
                type="email"
                ref={emailRef}
                required
                onInput={(e)=>setEmail(e.target.value)}
                defaultValue={currentUser.email}
              />
            </div>
            <div className="form-group" id="password">
              <label><b>Contraseña:</b></label>
              <input className="form-control"
                type="password"
                ref={passwordRef}
                placeholder="Dejar en blanco para mantener la misma"
              />
            </div>
            <div className="form-group mb-5" id="password-confirm">
              <label><b>Confirmar contraseña:</b></label>
              <input className="form-control"
                type="password"
                ref={passwordConfirmRef}
                placeholder="Dejar en blanco para mantener la misma"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>Profesión:</b></label>
              <select type="select" className="form-control" onChange={(e)=>setProfesion(e.target.value)}>
                <option>{DatosNombre.profesion}</option>
                <option value="Psicológo">Psicológo</option>
                <option value="Psiquiatra">Psiquiatra</option>
              </select>
            </div>
            <div className="form-group mb-5" id="email">
              <label><b>Años de experiencia:</b></label>
              <input className="form-control"
                type="number"
                placeholder=""
                defaultValue={DatosNombre.experiencia}
                onChange={(e)=>setExperiencia(e.target.value)}
              />
            </div>
            <div className="text-center a mb-5 " ><h1 >Documentación</h1></div>
            <div className="form-group mb-5" id="email">
              <label><b>Titulo universitario:</b></label>
              <br/>
              {/*<progress value={stateDocTitulo.uploadValueDocTitulo} max='100'></progress>*/ }
              <input className="form-control"
                name='titulo'
                type='file'
                onChange={handleChangeDocTiulo}
              />
              {stateDocTitulo.message}
            </div>
            <div className="form-group mb-5" id="email">
              <label><b>Carnet:</b></label>
              <br/>
              {/*<progress value={stateDocCarnet.uploadValueDocCarnet} max='100'></progress>*/ }
              <input className="form-control"
                name='Carnet'
                type='file'
                onChange={handleChangeDocCarnet}
              />
              {stateDocCarnet.message}
            </div>
            <div className="form-group mb-5" id="email">
              <label><b>Cédula:</b></label>
              <br/>
              {/*<progress value={stateDocCedula.DocCedula} max='100'></progress>*/ }
              <input className="form-control"
                name='CedulaDoc'
                type='file'
                onChange={handleChangeDocCedula}
              />
              {stateDocCedula.message}
            </div>

            <div className="text-center a mb-5 " ><h1 >Honorarios</h1></div>
            <div className="">
            <label className="ml-2"><b>Monto de Servicio Emergencia:</b></label> 
            <input defaultValue={DatosNombre.precio_consulta} className="select_Servi" placeholder="$" onChange={(e)=>setHonorarioEmergencia(e.target.value)}/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <label className="ml-2"><b>Monto de Servicio Citas:</b></label> 
            <input defaultValue={DatosNombre.precio_emergencia} className="select_Servi" placeholder="$" onChange={(e)=>setHonorarioCita(e.target.value)}/>
            </div>
          
            <button id="especialista" disabled={loading} className="btn btn-primary btn-block mb-5 mt-5" type="submit">
              Actualizar
            </button>
            <div>{Exito && 
            <Alert show={show} variant="success">
            <Alert.Heading className="text-center">{Exito}</Alert.Heading>
            <hr />
            <div className="d-flex justify-content-end">
              <button className="btn btn" onClick={() => setShow(false)} variant="outline-success">
                Cerrar X
              </button>
            </div>
          </Alert>
            }
            </div>
          </div>
       </div>
       </div>
          </form>
          </div>
       </div>
       </div>
            </section>
      </main>
    </div>
    </div>
  )
}
