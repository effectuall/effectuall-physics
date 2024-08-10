import React, { useState } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { FaMicrophone, FaMicrophoneSlash, FaPlay, FaPause } from 'react-icons/fa';
import list from '../assets/tags.json'
import ReactMarkdown from 'react-markdown'
// import './App.css';

const ChatBot = () => {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState(null);
    const [grade, setGrade] = useState("8");
    const [input, setInput] = useState("");
    const [subject, setSubject] = useState('Physics');
    const [chatHistory, setChatHistory] = useState([]);
    const [recording, setRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlayingIndex, setCurrentPlayingIndex] = useState(null);
    //AI prompt and settings
    const converstion = `You are Effy, a friendly ${subject} tutor for ${grade} grade. Your student asks you about STEM related topics, you should answer to the point, as required for the students and based on the ${input}. In the follow up questions you may ask if they want to dwell deeper into the subjects and also help them in suggesting related experiments
    
    - subject: here list the subject for the STEM topic
    - topic: here list the topic from STEM field which matches to the question in lowercase.
    - subtopics: here list all possible keywords for websearch.
    - keywords: here list combined list of topic & subtopics in lowercase.
    - explain: here list appropriate give answer/explanation for the question asked.
    - follow up: suggest possible home experiment which student can perform safely or want to dwell deeper into the area of related topics or else ask if they have any other questions.
    If ${grade} & ${subject} are not selected prompt to select them and give answer to the point and make it interesting and understandable by a 5th grade student.
    You should always respond with a JSON object with the following format:
    {
      "question": "${input}",
      "answer": [{
        "grade": "${grade}",
        "subject": "${subject}",
        "topic": [],
        "subtopics":[],
        "keywords": [],
        "explain": "",
        "followUp": ""
      }]
    }
    You should end with asking if they have any follow up question on the topic.`;
    const AI_key = import.meta.env.VITE_GEMINI_API_KEY;
    const genAI = new GoogleGenerativeAI(AI_key);
    const generationConfig = {
        temperature: 0.9,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };
    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];

    //fetch data through Gemini API
    const fetchData = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = converstion;
            const chat = model.startChat({
                generationConfig,
                safetySettings,
                history: [],
            });
            const result = await chat.sendMessage(prompt);
            const response = await result.response;
            const text = await response.text();

            let responseObject;
            try {
                responseObject = JSON.parse(text);
            } catch (jsonError) {
                throw new Error(`Failed to parse JSON response: ${jsonError.message}`);
            }

            const explainText = responseObject.answer[0].explain;
            const followUpText = responseObject.answer[0].followUp;

            setApiData({ topic: responseObject.answer[0].topic, subtopics: responseObject.answer[0].subtopics, keywords: responseObject.answer[0].keywords });

            const userMessage = { type: 'user', text: input };
            const botMessage = { type: 'bot', text: explainText };
            setChatHistory((prev) => [userMessage, botMessage, ...prev]);
            setLoading(false);
            setInput("");

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
            setLoading(false);
        }
    };

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
        const userMessage = { type: 'user', text: input };
        // setChatHistory((prev) =>
        //     [userMessage, ...prev]); // Newest messages at the top
        setLoading(true);
        fetchData();
    };

    //comparing the resulting keywords with the simulation tag file
    const getSortedResults = (A, B) => {
        let result = {};

        A.forEach(item => {
            for (let key in B) {
                if (B[key].includes(item)) {
                    // console.log(item)
                    if (!result[key]) {
                        result[key] = { count: 0, items: [] };
                    }
                    result[key].count++;
                    result[key].items.push(item);
                }
            }
        });
        // console.log(A, B)
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
                <h1 className="font-bold">List of related Simulations</h1>
                <div className="flex flex-wrap gap-1 justify-center">
                    {sortedResults.map(([key, value]) => (
                        <div key={key} >

                            <a href={`/visualpage/:${key}`} rel="noopener noreferrer" target=" _blank" className="bg-cyan-600 hover:bg-cyan-700 px-3  rounded-full text-white/90 text-xs">{getName(key)}</a>

                            {/* <button className="bg-cyan-600 hover:bg-cyan-700 px-3 py-1 rounded-full text-white/90 text-xs" onClick={() => (window.open(`https://effectuall.github.io/Simulations/${sortedResults[0][0]}`, '_blank'), console.log('pop'))}>
                                {getName(key)}
                            </button> */}

                        </div>
                    ))}
                </div>

            </div>
        );
    };
    return (
        <div className="container mx-auto md:w-3/4 w-full p-6 bg-gray-100 rounded-lg shadow-lg flex flex-col h-[650px]">
            <h1 className="text-2xl font-bold mb-4 text-center">THE STEM MASTER</h1>
            <div className="chat-history p-4 bg-white rounded shadow flex-1 overflow-y-auto">
                {chatHistory.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} mb-2`}>
                        <div className={`flex p-2 rounded-lg shadow ${msg.type === 'user' ? 'bg-cyan-700 text-white' : 'bg-gray-300 text-black'}`}>
                            <ReactMarkdown>{msg.text}</ReactMarkdown>
                            {msg.type === 'bot' && (
                                <button onClick={() => toggleSpeech(index)} className="bg-gray-300 ml-2 ">
                                    {isPlaying && currentPlayingIndex === index ? <FaPause /> : <FaPlay />}
                                </button>
                            )}
                        </div>
                    </div>
                ))}

            </div>
            <div className="text-center items-center">
                {apiData === null ? (
                    <p className="text-sm">List of related Simulations</p>
                ) : (
                    SortedResultsList(apiData.keywords)
                )}
            </div>
            <div className="input-area p-4 bg-gray-100 rounded-t-lg shadow-lg flex-none">
                <form onSubmit={handleSubmit} className="flex flex-col items-center">
                    <div className="flex flex-col md:flex-row w-full md:space-x-4 mb-4">
                        <div className="flex-1">
                            <label htmlFor="grade" className="form-label block mb-1">
                                Grade
                            </label>
                            <select
                                className="form-select w-full p-2 border rounded"
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
                            <label htmlFor="subject" className="form-label block mb-1">
                                Subject
                            </label>
                            <select
                                className="form-select w-full p-2 border rounded"
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
                    <div className="flex flex-col w-full mb-4">
                        <label htmlFor="question" className="form-label block mb-1">
                            Question
                        </label>
                        <div className="relative w-full">
                            <input
                                type="text"
                                className="form-input w-full p-2 border rounded"
                                id="question"
                                placeholder="Type your question"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button
                                type="button"
                                className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                onClick={startDictation}
                            >
                                {recording ? (
                                    <FaMicrophoneSlash className="text-red-500" />
                                ) : (
                                    <FaMicrophone className="text-green-500" />
                                )}
                            </button>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="px-6 py-2 bg-cyan-700 text-white rounded hover:bg-cyan-600"
                        disabled={loading}
                    >
                        {loading ? "Loading..." : "Ask"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ChatBot;
