import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaPlus,
    FaSearch,
    FaBuilding,
    FaUsers,
    FaEdit,
    FaTrash,
    FaEye
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    getAllDepartments,
    deleteDepartment
} from "../../services/departmentService";


const DepartmentList = () => {

    const navigate = useNavigate();

    // =========================
    // USER ROLE
    // =========================

    const getUserRole = () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            return user?.role || "";
        } catch {
            return "";
        }
    };

    const userRole = getUserRole();

    const isAdmin = userRole === "ADMIN";


    // =========================
    // STATE
    // =========================

    const [departments, setDepartments] = useState([]);

    const [search, setSearch] = useState("");

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================
    // LOAD DEPARTMENTS
    // =========================

    const loadDepartments = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllDepartments();

            console.log("Departments:", data);

            setDepartments(data);

        } catch (error) {

            console.error(
                "Failed to load departments:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load departments."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadDepartments();

    }, []);


    // =========================
    // DELETE DEPARTMENT
    // =========================

    const handleDelete = async (
        id,
        departmentName
    ) => {

        // Extra frontend security
        if (!isAdmin) {
            alert(
                "You do not have permission to delete departments."
            );
            return;
        }

        const confirmed = window.confirm(
            `Are you sure you want to delete "${departmentName}"?`
        );

        if (!confirmed) {
            return;
        }

        try {

            await deleteDepartment(id);

            alert(
                "Department deleted successfully."
            );

            await loadDepartments();

        } catch (error) {

            console.error(
                "Delete department failed:",
                error
            );

            alert(
                error.response?.data?.message ||
                "Failed to delete department."
            );
        }
    };


    // =========================
    // SEARCH
    // =========================

    const filteredDepartments =
        departments.filter((department) => {

            const value =
                search.toLowerCase().trim();

            return (
                department.departmentName
                    ?.toLowerCase()
                    .includes(value) ||

                department.departmentCode
                    ?.toLowerCase()
                    .includes(value) ||

                department.description
                    ?.toLowerCase()
                    .includes(value)
            );
        });


    // =========================
    // STATS
    // =========================

    const totalDepartments =
        departments.length;

    const totalEmployees =
        departments.reduce(
            (total, department) =>
                total +
                (department.totalEmployees || 0),
            0
        );


    return (

        <Layout>

            <div className="space-y-6">

                {/* ================= HEADER ================= */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                ">

                    <div>

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-2xl
                                bg-blue-600
                                text-white
                                flex
                                items-center
                                justify-center
                                shadow-lg
                                shadow-blue-200
                            ">

                                <FaBuilding />

                            </div>

                            <div>

                                <h1 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                ">

                                    Departments

                                </h1>

                                <p className="
                                    text-gray-500
                                    mt-1
                                ">

                                    Manage your organization's departments

                                </p>

                            </div>

                        </div>

                    </div>


                    {/* ADMIN ONLY */}

                        <button
                            onClick={() =>
                                navigate(
                                    "/departments/add"
                                )
                            }
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                bg-blue-600
                                hover:bg-blue-700
                                text-white
                                px-5
                                py-3
                                rounded-xl
                                font-semibold
                                shadow-lg
                                shadow-blue-100
                                hover:-translate-y-0.5
                                transition-all
                            "
                        >

                            <FaPlus />

                            Add Department

                        </button>


                </div>


                {/* ================= STATS ================= */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    gap-5
                ">

                    {/* TOTAL DEPARTMENTS */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                        flex
                        items-center
                        justify-between
                        hover:shadow-md
                        transition
                    ">

                        <div>

                            <p className="
                                text-sm
                                font-medium
                                text-gray-500
                            ">

                                Total Departments

                            </p>

                            <h2 className="
                                text-3xl
                                font-bold
                                text-gray-900
                                mt-2
                            ">

                                {totalDepartments}

                            </h2>

                            <p className="
                                text-sm
                                text-blue-600
                                mt-2
                            ">

                                Organization structure

                            </p>

                        </div>


                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-blue-50
                            text-blue-600
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">

                            <FaBuilding />

                        </div>

                    </div>


                    {/* TOTAL EMPLOYEES */}

                    <div className="
                        bg-white
                        rounded-2xl
                        border
                        border-gray-100
                        shadow-sm
                        p-6
                        flex
                        items-center
                        justify-between
                        hover:shadow-md
                        transition
                    ">

                        <div>

                            <p className="
                                text-sm
                                font-medium
                                text-gray-500
                            ">

                                Employees Across Departments

                            </p>

                            <h2 className="
                                text-3xl
                                font-bold
                                text-gray-900
                                mt-2
                            ">

                                {totalEmployees}

                            </h2>

                            <p className="
                                text-sm
                                text-green-600
                                mt-2
                            ">

                                Workforce distribution

                            </p>

                        </div>


                        <div className="
                            w-14
                            h-14
                            rounded-2xl
                            bg-green-50
                            text-green-600
                            flex
                            items-center
                            justify-center
                            text-2xl
                        ">

                            <FaUsers />

                        </div>

                    </div>

                </div>


                {/* ================= MAIN CARD ================= */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                ">

                    {/* CARD HEADER */}

                    <div className="
                        p-6
                        border-b
                        border-gray-100
                        flex
                        flex-col
                        md:flex-row
                        md:items-center
                        md:justify-between
                        gap-4
                    ">

                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                                text-gray-900
                            ">

                                Department Directory

                            </h2>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">

                                View and manage all departments

                            </p>

                        </div>


                        {/* SEARCH */}

                        <div className="
                            relative
                            w-full
                            md:w-80
                        ">

                            <FaSearch
                                className="
                                    absolute
                                    left-4
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                "
                            />

                            <input
                                type="text"
                                placeholder="Search departments..."
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    pl-11
                                    pr-4
                                    py-3
                                    bg-gray-50
                                    border
                                    border-gray-200
                                    rounded-xl
                                    outline-none
                                    focus:bg-white
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-transparent
                                    transition
                                "
                            />

                        </div>

                    </div>


                    {/* ================= ERROR ================= */}

                    {error && (

                        <div className="
                            m-6
                            p-4
                            rounded-xl
                            bg-red-50
                            border
                            border-red-100
                            text-red-600
                            text-sm
                            font-medium
                        ">

                            {error}

                        </div>

                    )}


                    {/* ================= LOADING ================= */}

                    {loading ? (

                        <div className="
                            flex
                            flex-col
                            justify-center
                            items-center
                            py-20
                            text-gray-500
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

                            <p className="mt-4 text-sm">

                                Loading departments...

                            </p>

                        </div>

                    ) : filteredDepartments.length === 0 ? (

                        <div className="
                            text-center
                            py-20
                            px-6
                        ">

                            <div className="
                                mx-auto
                                w-16
                                h-16
                                rounded-2xl
                                bg-gray-100
                                flex
                                items-center
                                justify-center
                                text-gray-400
                                text-2xl
                            ">

                                <FaBuilding />

                            </div>

                            <h3 className="
                                text-lg
                                font-semibold
                                text-gray-800
                                mt-4
                            ">

                                No departments found

                            </h3>

                            <p className="
                                text-gray-500
                                mt-1
                            ">

                                Try another search or create
                                a new department.

                            </p>

                            {isAdmin && (

                                <button
                                    onClick={() =>
                                        navigate(
                                            "/departments/add"
                                        )
                                    }
                                    className="
                                        mt-5
                                        inline-flex
                                        items-center
                                        gap-2
                                        px-4
                                        py-2.5
                                        rounded-lg
                                        bg-blue-600
                                        text-white
                                        font-medium
                                        hover:bg-blue-700
                                        transition
                                    "
                                >

                                    <FaPlus />

                                    Add Department

                                </button>

                            )}

                        </div>

                    ) : (

                        /* ================= TABLE ================= */

                        <div className="overflow-x-auto">

                            <table className="w-full">

                                <thead>

                                    <tr className="
                                        bg-gray-50
                                        border-b
                                        border-gray-100
                                    ">

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wide
                                        ">

                                            Department

                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wide
                                        ">

                                            Code

                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wide
                                        ">

                                            Description

                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-center
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wide
                                        ">

                                            Employees

                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-right
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                            tracking-wide
                                        ">

                                            Actions

                                        </th>

                                    </tr>

                                </thead>


                                <tbody>

                                    {filteredDepartments.map(
                                        (department) => (

                                            <tr
                                                key={department.id}
                                                className="
                                                    border-b
                                                    border-gray-100
                                                    hover:bg-blue-50/40
                                                    transition
                                                    group
                                                "
                                            >

                                                {/* DEPARTMENT */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                ">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-4
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
                                                            text-lg
                                                            group-hover:bg-blue-100
                                                            transition
                                                        ">

                                                            <FaBuilding />

                                                        </div>


                                                        <div>

                                                            <p className="
                                                                font-semibold
                                                                text-gray-900
                                                            ">

                                                                {
                                                                    department.departmentName
                                                                }

                                                            </p>

                                                            <p className="
                                                                text-xs
                                                                text-gray-400
                                                                mt-1
                                                            ">

                                                                ID #
                                                                {department.id}

                                                            </p>

                                                        </div>

                                                    </div>

                                                </td>


                                                {/* CODE */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                ">

                                                    <span className="
                                                        inline-flex
                                                        px-3
                                                        py-1.5
                                                        rounded-lg
                                                        bg-blue-50
                                                        text-blue-700
                                                        font-semibold
                                                        text-sm
                                                    ">

                                                        {
                                                            department.departmentCode
                                                        }

                                                    </span>

                                                </td>


                                                {/* DESCRIPTION */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                ">

                                                    <p className="
                                                        text-sm
                                                        text-gray-600
                                                        max-w-xs
                                                        truncate
                                                    ">

                                                        {
                                                            department.description ||
                                                            "No description"
                                                        }

                                                    </p>

                                                </td>


                                                {/* EMPLOYEES */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                    text-center
                                                ">

                                                    <span className="
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        bg-purple-50
                                                        text-purple-700
                                                        font-semibold
                                                        text-sm
                                                    ">

                                                        <FaUsers />

                                                        {
                                                            department.totalEmployees ||
                                                            0
                                                        }

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                ">

                                                    <div className="
                                                        flex
                                                        justify-end
                                                        gap-2
                                                    ">

                                                        {/* VIEW */}

                                                        <button
                                                            onClick={() =>
                                                                navigate(
                                                                    `/departments/${department.id}`
                                                                )
                                                            }
                                                            title="View Department"
                                                            className="
                                                                w-9
                                                                h-9
                                                                rounded-lg
                                                                bg-blue-50
                                                                text-blue-600
                                                                flex
                                                                items-center
                                                                justify-center
                                                                hover:bg-blue-100
                                                                hover:scale-105
                                                                transition
                                                            "
                                                        >

                                                            <FaEye />

                                                        </button>


                                                        {/* EDIT */}


                                                            <button
                                                                onClick={() =>
                                                                    navigate(
                                                                        `/departments/edit/${department.id}`
                                                                    )
                                                                }
                                                                title="Edit Department"
                                                                className="
                                                                    w-9
                                                                    h-9
                                                                    rounded-lg
                                                                    bg-amber-50
                                                                    text-amber-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    hover:bg-amber-100
                                                                    hover:scale-105
                                                                    transition
                                                                "
                                                            >

                                                                <FaEdit />

                                                            </button>


                                                        {/* DELETE ADMIN ONLY */}

                                                        {isAdmin && (

                                                            <button
                                                                onClick={() =>
                                                                    handleDelete(
                                                                        department.id,
                                                                        department.departmentName
                                                                    )
                                                                }
                                                                title="Delete Department"
                                                                className="
                                                                    w-9
                                                                    h-9
                                                                    rounded-lg
                                                                    bg-red-50
                                                                    text-red-600
                                                                    flex
                                                                    items-center
                                                                    justify-center
                                                                    hover:bg-red-100
                                                                    hover:scale-105
                                                                    transition
                                                                "
                                                            >

                                                                <FaTrash />

                                                            </button>

                                                        )}

                                                    </div>

                                                </td>

                                            </tr>

                                        )
                                    )}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </Layout>
    );
};


export default DepartmentList;