import React from "react";
import "./index.css";
import App from "./App";
import Login from "./component/Login";
import SignUp from "./component/SignUp";
import RandomTodoPage from "./component/RandomTodoPage";
import RandomTodo from "./component/RandomTodo";
import { Route, Routes, BrowserRouter } from "react-router-dom";

function AppRouter() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="random" element={<RandomTodoPage />} />
          <Route path="random-todo/:text" element={<RandomTodo />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AppRouter;
