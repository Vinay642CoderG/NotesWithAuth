
import { useRef, useState } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
const submitBtnRef = useRef();
  const handlerUserSignup = (e)=>{
    e.preventDefault();
    const apibase = "http://localhost:3000/api/v1";
    const formdata = new FormData(e.target);
    submitBtnRef.current.setAttribute('disabled', 'true');
    fetch(`${apibase}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Object.fromEntries(formdata)),
    }).then((v)=>{
      return v.json();
    }).then((v)=>{
      submitBtnRef.current.removeAttribute('disabled');
      if(v.error==true){
        console.log("something went wrong.")
        alert("user is not created.")
      }else if(v.error==false){
        alert("user is created.")
      }
    }).catch(()=>submitBtnRef.current.removeAttribute('disabled'))

  }
  return (
    <form
      id="signupForm"
      className="border border-dark shadow p-3 m-auto mt-5"
      style={{ maxWidth: "25rem" }}
      onSubmit={handlerUserSignup}
    >
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">
          Name
        </label>
        <input
          type="text"
          className="form-control"
          id="exampleInputName"
          name="name"
          required
        />
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
        <label htmlFor="exampleInputPhoneNumber" className="form-label">
          Phone Number
        </label>
        <input
          type="tel"
          maxLength={10}
          className="form-control"
          id="exampleInputPhoneNumber"
          name="phoneNumber"
          required
        />
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
          autoComplete="off"
          required
        />
      </div>
      <button type="submit" ref={submitBtnRef} className="btn btn-success">
        Signup
      </button>
      <p className="mt-3">
      <Link to={"/login"} className="nav-link text-primary text-uppercase shadow p-1 border border-secondary">
        Existing User ? Login
      </Link>
      </p>
    </form>
  );
};

export default Signup;
