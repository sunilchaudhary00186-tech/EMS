import { useEffect, useState } from "react";

import {
    FaStar,
    FaPlus,
    FaEdit,
    FaTrash,
    FaTimes,
    FaSearch
} from "react-icons/fa";

import Layout from "../components/layout/Layout";

import {
    getAllPerformanceReviews,
    addPerformanceReview,
    updatePerformanceReview,
    deletePerformanceReview
} from "../api/performanceApi";

import axios from "axios";


const Performance = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [reviews, setReviews] = useState([]);

    const [employees, setEmployees] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    const [search, setSearch] = useState("");

    const [showModal, setShowModal] = useState(false);

    const [editingReview, setEditingReview] = useState(null);

    const [saving, setSaving] = useState(false);


    // =====================================================
    // FORM
    // =====================================================

    const [formData, setFormData] = useState({

        employeeId: "",

        rating: 5,

        comments: "",

        reviewDate:
            new Date().toISOString().split("T")[0],

        reviewedBy:
            localStorage.getItem("username") || ""

    });


    // =====================================================
    // LOAD DATA
    // =====================================================

    useEffect(() => {

        loadReviews();

        loadEmployees();

    }, []);


    // =====================================================
    // LOAD REVIEWS
    // =====================================================

    const loadReviews = async () => {

        try {

            setLoading(true);

            setError("");

            const data =
                await getAllPerformanceReviews();

            console.log(
                "Performance Reviews:",
                data
            );

            setReviews(
                Array.isArray(data)
                    ? data
                    : []
            );

        } catch (error) {

            console.error(
                "Performance loading error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to load performance reviews."
            );

        } finally {

            setLoading(false);

        }
    };


    // =====================================================
    // LOAD EMPLOYEES
    // =====================================================

    const loadEmployees = async () => {

        try {

            const token =
                localStorage.getItem("token");

            const response = await axios.get(
                `${import.meta.env.VITE_API_URL}/api/employees`,
                {
                    headers: {
                        Authorization:
                            `Bearer ${token}`
                    },

                    params: {
                        page: 0,
                        size: 100
                    }
                }
            );

            const data = response.data;

            console.log(
                "Employees:",
                data
            );

            /*
             * Supports both:
             *
             * Page response:
             * {
             *   content: [...]
             * }
             *
             * Array response:
             * [...]
             */

            setEmployees(
                Array.isArray(data)
                    ? data
                    : data?.content || []
            );

        } catch (error) {

            console.error(
                "Employee loading error:",
                error
            );

        }
    };


    // =====================================================
    // INPUT CHANGE
    // =====================================================

    const handleChange = (event) => {

        const {
            name,
            value
        } = event.target;

        setFormData({
            ...formData,
            [name]: value
        });
    };


    // =====================================================
    // OPEN ADD MODAL
    // =====================================================

    const handleAdd = () => {

        setEditingReview(null);

        setFormData({

            employeeId: "",

            rating: 5,

            comments: "",

            reviewDate:
                new Date()
                    .toISOString()
                    .split("T")[0],

            reviewedBy:
                localStorage.getItem("username") || ""

        });

        setShowModal(true);
    };


    // =====================================================
    // OPEN EDIT MODAL
    // =====================================================

    const handleEdit = (review) => {

        setEditingReview(review);

        setFormData({

            employeeId:
                review.employeeId ||
                findEmployeeId(review),

            rating:
                review.rating || 5,

            comments:
                review.comments || "",

            reviewDate:
                review.reviewDate || "",

            reviewedBy:
                review.reviewedBy || ""

        });

        setShowModal(true);
    };


    // =====================================================
    // FIND EMPLOYEE ID
    // =====================================================

    const findEmployeeId = (review) => {

        const employee =
            employees.find(
                emp =>
                    emp.employeeCode ===
                    review.employeeCode
            );

        return employee?.id || "";
    };


    // =====================================================
    // SUBMIT FORM
    // =====================================================

    const handleSubmit = async (event) => {

        event.preventDefault();

        try {

            setSaving(true);

            setError("");


            const payload = {

                employeeId:
                    Number(formData.employeeId),

                rating:
                    Number(formData.rating),

                comments:
                    formData.comments.trim(),

                reviewDate:
                    formData.reviewDate,

                reviewedBy:
                    formData.reviewedBy.trim()

            };


            console.log(
                "Performance payload:",
                payload
            );


            if (editingReview) {

                await updatePerformanceReview(
                    editingReview.id,
                    payload
                );

            } else {

                await addPerformanceReview(
                    payload
                );
            }


            setShowModal(false);

            setEditingReview(null);

            await loadReviews();


        } catch (error) {

            console.error(
                "Save performance error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to save performance review."
            );

        } finally {

            setSaving(false);

        }
    };


    // =====================================================
    // DELETE
    // =====================================================

    const handleDelete = async (reviewId) => {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this performance review?"
            );

        if (!confirmed) {
            return;
        }


        try {

            await deletePerformanceReview(
                reviewId
            );

            await loadReviews();

        } catch (error) {

            console.error(
                "Delete performance error:",
                error
            );

            setError(
                error.response?.data?.message ||
                "Failed to delete performance review."
            );
        }
    };


    // =====================================================
    // CLOSE MODAL
    // =====================================================

    const closeModal = () => {

        if (saving) {
            return;
        }

        setShowModal(false);

        setEditingReview(null);
    };


    // =====================================================
    // SEARCH
    // =====================================================

    const filteredReviews =
        reviews.filter(review => {

            const searchText =
                search.toLowerCase();

            return (

                review.employeeName
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                review.employeeCode
                    ?.toLowerCase()
                    .includes(searchText)

                ||

                review.reviewedBy
                    ?.toLowerCase()
                    .includes(searchText)

            );

        });


    // =====================================================
    // RATING
    // =====================================================

    const RatingStars = ({ rating }) => {

        return (

            <div className="flex gap-1">

                {[1, 2, 3, 4, 5].map(star => (

                    <FaStar
                        key={star}
                        className={
                            star <= rating
                                ? "text-yellow-400"
                                : "text-gray-300"
                        }
                    />

                ))}

            </div>
        );
    };


    // =====================================================
    // UI
    // =====================================================

    return (

        <Layout>

            <div className="space-y-6">


                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="
                    flex
                    flex-col
                    md:flex-row
                    md:items-center
                    md:justify-between
                    gap-4
                ">

                    <div>

                        <p className="
                            text-blue-600
                            font-semibold
                        ">
                            Employee Performance
                        </p>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-900
                            mt-1
                        ">
                            Performance
                        </h1>

                        <p className="
                            text-gray-500
                            mt-1
                        ">
                            Manage employee performance reviews
                        </p>

                    </div>


                    <button
                        onClick={handleAdd}
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
                            transition
                        "
                    >

                        <FaPlus />

                        Add Performance

                    </button>

                </div>


                {/* ================================================= */}
                {/* ERROR */}
                {/* ================================================= */}

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


                {/* ================================================= */}
                {/* SEARCH */}
                {/* ================================================= */}

                <div className="
                    bg-white
                    border
                    border-gray-200
                    rounded-xl
                    p-4
                    shadow-sm
                ">

                    <div className="
                        relative
                        max-w-md
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
                            placeholder="
                                Search employee...
                            "
                            value={search}
                            onChange={e =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            className="
                                w-full
                                pl-11
                                pr-4
                                py-3
                                border
                                border-gray-300
                                rounded-xl
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>

                </div>


                {/* ================================================= */}
                {/* TABLE */}
                {/* ================================================= */}

                <div className="
                    bg-white
                    rounded-2xl
                    border
                    border-gray-200
                    shadow-sm
                    overflow-hidden
                ">

                    {loading ? (

                        <div className="
                            p-10
                            text-center
                            text-gray-500
                        ">

                            Loading performance reviews...

                        </div>

                    ) : filteredReviews.length === 0 ? (

                        <div className="
                            p-12
                            text-center
                        ">

                            <FaStar className="
                                mx-auto
                                text-4xl
                                text-gray-300
                                mb-4
                            " />

                            <h2 className="
                                text-xl
                                font-semibold
                                text-gray-800
                            ">
                                No Performance Reviews
                            </h2>

                            <p className="
                                text-gray-500
                                mt-2
                            ">
                                Add a performance review
                                for an employee.
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
                                            text-sm
                                            font-semibold
                                            text-gray-600
                                        ">
                                            Employee
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-gray-600
                                        ">
                                            Rating
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-gray-600
                                        ">
                                            Comments
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-gray-600
                                        ">
                                            Review Date
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-gray-600
                                        ">
                                            Reviewed By
                                        </th>

                                        <th className="
                                            px-6
                                            py-4
                                            text-sm
                                            font-semibold
                                            text-gray-600
                                            text-right
                                        ">
                                            Actions
                                        </th>

                                    </tr>

                                </thead>


                                <tbody className="
                                    divide-y
                                    divide-gray-100
                                ">

                                    {filteredReviews.map(
                                        review => (

                                            <tr
                                                key={
                                                    review.id
                                                }
                                                className="
                                                    hover:bg-gray-50
                                                "
                                            >

                                                {/* EMPLOYEE */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div>

                                                        <p className="
                                                            font-semibold
                                                            text-gray-900
                                                        ">
                                                            {
                                                                review.employeeName ||
                                                                "Unknown Employee"
                                                            }
                                                        </p>

                                                        <p className="
                                                            text-sm
                                                            text-gray-500
                                                            mt-1
                                                        ">
                                                            {
                                                                review.employeeCode ||
                                                                "-"
                                                            }
                                                        </p>

                                                    </div>

                                                </td>


                                                {/* RATING */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div className="
                                                        flex
                                                        items-center
                                                        gap-2
                                                    ">

                                                        <RatingStars
                                                            rating={
                                                                review.rating
                                                            }
                                                        />

                                                        <span className="
                                                            text-sm
                                                            font-semibold
                                                            text-gray-700
                                                        ">
                                                            {
                                                                review.rating
                                                            }/5
                                                        </span>

                                                    </div>

                                                </td>


                                                {/* COMMENTS */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    max-w-xs
                                                ">

                                                    <p className="
                                                        text-sm
                                                        text-gray-600
                                                        truncate
                                                    "
                                                    title={
                                                        review.comments
                                                    }>

                                                        {
                                                            review.comments
                                                        }

                                                    </p>

                                                </td>


                                                {/* DATE */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                    text-sm
                                                    text-gray-600
                                                ">

                                                    {
                                                        review.reviewDate
                                                    }

                                                </td>


                                                {/* REVIEWED BY */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <span className="
                                                        px-3
                                                        py-1
                                                        rounded-full
                                                        bg-blue-50
                                                        text-blue-700
                                                        text-sm
                                                        font-medium
                                                    ">

                                                        {
                                                            review.reviewedBy
                                                        }

                                                    </span>

                                                </td>


                                                {/* ACTIONS */}

                                                <td className="
                                                    px-6
                                                    py-4
                                                ">

                                                    <div className="
                                                        flex
                                                        justify-end
                                                        gap-2
                                                    ">

                                                        <button
                                                            onClick={() =>
                                                                handleEdit(
                                                                    review
                                                                )
                                                            }
                                                            className="
                                                                p-2
                                                                rounded-lg
                                                                bg-blue-50
                                                                text-blue-600
                                                                hover:bg-blue-100
                                                            "
                                                            title="Edit"
                                                        >

                                                            <FaEdit />

                                                        </button>


                                                        <button
                                                            onClick={() =>
                                                                handleDelete(
                                                                    review.id
                                                                )
                                                            }
                                                            className="
                                                                p-2
                                                                rounded-lg
                                                                bg-red-50
                                                                text-red-600
                                                                hover:bg-red-100
                                                            "
                                                            title="Delete"
                                                        >

                                                            <FaTrash />

                                                        </button>

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


            {/* ===================================================== */}
            {/* ADD / EDIT MODAL */}
            {/* ===================================================== */}

            {showModal && (

                <div className="
                    fixed
                    inset-0
                    bg-black/40
                    flex
                    items-center
                    justify-center
                    z-50
                    p-4
                ">

                    <div className="
                        bg-white
                        w-full
                        max-w-lg
                        rounded-2xl
                        shadow-xl
                        max-h-[90vh]
                        overflow-y-auto
                    ">


                        {/* MODAL HEADER */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-5
                            border-b
                            border-gray-200
                        ">

                            <div>

                                <h2 className="
                                    text-xl
                                    font-bold
                                    text-gray-900
                                ">

                                    {
                                        editingReview
                                            ? "Edit Performance"
                                            : "Add Performance"
                                    }

                                </h2>

                                <p className="
                                    text-sm
                                    text-gray-500
                                    mt-1
                                ">

                                    Enter employee performance details

                                </p>

                            </div>


                            <button
                                onClick={closeModal}
                                className="
                                    text-gray-400
                                    hover:text-gray-700
                                    text-xl
                                "
                            >

                                <FaTimes />

                            </button>

                        </div>


                        {/* FORM */}

                        <form
                            onSubmit={handleSubmit}
                            className="p-6 space-y-5"
                        >


                            {/* EMPLOYEE */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Employee
                                </label>

                                <select
                                    name="employeeId"
                                    value={
                                        formData.employeeId
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-300
                                        rounded-xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                >

                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map(
                                        employee => (

                                            <option
                                                key={
                                                    employee.id
                                                }
                                                value={
                                                    employee.id
                                                }
                                            >

                                                {
                                                    employee.employeeCode ||
                                                    `EMP-${employee.id}`
                                                }

                                                {" - "}

                                                {
                                                    employee.employeeName ||
                                                    `${employee.firstName || ""} ${employee.lastName || ""}`.trim() ||
                                                    employee.name ||
                                                    "Employee"
                                                }

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* RATING */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Rating
                                </label>

                                <select
                                    name="rating"
                                    value={
                                        formData.rating
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-300
                                        rounded-xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                >

                                    <option value="1">
                                        1 - Poor
                                    </option>

                                    <option value="2">
                                        2 - Needs Improvement
                                    </option>

                                    <option value="3">
                                        3 - Average
                                    </option>

                                    <option value="4">
                                        4 - Good
                                    </option>

                                    <option value="5">
                                        5 - Excellent
                                    </option>

                                </select>

                            </div>


                            {/* COMMENTS */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Comments
                                </label>

                                <textarea
                                    name="comments"
                                    value={
                                        formData.comments
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    maxLength={500}
                                    rows={4}
                                    placeholder="
                                        Enter performance comments...
                                    "
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-300
                                        rounded-xl
                                        outline-none
                                        resize-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />

                                <p className="
                                    text-xs
                                    text-gray-400
                                    mt-1
                                    text-right
                                ">

                                    {
                                        formData.comments.length
                                    }/500

                                </p>

                            </div>


                            {/* REVIEW DATE */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Review Date
                                </label>

                                <input
                                    type="date"
                                    name="reviewDate"
                                    value={
                                        formData.reviewDate
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-300
                                        rounded-xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />

                            </div>


                            {/* REVIEWED BY */}

                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">
                                    Reviewed By
                                </label>

                                <input
                                    type="text"
                                    name="reviewedBy"
                                    value={
                                        formData.reviewedBy
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    required
                                    placeholder="
                                        Enter reviewer name
                                    "
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-300
                                        rounded-xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                    "
                                />

                            </div>


                            {/* BUTTONS */}

                            <div className="
                                flex
                                justify-end
                                gap-3
                                pt-3
                            ">

                                <button
                                    type="button"
                                    onClick={
                                        closeModal
                                    }
                                    disabled={saving}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        border
                                        border-gray-300
                                        text-gray-700
                                        hover:bg-gray-50
                                    "
                                >
                                    Cancel
                                </button>


                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="
                                        px-5
                                        py-3
                                        rounded-xl
                                        bg-blue-600
                                        hover:bg-blue-700
                                        text-white
                                        font-semibold
                                        disabled:opacity-50
                                    "
                                >

                                    {saving
                                        ? "Saving..."
                                        : editingReview
                                            ? "Update Review"
                                            : "Add Review"
                                    }

                                </button>

                            </div>

                        </form>

                    </div>

                </div>

            )}

        </Layout>
    );
};


export default Performance;