// export default Register;
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import { googleAuthProvider } from "../../firebase.js";

import { Button } from "antd";
import { GoogleOutlined, MailOutlined } from "@ant-design/icons";

import { auth } from "../../firebase.js";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import "firebase/auth";

import styled from "styled-components";

import { createOrUpdateUser } from "../../functions/auth";

//This is the code to post the token to the backend. 'authToken' comes from
//Firebase when the user submits the login form (see it in the handleSubmit function of the login).

//
const Login = () => {
  const [email, setEmail] = useState("ngovanhuu1602@gmail.com");
  const [password, setPassword] = useState("123456");
  const [loading, setLoading] = useState(false);
  const [login, setLogin] = useState(false);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const roleBasedRedirect = (res) => {
    if (res.data.role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/user/history");
    }
  };

  const { user } = useSelector((state) => ({ ...state }));
  // console.log(user);
  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table(email, password);
    setLoading(true);
    // console.log(loading);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();
      createOrUpdateUser(idTokenResult.token) // call the function to post the token to the backend. Because it is asyn function
        // So, the result is a promise.
        .then((res) => {
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              name: res.data.name, //from server
              email: res.data.email, //from server
              token: idTokenResult.token, // from client
              role: res.data.role, //from server
              _id: res.data._id, //from server
            },
          });
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
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
      console.log(`login ? ${login} `);

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));
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
    <Wrapper>
      <div className="container p-5">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            {!loading ? (
              <h4>Login</h4>
            ) : (
              <h4 className="text-danger">Loading...</h4>
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
            <div className="text-right">
              <Link to="/forgot/password" className="text-danger">
                Forgot password
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .text-right {
    text-align: right;
  }
`;

export default Login;
