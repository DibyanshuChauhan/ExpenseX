/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"; // Imports React for component creation and useEffect hook for side effects
import { motion, AnimatePresence } from "framer-motion"; // Imports motion for animations and AnimatePresence for managing modal presence
import { toast } from "react-toastify"; // Imports toast for displaying notifications
import { FaTimes } from "react-icons/fa"; // Imports FaTimes icon for the close button

// GameModal component displays an interactive math-based game with levels, a timer, and an optional calculator
// Props:
// - show: Boolean to control modal visibility
// - onClose: Function to close the modal
// - onReset: Function to reset the game state externally
const GameModal = ({ show, onClose, onReset }) => {
    // Initializes state variables to manage game data
    const [problemType, setProblemType] = useState(""); // Stores the type of problem (e.g., "Math" or "Statement")
    const [score, setScore] = useState(0); // Tracks the player's current score
    const [question, setQuestion] = useState(""); // Holds the current question text
    const [answer, setAnswer] = useState(""); // Stores the correct answer for the current question
    const [userInput, setUserInput] = useState(""); // Captures the user's answer input
    const [timeLeft, setTimeLeft] = useState(15); // Manages the countdown timer for each question (starts at 15 seconds)
    const [level, setLevel] = useState("Easy"); // Tracks the current difficulty level of the game
    const [questionsSolved, setQuestionsSolved] = useState(0); // Counts the number of questions answered correctly
    const [calculatorActive, setCalculatorActive] = useState(false); // Indicates if the calculator is currently active
    const [calculatorTime, setCalculatorTime] = useState(0); // Tracks the remaining time for calculator usage
    const [calculatorInput, setCalculatorInput] = useState(""); // Stores the user's calculator input

    // Sets up a timer effect to countdown for the question
    useEffect(() => {
        let timer;
        // Starts the timer only if the modal is visible and time remains
        if (show && timeLeft > 0) {
            timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1); // Decrements timeLeft every second
            }, 1000);
        } else if (timeLeft === 0) {
            generateQuestion(); // Triggers a new question when time runs out
        }
        // Cleans up the timer when the effect re-runs or component unmounts
        return () => clearInterval(timer);
    }, [show, timeLeft]);

    // Sets up a timer effect for the calculator when active
    useEffect(() => {
        let calcTimer;
        // Starts the calculator timer if active and time remains
        if (calculatorActive && calculatorTime > 0) {
            calcTimer = setInterval(() => {
                setCalculatorTime((prev) => prev - 1); // Decrements calculatorTime every second
            }, 1000);
        } else if (calculatorTime === 0) {
            setCalculatorActive(false); // Deactivates calculator when time expires
            setCalculatorInput(""); // Clears the calculator input
        }
        // Cleans up the calculator timer when the effect re-runs or component unmounts
        return () => clearInterval(calcTimer);
    }, [calculatorActive, calculatorTime]);

    // Generates a new question based on the current level and problem type
    const generateQuestion = () => {
        let a, b, operator;
        // Checks for level progression based on questions solved
        if (questionsSolved >= 10 && level === "Easy") {
            setLevel("Medium"); // Upgrades to Medium level after 10 questions
            setQuestionsSolved(0); // Resets solved count
            toast.info("Level Up! Now playing Medium level.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        } else if (questionsSolved >= 10 && level === "Medium") {
            setLevel("Hard"); // Upgrades to Hard level after 10 more questions
            setQuestionsSolved(0); // Resets solved count
            toast.info("Level Up! Now playing Hard level.", {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
        }
        // Defines question parameters based on the current level
        switch (level) {
            case "Easy":
                a = Math.floor(Math.random() * 50) + 1; // Random number 1-50
                b = Math.floor(Math.random() * 50) + 1; // Random number 1-50
                operator = "+"; // Only addition for Easy
                setTimeLeft(15); // Sets 15-second timer
                break;
            case "Medium":
                a = Math.floor(Math.random() * 100) + 1; // Random number 1-100
                b = Math.floor(Math.random() * 100) + 1; // Random number 1-100
                operator = Math.random() > 0.5 ? "+" : "-"; // Randomly chooses + or -
                setTimeLeft(12); // Sets 12-second timer
                break;
            case "Hard":
                a = Math.floor(Math.random() * 50) + 1; // Random number 1-50
                b = Math.floor(Math.random() * 50) + 1; // Random number 1-50
                operator = Math.random() > 0.5 ? "×" : "÷"; // Randomly chooses × or ÷
                setTimeLeft(10); // Sets 10-second timer
                break;
            default:
                a = Math.floor(Math.random() * 50) + 1; // Default to 1-50
                b = Math.floor(Math.random() * 50) + 1; // Default to 1-50
                operator = "+"; // Default to addition
        }
        // Constructs the question text based on problem type
        const questionText = problemType === "Math"
            ? `${a} ${operator} ${b} = ?` // Simple math format
            : `You spent $${a}, ${operator === "+" ? "add" : operator === "-" ? "subtract" : operator === "×" ? "multiply by" : "divide by"} $${b}, what’s the total?`; // Statement format
        setQuestion(questionText); // Updates the displayed question
        setAnswer(eval(`${a} ${operator === "+" ? "+" : operator === "-" ? "-" : operator === "×" ? "*" : "/"} ${b}`).toString()); // Calculates and stores the answer
        setUserInput(""); // Clears the user's previous input
        setTimeLeft(level === "Easy" ? 15 : level === "Medium" ? 12 : 10); // Resets timer based on level
    };

    // Handles submission of the user's answer
    const handleAnswerSubmit = (e) => {
        e.preventDefault(); // Prevents the form from refreshing the page
        if (userInput === answer) {
            setScore((prev) => prev + 2); // Adds 2 points for a correct answer
            setQuestionsSolved((prev) => prev + 1); // Increments the solved questions count
            toast.success(`Correct! +2 points. Total: ${score + 2}`, {
                position: "top-right",
                autoClose: 3000,
                theme: "dark",
                className: "navbar-poppins",
            });
            // Activates calculator if score reaches 10 and it’s not already active
            if (score + 2 >= 10 && !calculatorActive) setCalculatorActive(true);
            // Awards bonus points every 5 correct answers
            if ((score + 2) % 5 === 0) {
                setScore((prev) => prev + 10); // Adds 10 bonus points
                toast.success(`Bonus! +10 points. Total: ${score + 12}`, {
                    position: "top-right",
                    autoClose: 3000,
                    theme: "dark",
                    className: "navbar-poppins",
                });
            }
            // Determines the next action based on questions solved
            if (questionsSolved >= 9) {
                setProblemType(""); // Resets to problem type selection after 10 questions
            } else {
                generateQuestion(); // Generates a new question
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

    // Toggles the calculator on or off based on score
    const toggleCalculator = () => {
        if (score >= 10 && !calculatorActive) {
            setCalculatorActive(true); // Activates the calculator
            setCalculatorTime(10); // Sets a 10-second usage limit
            setScore((prev) => prev - 10); // Deducts 10 points to use it
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

    // Handles button presses on the calculator
    const handleCalculatorButton = (value) => {
        if (!calculatorActive) return; // Exits if calculator is inactive

        if (value === "=") {
            try {
                const result = eval(calculatorInput) || 0; // Evaluates the input expression
                setCalculatorInput(result.toString()); // Displays the result
                setUserInput(result.toString()); // Updates the user's answer
            } catch (error) {
                setCalculatorInput("Error"); // Shows error if calculation fails
            }
        } else if (value === "clear") {
            setCalculatorInput(""); // Clears the calculator input
            setUserInput(""); // Clears the user's answer
        } else {
            setCalculatorInput((prev) => prev + value); // Appends the button value to input
        }
    };

    // Resets the game to its initial state
    const resetGame = () => {
        setScore(0); // Resets score to zero
        setQuestionsSolved(0); // Resets solved questions
        setLevel("Easy"); // Returns to Easy level
        setProblemType(""); // Clears problem type
        setCalculatorActive(false); // Deactivates calculator
        setCalculatorTime(0); // Resets calculator time
        setUserInput(""); // Clears user input
        setTimeLeft(15); // Resets timer to 15 seconds
        setCalculatorInput(""); // Clears calculator input
        toast.info("Game reset successfully!", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
            className: "navbar-poppins",
        });
        if (onReset) onReset(); // Calls external reset function if provided
    };

    // Reset game state when closing modal
    const handleClose = () => {
        setScore(0); // Resets score to zero
        setQuestionsSolved(0); // Resets solved questions
        setLevel("Easy"); // Returns to Easy level
        setProblemType(""); // Clears problem type
        setCalculatorActive(false); // Deactivates calculator
        setCalculatorTime(0); // Resets calculator time
        setUserInput(""); // Clears user input
        setTimeLeft(15); // Resets timer to 15 seconds
        setCalculatorInput(""); // Clears calculator input
        if (onClose) onClose(); // Calls external close function
    };

    return (
        // AnimatePresence manages the modal's entry and exit animations
        <AnimatePresence>
            {show && (
                // Outer overlay dims the background and centers the modal
                <motion.div
                    initial={{ opacity: 0 }} // Starts with zero opacity
                    animate={{ opacity: 1 }} // Fades in to full opacity
                    exit={{ opacity: 0 }} // Fades out when closing
                    className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
                    onClick={handleClose} // Closes modal when clicking outside
                >
                    {/* Inner modal container with animation and styling */}
                    <motion.div
                        initial={{ y: 50, scale: 0.9 }} // Starts below and scaled down
                        animate={{ y: 0, scale: 1 }} // Moves up and scales to normal
                        exit={{ y: 50, scale: 0.9 }} // Moves down and scales down on exit
                        className="bg-gray-800 p-6 rounded-xl shadow-2xl w-full max-w-md relative overflow-hidden border border-indigo-700"
                        onClick={(e) => e.stopPropagation()} // Prevents closing when clicking inside
                    >
                        {/* Close button positioned at top-right */}
                        <button
                            onClick={handleClose} // Triggers modal closure
                            className="absolute top-2 right-2 text-white hover:text-red-500 transition-colors"
                        >
                            {/* Displays the close icon */}
                            <FaTimes size={20} />
                        </button>
                        {problemType === "" && (
                            // Section for selecting the problem type
                            <div className="text-center">
                                 {/* Title for problem type selection */}
                                <h5 className="text-2xl font-bold mb-6 text-indigo-300 tracking-wide">Select Problem Type</h5>
                                 {/* Container for problem type buttons */}
                                <div className="space-y-6">
                                     {/* Button to select Statement problems */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                        whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                        onClick={() => {
                                            setProblemType("Statement"); // Sets problem type
                                            generateQuestion(); // Generates the first question
                                        }}
                                        className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                    >
                                        Statement Problems
                                    </motion.button>
                                     {/* Button to select Math problems */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                        whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                        onClick={() => {
                                            setProblemType("Math"); // Sets problem type
                                            generateQuestion(); // Generates the first question
                                        }}
                                        className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                    >
                                        Math Problems
                                    </motion.button>
                                </div>
                            </div>
                        )}
                        {problemType !== "" && (
                            // Main game interface section
                            <>
                                 {/* Displays the current level */}
                                <h5 className="text-2xl font-bold mb-4 text-indigo-300 tracking-wide">Level: {level}</h5>
                                 {/* Shows the current question */}
                                <p className="mb-4 text-gray-200 text-lg leading-relaxed">{question}</p>
                                 {/* Form for submitting the answer */}
                                <form onSubmit={handleAnswerSubmit} className="flex space-x-3 mb-4">
                                     {/* Input field for the user's answer */}
                                    <input
                                        type="number"
                                        value={userInput}
                                        onChange={(e) => setUserInput(e.target.value)} // Updates user input
                                        className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-500 text-lg placeholder-gray-400"
                                        placeholder="Enter your answer"
                                        required // Ensures input is provided
                                    />
                                     {/* Submit button for the answer */}
                                    <motion.button
                                        whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                        whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                        type="submit"
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                    >
                                        Submit
                                    </motion.button>
                                </form>
                                 {/* Displays time left and current score */}
                                <p className="mb-3 text-gray-400 text-lg">Time Left: {timeLeft}s | Score: {score}</p>
                                {calculatorActive && (
                                    // Calculator section when active
                                    <div className="mb-4 p-4 bg-gray-700 rounded-lg border border-indigo-600">
                                         {/* Shows remaining calculator time */}
                                        <p className="text-green-400 mb-2 text-lg font-medium">Calculator: {calculatorTime}s</p>
                                         {/* Input field for calculator operations */}
                                        <input
                                            type="text"
                                            value={calculatorInput}
                                            onChange={(e) => setCalculatorInput(e.target.value)} // Updates calculator input
                                            className="w-full p-2 bg-gray-600 text-white border border-gray-500 rounded-lg mb-2 text-lg placeholder-gray-400"
                                            placeholder="Calculator input"
                                            readOnly={!calculatorActive} // Disables input when inactive
                                        />
                                         {/* Grid layout for calculator buttons */}
                                        <div className="grid grid-cols-4 gap-1">
                                            {[7, 8, 9, "/"].map((num) => (
                                                // Button for number 7, 8, 9, and division
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                                    whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)} // Triggers calculator function
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            {[4, 5, 6, "×"].map((num) => (
                                                // Button for number 4, 5, 6, and multiplication
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                                    whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)} // Triggers calculator function
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            {[1, 2, 3, "-"].map((num) => (
                                                // Button for number 1, 2, 3, and subtraction
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                                    whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)} // Triggers calculator function
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                            {[0, ".", "=", "+"].map((num) => (
                                                // Button for number 0, decimal, equals, and addition
                                                <motion.button
                                                    whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                                    whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                                    key={num}
                                                    onClick={() => handleCalculatorButton(num)} // Triggers calculator function
                                                    className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded text-lg font-medium"
                                                >
                                                    {num}
                                                </motion.button>
                                            ))}
                                             {/* Clear button for resetting calculator */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                                whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                                onClick={() => handleCalculatorButton("clear")} // Clears calculator input
                                                className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded text-lg font-medium col-span-4"
                                            >
                                                Clear
                                            </motion.button>
                                        </div>
                                    </div>
                                )}
                                 {/* Button to toggle calculator usage */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                    whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                    onClick={toggleCalculator} // Activates or deactivates calculator
                                    className="w-full mb-3 bg-yellow-600 hover:bg-yellow-700 text-white px-5 py-2 rounded-lg transition-colors text-lg font-semibold shadow-md"
                                >
                                    Toggle Calculator (Cost: 10 pts)
                                </motion.button>
                                 {/* Button to reset the game */}
                                <motion.button
                                    whileHover={{ scale: 1.05 }} // Slightly enlarges on hover
                                    whileTap={{ scale: 0.95 }} // Slightly shrinks on click
                                    onClick={resetGame} // Resets the game state
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

// Exports the GameModal component for use in the application
export default GameModal;