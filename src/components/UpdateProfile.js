import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"
// import {bufferMap} from 'rxjs-operators'

export default function UpdateProfilePa() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { logout } = useAuth("");
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [input, setErrorInput] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory("")
  const [DatosNombre, setDatos] = useState("");
  const [Exito, setExito] = useState("")
  const [Email, setEmail] = useState("")
  const [Nombres, setNombres] = useState("")
  const [Cedula, setCedula] = useState("")
  const [Edad, setEdad] = useState("")
  const [Sexo, setSexo] = useState("")
  const [Pais, setPais] = useState("")
  const [Ciudad, setCiudad] = useState("")
  const [Direccion, setDireccion] = useState("")
  const [Religion, setReligion] = useState("")
  const [numeroPri, setnumeroPri] = useState("")
  const [numeroSe, setnumeroSe] = useState("")
  const [Apellidos, setApellidos] = useState("")
  const [show, setShow] = useState(true);



  useEffect(() => {
    const TraerDatos = () => {
      db.collection("Usuarios")
        .doc(currentUser.uid)
        .get().then((doc) => {
          if (doc.exists) {
            let users = doc.data()
            setDatos(users);
          }
        }).catch(function (error) {
          console.log("Error getting User:", error);
          alert(error);
        });
    };
    TraerDatos();
  }, []);


  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promisesPa = []
    setLoading(true)
    setError("")

    db.collection("Usuarios").doc(currentUser.uid).update({
      "nombres": Nombres,
      "apellidos": Apellidos,
      "cedula": Cedula,
      "edad": Edad,
      "correo": Email,
      "sexo": Sexo,
      "pais": Pais,
      "ciudad": Ciudad,
      "direccion": Direccion,
      "religion": Religion,
      "num_principal": numeroPri,
      "num_secundario": numeroSe,
      "foto_personal":state.picture,
    })

    if (emailRef.current.value !== currentUser.email) {
      promisesPa.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promisesPa.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promisesPa)
      .then(() => {
        history.push("/Update")
        setExito("Actualizado con éxito")
      })
      .catch(() => {
        setError("No se pudo actualizar la cuenta")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  function handlkeyPress() {
    var ele = document.querySelectorAll('#validanumericos')[0];
    var ele_2 = document.querySelectorAll('#validanumericos_2')[0];
    ele.onkeypress = function (e) {
      if (isNaN(this.value + String.fromCharCode(e.charCode))) {
        setErrorInput("En este campo solo es permitido numeros")
        return false;
      }
    }
    ele.onpaste = function (e) {
      e.preventDefault();
    }
    ele_2.onkeypress = function (e) {
      if (isNaN(this.value + String.fromCharCode(e.charCode))) {
        setErrorInput("En este campo solo es permitido numeros")
        return false;
      }
    }
    ele_2.onpaste = function (e) {
      e.preventDefault();
    }
  }



  const [statebarra,setStatebarra ]=useState(
    {barra:0})
  const [state,setState ]=useState({
    piture:null
  }) 
  function handleChange(e){
    const file=e.target.files[0]
    const storageRef= firebase.storage().ref(`Usuarios/${currentUser.uid}/foto_personal/${file.name}`)
    const task = storageRef.put(file)
    
    task.on('state_changed',(snapshot)=>{
      const porcentage= (snapshot.bytesTransferred/snapshot.totalBytes)* 100;
      setStatebarra({
        barra: porcentage
      })
    },error=>{
       setState({
        message:`error:${error.message}`
      })
    },()=>{
      task.snapshot.ref.getDownloadURL().then((url)=>{
       const dato=url
      setState({
        message:"Foto cargada con Exito",
        picture:dato
      })
    })
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
            <div></div>&nbsp;{DatosNombre.nombres}
          </div>
        </header>
        <main>
          <div className="text-center a" ><h1 >Actualizar Perfil</h1></div>
          <section className="contact_info_area sec_pad bg_color">
            <div className="upda text-center">
              <img src={DatosNombre.foto_personal} id="A-1"></img>
            </div>
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
                            <br />
                            {<progress value={statebarra.barra} max='100'></progress>}
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
                              onInput={(e) => setNombres(e.target.value)}
                              defaultValue={DatosNombre.nombres}
                            />

                          </div>
                          <div className="form-group" id="email">
                            <label><b>Apellidos:</b></label>
                            <input className="form-control"
                              type="text"
                              onInput={(e) => setApellidos(e.target.value)}
                              defaultValue={DatosNombre.apellidos}
                            />

                          </div>
                          <div className="form-group" id="email">
                            <label><b>Cédula:</b></label>
                            <input className="form-control"
                              type="text"
                              defaultValue={DatosNombre.cedula}
                              onChange={(e) => setCedula(e.target.value)}
                              placeholder="Agregue su Cedula de identidad"
                            />
                          </div>
                          <div className="form-group" id="email">
                            <label><b>Edad:</b></label>
                            <input className="form-control"
                              defaultValue={DatosNombre.edad}
                              type="text"
                              onChange={(e) => setEdad(e.target.value)}
                              placeholder="Agregue su edad"
                            />
                          </div>
                          <div className="form-group" id="email">
                            <label><b>sexo:</b></label>
                            <select type="select" className="form-control" onChange={(e) => setSexo(e.target.value)}>
                              <option value={DatosNombre.sexo}>{DatosNombre.sexo}</option>
                              <option value="Masculino">Masculino</option>
                              <option value="Femenino">Femenino</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>
                          <div className="form-group" id="email">
                            <label><b>País:</b></label>
                            <select type="select" className="form-control" onChange={(e) => setPais(e.target.value)}>
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
                              onChange={(e) => setCiudad(e.target.value)}
                              placeholder="Ciudad"
                              defaultValue={DatosNombre.ciudad}
                            />
                          </div>
                          <div className="form-group" id="email">
                            <label><b>Dirreción:</b></label>
                            <textarea className="form-control"
                              type="text"
                              onChange={(e) => setDireccion(e.target.value)}
                              placeholder="Agregar dirección"
                              defaultValue={DatosNombre.direccion}
                            />
                          </div>
                          <div className="form-group" id="email">
                            <label><b>Religion:</b></label>
                            <select type="select" className="form-control" onChange={(e) => setReligion(e.target.value)}>
                              <option>{DatosNombre.religion}</option>
                              <option value="Catolico">Catolico</option>
                              <option value="Cristiano">Cristiano</option>
                              <option value="Ateismo">Ateismo</option>
                              <option value="Otro">Otro</option>
                            </select>
                          </div>
                          <div className="form-group" id="email">
                            <label><b>Numero principal:</b></label>
                            <input className="form-control col-3"
                              type="text"
                              name="codigo"
                              id="validanumericos"
                              defaultValue={DatosNombre.num_principal}
                              onChange={(e) => setnumeroPri(e.target.value)}
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
                              onChange={(e) => setnumeroSe(e.target.value)}
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
                              onInput={(e) => setEmail(e.target.value)}
                              defaultValue={DatosNombre.correo}
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
    </>
  )
}
