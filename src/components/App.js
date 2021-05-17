import React from "react"
import Signup from "./Signup"
import { AuthProvider } from "../contexts/AuthContext"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import Dashboard from "./Dashboard"
import DashboardEs from "./DashboardEs"
import Login from "./Login"
import Service from "./Service"
import PrivateRoute from "./PrivateRoute"
import ForgotPassword from "./ForgotPassword"
import Citas from "./agendasDeCitas"
import './App.css';
import profile from './UpdateProfile'
import Directorio from './directoriomedico'
import DoctorEmergencia from './DoctorParaEmergencia'
import Planes from './Planes'
import Contactos from './contactos'
import ContactosEs from './ContactosEspecialista'
import Horarios from "./Horarios"
import Agenda from "./Agendas"
import UpdateProfile from "./UpdateProfilePa"
import Emergencias from "./Emergencias"
import VideoConferencia from "./videoConferencia"
import AgendarCitas from "./AgendarCitas"
import ListadoPaciente from "./ListadoPaciente"

function App() {
  return (
    <div>
      <Router>
        <AuthProvider>
          <Switch>
            <PrivateRoute exact path="/" component={Dashboard} />
            <PrivateRoute path="/DashboardEs" component={DashboardEs} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            <Route path="/Update" component={profile} />
            <Route path="/Directorio" component={Directorio} />
            <Route path="/Emergencia" component={DoctorEmergencia} />
            <Route path="/Emergencias" component={Emergencias} />
            <Route path="/Planes" component={Planes} />
            <Route path="/Horarios" component={Horarios} />
            <Route path="/UpdateProfile" component={UpdateProfile} />
            <Route path="/Agenda" component={Agenda} />
            <Route path="/Contactos" component={Contactos} />
            <Route path="/Contact" component={ContactosEs} />
            <Route path="/Service" component={Service} />
            <Route path="/Citas" component={Citas} />
            <Route path="/ListadoPaciente" component={ListadoPaciente} />
            <Route path="/AgendarCitas" component={AgendarCitas} />
            <Route path="/VideoConferencia" component={VideoConferencia} />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </AuthProvider>
      </Router>
    </div>
  )
}

export default App
