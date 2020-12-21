import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import  Swal  from 'sweetalert2';

export const LoginView = () => {

	const { login } = useContext(AuthContext);

	const [form, setForm] = useState({
		email:'rga2@gmail.com',
		password:'qwerty2',
		rememberme:true,
	});	

	// this verify if you wanted to be recorded
	useEffect(()=>{
		const remembermeEmail = localStorage.getItem('emailChat');
		if(remembermeEmail){
			setForm((form)=>({
				...form,
				rememberme:false,
				email: remembermeEmail
			}))
		}
	},[]);


	const onChange = ( {target} ) => {		
		setForm({
			...form,
			[target.name]: target.value,
		})
	}


	const toggleCheck = ( ) => {		
		setForm({
			...form,
			rememberme: !form.rememberme
		})
	}


	const sendData = async (event) => {
		event.preventDefault();
		if(form.rememberme){
			localStorage.setItem('emailChat',form.email);
		}else{
			localStorage.removeItem('emailChat');
		}
		// Authoentication
		const success = await login(form.email, form.password);
		if(!success){
			Swal.fire('Authentication','Incorrect credentials', 'error');
		}
		
	}

  return (
	<form
		onSubmit={sendData} 
		className="login100-form validate-form flex-sb flex-w">
      <span className="login100-form-title mb-3">Chat - Ingreso</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
          name="email"
		  placeholder="Email"
		  value={form.email}
		  onChange={onChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
          name="password"
		  placeholder="Password"
		  value={form.password}
		  onChange={onChange}

        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
		<div 
			className="col"
			onClick={()=>toggleCheck()}
		>
          <input
            className="input-checkbox100"
            id="ckb1"
            type="checkbox"
			name="rememberme"			
			checked={form.rememberme}
			readOnly
          />
          <label className="label-checkbox100">Recordarme</label>
        </div>

        <div className="col text-right">
          <Link to={"/auth/register"} className="txt1">
            ¿Nueva cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button className="login100-form-btn">Ingresar</button>
      </div>
    </form>
  );
};
