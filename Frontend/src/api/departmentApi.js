import api from "./axios";

// Get all departments
export const getAllDepartments = async () => {
    const response = await api.get("/departments");
    return response.data;
};

// Get department by ID
export const getDepartmentById = async (id) => {
    const response = await api.get(`/departments/${id}`);
    return response.data;
};

// Create department
export const createDepartment = async (department) => {
    const response = await api.post("/departments", department);
    return response.data;
};

// Update department
export const updateDepartment = async (id, department) => {
    const response = await api.put(`/departments/${id}`, department);
    return response.data;
};

// Delete department
export const deleteDepartment = async (id) => {
    const response = await api.delete(`/departments/${id}`);
    return response.data;
};