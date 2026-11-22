import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const normalizeRole = (value) => {
    if (!value) return "";

    const roleValue = Array.isArray(value) ? value[0] : value;
    const normalized = String(roleValue).trim();

    if (!normalized || normalized === "undefined" || normalized === "null") {
        return "";
    }

    return normalized.toUpperCase().replace(/^ROLE_/, "");
};

export function AuthProvider({ children }) {

    const [auth, setAuth] = useState(() => ({
        token: localStorage.getItem("token") || "",
        username: localStorage.getItem("username") || "",
        role: normalizeRole(localStorage.getItem("role")),
    }));

    const login = (data) => {
        const payload = data?.data ?? data ?? {};
        const token = payload.token || payload.accessToken || "";
        const username = payload.username || payload.userName || payload.name || "";
        const role = normalizeRole(
            payload.role ||
            payload.roles?.[0] ||
            payload.authorities?.[0] ||
            payload.user?.role
        );

        localStorage.setItem("token", token);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        setAuth({
            token,
            username,
            role,
        });
    };

    const logout = () => {

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        setAuth({
            token: "",
            username: "",
            role: "",
        });
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);