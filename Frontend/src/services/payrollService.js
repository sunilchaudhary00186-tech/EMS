import api from "../api/axios";

export const generatePayroll = async (payrollData) => {
    const response = await api.post(
        "/payroll/generate",
        payrollData
    );

    return response.data;
};

export const getPayslip = async (payrollId) => {
    const response = await api.get(
        `/payroll/${payrollId}/payslip`
    );

    return response.data;
};

