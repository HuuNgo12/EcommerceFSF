// export default Register;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { auth } from "../../firebase.js";
import { signInWithEmailLink } from "firebase/auth";
import { updatePassword } from "firebase/auth";

import { useDispatch, useSelector } from "react-redux";

import { createOrUpdateUser } from "../../functions/auth";

const RegisterComplete = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let navigate = useNavigate();
  let dispatch = useDispatch();

  useEffect(() => {
    setEmail(window.localStorage.getItem("emailForRegistration"));
    console.log(window.localStorage.getItem("emailForRegistration"));
    console.log(window.location.href);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Email and password is required");
      return;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }
    try {
      const result = await signInWithEmailLink(
        auth,
        email,
        window.location.href
      );

      // console.log("result", result);
      if (result.user.emailVerified) {
        // remove the email from local storage
        window.localStorage.removeItem("emailForRegistration");
        // get user id token
        let user = auth.currentUser;

        await updatePassword(user, password);
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user, "idToken", idTokenResult);
        // redux store
        createOrUpdateUser(idTokenResult.token) // call the function to post the token to the backend. Because it is asyn function
          // So, the result is a promise.
          .then((res) => {
            dispatch({
              type: "LOGGED_IN_USER",
              payload: {
                name: res.data.name, //from server
                email: res.data.email, //from server
                token: idTokenResult.token, // from client
                role: res.data.role,
                _id: res.data._id,
              },
            });
          })
          .catch((err) => console.log(err));
        //redirect
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const completeRegistrationForm = () => (
    <form onSubmit={handleSubmit}>
      <input type="email" className="form-control" value={email} disabled />
      <input
        type="password"
        className="form-control"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        autoFocus
      />
      <br />
      <button type="submit" className="btn btn-primary mt-3">
        Complete Registration
      </button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h4>Register complete</h4>
          {completeRegistrationForm()}
        </div>
      </div>
    </div>
  );
};

export default RegisterComplete;
