import api from "../api/axios";

export const getPayrollReport = async () => {
    const response = await api.get("/reports/payroll");

    return response.data;
};