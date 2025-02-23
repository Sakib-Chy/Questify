import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Questify</h1>
      {questions.map(question => (
        <div key={question._id}>
          <h2>{question.title}</h2>
          <p>{question.description}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
