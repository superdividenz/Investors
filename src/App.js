import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Chat from './Chat';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false); // State to control sidebar visibility

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen); // Toggle the chat sidebar
  };

  return (
    <Router>
      <Header toggleChat={toggleChat} /> {/* Pass toggleChat function to Header */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
      <Chat isChatOpen={isChatOpen} toggleChat={toggleChat} /> {/* Pass state and toggle function to Chat */}
    </Router>
  );
}

export default App;