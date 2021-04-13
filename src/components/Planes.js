import React, { useState,useEffect } from "react";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faReceipt,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  Alert } from "react-bootstrap"


export default function Planes() {
 
  return (
    <>
    <body>
        <main>
            <h2 className="dash-title">Elige tu plan</h2>
            <div className="dash-cards">
                <div className="card-single text-center">
                    <div className="card-body">
                        <div>
                            <h5>Clasico</h5>
                            <h1>10$</h1>
                            <label>1 semana</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Elegir</a>
                    </div>
                </div>
                <div className="card-single text-center">
                    <div className="card-body">
                        <div>
                            <h5>Avanzado</h5>
                            <h1>20$</h1>
                            <label>2 semanas</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Elegir</a>
                    </div>
                </div>
                <div className="card-single text-center">
                    <div className="card-body">
                        <div>
                            <h5>Premiun</h5>
                            <h1>50$</h1>
                            <label>1 Mes</label>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href="">Elegir</a>
                    </div>
                </div>
            </div> 
        </main>
    
</body>
    </>
  )
}
