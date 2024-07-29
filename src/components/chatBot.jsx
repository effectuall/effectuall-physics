import { useState } from "react";
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const ChatBot = () => {
    // console.log('here')
    const [loading, setLoading] = useState(false);
    const [apiData, setApiData] = useState([]);
    const [grade, setGrade] = useState("");
    const [input, setInput] = useState('');
    const [subject, setSubject] = useState("");
    const [chatHistory, setChatHistory] = useState([]);
    //   const apiKey = GEMINI_API_KEY;
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
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const prompt = `You are Effy, a friendly ${subject} tutor for ${grade} grade. Your student asks you about STEM related topics, you should answer to the point, as required for the students and based on the ${input}.  In the follow up questions you may ask if they want to dwell deeper in to the subjects and also help them in suggesting related experiments
- subject: here list the subject for the STEM topic
- topic: here list the topic from STEM field which matches to the question.
- subtopic: here list all keywords related to this topic and question 
- explain: here list appropriate give answer/explanation for the question asked.
- follow up: suggest possible home experiment which student can perform safely or want to dwell deeper into the area of related topics or else ask if they have any other questions.
If ${grade} & ${subject} are not selected prompt to select them and give answer to the point and make it interesting and understandable by a 5th grade student.
You should always respond with a JSON object with the following format:
{
          "question": ${input},
          "answer": [{
          "grade":${grade},
            "subject":${subject},
            "topic": [ ],
            "subtopic": [ ],
            "explain": "",
            "followUp":"",
          }]
}
You should end with asking if they have any follow up question on the topic.`;
        const chat = model.startChat({
            generationConfig,
            safetySettings,
            history: [
            ],
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        const text = response.text();
        setApiData(text);
        const botMessage = { type: 'bot', text: text };
        setChatHistory((prev) => [...prev, botMessage]);
        setLoading(false);
        console.log(apiData, chatHistory)
        setInput("")
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
                            <div className="flex-1 mt-4 md:mt-0">
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
                                    <option value="science">Science</option>
                                    <option value="physics">Physics</option>
                                </select>
                            </div>
                        </div>
                        <div className="w-full mb-4">
                            <input
                                type="text"
                                className="w-full p-2 border rounded"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Type your question here..."
                            />
                        </div>
                        <div className="flex justify-end w-full">
                            <button type="submit" className="btn btn-primary bg-cyan-600 text-white py-2 px-4 rounded hover:bg-cyan-700">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>

                <div className="bg-white p-4 rounded shadow mt-5 mx-auto  w-full">
                    {chatHistory
                        .slice(0)
                        .reverse()
                        .map((message, index) => (
                            <div
                                key={index}
                                className={`mb-4 ${message.type === 'user' ? 'text-right' : 'text-left'} ${index === 0 ? 'text-md' : 'text-sm'
                                    }`}
                            >
                                <div
                                    className={`inline-block p-2 rounded ${message.type === 'user' ? 'bg-blue-200' : 'bg-gray-200'
                                        }`}
                                >
                                    {message.text}
                                </div>
                            </div>
                        ))}
                    {loading && <p>Loading...</p>}
                </div>
                <div className="mt-4 text-center text-gray-600">
                    Developed By Effectual Learning
                    <p>Still in development</p>
                </div>
            </div>
        </div>
    );
}
export default ChatBot;

{/* <div className="">
{!loading && <p className="text-align-left">{apiData}</p>}
{loading && <p>Loading...</p>}
</div> */}