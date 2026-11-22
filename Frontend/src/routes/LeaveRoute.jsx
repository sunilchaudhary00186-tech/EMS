import { useAuth } from "../context/AuthContext";
import MyLeave from "../pages/employee/MyLeave";

import LeaveManagement from "../pages/leaves/LeaveManagement";
// We will create this next for employees
// import MyLeaves from "../pages/leaves/MyLeaves";


function LeaveRoute() {

    const { auth } = useAuth();

    // HR / ADMIN
    if (
        auth?.role === "ADMIN" ||
        auth?.role === "HR"
    ) {
        return <LeaveManagement />;
    }

    // EMPLOYEE
    if (auth?.role === "EMPLOYEE") {

        // For now you can return LeaveManagement
        // until MyLeaves.jsx is created.
        return <MyLeave />;

        // Later:
        // return <MyLeaves />;
    }

    return null;
}

export default LeaveRoute;