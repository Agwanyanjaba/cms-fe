import axios from "axios";
import {useQuery} from "@tanstack/react-query";

const AddStaff = ({
                      setOpen,
                      onSubmit,
                  }: {
    setOpen: (val: boolean) => void;
    onSubmit: (data: any) => void;
}) => {
    const authToken = localStorage.getItem("authToken") ?? undefined;

    const {data: departments, isLoading: isDepartmentsLoading} = useQuery(
        ["departments"],
        async () => {
            const response = await axios.get("http://localhost:9999/api/v1/department", {
                headers: {Authorization: `Bearer ${authToken}`},
            });
            return response.data;
        }
    );

    const {data: positions, isLoading: isPositionsLoading} = useQuery(
        ["positions"],
        async () => {
            const response = await axios.get("http://localhost:9999/api/v1/position", {
                headers: {Authorization: `Bearer ${authToken}`},
            });
            return response.data;
        }
    );


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const data = Object.fromEntries(formData.entries());
        onSubmit(data);
        setOpen(false);
    };

    if (isDepartmentsLoading || isPositionsLoading) {
        return <div>Loading...</div>;
    }


    return (
        <div className="addStaff">
            <div className="modal">

                <h1>Add New Staff</h1>
                <span className="close" onClick={() => setOpen(false)}>
          &times;
        </span>
                <form onSubmit={handleSubmit}>
                    <div className="formItem">
                        <label>First Name</label>
                        <input name="firstName" type="text" required/>
                    </div>
                    <div className="formItem">
                        <label>Last Name</label>
                        <input name="lastName" type="text" required/>
                    </div>
                    <div className="formItem">
                        <label>Email</label>
                        <input name="email" type="email" required/>
                    </div>
                    <div className="formItem">
                        <label>Phone Number</label>
                        <input name="phoneNumber" type="tel" required/>
                    </div>
                    <div className="formItem">
                        <label>Department</label>
                        <select name="departmentId" required>
                            <option value="">Select Department</option>
                            {departments.map((dept: any) => (
                                <option key={dept.id} value={dept.id}>
                                    {dept.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formItem">
                        <label>Position</label>
                        <select name="positionId" required>
                            <option value="">Select Position</option>
                            {positions.map((pos: any) => (
                                <option key={pos.id} value={pos.id}>
                                    {pos.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="formItem">
                        <label>Hire Date</label>
                        <input name="hireDate" type="date" required/>
                    </div>
                    <div className="formItem">
                        <label>Salary</label>
                        <input name="salary" type="number" step="0.01" required/>
                    </div>
                    <div className="formItem">
                        <label>Gender</label>
                        <select name="gender" required>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>
                    <button type="submit">Add Staff</button>
                </form>
            </div>
        </div>
    );
};

export default AddStaff;
