import React from "react";
import LoginForm from "./login";
import config from "../config.json";
import ReportButton from "./report_button";
import ReportList from "./report_list";
import CategoryReport from "./category_report";
import FileReportList from "./files_report_list";

class Reports extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      isAdmin: false,
      anonymousReport: [],
      files: [],
      clickTarget: "none",
      hasFeedback: false,
      feedback: null,
      dppFiles: [],
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.getAnonymousReports = this.getAnonymousReports.bind(this);
    this.getFilesForDpp = this.getFilesForDpp.bind(this);
  }
  getFilesForDpp() {
    console.info("dpp files: ", this.state.files);
    let dppFiles = this.state.files.filter((file) => {
      return file.status.toLowerCase() === "prosecution";
    });
    console.info("dpp: ", dppFiles);
    this.setState({ dppFiles: dppFiles });
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
  handleClick(id) {
    if (id === "dpp") this.getFilesForDpp();
    this.setState({ clickTarget: id });
  }
  handleSignout(e) {
    e.preventDefault();
    this.setState({ currentUser: null });
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
        if (response.success === 0) {
          let users = response.users;
          let isAdmin = false;
          if (
            this.state.currentUser !== null ||
            this.state.currentUser !== undefined
          ) {
            if (this.state.currentUser.username === "admin") isAdmin = true;
          }
          if (users.length > 0) {
            users = users.filter((u) => {
              return u.username !== "admin";
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
    fetch(config.api_url + "/data/?offenses=all", {
      method: "get",
      headers: { "content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("files: ", result.data);

        this.setState({ files: result.data });
      })
      .catch((e) => {
        console.log("error: ", e);
      });
  }
  getAnonymousReports() {
    fetch(config.api_url + "/data/?reports=anonymous", {
      method: "get",
      headers: { "Content-type": "application/json" },
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result: ", result);
        this.setState({ anonymousReport: result.crimes });
      })
      .catch((error) => {
        console.error("fetch: ", error);
        this.setState({ hasFeedback: false, feedback: "An error occured" });
      });
  }
  componentDidMount() {
    console.log("usr: ", this.state.currentUser);
    this.getAnonymousReports();
    // this.getUsers();
    this.getFiles();
  }
  render() {
    if (
      this.state.currentUser === null ||
      this.state.currentUser === undefined
    ) {
      return <LoginForm target="reports" />;
    } else {
      if (this.state.clickTarget === "anonymous") {
        return (
          <ReportList
            data={this.state.anonymousReport}
            currentUser={this.state.currentUser}
            onClose={this.handleFormClose}
          />
        );
      } else if (this.state.clickTarget === "category") {
        return (
          <CategoryReport
            data={this.state.files}
            currentUser={this.state.currentUser}
            onClose={this.handleFormClose}
          />
        );
      } else if (this.state.clickTarget === "dpp") {
        return (
          <FileReportList
            data={this.state.dppFiles}
            currentUser={this.state.currentUser}
            onClose={this.handleFormClose}
          />
        );
      }
      return (
        <>
          {this.state.feedback !== null ? (
            <div
              className={
                "alert-" +
                (this.state.hasFeedback ? "success" : "danger") +
                " py-2 my-2 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1 col-xs-10 col-sm-10 col-md-8 col-lg-8 col-xl-8"
              }
            >
              {this.state.feedback}
            </div>
          ) : null}
          <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex  justify-content-between">
            <ReportButton
              id="anonymous"
              onClick={(id) => this.handleClick(id)}
              text="Summary of crimes anonymously reported"
              icon="assignment"
            />
            <ReportButton
              id="category"
              text="Report of Crimes by Category"
              icon="grading"
              onClick={(id) => this.handleClick(id)}
            />
            <ReportButton
              id="dpp"
              text="Files Sent to DPP"
              icon="exit_to_app"
              onClick={(id) => this.handleClick(id)}
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
        </>
      );
    }
  }
}
export default Reports;
