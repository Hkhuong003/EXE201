import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import TourDetailPage from "./pages/pagedetail/TourDetailPage"; // Import trang chi tiết tour
import SearchPage from "./pages/searchpage/SearchPage";
import SignupPage from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";
import BookingPage from "./pages/booking/BookingPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Dashboard from "./pages/dashboard/Dashboard";
import PaymentPay from "./pages/payment/PaymentPage";
import AboutUsPage from "./pages/aboutUs/AboutUs";
import NewsPage from "./pages/news/NewsPage";
import AddNewUserPage from "./pages/addNewUser/AddNewUserPage";
import AddToursPackagePage from "./pages/addToursPage/AddToursPackagePage";
import AllUsersPage from "./pages/allUsers/AllUsersPage";
import AllPackagesPage from "./pages/allPackages/AllPackagesPage";

function App() {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/tour/:tourId" element={<TourDetailPage />} />
        <Route path="/search-page" element={<SearchPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/booking" element={<BookingPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/adminDashboard" element={<Dashboard />} />
        <Route path="/payment" element={<PaymentPay />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/users/add" element={<AddNewUserPage />} />
        <Route path="/tours/add" element={<AddToursPackagePage />} />
        <Route path="/users" element={<AllUsersPage />} />
        <Route path="/tours" element={<AllPackagesPage />} />
      </Routes>
    </Router>
    </AuthProvider>
  );
}

export default App;
