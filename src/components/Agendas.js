import React, { useState,useEffect } from "react";
import './Dashboard.css';
import { faHome,faPhone,faUser,faAmbulance,faReceipt,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import {db} from "../firebase"
import { useAuth } from "../contexts/AuthContext"

export default function Agendas() {

  return (
    <>
    <body>
        <main>
        <h2 className="dash-title_2 a"><h1>Citas Agendadas</h1></h2>
        <h2 className="dash-title_2 b"><h2>Lunes</h2></h2>
            <div className="dash-cards_1">
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                        <h5>Manuel alvares</h5>
                        <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                        <div>
                            <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
            </div>
            <h2 className="dash-title_2 b"><h2>Martes</h2></h2>
            <div className="dash-cards_1">
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                        <h5>Manuel alvares</h5>
                        <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                        <div>
                            <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
            </div> 
            <h2 className="dash-title_2 b"><h2>Miercoles</h2></h2>
            <div className="dash-cards_1">
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                        <h5>Manuel alvares</h5>
                        <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                        <div>
                            <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label>Hora:</label>
                            <h4>7:30 pm</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Ver paciente</a>
                    </div>
                </div>
            </div>
        </main>
    
</body>
    </>
  )
}