import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";

class UserForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      user: props.currentUser,
      feedback: null,
      isLoading: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.signup = this.signup.bind(this);
  }
  handleCancel() {
    this.props.onCancelForm(true);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let first_name = document.getElementById("first_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let last_name = document.getElementById("last_name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    let body = {
      username: username,
      password: password,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      btnRegister: "register",
    };
    console.log("body: ", body);
    this.signup(body);
  }
  signup(user) {
    fetch(config.api_url + "/auth/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ isLoading: false });
        console.log("response: ", response);
        //   if (response.success == 0) {
        //     let user = response.user;
        //     this.setState({ authenticated: true, user: user }, () => {});
        //   } else {
        //     this.setState({ feedback: response.msg });
        //   }
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState({ feedback: "An error occurred!" });
        this.setState({ isLoading: false });
      });
  }
  render() {
    return (
      <div className="my-2 col-md-8 col-lg-8 col-xl-8 col-sm-10 col-sx-10 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1">
        <img
          src={logo}
          className="avatar border rounded-circle"
          alt="user avatar"
        />
        <p></p>
        <form
          className="col-md-8 col-lg-8 col-xl-8 col-sm-10 col-sx-10 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1"
          onSubmit={this.handleSubmit}
        >
          {this.state.feedback !== null ? (
            <div className="alert-danger py-2">{this.state.feedback}</div>
          ) : null}

          <input
            className="form-control my-2"
            id="first_name"
            placeholder="First Name"
            name="first_name"
            type="text"
            required
          />
          <input
            className="form-control my-2"
            id="middle_name"
            placeholder="Middle Name"
            name="middle_name"
            type="text"
          />
          <input
            className="form-control my-2"
            id="last_name"
            placeholder="Last Name"
            name="last_name"
            type="text"
            required
          />

          <input
            className="form-control my-2"
            id="phone"
            placeholder="Phone Number"
            name="phone"
            type="text"
            required
          />
          <input
            className="form-control my-2"
            id="email"
            placeholder="E-mail"
            name="email"
            type="email"
          />
          <input
            className="form-control my-2"
            id="username"
            placeholder="Officer ID"
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
          <div className="row form-group offset-md-1 offset-xl-1 offset-lg-1 my-3 px-2">
            {this.state.isLoading ? (
              <button className="btn btn-primary disabled my-2 mx-2 col-md-3 col-lg-3 col-xl-3">
                <Spinner animation="border" variant="light" />
              </button>
            ) : (
              <input
                type="submit"
                name="btnRegister"
                id="btnRegister"
                className="btn btn-primary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                value="ADD USER"
              />
            )}
            <span className="col-md-4 col-lg-4 col-xl-4"></span>
            <input
              onClick={this.handleCancel}
              type="button"
              name="btnCancel"
              id="btnCancel"
              className="btn btn-secondary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
              value="CANCEL"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default UserForm;
