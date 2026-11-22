// import { useEffect, useState } from "react";

// import {
//     FaCalendarCheck,
//     FaCalendarAlt,
//     FaClock,
//     FaSignInAlt,
//     FaSignOutAlt,
//     FaCheckCircle,
//     FaHourglassHalf
// } from "react-icons/fa";

// import Layout from "../../components/layout/Layout";
// import {
//     checkIn,
//     checkOut,
//     getMyAttendance
// } from "../../api/attendanceApi";

// const EmployeeDashboard = () => {

//     const [attendance, setAttendance] = useState([]);

//     const [loading, setLoading] = useState(true);

//     const [actionLoading, setActionLoading] = useState(false);

//     const [error, setError] = useState("");

//     const [message, setMessage] = useState("");


//     // =========================================
//     // LOAD ATTENDANCE
//     // =========================================

//     const loadAttendance = async () => {

//         try {

//             setLoading(true);

//             setError("");

//             const response =
//                 await getMyAttendance();

//             setAttendance(
//                 Array.isArray(response)
//                     ? response
//                     : []
//             );

//         } catch (err) {

//             console.error(
//                 "Failed to load attendance:",
//                 err
//             );

//             setError(
//                 err.response?.data?.message ||
//                 "Failed to load attendance."
//             );

//         } finally {

//             setLoading(false);

//         }
//     };


//     useEffect(() => {

//         loadAttendance();

//     }, []);


//     // =========================================
//     // TODAY
//     // =========================================

//     const getToday = () => {

//         const date = new Date();

//         const year =
//             date.getFullYear();

//         const month =
//             String(
//                 date.getMonth() + 1
//             ).padStart(2, "0");

//         const day =
//             String(
//                 date.getDate()
//             ).padStart(2, "0");

//         return `${year}-${month}-${day}`;
//     };


//     const today = getToday();


//     const todayAttendance =
//         attendance.find(
//             item =>
//                 item.attendanceDate === today
//         );


//     // =========================================
//     // CHECK IN
//     // =========================================

//     const handleCheckIn = async () => {

//         try {

//             setActionLoading(true);

//             setError("");

//             setMessage("");

//             await checkIn();

//             setMessage(
//                 "You have successfully checked in."
//             );

//             await loadAttendance();

//         } catch (err) {

//             console.error(
//                 "Check-in failed:",
//                 err
//             );

//             setError(
//                 err.response?.data?.message ||
//                 "Unable to check in."
//             );

//         } finally {

//             setActionLoading(false);

//         }
//     };


//     // =========================================
//     // CHECK OUT
//     // =========================================

//     const handleCheckOut = async () => {

//         try {

//             setActionLoading(true);

//             setError("");

//             setMessage("");

//             await checkOut();

//             setMessage(
//                 "You have successfully checked out."
//             );

//             await loadAttendance();

//         } catch (err) {

//             console.error(
//                 "Check-out failed:",
//                 err
//             );

//             setError(
//                 err.response?.data?.message ||
//                 "Unable to check out."
//             );

//         } finally {

//             setActionLoading(false);

//         }
//     };


//     // =========================================
//     // FORMAT TIME
//     // =========================================

//     const formatTime = (time) => {

//         if (!time) {
//             return "--";
//         }

//         const [hours, minutes] =
//             time.split(":");

//         const date = new Date();

//         date.setHours(
//             Number(hours),
//             Number(minutes),
//             0
//         );

//         return date.toLocaleTimeString(
//             "en-IN",
//             {
//                 hour: "2-digit",
//                 minute: "2-digit"
//             }
//         );
//     };


//     // =========================================
//     // FORMAT DATE
//     // =========================================

//     const formatDate = (date) => {

//         if (!date) {
//             return "--";
//         }

//         const [
//             year,
//             month,
//             day
//         ] = date.split("-");

//         const localDate =
//             new Date(
//                 Number(year),
//                 Number(month) - 1,
//                 Number(day)
//             );

//         return localDate.toLocaleDateString(
//             "en-IN",
//             {
//                 day: "2-digit",
//                 month: "short",
//                 year: "numeric"
//             }
//         );
//     };


//     // =========================================
//     // WORKING HOURS
//     // =========================================

