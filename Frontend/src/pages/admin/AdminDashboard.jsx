import {
    FaUsers,
    FaUserCheck,
    FaUserTimes,
    FaBuilding,
    FaCalendarAlt
} from "react-icons/fa";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Layout from "../../components/layout/Layout";
import { getAdminDashboard } from "../../api/dashboardApi";


const AdminDashboard = () => {

    const navigate = useNavigate();

    const [dashboard, setDashboard] = useState({
        totalEmployees: 0,
        activeEmployees: 0,
        inactiveEmployees: 0,
        totalDepartments: 0
    });

    const [loading, setLoading] = useState(true);


    useEffect(() => {

        const loadDashboard = async () => {

            try {

                const response = await getAdminDashboard();

                console.log(
                    "ADMIN DASHBOARD DATA:",
                    response
                );

                setDashboard({
                    totalEmployees:
                        response?.totalEmployees ?? 0,

                    activeEmployees:
                        response?.activeEmployees ?? 0,

                    inactiveEmployees:
                        response?.inactiveEmployees ?? 0,

                    totalDepartments:
                        response?.totalDepartments ?? 0
                });

            } catch (error) {

                console.error(
                    "Failed to load admin dashboard:",
                    error
                );

            } finally {

                setLoading(false);
            }
        };


        loadDashboard();

    }, []);


    return (

        <Layout>

            <div className="space-y-6">

                {/* HEADER */}

                <div>

                    <p className="
                        text-sm
                        font-semibold
                        text-blue-600
                    ">
                        Administration
                    </p>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                        mt-1
                    ">
                        Admin Dashboard
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Overview of your organization's workforce
                    </p>

                </div>


                {/* STATS */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    lg:grid-cols-4
                    gap-5
                ">


                    {/* TOTAL EMPLOYEES */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Total Employees
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {loading
                                        ? "..."
                                        : dashboard.totalEmployees}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                                flex
                                items-center
                                justify-center
                                text-xl
                            ">
                                <FaUsers />
                            </div>

                        </div>

                    </div>


                    {/* ACTIVE EMPLOYEES */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Active Employees
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {loading
                                        ? "..."
                                        : dashboard.activeEmployees}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-green-50
                                text-green-600
                                flex
                                items-center
                                justify-center
                                text-xl
                            ">
                                <FaUserCheck />
                            </div>

                        </div>

                    </div>


                    {/* INACTIVE EMPLOYEES */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Inactive Employees
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {loading
                                        ? "..."
                                        : dashboard.inactiveEmployees}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-red-50
                                text-red-600
                                flex
                                items-center
                                justify-center
                                text-xl
                            ">
                                <FaUserTimes />
                            </div>

                        </div>

                    </div>


                    {/* DEPARTMENTS */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Departments
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {loading
                                        ? "..."
                                        : dashboard.totalDepartments}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-purple-50
                                text-purple-600
                                flex
                                items-center
                                justify-center
                                text-xl
                            ">
                                <FaBuilding />
                            </div>

                        </div>

                    </div>

                </div>


                {/* QUICK ACTIONS */}

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
                    ">
                        Quick Actions
                    </h2>

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-4
                        mt-5
                    ">

                        <button
                            onClick={() =>
                                navigate("/employees")
                            }
                            className="
                                p-5
                                rounded-xl
                                bg-blue-50
                                text-left
                                hover:bg-blue-100
                                transition
                            "
                        >

                            <FaUsers className="
                                text-blue-600
                                text-xl
                            " />

                            <h3 className="
                                font-semibold
                                text-gray-900
                                mt-3
                            ">
                                Manage Employees
                            </h3>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                View employee directory
                            </p>

                        </button>


                        <button
                            onClick={() =>
                                navigate("/departments")
                            }
                            className="
                                p-5
                                rounded-xl
                                bg-purple-50
                                text-left
                                hover:bg-purple-100
                                transition
                            "
                        >

                            <FaBuilding className="
                                text-purple-600
                                text-xl
                            " />

                            <h3 className="
                                font-semibold
                                text-gray-900
                                mt-3
                            ">
                                Departments
                            </h3>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                Manage departments
                            </p>

                        </button>


                        <button
                            onClick={() =>
                                navigate("/attendance")
                            }
                            className="
                                p-5
                                rounded-xl
                                bg-green-50
                                text-left
                                hover:bg-green-100
                                transition
                            "
                        >

                            <FaCalendarAlt className="
                                text-green-600
                                text-xl
                            " />

                            <h3 className="
                                font-semibold
                                text-gray-900
                                mt-3
                            ">
                                Attendance
                            </h3>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                View attendance records
                            </p>

                        </button>

                    </div>

                </div>

            </div>

        </Layout>
    );
};


export default AdminDashboard;