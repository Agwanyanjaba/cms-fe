import { useNavigate } from "react-router-dom";
import "./unauthorized.scss"; // Optional styling

const Unauthorized = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleGoHome = () => {
        navigate("/app"); // Navigate to the home or landing page
    };

    return (
        <div className="unauthorized-container">
            <h1>403 - Unauthorized</h1>
            <p>Oops! You don’t have permission to access this page.</p>
            <div className="actions">
                <button onClick={handleGoBack} className="btn btn-back">
                    Go Back
                </button>
                <button onClick={handleGoHome} className="btn btn-home">
                    Go to Home
                </button>
            </div>
        </div>
    );
};

export default Unauthorized;
