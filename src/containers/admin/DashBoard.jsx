import React from "react";
import { Layout, Menu } from "antd";
import "./DashBoard.scss";

import {
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
const { Header, Content, Footer, Sider } = Layout;

export default function DashBoard() {
  return (
    <Layout>
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo w-50 mx-auto">
          <img src="logo192.png" className="img-fluid" alt="logo" />
        </div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={["1"]}>
          <Menu.Item key="1" icon={<UserOutlined />}>
            Quản lý người dùng
          </Menu.Item>
          <Menu.Item key="2" icon={<VideoCameraOutlined />}>
            Quản lý danh mục
          </Menu.Item>
          <Menu.Item key="3" icon={<UploadOutlined />}>
            Quản lý dịch vụ
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          ></div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2018 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
}
