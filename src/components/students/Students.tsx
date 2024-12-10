import { GridColDef } from "@mui/x-data-grid";
import DataTable from "../../components/dataTable/DataTable";
import Add from "../../components/add/Add";
import "./student.scss";
import { useState } from "react";

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    gender: string;
    dateOfBirth: string;
    nationality: string;
    courseCode: string;
    phoneNumber: string;
    parentName: string;
    highSchoolName: string;
    highSchoolGraduationYear: string;
    gradesOrMarks: string;
    idProofUrl: string;
    certificateUrl: string;
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
    { field: "parentName", headerName: "Parent Name", type: "string", width: 180 },
    { field: "highSchoolName", headerName: "High School Name", type: "string", width: 180 },
    { field: "highSchoolGraduationYear", headerName: "Graduation Year", type: "string", width: 180 },
    { field: "gradesOrMarks", headerName: "Grades/Marks", type: "string", width: 150 },
    { field: "idProofUrl", headerName: "ID Proof URL", type: "string", width: 200 },
    { field: "certificateUrl", headerName: "Certificate URL", type: "string", width: 200 },
    { field: "createdAt", headerName: "Created At", type: "string", width: 180 },
];

const initialRows: Student[] = [];

const Students = () => {
    const [open, setOpen] = useState(false);
    const [rows, setRows] = useState<Student[]>(initialRows);

    const handleAddStudent = async (formData: Record<string, string | undefined>) => {
        const newStudent: Omit<Student, "id" | "createdAt"> = {
            firstName: formData.firstName ?? "",
            lastName: formData.lastName ?? "",
            gender: formData.gender ?? "",
            dateOfBirth: formData.dateOfBirth ?? "",
            nationality: formData.nationality ?? "",
            courseCode: formData.courseCode ?? "",
            phoneNumber: formData.phoneNumber ?? "",
            parentName: formData.parentName ?? "",
            highSchoolName: formData.highSchoolName ?? "",
            highSchoolGraduationYear: formData.highSchoolGraduationYear ?? "",
            gradesOrMarks: formData.gradesOrMarks ?? "",
            idProofUrl: formData.idProofUrl ?? "",
            certificateUrl: formData.certificateUrl ?? "",
        };

        setRows((prevRows) => [
            ...prevRows,
            { id: prevRows.length + 1, ...newStudent, createdAt: new Date().toISOString() },
        ]);
        setOpen(false);
    };

    return (
        <div className="students">
            <div className="info">
                <h1>Students</h1>
                <button onClick={() => setOpen(true)}>Add New Student</button>
            </div>
            <DataTable slug="students" columns={columns} rows={rows} />
            {open && (
                <Add
                    slug="Student"
                    columns={columns}
                    setOpen={setOpen}
                    onSubmit={handleAddStudent}
                />
            )}
        </div>
    );
};

export default Students;
