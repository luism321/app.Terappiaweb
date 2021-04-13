import React, {  useState } from "react"
import {  Alert } from "react-bootstrap"
import { Link, useHistory } from "react-router-dom"
import { faUser,faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {db} from "../firebase"
import firebase from "../firebase"
import { auth } from "../firebase"

function Login() {
	const [Email,setEmail]=useState("")
	const [Password,setPassword]=useState("")
	const [error, setError] = useState("")
	const [Exito, setExito] = useState("")
	const [loading, setLoading] = useState(false)
	const history = useHistory()


	
	async function handleSubmit(e) {
    e.preventDefault()
	
    try {
	setExito("")
    setError("")
	setLoading(true)
	auth.signInWithEmailAndPassword(Email, Password)
  	.then((userCredential) => {
    var user = userCredential.user;
	db.collection("Usuarios")
	.doc(user.uid)
	.get().then( (doc)=> {
			if(doc.data().TipoUSer==="Paciente"){
				setExito("Iniciando")
				history.push("/")
			  } 
			  if(doc.data().TipoUSer==="Especialista" ){
				setExito("Iniciando")
				history.push("/DashboardEs")
			}	
	}); 
	
})
	.catch((error) => {
	 setError("usuario no encontrado Verifique su correo o contraseña")
	
 });
	 
    } 
	catch {
      setError("Error al iniciar sesión correo o contraseña invalidad")
    }
    setLoading(false)
  }

  return (
    <>
    <div className="container h-100 ">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
						<img src="Terappia-2.png" className="brand_logo"/>
				</div>
				{Exito && <Alert variant="success" className="block text-center">{Exito}</Alert>}
				<div className="d-flex justify-content-center form_container">
					<form onSubmit={handleSubmit}>
						<div className="input-group mb-3">
							<div className="input-group-append">
								<span className="input-group-text form-control">
								<label><FontAwesomeIcon icon={faUser}/></label>
								</span>
							</div>
							<input type="email" name="email" className="form-control input_pass" value={Email} onChange={(e)=>setEmail(e.target.value)}   placeholder="correo electrónico" required/>
						</div>
            
						<div className="input-group mb-2" id="password">
							<div className="input-group-append">
								<span className="input-group-text form-control">
								<label><FontAwesomeIcon icon={faKey}/></label>
								</span>
							</div>
							<input type="password" name="password" className="form-control input_pass" placeholder="Contraseña" value={Password} onChange={(e)=>setPassword(e.target.value)}  required />
						</div>
            			{error && <Alert variant="danger">{error}</Alert>}
						<div className="form-group">
							<div className="custom-control custom-checkbox mb-2">
								<input type="checkbox" className="custom-control-input" id="customControlInline"/>
								<label className="custom-control-label" for="customControlInline">Remember me</label>
							</div>
						</div>
							<div className="d-flex justify-content-center mt-2 login_container">
				 			<button id="login_btn" dlisabed={loading}  type="submit" name="button" className="btn login_btn">Iniciar sesión</button>
				  		 	</div>
							<div className="d-flex justify-content-center mt-2 login_container">
							<Link  to="/signup"><button id="login_btn_registro" dlisabed={loading}  name="button" className="btn login_btn">Registrase</button></Link>
				  		 	</div>
							<div className="d-flex justify-content-center mt-0 login_container">
								<div className="d-flex justify-content-center links mt-3 ">
									<Link  to="/forgot-password">Olvido su contraseña?</Link>
								</div>
				  		 	</div>
					</form>
				</div>
				<div className="d-flex justify-content-center mt-3 mb-3">
					<a href="http://terappiaweb.com/">Ir a inicio</a>
				</div>
			</div>
		</div>
	</div>
    </>
  )
}
export default Login