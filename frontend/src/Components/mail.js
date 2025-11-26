import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import '../App.css';

const Mail = () => {
  return (
    <div className="p-3 border rounded bg-light">
      <button className="btn btn-primary mb-2">Send Mail</button>
      <p>Click on yes to send summarized information to respective person.</p>
    </div>
  );
};

export default Mail;