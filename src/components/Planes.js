import { PayPalButton } from "react-paypal-button-v2";
import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
// import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"

export default function Planes() {
    const [error, setError] = useState("");
    const { logout } = useAuth("");
    const [currentDatos_3, setcurrenDatos_3] = useState("");
    const history = useHistory("")

    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("Usuarios")
                .doc(user.uid)
                .get().then(function (doc) {
                    let users = doc.data()
                    setcurrenDatos_3(users.nombres);
                });
        })


    }, []);

    async function handleLogout() {
        setError("")
        try {
            await logout()
            history.push("/login")
        } catch {
            setError("No se pudo cerrar la sesión")
        }
    }

    const UpdatePlan = (data, details, tipoPlan) => {
        alert("se realizo el cambio de plan exitosamente !!!")
        console.clear()
        console.log(data)
        console.log(details)
        console.log(tipoPlan)
    }

    const errorUpdatePlan = () => {
        alert("Ha ocurrido un problema al relizar el cambio de plan, intente otra vez")
        console.clear()
        console.log("No se realizo el cambio")
    }

    return (
        <div>
            <h1 className="dash-title text-center mb-5">Planes Psicólogo</h1>
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
                                                UpdatePlan(data, details, "Basico")
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
                        <div className="text-center">
                            <div id="starsEstandar"><div></div></div>
                            <h3 className="mb-3 " id="titleEstandar" >Plan Estándar</h3>
                            <div>
                                <h1 className="mb-5" >$20</h1>
                            </div>
                            <div className="mb-3">
                                7% de descuento en las siguientes 12 consultas y/o emergencias.
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
                                                UpdatePlan(data, details, "Basico")
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
                                                UpdatePlan(data, details, "Basico")
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
            </div>
            <h1 className="dash-title text-center">Planes Psiquiatras</h1>
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
                                                UpdatePlan(data, details, "Basico")
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
                                                UpdatePlan(data, details, "Basico")
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
                                                UpdatePlan(data, details, "Basico")
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

            </div>
        </div>
    )
}
