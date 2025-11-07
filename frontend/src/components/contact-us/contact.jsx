import React from "react";
import Footer from "../footer/Footer";
import MetaData from "../../Pages/Home/MetaData";

const Contact = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <MetaData title={"Contact"} />

      {/* Contact Section */}
      <section className="flex-1 bg-gradient-to-b from-white via-indigo-50/30 to-white py-16 px-6 lg:px-12">
        <div className="max-w-5xl mx-auto text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
            Get in Touch
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
            Have a question about our products or services? Send us a message and we’ll respond shortly.
          </p>
        </div>

        {/* Form */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-md border border-gray-100 p-6 sm:p-8">
          <form className="space-y-8">
            {/* Name Fields */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Email and Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Message
              </label>
              <textarea
                placeholder="Write your query here..."
                rows="5"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              ></textarea>
            </div>

            {/* Button */}
            <div className="text-center">
              <button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-8 py-3 rounded-lg transition-all duration-300 shadow-sm"
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Google Map */}
      <div className="w-full h-[400px] mt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.3778127552728!2d77.9098025!3d9.3881994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cbf39a3eab71%3A0xd9fb1439ac0c587e!2ssm%20crackers!5e0!3m2!1sen!2sin!4v1757345080519!5m2!1sen!2sin"
          className="w-full h-full border-0"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="SM Crackers Location"
        ></iframe>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;
