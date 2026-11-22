import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getMyPayslips } from "../../api/payrollApi";

const MyPayslip = () => {

    const [payslips, setPayslips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadPayslips = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getMyPayslips();

                console.log("My Payslips:", data);

                setPayslips(
                    Array.isArray(data) ? data : []
                );

            } catch (err) {

                console.error(
                    "Failed to load payslips:",
                    err
                );

                setError(
                    err.response?.data?.message ||
                    "Failed to load payslips."
                );

            } finally {

                setLoading(false);

            }
        };

        loadPayslips();

    }, []);


    const formatCurrency = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR"
        }).format(amount || 0);

    };


    if (loading) {

        return (
            <Layout>
                <div className="p-6">
                    Loading your payslips...
                </div>
            </Layout>
        );

    }


    if (error) {

        return (
            <Layout>
                <div className="p-6">

                    <h1 className="text-3xl font-bold">
                        My Payslip
                    </h1>

                    <div className="mt-6 bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
                        {error}
                    </div>

                </div>
            </Layout>
        );

    }


    return (
        <Layout>

            <div className="p-6">

                <h1 className="text-3xl font-bold text-gray-900">
                    My Payslip
                </h1>

                <p className="text-gray-500 mt-1">
                    View your salary and payslip details
                </p>


                {payslips.length === 0 ? (

                    <div className="mt-8 bg-white border rounded-xl p-10 text-center">

                        <h2 className="text-xl font-semibold">
                            No Payslip Available
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Your payroll has not been generated yet.
                        </p>

                    </div>

                ) : (

                    <div className="mt-8 space-y-6">

                        {payslips.map((payslip) => (

                            <div
                                key={payslip.payrollId}
                                className="bg-white border rounded-xl p-6 shadow-sm"
                            >

                                {/* HEADER */}

                                <div className="flex justify-between items-center border-b pb-4">

                                    <div>
                                        <h2 className="text-2xl font-bold">
                                            Salary Payslip
                                        </h2>

                                        <p className="text-gray-500">
                                            {payslip.month} {payslip.year}
                                        </p>
                                    </div>

                                    <div className="text-right">

                                        <p className="text-sm text-gray-500">
                                            Employee Code
                                        </p>

                                        <p className="font-semibold">
                                            {payslip.employeeCode}
                                        </p>

                                    </div>

                                </div>


                                {/* EMPLOYEE DETAILS */}

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-6">

                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Employee Name
                                        </p>

                                        <p className="font-semibold">
                                            {payslip.employeeName}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Department
                                        </p>

                                        <p className="font-semibold">
                                            {payslip.department}
                                        </p>
                                    </div>


                                    <div>
                                        <p className="text-sm text-gray-500">
                                            Designation
                                        </p>

                                        <p className="font-semibold">
                                            {payslip.designation}
                                        </p>
                                    </div>

                                </div>


                                {/* ATTENDANCE */}

                                <div className="border-t pt-6">

                                    <h3 className="text-lg font-semibold mb-4">
                                        Attendance
                                    </h3>

                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">
                                                Working Days
                                            </p>

                                            <p className="text-xl font-bold">
                                                {payslip.workingDays}
                                            </p>
                                        </div>


                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">
                                                Present Days
                                            </p>

                                            <p className="text-xl font-bold">
                                                {payslip.presentDays}
                                            </p>
                                        </div>


                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">
                                                Paid Leaves
                                            </p>

                                            <p className="text-xl font-bold">
                                                {payslip.paidLeaves}
                                            </p>
                                        </div>


                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <p className="text-sm text-gray-500">
                                                Loss of Pay
                                            </p>

                                            <p className="text-xl font-bold">
                                                {payslip.lossOfPayDays}
                                            </p>
                                        </div>

                                    </div>

                                </div>


                                {/* SALARY */}

                                <div className="border-t mt-6 pt-6">

                                    <h3 className="text-lg font-semibold mb-4">
                                        Salary Details
                                    </h3>

                                    <div className="space-y-3">

                                        <div className="flex justify-between">
                                            <span>
                                                Basic Salary
                                            </span>

                                            <span className="font-semibold">
                                                {formatCurrency(
                                                    payslip.basicSalary
                                                )}
                                            </span>
                                        </div>


                                        <div className="flex justify-between">
                                            <span>
                                                Bonus
                                            </span>

                                            <span className="font-semibold text-green-600">
                                                + {formatCurrency(
                                                    payslip.bonus
                                                )}
                                            </span>
                                        </div>


                                        <div className="flex justify-between">
                                            <span>
                                                Deductions
                                            </span>

                                            <span className="font-semibold text-red-600">
                                                - {formatCurrency(
                                                    payslip.deductions
                                                )}
                                            </span>
                                        </div>


                                        <div className="border-t pt-4 flex justify-between text-xl">

                                            <span className="font-bold">
                                                Net Salary
                                            </span>

                                            <span className="font-bold">
                                                {formatCurrency(
                                                    payslip.netSalary
                                                )}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </Layout>
    );
};

export default MyPayslip;