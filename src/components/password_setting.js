import React, { useState } from "react";
import { Alert, Spinner } from "react-bootstrap";
import config from "../config.json";

class PasswordSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: props.currentUser.username,
      password: "",
      cpassword: "",
      isLoading: false,
      passowrdMatch: true,
      hasError: false,
      feedback: null,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.savePassword = this.savePassword.bind(this);
  }

  savePassword(body) {
    fetch(config.api_url + "/auth/", {
      method: "post",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({
          feedback: response.msg,
          hasError: response.success == 1,
        });
      })
      .catch((e) => {
        console.error("error: ", e);
        this.setState({
          feedback: "Oops! Something went wrong!",
          hasError: true,
        });
      })
      .finally(() => {
        this.setState({ isLoading: false });
      });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let body = {
      username: this.state.userId,
      password: this.state.password,
      btnChangePassword: "Change",
    };
    this.savePassword(body);
  }
  handleChange(event) {
    // this.setState({ passowrdMatch: false });
    // event.preventDefault();
    let msg = document.getElementById("msg");
    let target = event.target;

    switch (target.id) {
      case "userid":
        this.setState({ userId: target.value });
        break;
      case "password":
        this.setState({ password: target.value }, () => {
          console.info("pw: ", this.state.password, "--" + target.value);
        });
        let cp = document.getElementById("cpassword");
        if (this.state.cpassword != target.value) {
          target.classList.remove("border-success");
          target.classList.add("border-danger");
          cp.classList.remove("border-success");
          cp.classList.add("border-danger");
          msg.classList.remove("invisible");
          this.setState({ passwordMatch: false });
        } else {
          this.setState({ passwordMatch: true }, () => {
            target.classList.remove("border-danger");
            target.classList.add("border-success");
            cp.classList.add("border-success");
            cp.classList.remove("border-danger");
            msg.classList.add("invisible");
          });
        }
        break;
      case "cpassword":
        let pwd = document.getElementById("password");
        this.setState({ cpassword: target.value });
        if (this.state.password != target.value) {
          target.classList.remove("border-success");
          target.classList.add("border-danger");
          pwd.classList.remove("border-success");
          pwd.classList.add("border-danger");
          msg.classList.remove("invisible");
          this.setState({ passwordMatch: false });
        } else {
          this.setState({ passwordMatch: true }, () => {
            target.classList.remove("border-danger");
            target.classList.add("border-success");
            pwd.classList.add("border-success");
            pwd.classList.remove("border-danger");
            msg.classList.add("invisible");
          });
        }
        break;
    }
  }
  render() {
    return (
      <div className="col-xl-8 col-lg-8 col-md-8 offset-xl-2 offset-lg-2 offset-md-2 col-xs-10 col-sm-10 offset-sm-1 offset-xm-1">
        {this.state.feedback !== null ? (
          <Alert
            onClose={() => {
              this.setState({ feedback: null });
            }}
            variant={this.state.hasError ? "danger" : "success"}
            className="my-2 py-2"
            dismissible
          >
            {this.state.feedback}
          </Alert>
        ) : null}
        <h3 className="my-3">Change Login Password</h3>
        <form
          onSubmit={this.handleSubmit}
          className="col-xl-6 col-lg-6 col-md-6 offset-xl-3 offset-lg-3 offset-md-3 col-xs-10 col-sm-10 offset-sm-1 offset-xm-1 text-left"
        >
          <div className="form-group">
            <label htmlFor="userid">Officer ID</label>
            {this.props.isAdmin ? (
              <select
                name="userid"
                id="userid"
                className="form-control"
                onChange={(e) => this.handleChange(e)}
                value={this.state.userId}
              >
                <option value="admin">Admin</option>
                {this.props.users.map((u) => {
                  return (
                    <option key={u.id} value={u.username}>
                      {u.username}
                    </option>
                  );
                })}
              </select>
            ) : (
              <input
                disabled
                type="text"
                name="userid"
                id="userid"
                className="form-control"
                value={this.state.userId}
              />
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control "
              defaultValue={this.state.password}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <span id="msg" className="text-danger py-2 invisible text-center">
            Passwords do not match
          </span>
          <div className="form-group">
            <label htmlFor="cpassword">Confirm Password</label>
            <input
              type="password"
              name="cpassword"
              id="cpassword"
              className={"form-control "}
              defaultValue={this.state.cpassword}
              onChange={(e) => this.handleChange(e)}
            />
          </div>
          <div className="row form-group offset-md-1 offset-xl-1 offset-lg-1 my-3 px-2">
            {this.state.passwordMatch ? (
              this.state.isLoading ? (
                <button className="btn btn-primary disabled my-2 mx-2 col-md-3 col-lg-3 col-xl-3">
                  <Spinner animation="border" variant="light" />
                </button>
              ) : (
                <input
                  type="submit"
                  name="btnSavePassword"
                  id="btnSavePassword"
                  className="btn btn-primary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                  value="SAVE"
                />
              )
            ) : null}
            <span className="col-md-4 col-lg-4 col-xl-4"></span>
            <input
              onClick={this.props.onClose}
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
export default PasswordSetting;
