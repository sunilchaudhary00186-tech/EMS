import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaBuilding,
    FaUsers,
    FaCalendarAlt,
    FaEdit
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    getDepartmentById
} from "../../services/departmentService";


const DepartmentDetails = () => {

    const { id } = useParams();

    const navigate = useNavigate();

    const [department, setDepartment] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    useEffect(() => {

        const loadDepartment = async () => {

            try {

                const data = await getDepartmentById(id);

                setDepartment(data);

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load department."
                );

            } finally {

                setLoading(false);

            }
        };

        loadDepartment();

    }, [id]);


    if (loading) {

        return (

            <Layout>

                <div className="
                    min-h-[400px]
                    flex
                    justify-center
                    items-center
                ">

                    <div className="
                        w-10
                        h-10
                        border-4
                        border-blue-200
                        border-t-blue-600
                        rounded-full
                        animate-spin
                    " />

                </div>

            </Layout>
        );
    }


    if (error) {

        return (

            <Layout>

                <div className="
                    bg-red-50
                    text-red-600
                    p-5
                    rounded-xl
                ">

                    {error}

                </div>

            </Layout>
        );
    }


    return (

        <Layout>

            <div className="max-w-5xl mx-auto space-y-6">


                {/* HEADER */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                ">

                    <div>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-900
                        ">

                            Department Details

                        </h1>

                        <p className="
                            text-gray-500
                            mt-1
                        ">

                            View department information

                        </p>

                    </div>


                    <div className="flex gap-3">

                        <button
                            onClick={() =>
                                navigate("/departments")
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                bg-gray-100
                                text-gray-700
                                hover:bg-gray-200
                            "
                        >

                            <FaArrowLeft />

                            Back

                        </button>


                        <button
                            onClick={() =>
                                navigate(
                                    `/departments/edit/${id}`
                                )
                            }
                            className="
                                flex
                                items-center
                                gap-2
                                px-4
                                py-2.5
                                rounded-xl
                                bg-blue-600
                                text-white
                                hover:bg-blue-700
                            "
                        >

                            <FaEdit />

                            Edit

                        </button>

                    </div>

                </div>


                {/* HERO */}

                <div className="
                    bg-gradient-to-r
                    from-blue-600
                    to-indigo-600
                    rounded-2xl
                    p-8
                    text-white
                    shadow-lg
                ">

                    <div className="flex items-center gap-5">

                        <div className="
                            w-16
                            h-16
                            rounded-2xl
                            bg-white/20
                            flex
                            items-center
                            justify-center
                            text-3xl
                        ">

                            <FaBuilding />

                        </div>


                        <div>

                            <h2 className="
                                text-3xl
                                font-bold
                            ">

                                {department.departmentName}

                            </h2>

                            <p className="
                                text-blue-100
                                mt-1
                            ">

                                {department.departmentCode}

                            </p>

                        </div>

                    </div>

                </div>


                {/* INFORMATION */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-5
                ">


                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            mb-4
                        ">

                            <FaUsers />

                        </div>

                        <p className="text-sm text-gray-500">

                            Total Employees

                        </p>

                        <h3 className="
                            text-3xl
                            font-bold
                            mt-1
                        ">

                            {department.totalEmployees || 0}

                        </h3>

                    </div>


                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-green-50
                            text-green-600
                            flex
                            items-center
                            justify-center
                            mb-4
                        ">

                            <FaCalendarAlt />

                        </div>

                        <p className="text-sm text-gray-500">

                            Created

                        </p>

                        <h3 className="
                            text-lg
                            font-bold
                            mt-2
                        ">

                            {department.createdAt
                                ? new Date(
                                    department.createdAt
                                ).toLocaleDateString()
                                : "N/A"}

                        </h3>

                    </div>


                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            w-11
                            h-11
                            rounded-xl
                            bg-purple-50
                            text-purple-600
                            flex
                            items-center
                            justify-center
                            mb-4
                        ">

                            <FaBuilding />

                        </div>

                        <p className="text-sm text-gray-500">

                            Department Code

                        </p>

                        <h3 className="
                            text-xl
                            font-bold
                            mt-2
                        ">

                            {department.departmentCode}

                        </h3>

                    </div>

                </div>


                {/* DESCRIPTION */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    p-6
                ">

                    <h2 className="
                        text-xl
                        font-bold
                        text-gray-900
                        mb-3
                    ">

                        About Department

                    </h2>

                    <p className="
                        text-gray-600
                        leading-7
                    ">

                        {department.description ||
                            "No description available for this department."}

                    </p>

                </div>

            </div>

        </Layout>
    );
};


export default DepartmentDetails;