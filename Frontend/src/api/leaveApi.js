import api from "./axios";

// ==========================================
// HR / ADMIN - GET ALL LEAVES
// ==========================================

export const getAllLeaves = async () => {

    const response = await api.get("/leaves/all");

    return response.data;
};


// ==========================================
// EMPLOYEE - GET MY LEAVES
// ==========================================

export const getMyLeaves = async () => {

    const response = await api.get("/leaves/my");

    return response.data;
};


// ==========================================
// EMPLOYEE - APPLY LEAVE
// ==========================================

export const applyLeave = async (data) => {

    const response = await api.post(
        "/leaves/apply",
        data
    );

    return response.data;
};


// ==========================================
// HR / ADMIN - APPROVE LEAVE
// ==========================================

export const approveLeave = async (id) => {

    const response = await api.put(
        `/leaves/${id}/approve`
    );

    return response.data;
};


// ==========================================
// HR / ADMIN - REJECT LEAVE
// ==========================================

export const rejectLeave = async (id) => {

    const response = await api.put(
        `/leaves/${id}/reject`
    );

    return response.data;
};