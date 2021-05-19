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
moment.locale('es');



export default function Inicio() {
  const [error, setError] = useState("");
  const [currentDatos_2, setcurrenDatos_2] = useState("");
  const { currentUser, logout } = useAuth("");
  const [currentDatosPa, setcurrenDatosPa] = useState("");
  const [currentDatosPare, setcurrenDatosPare] = useState("");
  const [currentDatosParan, setcurrenDatosParan] = useState("");
  const [currentDatossuci, setcurrenDatosSuici] = useState("");
  const [currentDatossuciHijo, setcurrenDatosSuiciHijo] = useState("");
  const [currentDatosMalos, setcurrenDatosMalos] = useState("");
  const [currentDatosMiedo, setcurrenDatosMiedo] = useState("");
  const [currentDatosMedicacion, setcurrenDatosMedicacion] = useState("");
  const history = useHistory("")
  const id = currentUser.uid
  const [currentDatosList, setDatosList] = useState([]);
  const [Panel, setPanel] = useState(true)
  const [currentId, setCurrentId] = useState("");
  const [currentPerfil, setCurrentPerfil] = useState("");


  const Hamil = async () => {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("Usuarios")
        .doc(user.uid)
        .get().then(function (doc) {
          let users = doc.data()
          setcurrenDatos_2(users.nombres);
        });
    })
    db.collection("Hamilton")
      .doc(id)
      .get().then((doc) => {
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
  useEffect(() => {
    Hamil();
  }, []);

  function Datosmedico(e) {
    console.log(e)
    setCurrentId(e)
    db.collection("Usuarios")
      .doc(e)
      .get().then(function (doc) {
        let users = doc.data()
        setCurrentPerfil(users);
      }).catch(function (error) {
        console.log("Error getting User:", error);
        alert(error);
      });

  }


  if (currentDatosParan === "N/A") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Nunca") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "Su hijo ha tenido pensamientos y/o intentos suicidas=Nunca") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=No lo sé") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Nunca") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }

  if (currentDatosPare === "¿Qué tipo de asesoramiento adulto estás buscando?=Pareja") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosParan === "¿Has estado experimentado algunos de estos síntomas?=Paranoia, sensación de persecución, interpretación de mensajes a través de señales") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }


  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Desde hace un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Desde hace un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Desde hace menos de dos semanas") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Justo ahora") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMiedo === "¿Actualmente sientes ansiedad, ataques de pánico o tienes algún miedo?=Si") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMedicacion === "¿Actualmente estás tomando alguna medicación (psicofármaco)?=Si") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=Desde hace un tiempo un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=Desde hace menos de dos semanas") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=Justo ahora") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Desde hace un tiempo un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Desde hace menos de dos semanas") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Justo ahora") {
    const array = [];
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialidad", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }

  function ObtenerId(e) {
    localStorage.setItem("id", JSON.stringify(e))
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


  function mostrado(e) {
    if (e === "mostrado") {
      setPanel(false)
    }
  }
  function cerrado(e) {
    if (e === "cerrado") {
      setPanel(true)
      setCurrentId("")
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
              <Link to="/MisCitas">
                <a>
                  <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical} /></a>
                  <span>Mis citas</span>
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
            <div></div>&nbsp;{currentDatos_2}
          </div>
        </header>
        <main>
          {Panel === true ?
            <div>
              <h2 className="dash-title">Especialistas sugeridos Para ti</h2>
              <div className="dash-cards ">
                {currentDatosPa ? (
                  currentDatosPa.map(array => (
                    <div className="card-single">
                      <div className="card-body">
                        <div onClick={(e) => mostrado("mostrado", e)} onClickCapture={(e) => Datosmedico(array.uid, e)} className="container" id="A-1"></div>
                        <div className="text-center">
                          <h5 className="mt-2">{array.nombres}&nbsp;&nbsp;{array.apellidos}</h5>
                          <label></label>
                          <h5>{array.especialista}</h5>
                          <label>Honorarios consultas:</label>
                          <h5>Cita:&nbsp;{array.precio_consulta}$&nbsp;/&nbsp;Emergencia:&nbsp;{array.precio_emergencia}$</h5>
                          <h5></h5>
                          <label>Años de experiencia:</label>
                          <h5>{array.experiencia}</h5>

                        </div>
                      </div>
                      <div className="card-footer text-center">
                        <Link to="/AgendarCitas"><button onClick={(e) => ObtenerId(array.uid, e)}> Agendar cita</button></Link>
                      </div>
                    </div>
                  )
                  )) : (
                  <div></div>
                )}
              </div>
              <section className="recent">
                <h2 className="dash-title">Listado de especialistas</h2>
                <div className="activity-grip">
                  <div className="activity-card">

                    <div className="table-responsive">
                      <table>
                        <thead>
                          <tr>
                            <th>Nombres</th>
                            <th>Apellidos</th>
                            <th>Perfil</th>
                            <th>Opciones</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentDatosList.length ? (
                            currentDatosList.map(array => (
                              <tr>
                                <td>{array.nombres}</td>
                                <td>{array.apellidos}</td>
                                <td className="td-team">
                                  <div onClick={(e) => mostrado("mostrado", e)} onClickCapture={(e) => Datosmedico(array.uid, e)}><div className="img-1"></div></div>
                                </td>
                                <td><Link to="/AgendarCitas"><div className="agendar" onClick={(e) => ObtenerId(array.uid, e)}><button>Agendar cita</button></div></Link></td>
                              </tr>
                            ))
                          ) : (
                            <div></div>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </section>

            </div>
            : <div></div>}
          {currentId !== "" ? (
            <div className="card-single">
              <div className="text-right cerrar" onClick={(e) => cerrado("cerrado", e)} >Cerrar</div>
              <div className="card-single">
                <div className="card-body">
                  <div className="container" id="A-1"></div>
                  <div className="text-center">
                    <h5 className="mt-2">{currentPerfil.nombres}&nbsp;&nbsp;{currentPerfil.apellidos}</h5>
                    <label></label>
                    <h5>{currentPerfil.especialista}</h5>
                    <label>Honorarios consultas:</label>
                    <h5>Cita:&nbsp;{currentPerfil.precio_consulta}$&nbsp;/&nbsp;Emergencia:&nbsp;{currentPerfil.precio_consulta}$</h5>
                    <h5></h5>
                    <label>Años de experiencia:</label>
                    <h5>{currentPerfil.experiencia}</h5>

                  </div>
                </div>
              </div>
            </div>
          ) : (
            <p></p>
          )}
        </main>
      </div>

    </>

  )
}
