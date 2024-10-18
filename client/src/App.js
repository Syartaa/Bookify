import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./helper/userContext";
import DashboardLayout from "./Layouts/dashboard/pages/dashboardLayout";
import { ThemeProvider } from '@material-tailwind/react';

import RequireAuth from "./helper/requireAuth";
import UserHome from "./Layouts/user/pages/home"; // The user-specific page
// Optional unauthorized page
import Login from "./Layouts/user/pages/login";
import Signup from "./Layouts/user/pages/sigup";
import Unauthorized from "./Layouts/components/unauthorized";
import Dashboard from "./Layouts/dashboard/pages/dashboard";
import AuthorList from "./Layouts/dashboard/pages/Author/authorList";
import CategoryList from "./Layouts/dashboard/pages/Category/categoryList";
import BookList from "./Layouts/dashboard/pages/Books/bookList";
import ReservationList from "./Layouts/dashboard/pages/Reservation/ReservationList";

function App() {
  return (
    <ThemeProvider>
    <Router>
      <UserProvider>
        <Routes>
          {/* Protected admin route */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/" element={<DashboardLayout />} >
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="author" element={<AuthorList />} />
            <Route path="category" element={<CategoryList />} />
            <Route path="book" element={<BookList />} />
            <Route path="reservation" element={<ReservationList />} />
            </Route>
          </Route>

          {/* Protected user route */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
            <Route path="/user-home" element={<UserHome />} />
          </Route>

          {/* Open routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>
      </UserProvider>
    </Router>
    </ThemeProvider>
  );
}

export default App;
