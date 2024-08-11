//effy.js
import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY; // Replace with your actual API key

const genAI = new GoogleGenerativeAI(apiKey);

export const generateResponse = async (question, subject, grade) => {
    console.log(subject);
    const converstion = `You are Effy, a friendly ${subject} tutor for ${grade} grade. Your student asks you about STEM related topics, you should answer to the point, as required for the students and based on the ${question}. In the follow up questions you may ask if they want to dwell deeper into the subjects and also help them in suggesting related experiments
    
    - subject: here list the subject for the STEM topic
    - topic: here list the topic from STEM field which matches to the question in lowercase.
    - subtopics: here list all possible keywords for websearch.
    - keywords: here list combined list of topic & subtopics in lowercase.
    - explain: here list appropriate give answer/explanation for the question asked.
    - follow up: suggest possible home experiment which student can perform safely or want to dwell deeper into the area of related topics or else ask if they have any other questions.
    If ${grade} & ${subject} are not selected prompt to select them and give answer to the point and make it interesting and understandable by a 5th grade student.
    You should always respond with a JSON object with the following format:
    {
      "question": "${question}",
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
    const model = genAI.getGenerativeModel({
        model: "gemini-1.0-pro",
    });
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

    const generationConfig = {
        temperature: 0.9,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };
    const chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
    });
    const result = await chat.sendMessage(converstion);
    const response = await result.response;
    const text = await response.text();
    // console.log(text)
    return text;
};