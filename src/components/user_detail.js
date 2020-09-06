import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";
import UserEdit from "./user_edit";

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
      showEdit: false,
    };
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  handleCancel() {
    this.props.onCancelForm(true);
  }
  handleEditButton() {
    this.setState({ showEdit: true });
  }
  render() {
    if (this.state.showEdit) {
      return <UserEdit user={this.props.user} onClose={this.props.onClose} />;
    } else {
      return (
        <div className="container-fluid">
          <div className="row col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1  my-5 d-flex justify-content-between">
            <button
              className="btn btn-success col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
              onClick={this.handleEditButton}
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
}

export default UserDetail;