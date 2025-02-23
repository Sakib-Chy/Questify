import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AnswerForm from './AnswerForm';

const AnswerList = ({ match }) => {
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    axios.get(`/api/answers/${match.params.id}`)
      .then(res => setAnswers(res.data))
      .catch(err => console.log(err));
  }, [match.params.id]);

  return (
    <div>
      <h1>Answers</h1>
      {answers.map(answer => (
        <div key={answer._id}>
          <p>{answer.content}</p>
        </div>
      ))}
      <AnswerForm questionId={match.params.id} />
    </div>
  );
};

export default AnswerList;
