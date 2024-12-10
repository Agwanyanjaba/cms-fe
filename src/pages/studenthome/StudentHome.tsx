import Navbar from "../../components/navbar/Navbar.tsx";
import Footer from "../../components/footer/Footer.tsx";
import StudentMenu from "../../components/menu/StudentMenu.tsx";

const StudentHome = () => {
    return (
        <div className="main">
            <Navbar/>
            <div className="container">
                <div className="menuContainer">
                    <StudentMenu/>
                </div>
                <div className="contentContainer">
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default StudentHome;