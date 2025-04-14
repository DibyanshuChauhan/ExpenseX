import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/shared/Navbar";
import Home from "./pages/Home";
import Login from "./components/authentication/Login";
import ForgetPassword from "./components/authentication/ForgetPassword.jsx";
import Signup from "./components/authentication/Signup.jsx";
import ChangePassword from "./components/authentication/ChangePassword.jsx";

function App() {
  // State variables
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showSignup, setShowSignup] = useState(false);
  const [showForgetPassword, setShowForgetPassword] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false); // New state for Change Password option

  // Users state, initialized from localStorage or default with an admin user
  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem("users");
    return savedUsers ? JSON.parse(savedUsers) : [{ username: "admin", password: btoa("admin123"), isAdmin: true }];
  });

  // Effect to save users data to localStorage whenever the users state changes
  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users]);

  // Effect to check if a user is logged in when the component mounts
  useEffect(() => {
    const savedLogin = localStorage.getItem("isLoggedIn");
    if (savedLogin === "true") {
      const lastUser = localStorage.getItem("currentUser");
      if (lastUser) setCurrentUser(JSON.parse(lastUser));
      setIsLoggedIn(true);
    }
    // Reset showChangePassword on page load
    setShowChangePassword(false);
  }, []);

  // Handle user login
  const handleLogin = (username, password) => {
    const user = users.find((u) => u.username === username && u.password === btoa(password));
    if (user) {
      setIsLoggedIn(true);
      setCurrentUser(user);
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("currentUser", JSON.stringify(user));
      toast.success(`Login successful! Welcome, ${username}.`, {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      setShowChangePassword(false); // Reset after login
    } else {
      toast.error("Invalid username or password!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
    }
  };

  // Handle user logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("currentUser");
    toast.success("Logged out successfully!", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "navbar-poppins",
    });
  };

  // Handle user signup
  const handleSignup = (newUsername, newPassword) => {
    if (users.find((u) => u.username === newUsername)) {
      toast.error("Username already exists!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }
    const newUser = { username: newUsername, password: btoa(newPassword), isAdmin: false };
    setUsers([...users, newUser]);
    toast.success("Account created successfully! Please login.", {
      position: "top-right",
      autoClose: 3000,
      theme: "dark",
      className: "navbar-poppins",
    });
    setShowSignup(false);
  };

  // Handle password reset
  const handleForgetPassword = (username) => {
    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex !== -1) {
      users[userIndex].password = btoa("default123");
      setUsers([...users]);
      toast.success("Password reset to 'default123'. Please login with new password.", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      setShowForgetPassword(false);
      setShowChangePassword(true); // Enable Change Password option after reset
    } else {
      toast.error("Username not found!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
    }
  };

  // Handle password change
  const handleChangePassword = (username, currentPassword, newPassword) => {
    const userIndex = users.findIndex((u) => u.username === username);
    if (userIndex !== -1) {
      const user = users[userIndex];
      if (user.password === btoa(currentPassword)) {
        user.password = btoa(newPassword);
        setUsers([...users]);
        toast.success("Password changed successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          className: "navbar-poppins",
        });
      } else {
        toast.error("Current password is incorrect!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          className: "navbar-poppins",
        });
      }
    } else {
      toast.error("User not found!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
    }
  };

  // Handle admin actions like creating or deleting users
  const handleAdminAction = (action, data = {}) => {
    if (!currentUser || !currentUser.isAdmin) {
      toast.error("Only admin can perform this action!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }
    const isDefaultAdmin = currentUser.username === "admin" && users.findIndex((u) => u.username === "admin" && u.isAdmin) === users.indexOf(currentUser);

    if (!isDefaultAdmin && (action === "create" || action === "delete")) {
      toast.error("Only the default admin can create or delete users!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
        className: "navbar-poppins",
      });
      return;
    }

    switch (action) {
      case "create": {
        if (users.find((u) => u.username === data.username)) {
          toast.error("Username already exists!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            className: "navbar-poppins",
          });
          return;
        }
        const newUser = { username: data.username, password: btoa(data.password), isAdmin: data.isAdmin || false };
        setUsers([...users, newUser]);
        toast.success("User created successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          className: "navbar-poppins",
        });
        break;
      }
      case "delete": {
        if (data.username === "admin") return;
        localStorage.removeItem(`expenses_${data.username}`);
        setUsers(users.filter((u) => u.username !== data.username));
        toast.success("User deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          className: "navbar-poppins",
        });
        break;
      }
      default: {
        toast.error("Invalid action!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
          className: "navbar-poppins",
        });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex flex-col">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      {/* Conditional rendering based on login state */}
      {!isLoggedIn ? (
        <>
          {showSignup ? (
            <Signup onSignup={handleSignup} setShowSignup={setShowSignup} />
          ) : showForgetPassword ? (
            <ForgetPassword onForgetPassword={handleForgetPassword} setShowForgetPassword={setShowForgetPassword} />
          ) : showChangePassword ? (
            <ChangePassword onChangePassword={handleChangePassword} setShowChangePassword={setShowChangePassword} />
          ) : (
            <Login
              onLogin={handleLogin}
              setShowSignup={setShowSignup}
              setShowForgetPassword={setShowForgetPassword}
              showChangePassword={showChangePassword}
            />
          )}
        </>
      ) : (
        <>
          <Navbar onLogout={handleLogout} currentUser={currentUser} onAdminAction={handleAdminAction} users={users} />
          <Home currentUser={currentUser} />
        </>
      )}
    </div>
  );
}

export default App;