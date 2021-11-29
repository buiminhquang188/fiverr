import React from "react";
import withLayout from "hoc/withLayout";
import { Layout, Menu } from "antd";
import { UserOutlined, VideoCameraOutlined } from "@ant-design/icons";
import { Link, Redirect } from "react-router-dom";
import SubMenu from "antd/lib/menu/SubMenu";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

function AdminLayouts(props) {
  const { currentUser } = useSelector((state) => state.authReducer);
  return currentUser.role === "ADMIN" ? (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider collapsible>
        <div className="logo w-16 mx-auto mt-3">
          <Link to="/">
            <img src="/fiverr__icon.png" className="img-fluid" alt="logo" />
          </Link>
        </div>
        <Menu theme="dark" mode="inline">
          <Menu.Item key="0" icon={<UserOutlined />}>
            <Link to="/admin/users-management">User Management</Link>
          </Menu.Item>
          <SubMenu
            key="sub1"
            icon={<VideoCameraOutlined />}
            title="Jobs Management"
          >
            <Menu.Item key="1">
              <Link to="/admin/jobs-management/main-jobs">Main Jobs</Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/admin/jobs-management/sub-jobs">Sub Jobs</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
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
  ) : (
    <Redirect to="/" />
  );
}

export default withLayout(AdminLayouts);
