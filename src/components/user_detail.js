import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      user: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      feedback: null,
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
        let feedback = response.msg;
        if (response.success == 0) {
          this.setState({ hasSuccessFeedback: true, feedback: feedback });
          this.props.onUpdate(response.users);
          this.handleCancel();
        } else {
          this.setState({ hasFailFeedback: true, feedback: response.msg });
        }
        this.props.onFeedback(feedback, this.state.hasSuccessFeedback);
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState({
          hasFailFeedback: true,
          isLoading: false,
          feedback: "An error occurred!",
        });
      });
  }
  render() {
    return (
      <div className="container-fluid">
        <div className="row col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1  my-5 d-flex justify-content-between">
          <button
            className="btn btn-success col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
            onClick={this.handleNewUser}
          >
            Edit
          </button>
          <i
            className="material-icons btn btn-danger  col-sm-2 col-xm-2 col-md-1 col-lg-1 col-xl-1"
            onClick={this.props.onClose}
          >
            close
          </i>
        </div>
        <div className="row col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1  my-5 d-flex justify-content-between">
          <div className="col-xl-2 col-lg-2 col-md-2 col-sm-12 col-xs-12">
            <img
              src={config.api_url + "/data/" + this.props.user.avatar}
              className="avatar border rounded-circle"
              alt="user avatar"
            />
          </div>

          <div className="text-left col-md-10 col-lg-10 col-xl-10 col-sm-12 col-sx-12">
            <label htmlFor="first_name">First Name</label>
            <span
              className="text-primary my-2 form-control"
              id="first_name"
              name="first_name"
            >
              {this.props.user.first_name}
            </span>
            <label htmlFor="middle_name">Middle Name</label>
            <span
              className="text-primary my-2 form-control"
              id="middle_name"
              name="middle_name"
            >
              {this.props.user.middle_name}
            </span>
            <label htmlFor="last_name">Last Name</label>
            <span
              className="text-primary my-2 form-control"
              id="last_name"
              name="last_name"
            >
              {this.props.user.last_name}
            </span>

            <label htmlFor="phone">Phone</label>
            <span
              className="text-primary my-2 form-control"
              id="phone"
              name="phone"
            >
              {this.props.user.phone}
            </span>
            <label htmlFor="email">E-mail</label>
            <span
              className="text-primary my-2 form-control"
              id="email"
              name="email"
            >
              {this.props.user.email}
            </span>
            <label htmlFor="username">Officer ID</label>
            <span
              className="text-primary my-2 form-control"
              id="username"
              name="username"
            >
              {this.props.user.username}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default UserDetail;
