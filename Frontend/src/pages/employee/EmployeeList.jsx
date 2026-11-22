import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";

import Layout from "../../components/layout/Layout";
import EmployeeTable from "../../components/employee/EmployeeTable";

import { getAllEmployees } from "../../services/employeeService";

const EmployeeList = () => {

    const navigate = useNavigate();

    const [employees, setEmployees] = useState([]);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [totalEmployees, setTotalEmployees] = useState(0);

    // Load employees
    useEffect(() => {
        loadEmployees();
    }, [page]);

    // Get employees from backend
    const loadEmployees = async () => {

        try {

            const data = await getAllEmployees(page, 10);

            setEmployees(data.content);
            setTotalPages(data.totalPages);
            setTotalEmployees(data.totalElements);

        } catch (error) {

            console.log("Error loading employees:", error);

        }
    };

    return (

        <Layout>

            {/* HEADER */}

            <div className="flex justify-between items-center mb-6">

                <div>

                    <h1 className="text-3xl font-bold">
                        Employee Management
                    </h1>

                    <p className="text-gray-500">
                        Total Employees :

                        <span className="font-semibold ml-2">
                            {totalEmployees}
                        </span>
                    </p>

                </div>

                {/* ADD EMPLOYEE BUTTON */}

                <button
                    onClick={() => navigate("/employees/add")}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"
                >

                    <FaPlus />

                    Add Employee

                </button>

            </div>

            {/* EMPLOYEE TABLE */}

            <EmployeeTable employees={employees} />

            {/* PAGINATION */}

            <div className="flex justify-between items-center mt-6">

                {/* PREVIOUS */}

                <button
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                    className={`px-4 py-2 rounded-lg text-white ${
                        page === 0
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >

                    ← Previous

                </button>

                {/* PAGE NUMBER */}

                <span className="font-semibold">

                    Page {page + 1} of {totalPages}

                </span>

                {/* NEXT */}

                <button
                    onClick={() => setPage(page + 1)}
                    disabled={page + 1 >= totalPages}
                    className={`px-4 py-2 rounded-lg text-white ${
                        page + 1 >= totalPages
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-blue-600 hover:bg-blue-700"
                    }`}
                >

                    Next →

                </button>

            </div>

        </Layout>
    );
};

export default EmployeeList;