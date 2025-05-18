import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Assessment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const courseId = parseInt(id);
  
  // State management
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [currentAnswer, setCurrentAnswer] = useState('');
  const [completed, setCompleted] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    feedback: [],
  });

  // Questions based on course ID
  const questionsData = {
    1: [ // React Basics Course
      {
        question: "React is a ____?",
        correctAnswer: "JavaScript library for building user interfaces",
        keyTerms: ["javascript", "library", "user interface", "ui"]
      },
      {
        question: "What is JSX?",
        correctAnswer: "A syntax extension for JavaScript that looks similar to HTML",
        keyTerms: ["syntax", "extension", "javascript", "html"]
      },
      {
        question: "What is a component in React?",
        correctAnswer: "A reusable piece of code that returns React elements describing what should appear on the screen",
        keyTerms: ["reusable", "code", "element", "screen"]
      },
      {
        question: "What is the virtual DOM?",
        correctAnswer: "A lightweight copy of the real DOM that React uses to improve performance",
        keyTerms: ["lightweight", "copy", "performance", "dom"]
      },
      {
        question: "What is the purpose of state in React?",
        correctAnswer: "To store component data that can change over time",
        keyTerms: ["store", "data", "change", "component"]
      }
    ],
    2: [ // Advanced React Course
      {
        question: "What is a Hook in React?",
        correctAnswer: "Function that lets you use state and other React features without writing a class",
        keyTerms: ["function", "state", "features", "class"]
      },
      {
        question: "What is the useEffect hook used for?",
        correctAnswer: "Performing side effects in function components like data fetching or DOM manipulation",
        keyTerms: ["side effects", "function", "data fetching", "dom"]
      },
      {
        question: "What is React Context API?",
        correctAnswer: "A way to pass data through the component tree without having to pass props down manually",
        keyTerms: ["pass data", "component tree", "props", "manually"]
      },
      {
        question: "What are React custom hooks?",
        correctAnswer: "JavaScript functions that use React hooks and can be reused across components",
        keyTerms: ["javascript", "functions", "hooks", "reuse"]
      },
      {
        question: "What is code splitting in React?",
        correctAnswer: "A technique to split your code into smaller chunks which can be loaded on demand",
        keyTerms: ["split", "chunks", "load", "demand"]
      },
      {
        question: "What is the useReducer hook?",
        correctAnswer: "An alternative to useState for managing complex state logic in React applications",
        keyTerms: ["alternative", "usestate", "complex", "state logic"]
      },
      {
        question: "What is server-side rendering in React?",
        correctAnswer: "The process of rendering components on the server instead of the client browser",
        keyTerms: ["rendering", "server", "client", "browser"]
      }
    ]
  };

  // Default questions if course ID doesn't match
  const defaultQuestions = [
    {
      question: "What is React used for?",
      correctAnswer: "Building user interfaces with reusable components",
      keyTerms: ["building", "user interfaces", "reusable", "components"]
    },
    {
      question: "What language is React built with?",
      correctAnswer: "JavaScript",
      keyTerms: ["javascript", "js"]
    },
    {
      question: "Who developed React?",
      correctAnswer: "Facebook (Meta)",
      keyTerms: ["facebook", "meta"]
    },
    {
      question: "What is the current version of React?",
      correctAnswer: "React 18",
      keyTerms: ["18"]
    },
    {
      question: "What is the React DevTools?",
      correctAnswer: "Browser extension for debugging React applications",
      keyTerms: ["browser", "extension", "debugging", "applications"]
    }
  ];

  // Get current course questions or fallback to default
  const questions = questionsData[courseId] || defaultQuestions;
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  
  const handleChange = (e) => {
    setCurrentAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Store the current answer
    const updatedAnswers = [...userAnswers, currentAnswer];
    setUserAnswers(updatedAnswers);
    
    // Move to next question or complete assessment
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentAnswer('');
    } else {
      // Assessment completed - calculate results
      evaluateAnswers(updatedAnswers);
      setCompleted(true);
    }
  };

  const evaluateAnswers = (answers) => {
    let totalScore = 0;
    const feedbackArr = [];

    answers.forEach((answer, index) => {
      const question = questions[index];
      const answerLower = answer.toLowerCase();
      let score = 0;
      let feedback = '';
      
      // Check how many key terms are present in the answer
      const matchedTerms = question.keyTerms.filter(term => 
        answerLower.includes(term.toLowerCase())
      );
      
      const termPercentage = matchedTerms.length / question.keyTerms.length;
      
      // Score based on matched terms
      if (termPercentage >= 0.75) {
        score = 100;
        feedback = "Perfect! You got it exactly right.";
      } else if (termPercentage >= 0.5) {
        score = 75;
        feedback = "Good job! Your answer was mostly correct.";
      } else if (termPercentage >= 0.25) {
        score = 50;
        feedback = "Partially correct. You're on the right track!";
      } else {
        score = 0;
        feedback = "Incorrect. Review the material and try again.";
      }

      totalScore += score;
      feedbackArr.push({
        question: question.question,
        userAnswer: answer,
        correctAnswer: question.correctAnswer,
        score,
        feedback
      });
    });

    // Calculate average score
    const averageScore = Math.round(totalScore / answers.length);
    
    setResults({
      score: averageScore,
      feedback: feedbackArr
    });
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentAnswer('');
    setCompleted(false);
    setResults({ score: 0, feedback: [] });
  };

  const navigateToCourses = () => {
    navigate('/courses');
  };

  // Render assessment in progress
  if (!completed) {
    return (
      <div className="assessment-container">
        <h2 className="text-xl font-bold">Assessment for Course ID: {id}</h2>
        
        <div className="progress-indicator">
          <p>Question {currentQuestionIndex + 1} of {totalQuestions}</p>
          <div className="progress-bar" style={{ background: 'rgba(115, 113, 252, 0.1)', borderRadius: '10px', height: '8px', marginTop: '10px' }}>
            <div 
              style={{ 
                width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%`,
                background: 'linear-gradient(90deg, var(--primary-light), var(--primary-color))',
                height: '100%',
                borderRadius: '10px',
                transition: 'width 0.4s cubic-bezier(0.165, 0.84, 0.44, 1)'
              }}
            ></div>
          </div>
        </div>
        
        <div className="assessment-question">
          <p>Q{currentQuestionIndex + 1}: {currentQuestion.question}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="answer-form">
          <textarea 
            rows="4"
            placeholder="Type your answer here..." 
            value={currentAnswer}
            onChange={handleChange}
            required 
            style={{
              width: '100%',
              padding: '14px 18px',
              marginBottom: '25px',
              border: '2px solid #eef1f8',
              borderRadius: 'var(--border-radius)',
              fontSize: '1rem',
              transition: 'var(--transition)',
              backgroundColor: '#f8faff',
              fontFamily: "'Poppins', sans-serif",
              resize: 'vertical'
            }}
          />
          <button type="submit">
            {currentQuestionIndex < totalQuestions - 1 ? 'Next Question' : 'Submit Assessment'}
          </button>
        </form>
      </div>
    );
  }
  
  // Render assessment results
  return (
    <div className="assessment-container">
      <h2 className="text-xl font-bold">Assessment Results</h2>
      
      <div className={`score-display ${
        results.score >= 75 ? 'high-score' : 
        results.score >= 50 ? 'mid-score' : 
        'low-score'
      }`}>
        Your Overall Score: {results.score}%
      </div>
      
      <div className="answer-feedback" style={{ marginTop: '30px' }}>
        <p className={
          results.score >= 75 ? 'feedback-text success' : 
          results.score >= 50 ? 'feedback-text good' : 
          'feedback-text incorrect'
        }>
          {results.score >= 75 ? 'Excellent work!' : 
           results.score >= 50 ? 'Good effort, but room for improvement.' : 
           'You should review the course material more carefully.'}
        </p>
      </div>
      
      <div className="detailed-results" style={{ marginTop: '30px' }}>
        <h3 style={{ fontSize: '1.3rem', fontWeight: '600', marginBottom: '20px', color: 'var(--primary-dark)' }}>
          Question-by-Question Breakdown:
        </h3>
        
        {results.feedback.map((item, index) => (
          <div key={index} className="result-container" style={{ marginBottom: '20px' }}>
            <div className="assessment-question" style={{ marginBottom: '15px' }}>
              <p>Q{index + 1}: {item.question}</p>
            </div>
            <div className="answer-feedback">
              <p><strong>Your answer:</strong> {item.userAnswer}</p>
              <p><strong>Correct answer:</strong> {item.correctAnswer}</p>
              <p className={
                item.score >= 75 ? 'feedback-text success' : 
                item.score >= 50 ? 'feedback-text partial' : 
                'feedback-text incorrect'
              }>
                Score: {item.score}% - {item.feedback}
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '15px', marginTop: '30px', justifyContent: 'center' }}>
        <button 
          onClick={resetAssessment}
          className="retry-button"
        >
          Retake Assessment
        </button>
        <button 
          onClick={navigateToCourses}
          style={{
            background: 'linear-gradient(135deg, var(--text-light), var(--dark-bg))'
          }}
        >
          Back to Courses
        </button>
      </div>
    </div>
  );
}

export default Assessment;