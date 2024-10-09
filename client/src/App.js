
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { UserProvider } from "./helper/userContext";
import DashboardLayout from "./Layouts/dashboard/dashboardLayout";
import Login from "./Layouts/user/pages/login";
import Signup from "./Layouts/user/pages/sigup";

function App() {
  return (
   <Router>
    <UserProvider>
    <Routes>
    <Route path="/" element={<DashboardLayout />}>
    
    
    </Route>
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    </Routes>
    </UserProvider>
   </Router>
  );
}

export default App;
