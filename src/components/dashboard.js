import React from "react";
import UserList from "./user_list";
import avatar from "../images/avatar.jpg";
import LoginForm from "./login";

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: props.authenticated,
      currentUser: props.user,
      isAdmin: false,
      users: [],
      clickTarget: "none",
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleClick = this.handleClick.bind(this);
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

  componentDidMount() {
    let isAdmin = this.props.user.username === "admin";
    let users = [
      { id: 1, name: "Landry Kapela", avatar: avatar },
      { id: 3, name: "Tristan Landry", avatar: avatar },
      { id: 5, name: "Melanie Adanna", avatar: avatar },
      { id: 2, name: "Neema Nyanda", avatar: avatar },
      { id: 4, name: "Maureen Buyegi", avatar: avatar },
    ];
    this.setState({
      users: users,
      authenticated: this.props.authenticated,
      isAdmin: isAdmin,
    });
  }
  render() {
    if (!this.state.authenticated) {
      return <LoginForm />;
    } else {
      return (
        <div>
          {this.state.clickTarget == "none" ? (
            <>
              <div className="bg-primary text-white py-4 px-4 text-right">
                <span className="text-white px-5">
                  {this.props.user.username}
                </span>
                <button
                  className="btn btn-primary border-white text-white"
                  data-toggle="modal"
                  data-target="#signoutDialog"
                >
                  Sign Out
                </button>
              </div>
              <div className="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
                {this.state.isAdmin ? (
                  <div
                    className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary"
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
                  className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary"
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
                  className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary"
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
                  className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary"
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
              users={this.state.users}
              currentUser={this.state.currentUser}
              authenticated={this.state.authenticated}
            />
          ) : null}
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
}
export default Dashboard;
