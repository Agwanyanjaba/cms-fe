import React, { useState } from "react";
import "./../studenthome/student_home.scss";

const Form = () => {
    const [formData, setFormData] = useState({
        appUserName: "",
        studentId: "",
        firstName: "",
        lastName: "",
        gender: "Male",
        dateOfBirth: "",
        nationality: "",
        phoneNumber: "",
    });

    const [idProof, setIdProof] = useState<File | null>(null);
    const [certificate, setCertificate] = useState<File | null>(null);
    const [dob, setDob] = useState<Date | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: "ID" | "certificate") => {
        const file = e.target.files?.[0];
        if (type === "ID") {
            setIdProof(file || null);
        } else if (type === "certificate") {
            setCertificate(file || null);
        }
    };

    const handleDobChange = (date: Date | null) => {
        setDob(date);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append('appUserName', formData.appUserName);
        data.append('studentId', formData.studentId);
        data.append('firstName', formData.firstName);
        data.append('lastName', formData.lastName);
        data.append('gender', formData.gender);
        data.append('dateOfBirth', dob?.toISOString() || '');
        data.append('nationality', formData.nationality);
        data.append('phoneNumber', formData.phoneNumber);

        if (idProof) data.append('ID', idProof);
        if (certificate) data.append('certificate', certificate);

        // Handle form submission logic (e.g., API call)
        console.log("Form Data:", formData);
        console.log("ID Proof:", idProof);
        console.log("Certificate:", certificate);

        // Example API submission (uncomment and replace with actual API endpoint)
        // axios.post('/api/register', data).then(response => {
        //   console.log(response.data);
        // }).catch(error => {
        //   console.error(error);
        // });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="appUserName">Username</label>
                        <input
                            type="text"
                            id="appUserName"
                            name="appUserName"
                            value={formData.appUserName}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="studentId">Student ID</label>
                        <input
                            type="text"
                            id="studentId"
                            name="studentId"
                            value={formData.studentId}
                            onChange={handleChange}
                            placeholder="Enter your student ID"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            type="text"
                            id="firstName"
                            name="firstName"
                            value={formData.firstName}
                            onChange={handleChange}
                            placeholder="Enter your first name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            type="text"
                            id="lastName"
                            name="lastName"
                            value={formData.lastName}
                            onChange={handleChange}
                            placeholder="Enter your last name"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="gender">Gender</label>
                        <select
                            id="gender"
                            name="gender"
                            value={formData.gender}
                            onChange={handleChange}
                            required
                        >
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="dob">Date of Birth</label>
                        <input
                            type="date"
                            id="dob"
                            name="dob"
                            value={dob ? dob.toISOString().split("T")[0] : ""}
                            onChange={(e) => handleDobChange(new Date(e.target.value))}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="nationality">Nationality</label>
                        <input
                            type="text"
                            id="nationality"
                            name="nationality"
                            value={formData.nationality}
                            onChange={handleChange}
                            placeholder="Enter your nationality"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="phoneNumber">Phone Number</label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="ID">Upload ID</label>
                        <input
                            type="file"
                            id="ID"
                            name="ID"
                            accept=".pdf, .jpg, .png"
                            onChange={(e) => handleFileChange(e, "ID")}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="certificate">Upload Certificate</label>
                        <input
                            type="file"
                            id="certificate"
                            name="certificate"
                            accept=".pdf, .jpg, .png"
                            onChange={(e) => handleFileChange(e, "certificate")}
                            required
                        />
                    </div>

                    <button type="submit" className="register-button">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Form;
