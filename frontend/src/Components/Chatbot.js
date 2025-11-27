import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Updated to use App.css

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPopup, setshowPop] = useState(false);
  const messagesEndRef = useRef(null);

  // Popup states
  const [to, setTo] = useState("recipient@example.com");
  const [subject, setSubject] = useState("Chat Summary");
  const [from, setFrom] = useState("bot@argano.com");
  const [summary, setSummary] = useState("");
  const [isEditingFields, setIsEditingFields] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    const userMsg = { from: "user", text: input };
    setMessages(prev => {
      const newMsgs = [...prev, userMsg];
      return newMsgs.length > 100 ? newMsgs.slice(-50) : newMsgs;
    });
    setIsBotTyping(true);
    setInput("");
    
    try {
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

  const Summarize = () => {
    const summaryText = messages
      .filter(msg => msg.from !== "bot" || msg.text !== "Hello! How can I assist you today?")
      .map(msg => `${msg.from === "user" ? "User" : "Agent"}: ${msg.text}`)
      .join('\n');
    setSummary(`Summary of chat:\n${summaryText}`);
    setshowPop(true);
  };

  const closePopup = () => {
    setshowPop(false);
    setIsEditingFields(false);
    setIsEditingSummary(false);
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <>
      {/* Main Container - Removed Bootstrap container classes that conflict */}
      <div className="main-container">
        <div className="row h-100 g-0">
          {/* Sidebar */}
          <div className="col-lg-3 col-md-4 col-12 sidebar">
            <h3>How Argano Can Help You</h3>
            <p className="sidebar-text">
              Argano empowers businesses through digital transformation, intelligent automation, and optimized operations.
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

          {/* Chat Container */}
          <div className="col-lg-9 col-md-8 col-12 chat-container">
            {/* Messages Container */}
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
                <div className="typing-indicator">
                  <div className="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input Container */}
            <div className="input-container">
              <div className="row g-2">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Type a message..."
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyPress={e => e.key === 'Enter' && handleSend(e)}
                    aria-label="Type your message"
                  />
                </div>
                <div className="col-auto">
                  <button 
                    type="button" 
                    className="btn btn-primary" 
                    onClick={handleSend}
                  >
                    Send
                  </button>
                </div>
                <div className="col-auto">
                  <button 
                    type="button" 
                    className="btn btn-secondary" 
                    onClick={Summarize}
                  >
                    Summarize
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Popup Modal */}
      {showPopup && (
        <div 
          className="modal fade show d-block" 
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} 
          tabIndex="-1"
          onClick={closePopup}
        >
          <div 
            className="modal-dialog modal-fullscreen"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Email Summary</h5>
                <button 
                  type="button" 
                  className="btn-close" 
                  onClick={closePopup}
                  aria-label="Close"
                ></button>
              </div>
              
              <div className="modal-body">
                {/* Email Fields Block */}
                <div className="email-fields mb-4">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Email Details</h6>
                    <button 
                      className="btn btn-outline-primary btn-sm" 
                      onClick={() => setIsEditingFields(!isEditingFields)}
                    >
                      {isEditingFields ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-4">
                      <label className="form-label">To</label>
                      <input
                        type="email"
                        className="form-control"
                        value={to}
                        onChange={e => setTo(e.target.value)}
                        disabled={!isEditingFields}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Subject</label>
                      <input
                        type="text"
                        className="form-control"
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        disabled={!isEditingFields}
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">From</label>
                      <input
                        type="email"
                        className="form-control"
                        value={from}
                        onChange={e => setFrom(e.target.value)}
                        disabled={!isEditingFields}
                      />
                    </div>
                  </div>
                </div>

                {/* Summary Block */}
                <div className="summary-block">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Chat Summary</h6>
                    <button 
                      className="btn btn-outline-primary btn-sm" 
                      onClick={() => setIsEditingSummary(!isEditingSummary)}
                    >
                      {isEditingSummary ? 'Save' : 'Edit'}
                    </button>
                  </div>
                  {isEditingSummary ? (
                    <textarea
                      className="form-control"
                      rows="10"
                      value={summary}
                      onChange={e => setSummary(e.target.value)}
                    />
                  ) : (
                    <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                      {summary}
                    </pre>
                  )}
                </div>
              </div>
              
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePopup}>
                  Close
                </button>
                <button className="btn btn-primary">
                  Send Email
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;