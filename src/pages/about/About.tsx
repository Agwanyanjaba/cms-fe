import "./about.scss";
import {useNavigate} from "react-router-dom";

const AboutUs = () => {
    const navigate = useNavigate();
    return (
        <div className="about-us">
            <header className="hero">
                <div className="logo">
                    <img src="kaive.ico" alt="Kaive Logo"/>
                    <span>Kaive International Training College</span>
                </div>
                <h1>About Us</h1>
                <p>Empowering learners, shaping futures.</p>
            </header>

            {/* Buttons Section */}
            <div className="buttons">
                <button
                    className="large-button"
                    onClick={() => navigate("/landing")}
                >
                    Home
                </button>
                <button
                    className="large-button"
                    onClick={() => navigate("/explore-courses")}
                >
                    Explore Courses
                </button>
                <button
                    className="large-button"
                    onClick={() => navigate("/login")}
                >
                    Login
                </button>
                <button
                    className="large-button"
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </div>
            <div className="content">
                <p>
                    Welcome to Kaive International Training College, a place where your educational dreams come to life.
                </p>
                <p>
                    Our institution is dedicated to delivering exceptional education through innovative teaching
                    methods,
                    experienced faculty, and a supportive learning environment.
                </p>
                <p>
                    Join us and take the first step toward building a brighter future for yourself and your community.
                </p>
            </div>
        </div>
    );
};

export default AboutUs;
