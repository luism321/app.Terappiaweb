import React from "react";
import './Dashboard.css';
import {faPhone} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Emergencias() {

  return (
    <>
    <body>
        <main>
        <h2 className="dash-title_2 b"><h1>Emergencias</h1></h2>
            <div className="dash-cards_1">
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                        <h5>Manuel alvares</h5>
                        <label></label>
                            <h4>Urgente</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                        <a href=""><FontAwesomeIcon icon={faPhone}/></a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                        <div>
                            <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label></label>
                            <h4>Urgente</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                    <a href=""><FontAwesomeIcon icon={faPhone}/></a>
                    </div>
                </div>
                <div className="card-single">
                    <div className="card-body">
                    <div>
                        <label>Paciente:</label>
                            <h5>Manuel alvares</h5>
                            <label></label>
                            <h4>Urgente</h4>
                        </div>
                    </div>
                    <div className="card-footer">
                    <a href=""><FontAwesomeIcon icon={faPhone}/></a>
                    </div>
                </div>
            </div> 
        </main>
    
</body>
    </>
  )
}