import React, { useState } from 'react';
import axios from 'axios';

const AnswerForm = ({ questionId }) => {
  const [content, setContent] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`/api/answers/${questionId}`, { content });
      console.log(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea placeholder="Your answer" value={content} onChange={(e) => setContent(e.target.value)} />
      <button type="submit">Post Answer</button>
    </form>
  );
};

export default AnswerForm;
