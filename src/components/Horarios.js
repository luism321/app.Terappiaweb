import React, { useState, useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";
import { faHome, faUser, faAmbulance, faEdit, faTrash, faBusinessTime, faClinicMedical, faPowerOff, faBars, faGift, faIdBadge, faCalendar, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase"
import Checkbox from './checkbox'


const Horarios = () => {
  const [Exito, setExito] = useState("")
  const history = useHistory("")
  const [error, setError] = useState("")
  const [DatosNombre, setDatos] = useState("");
  const { currentUser, currentUserid, logout } = useAuth("");
  const [nuevoDaos, setNuevodato] = useState([]);
  const [nuevoDaosHora, setNuevodatoHora] = useState([]);
  const [mostratDiv, setMostrarDiv] = useState(false)
  const [mostratDivDia, setMostrarDivDia] = useState(false)
  const [mostratDivHora, setMostrarDivHora] = useState(false)
  const [Agregar, setAgregar] = useState(true)
  const [IdDia, setIdDia] = useState("")
  const [botones, setbotones] = useState(true)
  const [show, setShow] = useState(true);
  const [misHorarios, setMishorarios] = useState("");
  const [misDias, setMisDias] = useState("");
  const [mensaje, setmensaje] = useState(true);

  const arrayNew = misHorarios

  // for (let i = 0; i < arrayNew.length; i++) {
  //   setIdDia(arrayNew[0])
  // }
 

  const onCheckboxClicked = (id, isChecked, value) => {
    if (isChecked === true) {
      setMostrarDiv(true)
      setMostrarDivDia(true)
      setNuevodato(value)
    }
    else if (isChecked === false) {

      setNuevodato("")
    }
    console.log(nuevoDaos)
  }

  const onCheckboxClickedHora = (id, isChecked, value) => {
    setMostrarDivDia(true)
    if (isChecked === true) {
      setMostrarDivHora(true)
      nuevoDaosHora.push(value)
      setNuevodatoHora([...nuevoDaosHora])
    }
    else if (isChecked === false) {
      const nuevoStateHora = []
      nuevoStateHora.push(value)
      setNuevodatoHora([...nuevoDaosHora])
    }

    console.log(nuevoDaosHora)
  }

  useEffect(() => {
    const fetchBusinesses = () => {
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
      db.collection("Usuarios").doc(currentUser.uid).collection("Horario").where("uid", "==", currentUser.uid).onSnapshot((querySnapshot) => {
        const docs = [];
        const docsDias = [];
        querySnapshot.forEach((doc) => {
          docs.push(doc.data());
          docsDias.push(doc.data().dia);
        });
        setMishorarios(docs);
        setMisDias(docsDias)

      });
    };
    fetchBusinesses();
  }, []);


  const state = {
    opciones: [
      { check: false, dia: "lunes" },
      { check: false, dia: "martes" },
      { check: false, dia: "miércoles" },
      { check: false, dia: "jueves" },
      { check: false, dia: "viernes" },
      { check: false, dia: "sábado" },
      { check: false, dia: "domingo" },

    ]
  };

  const statehora = {
    opcioneshora: [
      { check: false, hora: "06:00 A.M." },
      { check: false, hora: "07:00 A.M." },
      { check: false, hora: "08:00 A.M." },
      { check: false, hora: "09:00 A.M." },
      { check: false, hora: "10:00 A.M." },
      { check: false, hora: "11:00 A.M." },
      { check: false, hora: "12:00 P.M." },
      { check: false, hora: "01:00 P.M." },
      { check: false, hora: "02:00 P.M." },
      { check: false, hora: "03:00 P.M." },
      { check: false, hora: "04:00 P.M." },
      { check: false, hora: "05:00 P.M." },
      { check: false, hora: "06:00 P.M." },
      { check: false, hora: "07:00 P.M." },
      { check: false, hora: "08:00 P.M." },
      { check: false, hora: "09:00 P.M." },
    ]
  };


  const [dispo, setdispo] = useState(true)
  const OnActivo = (e) => {
    if (e === "Activo") {
      setdispo(true)
      db.collection("Usuarios").doc(currentUser.uid).update({
        "disponible_emergencia": dispo,
      })
    } if (dispo === true) {
      setdispo(false)
      db.collection("Usuarios").doc(currentUser.uid).update({
        "disponible_emergencia": dispo,
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

  function AgregarHorario(e) {
    let a = e
    if (a === false) {
      setAgregar(false)
      setbotones(false)
    }
    console.log(Agregar)
    console.log(misDias)
  }


  function ActualizarHorario(e) {
    let a = e
    if (a === "listo") {
      db.collection("Usuarios").doc(currentUser.uid).collection("Horario").doc(nuevoDaos).set({
        dia: nuevoDaos,
        horas: nuevoDaosHora,
        uid: currentUser.uid
      })
      db.collection('Horario')
        .where("uid", '==', currentUser.uid)
        .get().then(Horario => {
          console.log(Horario);
        })
        .then(() => {
          history.push("/Horarios")
          setExito("Su horario fue agregado con éxito")
          
        })
        .catch(() => {
          setError("Error al agregar su horario intentel de nuevo")
        })
    }

    console.log(misHorarios)

  }

  function Eliminar(e) {
    db.collection("Usuarios").doc(currentUser.uid).collection("Horario").doc(e).delete().then(() => {
      setExito("Su horario fue Eliminado con éxito")
      history.push("/Horarios")
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });
  }
  function quitar() {
    setExito("")
  }



  return (

    <div>
      {error && <Alert variant="danger">{error}</Alert>}
      <input type="checkbox" id="sidebar-toggle" />
      <div className="sidebar">
        <div className="sidebar-header">
          <h3 className="brand">
            <span className="ti-unlink"></span>
            <span ><div id="ig" /></span>
          </h3>

          <label for="sidebar-toggle"><FontAwesomeIcon icon={faBars} /></label>
        </div>


        <div className="sidebar-menu" id="sidebar">
          <ul>
            <li>
              <Link to="/DashboardEs">
                <a>
                  <a><FontAwesomeIcon icon={faHome} /></a>
                  <span>Inicio</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="Emergencias">
                <a>
                  <a id="ti-face-smile"><FontAwesomeIcon icon={faAmbulance} /></a>
                  <span >Emergencias</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/Agenda">
                <a>
                  <a className="ti-face-smile"><FontAwesomeIcon icon={faClinicMedical} /></a>
                  <span>Agenda de citas</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/Horarios">
                <a >
                  <a className="ti-clipboard"><FontAwesomeIcon icon={faBusinessTime} /></a>
                  <span>Mis Horarios</span>
                </a>
              </Link>
            </li>

            <li>
              <Link to="/Contact">
                <a>
                  <a className="ti-clipboard"><FontAwesomeIcon icon={faUser} /></a>
                  <span>Contactos</span>
                </a>
              </Link>
            </li>
            <li>
              <Link to="/UpdateProfile">
                <a >
                  <a className="ti-clipboard"><FontAwesomeIcon icon={faUserEdit} /></a>
                  <span>Editar Perfil</span>
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
            Emergencia<span className="ti-bell"><label class="switchBtn">
              <input type="checkbox" />
              <p class="slide round" onClick={(e) => OnActivo("Activo", e)}></p>
            </label></span>
            <div></div>&nbsp;&nbsp;{DatosNombre.nombres}
          </div>

        </header>
        {botones === true ?
          <main>
            <div className="form-inline text-center">
              <div className="mr-5 mb-5"><button onClick={(e) => AgregarHorario(false, e)}> + Agegar nuevo horarios</button></div>
            </div>
            <div className="social-icons">
              Status:<span className="ti-bell"><label class="switchBtn">
                <input type="checkbox" />
                <p class="slide round"></p>
              </label></span>
            </div>
            <div>
              {Exito &&
                <div><label>{Exito} &nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} onClick={quitar} /></label></div>
              }
            </div>
            <div className="dash-cards">
              {misHorarios.length ?
                misHorarios.map(hora => (
                  <div className="card-single">
                    <div className="card-body">
                      <div><h3>{hora.dia}</h3></div>
                      <div>
                        <div>{hora.horas}</div>
                      </div>
                      <div className="form-inline">
                        <div className="mt-3 mr-3" ><FontAwesomeIcon icon={faEdit} /></div>
                        <div className="mt-3"><FontAwesomeIcon icon={faTrash} onClick={(e) => Eliminar(hora.dia, e)} /></div>
                      </div>
                    </div>
                  </div>
                )) : (
                  <p></p>
                )}
            </div>
          </main>
          : <span></span>}

        {Agregar === false ?
          <div>
            <main>
              <div>{Exito &&
                <Alert show={show} variant="success">
                  <Alert.Heading className="text-center">{Exito}</Alert.Heading>
                  <hr />
                  <div className="d-flex justify-content-end">
                    <a href="/Horarios">
                      <button className="btn btn" onClick={() => setShow(false)} variant="outline-success">
                        Cerrar X
              </button>
                    </a>
                  </div>
                </Alert>
              }
              </div>
              <div className="row">
                <div className="col-md-6">
                  {mostratDiv === true ?
                    <div id="div" className="activity-grip_2 abc">
                      <div className="activity-card_1">
                        <div className="text-center">
                          <div><h3>Horas</h3></div>
                          {statehora.opcioneshora.map((checkbox, i) => {
                            return (
                              <div className="text-center">
                                <Checkbox initialState={false} id={i + 1} value={checkbox.hora} onChange={(onCheckboxClickedHora)} />
                                {checkbox.hora}
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>
                    : <span></span>}
                </div>
                <div className="col-md-6">
                  {mostratDiv === true ?
                    <div>
                      <h1 id="title">Dias marcado</h1>
                      <div>{nuevoDaos}</div>
                    </div>
                    : <span></span>}
                  {mostratDivHora === true ?
                    <div>
                      <h1>Horas marcado</h1>
                      {nuevoDaosHora.map(dia => (
                        <div>{dia}</div>
                      ))}
                      <div className="text-center">
                        <button onClick={(e) => ActualizarHorario("listo", e)}>
                          Agregar
                  </button>
                      </div>
                    </div>
                    : <span></span>}
                </div>
              </div>
              {mostratDivDia === false ?
                <div className="">
                  <div className="text-center">
                    <div><h2>Días</h2></div>
                    <div className="form-inline" id="dias">
                      {state.opciones.map((checkbox, i) => {
                        return (

                          <div className="">
                            <div className="ml-5 mb-2"> {checkbox.dia}</div>
                            <div className="ml-5">  <Checkbox initialState={false} id={i + 1} value={checkbox.dia} onChange={(onCheckboxClicked)} /></div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>
                : <span></span>}
            </main>
          </div>
          : <span></span>}

      </div>
    </div>

  );
}
export default Horarios;