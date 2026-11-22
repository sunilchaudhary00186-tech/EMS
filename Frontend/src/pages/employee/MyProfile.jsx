import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import { getMyProfile } from "../../api/employeeApi";

const MyProfile = () => {

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {

        const loadProfile = async () => {

            try {

                const data = await getMyProfile();

                console.log("My Profile:", data);

                setProfile(data);

            } catch (error) {

                console.error("Failed to load profile:", error);

                setError("Failed to load profile");

            } finally {

                setLoading(false);
            }
        };

        loadProfile();

    }, []);


    if (loading) {
        return (
            <Layout>
                <div className="p-6">
                    <p className="text-gray-500">
                        Loading profile...
                    </p>
                </div>
            </Layout>
        );
    }


    if (error) {
        return (
            <Layout>
                <div className="p-6">
                    <div className="bg-red-100 text-red-600 p-4 rounded-lg">
                        {error}
                    </div>
                </div>
            </Layout>
        );
    }


    if (!profile) {
        return (
            <Layout>
                <div className="p-6">
                    <p className="text-gray-500">
                        No profile data found.
                    </p>
                </div>
            </Layout>
        );
    }


    const fullName =
        `${profile.firstName || ""} ${profile.lastName || ""}`.trim();


    return (

        <Layout>

            <div className="p-6">

                {/* ================= HEADER ================= */}

                <div className="mb-6">

                    <h1 className="text-3xl font-bold text-gray-900">
                        My Profile
                    </h1>

                    <p className="text-gray-500 mt-1">
                        View your personal and employment information
                    </p>

                </div>


                {/* ================= PROFILE CARD ================= */}

                <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">


                    {/* TOP PROFILE SECTION */}

                    <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-8">

                        <div className="flex items-center gap-5">

                            {/* PROFILE ICON */}

                            <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center shadow-lg">

                                <span className="text-3xl font-bold text-blue-600">
                                    {profile.firstName?.charAt(0)?.toUpperCase() || "U"}
                                </span>

                            </div>


                            {/* NAME */}

                            <div className="text-white">

                                <h2 className="text-2xl font-bold">
                                    {fullName || "Employee"}
                                </h2>

                                <p className="text-blue-100 mt-1">
                                    {profile.designation || "Employee"}
                                </p>

                                <div className="mt-2">

                                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                                        {profile.employeeCode || "N/A"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ================= PERSONAL INFORMATION ================= */}

                    <div className="p-8">

                        <h3 className="text-xl font-semibold text-gray-900 mb-5">
                            Personal Information
                        </h3>


                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                            <ProfileItem
                                label="First Name"
                                value={profile.firstName}
                            />

                            <ProfileItem
                                label="Last Name"
                                value={profile.lastName}
                            />

                            <ProfileItem
                                label="Email"
                                value={profile.email}
                            />

                            <ProfileItem
                                label="Phone"
                                value={profile.phoneNumber}
                            />

                        </div>


                        {/* ================= EMPLOYMENT ================= */}

                        <div className="border-t mt-8 pt-8">

                            <h3 className="text-xl font-semibold text-gray-900 mb-5">
                                Employment Information
                            </h3>


                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">


                                <ProfileItem
                                    label="Employee Code"
                                    value={profile.employeeCode}
                                />

                                <ProfileItem
                                    label="Designation"
                                    value={profile.designation}
                                />

                                <ProfileItem
                                    label="Department"
                                    value={
                                        typeof profile.departmentName === "object"
                                            ? profile.departmentName?.name
                                            : profile.departmentName
                                    }
                                />

                                <ProfileItem
                                    label="Joining Date"
                                    value={profile.joiningDate}
                                />

                                <ProfileItem
                                    label="Salary"
                                    value={
                                        profile.salary
                                            ? `₹${Number(profile.salary).toLocaleString("en-IN")}`
                                            : null
                                    }
                                />

                                <ProfileItem
                                    label="Status"
                                    value={
                                        profile.active === true
                                            ? "Active"
                                            : profile.active === false
                                                ? "Inactive"
                                                : null
                                    }
                                    status
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
};


/* =========================================================
   PROFILE ITEM
========================================================= */

const ProfileItem = ({ label, value, status }) => {

    return (

        <div className="bg-gray-50 border rounded-xl p-4">

            <p className="text-sm text-gray-500 mb-1">
                {label}
            </p>

            {status && value ? (

                <span
                    className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${
                        value === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                    }`}
                >
                    {value}
                </span>

            ) : (

                <p className="font-semibold text-gray-900">
                    {value || "Not available"}
                </p>

            )}

        </div>

    );
};


export default MyProfile;
