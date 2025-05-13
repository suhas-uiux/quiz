import React, { useState } from "react";
import "./App.css";

const quizData = [
  {
    question: `console.log(typeof null);`,
    options: ["'object'", "'null'", "'undefined'", "'number'"],
    answer: "'object'",
  },
  {
    question: `print("Hello" * 3)`,
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
    options: ["10", "11", "Compilation error", "Garbage value"],
    answer: "10",
  },
];

function App() {
  const [teamNames, setTeamNames] = useState({ member1: "", member2: "" });
  const [started, setStarted] = useState(false);
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

  const handleStartQuiz = () => {
    if (teamNames.member1 && teamNames.member2) {
      setStarted(true);
    }
  };

  if (!started) {
    return (
      <div className="App">
        <h1 className="title">👥 Team Registration</h1>
        <div className="team-form">
          <input
            type="text"
            placeholder="Enter Team Member 1 Name"
            value={teamNames.member1}
            onChange={(e) =>
              setTeamNames({ ...teamNames, member1: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Enter Team Member 2 Name"
            value={teamNames.member2}
            onChange={(e) =>
              setTeamNames({ ...teamNames, member2: e.target.value })
            }
          />
          <button
            className="submit-btn"
            onClick={handleStartQuiz}
            disabled={!teamNames.member1 || !teamNames.member2}
          >
            Start Quiz
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <h1 className="title">Tech Quiz Challenge</h1>

      {!submitted ? (
        <div>
          {quizData.map((q, index) => (
            <div key={index} className="question-block">
              <h3 className="q-number">Q{index + 1}:</h3>
              <pre className="code-snippet">
                <code>{q.question}</code>
              </pre>
              <div className="options">
                {q.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(index, option)}
                    className={
                      currentAnswers[index] === option
                        ? "option-btn selected"
                        : "option-btn"
                    }
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <button onClick={handleSubmit} className="submit-btn">
             Submit Quiz
          </button>
        </div>
      ) : (
        <div className="thank-you-block">
          <h2> Thank you {teamNames.member1} & {teamNames.member2}!</h2>
          <p>Your answers have been recorded.</p>
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
              placeholder="Enter password"
            />
            <button onClick={handlePasswordCheck}>Submit</button>
          </div>
        </div>
      )}

      {scoreVisible && (
        <div className="score-display">
          <h3>{teamNames.member1} & {teamNames.member2}, your Score: {calculateScore()} / {quizData.length}</h3>
        </div>
      )}
    </div>
  );
}

export default App;
