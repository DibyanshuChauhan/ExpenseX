# ExpenseX - Frontend Client

This directory contains the React 19 + Tailwind CSS v4 frontend client for **ExpenseX**.

> 💡 **For the complete full-stack documentation, setup instructions, offline cloning guide, and mathematical formula explanations, please see the [Root README.md](../README.md).**

---

## Quickstart (Frontend Only)

### Prerequisites
- Node.js (v18+ or v20+)
- npm or yarn

### Installation & Run
```bash
# Install dependencies
npm install

# Start Vite development server
npm run dev
```

The frontend client will run at: `http://localhost:5173/`

### Production Build
```bash
npm run build
```

---

## Key Frontend Features
- **Modern React 19** with Context API architecture (`ThemeContext.jsx`).
- **Tailwind CSS v4** styling with `@custom-variant dark (&:where(.dark, .dark *))` for full dark/light mode toggle support with `localStorage` persistence.
- **Dynamic Charts** with Chart.js and `react-chartjs-2`.
- **Framer Motion** micro-interactions and transitions.
- **CSV Data Export** with standard formatting.
- **12-Hour AM/PM Real-Time Clock** in the footer with live seconds counter.