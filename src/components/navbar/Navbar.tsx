import "./navbar.scss";
import { useAuth } from "../../utils/AuthProvider";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    // Debug log for user state
    useEffect(() => {
        console.log("Navbar mounted. Current user state:", auth.user);
    }, [auth.user]);

    const handleLogout = () => {
        console.log("Logging out...");
        auth.logout(); // Clear the user state and localStorage
        console.log("User state after logout:", auth.user); // This might show null immediately
        navigate("/login"); // Navigate to the login page
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src="kaive.ico" alt="College Logo" />
                <span>Kaive International Training College</span>
            </div>
            <div className="icons">
                {auth.user ? (
                    <>
                        <div className="user">
                            <span>Role: {auth.user.role}</span>
                            <span>Username: {auth.user.username}</span>
                        </div>
                        <button className="large-button" onClick={handleLogout}>
                            Logout
                        </button>
                    </>
                ) : (
                    <div className="guest">
                        <span>Welcome, Guest</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Navbar;
