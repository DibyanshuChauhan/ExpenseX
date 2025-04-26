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

  // Get user data from localStorage or add default admin
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            username: "admin",
            password: btoa("admin123"), // btoa() changes text to encoded format
            isAdmin: true,
          },
        ];
  });

  // ------------------------- USEEFFECT -------------------------

  // Save user list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // When app first opens, check if a user is already logged in
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      const lastUser = localStorage.getItem("currentUser");
      if (lastUser) setCurrentUser(JSON.parse(lastUser));
      setIsLoggedIn(true);
    }

    setShowChangePassword(false);
  }, []);

  // ------------------------- FUNCTIONS -------------------------

  // Login function
  const handleLogin = (username, password) => {
    const user = users.find(
      (u) => u.username === username && u.password === btoa(password)
    );

    if (user) {
      // If username and password match
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success(`Login successful! Welcome, ${username}.`);
      setShowChangePassword(false);
    } else {
      // If login fails
      toast.error("Invalid username or password!");
    }
  };

  // Logout function
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully!");
  };

  // Signup function
  const handleSignup = (newUsername, newPassword) => {
    // Check if username already exists
    if (users.find((u) => u.username === newUsername)) {
      toast.error("Username already exists!");
      return;
    }

    // Create new user
    const newUser = {
      username: newUsername,
      password: btoa(newPassword),
      isAdmin: false,
    };

    // Add user to list
    setUsers([...users, newUser]);
    toast.success("Account created! You can now log in.");
    setShowSignup(false);
  };

  // Forget password function
  const handleForgetPassword = (username) => {
    const userIndex = users.findIndex((u) => u.username === username);

    if (userIndex !== -1) {
      // Set new temporary password
      users[userIndex].password = btoa("default123");
      setUsers([...users]);
      toast.success("Password reset to 'default123'. Please login.");
      setShowForgetPassword(false);
      setShowChangePassword(true);
    } else {
      toast.error("Username not found!");
    }
  };

  // Change password function
  const handleChangePassword = (username, currentPassword, newPassword) => {
    const userIndex = users.findIndex((u) => u.username === username);

    if (userIndex !== -1) {
      const user = users[userIndex];

      if (user.password === btoa(currentPassword)) {
        // Change to new password
        user.password = btoa(newPassword);
        setUsers([...users]);
        toast.success("Password changed successfully!");
      } else {
        toast.error("Current password is wrong!");
      }
    } else {
      toast.error("User not found!");
    }
  };

  // Admin actions: create or delete users
  const handleAdminAction = (action, data = {}) => {
    if (!currentUser || !currentUser.isAdmin) {
      toast.error("Only admin can do this!");
      return;
    }

    const isDefaultAdmin =
      currentUser.username === "admin" &&
      users.findIndex((u) => u.username === "admin" && u.isAdmin) ===
      users.indexOf(currentUser);

    if (!isDefaultAdmin && (action === "create" || action === "delete")) {
      toast.error("Only main admin can create or delete users!");
      return;
    }

    // What to do: create or delete?
    switch (action) {
      case "create": {
        if (users.find((u) => u.username === data.username)) {
          toast.error("Username already exists!");
          return;
        }

        const newUser = {
          username: data.username,
          password: btoa(data.password),
          isAdmin: data.isAdmin || false,
        };

        setUsers([...users, newUser]);
        toast.success("User created successfully!");
        break;
      }

      case "delete": {
        if (data.username === "admin") return;

        // Remove user's stored data too
        localStorage.removeItem(`expenses_${data.username}`);
        setUsers(users.filter((u) => u.username !== data.username));
        toast.success("User deleted successfully!");
        break;
      }

      default: {
        toast.error("Invalid action!");
      }
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