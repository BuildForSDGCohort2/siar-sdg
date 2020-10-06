import React from "react";
import FileDetail from "./file_detail";
import FileItem from "./file_item";
import File from "./new_file";

class FileList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      filteredFiles: props.files,
      authenticated: props.authenticated,
      files: props.files,
      showForm: false,
      hasFeedback: false,
      feedback: null,
      closeMe: false,
      selectedFile: null,
    };
    this.handleSignout = this.handleSignout.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleNewFile = this.handleNewFile.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleFeedback = this.handleFeedback.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.updateFiles = this.updateFiles.bind(this);
    this.handleCloseDetail = this.handleCloseDetail.bind(this);
  }
  updateFiles(list) {
    this.setState({ files: list, filteredFiles: list }, () => {
      this.props.onUpdate(this.state.files);
      console.info("update in file_list: ", list);
    });
  }
  handleClick(id) {
    console.log("clicked id: ", id);
    let selectedFile = this.state.files.filter((f) => {
      return f.id === id;
    })[0];
    this.setState({ selectedFile: selectedFile });
  }
  handleCancel(state) {
    this.setState({ showForm: !state });
  }
  handleNewFile(e) {
    e.preventDefault();
    this.setState({ showForm: true });
  }
  handleFeedback(message, success) {
    this.setState({ feedback: message, hasFeedback: success });
  }
  handleSearch(e) {
    e.preventDefault();
    let search = e.target.value.toLowerCase();
    let result = this.state.files.filter((u) => {
      return (
        u.first_name.toLowerCase().includes(search) ||
        u.last_name.toLowerCase().includes(search) ||
        u.middle_name.toLowerCase().includes(search)
      );
    });
    this.setState({ filteredFiles: result });
  }
  handleCloseDetail() {
    this.setState({ selectedFile: null });
  }
  handleClose() {
    this.props.onFormClose();
  }
  handleSignout(e) {
    e.preventDefault();
    this.setState({ authenticated: false });
  }
  componentDidMount() {
    this.setState(
      { selectedFile: null, filteredFiles: this.state.files },
      () => {
        // if (this.state.files.length == 0) this.setState({ showForm: true });
      }
    );
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
          <File
            officers={this.props.officers}
            onFeedback={(msg, success) => this.handleFeedback(msg, success)}
            onUpdate={(list) => this.updateFiles(list)}
            currentUser={this.state.currentUser}
            onCancelForm={(state) => this.handleCancel(state)}
          />
        ) : this.state.selectedFile === null ? (
          <>
            <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between">
              <button
                className="btn btn-success col-sm-4 col-xs-4 col-md-2 col-lg-2 col-xl-2"
                onClick={this.handleNewFile}
              >
                New File
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
              {this.state.filteredFiles.length > 0 ? (
                this.state.filteredFiles.map((u) => {
                  return (
                    <FileItem
                      avatar={u.file_picture}
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
          <FileDetail
            onFeedback={(m, s) => this.handleFeedback(m, s)}
            file={this.state.selectedFile}
            officers={this.props.officers}
            currentUser={this.props.currentUser}
            onClose={this.handleCloseDetail}
            onUpdate={(list) => this.updateFiles(list)}
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
export default FileList;
