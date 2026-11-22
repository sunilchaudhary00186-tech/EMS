import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";

function Login() {

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const { login } = useAuth();

    const navigate = useNavigate();

    const onSubmit = async (data) => {

        try {

            const response = await loginUser(data);
            const payload = response?.data ?? response;

            login(payload);

            toast.success("Login Successful");

            navigate("/dashboard");

        } catch (error) {

            toast.error(
                error.response?.data?.message || "Invalid Credentials"
            );
        }
    };

    return (

        <div className="flex items-center justify-center min-h-screen bg-gray-100">

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-white p-8 rounded-lg shadow-lg w-96"
            >

                <h2 className="text-3xl font-bold text-center mb-6">
                    EMS Login
                </h2>

                <input
                    type="text"
                    placeholder="Username"
                    {...register("username", {
                        required: "Username is required"
                    })}
                    className="w-full border p-3 rounded mb-2"
                />

                <p className="text-red-500 text-sm">
                    {errors.username?.message}
                </p>

                <input
                    type="password"
                    placeholder="Password"
                    {...register("password", {
                        required: "Password is required"
                    })}
                    className="w-full border p-3 rounded mt-3 mb-2"
                />

                <p className="text-red-500 text-sm">
                    {errors.password?.message}
                </p>

                <button
                    className="w-full bg-blue-600 text-white py-3 rounded mt-5 hover:bg-blue-700"
                >
                    Login
                </button>

            </form>

        </div>

    );
}

export default Login;