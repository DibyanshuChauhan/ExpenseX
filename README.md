
---

# 💸 Welcome to ExpenseX! 🎉

**ExpenseX** is a powerful and interactive web application built to simplify your financial life. Whether you're budgeting for a week or tracking expenses monthly, ExpenseX provides an intuitive dashboard, rich visualizations, secure authentication, and a unique **math mini-game** to make expense tracking both productive and enjoyable.

---

## 🚀 Features

- **Authentication System**: Secure Login, Signup, Forgot Password, and Change Password support.
- **Expense Dashboard**: Track your total income, total expenses, and current balance.
- **Weekly & Monthly Filters**: Easily toggle between week-based or month-based analysis.
- **Category-wise Tracking**: Organize expenses by category (e.g., Food, Travel, Bills, Health).
- **Visual Analytics**: Interactive bar charts for insights into your spending trends.
- **Budget Alerts**: Get notified when you’re nearing or crossing your set budget limits.
- **Export Data to CSV**: Download your expenses in `.csv` format for offline records.
- **Local Storage Sync**: Save user data securely in browser local storage.
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop.
- **Footer Mini Game – Quick Math Challenge**:
  - 4 Levels: Easy, Medium, Hard, Extreme
  - 2 Game Modes: Equation Format & Statement Format
  - Earn 2 points per correct answer
  - 10 questions per stage
  - Unlock calculator for 10 seconds after reaching 10 points
  - Available via Game Modal from the footer

---

## 🛠️ Technologies Used

- **React.js** – Powerful library for building dynamic, component-driven user interfaces.
- **Tailwind CSS** – Utility-first CSS framework for fast and responsive design.
- **Chart.js & react-chartjs-2** – Used for creating elegant and responsive bar graphs.
- **Prop Drilling** – Implemented for passing data through nested component trees.
- **LocalStorage API** – Used to store user and expense data locally in the browser.
- **React Toastify** – To display smooth and customizable toast notifications.
- **CSV Export Utility** – Allows exporting expense reports in `.csv` format for offline access.

---

## 📦 Installation & Setup

Get started with ExpenseX on your local development environment:

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (v16+)
- **npm** or **yarn**

### ⚙️ Setup Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/your-username/expensex.git
   ```

2. **Navigate to the Project Directory**

   ```bash
   cd expensex
   ```

3. **Install Dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

4. **Start the Development Server**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Visit:
   ```
   http://localhost:5173
   ```

---

## 📁 Project File Structure

```
src/
├── assets/                      # Static files (images, icons, etc.)
├── components/
│   ├── authentication/         # Auth-related components (Login, Signup, etc.)
│   ├── footer/modals/          # Modal components like game, feedback, etc.
│   ├── home/                   # Main dashboard components
│   └── shared/                 # Navbar, Footer, Admin UI, Expense cards
├── pages/
│   └── Home.jsx                # Main landing/dashboard page
```

---

## 🎨 How to Use

1. **Sign Up** to create your account.
2. **Add a budget** and log expenses using the dashboard.
3. **Visualize your spending** trends with dynamic charts.
4. **Play the math mini-game** in the footer when you need a break.
5. **Export data** to CSV to keep offline records.
6. **Stay within budget** using the live alerts.

---

## 🧪 Test Cases

| **Test Scenario**                                                        | **Expected Outcome**                                                                                     |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
| 🔐 **Login with incorrect credentials**                                  | User receives an error toast notification: `"Invalid credentials"` and stays on the login screen.        |
| 🔐 **Login with correct credentials**                                    | User is redirected to the main **Expense Dashboard** with a success message.                             |
| 💰 **Enter a negative value in the Monthly Budget field**                | Validation error displayed: `"Budget must be a positive number"` and the value is not accepted.          |
| 💸 **Enter a negative value in the Amount field (while adding expense)** | Validation error displayed: `"Amount must be a positive number"` and the value is not added to the list. |
| ➕ **Click "Add Expense" with valid inputs**                             | Expense is added successfully and reflected in the **Expense List** and **Summary Section** updates.     |
| ♻️ **Click "Reset All Expenses"**                                        | All expense data is cleared from the current session, and summary values are reset to default.           |
| 📥 **Click "Download Monthly Report"**                                   | A `.csv` file is generated and downloaded containing all monthly expense records.                        |
| 📥 **Click "Download Weekly Report"**                                    | A `.csv` file is generated and downloaded containing all weekly expense records.                         |
| ⚙️ **Click "Features" button in Footer**                                 | A modal appears listing all major features of the app.                                                   |
| 📬 **Click "Contact Us" button in Footer**                               | A modal form opens where users can view the developer's name, email and other information .              |
| 📝 **Click "Feedback" button in Footer**                                 | A feedback form modal is triggered allowing users to share views suggestions or bugs.                    |
| 🎮 **Click "Play Quick Math Challenge" in Footer**                       | A modal appears where users can select difficulty level and question format to start the mini-game.      |
| 🔗 **Click any hyperlink in the Footer**                                 | User is redirected to the relevant section or external link in a new tab (if applicable).                |
| 🚪 **Click "Logout" button in Navbar**                                   | User is logged out and redirected to the login screen. Local/session data is cleared.                    |
| 🛠️ **Click "Admin Panel" button in Navbar**                              | Navigates to the Admin Panel section with user and feedback management options.                          |
| ➕ **Click "Create User" inside Admin Panel**                            | A form appears where new user details can be submitted and saved to local storage.                       |
| 💬 **Click "Feedback Management" inside Admin Panel**                    | Displays a list of submitted feedbacks with delete options for each.                                     |

---

## 🤝 How to Contribute

We welcome contributions from the community!

1. **Fork** this repository.
2. Create a new branch:
   ```bash
   git checkout -b feature-name
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add feature: feature-name"
   ```
4. **Push** to your fork:
   ```bash
   git push origin feature-name
   ```
5. **Create a Pull Request** for review.

---

## 📜 License

This project is licensed under the [MIT License](LICENSE).

---

## 🙌 Acknowledgements

Huge thanks to the open-source libraries that made this possible:

- [React.js](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Chart.js](https://www.chartjs.org/)
- [React Toastify](https://fkhadra.github.io/react-toastify/)

---

🌟 Enjoy using **ExpenseX** and take control of your financial journey in a smart, secure, and fun way!
