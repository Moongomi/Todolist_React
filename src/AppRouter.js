import React from "react";
import "./index.css";
import App from "./App";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import TimerDisplay from "./component/TimerDisplay";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="pomo" element={<TimerDisplay />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
