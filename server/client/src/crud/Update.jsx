import { compareSync } from "bcryptjs";
import React, { useState } from "react";
import { useEffect } from "react";
import { Link, useHistory, useParams } from "react-router-dom";


function Update() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const history=useHistory()
    const {postId}=useParams()
    console.log(postId)

    const registerData = (e) => {
        e.preventDefault();
    }

    useEffect(()=>{
        fetch(`/crud/update-data/${postId}`,{
            method: 'get'
        })
        .then(res=>res.json())
        .then(result=>{
            //setData(result.result)
            console.log(result)
            setUsername(result.result.name)
            setEmail(result.result.email)
            setPassword(result.result.password)
        })
        .catch(e=>console.log(e))
    },[])

    const updateList=()=>{
        console.log(username)
        fetch(`/crud/update-data/${postId}`,{
            method: 'put',
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify({
                name: username,
                email,
                password
            })
            
        }
        )
        .then(res=>res.json())
        .then(result=>{
            //setData(result.result)
            console.log(result)
            history.push('/get')
            
        })
        .catch(e=>console.log(e))
    }

    return (
        <div>
             <div>
      <div className="row ">
        <div className="col-md-6 mx-auto card p-5 my-5">
          <form onSubmit={registerData}>
            <h2 className="text-center">Update Here</h2>
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
                value={username}
              />
            </div>
            <br />
            <div className="form-group">
              <label >Email address</label>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
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
                type="text"
                className="form-control"
                value={password}
              />
            </div>
            
            <br />

            <button onClick={()=>updateList()} type="submit" className="btn btn-primary">
              Update
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
        </div>
    )
}

export default Update
