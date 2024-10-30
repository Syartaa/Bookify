import React, { useState } from 'react';

const Contact = () => {
  const [showContactInfo, setShowContactInfo] = useState(false);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleContactClick = () => {
    setShowContactInfo(!showContactInfo);
    setFormSubmitted(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Email:', email);
    console.log('Message:', message);
    setEmail('');
    setMessage('');
    setFormSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#fdf5f0]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="md:flex gap-x-24 clear-left md:mb-16 mb-10">
          <div className="md:mb-0 mb-4">
            <h2 className="text-black font-manrope text-4xl font-semibold leading-10 mb-5 md:text-left text-center">
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
              <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">Follow us on social media</h6>
              <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">@bookify</h3>
            </div>
            <div>
              <h6 className="text-gray-500 text-sm font-medium leading-5 pb-3 md:text-start text-center">Support us</h6>
              <h3 className="text-black text-xl font-semibold leading-8 md:text-start text-center">We love and appreciate books</h3>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8">
          <div className="h-96 relative flex justify-center">
            <img src="https://pagedone.io/asset/uploads/1696246502.png" alt="United Kingdom" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">United Kingdom</h5>
              <p className="text-white text-base font-medium leading-6">123 High Street, Westminster, London</p>
            </div>
          </div>
          <div className="h-96 relative flex justify-center">
            <img src="https://pagedone.io/asset/uploads/1696246522.png" alt="Germany" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">Germany</h5>
              <p className="text-white text-base font-medium leading-6">101 Unter den Linden, Mitte <br />District, Berlin</p>
            </div>
          </div>
          <div className="h-96 relative flex justify-center">
            <img src="https://pagedone.io/asset/uploads/1696246551.png" alt="France" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">France</h5>
              <p className="text-white text-base font-medium leading-6">456 Rue de la Paix, 8th Arrondissement, Paris</p>
            </div>
          </div>
          <div className="h-96 relative flex justify-center">
            <img src="https://pagedone.io/asset/uploads/1696246565.png" alt="Switzerland" className="w-full h-full object-cover" />
            <div className="absolute bottom-0 mb-6 text-center px-6">
              <h5 className="text-white text-lg font-semibold leading-7 mb-2">Switzerland</h5>
              <p className="text-white text-base font-medium leading-6">987 Bahnhofstrasse, Zurich <br /> City Center, Zurich</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
