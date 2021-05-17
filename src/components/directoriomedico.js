import React, { useState } from "react";
import './Dashboard.css';
import { db } from "../firebase";
import { faSmile, faGift, faIdBadge, faCalendar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


export default function Directorio() {

    
    const [currentDirectorio, setcurrenDirectorio] = useState([]);

    function Direct(e) {
        db.collection("Usuarios").where("especialista", "==", e).onSnapshot((querySnapshot) => {
            const docs = [];
            querySnapshot.forEach((doc) => {
                docs.push({ ...doc.data(), id: doc.id });
            });
            setcurrenDirectorio(docs);
            console.log(currentDirectorio)
        });
        if (e === "") {
            db.collection("Usuarios").where("tipouser", "==", "Especialista").onSnapshot((querySnapshot) => {
                const docs = [];
                querySnapshot.forEach((doc) => {
                    docs.push({ ...doc.data(), id: doc.id });
                });
                setcurrenDirectorio(docs);
                console.log(currentDirectorio)
            });
        }

    }


    return (
        <>
            <section className="recent">
                <div className="activity-grip">
                    <div className="activity-card">
                        <h3>Directorio</h3>

                        <div className="table-responsive">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Nombre</th>
                                        <th>Perfil</th>
                                        <th>Estatus de semana</th>
                                        <th>

                                            <select className="selectEspe" onChange={(e) => Direct(e.target.value, e)}>
                                                <option value="" >Seleccionar</option>
                                                <option value="Psicólogo" >Psicológos</option>
                                                <option value="Psiquiatra" >Psiquitras</option>
                                            </select>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentDirectorio.length ? (
                                        currentDirectorio.map(arrayDire => (
                                            <tr>
                                                <td>{arrayDire.nombres}</td>
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
                                <span ><FontAwesomeIcon icon={faIdBadge} /></span>
                                <div>
                                    <h5>196</h5>
                                    <small>Psicologos</small>
                                </div>
                            </div>
                            <div className="summary-single">
                                <span><FontAwesomeIcon icon={faCalendar} /></span>
                                <div>
                                    <h5>16</h5>
                                    <small>Psiquiatras</small>
                                </div>
                            </div>
                            <div className="summary-single">
                                <span><FontAwesomeIcon icon={faSmile} /></span>
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
                                    <span><FontAwesomeIcon icon={faGift} /></span>
                               Desearle
                         </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </>


    )
}