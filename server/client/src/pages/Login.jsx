import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { state, dispatch } = useContext(UserContext);
  console.log(state);

  const loginData = (e) => {
    e.preventDefault();
    setLoading(true);
    fetch("/auth/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setLoading(false);
        dispatch({ type: "USER", payload: result.user });
        localStorage.setItem("user", JSON.stringify(result.user));
        localStorage.setItem("auth_token", result.token);
        if (result.error) {
          return setError(result.error);
        }
        history.push("/");
      });
  };
  return (
    <div>
      <div className="row ">
        <div className="col-md-6 mx-auto card p-5 my-5">
          <form onSubmit={loginData}>
            <h2 className="text-center">Login Here</h2>
            {error ? (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            ) : null}

            <div className="form-group">
              <label>Email address</label>
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
              <label>Password</label>
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                type="password"
                className="form-control"
              />
            </div>

            <br />

            <button type="submit" className="btn btn-primary">
              Login
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

            <Link to="/register">Don't have an account? Register here</Link>
          </form>
        </div>
      </div>
    </div>
  );
}
