import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    FaArrowLeft,
    FaBuilding,
    FaSave
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    createDepartment
} from "../../services/departmentService";


const AddDepartment = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        departmentName: "",
        departmentCode: "",
        description: ""
    });

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSaving(true);

        try {

            await createDepartment(formData);

            alert("Department created successfully!");

            navigate("/departments");

        } catch (error) {

            console.error("Create department failed:", error);

            console.error(
                "Backend response:",
                error.response?.data
            );

            setError(
                error.response?.data?.message ||
                "Failed to create department."
            );

        } finally {

            setSaving(false);

        }
    };


    return (

        <Layout>

            <div className="max-w-4xl mx-auto space-y-6">


                {/* HEADER */}

                <div className="
                    flex
                    items-center
                    justify-between
                ">

                    <div>

                        <h1 className="
                            text-3xl
                            font-bold
                            text-gray-900
                        ">

                            Add Department

                        </h1>

                        <p className="
                            text-gray-500
                            mt-1
                        ">

                            Create a new organizational department

                        </p>

                    </div>


                    <button
                        onClick={() => navigate("/departments")}
                        className="
                            flex
                            items-center
                            gap-2
                            px-4
                            py-2.5
                            rounded-xl
                            bg-gray-100
                            text-gray-700
                            hover:bg-gray-200
                            transition
                        "
                    >

                        <FaArrowLeft />

                        Back

                    </button>

                </div>


                {/* FORM CARD */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    border-gray-100
                    overflow-hidden
                ">


                    {/* CARD HEADER */}

                    <div className="
                        px-6
                        py-5
                        bg-gradient-to-r
                        from-blue-600
                        to-indigo-600
                        text-white
                    ">

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-white/20
                                flex
                                items-center
                                justify-center
                                text-xl
                            ">

                                <FaBuilding />

                            </div>


                            <div>

                                <h2 className="
                                    text-xl
                                    font-bold
                                ">

                                    Department Information

                                </h2>

                                <p className="
                                    text-blue-100
                                    text-sm
                                    mt-1
                                ">

                                    Enter the department details below

                                </p>

                            </div>

                        </div>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-6 space-y-6"
                    >


                        {/* ERROR */}

                        {error && (

                            <div className="
                                p-4
                                rounded-xl
                                bg-red-50
                                border
                                border-red-100
                                text-red-600
                            ">

                                {error}

                            </div>

                        )}


                        {/* NAME + CODE */}

                        <div className="
                            grid
                            grid-cols-1
                            md:grid-cols-2
                            gap-5
                        ">


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">

                                    Department Name

                                </label>

                                <input
                                    type="text"
                                    name="departmentName"
                                    value={formData.departmentName}
                                    onChange={handleChange}
                                    placeholder="e.g. Information Technology"
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-200
                                        rounded-xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-transparent
                                    "
                                />

                            </div>


                            <div>

                                <label className="
                                    block
                                    text-sm
                                    font-semibold
                                    text-gray-700
                                    mb-2
                                ">

                                    Department Code

                                </label>

                                <input
                                    type="text"
                                    name="departmentCode"
                                    value={formData.departmentCode}
                                    onChange={handleChange}
                                    placeholder="e.g. IT"
                                    required
                                    className="
                                        w-full
                                        px-4
                                        py-3
                                        border
                                        border-gray-200
                                        rounded-xl
                                        outline-none
                                        focus:ring-2
                                        focus:ring-blue-500
                                        focus:border-transparent
                                        uppercase
                                    "
                                />

                            </div>

                        </div>


                        {/* DESCRIPTION */}

                        <div>

                            <label className="
                                block
                                text-sm
                                font-semibold
                                text-gray-700
                                mb-2
                            ">

                                Description

                            </label>

                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Describe the department..."
                                rows="5"
                                className="
                                    w-full
                                    px-4
                                    py-3
                                    border
                                    border-gray-200
                                    rounded-xl
                                    outline-none
                                    resize-none
                                    focus:ring-2
                                    focus:ring-blue-500
                                    focus:border-transparent
                                "
                            />

                        </div>


                        {/* BUTTONS */}

                        <div className="
                            flex
                            justify-end
                            gap-3
                            pt-5
                            border-t
                            border-gray-100
                        ">

                            <button
                                type="button"
                                onClick={() =>
                                    navigate("/departments")
                                }
                                className="
                                    px-5
                                    py-3
                                    rounded-xl
                                    bg-gray-100
                                    text-gray-700
                                    hover:bg-gray-200
                                    transition
                                "
                            >

                                Cancel

                            </button>


                            <button
                                type="submit"
                                disabled={saving}
                                className="
                                    flex
                                    items-center
                                    gap-2
                                    px-6
                                    py-3
                                    rounded-xl
                                    bg-blue-600
                                    text-white
                                    font-semibold
                                    hover:bg-blue-700
                                    disabled:opacity-50
                                    transition
                                "
                            >

                                <FaSave />

                                {saving
                                    ? "Creating..."
                                    : "Create Department"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};


export default AddDepartment;