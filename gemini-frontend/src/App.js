import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/api/content', {
        question: prompt,
      });
      
      setResponse(res.data.result);
      setError('');
    } catch (err) {
      setError('Error: ' + err.message);
      setResponse('');
    }
  };

  return (
    <div className="App">
      <h1>Gemini AI Prompt</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your prompt"
          required
        />
        <button type="submit">Generate</button>
      </form>
      {response && (
        <div className="response">
          <h2>Response:</h2>
          <p>{response}</p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
    </div>
  );
}

export default App;
