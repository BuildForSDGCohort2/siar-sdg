import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: true,
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      feedback: null,
      user: props.user,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.props.onCancelForm(true);
  }
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let user = this.state.user;
    switch (target.id.toLowerCase()) {
      case "username":
        user.username = value;
        break;
      case "first_name":
        user.first_name = value;
        break;
      case "middle_name":
        user.middle_name = value;
        break;
      case "email":
        user.email = value;
        break;
      case "last_name":
        user.last_name = value;
        break;
      case "password":
        user.password = value;
        break;
      default:
        break;
    }
    this.setState({ user: user });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let username = document.getElementById("username").value;
    // let password = document.getElementById("password").value;
    let first_name = document.getElementById("first_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let last_name = document.getElementById("last_name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    let body = {
      id: this.props.user.id,
      username: username,
      //   password: password,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      btnUpdateUser: "update",
    };
    console.log("body: ", body);
    this.update(body);
  }
  update(user) {
    fetch(config.api_url + "/auth/", {
      method: "put",
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
          {/* <button
            className="btn btn-success col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
            onClick={this.handleNewUser}
          >
            Edit
          </button> */}
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
              src={config.api_url + "/data/" + this.state.user.avatar}
              className="avatar border rounded-circle"
              alt="user avatar"
            />
          </div>

          <div className="text-left col-md-10 col-lg-10 col-xl-10 col-sm-12 col-sx-12">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="first_name">First Name</label>
              <input
                className="my-2 form-control"
                id="first_name"
                name="first_name"
                value={this.state.user.first_name}
                onChange={this.handleChange}
              />
              <label htmlFor="middle_name">Middle Name</label>
              <input
                className="my-2 form-control"
                id="middle_name"
                name="middle_name"
                value={this.state.user.middle_name}
                onChange={this.handleChange}
              />
              <label htmlFor="last_name">Last Name</label>
              <input
                className="my-2 form-control"
                id="last_name"
                name="last_name"
                value={this.state.user.last_name}
                onChange={this.handleChange}
              />

              <label htmlFor="phone">Phone</label>
              <input
                className="my-2 form-control"
                id="phone"
                name="phone"
                value={this.state.user.phone}
                onChange={this.handleChange}
              />
              <label htmlFor="email">E-mail</label>
              <input
                className="my-2 form-control"
                id="email"
                name="email"
                value={this.state.user.email}
                onChange={this.handleChange}
              />
              <label htmlFor="username">Officer ID</label>
              <input
                className="my-2 form-control"
                id="username"
                name="username"
                value={this.state.user.username}
                onChange={this.handleChange}
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
                    value="SAVE"
                  />
                )}

                <input
                  onClick={this.props.onClose}
                  type="button"
                  name="btnCancel"
                  id="btnCancel"
                  className="btn btn-secondary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                  value="CANCEL"
                />
                <input
                  type="button"
                  name="btnDelete"
                  id="btnDelete"
                  className="btn btn-danger btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                  value="DELETE"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default UserEdit;
