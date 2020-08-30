import React from "react";
import UserItem from "./user_item";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      authenticated: props.authenticated,
      filteredUsers: props.users,
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(e) {
    e.preventDefault();
    let search = e.target.value;
    let result = this.props.users.filter((u) => {
      return u.name.toLowerCase().includes(search);
    });
    this.setState({ filteredUsers: result });
  }
  handleSignout(e) {
    e.preventDefault();
    this.setState({ authententicated: false });
  }
  render() {
    return (
      <div>
        <div className="bg-primary text-white py-4 px-4 text-right">
          <span className="text-white px-5">
            {this.state.currentUser.username}
          </span>
          <button
            className="btn btn-primary border-white text-white"
            data-toggle="modal"
            data-target="#signoutDialog"
          >
            Sign Out
          </button>
        </div>
        <div className="col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
          <input
            type="text"
            className="form-control col-md-8 col-lg-8 col-xl-8  offset-md-2 offset-lg-2 offset-xl-2 my-5"
            id="search"
            name="search"
            placeholder="search"
            onChange={this.handleSearch}
          />
          <button className="btn btn-success col-md-2 col-lg-2 col-xl-2">
            Add User
          </button>
        </div>
        <div className="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
          {this.state.filteredUsers.length > 0 ? (
            this.state.filteredUsers.map((u) => {
              return <UserItem avatar={u.avatar} name={u.name} key={u.id} />;
            })
          ) : (
            <span className="my-2 text-center">No Records Matched</span>
          )}
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
