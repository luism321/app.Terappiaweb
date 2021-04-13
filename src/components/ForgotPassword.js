import React, { useRef, useState } from "react"
import {  Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("ir a bandeja de mensajes de su correo eléctronico")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
  <div className="container h-100 ">
		<div className="d-flex justify-content-center h-100">
			<div className="user_card">
      <div className="d-flex justify-content-center lo">
					<div className="brand_logo_container">
						<img src="Terappia-2.png" class="brand_logo" alt="Logo"/>
					</div>
				</div>
          {error && <Alert variant="danger">{error}</Alert>}
          {message && <Alert variant="success">{message}</Alert>}
          <form onSubmit={handleSubmit}>
            <div className="form-group" id="email">
            <b> <label>Correo:</label></b>
              <input className="form-control" type="email" ref={emailRef} placeholder="Introduzca su correo electrónico" required />
            </div>
            <button id="especialista" disabled={loading} className="btn btn-primary btn-block" type="submit">
              Restablecer
            </button>
          </form>
          <div className="w-100 text-center mt-3 mb-5">
            <Link to="/login">Acceso</Link>
          </div>
          <div className="w-100 text-center mt-2">
          <Link to="/login">Volver</Link>
          </div>
        </div>
      </div>
      </div>
      
    </>
  )
}
