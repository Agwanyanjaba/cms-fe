import Home from "./pages/home/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import Staffs from "./pages/users/Staffs.tsx";
import Navbar from "./components/navbar/Navbar";
import Footer from "./components/footer/Footer";
import Menu from "./components/menu/Menu";
import Login from "./pages/login/Login";
import Staff from "./pages/user/Staff.tsx";
import Product from "./pages/product/Product";
import Courses from "./pages/courses/Courses.tsx";
import Register from "./pages/register/Register.tsx";
import "./styles/global.scss";
import StudentHome from "./pages/studenthome/StudentHome.tsx";
import StudentForm from "./components/student/Student.tsx";
import { AuthProvider } from "./components/utils/AuthProvider.tsx";
import Landing from "./pages/landing/Landing.tsx";
import About from "./pages/about/About.tsx";
import ExploreCourses from "./pages/about/ExploreCourses.tsx";

// Create the QueryClient instance outside of the Layout component
const queryClient = new QueryClient();

function App() {
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
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/staff", element: <Staffs /> },
        { path: "/courses", element: <Courses /> },
        { path: "/staff/:id", element: <Staff /> },
        { path: "/products/:id", element: <Product /> },
        { path: "/departments", element: <Product /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/register", element: <Register /> },
    { path: "/studenthome", element: <StudentHome /> },
    { path: "/student", element: <StudentForm /> },
    {path:"/landing", element: <Landing/>},
    {path:"/about-us", element: <About/>},
    {path:"/explore-courses", element: <ExploreCourses/>}
  ]);

  return (
      // Wrap your entire application with QueryClientProvider
      <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
  </AuthProvider>
  );
}

export default App;
