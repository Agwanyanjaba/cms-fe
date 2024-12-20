import { useState } from "react";
import "./courses.scss";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { courses } from "../../data";
import DataTableV1 from "../../components/dataTable/DataTableV1.tsx";
import axiosInstance from "../../utils/axiosInstance.ts";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
        field: "title",
        headerName: "Title",
        type: "string",
        width: 250,
    },
    {
        field: "duration",
        headerName: "Duration (Years)",
        type: "number",
        width: 150,
    },
    {
        field: "department",
        headerName: "Department",
        type: "string",
        width: 200,
    },
    {
        field: "createdAt",
        headerName: "Created At",
        width: 200,
        type: "string",
    },
    {
        field: "enrolled",
        headerName: "Enrolled Students",
        type: "number",
        width: 150,
    },
];

const Courses = () => {
    const [open, setOpen] = useState(false);

    const handleAddCourse = async (formData: Record<string, string | number | undefined>) => {
        const authToken = localStorage.getItem("authToken") ?? undefined;
        try {
            const response = await axiosInstance.post('/api/v1/course', formData, {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            });
            console.log("Course added:", response.data);
            // Optionally close the modal after submission
            setOpen(false);
        } catch (error) {
            console.error("Error adding Course:", error);
        }
    };

    return (
        <div className="courses">
            <div className="info">
                <h1>Courses</h1>
                <button onClick={() => setOpen(true)}>Add New Course</button>
            </div>
            <DataTableV1 columns={columns} rows={courses} />
            {/* TEST THE API */}
            {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="course" columns={columns} rows={data} />
      )} */}
            {open && <Add columns={columns} setOpen={setOpen}  onSubmit={handleAddCourse} slug="Courses"/>}
        </div>
    );
};

export default Courses;
