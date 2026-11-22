import { useEffect, useState } from "react";

import {
    FaMoneyBillWave,
    FaChartLine,
    FaArrowUp,
    FaArrowDown,
    FaFileInvoiceDollar
} from "react-icons/fa";

import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";

import { getPayrollReport } from "../../services/reportService";
import Layout from "../../components/layout/Layout";


const Reports = () => {

    // =====================================================
    // STATE
    // =====================================================

    const [report, setReport] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =====================================================
    // LOAD PAYROLL REPORT
    // =====================================================

    useEffect(() => {

        const loadReport = async () => {

            try {

                setLoading(true);
                setError("");

                const data = await getPayrollReport();

                console.log("Payroll Report:", data);

                setReport(data);

            } catch (error) {

                console.error("Report Error:", error);

                setError(
                    error.response?.data?.message ||
                    "Failed to load payroll report"
                );

            } finally {

                setLoading(false);

            }

        };

        loadReport();

    }, []);


    // =====================================================
    // CURRENCY FORMAT
    // =====================================================

    const formatCurrency = (amount) => {

        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2
        }).format(amount || 0);

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <Layout>

                <div className="p-6">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Reports
                    </h1>

                    <p className="text-gray-500 mt-1">
                        Loading payroll reports...
                    </p>

                </div>

            </Layout>

        );

    }


    // =====================================================
    // ERROR
    // =====================================================

    if (error) {

        return (

            <Layout>

                <div className="p-6">

                    <h1 className="text-3xl font-bold text-gray-900">
                        Reports
                    </h1>

                    <div className="
                        mt-6
                        bg-red-50
                        border
                        border-red-200
                        rounded-xl
                        p-5
                    ">

                        <p className="
                            font-semibold
                            text-red-700
                        ">
                            Unable to load report
                        </p>

                        <p className="
                            text-sm
                            text-red-600
                            mt-1
                        ">
                            {error}
                        </p>

                    </div>

                </div>

            </Layout>

        );

    }


    // =====================================================
    // BASIC SALARY CHART DATA
    // =====================================================

    const salaryChartData = [

        {
            name: "Lowest Basic",

            basicSalary: Number(
                report?.lowestBasicSalary || 0
            )
        },

        {
            name: "Average Basic",

            basicSalary: Number(
                report?.averageBasicSalary || 0
            )
        },

        {
            name: "Highest Basic",

            basicSalary: Number(
                report?.highestBasicSalary || 0
            )
        }

    ];


    // =====================================================
    // NET SALARY CHART DATA
    // =====================================================

    const netSalaryChartData = [

        {
            name: "Lowest Net",

            netSalary: Number(
                report?.lowestNetSalary || 0
            )
        },

        {
            name: "Average Net",

            netSalary: Number(
                report?.averageNetSalary || 0
            )
        },

        {
            name: "Highest Net",

            netSalary: Number(
                report?.highestNetSalary || 0
            )
        }

    ];


    // =====================================================
    // REPORT CARDS
    // =====================================================

    const reportCards = [

        {
            title: "Total Payrolls",

            value:
                report?.totalPayrolls || 0,

            description:
                "Payroll records generated",

            icon:
                FaFileInvoiceDollar,

            iconBg:
                "bg-blue-50",

            iconColor:
                "text-blue-600"
        },


        {
            title: "Total Basic Salary",

            value:
                formatCurrency(
                    report?.totalBasicSalary
                ),

            description:
                "Total basic salary",

            icon:
                FaMoneyBillWave,

            iconBg:
                "bg-indigo-50",

            iconColor:
                "text-indigo-600"
        },


        {
            title: "Total Net Salary",

            value:
                formatCurrency(
                    report?.totalNetSalary
                ),

            description:
                "Total net salary paid",

            icon:
                FaMoneyBillWave,

            iconBg:
                "bg-green-50",

            iconColor:
                "text-green-600"
        },


        {
            title: "Average Basic Salary",

            value:
                formatCurrency(
                    report?.averageBasicSalary
                ),

            description:
                "Average basic salary",

            icon:
                FaChartLine,

            iconBg:
                "bg-purple-50",

            iconColor:
                "text-purple-600"
        }

    ];


    // =====================================================
    // MAIN UI
    // =====================================================

    return (

        <Layout>

            <div className="
                p-6
                bg-gray-50
                min-h-full
            ">


                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div className="mb-7">

                    <div className="
                        flex
                        items-center
                        gap-2
                        text-blue-600
                        mb-2
                    ">

                        <FaChartLine />

                        <span className="text-sm font-medium">
                            Analytics & Reports
                        </span>

                    </div>


                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                    ">
                        Reports
                    </h1>


                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Monitor payroll statistics and salary insights
                    </p>

                </div>


                {/* ================================================= */}
                {/* TOP REPORT CARDS */}
                {/* ================================================= */}

                <div className="
                    grid
                    grid-cols-1
                    sm:grid-cols-2
                    xl:grid-cols-4
                    gap-5
                ">

                    {reportCards.map((card) => {

                        const Icon = card.icon;

                        return (

                            <div
                                key={card.title}
                                className="
                                    bg-white
                                    rounded-xl
                                    border
                                    border-gray-200
                                    p-5
                                    shadow-sm
                                    hover:shadow-md
                                    transition-shadow
                                "
                            >

                                <div
                                    className={`
                                        w-11
                                        h-11
                                        rounded-xl
                                        flex
                                        items-center
                                        justify-center
                                        ${card.iconBg}
                                    `}
                                >

                                    <Icon
                                        className={`
                                            text-lg
                                            ${card.iconColor}
                                        `}
                                    />

                                </div>


                                <div className="mt-5">

                                    <p className="
                                        text-sm
                                        text-gray-500
                                    ">
                                        {card.title}
                                    </p>


                                    <h2 className="
                                        text-2xl
                                        font-bold
                                        text-gray-900
                                        mt-1
                                    ">
                                        {card.value}
                                    </h2>


                                    <p className="
                                        text-xs
                                        text-gray-400
                                        mt-2
                                    ">
                                        {card.description}
                                    </p>

                                </div>

                            </div>

                        );

                    })}

                </div>


                {/* ================================================= */}
                {/* BASIC SALARY HIGHLIGHTS */}
                {/* ================================================= */}

                <div className="
                    mt-6
                    grid
                    grid-cols-1
                    lg:grid-cols-2
                    gap-5
                ">


                    {/* HIGHEST BASIC */}

                    <div className="
                        bg-white
                        rounded-xl
                        border
                        border-gray-200
                        p-6
                        shadow-sm
                    ">

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                bg-green-50
                                rounded-xl
                                flex
                                items-center
                                justify-center
                            ">

                                <FaArrowUp className="
                                    text-green-600
                                " />

                            </div>


                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Highest Basic Salary
                                </p>


                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                    mt-1
                                ">
                                    {formatCurrency(
                                        report?.highestBasicSalary
                                    )}
                                </h2>

                            </div>

                        </div>


                        <div className="
                            mt-5
                            pt-4
                            border-t
                            border-gray-100
                        ">

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Highest employee basic salary
                            </p>

                        </div>

                    </div>


                    {/* LOWEST BASIC */}

                    <div className="
                        bg-white
                        rounded-xl
                        border
                        border-gray-200
                        p-6
                        shadow-sm
                    ">

                        <div className="
                            flex
                            items-center
                            gap-4
                        ">

                            <div className="
                                w-12
                                h-12
                                bg-red-50
                                rounded-xl
                                flex
                                items-center
                                justify-center
                            ">

                                <FaArrowDown className="
                                    text-red-600
                                " />

                            </div>


                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Lowest Basic Salary
                                </p>


                                <h2 className="
                                    text-2xl
                                    font-bold
                                    text-gray-900
                                    mt-1
                                ">
                                    {formatCurrency(
                                        report?.lowestBasicSalary
                                    )}
                                </h2>

                            </div>

                        </div>


                        <div className="
                            mt-5
                            pt-4
                            border-t
                            border-gray-100
                        ">

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Lowest employee basic salary
                            </p>

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* BASIC SALARY CHART */}
                {/* ================================================= */}

                <div className="
                    mt-6
                    bg-white
                    rounded-xl
                    border
                    border-gray-200
                    shadow-sm
                ">

                    <div className="
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-10
                                h-10
                                bg-blue-50
                                rounded-lg
                                flex
                                items-center
                                justify-center
                            ">

                                <FaChartLine className="
                                    text-blue-600
                                " />

                            </div>


                            <div>

                                <h2 className="
                                    font-semibold
                                    text-lg
                                    text-gray-900
                                ">
                                    Basic Salary Statistics
                                </h2>


                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Lowest, average and highest basic salary
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="p-6">

                        <div className="
                            w-full
                            h-[350px]
                        ">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={salaryChartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 20
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="name"
                                    />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Bar
                                        dataKey="basicSalary"
                                        name="Basic Salary"
                                        radius={[8, 8, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* NET SALARY CHART */}
                {/* ================================================= */}

                <div className="
                    mt-6
                    bg-white
                    rounded-xl
                    border
                    border-gray-200
                    shadow-sm
                ">

                    <div className="
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    ">

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-10
                                h-10
                                bg-green-50
                                rounded-lg
                                flex
                                items-center
                                justify-center
                            ">

                                <FaMoneyBillWave className="
                                    text-green-600
                                " />

                            </div>


                            <div>

                                <h2 className="
                                    font-semibold
                                    text-lg
                                    text-gray-900
                                ">
                                    Net Salary Statistics
                                </h2>


                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Lowest, average and highest net salary
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="p-6">

                        <div className="
                            w-full
                            h-[350px]
                        ">

                            <ResponsiveContainer
                                width="100%"
                                height="100%"
                            >

                                <BarChart
                                    data={netSalaryChartData}
                                    margin={{
                                        top: 20,
                                        right: 30,
                                        left: 20,
                                        bottom: 20
                                    }}
                                >

                                    <CartesianGrid
                                        strokeDasharray="3 3"
                                    />

                                    <XAxis
                                        dataKey="name"
                                    />

                                    <YAxis />

                                    <Tooltip
                                        formatter={(value) =>
                                            formatCurrency(value)
                                        }
                                    />

                                    <Bar
                                        dataKey="netSalary"
                                        name="Net Salary"
                                        radius={[8, 8, 0, 0]}
                                    />

                                </BarChart>

                            </ResponsiveContainer>

                        </div>

                    </div>

                </div>


                {/* ================================================= */}
                {/* PAYROLL SUMMARY */}
                {/* ================================================= */}

                <div className="
                    mt-6
                    bg-white
                    rounded-xl
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

                        <div className="
                            flex
                            items-center
                            gap-3
                        ">

                            <div className="
                                w-10
                                h-10
                                bg-blue-50
                                rounded-lg
                                flex
                                items-center
                                justify-center
                            ">

                                <FaFileInvoiceDollar
                                    className="
                                        text-blue-600
                                    "
                                />

                            </div>


                            <div>

                                <h2 className="
                                    font-semibold
                                    text-lg
                                    text-gray-900
                                ">
                                    Payroll Summary
                                </h2>


                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Complete payroll salary overview
                                </p>

                            </div>

                        </div>

                    </div>


                    <div className="
                        divide-y
                        divide-gray-100
                    ">


                        {/* TOTAL PAYROLL */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Total Payroll Records
                            </span>

                            <span className="
                                font-semibold
                                text-gray-900
                            ">
                                {report?.totalPayrolls || 0}
                            </span>

                        </div>


                        {/* TOTAL BASIC */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Total Basic Salary
                            </span>

                            <span className="
                                font-semibold
                                text-indigo-600
                            ">
                                {formatCurrency(
                                    report?.totalBasicSalary
                                )}
                            </span>

                        </div>


                        {/* AVERAGE BASIC */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Average Basic Salary
                            </span>

                            <span className="
                                font-semibold
                                text-gray-900
                            ">
                                {formatCurrency(
                                    report?.averageBasicSalary
                                )}
                            </span>

                        </div>


                        {/* HIGHEST BASIC */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Highest Basic Salary
                            </span>

                            <span className="
                                font-semibold
                                text-green-600
                            ">
                                {formatCurrency(
                                    report?.highestBasicSalary
                                )}
                            </span>

                        </div>


                        {/* LOWEST BASIC */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Lowest Basic Salary
                            </span>

                            <span className="
                                font-semibold
                                text-red-600
                            ">
                                {formatCurrency(
                                    report?.lowestBasicSalary
                                )}
                            </span>

                        </div>


                        {/* TOTAL NET */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Total Net Salary
                            </span>

                            <span className="
                                font-semibold
                                text-green-600
                            ">
                                {formatCurrency(
                                    report?.totalNetSalary
                                )}
                            </span>

                        </div>


                        {/* AVERAGE NET */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Average Net Salary
                            </span>

                            <span className="
                                font-semibold
                                text-gray-900
                            ">
                                {formatCurrency(
                                    report?.averageNetSalary
                                )}
                            </span>

                        </div>


                        {/* HIGHEST NET */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Highest Net Salary
                            </span>

                            <span className="
                                font-semibold
                                text-green-600
                            ">
                                {formatCurrency(
                                    report?.highestNetSalary
                                )}
                            </span>

                        </div>


                        {/* LOWEST NET */}

                        <div className="
                            flex
                            items-center
                            justify-between
                            px-6
                            py-4
                        ">

                            <span className="
                                text-gray-600
                            ">
                                Lowest Net Salary
                            </span>

                            <span className="
                                font-semibold
                                text-red-600
                            ">
                                {formatCurrency(
                                    report?.lowestNetSalary
                                )}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>

    );

};


export default Reports;