import api from "./axios";

export const getMyPayslips = async () => {
    const response = await api.get("/payroll/my");
    return response.data;
};