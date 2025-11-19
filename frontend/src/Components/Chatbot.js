import React, { useState } from 'react';
import "../App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);

  const [input, setInput] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850); // Detect mobile

  // Update mobile state on resize
  React.useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 850);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = { from: "user", text: input };
    setMessages(prev => {
      const newMsgs = [...prev, userMsg];
      return newMsgs.length > 50 ? newMsgs.slice(-50) : newMsgs; // Limit to 50 messages
    });

    setIsBotTyping(true);
    setInput("");

    try {
      // Simulate API call (replace with real fetch)
      await new Promise(resolve => setTimeout(resolve, 1200));
      const botReply = { from: "bot", text: `You said: ${input}` };
      setMessages(prev => {
        const newMsgs = [...prev, botReply];
        return newMsgs.length > 50 ? newMsgs.slice(-50) : newMsgs;
      });
    } catch (error) {
      const errorMsg = { from: "bot", text: "Sorry, I'm having trouble responding right now." };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsBotTyping(false);
    }
  };

  const toggleSidebar = () => {
    if (isMobile) setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="main-container">
      <div
        className={`sidebar ${sidebarVisible ? "expanded" : ""}`}
        onMouseEnter={() => !isMobile && setSidebarVisible(true)}
        onMouseLeave={() => !isMobile && setSidebarVisible(false)}
        onClick={toggleSidebar} // For mobile toggle
        role="complementary"
        aria-label="Sidebar with information about Argano"
      >
        {isMobile && (
          <button 
            className="sidebar-toggle" 
            onClick={toggleSidebar} 
            aria-label="Toggle sidebar"
          >
            ☰
          </button>
        )}
        <h3>How Argano Can Help You</h3>
        <p className="sidebar-text">
          Argano empowers businesses through digital transformation,
          intelligent automation, and optimized operations.
        </p>
        <a
          href="https://argano.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="argano-btn"
          aria-label="Visit Argano website"
        >
          Visit Argano
        </a>
      </div>

      <div className="chat-container" role="main" aria-label="Chat messages">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={msg.from === "bot" ? "bot-msg" : "user-msg"}
              aria-live="polite"
            >
              {msg.text}
            </div>
          ))}

          {isBotTyping && (
            <div className="typing-indicator" aria-label="Bot is typing">
              <div className="typing-dots">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
        </div>

        <div className="input-container">
          <input
            type="text"
            className="input-box"
            placeholder="Type a message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
            aria-label="Type your message"
          />
          <button 
            className="send-button" 
            onClick={handleSend}
            aria-label="Send message"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;