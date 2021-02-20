import React, { useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import { UserContext } from "../App";

const Navbar = () => {
  const history=useHistory()
  const {state,dispatch}=useContext(UserContext)
  const renderList=()=>{
    if(state){
      return[
        <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>,
             <li className="nav-item">
             <Link className="nav-link" to="/profile">
               Profile
             </Link>
           </li>,
           <li className="nav-item">
             <Link className="nav-link" to="/create-post">
               Create-Post
             </Link>
           </li>
      ]
    }

    else{
      return[
        <li className="nav-item">
        <Link className="nav-link" to="/input">
          Add Data
        </Link>
      </li>,
      <li className="nav-item">
        <Link className="nav-link" to="/get">
          View Data
        </Link>
      </li>

      ]
    }
  }
  return (
    <div >
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
          <div className="container-fluid ">
        
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav m-auto">
            {renderList()}
            

          </ul>
          {state ? (
              <form class="d-flex">
                <Link
                  onClick={() => {
                    dispatch({ type: "CLEAR_USER" });
                    localStorage.clear("jwt");
                    localStorage.clear("user");
                    return history.push('/login')
                  }}
                  className="nav-link btn btn-danger text-light "
                  to="/login"
                >
                  Logout
                </Link>
              </form>
            ) : null}
        </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
