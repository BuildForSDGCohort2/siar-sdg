import React from "react";

import avatar from "../images/avatar.jpg";
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
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      feedback: null,
      ranks: props.ranks,
      stations: props.stations,
      avatar: avatar,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.signup = this.signup.bind(this);
    this.previewImage = this.previewImage.bind(this);
    this.readBase64 = this.readBase64.bind(this);
  }
  previewImage(e) {
    let target = e.target;
    let preview = document.getElementById("avatar");
    if (target.files && target.files.length > 0) {
      this.readBase64(target.files[0])
        .then((result) => {
          preview.src = result;
          this.setState({ avatar: result });
        })
        .catch((e) => {
          console.error("error uploading file: ", e);
        });
    }
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
    let el = document.getElementById("ranking");
    let ranking = el.options[el.options.selectedIndex].value;
    let stationEl = document.getElementById("station");
    let station = stationEl.options[stationEl.options.selectedIndex].value;
    let body = {
      username: username,
      password: password,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      station: station,
      ranking: ranking,
      avatar: this.state.avatar,
      btnRegister: "register",
    };
    console.log("body: ", body);
    this.signup(body);
  }

  signup(user) {
    fetch(config.api_url + "/auth/", {
      method: "post",
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
      <div className="my-2 col-md-8 col-lg-8 col-xl-8 col-sm-10 col-sx-10 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1">
        <img
          src={avatar}
          className="avatar border rounded-circle"
          alt="Officer Picture"
          id="avatar"
        />
        {this.state.feedback !== null ? (
          <div
            className={
              "alert-" +
              (this.state.hasFailFeedback ? "danger" : "success") +
              " py-2 my-2 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1"
            }
          >
            {this.state.feedback}
          </div>
        ) : null}
        <form
          className="col-md-8 col-lg-8 col-xl-8 col-sm-10 col-sx-10 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1"
          onSubmit={this.handleSubmit}
        >
          <input
            accept="image/*"
            type="file"
            id="file_avatar"
            name="file_avatar"
            className="form-control my-2"
            onChange={this.previewImage}
          />
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
          <div className="text-left">
            <label htmlFor="ranking">Select Officer Rank</label>
            <select
              className="form-control my-2"
              id="ranking"
              name="ranking"
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
          </div>
          <div className="text-left">
            <label htmlFor="station">Select Duty Station</label>
            <select
              className="form-control my-2"
              id="station"
              name="station"
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
          </div>
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
                value="ADD OFFICER"
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
