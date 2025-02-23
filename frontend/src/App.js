import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import QuestionList from './components/QuestionList';
import QuestionForm from './components/QuestionForm';
import AnswerList from './components/AnswerList';

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<QuestionList />} />
          <Route path="/ask" element={<QuestionForm />} />
          <Route path="/question/:id" element={<AnswerList />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
