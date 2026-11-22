import { useEffect, useState } from "react";

import {
    FaCalendarAlt,
    FaClock,
    FaCheckCircle,
    FaTimesCircle,
    FaPlus
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import { getMyLeaves } from "../../api/leaveApi";

import ApplyLeaveModal from "../../components/leave/ApplyLeaveModal";


const MyLeave = () => {

    // =========================================
    // STATE
    // =========================================

    const [showApplyModal, setShowApplyModal] = useState(false);

    const [leaves, setLeaves] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =========================================
    // LOAD MY LEAVES
    // =========================================

    const loadMyLeaves = async () => {

        try {

            setLoading(true);

            setError("");

            const response = await getMyLeaves();

            console.log("My leaves:", response);

            setLeaves(
                Array.isArray(response)
                    ? response
                    : []
            );

        } catch (err) {

            console.error(
                "Failed to load my leaves:",
                err
            );

            setError(
                err.response?.data?.message ||
                "Failed to load your leaves."
            );

        } finally {

            setLoading(false);

        }
    };


    // =========================================
    // LOAD PAGE
    // =========================================

    useEffect(() => {

        loadMyLeaves();

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
    // CALCULATE DAYS
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

                {/* =========================================
                    HEADER
                ========================================= */}

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <p className="
                            text-blue-600
                            font-medium
                        ">
                            Employee Portal
                        </p>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-900
                            mt-1
                        ">
                            My Leave
                        </h1>

                        <p className="
                            text-gray-500
                            mt-1
                        ">
                            View and manage your leave requests
                        </p>

                    </div>


                    {/* APPLY LEAVE */}

                    <button
                        onClick={() =>
                            setShowApplyModal(true)
                        }
                        className="
                            inline-flex
                            items-center
                            gap-2
                            px-5
                            py-3
                            bg-blue-600
                            text-white
                            rounded-xl
                            font-semibold
                            hover:bg-blue-700
                            transition
                        "
                    >

                        <FaPlus />

                        Apply Leave

                    </button>

                </div>


                {/* =========================================
                    ERROR
                ========================================= */}

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


                {/* =========================================
                    SUMMARY
                ========================================= */}

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


                {/* =========================================
                    LEAVE TABLE
                ========================================= */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-100
                    shadow-sm
                    overflow-hidden
                ">

                    <div className="
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    ">

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-900
                        ">
                            My Leave Requests
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            Track your leave applications and their status
                        </p>

                    </div>


                    {/* =========================================
                        LOADING
                    ========================================= */}

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

                    ) : leaves.length === 0 ? (

                        /* =========================================
                           EMPTY
                        ========================================= */

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
                                You have no leave requests.
                            </p>

                        </div>

                    ) : (

                        /* =========================================
                           TABLE
                        ========================================= */

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
                                            Leave Type
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
                                            Dates
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
                                            Days
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
                                            Reason
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

                                    {[...leaves]
                                        .sort(
                                            (a, b) =>
                                                new Date(b.startDate) -
                                                new Date(a.startDate)
                                        )
                                        .map((item) => (

                                            <tr
                                                key={item.id}
                                                className="
                                                    hover:bg-gray-50
                                                    transition
                                                "
                                            >

                                                {/* LEAVE TYPE */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                    font-semibold
                                                    text-gray-900
                                                ">

                                                    {item.leaveType || "--"}

                                                </td>


                                                {/* DATES */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                ">

                                                    <div className="
                                                        font-medium
                                                        text-gray-800
                                                    ">

                                                        {formatDate(
                                                            item.startDate
                                                        )}

                                                    </div>

                                                    <div className="
                                                        text-sm
                                                        text-gray-500
                                                        mt-1
                                                    ">

                                                        to{" "}

                                                        {formatDate(
                                                            item.endDate
                                                        )}

                                                    </div>

                                                </td>


                                                {/* DAYS */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                    font-semibold
                                                    text-gray-700
                                                ">

                                                    {calculateDays(
                                                        item.startDate,
                                                        item.endDate
                                                    )}

                                                    <span className="
                                                        text-sm
                                                        text-gray-500
                                                        font-normal
                                                        ml-1
                                                    ">
                                                        days
                                                    </span>

                                                </td>


                                                {/* REASON */}

                                                <td className="
                                                    px-6
                                                    py-5
                                                    text-gray-700
                                                    max-w-[300px]
                                                ">

                                                    {item.reason || "--"}

                                                </td>


                                                {/* STATUS */}

                                                <td className="
                                                    px-6
                                                    py-5
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

                                                        {item.status || "--"}

                                                    </span>

                                                </td>

                                            </tr>

                                        ))}

                                </tbody>

                            </table>

                        </div>

                    )}

                </div>


                {/* =========================================
                    APPLY LEAVE MODAL
                ========================================= */}

                {showApplyModal && (

                    <ApplyLeaveModal

                        onClose={() =>
                            setShowApplyModal(false)
                        }

                        onSuccess={() => {

                            setShowApplyModal(false);

                            loadMyLeaves();

                        }}

                    />

                )}

            </div>

        </Layout>

    );
};


export default MyLeave;