import { GridColDef } from "@mui/x-data-grid";
import "./addStaff.scss";
import { useState } from "react";
import { userRows } from "../../data";
import DataTableV1 from "../../components/dataTable/DataTableV1.tsx";
import AddStaff from "./AddStaff.tsx";
import axiosInstance from "../../utils/axiosInstance.ts";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  // {
  //   field: "img",
  //   headerName: "Avatar",
  //   width: 100,
  //   renderCell: (params) => {
  //     return <img src={params.row.img || "/noavatar.png"} alt="Avatar" />;
  //   },
  // },

  {
    field: "firstName",
    type: "string",
    headerName: "First Name",
    width: 200,
  },
  {
    field: "lastName",
    type: "string",
    headerName: "Last Name",
    width: 200,
  },
  {
    field: "gender",
    type: "string",
    headerName: "Gender",
    width: 150,
  },
  {
    field: "idType",
    type: "string",
    headerName: "ID Type",
    width: 150,
  },
  {
    field: "govtIDNumber",
    type: "string",
    headerName: "Government ID No.",
    width: 150,
  },
  {
    field: "basicPay",
    type: "number",
    headerName: "Basic Pay",
    width: 150,
  },
  {
    field: "email",
    type: "string",
    headerName: "Email Address",
    width: 300,
  },
  {
    field: "phone",
    type: "string",
    headerName: "Phone",
    width: 200,
  },
  {
    field: "createdAt",
    type: "string",
    headerName: "Date of Reporting",
    width: 200,
  },
];

const Staffs = () => {
  const [open, setOpen] = useState(false);

  const handleAddStaff = async (formData: Record<string, string | number | undefined>) => {
    const authToken = localStorage.getItem("authToken") ?? undefined;
    try {
      const response = await axiosInstance.post('/api/v1/staff', formData, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Staff added:", response.data);
      // Optionally close the modal after submission
      setOpen(false);
    } catch (error) {
      console.error("Error adding staff:", error);
    }
  };


  return (
      <div className="users">
        <div className="info">
          <h1>Staff</h1>
          <button onClick={() => setOpen(true)} className="add-button">
            Add New Staff
          </button>
        </div>
        <DataTableV1 columns={columns} rows={userRows} />
        {open && (
            <AddStaff
                slug="Staff"
                columns={columns}
                setOpen={setOpen}
                onSubmit={handleAddStaff}
            />
        )}
      </div>
  );
};

export default Staffs;
