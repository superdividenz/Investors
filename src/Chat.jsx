import { useState, useEffect } from "react";
import axios from "axios";
import { supabase } from "./supabaseClient"; // Import Supabase client

const Chat = ({ isChatOpen, toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to insert a chat interaction into Supabase
  const recordChatInteraction = async (sender, message) => {
    const { data, error } = await supabase
      .from("chat_interactions") // Correct table name
      .insert([{ sender, message }]);

    if (error) {
      console.error("Error recording chat interaction:", error);
    } else {
      console.log("Chat interaction recorded:", data);
    }
  };

  const handleSend = async () => {
    if (input.trim()) {
      const userMessage = input.trim();
      setMessages([...messages, { text: userMessage, sender: "user" }]);
      setInput("");
      setIsLoading(true);

      // Record the user's message in Supabase
      await recordChatInteraction("user", userMessage);

      try {
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

        // Record the AI's response in Supabase
        await recordChatInteraction("ai", aiResponse);
      } catch (error) {
        console.error("Error calling Hyperbolic AI:", error.response || error);
        setMessages((prev) => [
          ...prev,
          {
            text: "Sorry, I encountered an error. Please try again.",
            sender: "ai",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !isLoading) {
      handleSend();
    }
  };

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
