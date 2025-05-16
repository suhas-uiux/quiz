import React, { useState } from "react";
import "./App.css";

const quizData = [
  {
    question: "for i in range(1, 5):\n    print(' ' * (4 - i) + '*' * i)",
    options: ["Left-aligned triangle", "Right-aligned triangle", "Square", "Inverted triangle"],
    answer: "Right-aligned triangle"
  },
  {
    question: "int a = 10;\ncout << a++ + a++ << endl;",
    options: ["21", "22", "20", "Undefined"],
    answer: "21"
  },
  {
    question: "print(len(set(\"programming\")))",
    options: ["11", "10", "7", "8"],
    answer: "7"
  },
  {
    question: "int a = 10, b = 20;\na = a ^ b;\nb = a ^ b;\na = a ^ b;\nprintf(\"%d %d\", a, b);",
    options: ["10 20", "30 10", "20 10", "20 30"],
    answer: "20 10"
  },
  {
    question: "#include <iostream>\nusing namespace std;\nint main() {\n    int a = 5;\n    cout << ++a << \" \" << a++;\n    return 0;\n}",
    options: ["6 6", "5 5", "6 5", "6 7"],
    answer: "6 6"
  },
  {
    question: "print(2 * 3 * 2)",
    options: ["64", "512", "36", "729"],
    answer: "512"
  },
  {
    question: "Which operator has the highest precedence?",
    options: ["+", "=", "*", "()"],
    answer: "()"
  },
  {
    question: "What does type({}) return?",
    options: ["list", "set", "dict", "tuple"],
    answer: "dict"
  },
  {
    question: "Which data structure is mutable?",
    options: ["tuple", "string", "list", "frozenset"],
    answer: "list"
  },
  {
    question: "for i in range(1, 5): \n  if i == 3: continue \n  print(i, end=' ')",
    options: ["1234", "124", "123", "234"],
    answer: "124"
  },
  {
    question: "A bag contains 3 red, 4 green, and 5 blue balls. What is the probability of picking a green ball?",
    options: ["⅓", "¼", "⅓", "4/12"],
    answer: "⅓"
  },
  {
    question: "If all Zips are Zaps and all Zaps are Zogs, which of the following must be true?",
    options: ["All Zips are Zogs", "All Zogs are Zips", "All Zogs are Zaps", "All Zaps are Zips"],
    answer: "All Zips are Zogs"
  },
  {
    question: "If 3(x − 2) = 2(x + 3), then what is the value of x?",
    options: ["12", "6", "0", "-12"],
    answer: "12"
  },
  {
    question: "Which number comes next in the pattern?\n121, 144, 169, 196, ?",
    options: ["225", "200", "210", "205"],
    answer: "225"
  },
  {
    question: "A man walks 10 m North, then 10 m East, then 10 m South. How far is he from the starting point?",
    options: ["0 m", "10 m", "20 m", "14.14 m"],
    answer: "10 m"
  },


];

const shuffleArray = (array) => {
  return array
    .map(value => ({ value, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ value }) => value);
};

function App() {
  const [teamNames, setTeamNames] = useState({ member1: "", member2: "" });
  const [started, setStarted] = useState(false);
  const [shuffledQuiz, setShuffledQuiz] = useState([]);
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
    shuffledQuiz.forEach((q, index) => {
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
      setShuffledQuiz(shuffleArray(quizData));
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
          {shuffledQuiz.map((q, index) => (
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
          <h2>
            Thank you {teamNames.member1} & {teamNames.member2}!
          </h2>
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
          <h3>
            {teamNames.member1} & {teamNames.member2}, your Score:{" "}
            {calculateScore()} / {shuffledQuiz.length}
          </h3>
        </div>
      )}
    </div>
  );
}

export default App;
