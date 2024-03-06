import React, { useState } from "react";
import "antd/dist/antd";
import "bootstrap/dist/css/bootstrap.min.css";
import { Menu } from "antd";
import { signOut } from "firebase/auth";
import "firebase/auth";
import { auth } from "../../firebase.js";

import styled from "styled-components";

import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let user = useSelector((state) => state.user);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const logout = () => {
    signOut(auth)
      .then(() => {
        dispatch({
          type: "LOGGOUT",
          payload: null,
        });
        navigate("/");
        console.log("Signed out successfully");
      })
      .catch((error) => {
        // console.error("Sign out error: ", error);
      });
  };

  return (
    <Wrapper>
      <Menu
        onClick={handleClick}
        selectedKeys={[current]}
        mode="horizontal"
        className="container"
      >
        <Menu.Item key="home" icon={<AppstoreOutlined />} className="menuItem">
          <Link to="/">Home</Link>
        </Menu.Item>
        {user && (
          <SubMenu
            icon={<SettingOutlined />}
            key="SubMenu"
            title={user.email && user.email.split("@")[0]}
            className="menuItem"
          >
            {user && user.role === "subcriber" && (
              <Menu.Item>
                <Link to="/user/history">Dashboard</Link>
              </Menu.Item>
            )}
            {user && user.role === "admin" && (
              <Menu.Item>
                <Link to="/admin/dashboard">Dashboard</Link>
              </Menu.Item>
            )}

            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={logout}>
              <Link to="/setting/2">Log out</Link>
            </Menu.Item>
          </SubMenu>
        )}

        {!user && (
          <Menu.Item key="login" icon={<UserOutlined />} className="menuItem">
            <Link to="/login">Login</Link>
          </Menu.Item>
        )}
        {!user && (
          <Menu.Item
            key="Register"
            icon={<UserAddOutlined />}
            className="menuItem"
          >
            <Link to="/register">Register</Link>
          </Menu.Item>
        )}
      </Menu>
    </Wrapper>
  );
};

const Wrapper = styled.article`
  .container {
    display: flex;
    justify-content: space-between;
  }

  .menuItem {
    flex: none; /* Không cho mục menu co giãn */
  }

  .menuItem:first-child {
    margin-right: auto; /* Đẩy mục "Home" về bên trái */
  }

  .menuItem:last-child {
    margin-left: auto; /* Đẩy mục "Register" về bên phải */
  }
`;

export default Header;
