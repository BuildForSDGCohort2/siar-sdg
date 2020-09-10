import React from "react";

import logo from "../images/siar_logo.png";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: null,
      feedback: null,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.signin = this.signin.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let body = { username: username, password: password, btnLogin: "login" };
    console.log("body: ", body);
    this.setState({ isLoading: true });
    this.signin(body);
    // this.setState({ authenticated: false, user: body }, () => {});
  }
  signin(body) {
    fetch(config.api_url + "/auth/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response: ", response);
        if (response.success == 0) {
          let user = response.user;
          this.setState({ authenticated: true, user: user, isLoading: false });
        } else {
          this.setState({ feedback: response.msg, isLoading: false });
        }
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState({ feedback: "An error occurred!", isLoading: false });
      });
  }
  render() {
    if (this.state.authenticated)
      return (
        <Dashboard
          user={this.state.user}
          authenticated={this.state.authenticated}
        />
      );
    else {
      return (
        <div>
          <img src={logo} className="App-logo" alt="Siar logo" />
          <p></p>
          <form
            className="col-md-4 col-lg-4 col-xl-4 offset-md-4 offset-lg-4 offset-xl-4"
            onSubmit={this.handleSubmit}
          >
            {this.state.feedback !== null ? (
              <div className="alert-danger py-2">{this.state.feedback}</div>
            ) : null}
            <input
              className="form-control my-2"
              id="username"
              placeholder="Enter ID"
              name="username"
              type="text"
              required
            />
            <input
              className="form-control my-2"
              id="password"
              placeholder="Enter password"
              name="password"
              type="password"
            />
            {this.state.isLoading ? (
              <button className="form-control btn-primary btn my-2">
                <Spinner variant="light" animation="border" />
              </button>
            ) : (
              <input
                type="submit"
                name="btnLogin"
                id="btnLogin"
                className="form-control btn-primary btn my-2"
                value="Login"
              />
            )}
          </form>
          <footer className="text-secondary text-small my-5">
            All Rights Reserved
          </footer>
        </div>
      );
    }
  }
}
export default LoginForm;
