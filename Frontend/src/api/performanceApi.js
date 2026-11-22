import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const getAuthConfig = () => {

    const token = localStorage.getItem("token");

    return {
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        }
    };
};


// =====================================================
// GET ALL PERFORMANCE REVIEWS
// =====================================================

export const getAllPerformanceReviews = async () => {

    const response = await axios.get(
        `${API_URL}/performance`,
        getAuthConfig()
    );

    return response.data;
};


// =====================================================
// GET PERFORMANCE BY EMPLOYEE
// =====================================================

export const getPerformanceByEmployee = async (employeeId) => {

    const response = await axios.get(
        `${API_URL}/performance/employee/${employeeId}`,
        getAuthConfig()
    );

    return response.data;
};


// =====================================================
// ADD PERFORMANCE REVIEW
// =====================================================

export const addPerformanceReview = async (performanceData) => {

    const response = await axios.post(
        `${API_URL}/performance`,
        performanceData,
        getAuthConfig()
    );

    return response.data;
};


// =====================================================
// UPDATE PERFORMANCE REVIEW
// =====================================================

export const updatePerformanceReview = async (
    reviewId,
    performanceData
) => {

    const response = await axios.put(
        `${API_URL}/performance/${reviewId}`,
        performanceData,
        getAuthConfig()
    );

    return response.data;
};


// =====================================================
// DELETE PERFORMANCE REVIEW
// =====================================================

export const deletePerformanceReview = async (reviewId) => {

    await axios.delete(
        `${API_URL}/performance/${reviewId}`,
        getAuthConfig()
    );
};