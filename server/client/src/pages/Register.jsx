import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history=useHistory()

  const registerData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/auth/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: username,
        email,
        password,
        confirmPassword,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        if (result.error) {
          return setError(result.error);
        }
        history.push('/login')
      });
  };

  return (
    <div>
      <div className="row ">
        <div className="col-md-6 mx-auto card p-5 my-5">
          <form onSubmit={registerData}>
            <h2 className="text-center">Register Here</h2>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}

            <div className="form-group">
              <label >Username</label>
              <input
                type="text"
                className="form-control"
                      aria-describedby="emailHelp"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <br />
            <div className="form-group">
              <label >Email address</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="form-control"
                      aria-describedby="emailHelp"
              />
            </div>
            <br />
            <div className="form-group">
              <label >Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
            
              />
            </div>
            <br />
            <div className="form-group">
              <label >Confirm Password</label>
              <input
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                className="form-control"
            
              />
            </div>
            <br />

            <button type="submit" className="btn btn-primary">
              Register
            </button>
            {loading ? (
              <div
                className="spinner-border text-warning text-center"
                role="status"
              >
                <span className="sr-only">Loading...</span>
              </div>
            ) : null}

            <br />
            <br />

            <Link to="/login">Already have an account? Login here</Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
