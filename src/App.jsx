import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";
import AddAdmin from "./components/Dashboard/Admin/AddAdmin";
import AdminHospitals from "./components/Dashboard/Admin/AdminHospitals";
import AdminProfile from "./components/Dashboard/Admin/AdminProfile";
import Admins from "./components/Dashboard/Admin/Admins";
import DashBlogs from "./components/Dashboard/Blog/DashBlogs";
import NewBlog from "./components/Dashboard/Blog/NewBlog";
import UpdateBlog from "./components/Dashboard/Blog/UpdateBlog";
import AddDoctor from "./components/Dashboard/Doctor/AddDoctor";
import UpdateDoctor from "./components/Dashboard/Doctor/UpdateDoctor";
import HospitalAppointments from "./components/Dashboard/Hospital/HospitalAppointments";
import HospitalDoctors from "./components/Dashboard/Hospital/HospitalDoctors";
import HospitalProfile from "./components/Dashboard/Hospital/HospitalProfile";
import Notice from "./components/Dashboard/Notice/Notice";
import NoticeDetails from "./components/Dashboard/Notice/NoticeDetails";
import NoticeForm from "./components/Dashboard/Notice/NoticeForm";
import UpdateNotice from "./components/Dashboard/Notice/UpdateNotice";
import AdminOverview from "./components/Dashboard/Overview/AdminOverview";
import HospitalOverview from "./components/Dashboard/Overview/HospitalOverview";
import PatientOverview from "./components/Dashboard/Overview/PatientOverview";
import PatientAppointments from "./components/Dashboard/Patient/PatientAppointments";
import PatientProfile from "./components/Dashboard/Patient/PatientProfile";
import FormModal from "./components/Dashboard/shared/FormModal";
import Layout from "./components/shared/Layout";
import { Toaster } from "./components/ui/sonner";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogDetails from "./pages/BlogDetails";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import DoctorProfile from "./pages/DoctorProfile";
import Doctors from "./pages/Doctors";
import ForgotPassword from "./pages/ForgotPassword";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import VerifyAccount from "./pages/VerifyAccount";

const App = () => {
  return (
    <>
      <Toaster />
      <BrowserRouter>
        <Routes>
          {/* GENERAL ROUTES */}
          <Route path="/" element={<Layout />}>
            <Route path="" index element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/verify-otp" element={<VerifyAccount />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:doctorId" element={<DoctorProfile />} />
            <Route path="/about" element={<About />} />
            <Route path="/blogs" element={<Blog />} />
            <Route path="/blogs/:blogId" element={<BlogDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* PATIENT DASHBOARD ROUTES */}
          <Route
            path="/dashboard/patient"
            element={<Dashboard allowedRoles={["patient"]} />}
          >
            <Route path="" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<PatientOverview />} />
            <Route path="appointments" element={<PatientAppointments />} />
            <Route path="profile" element={<PatientProfile />} />
            <Route path="notice" element={<Notice />}>
              <Route
                path=":noticeId"
                element={
                  <FormModal title={"Notice"}>
                    <NoticeDetails />
                  </FormModal>
                }
              ></Route>
            </Route>
          </Route>

          {/* ADMIN DASHBOARD ROUTES */}
          <Route
            path="/dashboard/admin"
            element={<Dashboard allowedRoles={["admin"]} />}
          >
            <Route path="" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<AdminOverview />} />
            <Route path="hospitals" element={<AdminHospitals />} />
            <Route path="blogs" element={<DashBlogs />} />
            <Route path="blogs/new" element={<NewBlog />} />
            <Route path="blogs/edit/:blogId" element={<UpdateBlog />} />
            <Route path="admins" element={<Admins />}>
              <Route
                path="add"
                element={
                  <FormModal title={"Add new admin"}>
                    <AddAdmin />
                  </FormModal>
                }
              ></Route>
            </Route>
            <Route path="notice" element={<Notice />}>
              <Route
                path="add"
                element={
                  <FormModal title={"Add new notice"}>
                    <NoticeForm />
                  </FormModal>
                }
              ></Route>
              <Route
                path="edit/:noticeId"
                element={
                  <FormModal title={"Update existing notice"}>
                    <UpdateNotice />
                  </FormModal>
                }
              ></Route>
              <Route
                path=":noticeId"
                element={
                  <FormModal title={"Notice"}>
                    <NoticeDetails />
                  </FormModal>
                }
              ></Route>
            </Route>
            <Route path="profile" element={<AdminProfile />} />
          </Route>

          {/* HOSPITAL DASHBOARD ROUTES */}
          <Route
            path="/dashboard/hospital"
            element={<Dashboard allowedRoles={["hospital"]} />}
          >
            <Route path="" element={<Navigate to="overview" replace />} />
            <Route path="overview" element={<HospitalOverview />} />
            <Route path="doctors" element={<HospitalDoctors />}>
              <Route
                path="add"
                element={
                  <FormModal title={"Add new doctor"}>
                    <AddDoctor />
                  </FormModal>
                }
              ></Route>
              <Route
                path="edit/:doctorId"
                element={
                  <FormModal title={"Update Existing Doctor"}>
                    <UpdateDoctor />
                  </FormModal>
                }
              ></Route>
            </Route>
            <Route path="appointments" element={<HospitalAppointments />} />
            <Route path="blogs" element={<DashBlogs />} />
            <Route path="blogs/new" element={<NewBlog />} />
            <Route path="blogs/edit/:blogId" element={<UpdateBlog />} />
            <Route path="notice" element={<Notice />}>
              <Route
                path=":noticeId"
                element={
                  <FormModal title={"Notice"}>
                    <NoticeDetails />
                  </FormModal>
                }
              ></Route>
            </Route>
            <Route path="profile" element={<HospitalProfile />} />
          </Route>

          {/* 404 PAGE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
