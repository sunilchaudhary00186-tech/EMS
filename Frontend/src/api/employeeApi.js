import api from "./axios";

export const createEmployee = (employeeData) => {
    return api.post("/employees", employeeData);
};

export const getEmployees = () => {
    return api.get("/employees");
};

export const getEmployeeById = (id) => {
    return api.get(`/employees/${id}`);
};

export const updateEmployee = (id, employeeData) => {
    return api.put(`/employees/${id}`, employeeData);
};

export const deleteEmployee = (id) => {
    return api.delete(`/employees/${id}`);
};

export const getMyProfile = async () => {
    const response = await api.get("/employees/profile");
    return response.data;
};