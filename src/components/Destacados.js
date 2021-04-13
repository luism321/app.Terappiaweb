import React, { useState,useEffect } from "react";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faReceipt,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {db} from "../firebase"


export default function Destacados() {
    const [currentDatosPaDe, setcurrenDatosPaDe ] = useState();
    
    const array=[];
    db.collection("Usuarios").where("TipoUSer","==","Especialista").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
           let use=doc.data()
           array.push(use);
        });
        setcurrenDatosPaDe(array);
    });
  return (
    <>
    <body>
        <main>
        <section className="recent">
        <h2 className="dash-title">Listado médico</h2>
        <div className="activity-grip">
        <div className="activity-card">
        
        <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Perfil</th>
                        <th>Estatus de semana</th>
                    </tr>
                </thead>
                <tbody>
                {currentDatosPaDe? (
                currentDatosPaDe.map(array => (
                      <tr>
                          <td>{array.Nombres}</td>
                          <td>{array.Especialista}</td>
                          <td className="td-team">
                            <div className="img-1"></div>
                          </td>
                          <td><span className="badge danger">Ocupado</span></td>
                      </tr>
                      ))
             ) : (
               <p></p>
             )}
                </tbody>
            </table>
            </div> 
            </div>
        </div>
        </section>
        </main>
    
</body>
    </>
  )
}