//     const formatWorkingHours = (hours) => {

//         if (
//             hours === null ||
//             hours === undefined
//         ) {
//             return "--";
//         }

//         return `${Number(hours).toFixed(1)} hrs`;
//     };


//     // =========================================
//     // MONTH ATTENDANCE
//     // =========================================

//     const now = new Date();

//     const currentMonth =
//         now.getMonth();

//     const currentYear =
//         now.getFullYear();


//     const presentDays =
//         attendance.filter(item => {

//             if (
//                 item.status !== "PRESENT"
//             ) {
//                 return false;
//             }

//             const date =
//                 new Date(
//                     item.attendanceDate
//                 );

//             return (
//                 date.getMonth() ===
//                     currentMonth &&
//                 date.getFullYear() ===
//                     currentYear
//             );

//         }).length;


//     // Temporary until Leave API
//     const pendingLeaves = 0;


//     // =========================================
//     // TODAY HOURS
//     // =========================================

//     const todayHours =
//         todayAttendance?.workingHours;


//     return (

//         <Layout>

//             <div className="space-y-6">


//                 {/* =================================
//                     HEADER
//                 ================================= */}

//                 <div>

//                     <p className={`
//                         text-sm
//                         font-semibold
//                         text-blue-600
//                     `}>
//                         Employee Portal
//                     </p>

//                     <h1 className={`
//                         text-3xl
//                         font-bold
//                         text-gray-900
//                         mt-1
//                     `}>
//                         Good morning, Puran 👋
//                     </h1>

//                     <p className={`
//                         text-gray-500
//                         mt-1
//                     `}>
//                         Here's your work overview
//                     </p>

//                 </div>


//                 {/* ERROR */}

//                 {error && (

//                     <div className={`
//                         bg-red-50
//                         border
//                         border-red-200
//                         text-red-700
//                         px-5
//                         py-4
//                         rounded-xl
//                     `}>
//                         {error}
//                     </div>

//                 )}


//                 {/* SUCCESS */}

//                 {message && (

//                     <div className={`
//                         bg-green-50
//                         border
//                         border-green-200
//                         text-green-700
//                         px-5
//                         py-4
//                         rounded-xl
//                         flex
//                         items-center
//                         gap-3
//                     `}>

//                         <FaCheckCircle />

//                         {message}

//                     </div>

//                 )}


//                 {/* =================================
//                     SUMMARY CARDS
//                 ================================= */}

//                 <div className={`
//                     grid
//                     grid-cols-1
//                     md:grid-cols-3
//                     gap-5
//                 `}>


//                     {/* ATTENDANCE */}

//                     <div className="
//                         bg-white
//                         rounded-2xl
//                         border
//                         border-gray-100
//                         shadow-sm
//                         p-6
//                     ">

//                         <div className="
//                             flex
//                             items-center
//                             justify-between
//                         ">

//                             <div>

//                                 <p className={`
//                                     text-sm
//                                     text-gray-500
//                                 `}>
//                                     Attendance
//                                 </p>

//                                 <h2 className={`
//                                     text-3xl
//                                     font-bold
//                                     text-gray-900
//                                     mt-2
//                                 `}>
//                                     {loading
//                                         ? "--"
//                                         : presentDays
//                                     }
//                                 </h2>

//                                 <p className={`
//                                     text-sm
//                                     text-gray-500
//                                     mt-1
//                                 `}>
//                                     Present days this month
//                                 </p>

//                             </div>

//                             <div className={`
//                                 w-12
//                                 h-12
//                                 rounded-xl
//                                 bg-blue-50
//                                 text-blue-600
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-xl
//                             `}>

//                                 <FaCalendarCheck />

//                             </div>

//                         </div>

//                     </div>


//                     {/* LEAVE */}

//                     <div className={`
//                         bg-white
//                         rounded-2xl
//                         border
//                         border-gray-100
//                         shadow-sm
//                         p-6
//                     `}>

//                         <div className={`
//                             flex
//                             items-center
//                             justify-between
//                         `}>

//                             <div>

//                                 <p className={`
//                                     text-sm
//                                     text-gray-500
//                                 `}>
//                                     Leave
//                                 </p>

