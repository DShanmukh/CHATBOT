import React, { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../App.css";

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hello! How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isBotTyping, setIsBotTyping] = useState(false);
  const [showPopup, setshowPop] = useState(false);
  const messagesEndRef = useRef(null);

  const [to, setTo] = useState("recipient@example.com");
  const [subject, setSubject] = useState("Chat Summary");
  const [from, setFrom] = useState("bot@argano.com");
  const [summary, setSummary] = useState(""); 
  const [isEditingFields, setIsEditingFields] = useState(false);
  const [isEditingSummary, setIsEditingSummary] = useState(false);
  const [showEmailSentPopup, setShowEmailSentPopup] = useState(false); // New state for email sent popup

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

  const handleSendEmail = () => {
    // Simulate sending email (you can add actual email sending logic here)
    setShowEmailSentPopup(true);
    closePopup();
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    if (showEmailSentPopup) {
      const timer = setTimeout(() => {
        setShowEmailSentPopup(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showEmailSentPopup]);

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-white">
      <div className="row w-100 shadow-lg rounded main-container">
      
        <div className="col-lg-3 col-md-4 col-12 sidebar d-flex flex-column align-items-center justify-content-center text-center p-3">
          <h3 className="h5 mb-3 text-dark">How Argano Can Help You</h3>
          <p className="sidebar-text text-dark small mb-3">
            Argano empowers businesses through digital transformation, intelligent automation, and optimized operations.
          </p>
          <a
            href="https://argano.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn argano-btn"
            aria-label="Visit Argano website"
          >
            Visit Argano
          </a>
        </div>
        <div className="col-lg-9 col-md-8 col-12 chat-container d-flex flex-column bg-light">
          
          <div className="messages-container d-flex flex-column gap-3 p-3 overflow-auto flex-grow-1">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded shadow-sm message-bubble ${msg.from === "bot" ? "bot-msg align-self-start bg-light border" : "user-msg align-self-end text-white"}`}
                aria-live="polite"
              >
                {msg.text}
              </div>
            ))}
            {isBotTyping && (
              <div className="typing-indicator d-inline-flex align-self-start p-1 rounded border bg-light">
                <div className="typing-dots d-flex gap-1">
                  <span className="bg-secondary rounded-circle"></span>
                  <span className="bg-secondary rounded-circle"></span>
                  <span className="bg-secondary rounded-circle"></span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSend} className="input-container d-flex gap-2 p-3 bg-white border-top position-sticky bottom-0">
            <input
              type="text"
              className="form-control flex-grow-1 rounded-pill border-secondary bg-light"
              placeholder="Type a message..."
              value={input}
              onChange={e => setInput(e.target.value)}
              aria-label="Type your message"
            />
            <button type="submit" className="btn btn-primary rounded-pill px-3">
              Send
            </button>
            <button type="button" className="btn btn-secondary rounded-pill px-3" onClick={Summarize}>
              Summarize
            </button>
          </form>
        </div>
      </div>
      {showPopup && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-fullscreen">
            <div className="modal-content d-flex flex-column h-100">
              <div className="modal-header">
                <h5 className="modal-title">Summarized Chat Ready to email</h5>
                <button type="button" className="btn-close" onClick={closePopup}></button>
              </div>
              <div className="modal-body d-flex flex-column gap-4 p-4 overflow-auto">
                
                <div className="email-fields bg-light p-3 rounded border">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Email Details</h6>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setIsEditingFields(!isEditingFields)}>
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

                <div className="summary-block bg-light p-3 rounded border">
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="mb-0">Chat Summary</h6>
                    <button className="btn btn-outline-primary btn-sm" onClick={() => setIsEditingSummary(!isEditingSummary)}>
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
                    <pre className="mb-0" style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>{summary}</pre>
                  )}
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closePopup}>Close</button>
                <button className="btn btn-primary" onClick={handleSendEmail}>Send Email</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showEmailSentPopup && (
        <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }} tabIndex="-1">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg email-sent-popup" style={{ borderRadius: '20px', background: 'linear-gradient(135deg, #28a745, #20c997)', boxShadow: '0 10px 30px rgba(0,0,0,0.3)', animation: 'popupFadeIn 0.5s ease-out' }}>
              <div className="modal-body text-center p-5" style={{ animation: 'contentSlideUp 0.6s ease-out 0.2s both' }}>
                <div className="mb-4" style={{ animation: 'iconBounce 1s ease-out 0.4s both' }}>
                  <svg className="bi bi-check-circle-fill email-sent-icon" width="100" height="100" fill="currentColor" viewBox="0 0 16 16" style={{ filter: 'drop-shadow(0 0 15px rgba(255,255,255,0.7))', animation: 'iconGlow 2s ease-in-out infinite alternate' }}>
                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
                  </svg>
                </div>
                <h4 className=" mb-3 email-sent-title" style={{fontWeight: 'bold', textShadow: '0 3px 6px rgba(0,0,0,0.4)', animation: 'textFadeIn 0.8s ease-out 0.6s both' }}>Email Sent!</h4>
                <p className=" mb-0 email-sent-subtitle" style={{ fontSize: '1.1rem', textShadow: '0 2px 4px rgba(0,0,0,0.3)', animation: 'textFadeIn 1s ease-out 0.8s both' }}>Your chat summary has been emailed successfully.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;