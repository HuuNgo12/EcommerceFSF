// export default Register;
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { sendSignInLinkToUser } from "../../firebase.js";

const Register = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(`ENV`, process.env.REACT_APP_REGISTER_REDIRECT_URL);
    const config = {
      url: process.env.REACT_APP_REGISTER_REDIRECT_URL,
      handleCodeInApp: true,
    };

    try {
      await sendSignInLinkToUser(email, config);
      toast.success(
        `Email is sent to ${email}. Click the link to complete registration.`
      );
      // Save the email into local storage
      window.localStorage.setItem("emailForRegistration", email);
      // Clear state
      setEmail("");
    } catch (error) {
      console.error("Error sending sign-in link:", error.message);
      toast.error("Error sending sign-in link. Please try again.");
    }
  };

  const registerForm = () => (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        className="form-control"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
        placeholder="Enter your email"
      />
      <button type="submit" className="btn btn-primary mt-3">
        Register
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register</h4>
          {registerForm()}
        </div>
      </div>
    </div>
  );
};

export default Register;
