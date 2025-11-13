import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hello! How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const [showAIModels, setShowAIModels] = useState(false);
  const [selectedAIModel, setSelectedAIModel] = useState('Default AI');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;


    // Add user message
    const userMessage = { from: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);

    // Start bot typing indicator
    setIsBotTyping(true);

    // Simulate bot response based on selected AI model
    let botReplyText = `You said: ${input}`;
    if (selectedAIModel === 'Friendly AI') {
      botReplyText = `That's great! ${input}`;
    } else if (selectedAIModel === 'Professional AI') {
      botReplyText = `Acknowledged: ${input}`;
    }

    setTimeout(() => {
      setIsBotTyping(false);
      const botReply = { from: 'bot', text: botReplyText };
      setMessages(prev => [...prev, botReply]);
    }, 2000); // Simulated typing delay

    setInput('');
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const handleAIModelSelect = (model) => {
    setSelectedAIModel(model);
    setShowAIModels(false);
  };

  return (
    <>
      <style>{`
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes expandSidebar { from { width: 60px; } to { width: 250px; } }
        @keyframes collapseSidebar { from { width: 250px; } to { width: 60px; } }
        @keyframes typing { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-10px); } }
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }

        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 0; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); min-height: 100vh; display: flex; align-items: center; justify-content: center; overflow-x: hidden; }

        .main-container { display: flex; width: 90vw; max-width: 1000px; margin: 20px auto; border-radius: 12px; height: 600px; box-shadow: 0 10px 30px rgba(0,0,0,0.3); overflow: hidden; background: white; animation: fadeIn 0.5s ease-in-out; position: relative; }

        .sidebar { width: ${sidebarVisible ? '250px' : '60px'}; background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%); color: white; padding: 20px; flex-shrink: 0; overflow: hidden; box-shadow: inset -5px 0 10px rgba(0,0,0,0.1); transition: width 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94); position: relative; cursor: pointer; }
        .sidebar:hover { width: 250px; }
        .sidebar.expanded { animation: expandSidebar 0.4s ease; }
        .sidebar.collapsed { animation: collapseSidebar 0.4s ease; }
        .sidebar h3 { margin: 0 0 20px 0; font-size: 24px; font-weight: bold; text-align: center; color: #ecf0f1; text-shadow: 1px 1px 2px rgba(0,0,0,0.5); opacity: ${sidebarVisible ? 1 : 0}; transform: ${sidebarVisible ? 'translateY(0)' : 'translateY(-10px)'}; transition: opacity 0.4s ease, transform 0.4s ease; white-space: nowrap; }
        .sidebar ul { list-style: none; padding: 0; margin: 0; }
        .sidebar li { padding: 12px 15px; margin: 5px 0; cursor: pointer; border-radius: 8px; transition: all 0.3s ease; background: rgba(255,255,255,0.1); border-left: 4px solid transparent; position: relative; display: flex; align-items: center; opacity: ${sidebarVisible ? 1 : 0}; transform: ${sidebarVisible ? 'translateX(0)' : 'translateX(-20px)'}; transition: opacity 0.4s ease, transform 0.4s ease, background 0.3s ease; white-space: nowrap; overflow: hidden; }
        .sidebar li:hover { background: rgba(255,255,255,0.2); border-left-color: #3498db; transform: translateX(5px); box-shadow: 0 4px 8px rgba(0,0,0,0.2); }
        .ai-models-dropdown { margin-top: 10px; background: rgba(255,255,255,0.1); border-radius: 8px; padding: 10px; opacity: ${showAIModels ? 1 : 0}; max-height: ${showAIModels ? '200px' : '0'}; overflow: hidden; transition: all 0.4s cubic-bezier(0.25,0.46,0.45,0.94); box-shadow: inset 0 2px 4px rgba(0,0,0,0.1); }
        .ai-models-dropdown button { display: block; width: 100%; padding: 8px 12px; margin: 5px 0; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; border: none; border-radius: 6px; cursor: pointer; transition: all 0.3s ease; font-size: 14px; box-shadow: 0 2px 4px rgba(0,0,0,0.2); }
        .ai-models-dropdown button:hover { background: linear-gradient(135deg, #2980b9 0%, #21618c 100%); transform: translateY(-1px); box-shadow: 0 4px 8px rgba(0,0,0,0.3); }

        .chat-container { flex: 1; display: flex; flex-direction: column; background: #f8f9fa; border-left: 1px solid #dee2e6; }
        .messages-container { flex: 1; padding: 20px; overflow-y: auto; display: flex; flex-direction: column; gap: 10px; }
        .bot-msg { background: linear-gradient(135deg, #cae7eaff 0%, #d7f6ffff 100%); padding: 12px 16px; border-radius: 18px 18px 18px 4px; align-self: flex-start; max-width: 70%; word-wrap: break-word; box-shadow: 0 2px 5px rgba(0,0,0,0.1); font-size: 14px; line-height: 1.4; animation: slideInLeft 0.4s ease-out; position: relative; }
        .user-msg { background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); color: white; padding: 12px 16px; border-radius: 18px 18px 4px 18px; align-self: flex-end; max-width: 70%; word-wrap: break-word; box-shadow: 0 2px 5px rgba(0,0,0,0.1); font-size: 14px; line-height: 1.4; animation: slideInRight 0.4s ease-out; position: relative; }

        .typing-indicator { background: linear-gradient(135deg, #a8e6cf 0%, #dcedc8 100%); padding: 12px 16px; border-radius: 18px 18px 18px 4px; align-self: flex-start; max-width: 70%; display: flex; align-items: center; gap: 5px; animation: slideInLeft 0.4s ease-out; position: relative; }
        .typing-dots { display: flex; gap: 4px; }
        .typing-dots span { width: 8px; height: 8px; background: #666; border-radius: 50%; animation: typing 1.4s infinite ease-in-out; }
        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        .input-container { display: flex; border-top: 1px solid #dee2e6; padding: 15px 20px; background: white; gap: 10px; }
        .input-box { flex-grow: 1; padding: 12px 16px; font-size: 16px; border: 2px solid #ced4da; border-radius: 25px; outline: none; transition: all 0.3s ease; background: #f8f9fa; box-shadow: inset 0 1px 2px rgba(0,0,0,0.1); }
        .input-box:focus { border-color: #3498db; box-shadow: 0 0 10px rgba(52,152,219,0.3), inset 0 1px 2px rgba(0,0,0,0.1); background: white; }
        .send-button { padding: 12px 24px; font-size: 16px; font-weight: bold; cursor: pointer; background: linear-gradient(135deg, #3498db 0%, #2980b9 100%); color: white; border: none; border-radius: 25px; transition: all 0.3s ease; box-shadow: 0 2px 5px rgba(0,0,0,0.2); position: relative; overflow: hidden; }
        .send-button:hover { background: linear-gradient(135deg, #2980b9 0%, #21618c 100%); transform: translateY(-2px); box-shadow: 0 4px 10px rgba(0,0,0,0.3); }
      `}</style>

      <div className="main-container">
        <div
          className={`sidebar ${sidebarVisible ? 'expanded' : 'collapsed'}`}
          onMouseEnter={() => setSidebarVisible(true)}
          onMouseLeave={() => setSidebarVisible(false)}
        >
          <h3>Chatbot</h3>
          <ul>
            <li onClick={toggleSidebar}>Toggle Sidebar</li>
            <li></li>
            <li>Settings</li>
            <li onClick={() => setShowAIModels(!showAIModels)}>AI Models</li>
          </ul>

          {showAIModels && (
            <div className="ai-models-dropdown">
              <button onClick={() => handleAIModelSelect('Default AI')}>Default AI</button>
              <button onClick={() => handleAIModelSelect('Friendly AI')}>Friendly AI</button>
              <button onClick={() => handleAIModelSelect('Professional AI')}>Professional AI</button>
            </div>
          )}
        </div>

        <div className="chat-container">
          <div className="messages-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.from === 'bot' ? 'bot-msg' : 'user-msg'}
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
          </div>

          <div className="input-container">
            <input
              type="text"
              className="input-box"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend();
              }}
            />
            <button className="send-button" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatbot;
