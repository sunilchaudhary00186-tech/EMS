import {
    FaTachometerAlt,
    FaUsers,
    FaBuilding,
    FaCalendarCheck,
    FaClipboardList,
    FaMoneyCheckAlt,
    FaChartBar,
    FaStar,
    FaArrowUp,
    FaUser,
    FaSignOutAlt
} from "react-icons/fa";

import {
    NavLink,
    useNavigate
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";


function Sidebar() {

    const { auth } = useAuth();

    const navigate = useNavigate();

    const role = auth?.role;


    // =====================================
    // LOGOUT
    // =====================================

    const handleLogout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("username");
        localStorage.removeItem("name");

        navigate("/");
    };


    return (

        <aside
            className="
                w-64
                h-screen
                bg-slate-900
                text-white
                fixed
                left-0
                top-0
                flex
                flex-col
            "
        >

            {/* =====================================
                LOGO
            ===================================== */}

            <div className="p-6">

                <h1
                    className="
                        text-2xl
                        font-bold
                    "
                >
                    EMS
                </h1>

                <p
                    className="
                        text-sm
                        text-gray-400
                        mt-1
                    "
                >
                    Employee Management
                </p>

            </div>


            {/* =====================================
                NAVIGATION
            ===================================== */}

            <nav
                className="
                    mt-6
                    flex-1
                "
            >

                {/* =================================
                    DASHBOARD
                ================================= */}

                <NavItem
                    icon={<FaTachometerAlt />}
                    title="Dashboard"
                    path="/dashboard"
                />


                {/* =================================
                    ADMIN + HR
                ================================= */}

                {(role === "ADMIN" || role === "HR") && (

                    <>

                        <NavItem
                            icon={<FaUsers />}
                            title="Employees"
                            path="/employees"
                        />

                        <NavItem
                            icon={<FaBuilding />}
                            title="Departments"
                            path="/departments"
                        />

                        <NavItem
                            icon={<FaCalendarCheck />}
                            title="Attendance"
                            path="/attendance"
                        />

                        {/* LEAVES */}

                        <NavItem
                            icon={<FaClipboardList />}
                            title="Leaves"
                            path="/leaves"
                        />

                        <NavItem
                            icon={<FaMoneyCheckAlt />}
                            title="Payroll"
                            path="/payroll"
                        />

                        <NavItem
                            icon={<FaChartBar />}
                            title="Reports"
                            path="/reports"
                        />

                        <NavItem
                            icon={<FaStar />}
                            title="Performance"
                            path="/performance"
                        />

                        <NavItem
                            icon={<FaArrowUp />}
                            title="Promotions"
                            path="/promotions"
                        />

                       

                    </>

                )}


                {/* =================================
                    EMPLOYEE
                ================================= */}

                {role === "EMPLOYEE" && (

                    <>

                        <NavItem
                            icon={<FaCalendarCheck />}
                            title="My Attendance"
                            path="/attendance"
                        />

                        {/* MY LEAVE */}

                        <NavItem
                            icon={<FaClipboardList />}
                            title="My Leave"
                            path="/leaves"
                        />

<NavItem
                            icon={<FaMoneyCheckAlt />}
                            title="My Payslip"
                            path="/my-payslip"
                        />
                        <NavItem
                            icon={<FaUser />}
                            title="My Profile"
                            path="/profile"
                        />


                         

                    </>

                )}

            </nav>


            {/* =====================================
                LOGOUT
            ===================================== */}

            <div
                className="
                    pb-5
                    w-full
                "
            >

                <button
                    type="button"
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-4
                        px-6
                        py-4
                        w-full
                        hover:bg-slate-800
                        transition
                    "
                >

                    <FaSignOutAlt />

                    <span>
                        Logout
                    </span>

                </button>

            </div>

        </aside>

    );

}


// =========================================
// NAV ITEM
// =========================================

function NavItem({
    icon,
    title,
    path
}) {

    return (

        <NavLink
            to={path}

            className={({ isActive }) => `

                flex
                items-center
                gap-4
                px-6
                py-4
                transition

                ${
                    isActive
                        ? "bg-blue-600"
                        : "hover:bg-slate-800"
                }

            `}
        >

            <span className="text-lg">
                {icon}
            </span>

            <span>
                {title}
            </span>

        </NavLink>

    );

}


export default Sidebar;