import React from "react";

import avatar from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasFeedback: false,
      feedback: null,
      user: props.user,
      ranks: props.ranks,
      stations: props.stations,
      avatar: props.user.avatar,
      avatarChanged: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.update = this.update.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.readBase64 = this.readBase64.bind(this);
  }
  readBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onError = (e) => reject(e);
    });
  }
  handleCancel() {
    this.props.onClose();
  }
  handleChange(e) {
    let target = e.target;
    let value = target.value;
    let user = this.state.user;
    switch (target.id.toLowerCase()) {
      case "ranking":
        user.ranking = target.options[target.options.selectedIndex].value;
        user.rank = this.state.ranks.filter((r) => {
          return (r.id = user.ranking);
        })[0];

        break;
      case "station":
        user.station = value;
        break;
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
      case "file_avatar":
        if (target.files && target.files.length > 0) {
          // let preview = document.getElementById("avatar");
          this.readBase64(target.files[0])
            .then((result) => {
              this.setState({ avatar: result, avatarChanged: true });
              // preview.src = result;
            })
            .catch((e) => {
              console.error("error: ", e);
            });
        }
      default:
        break;
    }
    this.setState({ user: user });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let username = document.getElementById("username").value;
    let el = document.getElementById("ranking");
    let ranking = el.options[el.options.selectedIndex].value;
    let first_name = document.getElementById("first_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let last_name = document.getElementById("last_name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    let stationEl = document.getElementById("station");
    let station = stationEl.options[stationEl.options.selectedIndex].value;
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
      ranking: ranking,
      station: station,
      btnUpdateUser: "update",
    };
    if (this.state.avatarChanged) body.avatar = this.state.avatar;
    console.log("body: ", body);
    this.update(body);
  }
  update(user) {
    fetch(config.api_url + "/auth/", {
      method: "put",
      mode: "no-cors",
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
        <div className="row col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1  my-5 d-flex justify-content-between ">
          <span></span>
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
              src={
                this.state.avatarChanged
                  ? this.state.avatar
                  : config.api_url + "/data/profiles/" + this.state.avatar
              }
              className="avatar border rounded-circle"
              alt="officer picture"
            />
          </div>

          <div className="text-left col-md-10 col-lg-10 col-xl-10 col-sm-12 col-sx-12">
            <form onSubmit={this.handleSubmit}>
              <label htmlFor="file_avatar">Change Picture</label>
              <input
                accept="image/*"
                type="file"
                id="file_avatar"
                name="file_avatar"
                className="form-control my-2"
                onChange={this.handleChange}
              />
              <label htmlFor="first_name">First Name</label>
              <input
                className="my-2 form-control"
                id="first_name"
                name="first_name"
                defaultValue={this.state.user.first_name}
                onChange={this.handleChange}
              />
              <label htmlFor="middle_name">Middle Name</label>
              <input
                className="my-2 form-control"
                id="middle_name"
                name="middle_name"
                defaultValue={this.state.user.middle_name}
                onChange={this.handleChange}
              />
              <label htmlFor="last_name">Last Name</label>
              <input
                className="my-2 form-control"
                id="last_name"
                name="last_name"
                defaultValue={this.state.user.last_name}
                onChange={this.handleChange}
              />

              <label htmlFor="phone">Phone</label>
              <input
                className="my-2 form-control"
                id="phone"
                name="phone"
                defaultValue={this.state.user.phone}
                onChange={this.handleChange}
              />
              <label htmlFor="email">E-mail</label>
              <input
                className="my-2 form-control"
                id="email"
                name="email"
                defaultValue={this.state.user.email}
                onChange={this.handleChange}
              />

              <label htmlFor="ranking">Select Officer Rank</label>
              <select
                className="form-control my-2"
                id="ranking"
                name="ranking"
                defaultValue={this.state.user.ranking}
                onChange={this.handleChange}
                required
              >
                {this.state.ranks.length > 0 ? (
                  this.state.ranks.map((r) => {
                    return (
                      <option key={r.id} value={r.id}>
                        {r.description}
                      </option>
                    );
                  })
                ) : (
                  <option value="no ranks">Ranks not available</option>
                )}
              </select>
              <label htmlFor="station">Duty Station</label>
              <select
                className="form-control my-2"
                id="station"
                name="station"
                defaultValue={this.state.user.station}
                required
              >
                {this.state.stations.length > 0 ? (
                  this.state.stations.map((r) => {
                    return (
                      <option key={r.id} value={r.id}>
                        {r.name + " (" + r.region + ")"}
                      </option>
                    );
                  })
                ) : (
                  <option value="not station">Stations not available</option>
                )}
              </select>
              <label htmlFor="username">Officer ID</label>
              <input
                className="my-2 form-control"
                id="username"
                name="username"
                defaultValue={this.state.user.username}
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
