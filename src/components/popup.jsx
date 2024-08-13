// components/Chatbot.jsx
import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import topics from '../assets/file.json';
import tags from "../assets/tags.json";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filteredResults, setFilteredResults] = useState([]);
  const searchEl = useRef()
  const keys = Object.keys(topics);


  const searchItems = (searchValue) => {

    setSearchInput(searchValue)
    if (searchInput !== '') {
      const filteredData = Object.keys(tags).filter((item) => {
        return Object.values(item).join('').toLowerCase().includes(searchInput.toLowerCase())
      })
      setFilteredResults(filteredData)
      // console.log(filteredData)
    } else {
      setFilteredResults(Object.keys(tags))
    }
  }
  const setId = (v) => {
    searchEl.current.focus()
    searchEl.current.value = ''
    setSearchInput('')
  }
  function getName(file) {
    const name = file.split('_');
    let A = name.shift();

    return name.join(' ');
  }

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
      <p className='text-sm text-gray-400'>Type a topic and we will redirect to the related simulations or select the below options.</p>
      <div className='flex gap-2'>
        <Link to="/chatbot"><button className="bg-cyan-500 text-white p-2 rounded ml-2">AI chatBot</button></Link>
        <Link to="/simulations"><button className="bg-cyan-500 text-white p-2 rounded ml-2">3D Visualization</button></Link>
      </div>
      <div className="flex-1 overflow-y-auto">
        {searchInput.length > 3 && (
          filteredResults.map((title, i) => (
            <div className='p-2' key={i}>
              <a href={`/dashboard/webpage/:${title}`} rel="noopener noreferrer" target=" _blank" className="bg-cyan-600 hover:bg-cyan-700 rounded-full p-2">

                <span className="inline-block text-white/90 text-xs">
                  {getName(title)}
                </span>
              </a>
            </div>
          )
          ))
        }
      </div>
      {/* <div className="mb-3 pt-0 border ">
        <form className="w-7/8">
          <input
            type="text"
            ref={searchEl}
            onChange={(e) => searchItems(e.target.value)}
            placeholder="Search..."
            className="border-0 px-3 py-2 h-12 border border-solid  border-blueGray-500 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-base leading-snug shadow-none outline-none focus:outline-none w-full font-normal"
          />
        </form>
      </div> */}
      <div className="mt-2 flex">
        <input
          type="text"
          className="flex-1 border rounded p-2"
          ref={searchEl}
          onChange={(e) => searchItems(e.target.value)}
          placeholder="Search..."
        />
        <button onClick={searchItems} className="bg-cyan-500 text-white p-2 rounded ml-2">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
