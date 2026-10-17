# ExpenseX — Full-Stack Fintech Personal Finance Platform

<div align="center">

![ExpenseX Banner](https://img.shields.io/badge/ExpenseX-Fintech%20Intelligence-6366f1?style=for-the-badge&logo=cashapp&logoColor=white)

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Node.js](https://img.shields.io/badge/Node.js-v20+-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express 5](https://img.shields.io/badge/Express-5.x-000000?style=flat-square&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas%20%7C%20Local-47A248?style=flat-square&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Vite](https://img.shields.io/badge/Vite-6.x-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.x-black?style=flat-square&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![JWT](https://img.shields.io/badge/Security-JWT%20%26%20Bcrypt-000000?style=flat-square&logo=json-web-tokens&logoColor=white)](https://jwt.io/)
[![License: ISC](https://img.shields.io/badge/License-ISC-blue.svg?style=flat-square)](https://opensource.org/licenses/ISC)

**A high-performance, full-stack personal finance and wealth management dashboard designed for effortless expense tracking, budget allocation analytics, and real-time financial health monitoring.**

[Explore Features](#-platform-capabilities) • [Why ExpenseX?](#-why-is-expensex-essential-for-any-individual) • [The Percentage Math](#-the-core-mathematics-category-allocation--percentage-breakdown) • [Offline Installation](#-quickstart-offline--local-machine-setup) • [Architecture](#-project-architecture)

</div>

---

## 💡 Why is ExpenseX Essential for Any Individual?

Most people fail at personal finance not because they don't make enough money, but because **they don't know where their money goes**. 

- **The "Invisible Leak" Problem:** Small, unnoticed daily expenses (subscriptions, coffee runs, spontaneous online orders) quietly drain monthly savings.
- **Cognitive Overload:** Scanning long, unorganized bank statements at the end of the month causes anxiety rather than actionable insight.
- **Lack of Velocity Awareness:** Individuals often spend aggressively in the first two weeks of the month, only to struggle when fixed bills arrive in the final week.

### How ExpenseX Solves This:
1. **Instant Clarity Over Complexity:** Replace confusing bank spreadsheets with a clean, high-contrast Bento grid showing your **Allocated Budget**, **Total Outflow**, **Remaining Balance**, and **Spend Health** in real time.
2. **Proactive Budget Guardrails:** Visual progress bars warn you when you cross 75% and 90% utilization before an overdraft happens.
3. **Data Ownership & Privacy:** Complete isolation of account records, offline-first run capability, and full data exportability to CSV for spreadsheet modeling.

---

## 🧮 The Core Mathematics: Category Allocation & Percentage Breakdown

In the **Category Breakdown & Allocation** widget, ExpenseX computes the exact share of your total outflow claimed by each life category.

### 1. The Mathematical Formula

For any category $i$:

$$\text{Category Allocation Percentage } (P_i) = \left( \frac{\text{Amount Spent in Category } i}{\sum_{k=1}^{n} \text{Amount Spent in Category } k} \right) \times 100$$

Where:
- $\text{Amount Spent in Category } i$ is the sum of transactions logged under that specific category.
- $\sum_{k=1}^{n} \text{Amount Spent in Category } k$ is the **Total Spend across all categories combined**.

---

### 2. Concrete Example

Suppose an individual records three transactions during the month:
- **Entertainment:** ₹100,000
- **Health:** ₹10,000
- **Subscriptions:** ₹5,000

$$\text{Total Outflow} = ₹100,000 + ₹10,000 + ₹5,000 = \mathbf{₹115,000}$$

Now, calculating each category's proportion:

| Category | Amount Spent | Exact Fraction | Calculated Percentage |
| :--- | :---: | :---: | :---: |
| 🎬 **Entertainment** | ₹100,000 | $\frac{100,000}{115,000} \times 100$ | **87%** |
| 🩺 **Health** | ₹10,000 | $\frac{10,000}{115,000} \times 100$ | **9%** |
| 💳 **Subscriptions** | ₹5,000 | $\frac{5,000}{115,000} \times 100$ | **4%** |
| **Total** | **₹115,000** | — | **100%** |

In code (`frontend/src/components/home/SummarySection.jsx`):
```javascript
const totalCategorySpend = entries.reduce((acc, [_, amt]) => acc + (parseFloat(amt) || 0), 0);
const percent = totalCategorySpend > 0 
    ? Math.round((numericAmount / totalCategorySpend) * 100) 
    : 0;
```

---

### 3. Why is Showcasing the Percentage Necessary?

Knowing you spent ₹100,000 on entertainment is a raw number without context. Seeing that **Entertainment accounts for 87% of all money you spent this month** provides immediate psychological impact.

- **Immediate Root-Cause Diagnosis:** Percentages expose where money is bleeding without needing manual spreadsheet calculations.
- **Aligning with Financial Frameworks (e.g., 50/30/20 Rule):**
  - **50% Needs:** Rent, Groceries, Medicine, Utilities.
  - **30% Wants:** Entertainment, Dining out, Travel.
  - **20% Savings & Debt Repayments.**
  ExpenseX's percentage badges instantly reveal whether your spending aligns with or violates these golden ratios.
- **Proportional Visual Bars:** The mini progress bar beneath each card fills dynamically based on that category's percentage weight, making visual comparison instantaneous.

---

## 🌟 Platform Capabilities

### 🌓 Dual-Mode High-Contrast Glassmorphic UI
- **Zero-FOUC Dark & Light Themes:** Toggle seamlessly via the animated Sun/Moon navbar button.
- **`localStorage` Persistence:** Remembers user preference across sessions and synchronizes across open browser tabs via native `storage` events.
- **Tailwind v4 `@custom-variant`:** Built using modern CSS-first class tokens (`html.dark`) to guarantee high contrast regardless of OS settings.

### 📊 Real-Time Financial Health Bento Dashboard
- **Allocated Budget Card:** Displays active target ceiling and configuration status.
- **Total Outflow Card:** Real-time tally across all recorded expenses.
- **Remaining Balance Card:** Color-coded status (`text-emerald-500` for surplus, `text-rose-500` for deficit).
- **Spend Health Status Pill:** Dynamically diagnoses financial velocity (`Healthy Pace`, `Caution`, `Limit Exceeded`, or `Unconfigured`).

### ✍️ Intelligent Transaction Composer
- Pre-configured with **25+ comprehensive categories** (Food, Travel, Bills, Rent, Groceries, Investments, Healthcare, etc.).
- Searchable dropdown with icons and quick keyword filtering.
- Integrated calendar date picker (`react-datepicker`).

### 📈 Interactive Analytics Trends
- Powered by **Chart.js** and **react-chartjs-2**.
- Compares **Expenses vs Budget vs Remaining Funds** across weekly and monthly intervals.
- Canvas adapts tick colors, grid lines, and tooltip containers dynamically to light/dark themes.

### 📥 One-Click CSV Report Exporter
- Export filtered monthly or weekly transaction records into standard `.csv` files.
- Automatically stashed with structured headers: Date, Category, Description, and Amount.

### 🛡️ Administrative Command Center
- **User Account Management:** Provision new users or delete standard profiles.
- **Global Spending Audit:** View transactions and budgets across every registered account.
- **Feedback Inbox:** Search, filter, and moderate user submissions.

### ⏱️ Live 12-Hour AM/PM Footer Clock
- Real-time digital clock rendering exact hours, minutes, and seconds in 12-hour format:
  `Live Time: 4:45:12 PM`.

---

## 🛠️ Tech Stack & Architecture

### Frontend
- **Framework:** React 19 (Hooks, Context API, Suspense)
- **Tooling:** Vite 6
- **Styling:** Tailwind CSS v4 + Vanilla CSS Design Tokens
- **Animations:** Framer Motion
- **Icons:** React Icons (`fi`, `fa6`, `hi2`, `bs`)
- **Visuals:** Chart.js + react-chartjs-2

### Backend & Database
- **Runtime:** Node.js (ES Modules)
- **Server:** Express 5
- **Database:** MongoDB (via Mongoose 9)
- **Authentication:** JSON Web Tokens (JWT) + BcryptJS password hashing
- **CORS & Environment:** cors + dotenv

---

## 📂 Project Architecture

```
expensex/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js               # MongoDB connection logic & DNS fallback
│   │   ├── models/
│   │   │   ├── User.js             # User schema with bcrypt hashing
│   │   │   ├── Expense.js          # Expense schema with user referencing
│   │   │   └── Feedback.js         # Feedback schema
│   │   └── routes/
│   │       ├── authRoutes.js       # Login, register, password change, users list
│   │       ├── expenseRoutes.js    # CRUD expense routes & budget tracking
│   │       └── feedbackRoutes.js   # Feedback submission & moderation
│   ├── .env.example                # Backend environment variable template
│   ├── package.json
│   └── server.js                   # Express application entrypoint
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── authentication/     # Login, Signup, Password Reset modals
│   │   │   ├── footer/             # Footer modals (Contact, Features, Feedback)
│   │   │   ├── home/               # BudgetInput, ExpenseForm, ChartSection, SummarySection, ReportDownload
│   │   │   └── shared/             # Navbar, Footer, ThemeToggle, AdminPanel, ExpenseCard
│   │   ├── context/
│   │   │   └── ThemeContext.jsx    # Dark/Light theme state & localStorage sync
│   │   ├── pages/
│   │   │   └── Home.jsx            # Main dashboard bento grid
│   │   ├── services/
│   │   │   └── api.js              # Centralized Axios/Fetch client service
│   │   ├── App.jsx                 # Master application controller
│   │   ├── index.css               # Tailwind v4 directives & glassmorphic tokens
│   │   └── main.jsx
│   ├── index.html                  # FOUC prevention script & metadata
│   ├── package.json
│   └── vite.config.js
│
├── .gitignore                      # Clean production gitignore rules
├── package.json                    # Root scripts for concurrent orchestration
└── README.md                       # Documentation
```

---

## 💻 Quickstart: Offline & Local Machine Setup

Anyone can clone and run ExpenseX completely on their local machine without third-party cloud accounts.

### 1. Prerequisites
Ensure you have the following installed on your machine:
- **Node.js** (v18.x or v20.x recommended): [Download Node.js](https://nodejs.org/)
- **Git**: [Download Git](https://git-scm.com/)
- **MongoDB**: Either a local MongoDB Community server running locally on `mongodb://127.0.0.1:27017` or a free [MongoDB Atlas Cluster URI](https://www.mongodb.com/atlas).

---

### 2. Step-by-Step Installation

#### Step 1: Clone the Repository
Open your terminal (PowerShell, Command Prompt, or Terminal) and run:
```bash
git clone https://github.com/DibyanshuChauhan/expensex.git
cd expensex
```

#### Step 2: Install All Dependencies (Single Command)
From the project root directory, install all root, backend, and frontend packages at once:
```bash
npm run install:all
```
*(Or manually run `npm install` inside both `./backend` and `./frontend` folders).*

---

#### Step 3: Configure Environment Variables

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Copy `.env.example` to create your `.env` file:
   - On Windows (PowerShell):
     ```powershell
     Copy-Item .env.example .env
     ```
   - On macOS / Linux:
     ```bash
     cp .env.example .env
     ```
3. Open `backend/.env` in any text editor and adjust your values if necessary:
   ```env
   PORT=5000
   # For local offline MongoDB:
   MONGODB_URI=mongodb://127.0.0.1:27017/expensex
   # OR for cloud MongoDB Atlas:
   # MONGODB_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/expensex?retryWrites=true&w=majority
   JWT_SECRET=super_secret_jwt_random_key_12345
   JWT_EXPIRES_IN=7d
   ```
4. Return to the root folder:
   ```bash
   cd ..
   ```

---

#### Step 4: Run the Application (Concurrent Dev Servers)
From the root directory, start both the backend server and frontend development server simultaneously:
```bash
npm run dev
```

You will see both services spin up:
- **Backend API**: `http://localhost:5000`
- **Frontend App**: `http://localhost:5173`

Open your browser and navigate to:
```
http://localhost:5173
```

---

### 3. Default Credentials
ExpenseX automatically seeds a default super-administrator upon the first connection to MongoDB:

- **Username:** `admin`
- **Password:** `admin123`

You can log in directly as `admin` to access the **Administrative Command Center**, or click **Sign Up** to create an independent personal account.

---

## 🔒 Security & Data Integrity

- **Password Encryption:** Zero plain-text passwords stored. All credentials hashed using `bcryptjs` with salt rounds.
- **Session Tokens:** Stateless JWT tokens validated across protected backend routes.
- **MongoDB Schema Enforcement:** Strict data type validation and sanitize guards on expense inputs to prevent negative numerical entries.

---

## 👤 Author & Maintainer

**Dibyanshu Chauhan**  
*Front-End Web Developer & Full-Stack Engineer*
- 🌐 **LinkedIn:** [@divyanshu011](https://www.linkedin.com/in/divyanshu011/)
- 🐦 **Twitter/X:** [@cdivyanshu98](https://x.com/cdivyanshu98)
- 📷 **Instagram:** [@devyanshu__011](https://www.instagram.com/devyanshu__011/)
- 📧 **Direct Contact:** [cdivyanshu98@gmail.com](mailto:cdivyanshu98@gmail.com)

---

## 📄 License

This project is licensed under the [ISC License](LICENSE). Feel free to use, modify, and distribute for personal and educational projects.
