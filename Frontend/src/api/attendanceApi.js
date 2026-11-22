import api from "./axios";

// ==========================================
// EMPLOYEE ATTENDANCE
// ==========================================

export const checkIn = async () => {
    try {
        const response = await api.post("/attendance/check-in");

        return response?.data ?? null;
    } catch (error) {
        console.error("Check-in failed:", error);
        throw error;
    }
};


// ==========================================
// CHECK OUT
// ==========================================

export const checkOut = async () => {
    try {
        const response = await api.put("/attendance/check-out");

        return response?.data ?? null;
    } catch (error) {
        console.error("Check-out failed:", error);
        throw error;
    }
};


// ==========================================
// MY ATTENDANCE
// ==========================================

export const getMyAttendance = async () => {
    try {
        const response = await api.get("/attendance/my");

        return Array.isArray(response?.data)
            ? response.data
            : [];
    } catch (error) {
        console.error("Get my attendance failed:", error);

        throw error;
    }
};


// ==========================================
// ADMIN / HR ATTENDANCE
// ==========================================

export const getAllAttendance = async () => {
    try {
        const response = await api.get("/attendance/all");

        console.log("Attendance API response:", response);

        return Array.isArray(response?.data)
            ? response.data
            : [];

    } catch (error) {
        console.error("Get all attendance failed:", error);

        throw error;
    }
};