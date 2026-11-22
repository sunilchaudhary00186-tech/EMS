import { useEffect, useState } from "react";

import {
    FaCalendarCheck,
    FaClock,
    FaSignInAlt,
    FaSignOutAlt,
    FaCheckCircle,
    FaHourglassHalf
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    checkIn,
    checkOut,
    getMyAttendance
} from "../../api/attendanceApi";


const MyAttendance = () => {

    const [attendance, setAttendance] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(false);
    const [error, setError] = useState("");
    const [message, setMessage] = useState("");


    // =========================================
    // LOAD MY ATTENDANCE
    // =========================================

    const loadAttendance = async () => {

        try {

            setLoading(true);
            setError("");

            const response = await getMyAttendance();

            console.log("My attendance:", response);

            // Backend returns List<AttendanceResponseDTO>
            setAttendance(
                Array.isArray(response) ? response : []
            );

        } catch (err) {

            console.error("Failed to load attendance:", err);

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
    // TODAY DATE
    // =========================================

    const getToday = () => {

        const now = new Date();

        const year = now.getFullYear();

        const month = String(
            now.getMonth() + 1
        ).padStart(2, "0");

        const day = String(
            now.getDate()
        ).padStart(2, "0");

        return `${year}-${month}-${day}`;
    };


    const today = getToday();


    // =========================================
    // TODAY ATTENDANCE
    // =========================================

    const todayAttendance = attendance.find(
        (item) =>
            item.attendanceDate === today
    );


    // =========================================
    // CHECK IN
    // =========================================

    const handleCheckIn = async () => {

        try {

            setActionLoading(true);
            setError("");
            setMessage("");

            await checkIn();

            setMessage(
                "You have successfully checked in."
            );

            await loadAttendance();

        } catch (err) {

            console.error("Check-in failed:", err);

            setError(
                err.response?.data?.message ||
                "Unable to check in."
            );

        } finally {

            setActionLoading(false);

        }
    };


    // =========================================
    // CHECK OUT
    // =========================================

    const handleCheckOut = async () => {

        try {

            setActionLoading(true);
            setError("");
            setMessage("");

            await checkOut();

            setMessage(
                "You have successfully checked out."
            );

            await loadAttendance();

        } catch (err) {

            console.error("Check-out failed:", err);

            setError(
                err.response?.data?.message ||
                "Unable to check out."
            );

        } finally {

            setActionLoading(false);

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

            const [hours, minutes] =
                time.split(":");

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
    // FORMAT DATE
    // =========================================

    const formatDate = (date) => {

        if (!date) {
            return "--";
        }

        try {

            const [year, month, day] =
                date.split("-");

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


    return (

        <Layout>

            <div className="space-y-6">


                {/* =====================================
                    HEADER
                ===================================== */}

                <div>

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Attendance
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Track your daily attendance and working hours
                    </p>

                </div>


                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className={`
                        bg-red-50
                        border
                        border-red-200
                        text-red-700
                        px-5
                        py-4
                        rounded-xl
                    `}>

                        {error}

                    </div>

                )}


                {/* =====================================
                    SUCCESS
                ===================================== */}

                {message && (

                    <div className={`
                        bg-green-50
                        border
                        border-green-200
                        text-green-700
                        px-5
                        py-4
                        rounded-xl
                        flex
                        items-center
                        gap-3
                    `}>

                        <FaCheckCircle />

                        <span>
                            {message}
                        </span>

                    </div>

                )}


                {/* =====================================
                    TODAY CARD
                ===================================== */}

                <div className={`
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                `}>


                    {/* HEADER */}

                    <div className={`
                        p-6
                        border-b
                        border-gray-100
                    `}>

                        <div className={`
                            flex
                            flex-col
                            md:flex-row
                            md:items-center
                            md:justify-between
                            gap-4
                        `}>

                            <div>

                                <p className={`
                                    text-sm
                                    text-gray-500
                                `}>
                                    Today's Attendance
                                </p>

                                <h2 className={`
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                    mt-1
                                `}>

                                    {formatDate(today)}

                                </h2>

                            </div>


                            {todayAttendance ? (

                                <span className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-full
                                    font-semibold
                                    ${
                                        todayAttendance.status === "PRESENT"
                                            ? "bg-green-50 text-green-700"
                                            : "bg-yellow-50 text-yellow-700"
                                    }
                                `}>

                                    <span className={`
                                        w-2.5
                                        h-2.5
                                        rounded-full
                                        bg-current
                                    `}/>

                                    {todayAttendance.status}

                                </span>

                            ) : (

                                <span className={`
                                    inline-flex
                                    items-center
                                    gap-2
                                    px-4
                                    py-2
                                    rounded-full
                                    bg-gray-100
                                    text-gray-600
                                    font-semibold
                                `}>

                                    <FaHourglassHalf />

                                    Not Marked

                                </span>

                            )}

                        </div>

                    </div>


                    {/* =====================================
                        TODAY DETAILS
                    ===================================== */}

                    <div className={`
                        p-6
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-5
                    `}>


                        {/* CHECK IN */}

                        <div className={`
                            rounded-xl
                            bg-blue-50
                            border
                            border-blue-100
                            p-5
                        `}>

                            <div className={`
                                w-11
                                h-11
                                rounded-xl
                                bg-blue-100
                                text-blue-600
                                flex
                                items-center
                                justify-center
                                text-lg
                            `}>

                                <FaSignInAlt />

                            </div>

                            <p className={`
                                text-sm
                                text-gray-500
                                mt-4
                            `}>
                                Check In
                            </p>

                            <h3 className={`
                                text-2xl
                                font-bold
                                text-gray-900
                                mt-1
                            `}>

                                {formatTime(
                                    todayAttendance?.checkInTime
                                )}

                            </h3>

                        </div>


                        {/* CHECK OUT */}

                        <div className={`
                            rounded-xl
                            bg-orange-50
                            border
                            border-orange-100
                            p-5
                        `}>

                            <div className={`
                                w-11
                                h-11
                                rounded-xl
                                bg-orange-100
                                text-orange-600
                                flex
                                items-center
                                justify-center
                                text-lg
                            `}>

                                <FaSignOutAlt />

                            </div>

                            <p className={`
                                text-sm
                                text-gray-500
                                mt-4
                            `}>
                                Check Out
                            </p>

                            <h3 className={`
                                text-2xl
                                font-bold
                                text-gray-900
                                mt-1
                            `}>

                                {formatTime(
                                    todayAttendance?.checkOutTime
                                )}

                            </h3>

                        </div>


                        {/* WORKING HOURS */}

                        <div className={`
                            rounded-xl
                            bg-purple-50
                            border
                            border-purple-100
                            p-5
                        `}>

                            <div className={`
                                w-11
                                h-11
                                rounded-xl
                                bg-purple-100
                                text-purple-600
                                flex
                                items-center
                                justify-center
                                text-lg
                            `}>

                                <FaClock />

                            </div>

                            <p className={`
                                text-sm
                                text-gray-500
                                mt-4
                            `}>
                                Working Hours
                            </p>

                            <h3 className={`
                                text-2xl
                                font-bold
                                text-gray-900
                                mt-1
                            `}>

                                {formatWorkingHours(
                                    todayAttendance?.workingHours
                                )}

                            </h3>

                        </div>

                    </div>


                    {/* =====================================
                        ACTION BUTTONS
                    ===================================== */}

                    <div className={`
                        px-6
                        pb-6
                        flex
                        flex-col
                        sm:flex-row
                        gap-3
                    `}>


                        {/* CHECK IN */}

                        <button
                            type="button"
                            onClick={handleCheckIn}
                            disabled={
                                actionLoading ||
                                Boolean(todayAttendance)
                            }
                            className={`
                                flex-1
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                bg-blue-600
                                text-white
                                font-semibold
                                hover:bg-blue-700
                                disabled:bg-gray-300
                                disabled:cursor-not-allowed
                                transition
                            `}
                        >

                            <FaSignInAlt />

                            {actionLoading
                                ? "Processing..."
                                : "Check In"
                            }

                        </button>


                        {/* CHECK OUT */}

                        <button
                            type="button"
                            onClick={handleCheckOut}
                            disabled={
                                actionLoading ||
                                !todayAttendance ||
                                Boolean(
                                    todayAttendance?.checkOutTime
                                )
                            }
                            className={`
                                flex-1
                                flex
                                items-center
                                justify-center
                                gap-2
                                px-5
                                py-3
                                rounded-xl
                                bg-orange-500
                                text-white
                                font-semibold
                                hover:bg-orange-600
                                disabled:bg-gray-300
                                disabled:cursor-not-allowed
                                transition
                            `}
                        >

                            <FaSignOutAlt />

                            {actionLoading
                                ? "Processing..."
                                : "Check Out"
                            }

                        </button>

                    </div>

                </div>


                {/* =====================================
                    HISTORY
                ===================================== */}

                <div className={`
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                `}>


                    {/* HISTORY HEADER */}

                    <div className={`
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    `}>

                        <h2 className={`
                            text-xl
                            font-bold
                            text-gray-900
                        `}>
                            Attendance History
                        </h2>

                        <p className={`
                            text-sm
                            text-gray-500
                            mt-1
                        `}>
                            Your previous attendance records
                        </p>

                    </div>


                    {/* LOADING */}

                    {loading ? (

                        <div className={`
                            flex
                            justify-center
                            py-16
                        `}>

                            <div className={`
                                w-10
                                h-10
                                border-4
                                border-blue-200
                                border-t-blue-600
                                rounded-full
                                animate-spin
                            `} />

                        </div>

                    ) : attendance.length === 0 ? (

                        /* EMPTY */

                        <div className={`
                            text-center
                            py-16
                            text-gray-500
                        `}>

                            <FaCalendarCheck className={`
                                mx-auto
                                text-4xl
                                text-gray-300
                            `} />

                            <p className="mt-3">
                                No attendance records found.
                            </p>

                        </div>

                    ) : (

                        /* TABLE */

                        <div className="overflow-x-auto">

                            <table className="w-full min-w-[700px]">

                                <thead>

                                    <tr className={`
                                        bg-gray-50
                                        border-b
                                        border-gray-100
                                    `}>

                                        <th className={`
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        `}>
                                            Date
                                        </th>

                                        <th className={`
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        `}>
                                            Check In
                                        </th>

                                        <th className={`
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        `}>
                                            Check Out
                                        </th>

                                        <th className={`
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        `}>
                                            Working Hours
                                        </th>

                                        <th className={`
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        `}>
                                            Status
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className={`
                                    divide-y
                                    divide-gray-100
                                `}>

                                    {[...attendance]
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
                                                className={`
                                                    hover:bg-gray-50
                                                    transition
                                                `}
                                            >

                                                {/* DATE */}

                                                <td className={`
                                                    px-6
                                                    py-4
                                                    font-medium
                                                    text-gray-800
                                                `}>

                                                    {formatDate(
                                                        item.attendanceDate
                                                    )}

                                                </td>


                                                {/* CHECK IN */}

                                                <td className={`
                                                    px-6
                                                    py-4
                                                    text-gray-600
                                                `}>

                                                    {formatTime(
                                                        item.checkInTime
                                                    )}

                                                </td>


                                                {/* CHECK OUT */}

                                                <td className={`
                                                    px-6
                                                    py-4
                                                    text-gray-600
                                                `}>

                                                    {formatTime(
                                                        item.checkOutTime
                                                    )}

                                                </td>


                                                {/* WORKING HOURS */}

                                                <td className={`
                                                    px-6
                                                    py-4
                                                    font-semibold
                                                    text-gray-800
                                                `}>

                                                    {formatWorkingHours(
                                                        item.workingHours
                                                    )}

                                                </td>


                                                {/* STATUS */}

                                                <td className={`
                                                    px-6
                                                    py-4
                                                `}>

                                                    <span className={`
                                                        inline-flex
                                                        items-center
                                                        gap-2
                                                        px-3
                                                        py-1.5
                                                        rounded-full
                                                        text-sm
                                                        font-semibold
                                                        ${
                                                            item.status === "PRESENT"
                                                                ? "bg-green-50 text-green-700"
                                                                : item.status === "HALF_DAY"
                                                                    ? "bg-yellow-50 text-yellow-700"
                                                                    : item.status === "LEAVE"
                                                                        ? "bg-blue-50 text-blue-700"
                                                                        : "bg-red-50 text-red-700"
                                                        }
                                                    `}>

                                                        <span className={`
                                                            w-2
                                                            h-2
                                                            rounded-full
                                                            bg-current
                                                        `}/>

                                                        {item.status}

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


export default MyAttendance;