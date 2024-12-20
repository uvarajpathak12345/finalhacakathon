import React, { useState } from 'react';

const GenerateContent = (props) => {
  const [responseText, setResponseText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = "AIzaSyBtWZH2HJDkhlA2hNltShDcjs2VWczzz9g";

  const handleGenerateContent = async () => {
    console.log(props.name,props.age)
    setLoading(true);
    setError('');
    setResponseText('');

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const requestBody = {
      contents: [
        {
          parts: [
            {
              text: `i am  ${props.name}, i am ${props.age} years old and i have having ${props.diseases}. which diseases am i  going to face with the percentage probability also tell me the precatations and food that i should devaour to overcome thhis problem. dont tell i dont know just tell me what you now`
            }
          ]
        }
      ]
    };

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (!res.ok) {
        throw new Error(`Error: ${res.status}`);
      }

      const data = await res.json();

      // Extract the "text" field
      const extractedText =
        data.candidates?.[0]?.content?.parts?.[0]?.text || "No content available.";
      setResponseText(extractedText);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Generate Content with Google Generative Language API</h1>
      <button
        onClick={handleGenerateContent}
        disabled={loading}
        style={{
          padding: '10px 20px',
          backgroundColor: '#007BFF',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer'
        }}
      >
        {loading ? 'Loading...' : 'Generate Content'}
      </button>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {responseText && (
        <div style={{
          backgroundColor: '#f4f4f4',
          padding: '10px',
          borderRadius: '5px',
          marginTop: '20px',
          overflowX: 'auto'
        }}>
          <p>{responseText}</p>
        </div>
      )}
    </div>
  );
};

export default GenerateContent;
