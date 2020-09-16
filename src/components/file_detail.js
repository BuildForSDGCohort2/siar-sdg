import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";
import OffenseForm from "./new_offense";
import OffenseCard from "./offense_card";
import OffenseEdit from "./edit_offense";
import FileEdit from "./file_edit";
// import FileEdit from "./file_edit";

class FileDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      feedback: null,
      showEdit: false,
      showOffenseForm: false,
      file: props.file,
      offenseToEdit: null,
    };
    this.handleEditButton = this.handleEditButton.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.showEditOffenseForm = this.showEditOffenseForm.bind(this);
  }
  handleUpdate(u) {
    let file = u.filter((f) => {
      return f.id == this.state.file.id;
    })[0];
    this.setState({ file: file }, () => {
      this.props.onUpdate(u);
    });
  }
  closeForm(tag) {
    if (tag == "offense") this.setState({ showOffenseForm: false });
    if (tag == "file_edit") this.setState({ showEdit: false });
    if (tag == "offense_edit") this.setState({ showEditOffenseForm: false });
  }

  handleClick() {
    this.setState({ showOffenseForm: true });
  }
  showEditOffenseForm(offense) {
    this.setState({ showEditOffenseForm: true, offenseToEdit: offense });
  }
  handleCancel() {
    this.props.onCancelForm(true);
  }
  handleEditButton() {
    this.setState({ showEdit: true });
  }
  render() {
    if (this.state.showOffenseForm) {
      return (
        <OffenseForm
          currentUser={this.state.currentUser}
          file={this.state.file}
          officers={this.props.officers}
          onClose={() => this.closeForm("offense")}
          onUpdate={(u) => this.handleUpdate(u)}
          onFeedback={(s, m) => {
            this.props.onFeedback(s, m);
          }}
        />
      );
    } else {
      if (this.state.showEdit) {
        return (
          <FileEdit
            currentUser={this.state.currentUser}
            file={this.state.file}
            onClose={() => this.closeForm("file_edit")}
            onUpdate={(u) => this.handleUpdate(u)}
            onFeedback={(s, m) => {
              this.props.onFeedback(s, m);
            }}
          />
        );
      } else {
        if (this.state.showEditOffenseForm) {
          return (
            <OffenseEdit
              data={this.state.offenseToEdit}
              officers={this.props.officers}
              onFeedback={(msg, success) => this.props.onFeedback(msg, success)}
              onUpdate={(list) => this.props.onUpdate(list)}
              currentUser={this.state.currentUser}
              onClose={() => this.closeForm("offense_edit")}
            />
          );
        } else {
          return (
            <div className="container-fluid">
              <div className="row col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1  my-5 d-flex justify-content-between">
                <button
                  className="btn btn-success col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
                  onClick={this.handleEditButton}
                >
                  Edit
                </button>

                <i
                  className="material-icons btn btn-danger  col-sm-2 col-xm-2 col-md-1 col-lg-1 col-xl-1"
                  onClick={this.props.onClose}
                >
                  close
                </i>
              </div>
              <div className="row col-xs-12 col-sm-12 col-md-10 offset-md-1 col-lg-10 offset-lg-1 col-xl-10 offset-xl-1  my-5 d-flex justify-content-between">
                <div className="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 border py-5 text-left">
                  <div className="text-center">
                    <img
                      src={
                        config.api_url +
                        "/data/profiles/" +
                        this.state.file.file_picture
                      }
                      className="avatar border rounded-circle m-2"
                      alt="user avatar"
                    />
                  </div>
                  <div className="p-2">
                    <span className="text-right">Full Name: </span>
                    <p className="text-primary my-2 text-left">
                      {this.state.file.first_name +
                        " " +
                        this.state.file.middle_name +
                        " " +
                        this.state.file.last_name}
                    </p>
                    <span className="text-right">Gender:</span>
                    <p className="text-primary my-2 text-left">
                      {this.state.file.gender}
                    </p>
                    <span className="text-right">ID Type: </span>
                    <p className="text-primary my-2 text-left">
                      {this.state.file.id_type +
                        " (" +
                        this.state.file.id_number +
                        ") "}
                    </p>
                    <span className="text-right">Fingerprints: </span>
                    <a
                      target="_blank"
                      href={
                        config.api_url +
                        "/data/prints/" +
                        this.state.file.file_fingerprint
                      }
                    >
                      View Fingerprint
                    </a>
                  </div>

                  <div className="p-2">
                    <span className="text-right">Birth: </span>
                    <p className="text-primary my-2 text-left">
                      {"Born on " +
                        this.state.file.dob +
                        " in " +
                        this.state.file.district_of_birth +
                        ", " +
                        this.state.file.region_of_birth +
                        " region from the tribe of " +
                        this.state.file.ethnicity}
                    </p>
                    <p></p>
                  </div>
                  <div className="p-2">
                    <span className="text-right">Residence Address: </span>
                    <p className="text-primary my-2 text-left">
                      {this.state.file.street_of_residence +
                        " Street, Ward: " +
                        this.state.file.ward_of_residence +
                        " in " +
                        this.state.file.district_of_residence +
                        " " +
                        this.state.file.region_of_residence}
                    </p>
                  </div>
                  <div className="p-2">
                    <span className="text-right">Contact: </span>
                    <span
                      className="text-primary my-2 text-left"
                      id="phone"
                      name="phone"
                    >
                      {"Phone: " +
                        this.state.file.phone +
                        " | Email: " +
                        this.state.file.email}
                    </span>
                  </div>

                  <div>
                    <span className="text-right">Duty Officer: </span>
                    <span
                      className="text-primary my-2 text-left"
                      id="officer"
                      name="officer"
                    >
                      {this.state.file.attending_officer.username}
                    </span>
                  </div>
                </div>
                <div className="text-left col-md-8 col-lg-8 col-xl-8 col-sm-12 col-sx-12 border px-0 text-center">
                  <h3 className="bg-primary text-center p-2 text-white">
                    Criminal Records
                  </h3>
                  {this.state.file.offenses.length == 0 ? (
                    <p className="m-3">No Records</p>
                  ) : (
                    this.state.file.offenses.map((off) => {
                      return (
                        <OffenseCard
                          key={off.id}
                          data={off}
                          onClose={this.closeForm}
                          showOffenseForm={() => this.showEditOffenseForm(off)}
                        />
                      );
                    })
                  )}
                  <button
                    className="btn btn-primary m-5"
                    onClick={this.handleClick}
                  >
                    Add Record
                  </button>
                </div>
              </div>
            </div>
          );
        }
      }
    }
  }
}
export default FileDetail;
