import "./navbar.scss";
import { useAuth } from '../utils/AuthProvider';


const Navbar = () => {
    const auth = useAuth();
  return (
    <div className="navbar">
      <div className="logo">
        <img src="kaive.ico" alt="" />
        <span>Kaive International Training College</span>
      </div>
        <div className="icons">
            <img src="/search.svg" alt="" className="icon"/>
            {/*<img src="/app.svg" alt="" className="icon"/>*/}
            {/*<img src="/expand.svg" alt="" className="icon"/>*/}
            <div className="user">
                <span>{auth.user?.role}</span>
                <span>{auth.user?.username}</span>
            </div>
            <button className="large-button" onClick={() => navigator}>
                Logout
            </button>
        </div>
    </div>
  );
};

export default Navbar;
