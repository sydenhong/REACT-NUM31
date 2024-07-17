import { useContext } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { Context } from "../auth/Context";
import axios from "axios";

const Layout = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(Context);
  
  const onLogout = async() => {
    const header = {
      "Authorization": "Bearer "+user.token
    }
    const logout = await axios.post('https://api-todolist.e-khmer.com/api/logout', '', {headers: header})
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      console.log("Error:", err);
    });
    if(logout && logout.message) {
      dispatch({ type: "LOGOUT", payload: null });
      navigate('/login')
    }
  }

  return (
    <>
      <nav class="navbar navbar-expand-sm navbar-dark bg-dark">
        <div class="container-fluid">
          {/* <a class="navbar-brand" href="javascript:void(0)">Logo</a> */}
          <Link class="navbar-brand"  to="/">LOGO</Link>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mynavbar">
            <ul class="navbar-nav me-auto">
              <li class="nav-item">
                <Link class="nav-link" to="blogs">Blogs</Link>
              </li>
              <li class="nav-item">
                <Link class="nav-link" to="contact">Contact</Link>
              </li>
              {user && (
                <li class="nav-item">
                  <Link class="nav-link" to="mytask">My Task</Link>
                </li>
              )}
            </ul>
            <form class="d-flex">
              {/* <input class="form-control me-2" type="text" placeholder="Search" /> */}
              { user ? 
              <> 
                <Link className="btn btn-info" to="/profile"> {user.user.name} </Link>

                <button type="button" className="btn btn-danger" onClick={() => onLogout()}>Logout</button>
              </> 
              : 
              <>
                <Link class="btn btn-primary" to="login">Login</Link>
                <Link class="btn btn-primary" to="register">Register</Link>
              </>
              }

            </form>
          </div>
        </div>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;