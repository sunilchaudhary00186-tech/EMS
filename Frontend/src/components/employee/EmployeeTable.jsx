import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaEye,
    FaEdit,
    FaTrash,
    FaUserTie,
    FaEnvelope,
    FaMapMarkerAlt,
    FaBuilding,
    FaSearch,
    FaTimes,
} from "react-icons/fa";

const EmployeeTable = ({ employees, onDelete }) => {

    const navigate = useNavigate();

    const [search, setSearch] = useState("");


    // =========================
    // SEARCH EMPLOYEES
    // =========================

    const filteredEmployees = useMemo(() => {

        const value = search.toLowerCase().trim();

        if (!value) {
            return employees || [];
        }

        return (employees || []).filter((employee) => {

            const fullName =
                `${employee.firstName || ""} ${employee.lastName || ""}`
                    .toLowerCase();

            return (
                fullName.includes(value) ||
                employee.employeeCode
                    ?.toLowerCase()
                    .includes(value) ||
                employee.email
                    ?.toLowerCase()
                    .includes(value) ||
                employee.departmentName
                    ?.toLowerCase()
                    .includes(value) ||
                employee.designation
                    ?.toLowerCase()
                    .includes(value) ||
                employee.address
                    ?.toLowerCase()
                    .includes(value) ||
                employee.phoneNumber
                    ?.toLowerCase()
                    .includes(value)
            );
        });

    }, [employees, search]);


    // =========================
    // EMPTY EMPLOYEE LIST
    // =========================

    if (!employees || employees.length === 0) {

        return (
            <div className="
                bg-white
                rounded-2xl
                border
                border-gray-200
                shadow-sm
                p-12
                text-center
            ">

                <div className="
                    w-20
                    h-20
                    mx-auto
                    rounded-full
                    bg-blue-50
                    flex
                    items-center
                    justify-center
                    mb-5
                ">

                    <FaUserTie className="
                        text-3xl
                        text-blue-500
                    " />

                </div>

                <h3 className="
                    text-xl
                    font-bold
                    text-gray-800
                ">

                    No Employees Found

                </h3>

                <p className="
                    text-gray-500
                    mt-2
                ">

                    Start building your team by adding an employee.

                </p>

            </div>
        );
    }


    // =========================
    // VIEW
    // =========================

    const handleView = (id) => {

        navigate(`/employees/view/${id}`);

    };


    // =========================
    // EDIT
    // =========================

    const handleEdit = (id) => {

        navigate(`/employees/edit/${id}`);

    };


    // =========================
    // DELETE
    // =========================

    const handleDelete = (id) => {

        const employee = employees.find(
            (emp) => emp.id === id
        );

        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${employee?.firstName || "this employee"}?`
        );

        if (confirmDelete && onDelete) {

            onDelete(id);

        }

    };


    // =========================
    // INITIALS
    // =========================

    const getInitials = (employee) => {

        const first =
            employee.firstName
                ?.charAt(0)
                ?.toUpperCase() || "";

        const last =
            employee.lastName
                ?.charAt(0)
                ?.toUpperCase() || "";

        return first + last;

    };


    return (

        <div className="
            bg-white
            rounded-2xl
            border
            border-gray-200
            shadow-sm
            overflow-hidden
        ">

            {/* =========================
                TABLE HEADER
            ========================= */}

            <div className="
                px-6
                py-5
                border-b
                border-gray-200
                flex
                flex-col
                lg:flex-row
                lg:items-center
                lg:justify-between
                gap-4
            ">

                {/* TITLE */}

                <div>

                    <h2 className="
                        text-lg
                        font-bold
                        text-gray-800
                    ">

                        Employee Directory

                    </h2>

                    <p className="
                        text-sm
                        text-gray-500
                        mt-1
                    ">

                        Manage and monitor your employees

                    </p>

                </div>


                {/* SEARCH + COUNT */}

                <div className="
                    flex
                    flex-col
                    sm:flex-row
                    items-stretch
                    sm:items-center
                    gap-3
                ">

                    {/* SEARCH BAR */}

                    <div className="
                        relative
                        w-full
                        sm:w-80
                    ">

                        <FaSearch className="
                            absolute
                            left-4
                            top-1/2
                            -translate-y-1/2
                            text-gray-400
                        " />

                        <input
                            type="text"
                            value={search}
                            onChange={(e) =>
                                setSearch(e.target.value)
                            }
                            placeholder="
                                Search name, code, email...
                            "
                            className="
                                w-full
                                pl-11
                                pr-10
                                py-2.5
                                bg-gray-50
                                border
                                border-gray-200
                                rounded-xl
                                text-sm
                                outline-none
                                transition
                                focus:bg-white
                                focus:border-blue-500
                                focus:ring-2
                                focus:ring-blue-100
                            "
                        />


                        {/* CLEAR SEARCH */}

                        {search && (

                            <button
                                type="button"
                                onClick={() => setSearch("")}
                                title="Clear search"
                                className="
                                    absolute
                                    right-3
                                    top-1/2
                                    -translate-y-1/2
                                    text-gray-400
                                    hover:text-gray-700
                                    transition
                                "
                            >

                                <FaTimes />

                            </button>

                        )}

                    </div>


                    {/* COUNT */}

                    <div className="
                        px-3
                        py-2
                        rounded-full
                        bg-blue-50
                        text-blue-600
                        text-sm
                        font-semibold
                        text-center
                        whitespace-nowrap
                    ">

                        {filteredEmployees.length}{" "}
                        {filteredEmployees.length === 1
                            ? "Employee"
                            : "Employees"}

                    </div>

                </div>

            </div>


            {/* =========================
                SEARCH RESULT MESSAGE
            ========================= */}

            {search && (

                <div className="
                    px-6
                    py-3
                    bg-blue-50/50
                    border-b
                    border-blue-100
                    text-sm
                    text-gray-600
                ">

                    Showing results for{" "}
                    <span className="
                        font-semibold
                        text-blue-600
                    ">
                        "{search}"
                    </span>

                </div>

            )}


            {/* =========================
                NO SEARCH RESULTS
            ========================= */}

            {filteredEmployees.length === 0 ? (

                <div className="
                    py-16
                    px-6
                    text-center
                ">

                    <div className="
                        w-16
                        h-16
                        mx-auto
                        rounded-2xl
                        bg-gray-100
                        flex
                        items-center
                        justify-center
                        text-gray-400
                        text-2xl
                    ">

                        <FaSearch />

                    </div>

                    <h3 className="
                        mt-4
                        text-lg
                        font-semibold
                        text-gray-800
                    ">

                        No employees found

                    </h3>

                    <p className="
                        mt-1
                        text-gray-500
                    ">

                        Try searching by name, employee code,
                        department or email.

                    </p>

                    <button
                        type="button"
                        onClick={() => setSearch("")}
                        className="
                            mt-4
                            px-4
                            py-2
                            rounded-lg
                            bg-blue-600
                            text-white
                            text-sm
                            font-medium
                            hover:bg-blue-700
                            transition
                        "
                    >

                        Clear Search

                    </button>

                </div>

            ) : (

                /* =========================
                   TABLE
                ========================= */

                <div className="overflow-x-auto">

                    <table className="
                        w-full
                        min-w-[1100px]
                    ">

                        <thead>

                            <tr className="
                                bg-gray-50
                                border-b
                                border-gray-200
                            ">

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Employee

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Code

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Department

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Designation

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Salary

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Location

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-left
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Status

                                </th>

                                <th className="
                                    px-6
                                    py-4
                                    text-center
                                    text-xs
                                    font-bold
                                    text-gray-500
                                    uppercase
                                    tracking-wider
                                ">

                                    Actions

                                </th>

                            </tr>

                        </thead>


                        <tbody className="
                            divide-y
                            divide-gray-100
                        ">

                            {filteredEmployees.map(
                                (employee) => (

                                    <tr
                                        key={employee.id}
                                        className="
                                            group
                                            hover:bg-blue-50/40
                                            transition
                                            duration-200
                                        "
                                    >

                                        {/* EMPLOYEE */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-4
                                            ">

                                                <div className="relative">

                                                    <div className="
                                                        w-11
                                                        h-11
                                                        rounded-xl
                                                        bg-gradient-to-br
                                                        from-blue-500
                                                        to-indigo-600
                                                        text-white
                                                        flex
                                                        items-center
                                                        justify-center
                                                        font-bold
                                                        shadow-sm
                                                    ">

                                                        {getInitials(
                                                            employee
                                                        )}

                                                    </div>

                                                    <span
                                                        className={`
                                                            absolute
                                                            -bottom-1
                                                            -right-1
                                                            w-3.5
                                                            h-3.5
                                                            rounded-full
                                                            border-2
                                                            border-white
                                                            ${
                                                                employee.active
                                                                    ? "bg-green-500"
                                                                    : "bg-gray-400"
                                                            }
                                                        `}
                                                    />

                                                </div>


                                                <div className="
                                                    min-w-0
                                                ">

                                                    <p className="
                                                        font-semibold
                                                        text-gray-800
                                                        truncate
                                                    ">

                                                        {
                                                            employee.firstName
                                                        }{" "}

                                                        {
                                                            employee.lastName
                                                        }

                                                    </p>

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-1
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">

                                                        <FaEnvelope className="
                                                            text-xs
                                                        " />

                                                        <span className="
                                                            truncate
                                                        ">

                                                            {
                                                                employee.email
                                                            }

                                                        </span>

                                                    </div>

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
                                                items-center
                                                px-3
                                                py-1.5
                                                rounded-lg
                                                bg-blue-50
                                                text-blue-700
                                                font-semibold
                                                text-sm
                                            ">

                                                {
                                                    employee.employeeCode ||
                                                    "N/A"
                                                }

                                            </span>

                                        </td>


                                        {/* DEPARTMENT */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                text-gray-700
                                            ">

                                                <div className="
                                                    w-8
                                                    h-8
                                                    rounded-lg
                                                    bg-purple-50
                                                    flex
                                                    items-center
                                                    justify-center
                                                ">

                                                    <FaBuilding className="
                                                        text-purple-500
                                                        text-sm
                                                    " />

                                                </div>

                                                <span className="
                                                    font-medium
                                                ">

                                                    {
                                                        employee.departmentName ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </div>

                                        </td>


                                        {/* DESIGNATION */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            <span className="
                                                text-gray-700
                                                font-medium
                                            ">

                                                {
                                                    employee.designation ||
                                                    "N/A"
                                                }

                                            </span>

                                        </td>


                                        {/* SALARY */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            <span className="
                                                font-bold
                                                text-gray-800
                                            ">

                                                ₹
                                                {Number(
                                                    employee.salary || 0
                                                ).toLocaleString(
                                                    "en-IN"
                                                )}

                                            </span>

                                            <p className="
                                                text-xs
                                                text-gray-400
                                                mt-1
                                            ">

                                                Annual salary

                                            </p>

                                        </td>


                                        {/* ADDRESS */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            <div className="
                                                flex
                                                items-center
                                                gap-2
                                                text-gray-600
                                            ">

                                                <FaMapMarkerAlt className="
                                                    text-red-400
                                                " />

                                                <span>

                                                    {
                                                        employee.address ||
                                                        "N/A"
                                                    }

                                                </span>

                                            </div>

                                        </td>


                                        {/* STATUS */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            {employee.active ? (

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    bg-green-50
                                                    text-green-700
                                                    border
                                                    border-green-100
                                                    text-sm
                                                    font-semibold
                                                ">

                                                    <span className="
                                                        w-2
                                                        h-2
                                                        rounded-full
                                                        bg-green-500
                                                    " />

                                                    Active

                                                </span>

                                            ) : (

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    px-3
                                                    py-1.5
                                                    rounded-full
                                                    bg-red-50
                                                    text-red-700
                                                    border
                                                    border-red-100
                                                    text-sm
                                                    font-semibold
                                                ">

                                                    <span className="
                                                        w-2
                                                        h-2
                                                        rounded-full
                                                        bg-red-500
                                                    " />

                                                    Inactive

                                                </span>

                                            )}

                                        </td>


                                        {/* ACTIONS */}

                                        <td className="
                                            px-6
                                            py-5
                                        ">

                                            <div className="
                                                flex
                                                justify-center
                                                gap-2
                                            ">

                                                {/* VIEW */}

                                                <button
                                                    type="button"
                                                    title="View Employee"
                                                    onClick={() =>
                                                        handleView(
                                                            employee.id
                                                        )
                                                    }
                                                    className="
                                                        w-9
                                                        h-9
                                                        rounded-lg
                                                        bg-blue-50
                                                        text-blue-600
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-blue-600
                                                        hover:text-white
                                                        hover:scale-105
                                                        transition
                                                        duration-200
                                                    "
                                                >

                                                    <FaEye />

                                                </button>


                                                {/* EDIT */}

                                                <button
                                                    type="button"
                                                    title="Edit Employee"
                                                    onClick={() =>
                                                        handleEdit(
                                                            employee.id
                                                        )
                                                    }
                                                    className="
                                                        w-9
                                                        h-9
                                                        rounded-lg
                                                        bg-amber-50
                                                        text-amber-600
                                                        flex
                                                        items-center
                                                        justify-center
                                                        hover:bg-amber-500
                                                        hover:text-white
                                                        hover:scale-105
                                                        transition
                                                        duration-200
                                                    "
                                                >

                                                    <FaEdit />

                                                </button>


                                                {/* DELETE */}

                                                {onDelete && (

                                                    <button
                                                        type="button"
                                                        title="Delete Employee"
                                                        onClick={() =>
                                                            handleDelete(
                                                                employee.id
                                                            )
                                                        }
                                                        className="
                                                            w-9
                                                            h-9
                                                            rounded-lg
                                                            bg-red-50
                                                            text-red-600
                                                            flex
                                                            items-center
                                                            justify-center
                                                            hover:bg-red-600
                                                            hover:text-white
                                                            hover:scale-105
                                                            transition
                                                            duration-200
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
    );
};

export default EmployeeTable;