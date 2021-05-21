import { PayPalButton } from "react-paypal-button-v2";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"
import moment from 'moment';


export default function Planes() {
    const [error, setError] = useState("");
    const { logout } = useAuth("");
    const [currentDatos_3, setcurrenDatos_3] = useState("");
    const [planes, setplanes] = useState([]);
    const history = useHistory("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("Usuarios")
            .doc(user.uid)
            .get().then(function (doc) {
                let users = doc.data()
                users.$key = doc.id
                setcurrenDatos_3(users);
                // GET PLANES
                fetchPlanes()
            });
        })

    }, []);

    const fetchPlanes = async() => {
        const response=db.collection('Planes');
        const data=await response.get();
        let info = []
        data.docs.forEach(item=>{
            let datos = item.data()
            datos.$key = item.id
            info.push(datos)
        })
        console.log(info)
        setplanes(info)
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

    const UpdatePlan = (data, details, Plan, tipoPlan, descuento, limiteConsultas, id_Plan) => {
        console.clear()

        const datos = currentDatos_3
        datos.Plan = Plan
        datos.Tipo_plan = tipoPlan
        datos.consultasDisponibles = limiteConsultas
        datos.uid_Plan = id_Plan

        console.log(datos)

        db.collection("Usuarios").doc(currentDatos_3.$key).set(datos)
            .then(resp => {
                db.collection("HistorialPagos").doc().set({
                    tipo_pago: "Compra de plan",
                    nombres_paciente: currentDatos_3.nombres,
                    uid_paciente: currentDatos_3.$key,
                    nombre_especialista: "",
                    cedula_paciente: currentDatos_3.cedula,
                    uid_especialista: "",
                    apellidos_paciente: currentDatos_3.apellidos,
                    estatusPago: details.status,
                    apellido_especialista: "",
                    num_principal_paciente: currentDatos_3.num_principal,
                    fecha_Pago: moment().format("DD/MM/YYYY"),
                    idPago:details.id,
                    fechaPagoPaypal:details.create_time,
                    direccionPagador:details.payer.address,
                    emailPagador:details.payer.name,
                    monto:details.purchase_units[0].amount,
                    facilitatorAccessToken:data.facilitatorAccessToken,
                    orderID:data.orderID,
                    payerID:data.payerID,
                    tipo_plan:tipoPlan,
                    Plan:Plan
                  }).then(() => {
                      history.push("/")
                      alert("Se realizo el cambio de plan exitosamente !!!")
                      // setExito("Consulta agregada con Éxito")
                })
            })
    }

    const errorUpdatePlan = () => {
        alert("Ha ocurrido un problema al relizar el cambio de plan, intente otra vez")
        console.clear()
        console.log("No se realizo el cambio")
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
            <div></div>&nbsp;{currentDatos_3.nombres}
          </div>
        </header>
        <main>
            {planes.length != 0 ? (
                planes.map(array => (
                    <div>
                        <h1 className="dash-title text-center mb-5">Plan {array.tipo_plan}</h1>
                        <div className="dash-cards">
                        {array.planes.map((plan,index) => (
                        <div className="card-single_planes text-center">
                            <div className="card-body">
                                {/* <div> */}
                                    <div id="stars"><div></div></div>
                                    <h3 className="mb-3" id="titleBasico">Plan {plan}</h3>
                                    <div>
                                        <h1 className="mb-5" >${array.precios[index]}</h1>
                                    </div>

                                    <div className="mb-3">
                                    {array.description[index]}
                                    </div>
                                    <div className="mb-5 " >
                                        {/* <button onClick={() => UpdatePlan("data", "details", plan, array.tipo_plan, array.descuentoConsultas[index], array.precios[index])}>x</button> */}
                                        <PayPalButton
                                            amount={array.precios[index]}
                                            onSuccess={(details, data) => {
                                                fetch("/paypal-transaction-complete", {
                                                    method: "post",
                                                    body: JSON.stringify({
                                                        orderId: data.orderID
                                                    })
                                                })
                                                    .then(resp => {
                                                        // UpdatePlan(data, details, "Basico", "Psicologo", 5, 4)

                                                        UpdatePlan(data, details, plan, array.tipo_plan, array.descuentoConsultas[index], array.cantidadConsultas[index], array.$key)
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
                                    </div>
                                {/* </div> */}
                            </div>
                        </div>
                        ))}
                        </div>
                    </div>
                ))
            ):''
            }
            
            {/* <h1 className="dash-title text-center">Planes Psiquiatras</h1>
            <div className="dash-cards">
                <div className="card-single_planes text-center">
                    <div className="card-body">
                        <div>
                            <div id="stars"><div></div></div>
                            <h3 className="mb-3" id="titleBasico">Plan Básico</h3>
                            <div>
                                <h1 className="mb-5" >$10</h1>
                            </div>
                            <div className="mb-3">
                                5% de descuento en las siguientes 4 consultas y/o emergencias.
                            </div>
                            <div className="mb-3">
                                5% de descuento en traslado de récipe durante un mes.
                            </div>
                            <div className="mb-5 " >
                                <PayPalButton
                                    amount="10.00"
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
                                                console.log(resp)
                                                UpdatePlan(data, details, "Basico", "Psiquiatras", 5, 4)
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-single_planes text-center">
                    <div className="card-body">
                        <div>
                            <div id="starsEstandar"><div></div></div>
                            <h5 className="mb-3" id="titleEstandar" >Plan Estándar</h5>
                            <div>
                                <h1 className="mb-5" >$20</h1>
                            </div>
                            <div className="mb-3">
                                7% de descuento en las siguientes 12 consultas y/o emergencias.
                            </div>
                            <div className="mb-3">
                                10% de descuento en traslado de récipe durante tres meses.
                            </div>
                            <div className="mb-5 " >
                                <PayPalButton
                                    amount="20.00"
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
                                                console.log(resp)
                                                UpdatePlan(data, details, "Estandar", "Psiquiatras", 7, 12)
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
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-single_planes text-center" >
                    <div className="card-body">
                        <div>
                            <div id="starsPremiun"><div></div></div>
                            <h3 className="mb-3" id="titlePremiun">Plan Premium</h3>
                            <div>
                                <h1 className="mb-5" >$30</h1>
                            </div>
                            <div className="mb-3">
                                10% de descuento en las siguientes 24 consultas y/o emergencias.
                            </div>
                            <div className="mb-3">
                                15% de descuento en el traslado del récipe durante seis meses.
                            </div>
                            <div className="mb-5 " >
                                <PayPalButton
                                    amount="30.00"
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
                                                console.log(resp)
                                                UpdatePlan(data, details, "Premium", "Psiquiatras", 10, 12)
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
                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
            </main>
            </div>
        </div>
    )
}