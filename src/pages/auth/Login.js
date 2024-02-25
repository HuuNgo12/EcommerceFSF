// export default Register;
import React, { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { googleAuthProvider } from "../../firebase.js";

import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";

import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("ngovanhuu1602@gmail.com");
  const [password, setPassword] = useState("111111");
  const [loading, setLoading] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table(email, password);
    setLoading(true);
    console.log(loading);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      dispatch({
        type: "LOGGED_IN_USER",
        payload: {
          email: user.email,
          token: idTokenResult.token,
        },
      });

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const loginForm = () => (
    <form>
      <div className="form-group">
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoFocus
          placeholder="Enter your email"
        />
      </div>
      <br />
      <div className="form-group">
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />
      </div>
      <br />
      <Button
        onClick={handleSubmit}
        type="primary"
        className="mv-3 "
        block
        shape="round"
        icon={<MailOutlined />}
        size="large"
        disabled={!email || password.length < 6}
      >
        Login with Email/password
      </Button>
    </form>
  );

  return (
    <div className="container p-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          {!loading ? (
            <h4>Login</h4>
          ) : (
            <h4 className="text-danger">Loading ...</h4>
          )}
          {loginForm()}

          <Button
            onClick={googleLogin}
            type="primary"
            className="mt-3 "
            block
            shape="round"
            icon={<GoogleOutlined />}
            size="large"
            danger
          >
            Login with Google
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
