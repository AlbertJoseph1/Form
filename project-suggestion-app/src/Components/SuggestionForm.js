// src/SuggestionForm.js
import React, { useState } from 'react';

const SuggestionForm = () => {
  const [email, setEmail] = useState('');
  const [suggestion, setSuggestion] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Mock API request
    const response = await fetch('http://localhost:5000/suggestions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, suggestion }),
    });
  
    if (response.ok) {
      alert('Suggestion submitted successfully!');
      setEmail('');
      setSuggestion('');
    } else {
      alert('Failed to submit suggestion.');
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-8 rounded shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Project Suggestion</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="suggestion" className="block text-sm font-medium text-gray-700">
            Project Suggestion
          </label>
          <textarea
            id="suggestion"
            value={suggestion}
            onChange={(e) => setSuggestion(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default SuggestionForm;
