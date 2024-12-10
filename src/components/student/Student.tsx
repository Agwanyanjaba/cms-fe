import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import Add from "./AddStudent.tsx";
import "./../student/student.scss";
import { useState } from "react";
import axios from "axios";
import Navbar from "../navbar/Navbar.tsx";
import StudentMenu from "../menu/StudentMenu.tsx";
import Footer from "../footer/Footer.tsx";


interface Student {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    nationality: string;
    courseCode: string;
    phoneNumber: string;
    gradesOrMarks: string;
    createdAt: string;
}

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "firstName", headerName: "First Name", type: "string", width: 150 },
    { field: "lastName", headerName: "Last Name", type: "string", width: 150 },
    { field: "gender", headerName: "Gender", type: "string", width: 120 },
    { field: "dateOfBirth", headerName: "Date of Birth", type: "string", width: 150 },
    { field: "nationality", headerName: "Nationality", type: "string", width: 150 },
    { field: "courseCode", headerName: "Course Code", type: "string", width: 150 },
    { field: "phoneNumber", headerName: "Phone", type: "string", width: 150 },
];

const initialRows: Student[] = [];

const Students = () => {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<Student[]>(initialRows);


    const handleAddStudent = async (formData: FormData) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Authorization token is missing");
            return;
        }

        try {
            const response = await axios.post(
                "http://localhost:9999/api/v1/student",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            setRows((prevRows) => [
                ...prevRows,
                {
                    id: prevRows.length + 1,
                    ...response.data,
                    createdAt: new Date().toISOString(),
                },
            ]);

            setOpen(false);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Failed to add student. Please try again.");
        }
    };


    return (
        <>
            <div className="main">
                <Navbar/>
                <div className="containerStudent">
                    <div className="menuContainer">
                        <StudentMenu/>
                    </div>
                    <div className="students">
                        <div className="info">
                            <h1>Student Registration</h1>
                            <button onClick={() => setOpen(true)} className="large-button">Click Here to Apply</button>
                        </div>
                        <DataTable slug="students" columns={columns} rows={rows}/>
                        {open && (
                            <Add
                                slug="Student"
                                columns={columns}
                                setOpen={setOpen}
                                onSubmit={handleAddStudent}/>
                        )}
                    </div>
                    <div className="contentContainer">
                    </div>
                </div>
                <Footer/>
            </div>

        </>
    );
};

export default Students;