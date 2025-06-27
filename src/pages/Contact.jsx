import React from "react";
import { FaEnvelope, FaMapMarkerAlt, FaPhoneAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <div className="min-h-screen bg-base-200 px-4 py-20 md:px-12 lg:px-16 xl:px-24">
      <div
        className="text-center mb-10"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-primary">
          Get In Touch
        </h2>
        <p className="text-gray-500 mt-2">
          We'd love to hear from you! Please fill out the form below.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Contact Info */}
        <div
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
          data-aos="fade-right"
          data-aos-duration="1200"
        >
          <div className="flex items-start gap-4">
            <FaMapMarkerAlt className="text-primary text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-base-content">Address</h4>
              <p className="text-sm text-gray-600">
                123 HobbyHub Street, Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaPhoneAlt className="text-primary text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-base-content">Phone</h4>
              <p className="text-sm text-gray-600">+880 1792-552448</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <FaEnvelope className="text-primary text-xl mt-1" />
            <div>
              <h4 className="font-semibold text-base-content">Email</h4>
              <p className="text-sm text-gray-600">support@hobbyhub.com</p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <form
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
          data-aos="fade-left"
          data-aos-duration="1200"
        >
          <div className="form-control">
            <label className="label font-semibold">Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Email</label>
            <input
              type="email"
              placeholder="Your Email"
              className="input input-bordered w-full"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Subject</label>
            <input
              type="text"
              placeholder="Subject"
              className="input input-bordered w-full"
            />
          </div>

          <div className="form-control">
            <label className="label font-semibold">Message</label>
            <textarea
              rows="4"
              placeholder="Write your message..."
              className="textarea textarea-bordered w-full"
              required
            ></textarea>
          </div>

          <div>
            <button type="submit" className="btn btn-primary w-full">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
