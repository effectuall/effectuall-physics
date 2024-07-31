import React, { useState } from 'react';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    institution: '',
    phone: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic (e.g., send data to server)
    console.log('Form data submitted:', formData);

    // Clear the form
    setFormData({
      name: '',
      email: '',
      institution: '',
      phone: '',
      message: ''
    });
  };

  return (
    <div className="max-w-md mx-auto bg-white p-8 mt-12 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
      {/* <form name="contact" method="POST" data-netlify="true" onSubmit={handleSubmit}>
        <input type="hidden" name="form-name" value="contact" />
        <p className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="name">Name <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          /></label>
        </p>
        <p className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="email">Email <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          /></label>
        </p>
        <p className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="institution">Institution/School Name <input
            type="text"
            id="institution"
            name="institution"
            value={formData.institution}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
          /></label>
        </p>
        <p className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="phone">Phone <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
          /></label>
        </p>
        <p className="mb-4">
          <label className="block text-sm font-medium mb-2" htmlFor="message">Message <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md"
            rows="4"
            required
          /></label>
        </p>
        <p>
          <button type="submit" className="w-full bg-cyan-600  hover:bg-cyan-700 text-white p-2 rounded-md">Send</button>
        </p>
      </form> */}
      <form name="contact" method="POST" data-netlify="true">
        {/* <input type="hidden" name="form-name" value="contact" /> */}

        <p>
          <label htmlFor='name' className="block text-sm font-medium mb-2">Your Name: 
            <input type="text" name="name"  className="w-full p-2 border border-gray-300 rounded-md"/>
            </label>
        </p>
        <p>
          <label htmlFor='email' className="block text-sm font-medium mb-2">Your Email: 
            <input type="email" name="email"  className="w-full p-2 border border-gray-300 rounded-md"/>
            </label>
        </p>

        <p>
          <label htmlFor='message' className="block text-sm font-medium mb-2">Message: <textarea name="message" className="w-full p-2 border border-gray-300 rounded-md"></textarea></label>
        </p>
        <p>
          <button type="submit">Send</button>
        </p>
      </form>

    </div>
  );
};

export default ContactForm;
