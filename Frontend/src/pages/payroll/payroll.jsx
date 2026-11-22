import { useEffect, useState } from "react";
import { FaMoneyBillWave, FaFileInvoiceDollar } from "react-icons/fa";

import Layout from "../../components/layout/Layout";

import {
    generatePayroll
} from "../../services/payrollService";

import {
    getAllEmployees
} from "../../services/employeeService";


const Payroll = () => {

    const [employees, setEmployees] = useState([]);

    const [formData, setFormData] = useState({
        employeeId: "",
        month: new Date().getMonth() + 1,
        year: new Date().getFullYear(),
        bonus: 0,
        deductions: 0
    });

    const [payroll, setPayroll] = useState(null);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");


    // ==========================================
    // LOAD EMPLOYEES
    // ==========================================

    useEffect(() => {

        const loadEmployees = async () => {

            try {

                const response = await getAllEmployees(0, 100);

                setEmployees(
                    response.content || []
                );

            } catch (error) {

                console.error(error);

                setError(
                    "Failed to load employees"
                );
            }
        };

        loadEmployees();

    }, []);


    // ==========================================
    // HANDLE INPUT
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };


    // ==========================================
    // GENERATE PAYROLL
    // ==========================================

    const handleGeneratePayroll = async (e) => {

        e.preventDefault();

        setError("");
        setSuccess("");
        setPayroll(null);

        if (!formData.employeeId) {

            setError(
                "Please select an employee"
            );

            return;
        }

        try {

            setLoading(true);

            const data = await generatePayroll({
                employeeId: Number(formData.employeeId),
                month: Number(formData.month),
                year: Number(formData.year),
                bonus: Number(formData.bonus),
                deductions: Number(formData.deductions)
            });

            setPayroll(data);

            setSuccess(
                "Payroll generated successfully"
            );

        } catch (error) {

            console.error(error);

            setError(
                error.response?.data?.message ||
                "Failed to generate payroll"
            );

        } finally {

            setLoading(false);
        }
    };


    // ==========================================
    // MONTH NAMES
    // ==========================================

    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
    ];


    // ==========================================
    // CURRENCY FORMAT
    // ==========================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat(
            "en-IN",
            {
                style: "currency",
                currency: "INR",
                maximumFractionDigits: 2
            }
        ).format(amount || 0);
    };


    return (

        <Layout>

            <div className="p-6">

                {/* ================================= */}
                {/* PAGE HEADER */}
                {/* ================================= */}

                <div className="mb-6">

                    <h1 className="text-2xl font-bold text-gray-800">
                        Payroll
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Generate and manage employee payroll
                    </p>

                </div>


                {/* ================================= */}
                {/* ERROR */}
                {/* ================================= */}

                {error && (

                    <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700">

                        {error}

                    </div>
                )}


                {/* ================================= */}
                {/* SUCCESS */}
                {/* ================================= */}

                {success && (

                    <div className="mb-4 p-3 rounded-lg bg-green-100 text-green-700">

                        {success}

                    </div>
                )}


                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


                    {/* ================================= */}
                    {/* GENERATE PAYROLL FORM */}
                    {/* ================================= */}

                    <div className="lg:col-span-1 bg-white rounded-xl shadow-sm border p-6">

                        <div className="flex items-center gap-3 mb-6">

                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">

                                <FaMoneyBillWave className="text-blue-600" />

                            </div>

                            <div>

                                <h2 className="font-semibold text-lg">
                                    Generate Payroll
                                </h2>

                                <p className="text-sm text-gray-500">
                                    Create monthly salary
                                </p>

                            </div>

                        </div>


                        <form
                            onSubmit={handleGeneratePayroll}
                            className="space-y-4"
                        >


                            {/* EMPLOYEE */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">

                                    Employee

                                </label>

                                <select
                                    name="employeeId"
                                    value={formData.employeeId}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >

                                    <option value="">
                                        Select Employee
                                    </option>

                                    {employees.map(employee => (

                                        <option
                                            key={employee.id}
                                            value={employee.id}
                                        >

                                            {employee.firstName}{" "}
                                            {employee.lastName}

                                            {" - "}

                                            {employee.employeeCode}

                                        </option>

                                    ))}

                                </select>

                            </div>


                            {/* MONTH */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">

                                    Month

                                </label>

                                <select
                                    name="month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                >

                                    {months.map(
                                        (month, index) => (

                                            <option
                                                key={month}
                                                value={index + 1}
                                            >

                                                {month}

                                            </option>
                                        )
                                    )}

                                </select>

                            </div>


                            {/* YEAR */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">

                                    Year

                                </label>

                                <input
                                    type="number"
                                    name="year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>


                            {/* BONUS */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">

                                    Bonus

                                </label>

                                <input
                                    type="number"
                                    name="bonus"
                                    min="0"
                                    value={formData.bonus}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>


                            {/* DEDUCTIONS */}

                            <div>

                                <label className="block text-sm font-medium text-gray-700 mb-1">

                                    Other Deductions

                                </label>

                                <input
                                    type="number"
                                    name="deductions"
                                    min="0"
                                    value={formData.deductions}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-3 py-2"
                                />

                            </div>


                            {/* BUTTON */}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-50"
                            >

                                {loading
                                    ? "Generating..."
                                    : "Generate Payroll"
                                }

                            </button>

                        </form>

                    </div>


                    {/* ================================= */}
                    {/* PAYROLL RESULT */}
                    {/* ================================= */}

                    <div className="lg:col-span-2">

                        {!payroll ? (

                            <div className="h-full bg-white rounded-xl shadow-sm border flex flex-col items-center justify-center p-10 text-center">

                                <FaFileInvoiceDollar
                                    className="text-gray-300 text-6xl mb-4"
                                />

                                <h2 className="text-xl font-semibold text-gray-700">

                                    No Payroll Generated

                                </h2>

                                <p className="text-gray-500 mt-2">

                                    Select an employee and generate
                                    their monthly payroll.

                                </p>

                            </div>

                        ) : (

                            <div className="bg-white rounded-xl shadow-sm border p-6">

                                {/* HEADER */}

                                <div className="flex justify-between items-center border-b pb-5 mb-5">

                                    <div>

                                        <h2 className="text-xl font-bold">

                                            {payroll.employeeName}

                                        </h2>

                                        <p className="text-gray-500">

                                            {months[payroll.month - 1]}{" "}
                                            {payroll.year}

                                        </p>

                                    </div>

                                    <div className="text-right">

                                        <p className="text-sm text-gray-500">
                                            Net Salary
                                        </p>

                                        <p className="text-2xl font-bold text-green-600">

                                            {formatCurrency(
                                                payroll.netSalary
                                            )}

                                        </p>

                                    </div>

                                </div>


                                {/* ATTENDANCE */}

                                <h3 className="font-semibold mb-3">

                                    Attendance Summary

                                </h3>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">

                                    <div className="bg-gray-50 p-4 rounded-lg">

                                        <p className="text-sm text-gray-500">
                                            Working Days
                                        </p>

                                        <p className="text-xl font-bold">
                                            {payroll.workingDays}
                                        </p>

                                    </div>


                                    <div className="bg-green-50 p-4 rounded-lg">

                                        <p className="text-sm text-gray-500">
                                            Present Days
                                        </p>

                                        <p className="text-xl font-bold text-green-600">
                                            {payroll.presentDays}
                                        </p>

                                    </div>


                                    <div className="bg-blue-50 p-4 rounded-lg">

                                        <p className="text-sm text-gray-500">
                                            Paid Leaves
                                        </p>

                                        <p className="text-xl font-bold text-blue-600">
                                            {payroll.paidLeaves}
                                        </p>

                                    </div>


                                    <div className="bg-red-50 p-4 rounded-lg">

                                        <p className="text-sm text-gray-500">
                                            Loss of Pay
                                        </p>

                                        <p className="text-xl font-bold text-red-600">
                                            {payroll.lossOfPayDays}
                                        </p>

                                    </div>

                                </div>


                                {/* SALARY */}

                                <h3 className="font-semibold mb-3">

                                    Salary Details

                                </h3>

                                <div className="space-y-3">


                                    <div className="flex justify-between">

                                        <span className="text-gray-600">
                                            Basic Salary
                                        </span>

                                        <span className="font-medium">
                                            {formatCurrency(
                                                payroll.basicSalary
                                            )}
                                        </span>

                                    </div>


                                    <div className="flex justify-between">

                                        <span className="text-gray-600">
                                            Daily Salary
                                        </span>

                                        <span className="font-medium">
                                            {formatCurrency(
                                                payroll.dailySalary
                                            )}
                                        </span>

                                    </div>


                                    <div className="flex justify-between text-green-600">

                                        <span>
                                            Bonus
                                        </span>

                                        <span>
                                            + {formatCurrency(
                                                payroll.bonus
                                            )}
                                        </span>

                                    </div>


                                    <div className="flex justify-between text-red-600">

                                        <span>
                                            Deductions
                                        </span>

                                        <span>
                                            - {formatCurrency(
                                                payroll.deductions
                                            )}
                                        </span>

                                    </div>


                                    <div className="border-t pt-4 flex justify-between text-lg font-bold">

                                        <span>
                                            Net Salary
                                        </span>

                                        <span className="text-green-600">

                                            {formatCurrency(
                                                payroll.netSalary
                                            )}

                                        </span>

                                    </div>

                                </div>


                            </div>
                        )}

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default Payroll;