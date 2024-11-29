import React, { useState } from "react";
import { questions } from "../assets/data"; // Ensure `data.js` exports the `questions` array
import axios from "axios";
import "./AptitudeTest.css";

const AptitudeTest = ({ userEmail, onComplete }) => {
    const [answers, setAnswers] = useState({});
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [showResults, setShowResults] = useState(false);

    const handleAnswer = (optionIndex) => {
        setAnswers((prev) => {
            const updatedAnswers = { ...prev, [questions[currentQuestion].id]: optionIndex };
            console.log("Current Answers:", updatedAnswers); // Debugging log
            return updatedAnswers;
        });

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            calculateScore();
        }
    };

    const calculateScore = async () => {
        const correctAnswers = questions.reduce((total, question) => {
            const userAnswer = answers[question.id];
            return userAnswer === question.correct ? total + 1 : total;
        }, 0);

        console.log("Final Score:", correctAnswers); // Debugging log
        console.log("Answers Submitted:", answers); // Debugging log

        try {
            await axios.post("http://localhost:5000/submit-test", {
                email: userEmail,
                score: correctAnswers,
            });
            setShowResults(true);
            onComplete();
        } catch (error) {
            console.error("Error submitting test:", error);
            alert("There was an error submitting your test. Please try again.");
        }
    };

    if (showResults) {
        return (
            <div className="results-container">
                <h2>Test Complete</h2>
                <p>
                    Your score:{" "}
                    {questions.reduce((total, question) => {
                        const userAnswer = answers[question.id];
                        return userAnswer === question.correct ? total + 1 : total;
                    }, 0)}
                </p>
            </div>
        );
    }

    return (
        <div className="test-container">
          

            <div className="question-section">
                <h3 className="question-text">
                    Q{questions[currentQuestion].id}: {questions[currentQuestion].question}
                </h3>
                <div className="options-container">
                    {questions[currentQuestion].options.map((option, index) => (
                        <button
                            key={index}
                            className="option-button"
                            onClick={() => handleAnswer(index)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>
            <div className="progress">
                Question {currentQuestion + 1} of {questions.length}
            </div>
              {/* Logo in the top right corner */}
              <img
                src="/images/Logo.jpg"  // Update with your logo's path
                alt="Logo"
                className="logos"
            />
        </div>
    );
};

export default AptitudeTest;
