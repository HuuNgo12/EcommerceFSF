import React, { useState } from "react";
import "antd/dist/antd";
import "bootstrap/dist/css/bootstrap.min.css";

import { Menu } from "antd";
import "../../index.css";
import {
  AppstoreOutlined,
  SettingOutlined,
  UserAddOutlined,
  UserOutlined,
} from "@ant-design/icons";

import { Link } from "react-router-dom";

const { SubMenu } = Menu;

const Header = () => {
  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Menu
      onClick={handleClick}
      selectedKeys={[current]}
      mode="horizontal"
      className="d-flex justify-content-between"
    >
      <Menu.Item key="home" icon={<AppstoreOutlined />} className="me-2">
        <Link className="a" to="/">
          Home
        </Link>
      </Menu.Item>
      <SubMenu
        icon={<SettingOutlined />}
        key="SubMenu"
        title="UserName"
        className="me-auto"
      >
        <Menu.Item key="setting:1">Option 1</Menu.Item>
        <Menu.Item key="setting:2">Option 2</Menu.Item>
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
