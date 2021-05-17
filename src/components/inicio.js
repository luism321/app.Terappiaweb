import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { db } from "../firebase"
import 'moment/locale/es'
import moment from 'moment';
moment.locale('es');



export default function Inicio() {
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

  const Hamil = async () => {
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
    db.collection("Usuarios").where("especialista", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }

  if (currentDatosPare === "¿Qué tipo de asesoramiento adulto estás buscando?=Pareja") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psicólogo").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psicólogo").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosParan === "¿Has estado experimentado algunos de estos síntomas?=Paranoia, sensación de persecución, interpretación de mensajes a través de señales") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }


  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Desde hace un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Desde hace un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Desde hace menos de dos semanas") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuci === "¿Has tenido pensamientos suicidas?=Justo ahora") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMiedo === "¿Actualmente sientes ansiedad, ataques de pánico o tienes algún miedo?=Si") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMedicacion === "¿Actualmente estás tomando alguna medicación (psicofármaco)?=Si") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=Desde hace un tiempo un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=Desde hace menos de dos semanas") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatossuciHijo === "Su hijo ha tenido pensamientos y/o intentos suicidas=Justo ahora") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Desde hace un tiempo un tiempo") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Desde hace menos de dos semanas") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
      const docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({ ...doc.data() });
      });
      setDatosList(docs);
    });
  }
  if (currentDatosMalos === "¿Has tenido pensamientos suicidas adolecente?=Justo ahora") {
    const array = [];
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").limit(6).get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        let use = doc.data()
        array.push(use);
      });
      setcurrenDatosPa(array);
    });
    db.collection("Usuarios").where("especialista", "==", "Psiquiatra").onSnapshot((querySnapshot) => {
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
                        <th>Nombre</th>
                        <th>Perfil</th>
                        <th>Estatus de semana</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentDatosList.length ? (
                        currentDatosList.map(array => (
                          <tr>
                            <td>{array.nombres}</td>
                            <td className="td-team">
                              <div onClick={(e) => mostrado("mostrado", e)} onClickCapture={(e) => Datosmedico(array.uid, e)}><div className="img-1"></div></div>
                            </td>
                            <td><span className="badge">Ocupado</span></td>
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

    </>

  )
}
