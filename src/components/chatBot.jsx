//App.jsx
import { useState } from "react";
import { generateResponse } from "../api/effy";
import ReactMarkdown from 'react-markdown'
import { FaMicrophone, FaMicrophoneSlash, FaPlay, FaPause, FaUpload, FaSearch, FaSpinner } from 'react-icons/fa';
import list from '../assets/tags.json';
import { IoStar, IoStarOutline } from "react-icons/io5";
import { FaArrowsRotate, FaQ, FaRotateLeft } from "react-icons/fa6";

function ChatBot() {
    const statement = "Ask a STEM question, and AI will provide an answer and direct you to relevant 3D interactive modules."
    const [loading, setLoading] = useState(false);
    const [grade, setGrade] = useState("8");
    const [input, setInput] = useState('');
    const [subject, setSubject] = useState("Physics");
    const [chatHistory, setChatHistory] = useState([]);
    const [recording, setRecording] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [followUp, setFollowUp] = useState([])
    const [showUploadMessage, setShowUploadMessage] = useState(false);
    const [rating, setRating] = useState(0);

    const fetchData = async () => {
        const response = await generateResponse(input, subject, grade);
        console.log(response);
        const text = await response;
        let responseObject;
        try {
            responseObject = JSON.parse(text);
        } catch (jsonError) {
            console.log(response);
            setLoading(false);
            throw new Error(`Failed to parse JSON response: ${jsonError.message}`);

        }


        const explainText = responseObject.answer[0].explain;
        const followUpText = responseObject.answer[0].followUp;

        setApiData({ topic: responseObject.answer[0].topic, subtopics: responseObject.answer[0].subtopics, keywords: responseObject.answer[0].keywords });

        const userMessage = { type: 'user', text: input };
        const botMessage = { type: 'bot', text: explainText };
        setChatHistory((prev) => [userMessage, botMessage, ...prev]);
        const followupMessage = { type: 'bot', text: followUpText };
        // setFollowUp((prev) => [followupMessage, ...prev])
        setLoading(false);
        setInput("");
    }

    const toggleSpeech = (index) => {
        if (currentPlayingIndex === index) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                setIsPlaying(true);
            } else {
                window.speechSynthesis.pause();
                setIsPlaying(false);
            }
        } else {
            window.speechSynthesis.cancel();
            setCurrentPlayingIndex(index);
            const text = chatHistory[index].text;
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1;

            utterance.onstart = () => setIsPlaying(true);
            utterance.onend = () => {
                setIsPlaying(false);
                setCurrentPlayingIndex(null);
            };

            window.speechSynthesis.speak(utterance);
            setIsPlaying(true);
        }
    };

    const startDictation = () => {
        if (window.hasOwnProperty('webkitSpeechRecognition')) {
            const recognition = new window.webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';
            recognition.start();

            recognition.onstart = function () {
                setRecording(true);
            };

            recognition.onresult = function (e) {
                setRecording(false);
                const transcript = e.results[0][0].transcript;
                setInput(transcript);
                recognition.stop();
            };

            recognition.onerror = function (e) {
                setRecording(false);
                recognition.stop();
            };
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!input.trim()) return;
        // setFollowUp([])
        // const userMessage = { type: 'user', text: input };
        // setChatHistory((prev) => [userMessage, ...prev]); // Newest messages at the top
        setLoading(true);
        fetchData();
    };

    //comparing the resulting keywords with the simulation tag file
    const getSortedResults = (A, B) => {
        let result = {};

        A.forEach(item => {
            for (let key in B) {
                if (B[key].includes(item)) {
                    console.log(item)
                    if (!result[key]) {
                        result[key] = { count: 0, items: [] };
                    }
                    result[key].count++;
                    result[key].items.push(item);
                }
            }
        });
        console.log(A, B)
        return Object.entries(result).sort((a, b) => b[1].count - a[1].count);
    };

    const SortedResultsList = (A) => {
        const sortedResults = getSortedResults(A, list);
        function getName(file) {

            const name = file.split('_');
            name.shift();
            return name.join('  ');

        }
        return (
            <div>
                <p className="font-bold text-xs md:text-sm">{statement}</p>
                <div className="flex flex-wrap gap-1 justify-center ">
                    {sortedResults.map(([key, value]) => (
                        <div key={key} >

                            {key === "LoadModel" ? (<a href={`/visualpage/:${key}`} rel="noopener noreferrer" target=" _blank" className="bg-cyan-600 hover:bg-cyan-700 px-3 rounded-full text-white/90 text-xs">{key}</a>) : <a href={`/visualpage/:${key}`} rel="noopener noreferrer" target=" _blank" className="bg-cyan-600 hover:bg-cyan-700 px-3 rounded-full text-white/90 text-xs">{getName(key)}</a>}


                            {/* <button className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-full text-white/90 text-xs" onClick={() => (window.open(`https://effectuall.github.io/Simulations/${sortedResults[0][0]}`, '_blank'), console.log('pop'))}>
                                {getName(key)}
                            </button> */}

                        </div>
                    ))}
                </div>

            </div>
        );
    }
    const handleClearMessages = () => {
        setChatHistory([])
        setApiData(null)
    };

    return (
        <div className="container mx-auto  w-full p-0 md:p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col h-screen max-h-full relative ">
            <div className="flex flex-row gap-4 mb-1 md:mb-3 text-center items-center justify-center">
                <h1 className="text-xl md:text-3xl font-bold  text-gray-800">THE STEM MASTER</h1>
                <button className="p-4">  <FaRotateLeft onClick={() => window.location.reload()} /></button>

            </div>

            <div className="flex-1 overflow-y-auto rounded-lg p-0 md:p-4 mb-48 md:mb-64">
                <div className="chat-history">
                    {chatHistory.map((msg, index) => (
                        <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2 md:mb-3 px-2 md:px-4`}>
                            <div className={`flex-row p-1 md:p-3 text-left rounded-lg shadow-md ${msg.type === 'user' ? 'bg-cyan-700 text-white' : 'bg-gray-300 text-black'} text-xs md:text-sm`}>
                                <ReactMarkdown>{msg.text}</ReactMarkdown>
                                {/* {msg.type === 'bot' && <ReactMarkdown>{followUp}</ReactMarkdown>} */}
                            </div>
                            {msg.type === 'user' && (
                                <div>  <button onClick={() => toggleSpeech(index)} className="ml-2 p-1 md:p-3 text-gray-600">
                                    {isPlaying && currentPlayingIndex === index ? <FaPause /> : <FaPlay />}
                                </button>
                                    {/* <button onClick={() => (console.log(followUp))} className="ml-2 text-gray-600">
              <FaQ /> 
            </button> */}
                                </div>

                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center items-center">
                    {apiData === null ? (
                        <p className="text-sm">{statement}</p>
                    ) : (
                        SortedResultsList(apiData.keywords)
                    )}
                </div>
            </div>

            <div className="input-area fixed bottom-0 left-0 w-full bg-gray-100 border-t border-gray-300 p-4 ">
                <form onSubmit={handleSubmit} className="flex flex-col w-full p-1 md:p-4 max-w-4xl mx-auto shadow-lg mb-1 md:mb-6">
                    <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex-1">
                            <label htmlFor="grade" className="form-label block mb-1 text-gray-700">
                                Grade
                            </label>
                            <select
                                className="form-select w-full p-2 border rounded bg-white"
                                id="grade"
                                value={grade}
                                onChange={(e) => setGrade(e.target.value)}
                            >
                                <option value="">Select Grade</option>
                                <option value="8">8, 9 & 10</option>
                                <option value="10">11 & 12</option>
                            </select>
                        </div>
                        <div className="flex-1">
                            <label htmlFor="subject" className="form-label block mb-1 text-gray-700">
                                Subject
                            </label>
                            <select
                                className="form-select w-full p-2 border rounded bg-white"
                                id="subject"
                                value={subject}
                                onChange={(e) => setSubject(e.target.value)}
                            >
                                <option value="">Select Subject</option>
                                <option value="Mathematics">Mathematics</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex-1 w-full md:w-3/4 relative flex items-center space-x-2">
                            <input
                                type="text"
                                className="form-input w-full p-2 border rounded bg-white"
                                id="question"
                                placeholder="Type your question"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <div className="flex items-center space-x-1 md:space-x-2">
                                <button
                                    type="button"
                                    onClick={handleClearMessages}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <FaArrowsRotate />
                                </button>
                                <button
                                    type="button"
                                    onClick={startDictation}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    {recording ? <FaMicrophoneSlash /> : <FaMicrophone />}
                                </button>
                                <button
                                    type="button"
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    <FaUpload />
                                </button>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="text-gray-600 hover:text-gray-900"
                                >
                                    {loading ? <FaSpinner className="spinner" /> : <FaSearch />}
                                </button>
                            </div>
                        </div>
                        {showUploadMessage && <p className="text-sm text-gray-500 ml-4">Feature will be added soon!</p>}
                    </div>
                </form>
            </div>
        </div>


    );
};

export default ChatBot;