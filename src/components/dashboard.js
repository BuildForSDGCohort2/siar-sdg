import React from "react";
import UserList from "./user_list";
import LoginForm from "./login";
import config from "../config.json";
import FileList from "./file_list";
import { Badge } from "react-bootstrap";
import Reports from "./reports";
import Dialog from "./modal_dialog";
import Settings from "./settings";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      isAdmin: false,
      users: [],
      files: [],
      clickTarget: "Siar Project",
      hasFeedback: false,
      feedback: null,
      showDialog: false,
      isHome: true,
      newReports: [],
      reportTarget: "none",
      reportCount: 0,
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.showDialog = this.showDialog.bind(this);
    this.handleHomeClick = this.handleHomeClick.bind(this);
    this.getUnreadReports = this.getUnreadReports.bind(this);
    this.handleNotificationClick = this.handleNotificationClick.bind(this);
    this.updateReports = this.updateReports.bind(this);
  }
  updateReports(list) {
    let unread = list.filter((r) => {
      return r.is_read == 0;
    });
    this.setState({ newReports: list, reportCount: unread.length });
  }
  handleNotificationClick() {
    this.setState({
      clickTarget: "Reports",
      isHome: false,
      reportTarget: "anonymous",
    });
  }
  handleHomeClick() {
    this.handleFormClose();
    this.setState({ isHome: true });
  }
  updateUsers(usersList) {
    this.setState({ users: usersList });
  }
  updateFiles(files) {
    this.setState({ files: files }, () => {
      console.info("update in dashboard: ", files);
    });
  }
  handleFormClose() {
    this.setState({ clickTarget: "Siar Project" });
  }
  handleClick(e) {
    let id = e.target.id;
    this.setState({ clickTarget: id, isHome: false });
  }
  handleSignout() {
    // e.preventDefault();
    this.setState({ currentUser: null });
  }
  showDialog() {
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
        this.setState({ files: result.files });
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }
  getUnreadReports() {
    fetch(config.api_url + "/data/?reports=anonymous", {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        let unread = result.crimes.filter((r) => {
          console.log("cr: ", r.is_read);
          return r.is_read === "0";
        });
        this.setState({
          newReports: result.crimes,
          reportCount: unread.length,
        });
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }
  componentDidMount() {
    if (this.state.currentUser) {
      this.getUsers();
      this.getFiles();
      this.getUnreadReports();
    }
  }
  render() {
    if (this.state.currentUser == undefined || this.state.currentUser == null) {
      return <LoginForm target="dashboard" />;
    } else {
      return (
        <div>
          <div className="d-flex align-items-center justify-content-between bg-primary text-white py-3 px-4">
            {!this.state.isHome ? (
              <span className="text-white px-5" onClick={this.handleHomeClick}>
                <i className="material-icons text-white display-4">dashboard</i>
              </span>
            ) : (
              <span className=" notification-badge d-flex justify-content-center align-items-start">
                {this.state.reportCount > 0 ? (
                  <>
                    <i
                      className="material-icons"
                      onClick={this.handleNotificationClick}
                    >
                      notifications
                    </i>

                    <Badge pill variant="danger" className="badge">
                      {this.state.reportCount}
                    </Badge>
                  </>
                ) : null}{" "}
              </span>
            )}
            <h3>{this.state.clickTarget}</h3>
            <span
              className="btn border-white text-white"
              onClick={this.showDialog}
            >
              Sign Out
            </span>
          </div>
          {this.state.clickTarget == "Siar Project" ? (
            <>
              <div className="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
                {this.state.isAdmin ? (
                  <div
                    className="m-4 col-md-2 col-lg-2 col-xl-2 col-sm-4 col-xs-4 btn btn-primary"
                    id="Officers"
                    onClick={(event) => this.handleClick(event)}
                  >
                    <i id="Officers" className="material-icons display-4">
                      local_police
                    </i>
                    <br />
                    <span className="dispaly-4 my-2">Officers</span>
                  </div>
                ) : null}
                <div
                  className="m-4 col-md-2 col-lg-2 col-xl-2  col-sm-4 col-xs-4 btn btn-primary"
                  id="Files"
                  onClick={(event) => this.handleClick(event)}
                >
                  <i id="Files" className="material-icons display-4">
                    insert_drive_file
                  </i>
                  <br />
                  <span className="dispaly-4">Files</span>
                </div>
                <div
                  className="m-4 col-md-2 col-lg-2 col-xl-2  col-sm-4 col-xs-4 btn btn-primary"
                  id="Reports"
                  onClick={(event) => this.handleClick(event)}
                >
                  <i id="Reports" className="material-icons display-4">
                    assessment
                  </i>{" "}
                  <br />
                  <span className="dispaly-4">Reports</span>
                </div>
                <div
                  className="m-4 col-md-2 col-lg-2 col-xl-2  col-sm-4 col-xs-4 btn btn-primary"
                  id="Settings"
                  onClick={(event) => this.handleClick(event)}
                >
                  <i id="Settings" className="material-icons display-4">
                    settings
                  </i>
                  <br />
                  <span className="dispaly-4">Settings</span>
                </div>
              </div>
            </>
          ) : this.state.clickTarget == "Officers" ? (
            <UserList
              onUpdate={(users) => this.updateUsers(users)}
              onFormClose={() => this.handleFormClose()}
              users={this.state.users}
              currentUser={this.state.currentUser}
            />
          ) : this.state.clickTarget == "Files" ? (
            <FileList
              onUpdate={(files) => this.updateFiles(files)}
              onFormClose={() => this.handleFormClose()}
              files={this.state.files}
              officers={this.state.users}
              currentUser={this.state.currentUser}
            />
          ) : this.state.clickTarget == "Reports" ? (
            <Reports
              currentUser={this.state.currentUser}
              target={this.state.reportTarget}
              reports={this.state.newReports}
              onUpdateReports={(l) => {
                this.updateReports(l);
              }}
            />
          ) : (
            <Settings currentUser={this.state.currentUser} />
          )}
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
