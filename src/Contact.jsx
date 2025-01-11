import React, { useState } from "react";
import { supabase } from "./supabaseClient"; // Import Supabase client

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      // Insert form data into Supabase
      const { error } = await supabase
        .from("contact_submissions")
        .insert([formData]);

      if (error) {
        throw error;
      }

      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" }); // Clear form
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-100 to-gray-200 pt-12 md:pt-20">
      <main className="container mx-auto p-4 md:p-8">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 md:mb-8 text-black text-center">
          Contact Us
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  placeholder="Your Email"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full p-2 md:p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                  rows="4"
                  placeholder="Your Message"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-black text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold hover:bg-gray-800 transition duration-300"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
              {submitStatus === "success" && (
                <p className="text-green-600 text-center mt-4">
                  Thank you! Your message has been sent.
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 text-center mt-4">
                  Oops! Something went wrong. Please try again.
                </p>
              )}
            </form>
          </div>

          {/* Location and Map */}
          <div className="bg-white rounded-lg shadow-lg p-6 md:p-8">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-black">
              Our Location
            </h3>
            <p className="text-gray-700 mb-4">
              123 Real Estate Ave, St. Louis, MO 63101
            </p>
            <p className="text-gray-700 mb-4">Phone: (314) 555-1234</p>
            <p className="text-gray-700 mb-6">
              Email: info@stlouisreinvestors.com
            </p>

            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title="Google Maps showing St. Louis, MO"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d199412.4868557252!2d-90.38349542252384!3d38.65300028507!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x87d8b4a9faed8ef9%3A0xbe39eaca22bbe05b!2sSt.%20Louis%2C%20MO!5e0!3m2!1sen!2sus!4v1673449878800!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
