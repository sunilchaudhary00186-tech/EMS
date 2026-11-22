import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaArrowLeft,
    FaSave,
    FaUser,
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaBriefcase,
    FaMoneyBillWave,
    FaCalendarAlt,
    FaBuilding,
    FaLock,
    FaUserShield,
    FaIdBadge
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";
import { createEmployee } from "../../api/employeeApi";

function AddEmployee() {

    const navigate = useNavigate();

    const [employee, setEmployee] = useState({
        employeeCode: "",
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phoneNumber: "",
        designation: "",
        salary: "",
        joiningDate: "",
        departmentId: "",
        username: "",
        password: "",
        role: "EMPLOYEE",
        active: true
    });

    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // =========================
    // HANDLE INPUT
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setEmployee((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // =========================
    // SUBMIT
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSaving(true);

        try {

            const payload = {
                employeeCode: employee.employeeCode,
                firstName: employee.firstName,
                lastName: employee.lastName,
                email: employee.email,
                address: employee.address,
                phoneNumber: employee.phoneNumber,
                designation: employee.designation,
                salary: Number(employee.salary),
                departmentId: Number(employee.departmentId),
                username: employee.username,
                password: employee.password,
                role: employee.role,
                active: true
            };

            if (employee.joiningDate) {
                payload.joiningDate = employee.joiningDate;
            }

            console.log("Sending employee:", payload);

            await createEmployee(payload);

            alert("Employee added successfully!");

            navigate("/employees");

        } catch (err) {

            console.error("Create employee error:", err);

            console.error(
                "Backend response:",
                err.response?.data
            );

            setError(
                err.response?.data?.message ||
                "Failed to add employee."
            );

        } finally {

            setSaving(false);
        }
    };

    return (

        <Layout>

            <div className="max-w-6xl mx-auto space-y-6">

                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                    <div>

                        <div className="flex items-center gap-3">

                            <div className="w-11 h-11 rounded-xl bg-blue-100 flex items-center justify-center">

                                <FaUser className="text-blue-600 text-lg" />

                            </div>

                            <div>

                                <h1 className="text-2xl font-bold text-gray-800">

                                    Add Employee

                                </h1>

                                <p className="text-sm text-gray-500 mt-1">

                                    Create a new employee profile and account

                                </p>

                            </div>

                        </div>

                    </div>


                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="
                            flex items-center justify-center gap-2
                            px-4 py-2.5
                            bg-white
                            border border-gray-200
                            text-gray-700
                            rounded-lg
                            hover:bg-gray-50
                            transition
                            shadow-sm
                        "
                    >

                        <FaArrowLeft />

                        Back to Employees

                    </button>

                </div>


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {error && (

                    <div className="flex items-start gap-3 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700">

                        <div className="mt-0.5 font-bold">
                            !
                        </div>

                        <div>

                            <p className="font-semibold">
                                Unable to create employee
                            </p>

                            <p className="text-sm mt-1">
                                {error}
                            </p>

                        </div>

                    </div>

                )}


                {/* ================================= */}
                {/* FORM */}
                {/* ================================= */}

                <form onSubmit={handleSubmit}>

                    {/* ================================= */}
                    {/* PERSONAL INFORMATION */}
                    {/* ================================= */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                        {/* Section Header */}

                        <div className="px-6 py-5 border-b border-gray-100">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center">

                                    <FaUser className="text-blue-600" />

                                </div>

                                <div>

                                    <h2 className="font-semibold text-gray-800">

                                        Personal Information

                                    </h2>

                                    <p className="text-sm text-gray-500">

                                        Basic information about the employee

                                    </p>

                                </div>

                            </div>

                        </div>


                        {/* Fields */}

                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Employee Code */}

                            <div>

                                <label className="form-label">

                                    Employee Code

                                </label>

                                <div className="input-wrapper">

                                    <FaIdBadge className="input-icon" />

                                    <input
                                        type="text"
                                        name="employeeCode"
                                        placeholder="Example: EMP006"
                                        value={employee.employeeCode}
                                        onChange={handleChange}
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* First Name */}

                            <div>

                                <label className="form-label">

                                    First Name
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaUser className="input-icon" />

                                    <input
                                        type="text"
                                        name="firstName"
                                        placeholder="Enter first name"
                                        value={employee.firstName}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Last Name */}

                            <div>

                                <label className="form-label">

                                    Last Name
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaUser className="input-icon" />

                                    <input
                                        type="text"
                                        name="lastName"
                                        placeholder="Enter last name"
                                        value={employee.lastName}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Email */}

                            <div>

                                <label className="form-label">

                                    Email Address
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaEnvelope className="input-icon" />

                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="employee@gmail.com"
                                        value={employee.email}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Phone */}

                            <div>

                                <label className="form-label">

                                    Phone Number

                                </label>

                                <div className="input-wrapper">

                                    <FaPhone className="input-icon" />

                                    <input
                                        type="text"
                                        name="phoneNumber"
                                        placeholder="10 digit mobile number"
                                        value={employee.phoneNumber}
                                        onChange={handleChange}
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Address */}

                            <div className="md:col-span-2">

                                <label className="form-label">

                                    Address

                                </label>

                                <div className="input-wrapper textarea-wrapper">

                                    <FaMapMarkerAlt className="input-icon top-4" />

                                    <textarea
                                        name="address"
                                        placeholder="Enter employee address"
                                        value={employee.address}
                                        onChange={handleChange}
                                        rows="3"
                                        className="form-input resize-none"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* JOB INFORMATION */}
                    {/* ================================= */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">

                        <div className="px-6 py-5 border-b border-gray-100">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center">

                                    <FaBriefcase className="text-purple-600" />

                                </div>

                                <div>

                                    <h2 className="font-semibold text-gray-800">

                                        Job Information

                                    </h2>

                                    <p className="text-sm text-gray-500">

                                        Employee's role and employment details

                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Designation */}

                            <div>

                                <label className="form-label">

                                    Designation
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaBriefcase className="input-icon" />

                                    <input
                                        type="text"
                                        name="designation"
                                        placeholder="Example: Software Developer"
                                        value={employee.designation}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Salary */}

                            <div>

                                <label className="form-label">

                                    Salary
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaMoneyBillWave className="input-icon" />

                                    <input
                                        type="number"
                                        name="salary"
                                        placeholder="Enter salary"
                                        value={employee.salary}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Joining Date */}

                            <div>

                                <label className="form-label">

                                    Joining Date

                                </label>

                                <div className="input-wrapper">

                                    <FaCalendarAlt className="input-icon" />

                                    <input
                                        type="date"
                                        name="joiningDate"
                                        value={employee.joiningDate}
                                        onChange={handleChange}
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Department */}

                            <div>

                                <label className="form-label">

                                    Department ID
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaBuilding className="input-icon" />

                                    <input
                                        type="number"
                                        name="departmentId"
                                        placeholder="Example: 1"
                                        value={employee.departmentId}
                                        onChange={handleChange}
                                        required
                                        min="1"
                                        className="form-input"
                                    />

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* ACCOUNT INFORMATION */}
                    {/* ================================= */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mt-6">

                        <div className="px-6 py-5 border-b border-gray-100">

                            <div className="flex items-center gap-3">

                                <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center">

                                    <FaUserShield className="text-green-600" />

                                </div>

                                <div>

                                    <h2 className="font-semibold text-gray-800">

                                        Login & Access

                                    </h2>

                                    <p className="text-sm text-gray-500">

                                        Configure employee login credentials and role

                                    </p>

                                </div>

                            </div>

                        </div>


                        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">

                            {/* Username */}

                            <div>

                                <label className="form-label">

                                    Username
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaUserShield className="input-icon" />

                                    <input
                                        type="text"
                                        name="username"
                                        placeholder="Enter username"
                                        value={employee.username}
                                        onChange={handleChange}
                                        required
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Password */}

                            <div>

                                <label className="form-label">

                                    Password
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaLock className="input-icon" />

                                    <input
                                        type="password"
                                        name="password"
                                        placeholder="Minimum 6 characters"
                                        value={employee.password}
                                        onChange={handleChange}
                                        required
                                        minLength="6"
                                        className="form-input"
                                    />

                                </div>

                            </div>


                            {/* Role */}

                            <div>

                                <label className="form-label">

                                    System Role
                                    <span className="text-red-500"> *</span>

                                </label>

                                <div className="input-wrapper">

                                    <FaUserShield className="input-icon" />

                                    <select
                                        name="role"
                                        value={employee.role}
                                        onChange={handleChange}
                                        required
                                        className="form-input appearance-none bg-white"
                                    >

                                        <option value="EMPLOYEE">
                                            Employee
                                        </option>

                                        <option value="HR">
                                            HR
                                        </option>

                                        <option value="ADMIN">
                                            Admin
                                        </option>

                                    </select>

                                </div>

                                <p className="text-xs text-gray-500 mt-2">

                                    The role controls what the user can access.

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ================================= */}
                    {/* ACTION BAR */}
                    {/* ================================= */}

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mt-6 p-5">

                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">

                            <div className="text-sm text-gray-500">

                                <span className="text-red-500">*</span>{" "}

                                Required fields

                            </div>


                            <div className="flex items-center gap-3 w-full sm:w-auto">

                                <button
                                    type="button"
                                    onClick={() => navigate("/employees")}
                                    className="
                                        flex-1 sm:flex-none
                                        px-5 py-2.5
                                        rounded-lg
                                        border border-gray-200
                                        bg-white
                                        text-gray-700
                                        font-medium
                                        hover:bg-gray-50
                                        transition
                                    "
                                >

                                    Cancel

                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="
                                        flex-1 sm:flex-none
                                        flex items-center justify-center gap-2
                                        px-6 py-2.5
                                        rounded-lg
                                        bg-blue-600
                                        text-white
                                        font-medium
                                        shadow-sm
                                        hover:bg-blue-700
                                        disabled:opacity-50
                                        disabled:cursor-not-allowed
                                        transition
                                    "
                                >

                                    <FaSave />

                                    {saving
                                        ? "Creating..."
                                        : "Create Employee"
                                    }

                                </button>

                            </div>

                        </div>

                    </div>

                </form>

            </div>


            {/* ================================= */}
            {/* TAILWIND CUSTOM CLASSES */}
            {/* ================================= */}

            <style>
                {`
                    .form-label {
                        display: block;
                        font-size: 0.875rem;
                        font-weight: 600;
                        color: #374151;
                        margin-bottom: 0.5rem;
                    }

                    .input-wrapper {
                        position: relative;
                        display: flex;
                        align-items: center;
                    }

                    .input-icon {
                        position: absolute;
                        left: 1rem;
                        color: #9ca3af;
                        font-size: 0.9rem;
                        pointer-events: none;
                        z-index: 1;
                    }

                    .form-input {
                        width: 100%;
                        padding: 0.75rem 1rem 0.75rem 2.75rem;
                        border: 1px solid #d1d5db;
                        border-radius: 0.625rem;
                        outline: none;
                        color: #1f2937;
                        background-color: #ffffff;
                        transition: all 0.2s ease;
                    }

                    .form-input::placeholder {
                        color: #9ca3af;
                    }

                    .form-input:focus {
                        border-color: #3b82f6;
                        box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.12);
                    }

                    .form-input:hover {
                        border-color: #9ca3af;
                    }

                    textarea.form-input {
                        padding-top: 0.75rem;
                    }

                    .textarea-wrapper {
                        align-items: flex-start;
                    }
                `}
            </style>

        </Layout>
    );
}

export default AddEmployee;