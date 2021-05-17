import React, { useState, useEffect } from "react";
import './Dashboard.css';
import { Alert } from "react-bootstrap"
import { db } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import 'moment/locale/es'

import moment from 'moment';

moment.locale('es');


export default function AgendarCitasNew() {
  const history = useHistory("");
  const [error, setError] = useState("");
  const [DatosNombre, setDatos] = useState("");
  const [DatosDoc, setDatosDoc] = useState("");
  const { currentUser, logout } = useAuth("");
  const [Dias, setDias] = useState([]);
  const [HorasDis, setHorasDis] = useState([]);
  const [Exito, setExito] = useState("")
  const [fecha, setFecha] = useState("");
  const [fechaCita, setFechaCita] = useState("");
  const [Estatus, setEstatus] = useState("Pendiente");
  const [TomarHora, setTomarHoras] = useState("");
  const [mostrarhoras, setmostrarhoras] = useState(false);
  const [ocultarhoras, setocultarhoras] = useState(true);
  const [show, setShow] = useState(true);

  const id = JSON.parse(localStorage.getItem('id'))



  // variables Evander
  const [HoraDisponible, setHoraDisponible] = useState([])

  // const arrayNew=HorasDis.horas


  // for (let i = 0; i < arrayNew; i++) { 
  //   setHorasDis(arrayNew[i])
  //   }

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

    db.collection("Usuarios")
      .doc(id)
      .get().then((doc) => {
        if (doc.exists) {
          let users = doc.data()
          setDatosDoc(users);
        }
      }).catch(function (error) {
        console.log("Error getting User:", error);
        alert(error);
      });

  };

  useEffect(() => {
    console.log("aqui")
    TraerDatos();
    // Fecha("2021-05-11")
  }, []);


  const [myArray, updateMyArray] = useState([]);

  const Fecha = (e,dataInfo) => {
    setFecha(e)
    db.collection("Usuarios").doc(id).collection("Horarios").where("uid", "==", id).where("dia", "==", moment(e).format("dddd"))
      .onSnapshot(function (querySnapshot) {
        var Horarios = [];
        querySnapshot.forEach(function (doc) {
          let datos = doc.data()
          datos.$key = doc.id
          Horarios.push(datos);
        });
        if (Horarios.length > 0) {
          db.collection("Citas").where("uid_especialista", "==", id).where("fecha","==", e)
            .onSnapshot(function (querySnapshot) {
              var citas = [];
              querySnapshot.forEach(function (doc) {
                let datos = doc.data()
                datos.$key = doc.id
                citas.push(datos);
              });
              console.log(Horarios)
              console.log(citas)
              if (citas.length > 0) {
                setHoraDisponible([])
                let info = []
                Horarios[0].horas.forEach(element=>{
                  let contador = 0
                  citas.forEach(data=>{
                    if (element == data.hora){
                      contador++
                    }
                  })
                  if(contador == 0){
                    info.push(element)
                  }
                })
                setHoraDisponible(info)
                setDias(info)
                setHorasDis(info)
                console.log(HoraDisponible)
                console.log(Dias)
                console.log(HorasDis)
                // setArrayCitas(citas)
              } else {
                setHoraDisponible([])
                setDias([])
                setHorasDis([])
                console.log("no hay info")
              }
            });
        } else {
          console.log("no hay info")
          setHoraDisponible([])
          setDias([])
          setHorasDis([])
        }
      });

    // db.collection("Usuarios").doc(id).collection("Horarios").where("uid", "==", id).where("dia", "==",moment(e).format("dddd")).onSnapshot((querySnapshot) => {
    //     const docs = [];
    //     const diadocs = [];
    //     querySnapshot.forEach((doc) => {
    //       diadocs.push(doc.data().dia);
    //       docs.push(doc.data());
    //     });
    //     console.log(docs)
    //     setDias(diadocs)
    //     setHorasDis(docs)
    //   });
    //   db.collection("Citas").where("uid_especialista", "==", id).where("fecha","==", e).onSnapshot((querySnapshot) => {
    //     const docsCitas = [];
    //     querySnapshot.forEach((doc) => {
    //       docsCitas.push(doc.data().hora);
    //     });
    //     console.log(docsCitas)
    // setArrayCitas(docsCitas)
    // 

    // console.log(ArrayHora)
    // console.log(Hra)
    // console.log(ArrayCitas)

    //  console.log(HorasDispo)
    //  console.log(ArrayCitas)
    // for(let i=0;i<arrayNew.length;i++){

    // let res= HorasDispo.find(a=>a!==ArrayCitas)
    // console.log(res)
    // }
    // });
  }







  function TomarHoraCita(e) {
    setTomarHoras(e)
  }

  function AgregarConsulta() {
    db.collection("Citas").doc().set({
      hora: TomarHora,
      nombres_paciente: DatosNombre.nombres,
      uid_paciente: DatosNombre.uid,
      nombre_especialista: DatosDoc.nombres,
      fecha: fecha,
      cedula_paciente: DatosNombre.cedula,
      uid_especialista: DatosDoc.uid,
      apellidos_paciente: DatosNombre.apellidos,
      estatus: Estatus,
      apellido_especialista: DatosDoc.apellidos,
      num_principal_paciente: DatosNombre.num_principal,
      fecha_creacion: moment().format("DD/MM/YYYY")
    }).then(() => {
      history.push("/AgendarCitas")
      setExito("Consulta agregada con Éxito")
    })

  }

  function most(e) {
    console.log(fechaCita)
    if (e = "mostrar") {
      setmostrarhoras(true)
      setocultarhoras(false)
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

        {ocultarhoras === true ?
          <main>
            <div className="text-left">
              <div className="form-control">
                <label>Especialista:</label>
              </div>
              <div className="form-control">
                {DatosDoc.Nombres}&nbsp;&nbsp;{DatosDoc.apellidos}
              </div>
            </div>
            <div className="">
              <div className="">
                <label className="form-control">Seleccione su dia:</label>
              </div>
              <div className="text-center">
                <input type="date" className="form-control col-md-4" onChange={(e) => Fecha(e.target.value)}></input>
              </div> 
            </div>
            <div className="dash-cards">
              {Dias.length != undefined ? (
                Dias.map(array => (
                  <div className="card-single">
                    <div className="card-body">
                      <div>
                        <div>
                          <div><h3>{array}</h3></div>
                        </div>
                      </div>
                      <div>
                      <div>
                          {HoraDisponible != undefined ? (
                            HoraDisponible.map(hora => (
                              <div><input type="checkbox" onChange={(e) => TomarHoraCita(e.target.value, e)} value={hora} onClick={(e) => most("mostrar", e)} />{hora}</div>
                              // <div>{hora.map(mostrar => (
                              //   <div><input type="checkbox" onChange={(e) => TomarHoraCita(e.target.value, e)} value={mostrar} onClick={(e) => most("mostrar", e)} />{mostrar}</div>
                              // ))}</div>
                            ))
                          )
                            :
                            (
                              <p></p>
                            )}
                        </div>
                      </div>

                    </div>

                  </div>
                ))
              ) : (
                <p></p>
              )}
            </div>
           

          </main>
          : <div></div>}
        {mostrarhoras === true ?
          <main>
            <div className="dash-cards">
              <div className="card-single">
                <div className="card-body">
                  <div><label>Especialista:</label></div>
                  <div className="mb-3">
                    {DatosDoc.nombres}&nbsp;&nbsp;{DatosDoc.apellidos}
                  </div>
                  <div><label>Costo:</label></div>
                  <div className="mb-3">
                    {DatosDoc.precio_consulta}$
                  </div>
                  <div className="">
                    {TomarHora}
                  </div>
                </div>
                <div id="boton" className="botonA">
                  <button onClick={AgregarConsulta}>Registrar consulta</button>
                </div>
              </div>
            </div>
            <div>{Exito &&
              <Alert show={show} variant="success">
                <Alert.Heading className="text-center">{Exito}</Alert.Heading>
                <hr />
                <div className="d-flex justify-content-end">
                  <button className="btn btn" onClick={() => setShow(false)} variant="outline-success">
                    <Link to="/">Cerrar X</Link>
                  </button>
                </div>
              </Alert>
            }

            </div>
          </main>
          : <div></div>}
      </div>
    </>


  )
}