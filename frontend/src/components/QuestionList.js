import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const QuestionList = () => {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    axios.get('/api/questions')
      .then(res => setQuestions(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div>
      <h1>Questions</h1>
      {questions.map(question => (
        <div key={question._id}>
          <Link to={`/question/${question._id}`}>
            <h2>{question.title}</h2>
          </Link>
          <p>{question.description}</p>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
