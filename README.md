# 💸 ExpenseX – Expense Tracker Application

ExpenseX is a feature-rich expense tracker application designed to help users manage monthly budgets, analyze expenses via visual charts, and export detailed reports. It includes user authentication, admin controls, feedback modals, and even a math challenge game for refreshing the user's mind.

---

## 🔍 Overview

- Secure user authentication
- Full admin panel with user and expense management
- Monthly budget and expense tracking with graphs
- Export reports in CSV format
- Interactive UI with modals for feedback, contact, and a game
- Built using React and localStorage

---

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine.

---

## ⚙️ Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/expenseX.git
   ```
````

2. **Navigate to the project directory:**

   ```bash
   cd expensex
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Run the development server:**

   ```bash
   npm start
   ```

---

## 📦 File Structure

```
src/
├── assets/
├── components/
│   ├── authentication/
│   │   ├── ChangePassword.jsx
│   │   ├── ForgetPassword.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── footer/
│   │   └── modals/
│   │       ├── ContactModal.jsx
│   │       ├── FeaturesModal.jsx
│   │       ├── FeedbackModal.jsx
│   │       └── GameModal.jsx
│   ├── home/
│   │   ├── BudgetInput.jsx
│   │   ├── ChartSection.jsx
│   │   ├── ExpenseForm.jsx
│   │   ├── ExpenseList.jsx
│   │   ├── ReportDownload.jsx
│   │   └── SummarySection.jsx
│   └── shared/
│       ├── AdminPanel.jsx
│       ├── ExpenseCard.jsx
│       ├── Footer.jsx
│       └── Navbar.jsx
├── pages/
│   └── Home.jsx
├── App.jsx
└── index.css
```

---

## 🧩 Features

### 1. 🔐 Authentication System

- Login to existing account
- Signup to create a new account
- Forget Password to reset password
- Change Password to update password

### 2. 🧭 Navbar Functionality

- Logout button to log out securely

#### Admin Panel

- Create and delete users
- View user expenses
- View, filter, delete (single/all) feedback
- Create secondary admin (view-only permissions)

### 3. 📊 User Dashboard

- Set monthly budget
- Add expenses with:
  - Amount, Category, Date, Description
- Visualize expense trends using graphs
- Download weekly/monthly reports (CSV)
- Reset all expenses
- View category-wise summary with totals

### 4. 📥 Footer Modals

- Feedback Modal: Send feedback to admin
- Contact Modal: Developer’s educational/professional details
- Game Modal: Math challenge game to refresh user's mind
- Features Modal: Summarizes all app features
- Social Links: Developer's profiles

---

## 📌 How to Use

1. Signup and create an account
2. Set your monthly budget
3. Start adding your expenses
4. View visual breakdowns and trends
5. Download reports anytime
6. Admins can manage users and monitor feedback
7. Play the math challenge game when bored!

---

## 🙏 Acknowledgments

- Inspired by daily budgeting needs and minimal UI practices
- Built for educational and portfolio purposes

---

## ⚠️ Disclaimer

This app uses `localStorage` for all data operations and is **not production-ready** for storing sensitive financial information. It is developed for learning and demonstration purposes only.

```

---
