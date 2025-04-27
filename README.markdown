# ExpenseX - Personal Finance Management Application

**ExpenseX** is a React-based web application designed to help users track expenses, manage budgets, visualize financial trends, and engage with a unique math-based game. It includes an admin panel for user and feedback management, a responsive UI styled with Tailwind CSS, and smooth animations powered by Framer Motion. The application uses localStorage for data persistence, making it a lightweight prototype suitable for single-user testing, with potential for backend integration in production.

This README provides an overview of the project, setup instructions, architecture, usage guide, and additional details for developers and users.

---

## Table of Contents
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
- [How to Use ExpenseX](#how-to-use-expensex)
  - [New Users](#new-users)
  - [Existing Users](#existing-users)
  - [Default Admin](#default-admin)
  - [Secondary Admin](#secondary-admin)
- [Project Structure](#project-structure)
- [Architecture](#architecture)
- [Development Notes](#development-notes)
- [Pros and Cons](#pros-and-cons)
- [Screenshots](#screenshots)
- [Test Cases](#test-cases)
- [Future Improvements](#future-improvements)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Project Overview

**ExpenseX** aims to simplify personal finance management by providing an intuitive and engaging platform for tracking expenses and budgets. Its primary purpose is to empower users—such as students, professionals, or small business owners—to monitor their spending, set financial goals, and gain insights through visualizations. The inclusion of a math-based game adds a fun element, promoting numerical literacy and user retention. An admin panel allows administrators to manage users and review feedback, making it suitable for small-scale organizational use.

The application is built as a prototype, leveraging localStorage for data storage to focus on frontend functionality. It demonstrates modern React practices, responsive design, and a polished user experience.

---

## Key Features

- **Expense Tracking**: Add, view, and categorize expenses with details like amount, category, date, and description (`ExpenseForm.jsx`, `ExpenseList.jsx`).
- **Budget Management**: Set and monitor budgets, with real-time tracking of remaining funds (`BudgetInput.jsx`).
- **Data Visualization**: View spending trends via bar charts and category summaries (`ChartSection.jsx`, `SummarySection.jsx`).
- **Report Generation**: Download weekly or monthly expense reports (`ReportDownload.jsx`).
- **Math-Based Game**: Engage with a timed math game offering "Math" or "Statement" problems, with a calculator feature (`GameModal.jsx`).
- **Admin Panel**: Manage users (create/delete) and feedback (view/delete) with restricted access for default admins (`AdminPanel.jsx`).
- **Feedback System**: Submit feedback for admin review, stored in localStorage (`FeedbackModal.jsx`).
- **Responsive Design**: Adapts to various screen sizes using Tailwind CSS.
- **Animations**: Smooth transitions and hover effects with Framer Motion (`GameModal.jsx`, `ExpenseForm.jsx`).
- **Notifications**: User-friendly toast notifications for actions and errors (`react-toastify`).

---

## Technologies Used

- **Frontend**: React (v19)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Data Visualization**: Chart.js, react-chartjs-2
- **Date Picker**: react-datepicker
- **Notifications**: react-toastify
- **Icons**: react-icons
- **Data Storage**: localStorage
- **Build Tool**: Vite
- **Linter**: ESLint
- **Other Libraries**: uuid (for unique IDs)

---

## Installation and Setup

### Prerequisites

- **Node.js** (v16 or higher)
- **npm** (v8 or higher) or **yarn**
- A modern web browser (Chrome, Firefox, Edge)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/your-username/expensex.git
   cd expensex
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

   Or, if using yarn:

   ```bash
   yarn install
   ```

3. **Run the Development Server**:

   ```bash
   npm run dev
   ```

   This starts the Vite development server, typically at `http://localhost:5173`.

4. **Build for Production** (optional):

   ```bash
   npm run build
   ```

   The production-ready files will be in the `dist` folder.

5. **Open the Application**:
   Navigate to `http://localhost:5173` in your browser to use ExpenseX.

### Notes

- The app uses localStorage, so data persists in the browser. Clearing localStorage will reset all data.
- No backend server is required for this prototype.

---

## How to Use ExpenseX

ExpenseX is designed for various user types: new users, existing users, the default admin, and secondary admins. Below are tailored instructions to help each user type effectively use the application. All data is stored in your browser’s localStorage, so avoid clearing browser data to retain your expenses, budgets, and feedback.

### New Users

If you’re using ExpenseX for the first time, follow these steps to get started:

1. **Access the App**:

   - Open `http://localhost:5173` after completing the [Installation and Setup](#installation-and-setup).
   - You’ll see the login screen.

2. **Log In**:

   - Use the default admin account: `username: admin`, `password: admin` (case-sensitive).
   - Alternatively, ask an admin to create a user account for you via the Admin Panel (see [Default Admin](#default-admin)).

3. **Explore the Dashboard**:

   - After logging in, you’ll see the main dashboard with sections for adding expenses, setting a budget, and viewing charts.
   - Start by adding an expense:
     - In the **Expense Form**, enter an amount (e.g., `50`), select a category (e.g., `Food`), choose a date, add a description (e.g., `Lunch`), and click **Add Expense**.
     - The expense appears in the **Expense List** below.

4. **Set a Budget**:

   - In the **Budget Input** section, enter a monthly budget (e.g., `1000`) and click **Set Budget**.
   - The dashboard will show your remaining budget and total spent.

5. **Try the Math Game**:

   - Click **Play Quick Math Challenge** in the footer to open the game modal.
   - Choose a difficulty (Easy, Medium, Hard) and question type (Math or Statement), then answer questions within the time limit.

6. **Submit Feedback**:

   - Click **Send Feedback** in the footer, enter your comments, and submit. Feedback is viewable by admins.

7. **Next Steps**:
   - Explore charts in the **Chart Section** to see spending trends.
   - Download a report (weekly or monthly) via the **Report Download** section.
   - Log out via the **Navbar** when done.

**Tip**: Your data is saved in localStorage under your username (e.g., `expenses_username`). Avoid clearing browser data to keep your progress.

### Existing Users

If you’ve used ExpenseX before and have a user account, here’s how to continue managing your finances:

1. **Log In**:

   - Enter your username and password on the login screen.
   - If you’ve forgotten your credentials, ask an admin to verify or reset them via the Admin Panel.

2. **Manage Expenses**:

   - **Add Expenses**: Use the **Expense Form** to log new expenses. Ensure all fields (amount, category, date, description) are filled to avoid errors.
   - **View Expenses**: Check the **Expense List** to see your expense history, displayed as cards with category, date, and amount.
   - **Reset Expenses**: Use the **Reset All Expenses** button (if available) to clear your expense data (note: this cannot be undone).

3. **Monitor Budget**:

   - Update your budget in the **Budget Input** section if your financial goals change.
   - Track your **Remaining Budget** and **Total Spent** on the dashboard. If you overspend, the remaining budget shows `0` to avoid confusion.

4. **Analyze Spending**:

   - View the **Chart Section** for bar charts of spending trends (weekly or monthly).
   - Check the **Summary Section** for a breakdown of spending by category (e.g., `Food: $150`).

5. **Generate Reports**:

   - Use the **Report Download** section to export a `.csv` file of your expenses (select weekly or monthly view).

6. **Engage with the Game**:

   - Play the math game via the footer to earn points and improve numerical skills.
   - Use the calculator feature (costs 10 points) for complex questions, but note the 30-second time limit.

7. **Provide Feedback**:

   - Submit feedback via the footer to suggest improvements or report issues. Include details to help admins address your input.

8. **Log Out**:
   - Click **Logout** in the **Navbar** to secure your session, especially on shared devices.

**Tip**: Sync issues across browser tabs are handled automatically (via `storage` events in `Footer.jsx`). Ensure your browser supports localStorage.

### Default Admin

The default admin (`username: admin`) has elevated privileges to manage users and feedback. Here’s how to use these features:

1. **Log In**:

   - Use `username: admin`, `password: admin` on the login screen.
   - This account is pre-configured in localStorage and cannot be deleted.

2. **Access the Admin Panel**:

   - Click **Admin Panel** in the **Navbar** to open the admin interface.
   - The panel includes sections for **User Management** and **Feedback Management**.

3. **Manage Users**:

   - **Create Users**: In the **User Management** section, enter a username, password, and select whether the user is an admin (secondary admin) or regular user. Click **Create User** to add them to localStorage.
   - **Delete Users**: Select a user from the list and click **Delete**. Only the default admin can delete users, ensuring security.
   - **View User Expenses**: Check the **All Users** section to see expenses for each user, stored as `expenses_${username}` in localStorage.

4. **Manage Feedback**:

   - In the **Feedback Management** section, view all feedback submitted by users (stored as `adminFeedbacks` in localStorage).
   - **Filter Feedback**: Enter a username or keyword to filter feedback for quick review.
   - **Delete Feedback**: Click **Delete** next to a feedback entry to remove it, or use **Delete All Feedbacks** (with confirmation) to clear all feedback.
   - Only the default admin can delete feedback, preventing unauthorized actions.

5. **Use Regular Features**:

   - The default admin can also track expenses, set budgets, view charts, download reports, play the game, and submit feedback like regular users (see [Existing Users](#existing-users)).

6. **Best Practices**:
   - Regularly review feedback to identify user issues or feature requests.
   - Avoid creating too many users, as localStorage has a 5-10 MB limit.
   - Log out after admin tasks to prevent unauthorized access.

**Tip**: The default admin’s privileges (e.g., deleting users) are enforced client-side (`isDefaultAdmin` in `AdminPanel.jsx`). For production, add server-side validation.

### Secondary Admin

Secondary admins are users created with admin privileges but lack the default admin’s full control. Here’s how to use the app as a secondary admin:

1. **Log In**:

   - Use the username and password assigned by the default admin during user creation.
   - If you don’t have an account, ask the default admin to create one with admin status.

2. **Access the Admin Panel**:

   - Click **Admin Panel** in the **Navbar** (visible only if `isAdmin` is true for your account).
   - The panel shows **User Management** and **Feedback Management**, but some actions are restricted.

3. **Limited User Management**:

   - **View Users**: See the list of users and their expenses in the **All Users** section.
   - **Create Users**: You can create new users (regular or secondary admin) if the form is enabled (depends on implementation).
   - **Restricted Actions**: You cannot delete users, as this is reserved for the default admin (`isDefaultAdmin` check in `AdminPanel.jsx`).

4. **Limited Feedback Management**:

   - **View Feedback**: Browse all feedback in the **Feedback Management** section.
   - **Filter Feedback**: Use the filter input to search by username or content.
   - **Restricted Actions**: You cannot delete individual feedback or all feedback, as these actions require default admin privileges.

5. **Use Regular Features**:

   - Like regular users, you can track expenses, set budgets, view charts, download reports, play the game, and submit feedback (see [Existing Users](#existing-users)).

6. **Best Practices**:
   - Focus on monitoring user activity and feedback to support the default admin.
   - Communicate with the default admin for actions requiring elevated privileges (e.g., deleting users).
   - Log out after admin tasks to secure your session.

**Tip**: Your admin status is stored in localStorage (`isAdmin: true`). Be cautious, as client-side checks can be bypassed in a prototype.

---

## Project Structure

The project follows a modular structure with components organized by feature:

```
expensex/
├── public/
│   └── index.html
├── src/
│   ├── assets/
│   │   └── [Static files like images, icons, etc.]
│   ├── components/
│   │   ├── authentication/
│   │   │   ├── ChangePassword.jsx
│   │   │   ├── ForgetPassword.jsx
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── footer/
│   │   │   └── modals/
│   │   │       ├── ContactModal.jsx
│   │   │       ├── FeaturesModal.jsx
│   │   │       ├── FeedbackModal.jsx
│   │   │       └── GameModal.jsx
│   │   ├── home/
│   │   │   ├── BudgetInput.jsx
│   │   │   ├── ChartSection.jsx
│   │   │   ├── ExpenseForm.jsx
│   │   │   ├── ExpenseList.jsx
│   │   │   ├── ReportDownload.jsx
│   │   │   └── SummarySection.jsx
│   │   └── shared/
│   │       ├── AdminPanel.jsx
│   │       ├── ExpenseCard.jsx
│   │       ├── Footer.jsx
│   │       └── Navbar.jsx
│   ├── pages/
│   │   └── Home.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .eslintrc.cjs
├── package.json
├── tailwind.config.js
├── vite.config.js
└── README.md

```

- **components/**: Contains reusable React components for specific features.
- **assets/styles/**: Custom CSS for third-party libraries (e.g., `react-datepicker`).
- **App.jsx**: Main app component that orchestrates the UI and passes props.
- **main.jsx**: Entry point for React rendering.
- **tailwind.config.js**: Configuration for Tailwind CSS customization.

---

## Architecture

ExpenseX follows a **component-based architecture** in React, with the following key aspects:

- **Component Hierarchy**:

  - **Navbar.jsx** and **Footer.jsx** serve as top-level layout components, providing navigation and persistent UI elements (e.g., feedback button, game trigger).
  - Feature-specific components (e.g., `ExpenseForm.jsx`, `ChartSection.jsx`) handle individual functionalities.
  - Modals (`GameModal.jsx`, `FeedbackModal.jsx`, `AdminPanel.jsx`) are conditionally rendered for specific interactions.

- **State Management**:

  - **Local State**: Managed with `useState` for component-specific data (e.g., `score` in `GameModal.jsx`, `form` in `ExpenseForm.jsx`).
  - **Props Drilling**: Data like `currentUser`, `expenses`, and functions (`addExpense`, `getChartData`) are passed from `App.jsx` to children.
  - **LocalStorage**: Acts as a centralized data store for expenses (`expenses_${username}`), budgets, users, and feedbacks (`adminFeedbacks`).

- **Data Flow**:

  - Components read/write to localStorage for persistence (e.g., `addExpense` in `ExpenseForm.jsx`).
  - Functions like `getChartData` and `getCategorySummary` are passed as props to process data for visualizations.
  - `useEffect` hooks in `Footer.jsx` sync `currentUser` across browser tabs via `storage` events.

- **Styling**:

  - Tailwind CSS provides utility-first styling for responsiveness (e.g., `grid grid-cols-1 sm:grid-cols-2` in `ExpenseList.jsx`).
  - Custom fonts (Poppins) and dark theme ensure a cohesive look.

- **Animations**:
  - Framer Motion’s `AnimatePresence` ensures smooth modal and dropdown transitions (e.g., `GameModal.jsx`, `ExpenseForm.jsx`).

This architecture prioritizes modularity, reusability, and a polished user experience, suitable for a prototype but extensible for production.

---

### For Users

1. **Login**:

   - Log in with a username and password (stored in localStorage). Default admin: `username: admin`.
   - Non-admin users can track expenses; admins access the `AdminPanel`.

2. **Track Expenses**:

   - In `ExpenseForm.jsx`, enter amount, category, date, and description.
   - View expenses as cards in `ExpenseList.jsx`.

3. **Manage Budget**:

   - Set a budget in `BudgetInput.jsx`. Monitor remaining budget and total spent.

4. **Visualize Data**:

   - Check spending trends in `ChartSection.jsx` (bar chart) and category totals in `SummarySection.jsx`.

5. **Download Reports**:

   - Use `ReportDownload.jsx` to export weekly or monthly expense reports.

6. **Play the Game**:

   - Click “Play Quick Math Challenge” in `Footer.jsx` to open `GameModal.jsx`.
   - Choose “Math” or “Statement” problems, answer within the timer, and use the calculator (costs 10 points).

7. **Submit Feedback**:

   - Click “Send Feedback” in `Footer.jsx` to open `FeedbackModal.jsx` and submit feedback for admin review.

8. **Admin Tasks** (Admin Only):
   - Access `AdminPanel.jsx` via `Navbar.jsx`.
   - Create/delete users (default admin only).
   - View/delete feedback.

### For Admins

- **Default Admin Privileges**: Only the `admin` user can delete users or all feedbacks.
- **Feedback Management**: Filter and delete feedback in `AdminPanel.jsx`.
- **User Management**: View all users and their expenses.

---

## Development Notes

- **LocalStorage**: Used for simplicity but not suitable for production due to security (e.g., plain-text passwords) and scalability (5-10 MB limit) issues.
- **ESLint**: Some rules (`no-unused-vars`, `react-hooks/exhaustive-deps`) are disabled for prototyping. Re-enable for production to catch potential bugs.
- **Security**: Client-side admin checks (`isAdmin`) can be bypassed. Server-side validation is needed for production.
- **GameModal.jsx**: Uses `eval` for calculations, posing a security risk. Replace with `mathjs` in production.
- **Performance**: Frequent `useEffect` updates (e.g., timer in `GameModal.jsx`, clock in `Footer.jsx`) may cause re-renders. Optimize with `useMemo` or `requestAnimationFrame`.

### Challenges Faced

- **Dropdown Filtering**: Syncing `filteredCategories` in `ExpenseForm.jsx` was complex; resolved with `useState` and dynamic filtering.
- **Timer Logic**: Preventing memory leaks in `GameModal.jsx` required careful `useEffect` cleanup.
- **Cross-Tab Sync**: Ensured `currentUser` consistency across tabs using `storage` events in `Footer.jsx`.

---


## Screenshots

- **Dashboard Overview**  
  ![Dashboard Overview](./src/assets/User%20Dashboard.png)
- **Expense List**  
  ![Expense List](./src/assets/Add%20Expenses.png)
- **Math Game Modal**  
  ![Math Game Modal](./src/assets/Game%20Modal.png)
- **Admin Panel**  
  ![Admin Panel](./src/assets/Admin%20Dashboard.png)
  ![Admin Panel](./src/assets/Admin%20Dashboard-2.png)
- **Feedback Modal**  
  ![Feedback Modal](./src/assets/Feedback%20Modal.png)

---


## Pros and Cons

Below is an analysis of the strengths and weaknesses of the ExpenseX application, highlighting its capabilities and limitations.

### Pros

- **Intuitive User Interface**: The application offers a clean, responsive UI with Tailwind CSS, ensuring accessibility across devices (e.g., `grid grid-cols-1 sm:grid-cols-2` in `ExpenseList.jsx`).
- **Engaging Features**: The math-based game (`GameModal.jsx`) adds a unique, interactive element that promotes user retention and numerical literacy.
- **Comprehensive Functionality**: Supports expense tracking, budgeting, data visualization, report generation, and admin management, covering diverse user needs.
- **Smooth Animations**: Framer Motion enhances UX with seamless transitions (e.g., modal fades in `FeedbackModal.jsx`), making interactions polished.
- **Lightweight Prototype**: LocalStorage eliminates the need for a backend, enabling quick setup and testing without server infrastructure.
- **Modular Architecture**: Component-based design (e.g., reusable `ExpenseCard.jsx`) ensures maintainability and extensibility.
- **Real-Time Feedback**: `react-toastify` provides instant notifications (e.g., “Expense added!”), improving usability.
- **Cross-Tab Sync**: `useEffect` in `Footer.jsx` syncs `currentUser` across tabs, ensuring a consistent experience.

### Cons

- **Security Risks**: Storing sensitive data (e.g., passwords) in localStorage is insecure, vulnerable to XSS attacks. Client-side admin checks (`isAdmin`) can be bypassed.
- **Scalability Limitations**: LocalStorage’s 5-10 MB limit restricts data storage, unsuitable for multi-user or large-scale use.
- **No Backend Integration**: Lack of a database prevents real-time data syncing, multi-device access, or concurrent user support.
- **Performance Concerns**: Frequent state updates (e.g., timer in `GameModal.jsx`, clock in `Footer.jsx`) may cause unnecessary re-renders, impacting performance.
- **Insecure Calculations**: Using `eval` in `GameModal.jsx` for math problems poses security risks if inputs are untrusted.
- **Limited Error Handling**: No robust handling for localStorage corruption or quota errors, which could crash the app.
- **Accessibility Gaps**: Lacks ARIA labels and full keyboard navigation, limiting usability for disabled users.
- **No Testing**: Absence of unit or integration tests (e.g., for `ExpenseForm.jsx`) risks undetected bugs in production.

---

## Test Cases

| **Test Scenario**                                                        | **Expected Outcome**                                                                                     |
| ------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------- |
|  **Login with incorrect credentials**                                  | User receives an error toast notification: `"Invalid credentials"` and stays on the login screen.        |
|  **Login with correct credentials**                                    | User is redirected to the main **Expense Dashboard** with a success message.                             |
|  **Enter a negative value in the Monthly Budget field**                | Validation error displayed: `"Budget must be a positive number"` and the value is not accepted.          |
|  **Enter a negative value in the Amount field (while adding expense)** | Validation error displayed: `"Amount must be a positive number"` and the value is not added to the list. |
|  **Click "Add Expense" with valid inputs**                             | Expense is added successfully and reflected in the **Expense List** and **Summary Section** updates.     |
|  **Click "Reset All Expenses"**                                        | All expense data is cleared from the current session, and summary values are reset to default.           |
|  **Click "Download Monthly Report"**                                   | A `.csv` file is generated and downloaded containing all monthly expense records.                        |
|  **Click "Download Weekly Report"**                                    | A `.csv` file is generated and downloaded containing all weekly expense records.                         |
|  **Click "Features" button in Footer**                                 | A modal appears listing all major features of the app.                                                   |
|  **Click "Contact Us" button in Footer**                               | A modal form opens where users can view the developer's name, email and other information .              |
|  **Click "Feedback" button in Footer**                                 | A feedback form modal is triggered allowing users to share views suggestions or bugs.                    |
|  **Click "Play Quick Math Challenge" in Footer**                       | A modal appears where users can select difficulty level and question format to start the mini-game.      |
|  **Click any hyperlink in the Footer**                                 | User is redirected to the relevant section or external link in a new tab (if applicable).                |
|  **Click "Logout" button in Navbar**                                   | User is logged out and redirected to the login screen. Local/session data is cleared.                    |
|  **Click "Admin Panel" button in Navbar**                              | Navigates to the Admin Panel section with user and feedback management options.                          |
|  **Click "Create User" inside Admin Panel**                            | A form appears where new user details can be submitted and saved to local storage.                       |
|  **Click "Feedback Management" inside Admin Panel**                    | Displays a list of submitted feedbacks with delete options for each.                                     |

---

## Future Improvements

To make ExpenseX production-ready or more competitive, consider:

- **Backend Integration**: Replace localStorage with a database (e.g., MongoDB) and API (Node.js/Express) for scalability and security.
- **Authentication**: Implement JWT or OAuth for secure user login.
- **Multi-Currency Support**: Add currency selection in `ExpenseForm.jsx` with real-time conversion via an API.
- **Accessibility**: Add ARIA labels, keyboard navigation, and screen reader support.
- **Testing**: Write unit and integration tests using Jest and React Testing Library for critical components (`ExpenseForm.jsx`, `GameModal.jsx`).
- **Performance**: Memoize components and cache localStorage reads to reduce re-renders.
- **Multiplayer Game**: Extend `GameModal.jsx` with WebSockets for real-time competition.
- **Mobile App**: Develop a React Native version for iOS and Android.

---

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/your-feature`).
3. Commit changes (`git commit -m "Add your feature"`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

Please ensure code follows ESLint rules and includes inline comments for clarity.

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact

For questions, feedback, or support:

- **Developer**: Dibyanshu Chauhan
- **Email**: cdivyanshu98@gmail.com
- **Social Media**: [LinkedIn](https://www.linkedin.com/in/divyanshu011/), [Twitter/X](https://x.com/divyanshC01), [Instagram](https://www.instagram.com/devyanshu__011/)

For project-related inquiries, open an issue on the [GitHub repository](https://github.com/DibyanshuChauhan/ExpenseX).

---

_Built with ❤️ using React and Tailwind CSS. Happy tracking!_