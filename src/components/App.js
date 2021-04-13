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
import UpdateProfile from "./UpdateProfile"
import './App.css';


function App() {
  return (
    <div>
        <Router>
          <AuthProvider>
            <Switch>
              <PrivateRoute exact path="/" component={Dashboard} />
              <PrivateRoute exact path="/DashboardEs" component={DashboardEs} />
              <Route path="/login" component={Login}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/Service" component={Service}/>
              <PrivateRoute path="/update-profile" component={UpdateProfile} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
          </AuthProvider>
        </Router>
    </div>
  )
}

export default App
