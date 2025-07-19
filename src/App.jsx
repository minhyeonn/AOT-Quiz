import { useState } from 'react'
import './App.css'

const questions = [

  {
    id: 1,
    question: "Who is the Female Titan?",
    answer: "Annie",
    options: ["Reiner", "Mikasa", "Annie", "Armin"]
  },
  {
    id: 2,
    question: "What is the name of Eren's titan form?",
    answer: "Attack Titan",
    options: ["Beast Titan", "Attack Titan", "Colossal Titan", "Armored Titan"]
  },
  {
    id: 3,
    question: "Who is the Commander of the Survey Corps?",
    answer: "Erwin Smith",
    options: ["Levi Ackerman", "Hange Zoe", "Erwin Smith", "Keith Shadis"]
  },
  {
    id: 4,
    question: "What are the three walls called?",
    answer: "Wall Maria, Wall Rose, Wall Sina",
    options: ["Wall Maria, Wall Rose, Wall Sina", "Wall Alpha, Wall Beta, Wall Gamma", "Wall North, Wall South, Wall East", "Wall Titan, Wall Human, Wall Eldian"]
  },
  {
    id: 5,
    question: "Who is known as 'Humanity's Strongest Soldier'?",
    answer: "Levi Ackerman",
    options: ["Eren Yeager", "Mikasa Ackerman", "Levi Ackerman", "Erwin Smith"]
  }

]

function App() {
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (choice, answer, id) => {
    const isCorrect = choice === answer;

    setAnsweredQuestions(prev => {
    
      const existingAnswerIndex = prev.findIndex(q => q.questionId === id);

      if (existingAnswerIndex !== -1) {

        const updatedAnswers = [...prev];
        updatedAnswers[existingAnswerIndex] = { questionId: id, selectedAnswer: choice, isCorrect: isCorrect };
        return updatedAnswers;
      } else {

        return [...prev, { questionId: id, selectedAnswer: choice, isCorrect: isCorrect }];
      }
    });
  };

  const getAnswerStatus = (questionId) => {
    return answeredQuestions.find(q => q.questionId === questionId);
  };

  const handleScore = () => {
    setShowScore(true);
  }

  const getNumCorrect = () => {
    return answeredQuestions.filter(q => q.isCorrect).length;
  }

  const handleRestart = () => {
    setAnsweredQuestions([]);
    setShowScore(false);
  }

  return (
    <div style={{
      backgroundColor: '#2c1810',
      minHeight: '100vh',
      color: '#f4e4c1',
      fontFamily: 'Arial, sans-serif',
      padding: '10px',
      margin: '0'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        textAlign: 'center',
        width: '95%'
      }}>
        <h1 style={{
          color: '#d4af37',
          fontSize: '2.5em',
          textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
          marginBottom: '10px'
        }}>
          ⚔️ ATTACK ON TITAN QUIZ ⚔️
        </h1>
        <p style={{
          color: '#a0956b',
          marginBottom: '30px',
          fontSize: '1.1em'
        }}>
          "If you win, you live. If you lose, you die. If you don't fight, you can't win!"
        </p>
        
        {questions.map((item) => (
          <div key={item.id} style={{
            backgroundColor: '#3d2f1f',
            border: '2px solid #8b6914',
            borderRadius: '10px',
            padding: '25px',
            marginBottom: '25px',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
          }}>
            <h2 style={{
              color: '#f4e4c1',
              marginBottom: '20px',
              fontSize: '1.4em',
              borderBottom: '2px solid #8b6914',
              paddingBottom: '10px'
            }}>
              Question {item.id}: {item.question}
              {showScore && (
                <span style={{fontSize: '1.2em', marginLeft: '10px'}}>
                  {getAnswerStatus(item.id).isCorrect ? ' ✅' : ' ❌'}
                </span>
              )}
            </h2>

            <div style={{textAlign: 'left'}}>
              {item.options.map((choice, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(choice, item.answer, item.id)}
                  style={{
                    backgroundColor: getAnswerStatus(item.id) && getAnswerStatus(item.id).selectedAnswer === choice ? '#8b6914' : '#5a4a35',
                    color: getAnswerStatus(item.id) && getAnswerStatus(item.id).selectedAnswer === choice ? '#f4e4c1' : '#d4af37',
                    border: '2px solid #8b6914',
                    borderRadius: '8px',
                    display: 'block',
                    width: '100%',
                    margin: '8px 0',
                    padding: '15px',
                    fontSize: '1.1em',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                  }}
                  onMouseOver={(e) => {
                    if (!(getAnswerStatus(item.id) && getAnswerStatus(item.id).selectedAnswer === choice)) {
                      e.target.style.backgroundColor = '#6b5a45';
                    }
                  }}
                  onMouseOut={(e) => {
                    if (!(getAnswerStatus(item.id) && getAnswerStatus(item.id).selectedAnswer === choice)) {
                      e.target.style.backgroundColor = '#5a4a35';
                    }
                  }}
                >
                  {String.fromCharCode(65 + index)}. {choice}
                  {getAnswerStatus(item.id) && getAnswerStatus(item.id).selectedAnswer === choice && ' ✓'}
                </button>
              ))}
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => handleScore()}
          style={{
            backgroundColor: '#8b0000',
            color: '#f4e4c1',
            border: '3px solid #a0956b',
            borderRadius: '10px',
            padding: '15px 30px',
            fontSize: '1.3em',
            fontWeight: 'bold',
            cursor: 'pointer',
            marginBottom: '20px',
            textTransform: 'uppercase',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#a00000'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#8b0000'}
        >
          ⚔️ Get Your Results ⚔️
        </button>
        
        {showScore && (
          <div style={{
            backgroundColor: '#1a3d1a',
            border: '3px solid #2e7d32',
            borderRadius: '15px',
            padding: '30px',
            textAlign: 'center',
            boxShadow: '0 6px 12px rgba(0,0,0,0.4)'
          }}>
            <h2 style={{
              color: '#4caf50',
              fontSize: '2em',
              marginBottom: '15px'
            }}>
              🏆 MISSION COMPLETE 🏆
            </h2>
            <h3 style={{
              color: '#f4e4c1',
              fontSize: '1.5em',
              marginBottom: '10px'
            }}>
              Score: {getNumCorrect()} out of {questions.length}
            </h3>
            <h3 style={{
              color: '#d4af37',
              fontSize: '1.3em',
              marginBottom: '20px'
            }}>
              Percentage: {Math.round((getNumCorrect() / questions.length) * 100)}%
            </h3>
            <button 
              onClick={() => handleRestart()}
              style={{
                backgroundColor: '#8b6914',
                color: '#f4e4c1',
                border: '2px solid #d4af37',
                borderRadius: '8px',
                padding: '12px 25px',
                fontSize: '1.2em',
                cursor: 'pointer',
                textTransform: 'uppercase',
                fontWeight: 'bold'
              }}
            >
              🔄 Take Quiz Again 🔄
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
