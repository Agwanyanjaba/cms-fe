import { useState } from "react";
import "./Courses.scss";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import { GridColDef } from "@mui/x-data-grid";
import { courses } from "../../data";

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

    // TEST THE API
    // const { isLoading, data } = useQuery({
    //   queryKey: ["allcourses"],
    //   queryFn: () =>
    //     fetch("http://localhost:8800/api/courses").then(
    //       (res) => res.json()
    //     ),
    // });

    return (
        <div className="courses">
            <div className="info">
                <h1>Courses</h1>
                <button onClick={() => setOpen(true)}>Add New Course</button>
            </div>
            <DataTable slug="course" columns={columns} rows={courses} />
            {/* TEST THE API */}
            {/* {isLoading ? (
        "Loading..."
      ) : (
        <DataTable slug="course" columns={columns} rows={data} />
      )} */}
            {open && <Add slug="course" columns={columns} setOpen={setOpen} />}
        </div>
    );
};

export default Courses;
