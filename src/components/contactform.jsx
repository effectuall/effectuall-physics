// components/ContactForm.jsx
import React, { useState } from 'react';

const ContactForm = () => {
  const [state, setState] = useState({ name: "", email: "", message: "", submitted: false });

  const encode = (data) => {
    return Object.keys(data)
      .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
      .join("&");
  };

  const handleSubmit = e => {
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({ "form-name": "contact", ...state })
    })
      .then(() => {
        setState({ name: "", email: "", message: "", submitted: true });
      })
      .catch(error => alert(error));

    e.preventDefault();
  };

  const handleChange = e => {
    const { name, value } = e.target;
    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const { name, email, message, submitted } = state;

  return (
    <div className="max-w-md mx-auto my-8 p-4 mt-4 lg:mt-24 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      {submitted ? (
        <div className="text-center">
          <p className="text-green-500">Thank you! We will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} name="contact" data-netlify="true" netlify-honeypot="bot-field">
          <div className="mb-4">
            <label className="block text-gray-700">
              Your Name:
              <input 
                type="text" 
                name="name" 
                value={name} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Your Email:
              <input 
                type="email" 
                name="email" 
                value={email} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </label>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">
              Message:
              <textarea 
                name="message" 
                value={message} 
                onChange={handleChange} 
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm" 
              />
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className="px-4 py-2 bg-cyan-600  hover:bg-cyan-700  text-white rounded-md shadow focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Send
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
