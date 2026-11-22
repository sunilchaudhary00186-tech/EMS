import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FaArrowLeft, FaUser } from "react-icons/fa";

import Layout from "../../components/layout/Layout";
import { getEmployeeById } from "../../services/employeeService";

const ViewEmployee = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [employee, setEmployee] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadEmployee = async () => {

            try {

                setLoading(true);

                const data = await getEmployeeById(id);

                console.log("Employee details:", data);

                setEmployee(data);

            } catch (error) {

                console.error("Failed to load employee:", error);

                setError("Failed to load employee details.");

            } finally {

                setLoading(false);

            }
        };

        loadEmployee();

    }, [id]);


    if (loading) {
        return (
            <Layout>
                <div className="flex justify-center items-center min-h-[400px]">
                    <p className="text-gray-500">
                        Loading employee details...
                    </p>
                </div>
            </Layout>
        );
    }


    if (error) {
        return (
            <Layout>
                <div className="bg-red-50 text-red-600 p-5 rounded-xl">
                    {error}
                </div>
            </Layout>
        );
    }


    if (!employee) {
        return (
            <Layout>
                <div className="bg-white rounded-xl shadow-sm p-10 text-center">
                    <p className="text-gray-500">
                        Employee not found.
                    </p>
                </div>
            </Layout>
        );
    }


    return (

        <Layout>

            <div className="space-y-6">

                {/* Header */}

                <div className="flex items-center justify-between">

                    <div>

                        <h1 className="text-2xl font-bold text-gray-800">
                            Employee Details
                        </h1>

                        <p className="text-gray-500 mt-1">
                            View employee information
                        </p>

                    </div>


                    <button
                        onClick={() => navigate("/employees")}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition"
                    >
                        <FaArrowLeft />

                        Back
                    </button>

                </div>


                {/* Employee Card */}

                <div className="bg-white rounded-xl shadow-sm overflow-hidden">

                    {/* Profile Header */}

                    <div className="bg-blue-600 px-6 py-8">

                        <div className="flex items-center gap-5">

                            <div className="w-20 h-20 rounded-full bg-white text-blue-600 flex items-center justify-center text-3xl font-bold">

                                {employee.firstName?.charAt(0)}
                                {employee.lastName?.charAt(0)}

                            </div>


                            <div className="text-white">

                                <h2 className="text-2xl font-bold">

                                    {employee.firstName}{" "}
                                    {employee.lastName}

                                </h2>

                                <p className="text-blue-100 mt-1">

                                    {employee.designation}

                                </p>

                                <p className="text-blue-100 text-sm mt-1">

                                    {employee.employeeCode}

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* Details */}

                    <div className="p-6">

                        <h3 className="text-lg font-semibold text-gray-800 mb-5">

                            Personal Information

                        </h3>


                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">


                            <div>

                                <p className="text-sm text-gray-500">
                                    Employee Code
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.employeeCode || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    First Name
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.firstName || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Last Name
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.lastName || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Email
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.email || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Phone Number
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.phoneNumber || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Department
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.departmentName || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Designation
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.designation || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Salary
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">

                                    ₹
                                    {Number(
                                        employee.salary || 0
                                    ).toLocaleString("en-IN")}

                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Address
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.address || "N/A"}
                                </p>

                            </div>


                            <div>

                                <p className="text-sm text-gray-500">
                                    Joining Date
                                </p>

                                <p className="font-semibold text-gray-800 mt-1">
                                    {employee.joiningDate || "N/A"}
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default ViewEmployee;