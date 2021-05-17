import React, { useRef, useState } from "react"
import {  Alert } from "react-bootstrap"
import {  useHistory,Link } from "react-router-dom"
import {db} from "../firebase"
import { auth } from "../firebase"
import "./Signup.css"
import './TipoUser.css';

const Signup = () => {
  const [TipoUser,setTipoUser]=useState("")
  const [Especialista,setEspecialista]=useState("")
  const [Nombres,setNombres]=useState("")
  const [Apellidos,setApellidos]=useState("")
  const [Email,setEmail]=useState("")
  const [Password,setPassword]=useState("")
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory("")
  const [userPA, setUserPa] = useState('');
  const [userEs, setUserEs] = useState('');
  const [firstContainer,setFirstContainer] = useState(true)
  
  
  
  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Las contraseñas no coinciden")
    }
    try {
      setError("")
      setLoading(true)
      auth.createUserWithEmailAndPassword(Email, Password)
      .then((userCredential) => {
        var user = userCredential.user.uid;
      db.collection("Usuarios").doc(user).set({
        tipouser:TipoUser,
        especialista:Especialista,
        nombres:Nombres,
        apellidos:Apellidos,
        correo:Email,
        uid:user,
      })
    })
      .catch((error)=>{
        alert(error.message)
      })
      if(TipoUser==="Paciente"){
      history.push("/Service")
    }
      if(TipoUser==="Especialista"){
        history.push("/DashboardEs")
      }
    } catch {
      setError("No se pudo crear una cuenta el correo que intenta registrar ya existe en terappiaweb")
    }

    setLoading(false)
  }
  
  const onclickpa =(e)=>{
    let pa=e
    if(pa==='Paciente'){
      setUserPa(pa)
      setTipoUser(pa)
      setFirstContainer(false)
    }
  }
  const onclickes=(e)=>{
    let Es=e
    if(Es==='Especialista'){
      setUserEs(Es)
      setTipoUser(Es)
      setFirstContainer(false)
    }
  } 
    const onclickca=(e)=>{
      let ca=e
      if(ca==='Cancelar'){
        setUserEs("")
        setUserPa("")
        setFirstContainer(true)
      } 
    }
  return (
    
    <div>
    {firstContainer === true  ?
    <div className="container h-100 ">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
				<div className="d-flex justify-content-center">
						<img src="Terappia-2.png" className="brand_logo" alt="Logo"/>
				</div>
      
          <div id="Pacientes"> 
              <button  className="btn btn-danger btn-block mb-5" onClick={  (e) => onclickpa('Paciente', e)}  id="pacientes" value="Paciente" type="button">
                Paciente
              </button>
          </div> 
          <div id="Pacientes mb-3">
              <button id="especialista" className="btn btn-danger btn-block" onClick={(e) => onclickes('Especialista', e)} value="Especialista" type="button">
                Especialista 
              </button>
          </div>
          <div id="Inicio" className="text-center">
              <a href="http://terappiaweb.com/">
                <h5>Regresar</h5> 
              </a>
          </div>
          <div className="w-100 text-center mt-2">
        Ya tienes una cuenta? <Link to="/login">Acceso</Link>
      </div>
        </div>
      </div>
    </div>
    :<span></span>
  }
{ userPA==='Paciente'  ?
  <div className="container h-100 ">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card_1">
      <div className="d-flex justify-content-center lo">
						<img src="Terappia-2.png" class="brand_logo" alt="Logo"/>
				</div>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit} className="miformulario">      
          <div className="form-group" id="email">
            <b> <label>Nombres:</label></b>
            <input type="hidden" value={TipoUser} id="TipoUser"  name="TipoUser" onInput={e => setTipoUser(e.target.value)} >
            </input>
              <input
                className="form-control"
                type="text"
                placeholder="Introduzca sus Nombres  completos"
                onChange={(e)=>setNombres(e.target.value)}
              />
            </div>
            <div className="form-group" id="email">
            <b> <label>Apellidos:</label></b>
            <input type="hidden" value={TipoUser} id="TipoUser"  name="TipoUser" onInput={e => setTipoUser(e.target.value)} >
            </input>
              <input
                className="form-control"
                type="text"
                placeholder="Introduzca sus Apellidos completos"
                onChange={(e)=>setApellidos(e.target.value)}
              />
            </div>
            <div className="form-group" id="email">
            <b> <label>Correo:</label></b>
              <input className="form-control" type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="Introduzca su correo electrónico" required />
            </div>
            <div className="form-group"id="password">
            <b> <label>Contraseña:</label></b>
              <input className="form-control"type="password" placeholder="Introduzca su contraseña" ref={passwordRef} value={Password} onChange={(e)=>setPassword(e.target.value)}  required />
            </div>
            <div className="form-group" id="password-confirm">
            <b> <label>Confirmar contraseña:</label></b>
              <input className="form-control"type="password" placeholder="Confirme su contraseña" ref={passwordConfirmRef} required />
            </div>
            <button id="especialista" disabled={loading} className="btn btn-primary btn-block" type="submit">
              Registrarse
            </button>
          </form>
          <div className="especialista">
              <button id="pacientes" className="btn btn-danger btn-block mt-3" onClick={(e) => onclickca('Cancelar', e)} value="Cancelar" type="button">
                Volver
              </button>
          </div>
        </div>
      </div>
      </div>
      :
      
      <span></span>
      }
      { userEs==='Especialista'  ?
  <div className="container h-100 ">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card_1">
      <div className="d-flex justify-content-center lo">
						<img src="Terappia-2.png" class="brand_logo" alt="Logo"/>
				</div>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>      
          <div className="form-group" id="Especialista" > 
            <b> <label>Especialidad:</label></b>
                <select className="form-control" type="select" name="Especialista" value={Especialista} onChange={(e)=>setEspecialista(e.target.value)}>
                  <option>Seleccionar</option>
                  <option>Psicólogo</option>
                  <option>Psiquiatra</option>
                </select>
            </div>
          <div className="form-group" id="email">
            <b> <label>Nombres :</label></b>
            <input type="hidden" value={TipoUser} id="TipoUser" name="TipoUser"  ></input>
              <input
                className="form-control"
                type="text"
                placeholder="Introduzca sus Nombres  completos"
                onChange={(e)=>setNombres(e.target.value)}
              />
            </div>
            <div className="form-group" id="email">
            <b> <label>Apellidos:</label></b>
            <input type="hidden" value={TipoUser} id="TipoUser" name="TipoUser"  ></input>
              <input
                className="form-control"
                type="text"
                placeholder="Introduzca sus Apellidos  completos"
                onChange={(e)=>setApellidos(e.target.value)}
              />
            </div>
            <div className="form-group" id="email">
            <b> <label>Correo:</label></b>
              <input className="form-control" type="email" value={Email} onChange={(e)=>setEmail(e.target.value)} placeholder="Introduzca su correo electrónico" required />
            </div>
            <div className="form-group"id="password">
            <b> <label>Contraseña:</label></b>
              <input className="form-control"type="password" placeholder="Introduzca su contraseña" value={Password} onChange={(e)=>setPassword(e.target.value)} ref={passwordRef} required />
            </div>
            <div className="form-group" id="password-confirm">
            <b> <label>Confirmar contraseña:</label></b>
              <input className="form-control"type="password" placeholder="Confirme su contraseña" ref={passwordConfirmRef} required />
            </div>
            <button id="especialista"  disabled={loading} className="btn btn-primary btn-block" type="submit">
              Registrarse
            </button>
          </form>
          <div className="especialista">
              <button id="pacientes" className="btn btn-danger btn-block mt-3" onClick={(e) => onclickca('Cancelar', e)} value="Cancelar" type="button">
                Volver
              </button>
          </div>
        </div>
      </div>
      </div>
      :
      
      <span></span>
      }
      
      

    </div>
  );

};
export default Signup;