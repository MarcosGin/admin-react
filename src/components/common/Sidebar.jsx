import "./Sidebar.css";
import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Layout, Menu, Icon } from "antd";
const { Sider } = Layout;

class Sidebar extends Component {
  state = {
    collapsed: false
  };

  handleMenuClick = e => {
    this.setState({ currentPage: e.key });
    this.props.history.push(e.key);
  };

  render() {
    const { isSignedIn } = this.props.auth;
    if (!isSignedIn) {
      return null;
    }
    return (
      <Sider trigger={null} collapsible collapsed={this.props.collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[this.props.router.location.pathname]}
          onClick={this.handleMenuClick}
        >
          <Menu.Item key="/">
            <Icon type="home" />
            <span>Dashboard</span>
          </Menu.Item>
          <Menu.Item key="/products">
            <Icon type="read" />
            <span>Products</span>
          </Menu.Item>
        </Menu>
      </Sider>
    );
  }
}

const mapStateToProps = ({ auth, router }) => {
  return {
    auth,
    router
  };
};

export default connect(mapStateToProps)(withRouter(Sidebar));
