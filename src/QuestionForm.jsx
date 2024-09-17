import React, { useState } from 'react';
 
const QuestionForm = ({ questions }) => {
  const [currentQuestion, setCurrentQuestion] = useState(getRandomQuestionIndex());
  const [inputValue, setInputValue] = useState('');
  const [answers, setAnswers] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // Função para pegar um índice aleatório de uma pergunta
  function getRandomQuestionIndex() {
    return Math.floor(Math.random() * questions.length);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Verifica se o usuário inseriu uma resposta
    if (inputValue === '') {
      alert('Por favor, insira uma resposta.');
      return;
    }

    // Adiciona a resposta à lista de respostas
    setAnswers([...answers, inputValue]);
    setInputValue('');

    // Adiciona a pergunta atual à lista de perguntas já respondidas
    setAnsweredQuestions([...answeredQuestions, currentQuestion]);

    // Verifica se já foram respondidas 5 perguntas
    if (answeredQuestions.length + 1 >= 6) {
      alert('Você respondeu todas as perguntas!');
    } else {
      // Escolhe uma nova pergunta aleatória que ainda não foi respondida
      let newQuestion;
      do {
        newQuestion = getRandomQuestionIndex();
      } while (answeredQuestions.includes(newQuestion));
      
      setCurrentQuestion(newQuestion);
    }
  };

  return (
    <div className="app">
      <div className="question-container">
        <h2 className="question">{questions[currentQuestion]}</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="answer"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Insira sua resposta"
          />
          <button type="submit" className="submit-button">Responder</button>
        </form>
      </div>
    </div>
  );
};

export default QuestionForm;
