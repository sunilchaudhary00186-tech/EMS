import { useEffect, useState } from "react";

import {
    FaArrowUp,
    FaUserTie,
    FaCalendarAlt,
    FaCheckCircle,
    FaTimes,
} from "react-icons/fa";

import Layout from "../components/layout/Layout";

import {
    getAllPromotions,
    promoteEmployee,
} from "../api/promotionApi";

import api from "../api/axios";


const Promotion = () => {

    // ==========================================
    // STATE
    // ==========================================

    const [promotions, setPromotions] = useState([]);

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [employeeLoading, setEmployeeLoading] = useState(true);

    const [submitting, setSubmitting] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    const [formData, setFormData] = useState({
        employeeId: "",
        newDesignation: "",
        reason: "",
    });


    // ==========================================
    // LOAD DATA
    // ==========================================

    useEffect(() => {

        loadPromotions();
        loadEmployees();

    }, []);


    // ==========================================
    // LOAD PROMOTIONS
    // ==========================================

    const loadPromotions = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getAllPromotions();

            console.log("Promotions:", data);

            setPromotions(data || []);

        } catch (error) {

            console.error(
                "Promotion loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load promotions."
            );

        } finally {

            setLoading(false);

        }
    };


    // ==========================================
    // LOAD EMPLOYEES
    // ==========================================

    const loadEmployees = async () => {

        try {

            setEmployeeLoading(true);

            /*
             * IMPORTANT:
             * Your employee API appears to use:
             * /api/employees?page=0&size=100
             *
             * Since axios baseURL already contains /api,
             * use /employees here.
             */

            const response = await api.get(
                "/employees?page=0&size=100"
            );

            console.log(
                "Employee response:",
                response.data
            );

            /*
             * Spring Page response usually contains:
             *
             * {
             *   content: [...]
             * }
             *
             * If your backend returns a plain array,
             * this also handles it.
             */

            const employeeData =
                response.data?.content ??
                response.data ??
                [];

            setEmployees(employeeData);

        } catch (error) {

            console.error(
                "Employee loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load employees."
            );

        } finally {

            setEmployeeLoading(false);

        }
    };


    // ==========================================
    // INPUT CHANGE
    // ==========================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData((previous) => ({

            ...previous,

            [name]: value

        }));

    };


    // ==========================================
    // SUBMIT PROMOTION
    // ==========================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        setError("");
        setSuccess("");


        // --------------------------------------
        // BASIC VALIDATION
        // --------------------------------------

        if (!formData.employeeId) {

            setError("Please select an employee.");

            return;
        }


        if (!formData.newDesignation.trim()) {

            setError("Please enter new designation.");

            return;
        }


        if (!formData.reason.trim()) {

            setError("Please enter promotion reason.");

            return;
        }


        try {

            setSubmitting(true);


            const requestData = {

                employeeId:
                    Number(formData.employeeId),

                newDesignation:
                    formData.newDesignation.trim(),

                reason:
                    formData.reason.trim()

            };


            console.log(
                "Promotion request:",
                requestData
            );


            await promoteEmployee(requestData);


            setSuccess(
                "Employee promoted successfully."
            );


            // ----------------------------------
            // RESET FORM
            // ----------------------------------

            setFormData({

                employeeId: "",

                newDesignation: "",

                reason: ""

            });


            // ----------------------------------
            // REFRESH TABLE
            // ----------------------------------

            await loadPromotions();

        } catch (error) {

            console.error(
                "Promotion error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to promote employee."
            );

        } finally {

            setSubmitting(false);

        }
    };


    // ==========================================
    // FORMAT DATE
    // ==========================================

    const formatDate = (date) => {

        if (!date) {
            return "-";
        }

        return new Date(date).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric"
            }
        );

    };


    // ==========================================
    // CLOSE MESSAGE
    // ==========================================

    const clearMessages = () => {

        setError("");
        setSuccess("");

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

                    <div className="
                        flex
                        items-center
                        gap-2
                        text-blue-600
                        mb-2
                    ">

                        <FaArrowUp />

                        <span className="text-sm font-semibold">
                            Employee Growth
                        </span>

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                    ">
                        Promotions
                    </h1>


                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Manage employee promotions and career progression
                    </p>

                </div>


                {/* =====================================
                    SUCCESS
                ===================================== */}

                {success && (

                    <div className="
                        flex
                        items-center
                        justify-between
                        bg-green-50
                        border
                        border-green-200
                        text-green-700
                        px-5
                        py-4
                        rounded-xl
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <FaCheckCircle />

                            <span>
                                {success}
                            </span>

                        </div>


                        <button
                            onClick={clearMessages}
                            className="text-green-600"
                        >

                            <FaTimes />

                        </button>

                    </div>

                )}


                {/* =====================================
                    ERROR
                ===================================== */}

                {error && (

                    <div className="
                        flex
                        items-center
                        justify-between
                        bg-red-50
                        border
                        border-red-200
                        text-red-700
                        px-5
                        py-4
                        rounded-xl
                    ">

                        <span>
                            {error}
                        </span>


                        <button
                            onClick={clearMessages}
                            className="text-red-600"
                        >

                            <FaTimes />

                        </button>

                    </div>

                )}


                {/* =====================================
                    PROMOTION FORM
                ===================================== */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    shadow-sm
                    p-6
                ">


                    <div className="
                        flex
                        items-center
                        gap-3
                        mb-6
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
                        ">

                            <FaUserTie />

                        </div>


                        <div>

                            <h2 className="
                                text-xl
                                font-bold
                                text-gray-900
                            ">
                                Promote Employee
                            </h2>


                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Create a new employee promotion
                            </p>

                        </div>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        "
                    >


                        {/* EMPLOYEE */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Employee
                            </label>


                            <select
                                name="employeeId"
                                value={formData.employeeId}
                                onChange={handleChange}
                                disabled={employeeLoading || submitting}
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                    bg-white
                                "
                            >

                                <option value="">
                                    {employeeLoading
                                        ? "Loading employees..."
                                        : "Select employee"
                                    }
                                </option>


                                {employees.map((employee) => (

                                    <option
                                        key={employee.id}
                                        value={employee.id}
                                    >

                                        {employee.employeeCode}
                                        {" - "}
                                        {employee.firstName}
                                        {" "}
                                        {employee.lastName}

                                    </option>

                                ))}

                            </select>

                        </div>


                        {/* NEW DESIGNATION */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                New Designation
                            </label>


                            <input
                                type="text"
                                name="newDesignation"
                                value={formData.newDesignation}
                                onChange={handleChange}
                                placeholder="e.g. Senior Java Developer"
                                disabled={submitting}
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                "
                            />

                        </div>


                        {/* REASON */}

                        <div className="md:col-span-2">

                            <label className="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                mb-2
                            ">
                                Promotion Reason
                            </label>


                            <textarea
                                name="reason"
                                value={formData.reason}
                                onChange={handleChange}
                                placeholder="Enter reason for promotion..."
                                rows="4"
                                disabled={submitting}
                                className="
                                    w-full
                                    border
                                    border-gray-300
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    resize-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-blue-500
                                "
                            />

                        </div>


                        {/* SUBMIT */}

                        <div className="
                            md:col-span-2
                            flex
                            justify-end
                        ">

                            <button
                                type="submit"
                                disabled={submitting}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    bg-blue-600
                                    hover:bg-blue-700
                                    disabled:bg-blue-300
                                    text-white
                                    px-6
                                    py-3
                                    rounded-xl
                                    font-semibold
                                    transition
                                "
                            >

                                <FaArrowUp />

                                {submitting
                                    ? "Processing..."
                                    : "Promote Employee"
                                }

                            </button>

                        </div>

                    </form>

                </div>


                {/* =====================================
                    PROMOTION HISTORY
                ===================================== */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
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
                            Promotion History
                        </h2>


                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            Previous employee promotions
                        </p>

                    </div>


                    {loading ? (

                        <div className="
                            p-10
                            text-center
                            text-gray-500
                        ">
                            Loading promotions...
                        </div>

                    ) : promotions.length === 0 ? (

                        <div className="
                            p-10
                            text-center
                            text-gray-500
                        ">

                            <FaArrowUp className="
                                mx-auto
                                text-3xl
                                text-gray-300
                                mb-3
                            " />

                            <p className="font-medium">
                                No promotions found
                            </p>

                            <p className="text-sm mt-1">
                                Promotion records will appear here.
                            </p>

                        </div>

                    ) : (

                        <div className="overflow-x-auto">

                            <table className="
                                w-full
                                text-left
                            ">

                                <thead className="
                                    bg-gray-50
                                    border-b
                                    border-gray-200
                                ">

                                    <tr>

                                        <th className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Employee
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Old Designation
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                        ">
                                            New Designation
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Reason
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-xs
                                            font-semibold
                                            text-gray-500
                                            uppercase
                                        ">
                                            Date
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="
                                    divide-y
                                    divide-gray-100
                                ">

                                    {promotions.map((promotion) => (

                                        <tr
                                            key={promotion.id}
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

                                                    {promotion.employeeName}

                                                </div>

                                                <div className="
                                                    text-xs
                                                    text-gray-500
                                                    mt-1
                                                ">

                                                    {promotion.employeeCode}

                                                </div>

                                            </td>


                                            {/* OLD DESIGNATION */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <span className="
                                                    text-gray-600
                                                ">

                                                    {promotion.oldDesignation || "-"}

                                                </span>

                                            </td>


                                            {/* NEW DESIGNATION */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <span className="
                                                    inline-flex
                                                    items-center
                                                    gap-2
                                                    bg-green-50
                                                    text-green-700
                                                    px-3
                                                    py-1
                                                    rounded-full
                                                    text-sm
                                                    font-medium
                                                ">

                                                    <FaArrowUp />

                                                    {promotion.newDesignation}

                                                </span>

                                            </td>


                                            {/* REASON */}

                                            <td className="
                                                px-6
                                                py-4
                                                max-w-xs
                                            ">

                                                <p className="
                                                    text-sm
                                                    text-gray-600
                                                ">

                                                    {promotion.reason}

                                                </p>

                                            </td>


                                            {/* DATE */}

                                            <td className="
                                                px-6
                                                py-4
                                            ">

                                                <div className="
                                                    flex
                                                    items-center
                                                    gap-2
                                                    text-gray-600
                                                    text-sm
                                                ">

                                                    <FaCalendarAlt />

                                                    {formatDate(
                                                        promotion.promotedAt
                                                    )}

                                                </div>

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


export default Promotion;