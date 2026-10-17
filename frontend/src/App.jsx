// Importing React tools and required files
import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Importing other components
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword.jsx";
import Signup from "./components/authentication/Signup.jsx";
import ChangePassword from "./components/authentication/ChangePassword.jsx";

import { api } from "./services/api";

function App() {
  // ------------------------- STATES -------------------------

  // To check if a user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Store current logged-in user's info
  const [currentUser, setCurrentUser] = useState(null);

  // Show or hide signup page
  const [showSignup, setShowSignup] = useState(false);

  // Show or hide forget password page
  const [showForgetPassword, setShowForgetPassword] = useState(false);

  // Show or hide change password page
  const [showChangePassword, setShowChangePassword] = useState(false);

  // List of registered users fetched from backend
  const [users, setUsers] = useState([]);

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const res = await api.auth.getUsers();
      if (res.success && res.users) {
        setUsers(res.users);
      }
    } catch (err) {
      console.error("Failed to fetch users from server:", err);
    }
  };

  // ------------------------- USEEFFECT -------------------------

  // When app first opens, check session and fetch users
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    const lastUser = localStorage.getItem("currentUser");

    if (savedLogin === "true" && lastUser) {
      try {
        setCurrentUser(JSON.parse(lastUser));
        setIsLoggedIn(true);
      } catch (e) {
        console.error("Error parsing stored user", e);
      }
    }

    fetchUsers();
    setShowChangePassword(false);
  }, []);

  // ------------------------- FUNCTIONS -------------------------

  // Login function
  const handleLogin = async (username, password) => {
    try {
      const res = await api.auth.login(username, password);
      if (res.success) {
        setIsLoggedIn(true);
        setCurrentUser(res.user);
        if (res.token) {
          localStorage.setItem("token", res.token);
        }
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        toast.success(res.message || `Login successful! Welcome, ${username}.`);
        setShowChangePassword(false);
        fetchUsers();
      }
    } catch (err) {
      toast.error(err.message || "Invalid username or password!");
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully!");
  };

  // Signup function
  const handleSignup = async (newUsername, newPassword) => {
    try {
      const res = await api.auth.register(newUsername, newPassword);
      if (res.success) {
        toast.success(res.message || "Account created! You can now log in.");
        setShowSignup(false);
        fetchUsers();
      }
    } catch (err) {
      toast.error(err.message || "Failed to create account!");
    }
  };

  // Forget password function
  const handleForgetPassword = async (username) => {
    try {
      const res = await api.auth.forgotPassword(username);
      if (res.success) {
        toast.success(res.message || "Password reset to 'default123'. Please login.");
        setShowForgetPassword(false);
        setShowChangePassword(true);
      }
    } catch (err) {
      toast.error(err.message || "Username not found!");
    }
  };

  // Change password function
  const handleChangePassword = async (username, currentPassword, newPassword) => {
    try {
      const res = await api.auth.changePassword(username, currentPassword, newPassword);
      if (res.success) {
        toast.success(res.message || "Password changed successfully!");
      }
    } catch (err) {
      toast.error(err.message || "Failed to change password!");
    }
  };

  // Admin actions: create or delete users
  const handleAdminAction = async (action, data = {}) => {
    if (!currentUser || !currentUser.isAdmin) {
      toast.error("Only admin can do this!");
      return;
    }

    try {
      switch (action) {
        case "create": {
          const res = await api.auth.createUser(data.username, data.password, data.isAdmin);
          if (res.success) {
            toast.success(res.message || "User created successfully!");
            await fetchUsers();
          }
          break;
        }

        case "delete": {
          if (data.username === "admin") {
            toast.error("Cannot delete default admin!");
            return;
          }
          const res = await api.auth.deleteUser(data.username);
          if (res.success) {
            toast.success(res.message || "User deleted successfully!");
            await fetchUsers();
          }
          break;
        }

        default: {
          toast.error("Invalid action!");
        }
      }
    } catch (err) {
      toast.error(err.message || "Admin action failed!");
    }
  };

  // ------------------------- UI -------------------------

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      {/* ToastContainer for displaying popup messages (notifications) */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        theme="dark"
      />

      {/* Conditional Rendering: Based on isLoggedIn state */}
      {/* If user is not logged in, show authentication-related components */}
      {!isLoggedIn ? (
        <>
          {/* Nested Conditional Rendering: Decide which authentication component to show */}
          {/* If showSignup is true, render Signup component */}
          {showSignup ? (
            // Signup component is rendered when user clicks "Sign Up" link/button
            // Passes handleSignup to create new users and setShowSignup to toggle back to login
            <Signup onSignup={handleSignup} setShowSignup={setShowSignup} />
          ) : showForgetPassword ? (
            // ForgetPassword component is rendered when user clicks "Forgot Password"
            // Passes handleForgetPassword to reset password and setShowForgetPassword to toggle back
            <ForgetPassword
              onForgetPassword={handleForgetPassword}
              setShowForgetPassword={setShowForgetPassword}
            />
          ) : showChangePassword ? (
            // ChangePassword component is rendered after password reset or user request
            // Passes handleChangePassword to update password and setShowChangePassword to toggle
            <ChangePassword
              onChangePassword={handleChangePassword}
              setShowChangePassword={setShowChangePassword}
            />
          ) : (
            // Default case: Render Login component when no other auth component is active
            // Passes handleLogin for authentication, and state setters to navigate to other auth components
            <Login
              onLogin={handleLogin}
              setShowSignup={setShowSignup}
              setShowForgetPassword={setShowForgetPassword}
              showChangePassword={showChangePassword}
              setShowChangePassword={setShowChangePassword}
            />
          )}
        </>
      ) : (
        // If user is logged in, render the main app content
        <>
          {/* Render Navbar with logout functionality, current user info, admin actions, and user list */}
          <Navbar
            onLogout={handleLogout}
            currentUser={currentUser}
            onAdminAction={handleAdminAction}
            users={users}
          />
          {/* Render Home component, passing currentUser for user-specific content */}
          <Home currentUser={currentUser} />
        </>
      )}
    </div>
  );
}

export default App;