import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Button } from "@mui/material";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { useLocation, useNavigate } from "react-router";
import { logOutUser } from "../../store/actions/auth";
import { useDispatch } from "react-redux";

const Navbar = ({ theme, toggleTheme, isLogin }) => {
  const isLoggedIn = isLogin();
  const navigate = useNavigate();

  const location = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logOutUser());
    navigate("/login");
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: theme.palette.primary.main }}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, color: theme.palette.background.default, textAlign: "start" }}>
          TaskTracker
        </Typography>
        <div>
          {isLoggedIn ? (
            <Button
              color="inherit"
              sx={{ color: theme.palette.background.default, marginRight: "5px" }}
              onClick={handleLogout}>
              Logout
            </Button>
          ) : location.pathname === "/login" ? (
            <Button
              color="inherit"
              sx={{ color: theme.palette.background.default, marginRight: "5px" }}
              onClick={() => navigate("/signup")}>
              Signup
            </Button>
          ) : (
            <Button
              color="inherit"
              sx={{ color: theme.palette.background.default, marginRight: "5px" }}
              onClick={() => navigate("/login")}>
              Login
            </Button>
          )}
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ color: theme.palette.background.default }}>
            <Brightness4Icon />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
