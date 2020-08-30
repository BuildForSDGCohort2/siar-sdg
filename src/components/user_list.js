import React from "react";
import UserItem from "./user_item";

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { signout: false, authenticated: props.authenticated };
    this.handleSignout = this.handleSignout.bind(this);
  }
  handleSignout(e) {
    e.preventDefault();
    this.setState({ signout: true }, () => {
      if (this.state.signout) this.props.history.push("/signin");
    });
  }
  render() {
    return (
      <div>
        <div className="bg-primary text-white py-4 px-4 text-right">
          <button
            className="btn btn-primary border-white text-white"
            data-toggle="modal"
            data-target="#signoutDialog"
          >
            Sign Out
          </button>
        </div>
        <div className="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
          {this.props.users.forEach((u) => {
            return <UserItem avatar={u.avatar} name={u.name} />;
          })}
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
                    className="btn btn-secondary"
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
