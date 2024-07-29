// components/Chatbot.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setInput('');
      // Simulate a response from the chatbot (you can replace this with actual chatbot logic)
      setTimeout(() => {
        setMessages([...messages, { text: input, user: true }, { text: 'This is a response from the chatbot', user: false }]);
      }, 1000);
    }
  };

  return (
    <div className="fixed bottom-16 right-5 bg-white border shadow-lg rounded-lg p-4 w-80 h-96 flex flex-col">
        <h1>Want to visit STEM 3D Simulations?</h1>
        <p className='text-sm text-gray-400'>Type or select a topic and we will redirect to the related simulations</p>
        <div className='flex gap-2'><Link to="/chatbot"><button>AI chatBot</button></Link> <Link to="/dashboard"><button>3D Visualization</button></Link></div>
      <div className="flex-1 overflow-y-auto">
        {messages.map((message, index) => (
          <div key={index} className={`p-2 ${message.user ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded ${message.user ? 'bg-blue-100' : 'bg-gray-100'}`}>
              {message.text}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-2 flex">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <button onClick={handleSend} className="bg-cyan-500 text-white p-2 rounded ml-2">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
