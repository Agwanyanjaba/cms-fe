import "./landing.scss";
import Footer from "../../components/footer/Footer.tsx";
import { useNavigate } from "react-router-dom";

const HomeScreen = () => {
    const navigate = useNavigate();
    return (
        <>
            <div className="main">
                {/* Hero Section */}
                <header className="hero">
                    <div className="logo">
                        <img src="kaive.ico" alt="Kaive Logo" />
                        <span>Kaive International Training College</span>
                    </div>
                    <h1>The Simple Act of Caring is Heroic</h1>
                </header>

                {/* Buttons Section */}
                <div className="buttons">
                    <button
                        className="large-button"
                        onClick={() => navigate("/about-us")}
                    >
                        Learn More About Us
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

                {/* Carousel Section */}
                <div className="carousel">
                    <div className="carousel-track">
                        <img src="../../../public/caring3.jpg" alt="Slide 1" />
                        <img src="../../../public/caring4.jpg" alt="Slide 2" />
                        <img src="../../../public/caring5.jpg" alt="Slide 3" />
                        <img src="../../../public/caring2.jpg" alt="Slide 4" />
                    </div>
                </div>

                {/* Adverts Section */}
                {/*<section className="adverts">*/}
                {/*    <div className="advert">*/}
                {/*        <img src="https://via.placeholder.com/200x200" alt="Advert 1" />*/}
                {/*        <p>Join our top-rated courses today!</p>*/}
                {/*    </div>*/}
                {/*    <div className="advert">*/}
                {/*        <img src="https://via.placeholder.com/200x200" alt="Advert 2" />*/}
                {/*        <p>Unlock premium content with a subscription.</p>*/}
                {/*    </div>*/}
                {/*    <div className="advert">*/}
                {/*        <img src="https://via.placeholder.com/200x200" alt="Advert 3" />*/}
                {/*        <p>Sign up and get exclusive offers.</p>*/}
                {/*    </div>*/}
                {/*</section>*/}
            </div>
            <Footer />
        </>
    );
};

export default HomeScreen;