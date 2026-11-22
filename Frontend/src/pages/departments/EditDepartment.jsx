import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    FaArrowLeft,
    FaBuilding,
    FaSave
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    getDepartmentById,
    updateDepartment
} from "../../services/departmentService";


const EditDepartment = () => {

    const { id } = useParams();

    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        departmentName: "",
        departmentCode: "",
        description: ""
    });


    const [loading, setLoading] = useState(true);

    const [saving, setSaving] = useState(false);

    const [error, setError] = useState("");


    // =========================
    // LOAD
    // =========================

    useEffect(() => {

        const loadDepartment = async () => {

            try {

                const data = await getDepartmentById(id);

                setFormData({
                    departmentName: data.departmentName || "",
                    departmentCode: data.departmentCode || "",
                    description: data.description || ""
                });

            } catch (error) {

                console.error(error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load department."
                );

            } finally {

                setLoading(false);

            }
        };

        loadDepartment();

    }, [id]);


    // =========================
    // CHANGE
    // =========================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData((previous) => ({
            ...previous,
            [name]: value
        }));
    };


    // =========================
    // UPDATE
    // =========================

    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");

        setSaving(true);

        try {

            await updateDepartment(id, formData);

            alert("Department updated successfully!");

            navigate("/departments");

        } catch (error) {

            console.error("Update failed:", error);

            setError(
                error.response?.data?.message ||
                "Failed to update department."
            );

        } finally {

            setSaving(false);

        }
    };


    if (loading) {

        return (

            <Layout>

                <div className="
                    min-h-[400px]
                    flex
                    justify-center
                    items-center
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

            </Layout>
        );
    }


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

                            Edit Department

                        </h1>

                        <p className="
                            text-gray-500
                            mt-1
                        ">

                            Update department information

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
                        "
                    >

                        <FaArrowLeft />

                        Back

                    </button>

                </div>


                {/* CARD */}

                <div className="
                    bg-white
                    rounded-2xl
                    shadow-sm
                    border
                    border-gray-100
                    overflow-hidden
                ">


                    <div className="
                        px-6
                        py-5
                        bg-gradient-to-r
                        from-indigo-600
                        to-purple-600
                        text-white
                    ">

                        <div className="flex items-center gap-4">

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

                                <h2 className="text-xl font-bold">

                                    Department Information

                                </h2>

                                <p className="text-indigo-100 text-sm">

                                    Update the details below

                                </p>

                            </div>

                        </div>

                    </div>


                    <form
                        onSubmit={handleSubmit}
                        className="p-6 space-y-6"
                    >


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
                                    "
                                />

                            </div>

                        </div>


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
                                "
                            />

                        </div>


                        <div className="
                            flex
                            justify-end
                            gap-3
                            pt-5
                            border-t
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
                                "
                            >

                                <FaSave />

                                {saving
                                    ? "Updating..."
                                    : "Update Department"}

                            </button>

                        </div>

                    </form>

                </div>

            </div>

        </Layout>
    );
};


export default EditDepartment;