import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "./supabaseClient"; // Import Supabase client

const Chat = ({ isChatOpen, toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to record chat interactions in Supabase
  const recordChatInteraction = async (sender, message) => {
    const { data, error } = await supabase
      .from("chat_interactions")
      .insert([{ sender, message }]);

    if (error) {
      console.error("Error recording chat interaction:", error);
    } else {
      console.log("Chat interaction recorded:", data);
    }
  };

  // Function to fetch St. Louis real estate data
  const fetchStLouisRealEstateData = async (query) => {
    // Example: Fetch data from Supabase or an external API
    const { data, error } = await supabase
      .from("st_louis_real_estate")
      .select("*")
      .ilike("neighborhood", `%${query}%`);

    if (error) throw error;
    return data;
  };

  // Function to fetch property listings from an external API (e.g., Zillow)
  const fetchPropertyListings = async (criteria) => {
    try {
      const response = await axios.get(`https://api.zillow.com/listings`, {
        params: {
          location: "St. Louis",
          price: criteria.price,
          bedrooms: criteria.bedrooms,
          api_key: process.env.REACT_APP_ZILLOW_API_KEY,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error fetching property listings:", error);
      return null;
    }
  };

  // Function to handle user messages
  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setInput("");
      setIsLoading(true);

      // Record the user's message in Supabase
      await recordChatInteraction("user", userMessage);

      try {
        // Check if the query is related to St. Louis real estate
        if (
          userMessage.toLowerCase().includes("st louis") ||
          userMessage.toLowerCase().includes("real estate")
        ) {
          // Check if the user is asking for property listings
          if (
            userMessage.toLowerCase().includes("property") ||
            userMessage.toLowerCase().includes("listings")
          ) {
            // Fetch property listings
            const criteria = { price: "500000", bedrooms: "3" }; // Example criteria
            const propertyListings = await fetchPropertyListings(criteria);

            if (propertyListings) {
              const aiResponse = `Here are some property listings in St. Louis: ${JSON.stringify(
                propertyListings
              )}`;
              setMessages((prev) => [
                ...prev,
                { text: aiResponse, sender: "ai" },
              ]);
              await recordChatInteraction("ai", aiResponse);
            } else {
              setMessages((prev) => [
                ...prev,
                {
                  text: "Sorry, I couldn't find any property listings at the moment. Please check back later or visit Zillow for more information.",
                  sender: "ai",
                },
              ]);
            }
          } else if (
            userMessage.toLowerCase().includes("market") ||
            userMessage.toLowerCase().includes("trends")
          ) {
            // Fetch St. Louis real estate data
            const realEstateData = await fetchStLouisRealEstateData(
              userMessage
            );

            if (realEstateData.length > 0) {
              const aiResponse = `Here's some information about the St. Louis real estate market: ${JSON.stringify(
                realEstateData
              )}`;
              setMessages((prev) => [
                ...prev,
                { text: aiResponse, sender: "ai" },
              ]);
              await recordChatInteraction("ai", aiResponse);
            } else {
              // Provide general market trends (fallback if no real-time data is available)
              const aiResponse =
                "As of 2024, the St. Louis real estate market is experiencing steady growth, with an average home price of around $250,000. Popular neighborhoods include Ladue, Kirkwood, and Webster Groves. For the latest updates, visit the St. Louis Realtors Association website.";
              setMessages((prev) => [
                ...prev,
                { text: aiResponse, sender: "ai" },
              ]);
              await recordChatInteraction("ai", aiResponse);
            }
          } else {
            // Fallback to the AI model for general real estate queries
            const response = await axios.post(
              "https://api.hyperbolic.xyz/v1/chat/completions",
              {
                model: "meta-llama/Llama-3.3-70B-Instruct",
                messages: [{ role: "user", content: userMessage }],
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${process.env.REACT_APP_HYPERBOLIC_API_KEY}`,
                },
              }
            );

            const aiResponse = response.data.choices[0].message.content;
            setMessages((prev) => [
              ...prev,
              { text: aiResponse, sender: "ai" },
            ]);
            await recordChatInteraction("ai", aiResponse);
          }
        } else {
          // Handle non-real estate queries
          const response = await axios.post(
            "https://api.hyperbolic.xyz/v1/chat/completions",
            {
              model: "meta-llama/Llama-3.3-70B-Instruct",
              messages: [{ role: "user", content: userMessage }],
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.REACT_APP_HYPERBOLIC_API_KEY}`,
              },
            }
          );

          const aiResponse = response.data.choices[0].message.content;
          setMessages((prev) => [...prev, { text: aiResponse, sender: "ai" }]);
          await recordChatInteraction("ai", aiResponse);
        }
      } catch (error) {
        console.error("Error:", error.response || error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I encountered an error. Please try again or contact support for assistance.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Handle "Enter" key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

  // Auto-scroll to the latest message
  useEffect(() => {
    const chatMessages = document.querySelector(".overflow-y-auto");
    if (chatMessages) {
      chatMessages.scrollTop = chatMessages.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      {/* Floating Chat Button (Mobile Only) */}
      <button
        onClick={toggleChat}
        className="fixed bottom-4 right-4 md:hidden p-4 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 transition-all duration-200 hover:scale-110"
      >
        💬
      </button>

      {/* Chat Window */}
      <div
        className={`fixed top-0 right-0 h-full w-full md:w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isChatOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Chat Header */}
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-black to-gray-800 text-white rounded-t-lg">
          <h2 className="text-xl font-bold">St. Louis Real Estate Chatbot</h2>
          <button
            onClick={toggleChat}
            className="p-2 rounded-full hover:bg-gray-700 transition-all duration-200 hover:scale-110"
          >
            ✕
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-[calc(100%-8rem)] overflow-y-auto p-4 bg-gray-50">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[70%] p-3 rounded-lg ${
                  msg.sender === "user"
                    ? "bg-black text-white rounded-br-none"
                    : "bg-gray-200 text-gray-800 rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="max-w-[70%] p-3 rounded-lg bg-gray-200 text-gray-800 rounded-bl-none">
                <div className="thinking-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Chat Input Area */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 rounded-b-lg">
          <div className="flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
              placeholder="Type your message..."
              disabled={isLoading}
            />
            <button
              onClick={handleSend}
              className="bg-black text-white px-6 py-3 rounded-r-lg hover:bg-gray-800 transition-all duration-200 hover:scale-105"
              disabled={isLoading}
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
