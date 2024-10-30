import React from 'react';
import ebookImage from '../../../image/ebookImage.jpg'; // Adjust your image path

const HeroSection = () => {
  return (
    <div className="bg-gray-50 py-16 px-8 sm:px-12 lg:px-24 flex flex-col lg:flex-row items-center justify-between">
      {/* Text Content */}
      <div className="max-w-lg text-center lg:text-left mb-8 lg:mb-0">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
          Enjoy popular ebooks when you subscribe
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Discover millions of ebooks, audiobooks, and so much more for just
          <span className="font-semibold"> €10.99/month.</span>
        </p>
        <button className="bg-black text-white py-3 px-6 rounded-lg hover:bg-gray-800 transition duration-300">
          Read free for 30 days
        </button>
        <p className="mt-4 text-sm text-gray-500">Cancel anytime.</p>
      </div>

      {/* Image Section */}
      <div className="flex justify-center">
        <img
          src={ebookImage}
          alt="Ebook Devices"
          className="w-80 sm:w-96 lg:w-[500px] object-cover"
        />
      </div>
    </div>
  );
};

export default HeroSection;
