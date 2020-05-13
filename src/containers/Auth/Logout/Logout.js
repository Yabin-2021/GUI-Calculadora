import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

import * as actions from "../../../store/actions/index";

import Button from "../../../components/Utils/Button";

class Logout extends Component {
  signedOutFlow = async () => {
    this.props.onLogout();
    return <Redirect to="/" />;
  };

  requestSignOut = () => {
    window.wallet.signOut();
    setTimeout(this.signedOutFlow, 1000);
    console.log("after sign out");
    if (window.location.search.includes("account_id")) {
      window.location.replace(
        window.location.origin + window.location.pathname
      );
    }
  };
  render() {
    return <Button clicked={this.requestSignOut}>Log Out</Button>;
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.LogOut()),
  };
};

export default connect(null, mapDispatchToProps)(Logout);