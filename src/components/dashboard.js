import React from "react";
import UserList from "./user_list";
import LoginForm from "./login";
import config from "../config.json";
import FileList from "./file_list";
import ReportButton from "./report_button";
import Reports from "./reports";
import Dialog from "./modal_dialog";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      isAdmin: false,
      users: [],
      files: [],
      clickTarget: "none",
      hasFeedback: false,
      feedback: null,
      showDialog: false,
      isHome: true,
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
  }
  handleHomeClick() {
    this.handleFormClose();
    this.setState({ isHome: true });
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
    this.setState({ clickTarget: id, isHome: false }, () => {
      console.log("result: ", this.state.clickTarget);
    });
  }
  handleSignout() {
    // e.preventDefault();
    this.setState({ currentUser: null });
  }
  showDialog() {
    console.info("dialog");
    this.setState({ showDialog: true });
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
    if (this.state.currentUser == undefined || this.state.currentUser == null) {
      return <LoginForm target="dashboard" />;
    } else {
      return (
        <div>
          <div className="d-flex justify-content-between bg-primary text-white py-4 px-4">
            {!this.state.isHome ? (
              <span className="text-white px-5" onClick={this.handleHomeClick}>
                <i className="material-icons btn text-white display-4">home</i>
              </span>
            ) : null}
            <button
              className="btn btn-primary border-white text-white"
              onClick={this.showDialog}
            >
              Sign Out
            </button>
          </div>
          {this.state.clickTarget == "none" ? (
            <>
              <div className="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
                {this.state.isAdmin ? (
                  <div
                    className="m-4 col-md-2 col-lg-2 col-xl-2 col-sm-4 col-xs-4 btn btn-primary"
                    id="users"
                    onClick={(event) => this.handleClick(event)}
                  >
                    <i id="users" className="material-icons display-4">
                      people
                    </i>
                    <br />
                    <span className="dispaly-4 my-2">Users</span>
                  </div>
                ) : null}
                <div
                  className="m-4 col-md-2 col-lg-2 col-xl-2  col-sm-4 col-xs-4 btn btn-primary"
                  id="files"
                  onClick={(event) => this.handleClick(event)}
                >
                  <i id="files" className="material-icons display-4">
                    insert_drive_file
                  </i>
                  <br />
                  <span className="dispaly-4">Files</span>
                </div>
                <div
                  className="m-4 col-md-2 col-lg-2 col-xl-2  col-sm-4 col-xs-4 btn btn-primary"
                  id="reports"
                  onClick={(event) => this.handleClick(event)}
                >
                  <i id="reports" className="material-icons display-4">
                    assessment
                  </i>
                  <br />
                  <span className="dispaly-4">Reports</span>
                </div>
                <div
                  className="m-4 col-md-2 col-lg-2 col-xl-2  col-sm-4 col-xs-4 btn btn-primary"
                  id="settings"
                  onClick={(event) => this.handleClick(event)}
                >
                  <i id="settings" className="material-icons display-4">
                    settings
                  </i>
                  <br />
                  <span className="dispaly-4">Settings</span>
                </div>
              </div>
            </>
          ) : this.state.clickTarget == "users" ? (
            <UserList
              onUpdate={(users) => this.updateUsers(users)}
              onFormClose={() => this.handleFormClose()}
              users={this.state.users}
              currentUser={this.state.currentUser}
            />
          ) : this.state.clickTarget == "files" ? (
            <FileList
              onUpdate={(files) => this.updateFiles(files)}
              onFormClose={() => this.handleFormClose()}
              files={this.state.files}
              officers={this.state.users}
              currentUser={this.state.currentUser}
            />
          ) : this.state.clickTarget == "reports" ? (
            <Reports currentUser={this.state.currentUser} />
          ) : null}
          {this.state.showDialog ? (
            <Dialog
              show={this.state.showDialog}
              title="Confirm Sign Out"
              message="Are you sure you want to sign out?"
              action="Sign Out"
              onAction={this.handleSignout}
              onClose={() => this.setState({ showDialog: false })}
            />
          ) : null}
        </div>
      );
    }
  }
}
export default Dashboard;
