import React, { useState,useEffect } from "react";
import './Dashboard.css';
import {db} from "../firebase"



export default function DoctorParaEmergencia() {
    const [currentDatosEmergencia, setcurrenEmergencia ] = useState([]);

    
                        
const Emerge = async () => {
    db.collection("Usuarios").where("disponible_emergencia","==",true).onSnapshot((querySnapshot) => {
    const docs = [];
    querySnapshot.forEach((doc) => {
     docs.push({ ...doc.data(), id: doc.id });
        });
    setcurrenEmergencia(docs);
    });
    
    
        }
useEffect(() => {
    Emerge();
}, []);
  

  return (
    <>
           <section className="recent">
               <div className="activity-grip">
                   <div className="activity-card">
                       <h3>Especialista disponibles para emergencias</h3>
                       <div className="table-responsive">
                       <table>
                           <thead>
                               <tr>
                                   <th>Nombre</th>
                                   <th>Perfil</th>
                                   <th>Estatus</th>
                                   <th>Opciones</th>
                               </tr>
                           </thead>
                           <tbody>
                           {currentDatosEmergencia.length  ? (
                           currentDatosEmergencia.map(array => (
                                 <tr>
                                     <td>{array.nombres}</td>
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
</>

  )
}
