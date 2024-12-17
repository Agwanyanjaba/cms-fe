import {createBrowserRouter, Outlet, RouterProvider} from "react-router-dom";
import HomeScreen from "./pages/landing/Landing.tsx"; // Landing page
import Staffs from "./pages/users/Staffs.tsx"; // Example other page
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import { AuthProvider } from "./utils/AuthProvider.tsx";
import Home from "./pages/home/Home";
import Courses from "./pages/courses/Courses.tsx";
import StudentsList from "./pages/students/StudentsList.tsx";
import About from "./pages/about/About.tsx";
import ExploreCourses from "./pages/about/ExploreCourses.tsx";
import Register from "./pages/register/Register.tsx";
import Staff from "./pages/user/Staff.tsx";
import StudentHome from "./pages/studenthome/StudentHome.tsx";
import StudentForm from "./components/student/Student.tsx";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// Create the QueryClient instance outside of the Layout component
const queryClient = new QueryClient();

const App = () => {
    const Layout = () => {
        return (
            <div className="main">
                <Navbar />
                <div className="container">
                    <div className="menuContainer">
                        <Menu />
                    </div>
                    <div className="contentContainer">
                        <Outlet />
                    </div>
                </div>
                <Footer />
            </div>
        );
    };

    const router = createBrowserRouter([

        {
            path: "/",  // Landing path
            element: <HomeScreen />,
            children: [
                {path: "/landing", element: <HomeScreen/> },
            ],
        },
        { path: "/about-us", element: <About /> },  // About page
        { path: "/explore-courses", element: <ExploreCourses /> },  // Explore Courses page
        { path: "/login", element: <Login /> },  // Login page
        { path: "/register", element: <Register /> },
        {
            path: "/home",  // Main app path after login
            element: <Layout/>,
            children: [
                { path: "/home", element: <Home /> },
                { path: "/home/staff", element: <Staffs /> },
                { path: "/home/staff/:id", element: <Staff /> },
                { path: "/home/courses", element: <Courses /> },
            ],
        },
        { path: "/studenthome", element: <StudentHome /> },
        { path: "/student", element: <StudentForm /> },
        {path:"/students", element: <StudentsList/>}

    ]);

    return (
        // Wrap your entire application with QueryClientProvider
        <AuthProvider>
            <QueryClientProvider client={queryClient}>
                <RouterProvider router={router} />
            </QueryClientProvider>
        </AuthProvider>
    );
};

export default App;
