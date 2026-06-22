import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import PrivateRoute from "./components/PrivateRoute";
import DashboardLayout from "./components/DashboardLayout";
import NotFound from "./components/NotFound";
import Home from "./pages/Home";
import AllClasses from "./pages/AllClasses";
import ClassDetails from "./pages/ClassDetails";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Forum from "./pages/Forum";
import ForumPostDetails from "./pages/ForumPostDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import PaymentCancel from "./pages/PaymentCancel";
import UserOverview from "./pages/dashboard/UserOverview";
import UserBookings from "./pages/dashboard/UserBookings";
import UserFavorites from "./pages/dashboard/UserFavorites";
import ApplyTrainer from "./pages/dashboard/ApplyTrainer";
import TrainerOverview from "./pages/dashboard/TrainerOverview";
import TrainerAddClass from "./pages/dashboard/TrainerAddClass";
import TrainerMyClasses from "./pages/dashboard/TrainerMyClasses";
import TrainerAddPost from "./pages/dashboard/TrainerAddPost";
import TrainerMyPosts from "./pages/dashboard/TrainerMyPosts";
import AdminOverview from "./pages/dashboard/AdminOverview";
import AdminManageUsers from "./pages/dashboard/AdminManageUsers";
import AdminAppliedTrainers from "./pages/dashboard/AdminAppliedTrainers";
import AdminManageTrainers from "./pages/dashboard/AdminManageTrainers";
import AdminManageClasses from "./pages/dashboard/AdminManageClasses";
import AdminAddPost from "./pages/dashboard/AdminAddPost";
import AdminTransactions from "./pages/dashboard/AdminTransactions";
import AdminManageForum from "./pages/dashboard/AdminManageForum";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ThemeProvider>
          <div className="min-h-screen bg-ink-950 text-fog-300 font-sans flex flex-col">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/classes" element={<AllClasses />} />
                <Route path="/classes/:id" element={<ClassDetails />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/forum/:id" element={<ForumPostDetails />} />
                <Route path="/payment/success" element={<PrivateRoute><PaymentSuccess /></PrivateRoute>} />
                <Route path="/payment/cancel" element={<PrivateRoute><PaymentCancel /></PrivateRoute>} />
                <Route path="/dashboard" element={<PrivateRoute><DashboardLayout /></PrivateRoute>}>
                  <Route path="user" element={<UserOverview />} />
                  <Route path="user/bookings" element={<UserBookings />} />
                  <Route path="user/favorites" element={<UserFavorites />} />
                  <Route path="user/apply" element={<ApplyTrainer />} />
                  <Route path="trainer" element={<PrivateRoute roles={["trainer"]}><TrainerOverview /></PrivateRoute>} />
                  <Route path="trainer/add-class" element={<PrivateRoute roles={["trainer"]}><TrainerAddClass /></PrivateRoute>} />
                  <Route path="trainer/my-classes" element={<PrivateRoute roles={["trainer"]}><TrainerMyClasses /></PrivateRoute>} />
                  <Route path="trainer/add-post" element={<PrivateRoute roles={["trainer"]}><TrainerAddPost /></PrivateRoute>} />
                  <Route path="trainer/my-posts" element={<PrivateRoute roles={["trainer"]}><TrainerMyPosts /></PrivateRoute>} />
                  <Route path="admin" element={<PrivateRoute roles={["admin"]}><AdminOverview /></PrivateRoute>} />
                  <Route path="admin/users" element={<PrivateRoute roles={["admin"]}><AdminManageUsers /></PrivateRoute>} />
                  <Route path="admin/applied-trainers" element={<PrivateRoute roles={["admin"]}><AdminAppliedTrainers /></PrivateRoute>} />
                  <Route path="admin/trainers" element={<PrivateRoute roles={["admin"]}><AdminManageTrainers /></PrivateRoute>} />
                  <Route path="admin/classes" element={<PrivateRoute roles={["admin"]}><AdminManageClasses /></PrivateRoute>} />
                  <Route path="admin/add-post" element={<PrivateRoute roles={["admin"]}><AdminAddPost /></PrivateRoute>} />
                  <Route path="admin/transactions" element={<PrivateRoute roles={["admin"]}><AdminTransactions /></PrivateRoute>} />
                  <Route path="admin/forum" element={<PrivateRoute roles={["admin"]}><AdminManageForum /></PrivateRoute>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
            <ToastContainer position="bottom-right" autoClose={3000} theme="dark" />
          </div>
        </ThemeProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
