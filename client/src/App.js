import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./helper/userContext";
import DashboardLayout from "./Layouts/dashboard/pages/dashboardLayout";
import { ThemeProvider } from "@material-tailwind/react";

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
import LoanList from "./Layouts/dashboard/pages/Loan/LoanList";
import ReviewList from "./Layouts/dashboard/pages/Review/ReviewList";
import FineList from "./Layouts/dashboard/pages/Fine/FineList";
import UserLayout from "./Layouts/user/components/UserLayout";

import Home from "./Layouts/user/pages/home";
import Titles from "./Layouts/user/pages/titles";
import Authors from "./Layouts/user/pages/authors";
import ArticlesPage from "./Layouts/user/pages/articles";
import ArticleDetail from "./Layouts/user/components/ArticleDetail";
import Contact from "./Layouts/user/pages/contact";
import LoanPage from "./Layouts/user/pages/loanpage";
import ReservationsPage from "./Layouts/user/pages/ReservationsPage";
import FavoriteScreen from "./Layouts/user/pages/book/FavoriteScreen";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <UserProvider>
          <Routes>
            {/* Protected admin route */}
            <Route element={<RequireAuth allowedRoles={["admin"]} />}>
              <Route path="/" element={<DashboardLayout />}>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="author" element={<AuthorList />} />
                <Route path="category" element={<CategoryList />} />
                <Route path="book" element={<BookList />} />
                <Route path="reservation" element={<ReservationList />} />
                <Route path="loan" element={<LoanList />} />
                <Route path="review" element={<ReviewList />} />
                <Route path="fine" element={<FineList />} />
              </Route>
            </Route>

          {/* Protected user route */}
          <Route element={<RequireAuth allowedRoles={["user"]} />}>
          <Route path="/" element={<UserLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/titles" element={<Titles />} />
          <Route path="/authors" element={<Authors />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/articles/:id" element={<ArticleDetail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/reservations" element={<ReservationsPage />} />
          <Route path="/favorites" element={<FavoriteScreen />} />
          <Route path="/loans" element={<LoanPage />} />
          </Route>

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
