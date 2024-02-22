import React, { useState } from "react";
import "antd/dist/antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu } from "antd";
// import firebase from "firebase/app";
import { signOut } from "firebase/auth";
import "firebase/auth";
import { auth } from "../../firebase.js";

import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        dispatch({
          type: "LOGOUT",
          payload: null,
        });
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // An error happened.
      });
  };
  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="d-flex justify-content-between"
    >
      {/* Sử dụng items thay vì children */}
      <Menu.Item key="home" icon={<AppstoreOutlined />} className="me-2">
        {/* Thay đổi: Thêm className "a" cho Link */}
        <Link to="/">Home</Link>
      </Menu.Item>
      <SubMenu
        icon={<SettingOutlined />}
        key="SubMenu"
        title="UserName"
        className="me-auto"
      >
        <Menu.Item key="setting:1">
          <Link to="/setting/1">Option 1</Link>
        </Menu.Item>
        <Menu.Item key="setting:2">
          <Link to="/setting/2">Option 2</Link>
        </Menu.Item>
        <Menu.Item key="logout" icon={<UserOutlined />} onClick={logout}>
          <Link to="/setting/2">Log out</Link>
        </Menu.Item>
      </SubMenu>
      <Menu.Item key="Register" icon={<UserAddOutlined />} className="me-2">
        <Link to="/register">Register</Link>
      </Menu.Item>
      <Menu.Item key="login" icon={<UserOutlined />}>
        <Link to="/login">Login</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Header;
