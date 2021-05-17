import React, { useState } from "react";
import emailjs from 'emailjs-com';
import{ init } from 'emailjs-com';
init("user_18jqcwflnGbkPgeaoNzWQ");

const App = () => {
   const frmContact = { userEmail:'', concernCategory:'', concernCategory_2:'', emailTitle:'', emailDetails:''};
   const [contact,setContact] = useState(frmContact);
   const [showMessage, setShowMessage] = useState(false);

   const handleChange = e => { 
		const {name,value} = e.target;
		setContact({...contact,[name]:value}); 
   };
   const handleSubmit = e =>{
	    e.preventDefault();
	   
		emailjs.send('service_e4olqec','template_9xt7sd6', contact,'user_18jqcwflnGbkPgeaoNzWQ')
		.then((response) => {
				   console.log('SUCCESS!', response.status, response.text);
				   setContact(frmContact);
				   setShowMessage(true);
		}, (err) => {
				   console.log('FAILED...', err);
		});
   }


  return (

    <div>
<section className="contact_info_area sec_pad bg_color">
    <div className="container">
    	<div className="row">
        <div className="contact_form col-lg-12">
		<h2 className="f_p f_size_22 t_color3 f_600 l_height28 mb_40 text-center">Contactos</h2>
		<form className="contact_form_box" id="contactForm" onSubmit={handleSubmit}>
			  <div className="row">
			  	<div className="col-lg-12">
					<div className="form-group text_box"> <b>Correo</b> <br/>
						<input required type="text" value={contact.userEmail} name="userEmail" onChange={handleChange} className="form-control" placeholder="Correo" />
					</div>
				</div>
				<div className="col-lg-12">
					<div className="form-group text_box"> <b>Nombres:</b> <br/>
						<input required className="form-control" type="text" value={contact.concernCategory} onChange={handleChange} name="concernCategory" placeholder="Nombres"/>
					</div>
			 	 </div>
				  <div className="col-lg-12">
					<div className="form-group text_box"> <b>Apellidos:</b> <br/>
						<input required className="form-control" type="text" value={contact.concernCategory_2} onChange={handleChange} name="concernCategory_2" placeholder="Apellidos"/>
					</div>
			  		</div>
					<div className="col-lg-12">
						<div className="form-group text_box"> <b>Asunto</b> <br/>
							<input value={contact.emailTitle} required type="text" name="emailTitle" onChange={handleChange}  className="form-control" placeholder="Asunto" />
						</div>
			  		</div>
					<div className="col-lg-12">
					<div className="form-group text_box"> <b>Descripción</b> <br/>
						<textarea required name="emailDetails" onChange={handleChange} className="form-control" placeholder="Describe tu comentario" value={contact.emailDetails}></textarea>
					</div>
					</div>
			  
			  </div>
			  { showMessage ? 
			  <div>
        		<div className="alert alert-success col-md-5 mx-auto text-center" role="alert">Enviado con Éxito!!
				<div className="btn btn " id="cerrarAler" onClick={() => setShowMessage(false)} variant="outline-success">X</div>
				</div>
			  </div>
         : <span></span>}
		 <button className="btn_three">Enviar</button>	
		</form>
		</div>
                    </div>
                </div>
            </section>
	
	</div>
  );

}
export default App;