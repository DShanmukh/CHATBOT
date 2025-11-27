import React, { useState } from "react";
import "./sendmail.css";

function SendMailTo() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent successfully!");
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="mail-main">
      
      {/* LEFT SIDEBAR */}
      {/* <div className="mail-sidebar">
        <h2 className="mail-sidebar-title">Send Mail</h2>
      </div> */}

      {/* RIGHT FORM SECTION */}
      <div className="mail-form-wrapper">
        <h1 className="mail-form-title">Mail Sender</h1>

        <form className="mail-form" onSubmit={handleSubmit}>
          <label className="mail-label" htmlFor="name">Name</label>
          <input
            className="mail-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <label className="mail-label" htmlFor="email">Email</label>
          <input
            className="mail-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label className="mail-label" htmlFor="subject">Subject</label>
          <input
            className="mail-input"
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          />

          <label className="mail-label" htmlFor="message">Message</label>
          <textarea
            className="mail-textarea"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>

          <button className="mail-button" type="submit">Send Email</button>
        </form>
      </div>
    </div>
  );
}

export default SendMailTo;