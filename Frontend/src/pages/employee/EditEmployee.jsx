import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaSave } from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    getEmployeeById,
    updateEmployee
} from "../../services/employeeService";

const EditEmployee = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    // ========================================
    // FORM DATA
    // ========================================

    const [formData, setFormData] = useState({
        employeeCode: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        designation: "",
        salary: "",
        address: "",
        joiningDate: "",
        departmentId: "",
        username: "",
        password: "",
        role: "",
        active: true
    });

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // ========================================
    // LOAD EMPLOYEE
    // ========================================

    useEffect(() => {

        const loadEmployee = async () => {

            try {

                setLoading(true);
                setError("");

                const employee = await getEmployeeById(id);

                console.log("Employee for edit:", employee);

                setFormData({
                    employeeCode: employee.employeeCode || "",
                    firstName: employee.firstName || "",
                    lastName: employee.lastName || "",
                    email: employee.email || "",
                    phoneNumber: employee.phoneNumber || "",
                    designation: employee.designation || "",
                    salary: employee.salary ?? "",
                    address: employee.address || "",
                    joiningDate: employee.joiningDate || "",

                    departmentId: employee.departmentId ?? "",

                    username: employee.username || "",

                    // Password should NEVER be loaded from backend
                    password: "",

                    role: employee.role || "",

                    active: employee.active ?? true
                });

            } catch (error) {

                console.error(
                    "Failed to load employee:",
                    error
                );

                console.error(
                    "Backend response:",
                    error.response?.data
                );

                setError(
                    error.response?.data?.message ||
                    "Failed to load employee details."
                );

            } finally {

                setLoading(false);

            }
        };

        loadEmployee();

    }, [id]);

    // ========================================
    // HANDLE INPUT
    // ========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };

    // ========================================
    // HANDLE ACTIVE CHECKBOX
    // ========================================

    const handleActiveChange = (e) => {

        setFormData((previous) => ({
            ...previous,
            active: e.target.checked
        }));

    };

    // ========================================
    // SUBMIT
    // ========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");
        setSaving(true);

        try {

            const employeeData = {
                employeeCode: formData.employeeCode,

                firstName: formData.firstName,

                lastName: formData.lastName,

                email: formData.email,

                phoneNumber: formData.phoneNumber,

                designation: formData.designation,

                salary: Number(formData.salary),

                address: formData.address,

                joiningDate: formData.joiningDate,

                active: formData.active,

                departmentId: Number(formData.departmentId),

                username: formData.username,

                role: formData.role,

                // Send password only when user entered a new password
                password: formData.password
            };

            console.log(
                "Updating employee:",
                employeeData
            );

            await updateEmployee(id, employeeData);

            alert("Employee updated successfully!");

            navigate("/employees");

        } catch (error) {

            console.error(
                "Update employee failed:",
                error
            );

            console.error(
                "Backend response:",
                error.response?.data
            );

            setError(
                error.response?.data?.message ||
                "Failed to update employee."
            );

        } finally {

            setSaving(false);

        }
    };

    // ========================================
    // LOADING
    // ========================================

    if (loading) {

        return (
            <Layout>

                <div className="flex justify-center items-center min-h-[400px]">

                    <p className="text-gray-500">
                        Loading employee...
                    </p>

                </div>

            </Layout>
        );
    }

    // ========================================
    // ERROR WHILE LOADING
    // ========================================

    if (error && !formData.firstName) {

        return (
            <Layout>

                <div className="bg-red-50 text-red-600 p-5 rounded-xl">

                    {error}

                </div>

            </Layout>
        );
    }

    // ========================================
    // UI
    // ========================================

    return (

        <Layout>

            <div className="space-y-6">

                {/* ========================================
                    PAGE HEADER
                ======================================== */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            Edit Employee
                        </h1>

                        <p className="text-gray-500 mt-1">
                            Update employee information
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() => navigate("/employees")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >

                        <FaArrowLeft />

                        Back

                    </button>

                </div>


                {/* ========================================
                    FORM CARD
                ======================================== */}

                <div className="bg-white rounded-xl shadow-sm p-6">

                    {/* ERROR */}

                    {error && (

                        <div className="mb-5 p-4 rounded-lg bg-red-50 text-red-600">

                            {error}

                        </div>

                    )}


                    <form
                        onSubmit={handleSubmit}
                        className="space-y-6"
                    >


                        {/* ========================================
                            EMPLOYEE CODE
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Employee Code
                            </label>

                            <input
                                type="text"
                                name="employeeCode"
                                value={formData.employeeCode}
                                readOnly
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600"
                            />

                            <p className="text-xs text-gray-500 mt-1">
                                Employee code cannot be changed.
                            </p>

                        </div>


                        {/* ========================================
                            FIRST NAME + LAST NAME
                        ======================================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    First Name
                                </label>

                                <input
                                    type="text"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Last Name
                                </label>

                                <input
                                    type="text"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>


                        {/* ========================================
                            EMAIL + PHONE
                        ======================================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Email
                                </label>

                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>

                                <input
                                    type="text"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    required
                                    maxLength="10"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>


                        {/* ========================================
                            DESIGNATION + SALARY
                        ======================================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Designation
                                </label>

                                <input
                                    type="text"
                                    name="designation"
                                    value={formData.designation}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Salary
                                </label>

                                <input
                                    type="number"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>


                        {/* ========================================
                            ADDRESS
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Address
                            </label>

                            <textarea
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                rows="3"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                        </div>


                        {/* ========================================
                            DEPARTMENT + JOINING DATE
                        ======================================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Department ID
                                </label>

                                <input
                                    type="number"
                                    name="departmentId"
                                    value={formData.departmentId}
                                    onChange={handleChange}
                                    required
                                    min="1"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Joining Date
                                </label>

                                <input
                                    type="date"
                                    name="joiningDate"
                                    value={formData.joiningDate}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>

                        </div>


                        {/* ========================================
                            USERNAME + ROLE
                        ======================================== */}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Username
                                </label>

                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                />

                            </div>


                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Role
                                </label>

                                <select
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                                >

                                    <option value="">
                                        Select Role
                                    </option>

                                    <option value="ADMIN">
                                        ADMIN
                                    </option>

                                    <option value="HR">
                                        HR
                                    </option>

                                    <option value="EMPLOYEE">
                                        EMPLOYEE
                                    </option>

                                </select>

                            </div>

                        </div>


                        {/* ========================================
                            PASSWORD
                        ======================================== */}

                        <div>

                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                New Password
                            </label>

                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Leave blank to keep current password"
                                minLength="6"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                            />

                            <p className="text-xs text-gray-500 mt-1">
                                Leave blank to keep the current password.
                            </p>

                        </div>


                        {/* ========================================
                            ACTIVE
                        ======================================== */}

                        <div className="flex items-center gap-3">

                            <input
                                type="checkbox"
                                name="active"
                                checked={formData.active}
                                onChange={handleActiveChange}
                                className="w-4 h-4"
                            />

                            <label className="text-sm font-medium text-gray-700">
                                Employee Active
                            </label>

                        </div>


                        {/* ========================================
                            BUTTONS
                        ======================================== */}

                        <div className="flex justify-end gap-3 pt-4 border-t">

                            <button
                                type="button"
                                onClick={() => navigate("/employees")}
                                className="px-5 py-3 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 transition"
                            >
                                Cancel
                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 transition"
                            >

                                <FaSave />

                                {saving
                                    ? "Updating..."
                                    : "Update Employee"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};

export default EditEmployee;