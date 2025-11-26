import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Add Bootstrap CSS import
import "../App.css";
import Mail from './mail'

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);
  // use states
  const [input, setInput] = useState("");
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 850);
  const [showPopup, setshowPop] = useState(false);
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
      return newMsgs.length > 100 ? newMsgs.slice(-50) : newMsgs;
    });
  

    setIsBotTyping(true);
    setInput("");

    try {
      // Simulate API call (replace with real fetch)
      await new Promise(resolve => setTimeout(resolve, 1200));
      const botReply = { from: "bot", text: `Argano said: ${input}` };
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
   const Summarize =() =>{
    alert("Summerized");
    setshowPop(true);
    // <Mail/>
  }
  const closePopup =() =>{
    setshowPop(false);
  }

  const toggleSidebar = () => {
    if (isMobile) setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center">
      <div className="row w-100" style={{ maxWidth: '1200px', height: '600px' }}>
        <div
          className={`col-lg-3 col-md-4 col-12 sidebar h-md-100 text-md-center`} 
          
          role="complementary"
          aria-label="Sidebar with information about Argano"
        >
          {/* {isMobile && (
            <button 
              className="sidebar-toggle btn btn-light"
              onClick={toggleSidebar} 
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
          )} */}
          <h3>How Argano Can Help You</h3>
          <p className="sidebar-text">
            Argano empowers businesses through digital transformation,
            intelligent automation, and optimized operations.
          </p>
          <a
            href="https://argano.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="argano-btn btn"
            aria-label="Visit Argano website"
          >
            Visit Argano
          </a>
        </div>

        <div className="col-lg-9 col-md-8 col-12 chat-container d-flex flex-column">
          <div className="messages-container d-flex flex-column gap-3 p-3 overflow-auto">
            {messages.map((msg, index) => (
              <div
                key={index} 
                className={msg.from === "bot" ? "bot-msg align-self-start" : "user-msg align-self-end"}
                aria-live="polite"
              >
                {msg.text}
              </div>
            ))}

            {isBotTyping && (
              <div className="typing-indicator d-inline-flex align-self-start" aria-label="Bot is typing">
                <div className="typing-dots d-flex gap-1">
                  <span></span><span></span><span></span>
                </div>
              </div>
            )}
          </div>

          <div className="input-container d-flex gap-2 p-3 bg-white border-top">
            <input
              type="text"
              className="input-box form-control flex-grow-1"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && handleSend()}
              aria-label="Type your message"
            />
            <button 
              className="send-button btn btn-primary"
              onClick={handleSend}
              aria-label="Send message"
            >
              Send
            </button>
            <button className="send-button btn btn-secondary" onClick={Summarize}>
              Summarize
            </button>
          </div>
        </div>
      </div>

      {showPopup && (
        <div className="popup-overlay d-flex justify-content-center align-items-center position-fixed w-100 h-100" style={{ zIndex: 999, background: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="popup-box bg-white p-4 rounded text-center" style={{ width: '400px', maxWidth: '90%' }}>
            <Mail />
            <button className="close-btn btn btn-secondary mt-3" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
