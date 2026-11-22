import { useState } from "react";
import { FaTimes } from "react-icons/fa";

import { applyLeave } from "../../api/leaveApi";


const ApplyLeaveModal = ({ onClose, onSuccess }) => {

    const [formData, setFormData] = useState({
        leaveType: "CASUAL",
        startDate: "",
        endDate: "",
        reason: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    // =========================================
    // HANDLE INPUT CHANGE
    // =========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };


    // =========================================
    // SUBMIT LEAVE
    // =========================================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        // =====================================
        // VALIDATION
        // =====================================

        if (!formData.startDate || !formData.endDate) {

            setError(
                "Please select start and end dates."
            );

            return;
        }


        if (formData.endDate < formData.startDate) {

            setError(
                "End date cannot be before start date."
            );

            return;
        }


        if (!formData.reason.trim()) {

            setError(
                "Please enter a reason."
            );

            return;
        }


        try {

            setLoading(true);


            // =================================
            // SEND TO BACKEND
            // =================================

            console.log(
                "Sending leave request:",
                formData
            );

            const response =
                await applyLeave(formData);


            console.log(
                "Leave created successfully:",
                response
            );


            // =================================
            // REFRESH MY LEAVES
            // =================================

            if (onSuccess) {
                await onSuccess();
            }


            // =================================
            // CLOSE MODAL
            // =================================

            onClose();


        } catch (err) {

            console.error(
                "Failed to apply leave:",
                err
            );

            console.error(
                "Backend response:",
                err.response?.data
            );


            setError(
                err.response?.data?.message ||
                err.response?.data?.error ||
                "Failed to apply leave."
            );


        } finally {

            setLoading(false);

        }

    };


    return (

        <div
            className="
                fixed
                inset-0
                bg-black/40
                flex
                items-center
                justify-center
                z-50
                p-4
            "
        >

            <div
                className="
                    bg-white
                    rounded-2xl
                    shadow-xl
                    w-full
                    max-w-lg
                "
            >

                {/* =================================
                    HEADER
                ================================= */}

                <div
                    className="
                        flex
                        items-center
                        justify-between
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    "
                >

                    <div>

                        <h2
                            className="
                                text-xl
                                font-bold
                                text-gray-900
                            "
                        >
                            Apply Leave
                        </h2>

                        <p
                            className="
                                text-sm
                                text-gray-500
                                mt-1
                            "
                        >
                            Submit a new leave request
                        </p>

                    </div>


                    <button
                        type="button"
                        onClick={onClose}
                        className="
                            text-gray-400
                            hover:text-gray-700
                            text-lg
                        "
                    >
                        <FaTimes />
                    </button>

                </div>


                {/* =================================
                    FORM
                ================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="p-6 space-y-5"
                >

                    {/* ERROR */}

                    {error && (

                        <div
                            className="
                                bg-red-50
                                border
                                border-red-200
                                text-red-700
                                px-4
                                py-3
                                rounded-lg
                                text-sm
                            "
                        >
                            {error}
                        </div>

                    )}


                    {/* =================================
                        LEAVE TYPE
                    ================================= */}

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >
                            Leave Type
                        </label>


                        <select
                            name="leaveType"
                            value={formData.leaveType}
                            onChange={handleChange}
                            className="
                                w-full
                                border
                                border-gray-200
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        >

                            <option value="CASUAL">
                                Casual Leave
                            </option>

                            <option value="SICK">
                                Sick Leave
                            </option>

                            <option value="ANNUAL">
                                Annual Leave
                            </option>

                        </select>

                    </div>


                    {/* =================================
                        DATES
                    ================================= */}

                    <div
                        className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-4
                        "
                    >

                        {/* START DATE */}

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
                                Start Date
                            </label>


                            <input
                                type="date"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>


                        {/* END DATE */}

                        <div>

                            <label
                                className="
                                    block
                                    text-sm
                                    font-medium
                                    text-gray-700
                                    mb-2
                                "
                            >
                                End Date
                            </label>


                            <input
                                type="date"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="
                                    w-full
                                    border
                                    border-gray-200
                                    rounded-xl
                                    px-4
                                    py-3
                                    outline-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                "
                            />

                        </div>

                    </div>


                    {/* =================================
                        REASON
                    ================================= */}

                    <div>

                        <label
                            className="
                                block
                                text-sm
                                font-medium
                                text-gray-700
                                mb-2
                            "
                        >
                            Reason
                        </label>


                        <textarea
                            name="reason"
                            rows="4"
                            value={formData.reason}
                            onChange={handleChange}
                            placeholder="Enter reason for leave..."
                            className="
                                w-full
                                border
                                border-gray-200
                                rounded-xl
                                px-4
                                py-3
                                outline-none
                                resize-none
                                focus:ring-2
                                focus:ring-blue-500
                            "
                        />

                    </div>


                    {/* =================================
                        BUTTONS
                    ================================= */}

                    <div
                        className="
                            flex
                            justify-end
                            gap-3
                            pt-2
                        "
                    >

                        <button
                            type="button"
                            onClick={onClose}
                            disabled={loading}
                            className="
                                px-5
                                py-2.5
                                rounded-xl
                                border
                                border-gray-200
                                text-gray-700
                                font-medium
                                hover:bg-gray-50
                                disabled:opacity-50
                            "
                        >
                            Cancel
                        </button>


                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                px-5
                                py-2.5
                                rounded-xl
                                bg-blue-600
                                text-white
                                font-semibold
                                hover:bg-blue-700
                                disabled:opacity-50
                                disabled:cursor-not-allowed
                            "
                        >

                            {loading
                                ? "Submitting..."
                                : "Apply Leave"
                            }

                        </button>

                    </div>

                </form>

            </div>

        </div>

    );
};


export default ApplyLeaveModal;