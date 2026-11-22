import api from "../api/axios";

export const getAllEmployees = async (
    page = 0,
    size = 10,
    search = ""
) => {
    const response = await api.get("/employees", {
        params: {
            page,
            size,
            search
        }
    });

    return response.data;
};


export const getEmployeeById = async (id) => {
    const response = await api.get(`/employees/${id}`);

    return response.data;
};


export const createEmployee = async (employee) => {
    console.log("API sending:", employee);

    const response = await api.post("/employees", employee);

    return response.data;
};


export const updateEmployee = async (id, employee) => {

    console.log("Updating employee:", id, employee);

    const response = await api.put(
        `/employees/${id}`,
        employee
    );

    return response.data;
};