//                                 <h2 className={`
//                                     text-3xl
//                                     font-bold
//                                     text-gray-900
//                                     mt-2
//                                 `}>
//                                     {pendingLeaves}
//                                 </h2>

//                                 <p className={`
//                                     text-sm
//                                     text-gray-500
//                                     mt-1
//                                 `}>
//                                     Pending requests
//                                 </p>

//                             </div>

//                             <div className={`
//                                 w-12
//                                 h-12
//                                 rounded-xl
//                                 bg-orange-50
//                                 text-orange-500
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-xl
//                             `}>

//                                 <FaHourglassHalf />

//                             </div>

//                         </div>

//                     </div>


//                     {/* WORKING */}

//                     <div className={`
//                         bg-white
//                         rounded-2xl
//                         border
//                         border-gray-100
//                         shadow-sm
//                         p-6
//                     `}>

//                         <div className={`
//                             flex
//                             items-center
//                             justify-between
//                         `}>

//                             <div>

//                                 <p className={`
//                                     text-sm
//                                     text-gray-500
//                                 `}>
//                                     Working
//                                 </p>

//                                 <h2 className={`
//                                     text-3xl
//                                     font-bold
//                                     text-gray-900
//                                     mt-2
//                                 `}>
//                                     {formatWorkingHours(
//                                         todayHours
//                                     )}
//                                 </h2>

//                                 <p className={`
//                                     text-sm
//                                     text-gray-500
//                                     mt-1
//                                 `}>
//                                     Today's hours
//                                 </p>

//                             </div>

//                             <div className={`
//                                 w-12
//                                 h-12
//                                 rounded-xl
//                                 bg-purple-50
//                                 text-purple-600
//                                 flex
//                                 items-center
//                                 justify-center
//                                 text-xl
//                             `}>

//                                 <FaClock />

//                             </div>

//                         </div>

//                     </div>

//                 </div>


//                 {/* =================================
//                     TODAY ATTENDANCE
//                 ================================= */}

//                 <div className={`
//                     bg-white
//                     rounded-2xl
//                     border
//                     border-gray-100
//                     shadow-sm
//                     overflow-hidden
//                 `}>


//                     <div className={`
//                         px-6
//                         py-5
//                         border-b
//                         border-gray-100
//                         flex
//                         items-center
//                         justify-between
//                     `}>

//                         <div>

//                             <h2 className={`
//                                 text-xl
//                                 font-bold
//                                 text-gray-900
//                             `}>
//                                 Today's Attendance
//                             </h2>

//                             <p className={`
//                                 text-sm
//                                 text-gray-500
//                                 mt-1
//                             `}>
//                                 {formatDate(today)}
//                             </p>

//                         </div>


//                         {todayAttendance ? (

//                             <span className={`
//                                 px-3
//                                 py-1.5
//                                 rounded-full
//                                 bg-green-50
//                                 text-green-700
//                                 text-sm
//                                 font-semibold
//                             `}>
//                                 {todayAttendance.status}
//                             </span>

//                         ) : (

//                             <span className={`
//                                 px-3
//                                 py-1.5
//                                 rounded-full
//                                 bg-gray-100
//                                 text-gray-600
//                                 text-sm
//                                 font-semibold
//                             `}>
//                                 NOT MARKED
//                             </span>

//                         )}

//                     </div>


//                     <div className={`
//                         p-6
//                         grid
//                         grid-cols-1
//                         md:grid-cols-3
//                         gap-6
//                     `}>


//                         <div>

//                             <p className={`
//                                 text-sm
//                                 text-gray-500
//                             `}>
//                                 Check In
//                             </p>

//                             <p className={`
//                                 text-2xl
//                                 font-bold
//                                 text-gray-900
//                                 mt-2
//                             `}>
//                                 {formatTime(
//                                     todayAttendance?.checkInTime
//                                 )}
//                             </p>

//                         </div>


//                         <div>

//                             <p className={`
//                                 text-sm
//                                 text-gray-500
//                             `}>
//                                 Check Out
//                             </p>

//                             <p className={`
//                                 text-2xl
//                                 font-bold
//                                 text-gray-900
//                                 mt-2
//                             `}>
//                                 {formatTime(
//                                     todayAttendance?.checkOutTime
//                                 )}
//                             </p>

