import React, { useState } from "react";
import "./App.css";

const quizData = [
  {
    question: `console.log(typeof null);`,
    language: "javascript",
    options: ["'object'", "'null'", "'undefined'", "'number'"],
    answer: "'object'",
  },
  {
    question: `print("Hello" * 3)`,
    language: "python",
    options: [
      '"Hello Hello Hello"',
      '"HelloHelloHello"',
      '"Hello3"',
      'Error',
    ],
    answer: '"HelloHelloHello"',
  },
  {
    question: `#include <stdio.h>\nint main() {\n  int x = 10;\n  printf("%d", x++);\n  return 0;\n}`,
    language: "c",
    options: ["10", "11", "Compilation error", "Garbage value"],
    answer: "10",
  },
];

function App() {
  const [currentAnswers, setCurrentAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [scoreVisible, setScoreVisible] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");

  const correctPassword = "admin123";

  const handleOptionClick = (qIndex, option) => {
    setCurrentAnswers({ ...currentAnswers, [qIndex]: option });
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const calculateScore = () => {
    let score = 0;
    quizData.forEach((q, index) => {
      if (currentAnswers[index] === q.answer) score++;
    });
    return score;
  };

  const handleViewScore = () => {
    setShowPasswordPopup(true);
  };

  const handlePasswordCheck = () => {
    if (passwordInput === correctPassword) {
      setScoreVisible(true);
      setShowPasswordPopup(false);
    } else {
      alert("Incorrect password!");
    }
  };

  return (
    <div className="App">
      <h1>Coding Quiz App</h1>

      {!submitted ? (
        <div>
          {quizData.map((q, index) => (
            <div key={index} className="question-block">
              <h3>Q{index + 1}:</h3>
              <pre className="code-snippet">
                <code>{q.question}</code>
              </pre>
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleOptionClick(index, option)}
                  className={
                    currentAnswers[index] === option ? "selected" : ""
                  }
                >
                  {option}
                </button>
              ))}
            </div>
          ))}
          <button onClick={handleSubmit} className="submit-btn">
            Submit
          </button>
        </div>
      ) : (
        <div>
          <h2>Thank you for attending the quiz!</h2>
          <button onClick={handleViewScore} className="view-score-btn">
            View Score
          </button>
        </div>
      )}

      {showPasswordPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>Enter password to view your score:</p>
            <input
              type="password"
              value={passwordInput}
              onChange={(e) => setPasswordInput(e.target.value)}
            />
            <button onClick={handlePasswordCheck}>Submit</button>
          </div>
        </div>
      )}

      {scoreVisible && (
        <div className="score-display">
          <h3>Your Score: {calculateScore()} / {quizData.length}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
