import React from "react";
import Navbar from "../../components/Navbar";

const Layout = ({ children, toggleTheme, theme, isLogin }) => {
  return (
    <>
      <Navbar theme={theme} toggleTheme={toggleTheme} isLogin={isLogin} />
      {children}
    </>
  );
};

export default Layout;
