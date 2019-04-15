import React, { Component } from "react";
import { connect } from "react-redux";
class Home extends Component {
  render() {
    return <div>Welcome {this.props.auth.user.email}!</div>;
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    auth
  };
};

export default connect(mapStateToProps)(Home);
