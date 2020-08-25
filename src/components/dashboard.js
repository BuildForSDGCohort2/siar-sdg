import React from "react";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div className="bg-primary text-white py-4 px-4 text-right">
          <button
            class="btn btn-primary border-white text-white"
            data-toggle="modal"
            data-target="#signoutDialog"
          >
            Sign Out
          </button>
        </div>
        <div class="row col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
          <div className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary">
            <i class="material-icons display-4">people</i>
            <br />
            <span className="dispaly-4">Users</span>
          </div>
          <div className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary">
            <i class="material-icons display-4">insert_drive_file</i>
            <br />
            <span className="dispaly-4">Files</span>
          </div>
          <div className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary">
            <i class="material-icons display-4">assessment</i>
            <br />
            <span className="dispaly-4">Reports</span>
          </div>
          <div className="m-4 col-md-2 col-lg-2 col-xl-2 btn btn-primary">
            <i class="material-icons display-4">settings</i>
            <br />
            <span className="dispaly-4">Settings</span>
          </div>
        </div>
        <div
          class="modal fade"
          id="signoutDialog"
          tabindex="-1"
          role="dialog"
          aria-labelledby="signoutDialogLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog" role="document">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="signoutDialogLabel">
                  Confirm Signout
                </h5>
                <button
                  type="button"
                  class="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div class="modal-body">
                Are you sure you want to sign out now?
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-secondary"
                  data-dismiss="modal"
                >
                  Cancel
                </button>
                <button type="button" class="btn btn-primary">
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
export default Dashboard;
