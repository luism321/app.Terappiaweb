import React, { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faBusinessTime, faClinicMedical, faPowerOff, faBars, faGift, faIdBadge, faCalendar, faUserEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext";
import { db } from "../firebase"
import firebase from "../firebase"
import emailjs from 'emailjs-com';
import { init } from 'emailjs-com';
import moment from 'moment';
moment.locale('es');
init("user_18jqcwflnGbkPgeaoNzWQ");



export default function Video() {
    const [error, setError] = useState("");
    const history = useHistory()
    const { currentUser, logout } = useAuth();
    const [currentDatos, setcurrenDatos] = useState();
    const [UpdateProfilePa, setFirstUpda] = useState("")
    const [firtMain, setFirstMain] = useState(true)
    const [firtinforme, setFirstinforme] = useState(true)
    const [currentPerfil, setCurrentPerfil] = useState("");
    const [showMessage, setShowMessage] = useState(false);
    const frmContact = { linkRoom: '' };
    const [contact, setContact] = useState(frmContact);


    firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Usuarios")
            .doc(user.uid)
            .get().then(function (doc) {
                let users = doc.data()
                setcurrenDatos(users.nombres);
            }).catch(function (error) {
                console.log("Error getting User:", error);
                alert(error);
            });
    });

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
    const [currentDatosPaDe, setLinks] = useState([]);
    const [currentId, setCurrentId] = useState("");
    const [MostrarDiv, setMostrar] = useState(true);


    if (currentId !== "") {
        db.collection("Usuarios")
            .doc(currentId)
            .get().then(function (doc) {
                let users = doc.data()
                setCurrentPerfil(users);
            }).catch(function (error) {
                console.log("Error getting User:", error);
                alert(error);
            });
    }
    const getLinks = async () => {
        db.collection("Usuarios").where("TipoUser", "==", "Paciente").onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setLinks(docs);
            console.log(currentDatosPaDe)
        });

    };

    useEffect(() => {
        getLinks();
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

    const jitsiContainerStyle = {
        width: '100%',
        height: '100%',
    }

    const clMedicalal = () => {

        let r = Math.random().toString(36).substring(7);

        let link = 'meet.jit.si' + '/' + currentUser.uid + r

        setContact({ linkRoom: link })

        const domain = 'meet.jit.si';
        const options = {
            roomName: currentUser.uid + r,
            height: 400,
            parentNode: document.getElementById('jitsi-container'),
            interfaceConfigOverwrite: {
                filmStripOnly: false,
                SHOW_JITSI_WATERMARK: false,
            },
        }
        setFirstinforme(false)

        const api = new window.exports.JitsiMeetExternalAPI(domain, options);
        api.executeCommand('displayName', 'MyName');
    };


    const handleSubmit = e => {

        // e.preventDefault();

        // emailjs.send('service_e4olqec', 'template_0ffcydz', contact, 'user_18jqcwflnGbkPgeaoNzWQ')
        //     .then((response) => {
        //         console.log('SUCCESS!', response.status, response.text);
        //         setShowMessage(true);
        //     }, (err) => {
        //         console.log('FAILED...', err);
        //     });

            const paciente = JSON.parse(localStorage.getItem('paciente_conferencia'));

            db.collection("Conferencias").doc().set({
                fecha_notificacion: moment().format("DD/MM/YYYY hh:mm A"),
                uid_especialista: currentUser.uid,
                nombres_paciente: paciente.nombre,
                apellidos_paciente: paciente.apellido,
                uid_paciente: paciente.id,
                room_link: contact.linkRoom
            }).then(resp =>{
                console.log(resp)
            })
    }


    function Mostrar(e) {
        if (e = true) {
            setMostrar(false)
        }

    }

    return (
        <>
            <body>
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
                            <div></div>&nbsp;&nbsp;{currentDatos}
                        </div>

                    </header>
                    <main>
                        <div className="text-center" >
                            <button onClick={clMedicalal} onClickCapture={(e) => { Mostrar(true, e) }}>Ir a Conferencia</button>
                        </div>
                        <div id="jitsi-container" style={jitsiContainerStyle} />
                        {MostrarDiv === false ?
                            <section className="contact_info_area sec_pad bg_color">
                                <div className="text-center" >
                                    <button onClick={handleSubmit}>compartir sala al Pasiente</button>
                                </div>
                                <div className="container">
                                    <div className="row">
                                        <div className="contact_form col-lg-9">
                                            <h2 className="f_p f_size_22 t_color3 f_600 l_height28 mb_40">Informe de consulta</h2>
                                            <form className="contact_form_box" method="post" id="contactForm">
                                                <div className="row">
                                                    <div className="col-lg-12">
                                                        <div className="form-group text_box">
                                                            <input type="text" id="name" name="name" placeholder="Nombres" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group text_box">
                                                            <input type="text" id="subject" name="subject" placeholder="Descripción" />
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-12">
                                                        <div className="form-group text_box">
                                                            <textarea name="message" id="message" cols="30" rows="10" placeholder="Redactar informe . . ."></textarea>
                                                        </div>
                                                    </div>
                                                </div>
                                                <button type="submit" className="btn_three">Guardar informe</button>
                                            </form>
                                            {/* {emailStatus ? emailStatus : null} */}
                                            <div id="success">Tu mensaje a sido enviado con exito!</div>
                                            <div id="error">¡Opps! Hay algo mal. Inténtalo de nuevo</div>
                                        </div>
                                    </div>
                                </div>
                            </section>

                            : <span></span>
                        }

                    </main>


                </div>
            </body>
        </>
    )
}
