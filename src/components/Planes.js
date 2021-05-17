import React from "react";

export default function Planes() {

  return (
    <div>
            <h1 className="dash-title text-center mb-5">Planes Psicólogo</h1>
            <div className="dash-cards">
                <div className="card-single_planes text-center">
                    <div className="card-body">
                        <div>
                        <div id="stars"><div></div></div>
                            <h3 className="mb-3" id="titleBasico">Plan Básico</h3>
                            <div>
                            <h1 className="mb-5" >$10</h1>
                            </div>
                            
                            <div className="mb-3">
                            5% de descuento en las siguientes 4 consultas y/o emergencias.
                            </div>
                            <div className="mb-5 " >
                                <button id="buttonPlanes" href="">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-single_planes text-center" >
                    <div className="card-body">
                        <div className="text-center">
                        <div id="starsEstandar"><div></div></div>
                            <h3 className="mb-3 " id="titleEstandar" >Plan Estándar</h3>
                            <div>
                            <h1 className="mb-5" >$20</h1>
                            </div>
                            <div className="mb-3">
                            7% de descuento en las siguientes 12 consultas y/o emergencias.
                            </div>
                            <div className="mb-5 " >
                                <button id="buttonPlanes" href="">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-single_planes text-center" >
                    <div className="card-body">
                        <div>
                        <div id="starsPremiun"><div></div></div>
                            <h3 className="mb-3" id="titlePremiun">Plan Premium</h3>
                            <div>
                            <h1 className="mb-5" >$30</h1>
                            </div>
                            <div className="mb-3">
                            10% de descuento en las siguientes 24 consultas y/o emergencias.
                            </div>
                            <div className="mb-5 " >
                                <button id="buttonPlanes" href="">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div> 
            <h1 className="dash-title text-center">Planes Psiquiatras</h1>
            <div className="dash-cards">
                <div className="card-single_planes text-center">
                    <div className="card-body">
                        <div>
                            <div id="stars"><div></div></div>
                            <h3 className="mb-3" id="titleBasico">Plan Básico</h3>
                            <div>
                            <h1 className="mb-5" >$10</h1>
                            </div>
                            
                            <div className="mb-3">
                               5% de descuento en las siguientes 4 consultas y/o emergencias.
                            </div>
                            <div className="mb-3">
                                5% de descuento en traslado de récipe durante un mes.
                            </div>
                            <div className="mb-5 " >
                                <button id="buttonPlanes" href="">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-single_planes text-center">
                    <div className="card-body">
                        <div>
                            <div id="starsEstandar"><div></div></div>
                            <h5 className="mb-3" id="titleEstandar" >Plan Estándar</h5>
                            <div>
                            <h1 className="mb-5" >$20</h1>
                            </div>
                            
                            <div className="mb-3">
                                7% de descuento en las siguientes 12 consultas y/o emergencias.
                            </div>
                            <div className="mb-3">
                                10% de descuento en traslado de récipe durante tres meses.
                            </div>
                            <div className="mb-5 " >
                                <button id="buttonPlanes" href="">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="card-single_planes text-center" >
                    <div className="card-body">
                        <div>
                            <div id="starsPremiun"><div></div></div>
                            <h3 className="mb-3" id="titlePremiun">Plan Premium</h3>
                            <div>
                            <h1 className="mb-5" >$30</h1>
                            </div>
                            
                            <div className="mb-3">
                                10% de descuento en las siguientes 24 consultas y/o emergencias.
                            </div>
                            <div className="mb-3">
                                15% de descuento en el traslado del récipe durante seis meses.
                            </div>
                            <div className="mb-5 " >
                                <button id="buttonPlanes" href="">Elegir</button>
                            </div>
                        </div>
                    </div>
                </div>
               
            </div> 
    </div>
  )
}
