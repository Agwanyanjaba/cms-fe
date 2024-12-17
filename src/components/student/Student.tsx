import { GridColDef } from "@mui/x-data-grid";
import Add from "./AddStudent.tsx";
import "./../student/student.scss";
import { useState, useEffect } from "react";
import Navbar from "../navbar/Navbar.tsx";
import StudentMenu from "../menu/StudentMenu.tsx";
import Footer from "../footer/Footer.tsx";
import DataTableV1 from "../dataTable/DataTableV1.tsx";
import axiosInstance from "../../utils/axiosInstance.ts";

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
    const [hasStudent, setHasStudent] = useState(false);

    // Fetch student details based on the username from the JWT token
    useEffect(() => {
        const fetchStudentData = async () => {
            const authToken = localStorage.getItem("authToken");
            if (!authToken) {
                alert("Authorization token is missing");
                return;
            }

            try {
                // Decode the JWT token to get the username (assuming it's in the payload)
                const decodedToken: any = JSON.parse(atob(authToken.split('.')[1])); // decode token
                const username = decodedToken.username;

                // Fetch the student record based on the username
                const response = await axiosInstance.get(
                    `/api/v1/student/${username}`,
                    {
                        headers: {
                            Authorization: `Bearer ${authToken}`,
                        },
                    }
                );

                // If student exists, update the rows and hide the apply button
                if (response.data) {
                    setRows([response.data]); // Set the student data in the rows
                    setHasStudent(true); // Indicate that the student exists
                }
            } catch (error) {
                console.error("Error fetching student data:", error);
                alert("Error fetching student data.");
            }
        };

        fetchStudentData();
    }, []);

    const handleAddStudent = async (formData: FormData) => {
        const authToken = localStorage.getItem("authToken");
        if (!authToken) {
            alert("Authorization token is missing");
            return;
        }

        try {
            const response = await axiosInstance.post(
                "/api/v1/student",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            // After adding the student, fetch the student data
            const studentId = response.data.id;
            const updatedResponse = await axiosInstance.get(
                `/api/v1/student/${studentId}`,
                {
                    headers: {
                        Authorization: `Bearer ${authToken}`,
                    },
                }
            );

            // Update the rows with the newly added student data
            setRows([updatedResponse.data]);
            setHasStudent(true); // Mark that the student record exists now

            // Close the modal after successful submission
            setOpen(false);
        } catch (error) {
            console.error("Error adding student:", error);
            alert("Failed to add student. Please try again.");
        }
    };

    return (
        <>
            <div className="main">
                <Navbar />
                <div className="containerStudent">
                    <div className="menuContainer">
                        <StudentMenu />
                    </div>
                    <div className="students">
                        <div className="info">
                            <h1>Student Registration</h1>
                            {/* Show apply button only if no student data */}
                            {!hasStudent && (
                                <button onClick={() => setOpen(true)} className="large-button">
                                    Click Here to Apply
                                </button>
                            )}
                        </div>
                        <DataTableV1 columns={columns} rows={rows} />
                        {open && (
                            <Add
                                slug="Student"
                                columns={columns}
                                setOpen={setOpen}
                                onSubmit={handleAddStudent}
                            />
                        )}
                    </div>
                    <div className="contentContainer"></div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Students;
