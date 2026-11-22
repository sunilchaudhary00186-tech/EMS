import { useAuth } from "../context/AuthContext";

import MyAttendance from "../pages/attendance/MyAttendance";
import AttendanceManagement from "../pages/attendance/AttendanceManagement";


function AttendanceRoute() {

    const { auth } = useAuth();

    if (auth?.role === "ADMIN" ||
        auth?.role === "HR") {

        return <AttendanceManagement />;

    }

    if (auth?.role === "EMPLOYEE") {

        return <MyAttendance />;

    }

    return null;
}

export default AttendanceRoute;