//                         </div>


//                         <div>

//                             <p className={`
//                                 text-sm
//                                 text-gray-500
//                             `}>
//                                 Status
//                             </p>

//                             <p className={`
//                                 text-lg
//                                 font-bold
//                                 text-gray-900
//                                 mt-2
//                             `}>
//                                 {todayAttendance?.status ||
//                                     "NOT MARKED"}
//                             </p>

//                         </div>

//                     </div>


//                     {/* BUTTONS */}

//                     <div className={`
//                         px-6
//                         pb-6
//                         flex
//                         flex-col
//                         sm:flex-row
//                         gap-3
//                     `}>


//                         <button
//                             type="button"
//                             onClick={handleCheckIn}
//                             disabled={
//                                 actionLoading ||
//                                 Boolean(
//                                     todayAttendance
//                                 )
//                             }
//                             className={`
//                                 flex
//                                 items-center
//                                 justify-center
//                                 gap-2
//                                 px-6
//                                 py-3
//                                 rounded-xl
//                                 bg-blue-600
//                                 text-white
//                                 font-semibold
//                                 hover:bg-blue-700
//                                 disabled:bg-gray-300
//                                 disabled:cursor-not-allowed
//                                 transition
//                             `}
//                         >

//                             <FaSignInAlt />

//                             {actionLoading
//                                 ? "Processing..."
//                                 : "Check In"
//                             }

//                         </button>


//                         <button
//                             type="button"
//                             onClick={handleCheckOut}
//                             disabled={
//                                 actionLoading ||
//                                 !todayAttendance ||
//                                 Boolean(
//                                     todayAttendance?.checkOutTime
//                                 )
//                             }
//                             className={`
//                                 flex
//                                 items-center
//                                 justify-center
//                                 gap-2
//                                 px-6
//                                 py-3
//                                 rounded-xl
//                                 bg-orange-500
//                                 text-white
//                                 font-semibold
//                                 hover:bg-orange-600
//                                 disabled:bg-gray-300
//                                 disabled:cursor-not-allowed
//                                 transition
//                             `}
//                         >

//                             <FaSignOutAlt />

//                             {actionLoading
//                                 ? "Processing..."
//                                 : "Check Out"
//                             }

//                         </button>

//                     </div>

//                 </div>


//                 {/* =================================
//                     RECENT ATTENDANCE
//                 ================================= */}

//                 <div className={`
//                     bg-white
//                     rounded-2xl
//                     border
//                     border-gray-100
//                     shadow-sm
//                     overflow-hidden
//                 `}>

//                     <div className={`
//                         px-6
//                         py-5
//                         border-b
//                         border-gray-100
//                     `}>

//                         <h2 className={`
//                             text-xl
//                             font-bold
//                             text-gray-900
//                         `}>
//                             Recent Attendance
//                         </h2>

//                         <p className={`
//                             text-sm
//                             text-gray-500
//                             mt-1
//                         `}>
//                             Your latest attendance records
//                         </p>

//                     </div>


//                     {loading ? (

//                         <div className={`
//                             flex
//                             justify-center
//                             py-10
//                         `}>

//                             <div className={`
//                                 w-8
//                                 h-8
//                                 border-4
//                                 border-blue-200
//                                 border-t-blue-600
//                                 rounded-full
//                                 animate-spin
//                             `}/>

//                         </div>

//                     ) : attendance.length === 0 ? (

//                         <div className={`
//                             text-center
//                             py-10
//                             text-gray-500
//                         `}>

//                             <FaCalendarAlt className={`
//                                 mx-auto
//                                 text-3xl
//                                 text-gray-300
//                             `} />

//                             <p className="mt-3">
//                                 No attendance records yet.
//                             </p>

//                         </div>

//                     ) : (

//                         <div className={`
//                             divide-y
//                             divide-gray-100
//                         `}>

//                             {[...attendance]
//                                 .sort(
//                                     (a, b) =>
//                                         new Date(
//                                             b.attendanceDate
//                                         ) -
//                                         new Date(
//                                             a.attendanceDate
//                                         )
//                                 )
//                                 .slice(0, 5)
//                                 .map(item => (

