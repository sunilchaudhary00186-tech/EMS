import AdminDashboard from "./admin/AdminDashboard";
import HrDashboard from "./hr/HrDashboard";
import EmployeeDashboard from "./employee/EmployeeDashboard";

const Dashboard = () => {

    const role = localStorage.getItem("role");

    console.log("Dashboard role:", role);

    if (role === "ADMIN") {
        return <AdminDashboard />;
    }

    if (role === "HR") {
        return <HrDashboard />;
    }

    if (role === "EMPLOYEE") {
        return <EmployeeDashboard />;
    }

    return (
        <div className="p-6">

            <div className="
                bg-red-50
                border
                border-red-200
                rounded-xl
                p-6
            ">

                <h1 className="
                    text-xl
                    font-bold
                    text-red-600
                ">
                    Invalid Role
                </h1>

                <p className="
                    text-red-500
                    mt-2
                ">
                    Unable to determine your dashboard.
                </p>

            </div>

        </div>
    );
};

export default Dashboard;