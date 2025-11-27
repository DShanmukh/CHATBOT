  import React, { useState } from 'react';
  import 'bootstrap/dist/css/bootstrap.min.css';
  import '../App.css';
  import './mail.css';
  import Mails from'./send_mail_to'
  const Mail = () => {
    const [showSecondPopup, setSecondshowPopup] = useState(false);

    const [firstname, setFirstName] = useState('');
    const [lastname, setlastName] = useState('');
    const [email, setEmail] = useState('');
    const [Phonenumber, setPhonenumber] = useState('');

    const handleYes = (e) => {
      e.preventDefault();
      setSecondshowPopup(true);
      console.log(
        {
        "Name":{firstname},
        "Email":{email}
      })
    };

    return (
      <div className="p-3 border rounded bg-light mx-auto mt-4"
          style={{ width: "100%", maxWidth: "400px" }}>
        
        <form className="form">
          <p className="title text-center">USER DETAILS</p>

          <div className="row">
            <div className="col-6">
              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                  value={firstname}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <span>Firstname</span>
              </label>
            </div>

            <div className="col-6">
              <label>
                <input
                  required
                  placeholder=""
                  type="text"
                  className="input"
                  value={lastname}
                  onChange={(e) => setlastName(e.target.value)}
                />
                <span>Lastname</span>
              </label>
            </div>
          </div>

          <label>
            <input
              required
              placeholder=""
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span>Email</span>
          </label>

          <label>
            <input
              required
              placeholder=""
              type="tel"
              className="input"
              value={Phonenumber}
              onChange={(e) => setPhonenumber(e.target.value)}
            />
            <span>Phonenumber</span>
          </label>

    

          <button
            type="button"
            className="yes-btn btn btn-primary w-100 mt-2"
            onClick={handleYes}
          >
            Submit
          </button>
        </form>

        {showSecondPopup && (
          <div className="popup-overlay">
            <div className="popup-box">
              {/* <h3>Form Submitted</h3> */}
              <Mails/>
              {/* <p className="mt-2">
                <strong>Name:</strong> {firstname} {lastname} <br />
                <strong>Email:</strong> {email}
              </p> */}

              <button
                className="btn btn-secondary mt-3"
                onClick={() => setSecondshowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Mail;
