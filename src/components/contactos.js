import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useHistory, Link } from "react-router-dom";
import './Dashboard.css';
import { faHome, faUser, faAmbulance, faUserEdit, faClinicMedical, faPowerOff, faBars, faBell, faCommentAlt, faSmile, faGift, faIdBadge, faCalendar, faFunnelDollar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "react-bootstrap"
import { db } from "../firebase"
import firebase from "../firebase"
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_18jqcwflnGbkPgeaoNzWQ");

const AppConta = () => {

	const [error, setError] = useState("");
    const { logout } = useAuth("");
    const [currentDatos_1, setcurrenDatos_1] = useState("");
    const history = useHistory("")

	useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            db.collection("Usuarios")
                .doc(user.uid)
                .get().then(function (doc) {
                    let users = doc.data()
                    setcurrenDatos_1(users.nombres);
                });
        })


    }, []);
   const frmContact = { userEmail:'', concernCategory:'', concernCategory_2:'', emailTitle:'', emailDetails:''};
   const [contact,setContact] = useState(frmContact);
   const [showMessage, setShowMessage] = useState(false);

   const handleChange = e => { 
		const {name,value} = e.target;
		setContact({...contact,[name]:value}); 
   };
   const handleSubmit = e =>{
	    e.preventDefault();
	   
		emailjs.send('service_e4olqec','template_9xt7sd6', contact,'user_18jqcwflnGbkPgeaoNzWQ')
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
				   setContact(frmContact);
				   setShowMessage(true);
		}, (err) => {
				   console.log('FAILED...', err);
		});
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
                        <div></div>&nbsp;{currentDatos_1}
                    </div>
                </header>
                <main>
<section className="contact_info_area sec_pad bg_color">
    <div className="container">
    	<div className="row">
        <div className="contact_form col-lg-12">
		<h2 className="f_p f_size_22 t_color3 f_600 l_height28 mb_40 text-center">Contactos</h2>
		<form className="contact_form_box" id="contactForm" onSubmit={handleSubmit}>
			  <div className="row">
			  	<div className="col-lg-12">
					<div className="form-group text_box"> <b>Correo</b> <br/>
						<input required type="text" value={contact.userEmail} name="userEmail" onChange={handleChange} className="form-control" placeholder="Correo" />
					</div>
				</div>
				<div className="col-lg-12">
					<div className="form-group text_box"> <b>Nombres:</b> <br/>
						<input required className="form-control" type="text" value={contact.concernCategory} onChange={handleChange} name="concernCategory" placeholder="Nombres"/>
					</div>
			 	 </div>
				  <div className="col-lg-12">
					<div className="form-group text_box"> <b>Apellidos:</b> <br/>
						<input required className="form-control" type="text" value={contact.concernCategory_2} onChange={handleChange} name="concernCategory_2" placeholder="Apellidos"/>
					</div>
			  		</div>
					<div className="col-lg-12">
						<div className="form-group text_box"> <b>Asunto</b> <br/>
							<input value={contact.emailTitle} required type="text" name="emailTitle" onChange={handleChange}  className="form-control" placeholder="Asunto" />
						</div>
			  		</div>
					<div className="col-lg-12">
					<div className="form-group text_box"> <b>Descripción</b> <br/>
						<textarea required name="emailDetails" onChange={handleChange} className="form-control" placeholder="Describe tu comentario" value={contact.emailDetails}></textarea>
					</div>
					</div>
			  
			  </div>
			  { showMessage ? 
			  <div>
        		<div className="alert alert-success col-md-5 mx-auto text-center" role="alert">Enviado con Éxito!!
				<div className="btn btn " id="cerrarAler" onClick={() => setShowMessage(false)} variant="outline-success">X</div>
				</div>
			  </div>
         : <span></span>}
		 <button className="btn_three">Enviar</button>	
		</form>
		</div>
                    </div>
                </div>
            </section>
			</main>
			</div>
	</div>
  );

}
export default AppConta;