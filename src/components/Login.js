import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  let history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }),
    });
    const json = await response.json();
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      localStorage.setItem("token", json.authtoken);
      props.showAlert("Logged in successfully", "success");
      history.push("/");
    } else {
      props.showAlert("Invalid Details", "danger");
    }
  };
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <div className="mt-3">
      <h2>Login to continue to iNotebook</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-3">
          <label htmlFor="email">Email address</label>
          <input
            type="email"
            className="form-control my-3"
            id="email"
            name="email"
            value={credentials.email}
            onChange={onChange}
            aria-describedby="emailHelp"
            placeholder="Enter email"
          />
          <small id="emailHelp" className="form-text text-muted">
            We'll never share your email with anyone else.
          </small>
        </div>
        <div className="form-group my-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            className="form-control my-3"
            id="password"
            name="password"
            value={credentials.password}
            onChange={onChange}
            placeholder="Password"
          />
        </div>

        <button type="submit" className="btn btn-primary my-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
