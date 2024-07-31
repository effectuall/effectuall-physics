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
    <div>
      {submitted ? (
        <div>
          <p>Thank you! We will get back to you soon.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} name="contact" data-netlify="true" netlify-honeypot="bot-field">
          <p>
            <label>
              Your Name: <input type="text" name="name" value={name} onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Your Email: <input type="email" name="email" value={email} onChange={handleChange} />
            </label>
          </p>
          <p>
            <label>
              Message: <textarea name="message" value={message} onChange={handleChange} />
            </label>
          </p>
          <p>
            <button type="submit">Send</button>
          </p>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
