import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router";

import "./App.css";
import Layout from "./layout/Layout";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import SignUp from "./pages/Auth/SignUp";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "./theme";
import { ThemeProvider } from "@mui/material/styles";

const App = () => {
  const user = useSelector((state) => state.auth.user);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isLogin = () => {
    return !!user;
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = getCurrentTheme(isDarkMode);

  return (
    <ThemeProvider theme={getCurrentTheme(isDarkMode)}>
      <div
        className="App"
        style={{ background: theme.palette.background.default, minHeight: "100vh" }}>
        <Routes>
          {isLogin() ? (
            <Route
              path="/"
              element={
                <Layout toggleTheme={toggleTheme} theme={theme} isLogin={isLogin}>
                  <Dashboard theme={theme} />
                </Layout>
              }
            />
          ) : (
            <>
              <Route
                path="/signup"
                element={
                  <Layout toggleTheme={toggleTheme} theme={theme} isLogin={isLogin}>
                    <SignUp theme={theme} />
                  </Layout>
                }
              />
              <Route
                path="/login"
                element={
                  <Layout toggleTheme={toggleTheme} theme={theme} isLogin={isLogin}>
                    <Login theme={theme} />
                  </Layout>
                }
              />
            </>
          )}
          <Route path="*" element={<Navigate to={isLogin() ? "/" : "/login"} replace={true} />} />
        </Routes>
      </div>
    </ThemeProvider>
  );
};

export default App;