//                                     <div
//                                         key={item.id}
//                                         className={`
//                                             px-6
//                                             py-4
//                                             flex
//                                             items-center
//                                             justify-between
//                                             gap-4
//                                             hover:bg-gray-50
//                                             transition
//                                         `}
//                                     >

//                                         <div>

//                                             <p className={`
//                                                 font-semibold
//                                                 text-gray-800
//                                             `}>
//                                                 {formatDate(
//                                                     item.attendanceDate
//                                                 )}
//                                             </p>

//                                             <p className={`
//                                                 text-sm
//                                                 text-gray-500
//                                                 mt-1
//                                             `}>
//                                                 {formatTime(
//                                                     item.checkInTime
//                                                 )}
//                                                 {" → "}
//                                                 {formatTime(
//                                                     item.checkOutTime
//                                                 )}
//                                             </p>

//                                         </div>


//                                         <div className={`
//                                             flex
//                                             items-center
//                                             gap-4
//                                         `}>

//                                             <span className={`
//                                                 px-3
//                                                 py-1.5
//                                                 rounded-full
//                                                 text-sm
//                                                 font-semibold
//                                                 ${
//                                                     item.status === "PRESENT"
//                                                         ? "bg-green-50 text-green-700"
//                                                         : item.status === "HALF_DAY"
//                                                             ? "bg-yellow-50 text-yellow-700"
//                                                             : "bg-red-50 text-red-700"
//                                                 }
//                                             `}>
//                                                 {item.status}
//                                             </span>

//                                             <span className={`
//                                                 font-semibold
//                                                 text-gray-700
//                                             `}>
//                                                 {formatWorkingHours(
//                                                     item.workingHours
//                                                 )}
//                                             </span>

//                                         </div>

//                                     </div>

//                                 ))}

//                         </div>

//                     )}

//                 </div>

//             </div>

//         </Layout>
//     );
// };


// export default EmployeeDashboard;

import {
    FaCalendarCheck,
    FaClipboardList,
    FaClock,
    FaSignOutAlt,
    FaCheckCircle,
    FaHourglassHalf
} from "react-icons/fa";

import Layout from "../../components/layout/Layout";

