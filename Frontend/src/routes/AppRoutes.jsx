import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "./ProtectedRoute";

// Employee Management
import EmployeeList from "../pages/employee/EmployeeList";
import AddEmployee from "../pages/employee/AddEmployee";
import ViewEmployee from "../pages/employee/ViewEmployee";
import EditEmployee from "../pages/employee/EditEmployee";

// Departments
import DepartmentList from "../pages/departments/DepartmentList";
import AddDepartment from "../pages/departments/AddDepartment";
import EditDepartment from "../pages/departments/EditDepartment";
import DepartmentDetails from "../pages/departments/DepartmentDetails";

// Attendance
import AttendanceRoute from "./AttendanceRoute";
import LeaveRoute from "./LeaveRoute";
import Payroll from "../pages/payroll/payroll";
import Reports from "../pages/admin/Reports";
import Performance from "../pages/performance";
import Promotion from "../pages/promotion";
import MyPayslip from "../pages/employee/MyPayslip";
import MyProfile from "../pages/employee/MyProfile";


function AppRoutes() {

    return (

        <BrowserRouter>

            <Routes>

                {/* =========================================
                    LOGIN
                ========================================= */}

                <Route
                    path="/"
                    element={<Login />}
                />


                {/* =========================================
                    DASHBOARD
                ========================================= */}

                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    }
                />


                {/* =========================================
                    EMPLOYEES
                    HR / ADMIN
                ========================================= */}

                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/add"
                    element={
                        <ProtectedRoute>
                            <AddEmployee />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/view/:id"
                    element={
                        <ProtectedRoute>
                            <ViewEmployee />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/employees/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    }
                />


                {/* =========================================
                    DEPARTMENTS
                    HR / ADMIN
                ========================================= */}

                <Route
                    path="/departments"
                    element={
                        <ProtectedRoute>
                            <DepartmentList />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/departments/add"
                    element={
                        <ProtectedRoute>
                            <AddDepartment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/departments/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditDepartment />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/departments/:id"
                    element={
                        <ProtectedRoute>
                            <DepartmentDetails />
                        </ProtectedRoute>
                    }
                />


              {/* =========================================
    ATTENDANCE
========================================= */}

<Route
    path="/attendance"
    element={<AttendanceRoute />}
/>


{/* =========================================
    LEAVES
========================================= */}

<Route
    path="/leaves"
    element={<LeaveRoute />}
/>

<Route
    path="/payroll"
    element={<Payroll />}
/>

<Route
    path="/reports"
    element={<Reports />}
/>


<Route
    path="/performance"
    element={<Performance />}
/>

<Route
    path="/promotions"
    element={
        <ProtectedRoute>
            <Promotion />
        </ProtectedRoute>
    }
/>

<Route
    path="/my-payslip"
    element={<MyPayslip />}
/>

<Route
    path="/profile"
    element={<MyProfile />}
/>

                {/* =========================================
                    UNKNOWN URL
                ========================================= */}

                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/dashboard"
                            replace
                        />
                    }
                />
                

            </Routes>

        </BrowserRouter>
    );
}

export default AppRoutes;