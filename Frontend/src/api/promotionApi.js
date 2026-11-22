import api from "./axios";


// ==========================================
// CREATE PROMOTION
// ==========================================

export const promoteEmployee = async (data) => {

    const response = await api.post(
        "/promotions",
        data
    );

    return response.data;
};


// ==========================================
// GET ALL PROMOTIONS
// ==========================================

export const getAllPromotions = async () => {

    const response = await api.get(
        "/promotions"
    );

    return response.data;
};


// ==========================================
// GET EMPLOYEE PROMOTIONS
// ==========================================

export const getEmployeePromotions = async (employeeId) => {

    const response = await api.get(
        `/promotions/employee/${employeeId}`
    );

    return response.data;
};