const EmployeeDashboard = () => {

    const employeeName =
        localStorage.getItem("username") ||
        localStorage.getItem("name") ||
        "Employee";

    return (
        <Layout>

            <div className="space-y-6">

                {/* ================= HEADER ================= */}

                <div>

                    <h1 className="
                        text-3xl
                        font-bold
                        text-gray-900
                    ">
                        Good morning, {employeeName} 👋
                    </h1>

                    <p className="
                        text-gray-500
                        mt-1
                    ">
                        Here's your work overview
                    </p>

                </div>


                {/* ================= SUMMARY ================= */}

                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-5
                ">

                    {/* ATTENDANCE */}

                    <div className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Attendance
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    22
                                </h2>

                                <p className="
                                    text-sm
                                    text-green-600
                                    mt-1
                                ">
                                    Days present
                                </p>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-blue-50
                                text-blue-600
                                flex
                                items-center
                                justify-center
                            ">

                                <FaCalendarCheck />

                            </div>

                        </div>

                    </div>


                    {/* LEAVE */}

                    <div className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Leave
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    2
                                </h2>

                                <p className="
                                    text-sm
                                    text-yellow-600
                                    mt-1
                                ">
                                    Pending requests
                                </p>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-yellow-50
                                text-yellow-600
                                flex
                                items-center
                                justify-center
                            ">

                                <FaClipboardList />

                            </div>

                        </div>

                    </div>


                    {/* WORKING HOURS */}

                    <div className="
                        bg-white
                        border
                        border-gray-100
                        rounded-2xl
                        shadow-sm
                        p-6
                    ">

                        <div className="
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Working
                                </p>

                                <h2 className="
                                    text-3xl
                                    font-bold
                                    text-gray-900
                                    mt-2
                                ">
                                    7.5
                                </h2>

                                <p className="
                                    text-sm
                                    text-purple-600
                                    mt-1
                                ">
                                    Hours today
                                </p>

                            </div>

                            <div className="
                                w-12
                                h-12
                                rounded-xl
                                bg-purple-50
                                text-purple-600
                                flex
                                items-center
                                justify-center
                            ">

                                <FaClock />

                            </div>

                        </div>

                    </div>

                </div>


                {/* ================= TODAY ATTENDANCE ================= */}

                <div className="
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    shadow-sm
                    overflow-hidden
                ">

                    <div className="
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    ">

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-900
                        ">
                            Today's Attendance
                        </h2>

                    </div>


                    <div className="
                        p-6
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-5
                    ">

                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Check In
                            </p>

                            <p className="
                                text-xl
                                font-bold
                                text-gray-900
                                mt-1
                            ">
                                09:32 AM
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Check Out
                            </p>

                            <p className="
                                text-xl
                                font-bold
                                text-gray-900
                                mt-1
                            ">
                                --
                            </p>

                        </div>


                        <div>

                            <p className="
                                text-sm
                                text-gray-500
                            ">
                                Status
                            </p>

                            <span className="
                                inline-flex
                                items-center
                                gap-2
                                mt-2
                                px-3
                                py-1.5
                                rounded-full
                                bg-green-50
                                text-green-700
                                font-semibold
                            ">

                                <FaCheckCircle />

                                PRESENT

                            </span>

                        </div>

                    </div>


                    <div className="px-6 pb-6">

                        <button
                            className="
                                flex
                                items-center
                                justify-center
                                gap-2
                                w-full
                                md:w-auto
                                px-6
                                py-3
                                rounded-xl
                                bg-orange-500
                                hover:bg-orange-600
                                text-white
                                font-semibold
                                transition
                            "
                        >

                            <FaSignOutAlt />

                            Check Out

                        </button>

                    </div>

                </div>


                {/* ================= RECENT ATTENDANCE ================= */}

                <div className="
                    bg-white
                    border
                    border-gray-100
                    rounded-2xl
                    shadow-sm
                    overflow-hidden
                ">

                    <div className="
                        px-6
                        py-5
                        border-b
                        border-gray-100
                    ">

                        <h2 className="
                            text-xl
                            font-bold
                            text-gray-900
                        ">
                            Recent Attendance
                        </h2>

                        <p className="
                            text-sm
                            text-gray-500
                            mt-1
                        ">
                            Your latest attendance records
                        </p>

                    </div>


                    <div className="divide-y divide-gray-100">

                        <div className="
                            px-6
                            py-4
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    font-semibold
                                    text-gray-900
                                ">
                                    Aug 14
                                </p>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Friday
                                </p>

                            </div>

                            <span className="
                                px-3
                                py-1
                                rounded-full
                                bg-green-50
                                text-green-700
                                text-sm
                                font-semibold
                            ">
                                PRESENT
                            </span>

                            <span className="
                                font-semibold
                                text-gray-800
                            ">
                                7.8 hrs
                            </span>

                        </div>


                        <div className="
                            px-6
                            py-4
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    font-semibold
                                    text-gray-900
                                ">
                                    Aug 13
                                </p>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Thursday
                                </p>

                            </div>

                            <span className="
                                px-3
                                py-1
                                rounded-full
                                bg-green-50
                                text-green-700
                                text-sm
                                font-semibold
                            ">
                                PRESENT
                            </span>

                            <span className="
                                font-semibold
                                text-gray-800
                            ">
                                8.2 hrs
                            </span>

                        </div>


                        <div className="
                            px-6
                            py-4
                            flex
                            items-center
                            justify-between
                        ">

                            <div>

                                <p className="
                                    font-semibold
                                    text-gray-900
                                ">
                                    Aug 12
                                </p>

                                <p className="
                                    text-sm
                                    text-gray-500
                                ">
                                    Wednesday
                                </p>

                            </div>

                            <span className="
                                px-3
                                py-1
                                rounded-full
                                bg-yellow-50
                                text-yellow-700
                                text-sm
                                font-semibold
                            ">
                                HALF DAY
                            </span>

                            <span className="
                                font-semibold
                                text-gray-800
                            ">
                                4.1 hrs
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </Layout>
    );
};

export default EmployeeDashboard;