import React, { useState } from 'react';
import axios from 'axios';

const Contact = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
    setFormSubmitted(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/contactus', {
        name,
        email,
        message,
      });

      if (response.status === 200) {
        console.log('Message sent:', response.data);
        setFormSubmitted(true);
      } else {
        console.error('Error sending message:', response);
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }

    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <section className="py-24 bg-[#fdf5f0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
          <div className="md:mb-0 mb-4">
            <h2 className="text-[#563f32] font-manrope text-4xl font-semibold leading-10 mb-5 md:text-left text-center">
              Get In Touch with Bookify
            </h2>
            <p className="text-gray-600 text-lg font-normal leading-7 mb-7 md:text-left text-center">
              Whether you have a concern or simply want to say hello, we are here to facilitate communication with you.
              At Bookify, we value your input and are committed to providing the best experience possible. Your thoughts and suggestions are what drive us forward!
            </p>
            <div className="flex md:items-center md:justify-start justify-center">
              <button
                className="w-36 h-12 rounded-full bg-pink-400 transition-all duration-700 hover:bg-orange-200 shadow text-white text-center text-base font-semibold leading-6"
                onClick={handleContactClick}
              >
                Contact Us
              </button>
            </div>
            {showContactInfo && !formSubmitted && (
              <form onSubmit={handleSubmit} className="mt-4 text-center">
                <div className="flex flex-col items-center mb-4">
                  <label className="text-gray-500 text-sm font-medium leading-5 pb-3">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="border border-gray-300 rounded-lg p-4 w-80 lg:w-96 text-base focus:outline-none focus:border-pink-400 shadow-md"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div className="flex flex-col items-center mb-4">
                  <label className="text-gray-500 text-sm font-medium leading-5 pb-3">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border border-gray-300 rounded-lg p-4 w-80 lg:w-96 text-base focus:outline-none focus:border-pink-400 shadow-md"
                    placeholder="Enter your email"
                    required
                  />
                </div>
                <div className="flex flex-col items-center mb-6">
                  <label className="text-gray-500 text-sm font-medium leading-5 pb-3">Message</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="border border-gray-300 rounded-lg p-4 w-80 lg:w-96 h-40 text-base focus:outline-none focus:border-pink-400 shadow-md resize-none"
                    placeholder="Type your message"
                    required
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-36 h-12 rounded-full bg-pink-400 transition-all duration-700 hover:bg-orange-200 shadow text-white text-center text-base font-semibold leading-6"
                >
                  Send Message
                </button>
              </form>
            )}
            {formSubmitted && (
              <p className="text-green-500 mt-4">Your message has been sent successfully!</p>
            )}
          </div>
          <div className="border-l-2 md:border-pink-600 border-white px-10 py-6">
            <div className="mb-8">
              <h6 className="text-black text-sm font-medium leading-5 pb-3 md:text-start text-center">Follow us on social media</h6>
              <h3 className="text-[#563f32] text-xl font-semibold leading-8 md:text-start text-center">@bookify</h3>
            </div>
            <div>
              <h6 className="text-black text-sm font-medium leading-5 pb-3 md:text-start text-center">Support us</h6>
              <h3 className="text-[#563f32] text-xl font-semibold leading-8 md:text-start text-center">We love and appreciate books</h3>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          {/* Locations content */}
        </div>
      </div>
    </section>
  );
};

export default Contact;
