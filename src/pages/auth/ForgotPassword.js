import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth } from "../../firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("ngovanhuu1602@gmail.com");
  const [loading, setLoading] = useState(false);

  const { user } = useSelector((state) => ({ ...state }));
  let navigate = useNavigate();
  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    const config = {
      url: process.env.REACT_APP_FORGOT_PASSWORD_REDIRECT_URL,
      handleCodeInApp: true,
    };
    e.preventDefault();
    setLoading(true);

    try {
      await sendPasswordResetEmail(auth, email, config);

      setEmail("");
      setLoading(false);
      toast.success("check your email for password reset");
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
      console.log(error);
    }

    //
  };
  return (
    <div className="container col-md-6 offset-md-3 p-5">
      {loading ? (
        <h4 className="text-danger">Loading</h4>
      ) : (
        <h4>Forgot password</h4>
      )}
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Type your email"
          autoFocus
        />
        <br />
        <button className="btn btn-primary" disabled={!email}>
          Submit
        </button>
      </form>
    </div>
  );
};

export default ForgotPassword;
