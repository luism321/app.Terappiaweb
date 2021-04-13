import React, { useState,useEffect } from "react";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faReceipt,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import {db} from "../firebase"
import { useAuth } from "../contexts/AuthContext"

export default function Destacados() {
    const { currentUser } = useAuth();
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
    <div className="activity-grip">
        <div className="activity-card">
            <h3>Médico disponibles para emergencias</h3>
            <div className="table-responsive">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Especialidad</th>
                        <th>Perfil</th>
                        <th>Estatus de semana</th>
                        <th>Opciones</th>
                    </tr>
                </thead>
                <tbody>
                {currentDatosPaDe ? (
                currentDatosPaDe.map(array => (
                      <tr>
                          <td>{array.Nombres}</td>
                          <td>{array.Especialista}</td>
                          <td className="td-team">
                            <div className="img-2"></div>
                          </td>
                          <td><span className="badge success">Disponible</span></td>
                          <td>
                            <a className="text-center">
                                <button>
                                Conferencia
                                </button>
                            </a>
                        </td>
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