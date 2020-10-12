import React from "react";
import UserItem from "./user_item";
import UserForm from "./user_form";
import UserDetail from "./user_detail";
import config from "../config.json";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      authenticated: props.authenticated,
      filteredUsers: props.users,
      users: props.users,
      showForm: false,
      hasFeedback: false,
      feedback: null,
      closeMe: false,
      selectedUser: null,
      ranks: [],
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNewUser = this.handleNewUser.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateUsers = this.updateUsers.bind(this);
    this.handleCloseDetail = this.handleCloseDetail.bind(this);
    this.getRanks = this.getRanks.bind(this);
  }
  updateUsers(list) {
    this.setState({ filteredUsers: list, users: list }, () => {
      this.props.onUpdate(this.state.users);
    });
  }
  handleClick(id) {
    console.log("clicked id: ", id);
    let selectedUser = this.state.users.filter((u) => {
      return u.id === id;
    })[0];
    this.setState({ selectedUser: selectedUser });
  }
  handleCancel(state) {
    this.setState({ showForm: !state });
  }
  handleNewUser(e) {
    e.preventDefault();
    this.setState({ showForm: true });
  }
  handleFeedback(message, success) {
    this.setState({ feedback: message, hasFeedback: success });
  }
  handleSearch(e) {
    e.preventDefault();
    let search = e.target.value.toLowerCase();
    let result = this.state.users.filter((u) => {
      return (
        u.first_name.toLowerCase().includes(search) ||
        u.last_name.toLowerCase().includes(search) ||
        u.username.toLowerCase().includes(search)
      );
    });
    this.setState({ filteredUsers: result });
  }
  handleCloseDetail() {
    this.setState({ selectedUser: null });
  }
  handleClose() {
    this.props.onFormClose();
  }
  handleSignout(e) {
    e.preventDefault();
    this.setState({ authenticated: false });
  }
  getRanks() {
    fetch(config.api_url + "/data/?ranks=all", {
      method: "get",
      headers: {
        "Content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((response) => {
        let feedback = response.msg;
        if (response.success == 1) {
          this.setState({ hasFeedback: false, feedback: feedback }, () => {
            this.props.onFeedback(feedback, this.state.hasFeedback);
          });
        } else {
          this.setState({ ranks: response.ranks });
        }
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
  componentDidMount() {
    this.getRanks();
    this.setState({ selectedUser: null, filteredUsers: this.state.users });
  }
  render() {
    return (
      <div>
        {this.state.feedback !== null ? (
          <div
            className={
              "alert-" +
              (this.state.hasFeedback ? "success" : "danger") +
              " py-2"
            }
            role="alert"
          >
            {this.state.feedback}
            <button
              type="button"
              className="close"
              data-dismiss="alert"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
        ) : null}
        {this.state.showForm ? (
          <UserForm
            ranks={this.state.ranks}
            onFeedback={(msg, success) => this.handleFeedback(msg, success)}
            onUpdate={(list) => this.updateUsers(list)}
            currentUser={this.state.currentUser}
            onCancelForm={(state) => this.handleCancel(state)}
          />
        ) : this.state.selectedUser === null ? (
          <>
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between">
              <button
                className="btn btn-success col-sm-4 col-xs-4 col-md-2 col-lg-2 col-xl-2"
                onClick={this.handleNewUser}
              >
                New Officer
              </button>
              <i
                className="material-icons btn btn-danger  col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
                onClick={this.handleClose}
              >
                close
              </i>
            </div>
            <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
              <input
                type="text"
                className="form-control col-md-8 col-lg-8 col-xl-8  offset-md-2 offset-lg-2 offset-xl-2 my-5"
                id="search"
                name="search"
                placeholder="search"
                onChange={this.handleSearch}
              />
            </div>
            <div className="row col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
              {this.state.filteredUsers.length > 0 ? (
                this.state.filteredUsers.map((u) => {
                  return (
                    <UserItem
                      avatar={u.avatar}
                      name={u.first_name + " " + u.last_name}
                      key={u.id}
                      id={u.id}
                      onClick={(id) => this.handleClick(id)}
                    />
                  );
                })
              ) : (
                <span className="col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5 text-center">
                  No Records Matched
                </span>
              )}
            </div>
          </>
        ) : (
          <UserDetail
            ranks={this.state.ranks}
            onFeedback={(msg, success) => this.handleFeedback(msg, success)}
            user={this.state.selectedUser}
            onClose={this.handleCloseDetail}
            onUpdate={(u) => this.updateUsers(u)}
          />
        )}
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
                <form onSubmit={this.handleSignout}>
                  <button
                    type="button"
                    className="btn btn-secondary mx-2"
                    data-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Sign Out
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default UserList;
