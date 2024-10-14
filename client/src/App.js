import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./helper/userContext";
import DashboardLayout from "./Layouts/dashboard/dashboardLayout";

import RequireAuth from "./helper/requireAuth";
import UserHome from "./Layouts/user/pages/home"; // The user-specific page
// Optional unauthorized page
import Login from "./Layouts/user/pages/login";
import Signup from "./Layouts/user/pages/sigup";
import Unauthorized from "./Layouts/components/unauthorized";

function App() {
  return (
    <Router>
      <UserProvider>
        <Routes>
          {/* Protected admin route */}
          <Route element={<RequireAuth allowedRoles={["admin"]} />}>
            <Route path="/" element={<DashboardLayout />} />
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
  );
}

export default App;
