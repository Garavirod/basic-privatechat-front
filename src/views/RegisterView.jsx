import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import Swal from 'sweetalert2';

export const RegisterView = () => {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({
    name: "",
    password: "",
    email: "",
  });


  const sendData = async ( event ) => {
	event.preventDefault();
	const success = await register(form.name, form.email, form.password);	
	if(success===false){
		Swal.fire('Registration','Email already exist','error');
    }	
  };

  const onHadleChange = ( {target} ) => {
	setForm(
		{
			...form,
			[target.name] : target.value
		}
	)
  }

  // Empty fields
  const emptyFields = () => {
    if (
      form.email.length > 0 &&
      form.password.length > 0 &&
      form.name.length > 0
    ) {
      return false;
    }
    return true;
  };

  return (
    <form onSubmit={sendData} className="login100-form validate-form flex-sb flex-w">
      <span className="login100-form-title mb-3">Chat - Registro</span>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="text"
		  name="name"
		  value={form.name}
		  placeholder="Nombre"
		  onChange={onHadleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="email"
		  name="email"
		  value={form.email}
		  placeholder="Email"
		  onChange={onHadleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="wrap-input100 validate-input mb-3">
        <input
          className="input100"
          type="password"
		  name="password"
		  value={form.password}
		  placeholder="Password"
		  onChange={onHadleChange}
        />
        <span className="focus-input100"></span>
      </div>

      <div className="row mb-3">
        <div className="col text-right">
          <Link to={"/auth/login"} className="txt1">
            ¿Ya tienes cuenta?
          </Link>
        </div>
      </div>

      <div className="container-login100-form-btn m-t-17">
        <button
          type="submit"
          disabled={emptyFields()}
          className="login100-form-btn"
        >
          Crear cuenta
        </button>
      </div>
    </form>
  );
};
