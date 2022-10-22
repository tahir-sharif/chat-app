import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import ChatArea from "./pages/partitions/chat/ConversationArea";
import Authentication from "./pages/auth/Authentication";
import Home from "./pages/home/Home";

const PageRoutes = () => {
  const { isLoggedIn, prevHistoryState } = useSelector((state) => state.auth);

  return (
    <Routes>
      <Route
        path="/"
        element={
          isLoggedIn ? (
            <Home />
          ) : (
            <Navigate
              to="/auth"
              state={{ navigateTo: window.location.pathname, prevHistoryState }}
            />
          )
        }
      >
        <Route path="chat/:id" element={<ChatArea />} />
      </Route>
      {/* Authentication Routes */}
      <Route
        path="auth"
        element={
          isLoggedIn ? (
            <Navigate to={prevHistoryState || "/"} />
          ) : (
            <Authentication />
          )
        }
      />
    </Routes>
  );
};

export default PageRoutes;
