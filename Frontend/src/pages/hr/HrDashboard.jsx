import { useEffect, useState } from "react";

import {
    FaUsers,
    FaBuilding,
    FaCalendarCheck,
    FaClipboardList,
    FaChartBar
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import { getHrDashboard } from "../../api/dashboardApi";


const HrDashboard = () => {

    // ==========================================
    // STATE
    // ==========================================

    const [loading, setLoading] = useState(true);

    const [dashboard, setDashboard] = useState({
        employees: 0,
        departments: 0,
        todayAttendance: 0,
        pendingLeaves: 0
    });

    const [error, setError] = useState("");


    // ==========================================
    // LOAD DASHBOARD
    // ==========================================

    useEffect(() => {

        loadDashboard();

    }, []);


    const loadDashboard = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getHrDashboard();

            console.log("HR Dashboard data:", data);

            setDashboard({

                employees:
                    data?.employees ??
                    data?.totalEmployees ??
                    0,

                departments:
                    data?.departments ??
                    data?.totalDepartments ??
                    0,

                todayAttendance:
                    data?.todayAttendance ??
                    0,

                pendingLeaves:
                    data?.pendingLeaves ??
                    0

            });

        } catch (error) {

            console.error(
                "Failed to load HR dashboard:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load dashboard data."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <Layout>

            <div className="space-y-6">

                {/* =====================================
                    HEADER
                ===================================== */}

                <div>

                    <p className="text-blue-600 font-semibold">
                        Human Resources
                    </p>

                    <h1 className="text-3xl font-bold text-gray-900 mt-1">
                        HR Dashboard
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Manage employees, attendance and leave
                    </p>

                </div>


                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className="
                        bg-red-50
                        border
                        border-red-200
                        text-red-700
                        px-5
                        py-4
                        rounded-xl
                    ">

                        {error}

                    </div>

                )}


                {/* =====================================
                    DASHBOARD CARDS
                ===================================== */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">


                    {/* EMPLOYEES */}

                    <DashboardCard
                        icon={<FaUsers />}
                        title="Employees"
                        value={
                            loading
                                ? "..."
                                : dashboard.employees
                        }
                        iconClass="bg-blue-50 text-blue-600"
                    />


                    {/* DEPARTMENTS */}

                    <DashboardCard
                        icon={<FaBuilding />}
                        title="Departments"
                        value={
                            loading
                                ? "..."
                                : dashboard.departments
                        }
                        iconClass="bg-purple-50 text-purple-600"
                    />


                    {/* ATTENDANCE */}

                    <DashboardCard
                        icon={<FaCalendarCheck />}
                        title="Today's Attendance"
                        value={
                            loading
                                ? "..."
                                : dashboard.todayAttendance
                        }
                        iconClass="bg-green-50 text-green-600"
                    />


                    {/* PENDING LEAVES */}

                    <DashboardCard
                        icon={<FaClipboardList />}
                        title="Pending Leave"
                        value={
                            loading
                                ? "..."
                                : dashboard.pendingLeaves
                        }
                        iconClass="bg-orange-50 text-orange-600"
                    />

                </div>


                {/* =====================================
                    HR MANAGEMENT
                ===================================== */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    p-6
                ">

                    <div className="flex items-center gap-3 mb-6">

                        <div className="
                            w-10
                            h-10
                            rounded-xl
                            bg-blue-50
                            text-blue-600
                            flex
                            items-center
                            justify-center
                        ">

                            <FaChartBar />

                        </div>

                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                                text-gray-900
                            ">
                                HR Management
                            </h2>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                Manage your organization's workforce
                            </p>

                        </div>

                    </div>


                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-5
                    ">


                        {/* EMPLOYEES */}

                        <ManagementCard
                            icon={<FaUsers />}
                            title="Employees"
                            description="Manage employee records"
                            iconClass="bg-blue-100 text-blue-600"
                        />


                        {/* DEPARTMENTS */}

                        <ManagementCard
                            icon={<FaBuilding />}
                            title="Departments"
                            description="Manage departments"
                            iconClass="bg-purple-100 text-purple-600"
                        />


                        {/* ATTENDANCE */}

                        <ManagementCard
                            icon={<FaCalendarCheck />}
                            title="Attendance"
                            description="Monitor attendance"
                            iconClass="bg-green-100 text-green-600"
                        />

                    </div>

                </div>

            </div>

        </Layout>

    );
};


// ==========================================
// DASHBOARD CARD
// ==========================================

const DashboardCard = ({
    icon,
    title,
    value,
    iconClass
}) => {

    return (

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

                <p className="
                    text-gray-500
                    text-sm
                    font-medium
                ">
                    {title}
                </p>

                <div className={`
                    w-11
                    h-11
                    rounded-xl
                    flex
                    items-center
                    justify-center
                    text-lg
                    ${iconClass}
                `}>

                    {icon}

                </div>

            </div>


            <h2 className="
                text-3xl
                font-bold
                text-gray-900
                mt-4
            ">

                {value}

            </h2>

        </div>

    );
};


// ==========================================
// MANAGEMENT CARD
// ==========================================

const ManagementCard = ({
    icon,
    title,
    description,
    iconClass
}) => {

    return (

        <div className="
            rounded-xl
            bg-gray-50
            border
            border-gray-100
            p-5
            hover:shadow-sm
            transition
        ">

            <div className={`
                w-10
                h-10
                rounded-lg
                flex
                items-center
                justify-center
                mb-4
                ${iconClass}
            `}>

                {icon}

            </div>

            <h3 className="
                font-semibold
                text-gray-900
            ">
                {title}
            </h3>

            <p className="
                text-sm
                text-gray-500
                mt-1
            ">
                {description}
            </p>

        </div>

    );
};


export default HrDashboard;