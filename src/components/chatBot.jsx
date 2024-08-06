import React, { useState } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";
import { FaMicrophone, FaMicrophoneSlash, FaPlay, FaPause } from 'react-icons/fa';
// import './App.css';

const ChatBot = () => {
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState({});
    const [grade, setGrade] = useState("");
    const [input, setInput] = useState('');
    const [subject, setSubject] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    const [recording, setRecording] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [speechQueue, setSpeechQueue] = useState([]);
    const [showKnowMore, setShowKnowMore] = useState(false);
    const [followUpText, setFollowUpText] = useState("");

    const genAI = new GoogleGenerativeAI("AIzaSyC_uaxr1z15BjeJ2x-vSdKnlBin5TV8I5I");
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

    const fetchData = async () => {
        try {
            const model = genAI.getGenerativeModel({ model: "gemini-pro" });
            const prompt = `You are Effy, a friendly ${subject} tutor for ${grade} grade. Your student asks you about STEM related topics, you should answer to the point, as required for the students and based on the ${input}. In the follow up questions you may ask if they want to dwell deeper into the subjects and also help them in suggesting related experiments
    
      - subject: here list the subject for the STEM topic
      - topic: here list the topic from STEM field which matches to the question.
      - subtopic: here list all keywords related to this topic and question
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
          "subtopic": [],
          "explain": "",
          "followUp": ""
        }]
      }
      You should end with asking if they have any follow up question on the topic.`;

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

            setApiData({ explain: explainText, followUp: followUpText });

            const botMessage = { type: 'bot', text: explainText };
            setChatHistory((prev) => [...prev, botMessage]);
            setLoading(false);
            setInput("");
            queueSpeech(explainText, followUpText); // Pass both explain and follow-up to the queue

        } catch (error) {
            console.error('Error fetching data:', error.message || error);
            setLoading(false);
        }
    };

    const queueSpeech = (explainText, followUpText) => {
        if (!explainText || typeof explainText !== 'string') {
            console.error('Invalid message for speech synthesis');
            return;
        }

        window.speechSynthesis.cancel();

        const messages = [explainText];
        setSpeechQueue(messages);
        setFollowUpText(followUpText); // Set follow-up text to be used later
        speakNext(); // Start with the explanation
    };

    const speakNext = () => {
        if (speechQueue.length === 0) {
            setIsPlaying(false);
            return;
        }

        const text = speechQueue.shift();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'en-US';
        utterance.rate = 1;
        utterance.pitch = 1;

        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => {
            setIsPlaying(false);
            if (speechQueue.length === 0) {
                // When speech queue is empty, show the "Know More" button
                setShowKnowMore(true);
            } else {
                speakNext();
            }
        };

        window.speechSynthesis.speak(utterance);
    };

    const handleKnowMore = () => {
        if (followUpText) {
            const followUpMessage = { type: 'bot', text: followUpText };
            setChatHistory((prev) => [...prev, followUpMessage]);
            setShowKnowMore(false); // Hide the button after clicking
            queueSpeech(followUpText); // Play the follow-up text
        }
    };

    const toggleSpeech = () => {
        if (window.speechSynthesis.speaking) {
            if (window.speechSynthesis.paused) {
                window.speechSynthesis.resume();
                setIsPlaying(true);
            } else {
                window.speechSynthesis.pause();
                setIsPlaying(false);
            }
        } else if (speechQueue.length > 0) {
            speakNext();
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
        setChatHistory((prev) => [...prev, userMessage]);
        setLoading(true);
        fetchData();
    };

    return (
        <div className="container">
            <div className="container p-6 bg-gray-100 rounded-lg shadow-lg mx-auto md:w-3/4 w-full">
                <h1 className="text-2xl font-bold mb-4 text-center">THE STEM MASTER</h1>
                <div className="mb-5">
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
                            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            disabled={loading}
                        >
                            {loading ? "Loading..." : "Ask"}
                        </button>
                    </form>
                </div>
                <div className="chat-history p-4 bg-white rounded shadow">
                    {chatHistory.map((msg, index) => (
                        <div
                            key={index}
                            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'
                                } mb-2`}
                        >
                            <div
                                className={`p-2 rounded-lg shadow ${msg.type === 'user'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-gray-300 text-black'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        </div>
                    ))}
                </div>
                {showKnowMore && (
                    <button
                        type="button"
                        className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4"
                        onClick={handleKnowMore}
                    >
                        Know More
                    </button>
                )}
                <button
                    type="button"
                    className="px-6 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600 mt-4"
                    onClick={toggleSpeech}
                >
                    {isPlaying ? <FaPause /> : <FaPlay />} {isPlaying ? 'Pause' : 'Play'}
                </button>
            </div>
        </div>
    );
};

export default ChatBot;
