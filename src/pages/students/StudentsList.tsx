import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import DataTableV1 from "../../components/dataTable/DataTableV1";
import Navbar from "../../components/navbar/Navbar.tsx";
import Footer from "../../components/footer/Footer.tsx";
import Menu from "../../components/menu/Menu.tsx";
import axiosInstance from "../../utils/axiosInstance.ts";

const StudentsList = () => {
    const authToken = localStorage.getItem("authToken") ?? undefined;

    const { data, error, isLoading } = useQuery(
        ["allStudents"],

        async () => {
            try {
                const response = await axiosInstance.get("/api/v1/student", {
                    headers: {
                        Authorization: `Bearer ${authToken}`, // Add Authorization header
                    },
                });
                return response.data.map((student: any) => ({
                    id: student.id,
                    studentId: student.studentId,
                    name: `${student.firstName} ${student.lastName}`,
                    email: student.appUser?.username || "N/A",
                    gender: student.gender,
                    dateOfBirth: student.dateOfBirth,
                    nationality: student.nationality,
                    courseCode: student.courseCode,
                    phoneNumber: student.phoneNumber,
                    applicationStatus: student.applicationStatus,
                }));
            }
            catch (error) {
                //dialog here
                console.error("Error fetching student data:", error); // Handle errors
            }
        }
    );

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching data</div>;

    const downloadFile = async (studentId: string, fileType: "id" | "certificate") => {
        try {
            const endpoint = `http://localhost:9999/api/v1/student/${studentId}/${fileType}`;

            // Make a GET request with Axios
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${authToken}`, // Authorization header
                },
                responseType: "blob", // Tell axios to handle the response as a Blob
            });

            // Extract the content-disposition header
            // @ts-ignore
            const contentDisposition = response.headers.get('Content-Disposition');
            let filename;
            console.log("==contentDisposition", contentDisposition);
            console.log("Response Headers:", response.headers);
            if (contentDisposition) {
                 filename = contentDisposition
                    .split(';')
                    .find((n: string | string[]) => n.includes('filename='))
                    ?.replace('filename=', '')
                    .trim();

                if (filename) {
                    console.log("Filename:", filename);
                } else {
                    console.error("Filename not found in content-disposition header");
                }
            } else {
                console.error("Content-Disposition header not found");
            }


            // Create an object URL for the Blob
            const url = URL.createObjectURL(response.data);

            // Create a link element and trigger the download
            const link = document.createElement("a");
            link.href = url;
            link.download = filename; // Use the filename extracted from the header
            console.log("==link ", filename);
            link.click();
        } catch (error) {
            console.error("Error downloading file:", error);
        }
    };

    const columns = [
        { field: "studentId", headerName: "Student ID", width: 150 },
        { field: "name", headerName: "Name", width: 250 },
        { field: "email", headerName: "Email", width: 250 },
        { field: "gender", headerName: "Gender", width: 150 },
        { field: "dateOfBirth", headerName: "Date of Birth", width: 150 },
        { field: "nationality", headerName: "Nationality", width: 200 },
        { field: "courseCode", headerName: "Course Code", width: 150 },
        { field: "phoneNumber", headerName: "Phone Number", width: 150 },
        { field: "applicationStatus", headerName: "Status", width: 150 },
        {
            field: "documents",
            headerName: "Documents",
            width: 300,
            renderCell: (params: any) => (
                <div className="documents">
                    <button
                        onClick={() => downloadFile(params.row.studentId, "id")}
                    >
                        View ID
                    </button>
                    <button
                        onClick={() => downloadFile(params.row.studentId, "certificate")}
                    >
                        View Certificate
                    </button>
                </div>
            ),
        },
    ];

    return (
        <div className="main">
            <Navbar />
            <div className="container">
                <div className="menuContainer">
                    <Menu />
                </div>
                <DataTableV1
                    columns={columns}
                    rows={data}
                    deleteEndpoint={(id) => `http://localhost:9999/api/v1/student/${id}`}
                    detailPath={(id) => `/students/${id}`}
                    authToken={authToken} // Pass token for delete requests
                />
            </div>
            <Footer />
        </div>
    );
};

export default StudentsList;
