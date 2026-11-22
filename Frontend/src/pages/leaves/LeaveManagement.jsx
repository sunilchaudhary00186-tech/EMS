import { useEffect, useState } from "react";

import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaSearch
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    getAllLeaves,
    approveLeave,
    rejectLeave
} from "../../api/leaveApi";


const LeaveManagement = () => {

    // =========================================
    // STATE
    // =========================================

    const [leaves, setLeaves] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [actionLoading, setActionLoading] = useState(null);


    // =========================================
    // LOAD ALL LEAVES
    // =========================================

    const loadLeaves = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getAllLeaves();

            console.log("All leaves:", response);

            setLeaves(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to load leaves:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load leaves."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // LOAD ON PAGE OPEN
    // =========================================

    useEffect(() => {

        loadLeaves();

    }, []);


    // =========================================
    // APPROVE LEAVE
    // =========================================

    const handleApprove = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to approve this leave?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(id);

            setError("");

            await approveLeave(id);

            // Reload data
            await loadLeaves();

        } catch (err) {

            console.error(
                "Failed to approve leave:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to approve leave."
            );

        } finally {

            setActionLoading(null);

        }
    };


    // =========================================
    // REJECT LEAVE
    // =========================================

    const handleReject = async (id) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to reject this leave?"
            );

        if (!confirmed) {
            return;
        }

        try {

            setActionLoading(id);

            setError("");

            await rejectLeave(id);

            // Reload data
            await loadLeaves();

        } catch (err) {

            console.error(
                "Failed to reject leave:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to reject leave."
            );

        } finally {

            setActionLoading(null);

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
    // CALCULATE LEAVE DAYS
    // =========================================

    const calculateDays = (
        startDate,
        endDate
    ) => {

        if (!startDate || !endDate) {
            return "--";
        }

        try {

            const start =
                new Date(`${startDate}T00:00:00`);

            const end =
                new Date(`${endDate}T00:00:00`);

            const difference =
                end.getTime() -
                start.getTime();

            const days =
                Math.floor(
                    difference /
                    (1000 * 60 * 60 * 24)
                ) + 1;

            return days > 0
                ? days
                : "--";

        } catch {

            return "--";

        }
    };


    // =========================================
    // FILTER
    // =========================================

    const filteredLeaves =
        leaves.filter((item) => {

            const searchValue =
                search.toLowerCase().trim();

            return (

                String(
                    item.employeeName || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(
                    item.leaveType || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(
                    item.reason || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

                ||

                String(
                    item.status || ""
                )
                    .toLowerCase()
                    .includes(searchValue)

            );

        });


    // =========================================
    // SUMMARY
    // =========================================

    const totalLeaves =
        leaves.length;

    const pendingLeaves =
        leaves.filter(
            item =>
                item.status === "PENDING"
        ).length;

    const approvedLeaves =
        leaves.filter(
            item =>
                item.status === "APPROVED"
        ).length;

    const rejectedLeaves =
        leaves.filter(
            item =>
                item.status === "REJECTED"
        ).length;


    // =========================================
    // UI
    // =========================================

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
                        Leave Management
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage employee leave requests and approvals
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
                    SUMMARY CARDS
                ===================================== */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">


                    {/* TOTAL */}

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
                                    Total Leaves
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {totalLeaves}
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

                                <FaCalendarAlt />

                            </div>

                        </div>

                    </div>


                    {/* PENDING */}

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
                                    Pending
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {pendingLeaves}
                                </h2>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-yellow-50
                                text-yellow-600
                                flex
                                items-center
                                justify-center
                                text-xl
                            ">

                                <FaClock />

                            </div>

                        </div>

                    </div>


                    {/* APPROVED */}

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
                                    Approved
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {approvedLeaves}
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

                                <FaCheckCircle />

                            </div>

                        </div>

                    </div>


                    {/* REJECTED */}

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
                                    Rejected
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    {rejectedLeaves}
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

                                <FaTimesCircle />

                            </div>

                        </div>

                    </div>

                </div>


                {/* =====================================
                    LEAVE TABLE
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
                                Employee Leave Requests
                            </h2>

                            <p className="
                                text-sm
                                text-gray-500
                                mt-1
                            ">
                                View and manage all employee leave requests
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
                                placeholder="Search employee..."
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


                    {/* =================================
                        LOADING
                    ================================= */}

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

                    ) : filteredLeaves.length === 0 ? (

                        /* =================================
                           EMPTY
                        ================================= */

                        <div className="
                            text-center
                            py-20
                            text-gray-500
                        ">

                            <FaCalendarAlt className="
                                mx-auto
                                text-5xl
                                text-gray-300
                            " />

                            <p className="mt-4">
                                No leave requests found.
                            </p>

                        </div>

                    ) : (

                        /* =================================
                           TABLE
                        ================================= */

                        <div className="overflow-x-auto">

                            <table className="
                                w-full
                                min-w-[1100px]
                            ">

                                <thead>

                                    <tr className="
                                        bg-gray-50
                                        border-b
                                        border-gray-100
                                    ">


                                        {/* EMPLOYEE */}

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


                                        {/* LEAVE TYPE */}

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Leave Type
                                        </th>


                                        {/* DATES */}

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Dates
                                        </th>


                                        {/* DAYS */}

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Days
                                        </th>


                                        {/* REASON */}

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Reason
                                        </th>


                                        {/* STATUS */}

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


                                        {/* ACTION */}

                                        <th className="
                                            px-6
                                            py-4
                                            text-left
                                            text-xs
                                            font-bold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Action
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="
                                    divide-y
                                    divide-gray-100
                                ">

                                    {[...filteredLeaves]
                                        .sort(
                                            (a, b) =>
                                                new Date(
                                                    b.startDate
                                                ) -
                                                new Date(
                                                    a.startDate
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
                                                            "--"
                                                        }

                                                    </div>

                                                </td>


                                                {/* LEAVE TYPE */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <span className="
                                                        font-medium
                                                        text-gray-800
                                                    ">

                                                        {
                                                            item.leaveType ||
                                                            "--"
                                                        }

                                                    </span>

                                                </td>


                                                {/* DATES */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div className="
                                                        text-gray-800
                                                        font-medium
                                                    ">

                                                        {
                                                            formatDate(
                                                                item.startDate
                                                            )
                                                        }

                                                    </div>

                                                    <div className="
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">

                                                        to{" "}

                                                        {
                                                            formatDate(
                                                                item.endDate
                                                            )
                                                        }

                                                    </div>

                                                </td>


                                                {/* DAYS */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-gray-700
                                                    font-semibold
                                                ">

                                                    {
                                                        calculateDays(
                                                            item.startDate,
                                                            item.endDate
                                                        )
                                                    }

                                                    <span className="
                                                        text-sm
                                                        text-gray-500
                                                        font-normal
                                                        ml-1
                                                    ">
                                                        {calculateDays(
                                                            item.startDate,
                                                            item.endDate
                                                        ) !== "--"
                                                            ? "days"
                                                            : ""}
                                                    </span>

                                                </td>


                                                {/* REASON */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    max-w-[250px]
                                                ">

                                                    <p className="
                                                        text-gray-700
                                                        truncate
                                                    "
                                                        title={
                                                            item.reason
                                                        }
                                                    >

                                                        {
                                                            item.reason ||
                                                            "--"
                                                        }

                                                    </p>

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
                                                                "APPROVED"

                                                                    ? "bg-green-50 text-green-700"

                                                                    : item.status ===
                                                                      "PENDING"

                                                                    ? "bg-yellow-50 text-yellow-700"

                                                                    : item.status ===
                                                                      "REJECTED"

                                                                    ? "bg-red-50 text-red-700"

                                                                    : "bg-gray-50 text-gray-700"
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


                                                {/* ACTION */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    {
                                                        item.status ===
                                                        "PENDING"
                                                            ? (

                                                                <div className="
                                                                    flex
                                                                    items-center
                                                                    gap-2
                                                                ">


                                                                    {/* APPROVE */}

                                                                    <button
                                                                        type="button"
                                                                        disabled={
                                                                            actionLoading ===
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            handleApprove(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="
                                                                            inline-flex
                                                                            items-center
                                                                            gap-2
                                                                            px-3
                                                                            py-2
                                                                            rounded-lg
                                                                            bg-green-600
                                                                            text-white
                                                                            text-sm
                                                                            font-semibold
                                                                            hover:bg-green-700
                                                                            disabled:opacity-50
                                                                            disabled:cursor-not-allowed
                                                                            transition
                                                                        "
                                                                    >

                                                                        <FaCheckCircle />

                                                                        {
                                                                            actionLoading ===
                                                                            item.id
                                                                                ? "Processing..."
                                                                                : "Approve"
                                                                        }

                                                                    </button>


                                                                    {/* REJECT */}

                                                                    <button
                                                                        type="button"
                                                                        disabled={
                                                                            actionLoading ===
                                                                            item.id
                                                                        }
                                                                        onClick={() =>
                                                                            handleReject(
                                                                                item.id
                                                                            )
                                                                        }
                                                                        className="
                                                                            inline-flex
                                                                            items-center
                                                                            gap-2
                                                                            px-3
                                                                            py-2
                                                                            rounded-lg
                                                                            bg-red-600
                                                                            text-white
                                                                            text-sm
                                                                            font-semibold
                                                                            hover:bg-red-700
                                                                            disabled:opacity-50
                                                                            disabled:cursor-not-allowed
                                                                            transition
                                                                        "
                                                                    >

                                                                        <FaTimesCircle />

                                                                        {
                                                                            actionLoading ===
                                                                            item.id
                                                                                ? "Processing..."
                                                                                : "Reject"
                                                                        }

                                                                    </button>

                                                                </div>

                                                            )
                                                            : (

                                                                <span className="
                                                                    text-sm
                                                                    text-gray-400
                                                                ">
                                                                    No action
                                                                </span>

                                                            )
                                                    }

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


export default LeaveManagement;