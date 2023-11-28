import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signUpUser } from "../../store/actions/auth";
import { TextField, Button, Typography } from "@mui/material";

export default function Signup({ theme }) {
  const navigate = useNavigate();
  const [signUpDetails, setSignUpDetails] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const handleSignUp = async () => {
    // Validate the form fields
    if (!validateForm()) {
      return;
    }

    await dispatch(signUpUser(signUpDetails));

    setSignUpDetails({
      name: "",
      email: "",
      password: "",
    });
    navigate("/", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpDetails({
      ...signUpDetails,
      [name]: value,
    });

    // Clear validation errors on input change
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let isValid = true;

    // Basic validation for required fields
    if (!signUpDetails.name) {
      setErrors((prevErrors) => ({ ...prevErrors, name: "Name is required" }));
      isValid = false;
    }

    if (!signUpDetails.email) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Email is required" }));
      isValid = false;
    } else if (!isValidEmail(signUpDetails.email)) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "Invalid email address" }));
      isValid = false;
    }

    if (!signUpDetails.password) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "Password is required" }));
      isValid = false;
    } else if (!isValidPassword(signUpDetails.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be 8 characters long and alphanumeric",
      }));
      isValid = false;
    }

    return isValid;
  };

  const isValidEmail = (email) => {
    // Email validation using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    // Password should be 8 characters long and contain alphanumeric characters
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div style={{ marginTop: "5rem" }}>
      <div
        style={{
          backgroundColor: theme.palette.card.primary,
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
          width: "40vw",
          padding: "20px",
          boxSizing: "border-box",
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}>
        <div
          style={{
            textAlign: "center",
            color: theme.palette.text.primary,
            fontSize: "20px",
          }}>
          <h2>Sign Up</h2>
        </div>
        <form>
          <div
            style={{
              height: "18rem",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "1rem 2rem",
            }}>
            <div style={{ marginBottom: "1rem" }}>
              <TextField
                label="Name"
                name="name"
                type="text"
                value={signUpDetails.name}
                onChange={handleChange}
                fullWidth
                variant="standard"
                error={!!errors.name}
                helperText={errors.name}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <TextField
                label="Email"
                name="email"
                type="text"
                value={signUpDetails.email}
                onChange={handleChange}
                fullWidth
                variant="standard"
                error={!!errors.email}
                helperText={errors.email}
              />
            </div>
            <div style={{ marginBottom: "1rem" }}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={signUpDetails.password}
                onChange={handleChange}
                fullWidth
                variant="standard"
                error={!!errors.password}
                helperText={errors.password}
              />
            </div>
            <Typography
              variant="body2"
              style={{ color: theme.palette.text.primary }}
              align="center">
              You already have an account? <Link to="/login">Login</Link>
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              gap: "10px",
              padding: "0 2rem 1rem 0",
            }}>
            <Button variant="contained" color="primary" onClick={handleSignUp}>
              Sign Up
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
