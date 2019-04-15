import "antd/dist/antd.css";
import "./App.css";

import React, { Component } from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { history } from "../store";

import { Layout } from "antd";

import Home from "../components/Home";
import Login from "../components/auth/Login";
import PrivateRoute from "../components/routes/PrivateRoute";
import GuestRoute from "../components/routes/GuestRoute";
import Header from "../components/common/Header";
import Product from "../components/products/Product";
import Sidebar from "../components/common/Sidebar";
import { ConnectedRouter } from "connected-react-router";

const { Content, Footer } = Layout;

class App extends Component {
  state = {
    collapsed: false
  };

  handleCollapse = () => {
    this.setState({
      collapsed: !this.state.collapsed
    });
  };

  render() {
    const { isSignedIn } = this.props.auth;

    return (
      <ConnectedRouter history={history}>
        <Layout style={{ minHeight: "100vh" }}>
          <Sidebar collapsed={this.state.collapsed} />
          <Layout>
            <Header
              collapsed={this.state.collapsed}
              handleCollapse={this.handleCollapse}
            />
            <Content className="page-layout-content">
              <Switch>
                <PrivateRoute
                  exact
                  path="/"
                  component={Home}
                  authenticate={isSignedIn}
                />
                <PrivateRoute
                  exact
                  path="/products"
                  component={Product}
                  authenticate={isSignedIn}
                />
                <GuestRoute
                  path="/login"
                  component={Login}
                  authenticate={isSignedIn}
                />
              </Switch>
            </Content>
            <Footer style={{ textAlign: "center" }}>
              Copy. Project in progress
            </Footer>
          </Layout>
        </Layout>
      </ConnectedRouter>
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(App);
