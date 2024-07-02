import { FaHandPointRight } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../UserContext";
import Cookies from "js-cookie"

const Header = () => {
  const { isUserLogin, setIsUserLogin, setUserData } = useAppContext();
  const navigate = useNavigate();

  function handleUserLogout (){
    Cookies.remove("user-auth");
    setIsUserLogin(false)
    setUserData({})
    alert("Logout Successfully.")
    navigate("/login")
  }
  return (
    <header>
      <nav
        className="navbar navbar-expand-lg"
        style={{ background: "#3c3c92" }}
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to={"/"}>
            Logo
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link to={"/"} className="nav-link active" aria-current="page">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/notes"} className="nav-link">
                  Notes
                </Link>
              </li>
            </ul>
            {isUserLogin ? (
              <a id="logoutBtn" onClick={handleUserLogout} className="btn btn-danger d-flex align-items-center gap-2">
                <FaHandPointRight />
                Logout
              </a>
            ) : (
              <Link
                to={"/login"}
                className="btn btn-danger d-flex align-items-center gap-2"
                
              >
                <FaHandPointRight />
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
