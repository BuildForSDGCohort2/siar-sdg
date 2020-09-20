import React from "react";
import UserList from "./user_list";
import LoginForm from "./login";
import config from "../config.json";
import FileList from "./file_list";
import ReportButton from "./report_button";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.user,
      isAdmin: true,

      hasFeedback: false,
      feedback: null,
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
  }
  updateUsers(usersList) {
    this.setState({ users: usersList });
  }
  updateFiles(files) {
    this.setState({ files: files });
  }
  handleFormClose() {
    this.setState({ clickTarget: "none" });
  }
  handleClick(e) {
    console.log("test: ", e.target.id);
    let id = e.target.id;
    this.setState({ clickTarget: id }, () => {
      console.log("result: ", this.state.clickTarget);
    });
  }
  handleSignout(e) {
    e.preventDefault();
    this.setState({ authenticated: false });
  }
  getUsers() {
    fetch(config.api_url + "/data/?user=all", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("users: ", response);
        if (response.success == 0) {
          let users = response.users;
          let isAdmin = false;
          if (
            this.state.currentUser != null ||
            this.state.currentUser != undefined
          ) {
            if (this.state.currentUser.username === "admin") isAdmin = true;
          }
          if (users.length > 0) {
            users = users.filter((u) => {
              return u.username != "admin";
            });
          }
          this.setState({
            users: users,
            isAdmin: isAdmin,
          });
        }
      })
      .catch((error) => {
        this.setState({ feedback: "Cannot retrieve list of users" });
      });
  }
  getFiles() {
    fetch(config.api_url + "/data/?files=all", {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("files: ", result.files);
        this.setState({ files: result.files });
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }
  componentDidMount() {
    console.log("usr: ", this.state.currentUser);
    this.getUsers();
    this.getFiles();
  }
  render() {
    return (
      <div>
        <div className="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex  justify-content-between">
          <ReportButton
            text="Summary of crimes anonymously reported"
            icon="assignment"
          />
          <ReportButton text="Report of Crimes by Category" icon="grading" />
          <ReportButton
            text="Files pending prosecution"
            icon="pending_actions"
          />
        </div>

        <div
          className="modal fade"
          id="signoutDialog"
          tabIndex="-1"
          role="dialog"
          aria-labelledby="signoutDialogLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="signoutDialogLabel">
                  Confirm Signout
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Are you sure you want to sign out now?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary mx-2"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={this.handleSignout}
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Reports;
