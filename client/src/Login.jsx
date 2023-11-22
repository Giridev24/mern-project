import React from "react";
import { useState } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loginFailed, setLoginFailed] = useState(false); // State to track login failure
  const navigate = useNavigate();

  const handlesubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3001/login", { email, password })
      .then((result) => {
        console.log(result);
        if (result.data === "success") {
          navigate("/dashboard");
        } else {
          setLoginFailed(true); // Set the loginFailed state to true
        }
      })
      .catch((err) => {
        console.log(err);
        setLoginFailed(true); // Set the loginFailed state to true on error
      });
  };

  return (
    <>
      <div className="f">
        <div className="b">
          <form onSubmit={handlesubmit}>
            <h3 className="mb-4">Login form</h3>
            <label>Username</label> <br />
            <input
              type="text"
              className="mb-2"
              placeholder="enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <label>Password</label> <br />
            <input
              type="password"
              placeholder="enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />{" "}
            <br />
            <button className="btn btn-primary mt-3 mb-3">Login</button>
            {loginFailed && <p className="text-danger shake">Wrong password</p>}
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
