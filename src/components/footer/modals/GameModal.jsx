/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";

const GameModal = ({ show, onClose, onReset }) => {
    const [problemType, setProblemType] = useState("");
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState("");
    const [answer, setAnswer] = useState("");
    const [userInput, setUserInput] = useState("");
    const [timeLeft, setTimeLeft] = useState(15);
    const [level, setLevel] = useState("Easy");
    const [questionsSolved, setQuestionsSolved] = useState(0);
    const [calculatorActive, setCalculatorActive] = useState(false);
    const [calculatorTime, setCalculatorTime] = useState(0);
    const [calculatorInput, setCalculatorInput] = useState("");

    useEffect(() => {
        let timer;
        if (show && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            generateQuestion();
        }
        return () => clearInterval(timer);
    }, [show, timeLeft]);

    useEffect(() => {
        let calcTimer;
        if (calculatorActive && calculatorTime > 0) {
            calcTimer = setInterval(() => {
                setCalculatorTime((prev) => prev - 1);
            }, 1000);
        } else if (calculatorTime === 0) {
            setCalculatorActive(false);
            setCalculatorInput("");
        }
        return () => clearInterval(calcTimer);
    }, [calculatorActive, calculatorTime]);

    const generateQuestion = () => {
        let a, b, operator;
        if (questionsSolved >= 10 && level === "Easy") {
            setLevel("Medium");
            setQuestionsSolved(0);
            toast.info("Level Up! Now playing Medium level.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        } else if (questionsSolved >= 10 && level === "Medium") {
            setLevel("Hard");
            setQuestionsSolved(0);
            toast.info("Level Up! Now playing Hard level.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        }
        switch (level) {
            case "Easy":
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
                operator = "+";
                setTimeLeft(15);
                break;
            case "Medium":
                a = Math.floor(Math.random() * 100) + 1;
                b = Math.floor(Math.random() * 100) + 1;
                operator = Math.random() > 0.5 ? "+" : "-";
                setTimeLeft(12);
                break;
            case "Hard":
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
                operator = Math.random() > 0.5 ? "×" : "÷";
                setTimeLeft(10);
                break;
            default:
                a = Math.floor(Math.random() * 50) + 1;
                b = Math.floor(Math.random() * 50) + 1;
                operator = "+";
        }
        const questionText = problemType === "Math"
            ? `${a} ${operator} ${b} = ?`
            : `You spent $${a}, ${operator === "+" ? "add" : operator === "-" ? "subtract" : operator === "×" ? "multiply by" : "divide by"} $${b}, what’s the total?`;
        setQuestion(questionText);
        setAnswer(eval(`${a} ${operator === "+" ? "+" : operator === "-" ? "-" : operator === "×" ? "*" : "/"} ${b}`).toString());
        setUserInput("");
        setTimeLeft(level === "Easy" ? 15 : level === "Medium" ? 12 : 10);
    };

    const handleAnswerSubmit = (e) => {
        e.preventDefault();
        if (userInput === answer) {
            setScore((prev) => prev + 2);
            setQuestionsSolved((prev) => prev + 1);
            toast.success(`Correct! +2 points. Total: ${score + 2}`, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            if (score + 2 >= 10 && !calculatorActive) setCalculatorActive(true);
            if ((score + 2) % 5 === 0) {
                setScore((prev) => prev + 10);
                toast.success(`Bonus! +10 points. Total: ${score + 12}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                    className: "navbar-poppins",
                });
            }
            if (questionsSolved >= 9) {
                setProblemType("");
            } else {
                generateQuestion();
            }
        } else {
            toast.error("Wrong answer! Try again.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        }
    };

    const toggleCalculator = () => {
        if (score >= 10 && !calculatorActive) {
            setCalculatorActive(true);
            setCalculatorTime(10);
            setScore((prev) => prev - 10);
            toast.info("Calculator activated for 10 seconds!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        } else {
            toast.error("Need 10 points to unlock calculator!", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        }
    };

    const handleCalculatorButton = (value) => {
        if (!calculatorActive) return;

        if (value === "=") {
            try {
                const result = eval(calculatorInput) || 0;
                setCalculatorInput(result.toString());
                setUserInput(result.toString());
            } catch (error) {
                setCalculatorInput("Error");
            }
        } else if (value === "clear") {
            setCalculatorInput("");
            setUserInput("");
        } else {
            setCalculatorInput((prev) => prev + value);
        }
    };

    const resetGame = () => {
        setScore(0);
        setQuestionsSolved(0);
        setLevel("Easy");
        setProblemType("");
        setCalculatorActive(false);
        setCalculatorTime(0);
        setUserInput("");
        setTimeLeft(15);
        setCalculatorInput("");
        toast.info("Game reset successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            className: "navbar-poppins",
        });
        if (onReset) onReset();
    };

    // Reset game state when closing modal
    const handleClose = () => {
        setScore(0);
        setQuestionsSolved(0);
        setLevel("Easy");
        setProblemType("");
        setCalculatorActive(false);
        setCalculatorTime(0);
        setUserInput("");
        setTimeLeft(15);
        setCalculatorInput("");
        if (onClose) onClose();
    };

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleClose} // Updated to use handleClose
                >
                    <motion.div
                        initial={{ y: 50, scale: 0.9 }}
                        animate={{ y: 0, scale: 1 }}
                        exit={{ y: 50, scale: 0.9 }}
                        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden border border-indigo-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            onClick={handleClose} // Updated to use handleClose
                            className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors"
                        >
                            <FaTimes size={20} />
                        </button>
                        {problemType === "" && (
                            <div className="text-center">
                                <h5 className="text-2xl font-bold mb-6 text-indigo-300 tracking-wide">Select Problem Type</h5>
                                <div className="space-y-6">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setProblemType("Statement");
                                            generateQuestion();
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                    >
                                        Statement Problems
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => {
                                            setProblemType("Math");
                                            generateQuestion();
                                        }}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                    >
                                        Math Problems
                                    </motion.button>
                                </div>
                            </div>
                        )}
                        {problemType !== "" && (
                            <>
                                <h5 className="text-2xl font-bold mb-4 text-indigo-300 tracking-wide">Level: {level}</h5>
                                <p className="mb-4 text-gray-200 text-lg leading-relaxed">{question}</p>
                                <form onSubmit={handleAnswerSubmit} className="flex space-x-3 mb-4">
                                    <input
                                        type="number"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)}
                                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg placeholder-gray-400"
                                        placeholder="Enter your answer"
                                        required
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                    >
                                        Submit
                                    </motion.button>
                                </form>
                                <p className="mb-3 text-gray-400 text-lg">Time Left: {timeLeft}s | Score: {score}</p>
                                {calculatorActive && (
                                    <div className="mb-4 p-4 bg-gray-700 rounded-lg border border-indigo-600">
                                        <p className="text-green-400 mb-2 text-lg font-medium">Calculator: {calculatorTime}s</p>
                                        <input
                                            type="text"
                                            value={calculatorInput}
                                            onChange={(e) => setCalculatorInput(e.target.value)}
                                            className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded-lg mb-2 text-lg placeholder-gray-400"
                                            placeholder="Calculator input"
                                            readOnly={!calculatorActive}
                                        />
                                        <div className="grid grid-cols-4 gap-1">
                                            {[7, 8, 9, "/"].map((num) => (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            {[4, 5, 6, "×"].map((num) => (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            {[1, 2, 3, "-"].map((num) => (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            {[0, ".", "=", "+"].map((num) => (
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)}
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => handleCalculatorButton("clear")}
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-lg font-medium col-span-4"
                                            >
                                                Clear
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleCalculator}
                                    className="w-full mb-3 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                >
                                    Toggle Calculator (Cost: 10 pts)
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={resetGame}
                                    className="w-full bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                >
                                    Reset Game
                                </motion.button>
                            </>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default GameModal;