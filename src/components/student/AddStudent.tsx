import { GridColDef } from "@mui/x-data-grid";
import "./addStudent.scss";
import { useAuth } from "../../utils/AuthProvider";

type Props = {
    slug: string;
    columns: GridColDef[];
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSubmit: (formData: FormData) => void; // Change to handle FormData
};

const AddStudent = (props: Props) => {
    // Call useAuth here to ensure it's within a component
    const auth = useAuth();

    // Debugging: Log the user information
    console.log("User from AuthContext:", auth.user);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Debugging: Log email before form submission
        console.log("Logged-in user's email:", auth.user?.username);

        // Check if the email or role is undefined
        if (!auth.user?.username || !auth.user?.role) {
            alert("User is not logged in or email is missing.");
            return;
        }

        // Append the email to the form data
        const formData = new FormData(e.target as HTMLFormElement);
        formData.append("appUserName", auth.user.username); // Use email from auth context

        try {
            await props.onSubmit(formData); // Pass FormData to onSubmit
            props.setOpen(false); // Close the modal only if the request is successful
        } catch (error) {
            console.error("Error submitting form", error);
            alert("Error submitting form. Please try again.");
        }
    };

    return (
        <div className="add">
            <div className="modal">
                <span className="close" onClick={() => props.setOpen(false)}>
                    X
                </span>
                <h1>Add new {props.slug}</h1>
                <form onSubmit={handleSubmit}>
                    {props.columns
                        .filter((item) => item.field !== "id" && item.field !== "img") // Exclude id and img columns
                        .map((column) => (
                            <div className="item" key={column.field}>
                                <label>{column.headerName}</label>
                                <input
                                    name={column.field}
                                    type={column.type === "number" ? "number" : "text"}
                                    placeholder={column.headerName}
                                    required
                                />
                            </div>
                        ))}
                    {/* File input for ID */}
                    <div className="item">
                        <label>Upload ID [Front]</label>
                        <input
                            name="idDoc"
                            type="file"
                            accept="application/pdf,image/*"
                            required
                        />
                    </div>
                    <div className="item">
                        <label>Upload ID [Back]</label>
                        <input
                            name="idDoc2"
                            type="file"
                            accept="application/pdf,image/*"
                            required
                        />
                    </div>
                    {/* File input for certificate */}
                    <div className="item">
                        <label>Upload Certificate</label>
                        <input
                            name="certificateDoc"
                            type="file"
                            accept="application/pdf,image/*"
                            required
                        />
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default AddStudent;
