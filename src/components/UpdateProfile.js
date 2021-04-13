import React, { useRef, useState } from "react"
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import {db} from "../firebase"

export default function UpdateProfile() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfirmRef = useRef()
  const { currentUser, updatePassword, updateEmail } = useAuth()
  const [error, setError] = useState("")
  const [Exito, setExito] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()
  const [DatosNombre, setDatos ] = useState();
  const [upPaciente,setupPaciente] = useState();

  db.collection("Usuarios")
  .doc(currentUser.uid)
  .get().then((doc) => {
          let users = doc.data()
          setDatos(users.Nombres);
          setupPaciente(users.TipoUSer)
  }).catch(function (error) {
      console.log("Error getting User:", error);
      alert(error);
  });


  function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match")
    }

    const promises = []
    setLoading(true)
    setError("")

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value))
    }
    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value))
    }

    Promise.all(promises)
      .then(() => {
        history.push("/")
        setExito("Actualizado con exito")
      })
      .catch(() => {
        setError("No se pudo actualizar la cuenta")
      })
      .finally(() => {
        setLoading(false)
      })
  }

  return (
    <>
  <main>
    <div className="container h-100 ">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
      <div className="d-flex justify-content-center">
						<img src="Terappia-2.png" className="brand_logo" alt="Logo"/>
				</div>
          <div className="text-center mb-5 a" ><h1 >Actualizar Perfil</h1></div>
          {error && <Alert variant="danger">{error}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
              <label><b>Nombres:</b></label>
              <input className="form-control"
                type=""
                
                defaultValue={DatosNombre}

              />
            </div>
            <div className="form-group" id="email">
              <label><b>Cédula:</b></label>
              <input className="form-control"
                type=""
               
                placeholder="Agregue su Cedula de identidad"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>Edad:</b></label>
              <input className="form-control"
                type=""
                placeholder="Agregue su edad"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>sexo:</b></label>
              <select type="select" className="form-control">
                <option>seleccionar</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group" id="email">
              <label><b>País:</b></label>
              <select type="select" className="form-control">
                <option>seleccionar</option>
                <option value="Venezuela">Venezuela</option>
                <option value="Argentina">Argentina</option>
                <option value="Peru">Peru</option>
                <option value="Chile">Chile</option>
              </select>
            </div>
            <div className="form-group" id="email">
              <label><b>Ciudad:</b></label>
              <input className="form-control"
                type=""
                
                placeholder="Ciudad"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>Dirreción:</b></label>
              <textarea className="form-control"
                type=""
                
                placeholder="Agregar dirección"
              />
            </div>
            <div className="form-group" id="email">
              <label><b>Religion:</b></label>
              <select type="select" className="form-control">
                <option>seleccionar</option>
                <option value="Catolico">Catolico</option>
                <option value="Cristiano">Cristiano</option>
                <option value="Ateismo">Ateismo</option>
                <option value="Otro">Otro</option>
              </select>
            </div>
            <div className="form-group" id="email">
            <label><b>Numero principal:</b></label>
            <div className="form-inline">
              <input className="form-control col-3"
                type=""
                
                placeholder="+58"
              />
                <input className="form-control col-9"
                  type=""
                  placeholder="Numero Telefonico"
                  
                />
              </div>
              </div>
            <div className="form-group" id="email">
              <label><b>Numero Secundario:</b></label>
              <div className="form-inline">
              <input className="form-control col-3"
                type=""
                placeholder="+58"
              />
                <input className="form-control col-9"
                  type=""
                  placeholder="Numero Telefonico Secundario"
                  
                />
              </div>
            </div>
            <div className="form-group" id="email">
              <label><b>Correo:</b></label>
              <input className="form-control"
                type="email"
                ref={emailRef}
                required
                defaultValue={currentUser.email}
              />
            </div>
            <div className="form-group" id="password">
              <label><b>Contrseña:</b></label>
              <input className="form-control"
                type="password"
                ref={passwordRef}
                placeholder="Dejar en blanco para mantener la misma"
              />
            </div>
            <div className="form-group" id="password-confirm">
              <label><b>Confirmar contraseña:</b></label>
              <input className="form-control"
                type="password"
                ref={passwordConfirmRef}
                placeholder="Dejar en blanco para mantener la misma"
              />
            </div>
            <button id="especialista" disabled={loading} className="btn btn-primary btn-block" type="submit">
              Actualizar
            </button>
          </form>
        </div>
      </div>
      </div>
      </main>

    </>
  )
}
