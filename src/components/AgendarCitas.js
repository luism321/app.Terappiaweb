import React, { useState, useEffect } from "react";
import './Dashboard.css';
import { Alert } from "react-bootstrap"
import { db } from "../firebase";
import { useHistory, Link } from "react-router-dom";
import { faHome, faUser, faAmbulance, faTrash, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from "../contexts/AuthContext";
import 'moment/locale/es'
import { PayPalButton } from "react-paypal-button-v2";

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

  const [HasPlan, setHasPlan] = useState(false)
  const [uidPlan, setuidPlan] = useState("")
  const [nuevoPrecio, setnuevoPrecio] = useState(0)

  // const arrayNew=HorasDis.horas


  // for (let i = 0; i < arrayNew; i++) { 
  //   setHorasDis(arrayNew[i])
  //   }

  const TraerDatos = () => {
    db.collection("Usuarios")
      .doc(currentUser.uid)
      .get().then((doc) => {
        if (doc.exists) {
          console.log(doc)
          let users = doc.data()
          users.$key = doc.id
          console.log(users)
          if (users.uid_Plan != "" && users.consultasDisponibles > 0) {
            setHasPlan(true)
            setuidPlan(users.uid_Plan)
          } else {
            setHasPlan(false)
            setuidPlan("")
          }
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


  const Fecha = (e, dataInfo) => {
    setFecha(e)
    db.collection("Usuarios").doc(id).collection("Horario").where("uid", "==", id).where("dia", "==", moment(e).format("dddd"))
      .onSnapshot(function (querySnapshot) {
        var Horarios = [];
        var Dias = [];
        querySnapshot.forEach(function (doc) {
          let datos = doc.data()
          let datosDias = doc.data()
          datos.$key = doc.id
          Horarios.push(datos);
          Dias.push(datosDias);
          setDias(Dias);
          console.log(datos)
        });
        if (Horarios.length > 0) {
          db.collection("Citas").where("uid_especialista", "==", id).where("fecha", "==", e)
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
                Horarios[0].horas.forEach(element => {
                  let contador = 0
                  citas.forEach(data => {
                    if (element == data.hora) {
                      contador++
                    }
                  })
                  if (contador == 0) {
                    info.push(element)
                  }
                })
                setHoraDisponible(info)

                setHorasDis(info)
                console.log(HoraDisponible)
                console.log(Dias)
                console.log(HorasDis)
                // setArrayCitas(citas)
              } else {
                setHoraDisponible(Horarios[0].horas)
                setHorasDis(Horarios[0].horas)
              }
            });
        } else {
          setError("Medico no posee horario para este dia")
          setHoraDisponible([])
          setHorasDis([])
        }
      });

  }

  function vaciarState() {
    setError("")
  }


  function TomarHoraCita(e) {
    if (uidPlan != "") {
      db.collection("Planes")
        .doc(uidPlan)
        .get().then((doc) => {
          if (doc.exists) {
            let plan = doc.data()
            console.log(plan)
            console.log(uidPlan)
            console.log(e)
            console.log(DatosNombre)
            console.log(DatosDoc)
            for (let i = 0; i < plan.planes.length; i++) {
              if(plan.planes[i] == DatosNombre.Plan){
                console.log(parseInt(DatosDoc.precio_consulta) * parseInt(plan.descuentoConsultas[i]) / 100) 
                setnuevoPrecio(DatosDoc.precio_consulta - (parseInt(DatosDoc.precio_consulta) * parseInt(plan.descuentoConsultas[i]) / 100))
                console.log(nuevoPrecio)
              }
            }
            setTomarHoras(e)  
          }
        }).catch(function (error) {
          console.log("Error getting User:", error);
          console.log(error);
        });
    } else {
      setTomarHoras(e)  
    }

  }

  function AgregarConsulta(details, data) {
    // console.log(details)
    // console.log(data)
    console.log(TomarHora)
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
    })
      .then(() => {
        db.collection("HistorialPagos").doc().set({
          tipo_pago: "Crear Cita",
          nombres_paciente: DatosNombre.nombres,
          uid_paciente: DatosNombre.uid,
          nombre_especialista: DatosDoc.nombres,
          cedula_paciente: DatosNombre.cedula,
          uid_especialista: DatosDoc.uid,
          apellidos_paciente: DatosNombre.apellidos,
          estatusPago: details.status,
          apellido_especialista: DatosDoc.apellidos,
          num_principal_paciente: DatosNombre.num_principal,
          fecha_Pago: moment().format("DD/MM/YYYY"),
          idPago:details.id,
          fechaPagoPaypal:details.create_time,
          direccionPagador:details.payer.address,
          emailPagador:details.payer.name,
          monto:details.purchase_units[0].amount,
          facilitatorAccessToken:data.facilitatorAccessToken,
          orderID:data.orderID,
          payerID:data.payerID,
          tipo_plan:"",
          Plan:""
        }).then(() => {
          let infoFinal = DatosNombre
          console.clear()
          console.log(uidPlan)
          console.log(DatosNombre)
          if (uidPlan != "" && DatosNombre.consultasDisponibles > 0) {
            infoFinal.consultasDisponibles = infoFinal.consultasDisponibles - 1 
            if(infoFinal.consultasDisponibles == 0){
              infoFinal.Plan = ""
              infoFinal.Tipo_plan = ""
              infoFinal.uid_Plan = ""
            }
            db.collection("Usuarios").doc(DatosNombre.$key).set(infoFinal)
            .then(resp=>{
              history.push("/")
              setExito("Consulta agregada con Éxito")
            })
          }
        })
      })

  }

  function errorUpdatePlan() {
    console.log("Error al pagar")
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
                        <div className="form-inline">
                          <div><h3>{array.dia} </h3></div><div>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{fecha}</div>
                        </div>
                      </div>
                      <div>
                        <div className="mt-2">
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
            {error && <div>{error}<Link to="/AgendarCitas">&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} onClick={vaciarState} /></Link></div>}

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
                  {/* <div><label>Costo:</label></div> */}
                  
                  {uidPlan != "" ? 
                  <div className="mb-3">
                    <div> Precio anterior: {DatosDoc.precio_consulta}$</div> 
                    <div> Precio nuevo: {nuevoPrecio}$</div>
                   </div> 
                   :
                   <div className="mb-3">
                    <div> Precio: {DatosDoc.precio_consulta}$</div> 
                   </div>
                  }
                    
                  
                  <div className="">
                    {TomarHora}
                  </div>
                </div>
                <div id="boton" className="botonA" Style="width: 100%;justify-content: center;display: flex;">
                  {uidPlan != "" ? 
                    <PayPalButton
                    amount={nuevoPrecio}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                      // OPTIONAL: Call your server to save the transaction
                      fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                          orderId: data.orderID
                        })
                      })
                        .then(resp => {
                          AgregarConsulta(details, data)
                        })
                    }}
                    catchError={(error) => {
                      console.log(error)
                      errorUpdatePlan()
                    }}
                    options={{
                      clientId: "AV5h0ivhjvRnCQYyPCjnCzumB7lKEJP1IADFcBoqSRNVGfdTd3EkFFdDUVmFzxr2-gVQKS9evl1_E_Er",
                      currency: "USD"
                    }}
                  />
                  :
                  <PayPalButton
                    amount={DatosDoc.precio_consulta}
                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                    onSuccess={(details, data) => {
                      // OPTIONAL: Call your server to save the transaction
                      fetch("/paypal-transaction-complete", {
                        method: "post",
                        body: JSON.stringify({
                          orderId: data.orderID
                        })
                      })
                        .then(resp => {
                          AgregarConsulta(details, data)
                        })
                    }}
                    catchError={(error) => {
                      console.log(error)
                      errorUpdatePlan()
                    }}
                    options={{
                      clientId: "AV5h0ivhjvRnCQYyPCjnCzumB7lKEJP1IADFcBoqSRNVGfdTd3EkFFdDUVmFzxr2-gVQKS9evl1_E_Er",
                      currency: "USD"
                    }}
                  />
                  }
                  
                  {/* <button onClick={AgregarConsulta}>Registrar consulta</button> */}
                </div>
              </div>
            </div>
            <div>{Exito &&
              <div>
                {Exito}
                <Link to="/">&nbsp;&nbsp;<FontAwesomeIcon icon={faTrash} /></Link>
              </div>
            }

            </div>
          </main>
          : <div></div>}

        {/* {HasPlan === false ?
          <div><h1>No tienes plan ? selecciona uno</h1></div> :
          <div><h1>Si tiene plan</h1></div>
        } */}
      </div>
    </>


  )
}