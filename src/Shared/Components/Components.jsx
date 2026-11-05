// Components.jsx
// Main component that renders the router and all the routes for the application.

import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navigation from "@/Shared/Components/Main/Navigation.jsx";
import { SignPage } from "./Signs/Components/SignPage.jsx";
import { HistoryList } from "./History/Components/HistoryList.jsx";
import { getAllSigns } from "./Signs/Models/signModel.jsx";
import AuthModule from "./Authentication/auth.jsx";
import AuthRegister from "./Authentication/authRegister.jsx";
import AuthLogin from "./Authentication/authLogin.jsx";
import MainHome from "./protectedRoute/MainHome.jsx";
import MainGood from "./protectedRoute/MainGood.jsx";

export default function Components() {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // load signs asynchronously through the Parse model
  useEffect(() => {
    getAllSigns()
      .then(setSigns)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // the signs route shows loading pagebefore the page renders
  const signsElement = loading ? (
    <p role="status">Loading signs...</p>
  ) : error ? (
    <p role="alert">Could not load signs: {error}</p>
  ) : (
    <SignPage signs={signs} />
  );

  // Routing is initialized here with <Router>; each <Route> maps one
  // address to one component.
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={signsElement} />
        <Route path="/history" element={<HistoryList />} />
        <Route path="/auth" element={<AuthModule />} />
        <Route path="/auth/register" element={<AuthRegister />} />
        <Route path="/auth/login" element={<AuthLogin />} />
        <Route path="/home" element={<MainHome />} />
        <Route path="/user" element={<MainGood />} />

        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </Router>
  );
}