import { useEffect, useState } from "react";

import {
    FaCalendarCheck,
    FaClock,
    FaUsers,
    FaSearch
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import { getAllAttendance } from "../../api/attendanceApi";


const AttendanceManagement = () => {

    const [attendance, setAttendance] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");


    // =========================================
    // LOAD ALL ATTENDANCE
    // =========================================

    const loadAttendance = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getAllAttendance();

            console.log("All attendance:", response);

            setAttendance(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to load attendance:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load attendance."
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        loadAttendance();

    }, []);


    // =========================================
    // FORMAT DATE
    // =========================================

    const formatDate = (date) => {

        if (!date) {
            return "--";
        }

        try {

            const [
                year,
                month,
                day
            ] = date.split("-");

            const localDate = new Date(
                Number(year),
                Number(month) - 1,
                Number(day)
            );

            return localDate.toLocaleDateString(
                "en-IN",
                {
                    day: "2-digit",
                    month: "short",
                    year: "numeric"
                }
            );

        } catch {

            return date;

        }
    };


    // =========================================
    // FORMAT TIME
    // =========================================

    const formatTime = (time) => {

        if (!time) {
            return "--";
        }

        try {

            const [
                hours,
                minutes
            ] = time.split(":");

            const date = new Date();

            date.setHours(
                Number(hours),
                Number(minutes),
                0
            );

            return date.toLocaleTimeString(
                "en-IN",
                {
                    hour: "2-digit",
                    minute: "2-digit"
                }
            );

        } catch {

            return time;

        }
    };


    // =========================================
    // FORMAT WORKING HOURS
    // =========================================

    const formatWorkingHours = (hours) => {

        if (
            hours === null ||
            hours === undefined
        ) {
            return "--";
        }

        return `${Number(hours).toFixed(2)} hrs`;
    };


    // =========================================
    // FILTER
    // =========================================

    const filteredAttendance =
        attendance.filter((item) => {

            const searchValue =
                search.toLowerCase();

            return (

                String(
                    item.employeeName || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(
                    item.employeeId || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(
                    item.attendanceDate || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    return (

        <Layout>

            <div className="space-y-6">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div>

                    <p className="text-blue-600 font-medium">
                        Human Resources
                    </p>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                        mt-1
                    ">
                        Attendance Management
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Monitor employee attendance and working hours
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
                    SUMMARY
                ===================================== */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-5
                ">


                    {/* TOTAL RECORDS */}

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
                                    Total Records
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {attendance.length}
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

                                <FaCalendarCheck />

                            </div>

                        </div>

                    </div>


                    {/* PRESENT */}

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
                                    Present
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">

                                    {
                                        attendance.filter(
                                            item =>
                                                item.status ===
                                                "PRESENT"
                                        ).length
                                    }

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

                                <FaUsers />

                            </div>

                        </div>

                    </div>


                    {/* WORKING HOURS */}

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
                                    Total Working Hours
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">

                                    {
                                        attendance
                                            .reduce(
                                                (
                                                    total,
                                                    item
                                                ) =>
                                                    total +
                                                    Number(
                                                        item.workingHours ||
                                                        0
                                                    ),
                                                0
                                            )
                                            .toFixed(2)
                                    }

                                    <span className="
                                        text-base
                                        font-medium
                                        text-gray-500
                                        ml-1
                                    ">
                                        hrs
                                    </span>

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

                                <FaClock />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    ATTENDANCE TABLE
                ===================================== */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                ">


                    {/* TABLE HEADER */}

                    <div className="
                        px-6
                        py-5
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
                                Employee Attendance
                            </h2>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                View all employee attendance records
                            </p>

                        </div>


                        {/* SEARCH */}

                        <div className="
                            relative
                            w-full
                            md:w-72
                        ">

                            <FaSearch className="
                                absolute
                                left-3
                                top-1/2
                                -translate-y-1/2
                                text-gray-400
                            " />

                            <input
                                type="text"
                                placeholder="
                                    Search employee...
                                "
                                value={search}
                                onChange={(e) =>
                                    setSearch(
                                        e.target.value
                                    )
                                }
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    pl-10
                                    pr-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                    </div>


                    {/* =====================================
                        LOADING
                    ===================================== */}

                    {loading ? (

                        <div className="
                            flex
                            justify-center
                            py-20
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

                    ) : filteredAttendance.length === 0 ? (

                        /* =================================
                           EMPTY
                        ================================= */

                        <div className="
                            text-center
                            py-20
                            text-gray-500
                        ">

                            <FaCalendarCheck className="
                                mx-auto
                                text-5xl
                                text-gray-300
                            " />

                            <p className="mt-4">
                                No attendance records found.
                            </p>

                        </div>

                    ) : (

                        /* =================================
                           TABLE
                        ================================= */

                        <div className="overflow-x-auto">

                            <table className="
                                w-full
                                min-w-[900px]
                            ">

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
                                            font-bold
                                            text-gray-500
                                            uppercase
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
                                        ">
                                            Date
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Check In
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Check Out
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Working Hours
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="
                                    divide-y
                                    divide-gray-100
                                ">

                                    {[...filteredAttendance]
                                        .sort(
                                            (a, b) =>
                                                new Date(
                                                    b.attendanceDate
                                                ) -
                                                new Date(
                                                    a.attendanceDate
                                                )
                                        )
                                        .map((item) => (

                                            <tr
                                                key={item.id}
                                                className="
                                                    hover:bg-gray-50
                                                    transition
                                                "
                                            >

                                                {/* EMPLOYEE */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div className="
                                                        font-semibold
                                                        text-gray-900
                                                    ">
                                                        {
                                                            item.employeeName ||
                                                            item.employee?.name ||
                                                            item.employee?.username ||
                                                            "--"
                                                        }
                                                    </div>

                                                    <div className="
                                                        text-sm
                                                        text-gray-500
                                                    ">
                                                        ID: {
                                                            item.employeeId ||
                                                            item.employee?.id ||
                                                            "--"
                                                        }
                                                    </div>

                                                </td>


                                                {/* DATE */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-gray-700
                                                ">

                                                    {
                                                        formatDate(
                                                            item.attendanceDate
                                                        )
                                                    }

                                                </td>


                                                {/* CHECK IN */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-gray-700
                                                ">

                                                    {
                                                        formatTime(
                                                            item.checkInTime
                                                        )
                                                    }

                                                </td>


                                                {/* CHECK OUT */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-gray-700
                                                ">

                                                    {
                                                        formatTime(
                                                            item.checkOutTime
                                                        )
                                                    }

                                                </td>


                                                {/* WORKING HOURS */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    font-semibold
                                                    text-gray-800
                                                ">

                                                    {
                                                        formatWorkingHours(
                                                            item.workingHours
                                                        )
                                                    }

                                                </td>


                                                {/* STATUS */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <span
                                                        className={`
                                                            inline-flex
                                                            items-center
                                                            gap-2
                                                            px-3
                                                            py-1.5
                                                            rounded-full
                                                            text-sm
                                                            font-semibold

                                                            ${
                                                                item.status ===
                                                                "PRESENT"

                                                                    ? "bg-green-50 text-green-700"

                                                                    : item.status ===
                                                                      "HALF_DAY"

                                                                    ? "bg-yellow-50 text-yellow-700"

                                                                    : item.status ===
                                                                      "LEAVE"

                                                                    ? "bg-blue-50 text-blue-700"

                                                                    : "bg-red-50 text-red-700"
                                                            }
                                                        `}
                                                    >

                                                        <span className="
                                                            w-2
                                                            h-2
                                                            rounded-full
                                                            bg-current
                                                        " />

                                                        {
                                                            item.status ||
                                                            "--"
                                                        }

                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>

            </div>

        </Layout>

    );

};


export default AttendanceManagement;