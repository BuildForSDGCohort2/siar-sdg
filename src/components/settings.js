import React from "react";
import LoginForm from "./login";
import config from "../config.json";
import ReportButton from "./report_button";
import ReportList from "./report_list";
import CategoryReport from "./category_report";
import FileReportList from "./files_report_list";
import PasswordSetting from "./password_setting";
import PoliceStation from "./police_station_form";
import PoliceStationList from "./police_station_list";

class Settings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      isAdmin: props.currentUser.username === "admin",
      anonymousReport: [],
      files: [],
      stations: [],
      clickTarget: "none",
      hasFeedback: false,
      feedback: null,
      dppFiles: [],
      users: [],
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.handleFormClose = this.handleFormClose.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.getAnonymousReports = this.getAnonymousReports.bind(this);
    this.getFilesForDpp = this.getFilesForDpp.bind(this);
    this.getStations = this.getStations.bind(this);
    this.updateStations = this.updateStations.bind(this);
  }
  updateStations(list) {
    this.setState({ stations: list });
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
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === 0) {
          let users = response.users;

          this.setState({
            users: users,
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
      mode: "no-cors",
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
      mode: "no-cors",
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
  getStations() {
    fetch(config.api_url + "/data/?stations=all", {
      method: "get",
      mode: "no-cors",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success === 0) {
          let stations = response.stations;

          this.setState({
            stations: stations,
          });
        }
      })
      .catch((error) => {
        this.setState({
          feedback: "Cannot retrieve list of stations " + error,
        });
      });
  }
  componentDidMount() {
    console.log("usr: ", this.state.currentUser);
    this.getAnonymousReports();
    this.getUsers();
    this.getFiles();
    this.getStations();
  }
  render() {
    if (
      this.state.currentUser === null ||
      this.state.currentUser === undefined
    ) {
      return <LoginForm target="settings" />;
    } else {
      if (this.state.clickTarget === "password") {
        return (
          <PasswordSetting
            users={this.state.users}
            isAdmin={this.state.isAdmin}
            currentUser={this.state.currentUser}
            onClose={this.handleFormClose}
          />
        );
      } else if (this.state.clickTarget === "stations") {
        return (
          <PoliceStation
            officers={this.state.users}
            currentUser={this.state.currentUser}
            onCancelForm={this.handleFormClose}
            onUpdate={(list) => this.updateStations(list)}
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
      } else if (this.state.clickTarget === "station_list") {
        return (
          <PoliceStationList
            data={this.state.stations}
            currentUser={this.state.currentUser}
            onClose={this.handleFormClose}
            officers={this.state.users}
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
              id="password"
              onClick={(id) => this.handleClick(id)}
              text="Change your login password"
              icon="lock"
            />
            <ReportButton
              id="stations"
              text="Manage Police Stations"
              icon="apartment"
              onClick={(id) => this.handleClick(id)}
            />
            <ReportButton
              id="station_list"
              text="View List of Police Stations"
              icon="stars"
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
export default Settings;
