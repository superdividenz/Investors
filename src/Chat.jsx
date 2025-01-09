import { useState } from "react";

const Chat = ({ isChatOpen, toggleChat }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { text: input, sender: "user" }]);
      setInput("");

      // Simulate AI response
      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { text: "This is a simulated AI response.", sender: "ai" },
        ]);
      }, 1000);
    }
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out ${
        isChatOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Chat Header */}
      <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-500 text-white rounded-t-lg">
        <h2 className="text-xl font-bold">AI Chatbot</h2>
        <button
          onClick={toggleChat}
          className="p-2 rounded-full hover:bg-blue-700 transition-all duration-200 hover:scale-110"
        >
          ✕ {/* Close icon */}
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
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-200 text-gray-800 rounded-bl-none"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>

      {/* Chat Input Area */}
      <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200 rounded-b-lg">
        <div className="flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-600 text-white px-6 py-3 rounded-r-lg hover:bg-blue-700 transition-all duration-200 hover:scale-105"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
