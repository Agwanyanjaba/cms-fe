import "./navbar.scss";
import { useAuth } from '../utils/AuthProvider';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = () =>{
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");

        navigate("/login");
    }

  return (
    <div className="navbar">
      <div className="logo">
        <img src="kaive.ico" alt="" />
        <span>Kaive International Training College</span>
      </div>
        <div className="icons">

            <div className="user">
                <span>{auth.user?.role}</span>
                <span>{auth.user?.username}</span>
            </div>
            <button className="large-button" onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
  );
};

export default Navbar;
