import React from "react";
import withLayout from "hoc/withLayout";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
const { Header, Content, Footer, Sider } = Layout;

function AdminLayouts(props) {
  console.log("Render AdminLayouts");
  return (
    <Layout
      style={{
        height: "100vh",
      }}
    >
      <Sider
        style={{
          overflow: "auto",
          height: "100vh",
          position: "fixed",
          left: 0,
        }}
      >
        <div className="logo w-16 mx-auto">
          <img src="/logo512.png" className="img-fluid" alt="logo" />
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="0" icon={<UserOutlined />}>
            <Link to="/admin/dashboard">Dashboard</Link>
          </Menu.Item>
          <Menu.Item key="1" icon={<UserOutlined />}>
            <Link to="/admin/users-management">User Management</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<VideoCameraOutlined />}
            title="Jobs Management"
          >
            <Menu.Item key="3">
              <Link to="/admin/jobs-management/main-jobs">Main Jobs</Link>
            </Menu.Item>
            <Menu.Item key="4">
              <Link to="/admin/jobs-management/sub-jobs">Sub Jobs</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200 }}>
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <div
            className="site-layout-background"
            style={{ padding: 24, textAlign: "center" }}
          >
            {props.children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}></Footer>
      </Layout>
    </Layout>
  );
}

export default withLayout(AdminLayouts);
