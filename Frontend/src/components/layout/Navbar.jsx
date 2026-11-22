import { FaBell, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { auth, logout } = useAuth();

    const navigate = useNavigate();

    const handleLogout = () => {

        logout();

        navigate("/");

    };

    return (

        <header className="h-16 bg-white shadow flex items-center justify-between px-8">

            <div>

                <h1 className="text-2xl font-bold text-slate-800">

                    EMS

                </h1>

            </div>

            <div className="flex items-center gap-6">

                <button className="relative">

                    <FaBell
                        size={20}
                        className="text-gray-600"
                    />

                    <span
                        className="absolute -top-2 -right-2
                        bg-red-500 text-white
                        text-xs rounded-full
                        h-5 w-5 flex
                        items-center justify-center"
                    >

                        3

                    </span>

                </button>

                <div className="text-right">

                    <h3 className="font-semibold">

                        {auth.username}

                    </h3>

                    <span
                        className="text-xs
                        bg-blue-600
                        text-white
                        px-2 py-1
                        rounded"
                    >

                        {auth.role}

                    </span>

                </div>

                <button
                    onClick={handleLogout}
                    className="flex items-center gap-2
                    bg-red-500 hover:bg-red-600
                    text-white px-4 py-2 rounded"
                >

                    <FaSignOutAlt />

                    Logout

                </button>

            </div>

        </header>

    );

}

export default Navbar;