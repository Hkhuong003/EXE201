import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import HomePage from "./pages/home/HomePage";
import SearchPage from "./pages/searchpage/SearchPage";
import SignupPage from "./pages/signup/SignUp";
import LoginPage from "./pages/login/LoginPage";
import BookingPage from "./pages/booking/BookingPage";
import CheckoutPage from "./pages/checkout/CheckoutPage";
import Dashboard from "./pages/dashboard/Dashboard";
import PaymentPay from "./pages/payment/PaymentPage";
import AboutUsPage from "./pages/aboutUs/AboutUs";
import AddToursPackagePage from "./pages/addToursPage/AddToursPackagePage";
import AllUsersPage from "./pages/allUsers/AllUsersPage";
import AllPackagesPage from "./pages/allPackages/AllPackagesPage";
import TourDetailPage from "./pages/pagedetail/TourDetailPage";
import AddService from "./pages/addServices/AddService";
import ServicesPage from "./pages/servicePage/ServicesPage";
import AddPackageService from "./pages/AddPackageService/AddPackageService";
import Header from "./components/header/Header";
import HistoryPage from "./pages/history/HistoryPage";
import BookingHistoryPage from "./pages/bookingHisrory/BookingHistoryPage";

function App() {
  return (
    <AuthProvider>
      <Router>
      <Header/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/tour/:id" element={<TourDetailPage />} />
          <Route path="/search-page" element={<SearchPage />} />
          <Route path="/sign-up" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/adminDashboard" element={<Dashboard />} />
          <Route path="/payment" element={<PaymentPay />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/tours/add" element={<AddToursPackagePage />} />
          <Route path="/services/add" element={<AddService />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/packageservices/add" element={<AddPackageService />} />
          <Route path="/users" element={<AllUsersPage />} />
          <Route path="/tours" element={<AllPackagesPage />} />
          <Route path="/booking-history" element={<BookingHistoryPage />} />
          
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;