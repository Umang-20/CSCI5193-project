import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../store/actions/auth";
import { TextField, Button, Checkbox, FormControlLabel, Typography } from "@mui/material";

export default function Login({ theme }) {
    const navigate = useNavigate();
    const [loginDetails, setLoginDetails] = useState({
        email: "",
        password: "",
        rememberMe: true,
    });

    const [errors, setErrors] = useState({
        email: "",
        password: "",
    });

    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.stopPropagation();
        e.preventDefault();

        // Basic form validation
        if (!validateForm()) {
            return;
        }

        await dispatch(setUser(loginDetails));

        setLoginDetails({
            email: "",
            password: "",
            rememberMe: false,
        });

        // Navigate to the dashboard
        // navigate("/dashboard");
    };

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginDetails({
            ...loginDetails,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const validateForm = () => {
        let isValid = true;
        let newErrors = { email: "", password: "" };

        if (!loginDetails.email) {
            newErrors.email = "Email is required";
            isValid = false;
        }

        if (!loginDetails.password) {
            newErrors.password = "Password is required";
            isValid = false;
        }

        setErrors(newErrors);

        return isValid;
    };

    return (
        <div style={{ marginTop: "5rem" }}>
            <div
                style={{
                    backgroundColor: theme.palette.card.primary,
                    borderRadius: "8px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    width: "80vw",
                    maxWidth: "40rem",
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
                    <h2>Login</h2>
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
                                label="Email"
                                name="email"
                                type="text"
                                value={loginDetails.email}
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
                                value={loginDetails.password}
                                onChange={handleChange}
                                fullWidth
                                variant="standard"
                                error={!!errors.password}
                                helperText={errors.password}
                            />
                        </div>
                        <div>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        name="rememberMe"
                                        checked={loginDetails.rememberMe}
                                        onChange={handleChange}
                                    />
                                }
                                label="Remember Me"
                            />
                            <Typography
                                variant="body2"
                                style={{ color: theme.palette.text.primary }}
                                align="center">
                                You don't have an account? <Link to="/signup">Register</Link>
                            </Typography>
                        </div>
                    </div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "flex-end",
                            gap: "10px",
                            padding: "0 2rem 1rem 0",
                        }}>
                        <Button variant="contained" color="primary" onClick={handleLogin}>
                            Login
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
