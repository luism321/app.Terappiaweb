import React, { useState,useEffect } from "react";
import './Dashboard.css';
import { faHome,faUser,faAmbulance,faReceipt,faBriefcaseMedical,faDollarSign,faClinicMedical,faNotesMedical,faCity,faHistory,faPowerOff,faBars,faSearch,faBell,faCommentAlt,faSmile,faGift,faIdBadge,faCalendar} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {db} from "../firebase"
export default function Directorio() {

    const [currentDatosPa, setcurrenDatosPa ] = useState();


    useEffect(() => {
        db.collection("Usuarios").where("TipoUSer", "==" ,"Especialista").get().then(querySnapshot => {
            const books=[];
                querySnapshot.forEach(doc => {
                    books.push(doc.data())
                });
                console.log([...books]);
                setcurrenDatosPa([...books])
            });
        }, []);


  return (
    <>
    <body>
        <main>
<section className="recent">
    <div className="activity-grip">
        <div className="activity-card">
            <h3>Directorio Médico</h3>
            
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
                {currentDatosPa ? (
                currentDatosPa.map(book => (
                      <tr>
                          <td>{book.Nombres}</td>
                          <td>{book.Especialista}</td>
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

        <div className="summary">
            <div className="summary-card">
                <div className="summary-single">
                    <span ><FontAwesomeIcon icon={faIdBadge}/></span>
                    <div>
                        <h5>196</h5>
                        <small>Psicologos</small>
                    </div>
                </div>
                <div className="summary-single">
                    <span><FontAwesomeIcon icon={faCalendar}/></span>
                    <div>
                        <h5>16</h5>
                        <small>Psiquiatras</small>
                    </div>
                </div>
                <div className="summary-single">
                    <span><FontAwesomeIcon icon={faSmile}/></span>
                    <div>
                        <h5>12</h5>
                        <small>Terapeutas</small>
                    </div>
                </div>
            </div>
            <div className="bday-card">
                <div className="bday-flex">
                    <div className="bday-img"></div>
                    <div className="bday-info">
                        <label>Especialista:</label>
                        <h5>Manuel Alvarado</h5>
                        <small>Cumpleaños hoy</small>
                    </div>

                </div>
                <div className="text-center">
                  <button>
                      <span><FontAwesomeIcon icon={faGift}/></span>
                        Desearle
                  </button>
                </div>
            </div>

        </div>
    </div>
</section>
        </main>
    
</body>
    </>
  )
}