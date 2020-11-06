import React from "react";

import config from "../config.json";
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
      showEdit: false,
    };
    this.bgStyle = {
      backgroundImage:
        "url(" +
        config.api_url +
        "/data/profiles/" +
        this.props.user.avatar +
        ")",
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
      return (
        <UserEdit
          ranks={this.props.ranks}
          stations={this.props.stations}
          user={this.props.user}
          onClose={this.props.onClose}
          onUpdate={(u) => this.props.onUpdate(u)}
          onFeedback={(s, m) => {
            this.props.onFeedback(s, m);
          }}
        />
      );
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
              <div
                style={this.bgStyle}
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
              <label htmlFor="station">Duty Station</label>
              <span
                className="text-primary my-2 form-control"
                id="station"
                name="station"
              >
                {this.props.user.station}
              </span>
              <label htmlFor="ranking">Officer Rank</label>
              <span
                className="text-primary my-2 form-control"
                id="ranking"
                name="ranking"
              >
                {this.props.user.rank.description}
              </span>
            </div>
          </div>
        </div>
      );
    }
  }
}

export default UserDetail;
