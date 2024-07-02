
import { Link } from "react-router-dom";
import { useAppContext } from "../UserContext";
import Cookies from "js-cookie";
import { useState } from "react";

const Login = () => {
  const {setIsUserLogin, 
    userData, setUserData} = useAppContext();
const [isFormError, setIsFormError] = useState(false);
  const handlerUserLogin = async (e)=>{
    e.preventDefault();
    const apibase = "http://localhost:3000/api/v1";
    const formdata = new FormData(e.target);
    const sumbitBtn = document.querySelector("#loginForm>button[type='submit']");
    sumbitBtn.setAttribute('disabled', 'true');
    fetch(`${apibase}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formdata)),
    }).then((v)=>{
      return v.json();
    }).then((v)=>{
      sumbitBtn.removeAttribute('disabled');
      if(v.error){
        setIsFormError(true)
        console.log("something went wrong.")
      }else{
        setIsFormError(false)
      setUserData(v)
      setIsUserLogin(true)
      Cookies.set("user-auth", v.token, {expires: 28})
      alert("User is loginned.")
    }
    })

  }

  return (
    <>
    <form
      id="loginForm"
      className="border border-dark shadow p-3 m-auto mt-5"
      style={{ maxWidth: "25rem" }}
      onSubmit={handlerUserLogin}
    >
      <div className="mb-3">
        {
          isFormError?
          <h3 className="text-danger">Wrong User Credentials.</h3>
          :""
        }
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">
          Email address
        </label>
        <input
          type="email"
          className="form-control"
          id="exampleInputEmail1"
          aria-describedby="emailHelp"
          name="email"
          required
        />
        <div id="emailHelp" className="form-text">
          We'll never share your email with anyone else.
        </div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">
          Password
        </label>
        <input
          type="password"
          className="form-control"
          id="exampleInputPassword1"
          name="password"
          autoComplete="true"
          required
        />
      </div>
      <button type="submit" className="btn btn-success">
        Login
      </button>
      <p className="mt-3">
      <Link to={"/register"} className="nav-link text-primary text-uppercase shadow p-1 border border-secondary">
        New User ? Signup
      </Link>
      </p>
    </form>
    </>
  );
};

export default Login;
