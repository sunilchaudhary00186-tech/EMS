import api from "./axios";

// ==========================================
// HR DASHBOARD
// ==========================================

export const getHrDashboard = async () => {

    const response = await api.get("/dashboard/hr");

    return response.data;
};


// ==========================================
// ADMIN DASHBOARD
// ==========================================

export const getAdminDashboard = async () => {

    const response = await api.get("/dashboard/admin");

    return response.data;
};


// ==========================================
// EMPLOYEE DASHBOARD
// ==========================================

export const getEmployeeDashboard = async () => {

    const response = await api.get("/dashboard/employee");

    return response.data;
};