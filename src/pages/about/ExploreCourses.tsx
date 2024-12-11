import "./exploreCourses.scss";
import {useNavigate} from "react-router-dom";

const ExploreCourses = () => {
    const navigate = useNavigate();
    return (
        <div className="explore-courses">
            <header className="hero">
                <div className="logo">
                    <img src="kaive.ico" alt="Kaive Logo" />
                    <span>Kaive International Training College</span>
                </div>
                <h1>Explore Our Courses</h1>
                <p>Find the right course to achieve your goals.</p>
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
                    onClick={() => navigate("/about-us")}
                >
                    About Us
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
                    We offer a diverse range of courses designed to prepare you for a successful future.
                </p>
                <ul>
                    <li>BSc Computer Science</li>
                    <li>Diploma in Business Administration</li>
                    <li>Certificate in Graphic Design</li>
                    <li>Certified Data Analytics Program</li>
                </ul>
                <p>Enroll today and unlock your potential!</p>
            </div>
        </div>
    );
};

export default ExploreCourses;
