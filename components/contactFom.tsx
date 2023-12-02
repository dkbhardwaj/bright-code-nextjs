import React from "react";
import Link from "next/link";

const ContactForm: React.FC = () => {
  return (
    <section className="text-gray-600 body-font relative bg-lightGray py-20">
      <div className="container px-5 py-24 mx-auto flex">
        <div className="w-mainRow flex">
          <div className="w-halfWidth mx-2.5 pr-20">
            <span className="title mb-2">GET IN TOUCH</span>
            <h2 className="text-spaceBlack mb-5">Let’s talk about your project</h2>
            <p className="text-gray">
              You are welcome to fill in the form, and our web experts will
              reach out to you during business hours to discuss your project.
            </p>
          </div>
          <div className="w-halfWidth mx-2.5 bg-white rounded-lg p-8 relative z-10 shadow-md">
            <form action="">
              <div className="relative mb-4">
                <label
                  htmlFor="fullName"
                  className="leading-7 text-sm text-gray-600"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>
              <button className="pink-btn">Button</button>
              <p className="text-xs text-gray-500 mt-3">
                Chicharrones blog helvetica normcore iceland tousled brook viral
                artisan.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;
