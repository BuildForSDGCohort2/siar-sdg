import React from "react";

import config from "../config.json";
import { Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";
import OffenseForm from "./new_offense";

class FileEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      authenticated: true,
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      file: props.file,
      next: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateFile = this.updateFile.bind(this);
    this.readBase64 = this.readBase64.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    let el = e.target;
    var val = null;
    let file = this.state.file;
    if (el.id == "id_type") val = el.options[el.options.selectedIndex].value;
    if (el.id == "id_number") val = el.value;
    if (el.id == "first_name") val = el.value;
    if (el.id == "middle_name") val = el.value;
    if (el.id == "last_name") val = el.value;
    if (el.id == "phone") val = el.value;
    if (el.id == "email") val = el.value;
    if (el.id == "gender") val = el.options[el.options.selectedIndex].value;
    if (el.id == "ethnicity") val = el.value;
    if (el.id == "region_of_birth")
      val = el.options[el.options.selectedIndex].value;
    if (el.id == "district_of_birth") val = el.value;
    if (el.id == "ward_of_birth") val = el.value;
    if (el.id == "street_of_birth") val = el.value;
    if (el.id == "region_of_residence")
      val = el.options[el.options.selectedIndex].value;
    if (el.id == "district_of_residence") val = el.value;
    if (el.id == "ward_of_residence") val = el.value;
    if (el.id == "street_of_residence") val = el.value;
    if (el.id == "dob") val = el.value;

    file[el.id] = val;
    this.setState({ file: file });
  }
  handleCancel() {
    this.props.onClose();
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let data = this.state.file;
    delete data.case_officer_detail;
    delete data.attending_officer;
    delete data.offenses;
    delete data.age;
    data.officer_id = this.props.currentUser.id;
    data.btnUpdateFile = "submit";
    let profile = document.getElementById("file_picture");
    let fingerprint = document.getElementById("file_fingerprint");

    if (profile.files.length > 0) {
      this.readBase64(profile.files[0])
        .then((result) => {
          // console.info("base64 result: ", result);
          data.picture = result;

          if (fingerprint.files.length > 0) {
            this.readBase64(fingerprint.files[0])
              .then((result) => {
                console.info("base64 result: ", result);
                data.fingerprint = result;
                this.updateFile(data);
              })
              .catch((e) => {
                console.error("error: ", e);
              });
          } else this.updateFile(data);
        })
        .catch((e) => {
          console.error("error: ", e);
        });
    } else {
      if (fingerprint.files.length > 0) {
        this.readBase64(fingerprint.files[0])
          .then((result) => {
            // console.info("base64 result: ", result);
            data.fingerprint = result;
            this.updateFile(data);
          })
          .catch((e) => {
            console.error("error: ", e);
          });
      } else this.updateFile(data);
    }
  }
  readBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onError = (e) => reject(e);
    });
  }
  updateFile(data) {
    fetch(config.api_url + "/auth/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ isLoading: false });
        console.log("response: ", response);
        let feedback = response.msg;
        if (response.success == 0) {
          this.setState({ hasSuccessFeedback: true, feedback: feedback });
          this.props.onUpdate(response.files);
          this.handleCancel();
        } else {
          this.setState({ hasFailFeedback: true, feedback: response.msg });
        }
        this.props.onFeedback(feedback, this.state.hasSuccessFeedback);
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
  render() {
    if (this.state.next) {
      return <OffenseForm onCancelForm={this.handleFormClose} />;
    } else {
      return (
        <div className="my-2 col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1">
          <h3 className="my-4">Update Offender File</h3>
          <form
            className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
            onSubmit={this.handleSubmit}
          >
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left ">
                Personal Information
              </legend>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="id_type">ID Type</label>
                  <select
                    value={this.state.file.id_type}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="id_type"
                    name="id_type"
                    type="text"
                    required
                  >
                    <option>--Select ID Type--</option>
                    <option>National ID</option>
                    <option>Passport</option>
                    <option>Voter ID</option>
                    <option>Driving License</option>
                  </select>
                </div>{" "}
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="id_number">ID Number</label>
                  <input
                    value={this.state.file.id_number}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="id_number"
                    placeholder="ID Number"
                    name="id_number"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="first_name">First Name</label>
                  <input
                    value={this.state.file.first_name}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="first_name"
                    placeholder="First Name"
                    name="first_name"
                    type="text"
                    required
                  />
                </div>{" "}
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="last_name">Middle Name</label>
                  <input
                    value={this.state.file.middle_name}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="middle_name"
                    placeholder="Middle Name"
                    name="middle_name"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="middle_name">Last Name</label>
                  <input
                    value={this.state.file.last_name}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="last_name"
                    placeholder="Last Name"
                    name="last_name"
                    type="text"
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="gender">Gender</label>{" "}
                  <select
                    className="form-control my-2"
                    id="gender"
                    name="gender"
                    type="text"
                    required
                    value={this.state.file.gender}
                  >
                    <option>--Select Gender--</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="phone">Phone</label>
                  <input
                    value={this.state.file.phone}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    type="text"
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="email">Email</label>
                  <input
                    value={this.state.file.email}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="email"
                    placeholder="E-mail"
                    name="email"
                    type="email"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    value={this.state.file.dob}
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="dob"
                    placeholder="Date of Birth"
                    name="dob"
                    type="text"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Date of birth"
                  />
                </div>
              </div>
              <div className="row">
                <div className="text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <label htmlFor="file_picture">Change Profile Picture</label>
                  <input
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="file_picture"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Upload Profile Picture"
                    name="file_picture"
                    type="file"
                    accept="image/*"
                  />
                </div>
                <div className="text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <label htmlFor="file_fingerprint">Change Fingerprint</label>
                  <input
                    onChange={this.handleChange}
                    className="form-control my-2"
                    id="file_fingerprint"
                    placeholder="Date of Birth"
                    name="file_fingerprint"
                    type="file"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Upload Fingerprint"
                    accept="image/*"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="eduction">Eduction</label>
                  <select
                    value={this.state.file.education}
                    onChange={this.handleChange}
                    id="education"
                    name="education"
                    className="form-control"
                  >
                    <option>--Select Level of Education--</option>
                    <option>No school</option>
                    <option>Primary School</option>
                    <option>Secondary School</option>
                    <option>Higher Education</option>
                  </select>
                </div>
                <div className="col"></div>
              </div>
              <fieldset className="border p-2 my-5">
                <legend className="w-auto text-left small">
                  Place of Birth
                </legend>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                    <label htmlFor="region_of_birth">Region of Birth</label>
                    <select
                      value={this.state.file.region_of_birth}
                      onChange={this.handleChange}
                      className="form-control"
                      id="region_of_birth"
                      name="region_of_birth"
                    >
                      <option>--Select Region--</option>
                      {getCityNames("asc").map((c) => {
                        return <option key={c}>{c}</option>;
                      })}
                    </select>
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                    <label htmlFor="district_of_birth">District of Birth</label>
                    <input
                      value={this.state.file.district_of_birth}
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      id="district_of_birth"
                      name="district_of_birth"
                      placeholder="District"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                    <label htmlFor="ward_of_birth">Ward of Birth</label>
                    <input
                      value={this.state.file.ward_of_birth}
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      id="ward_of_birth"
                      name="ward_of_birth"
                      placeholder="Ward"
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                    <label htmlFor="Street_of_birth">Street of Birth</label>
                    <input
                      value={this.state.file.street_of_birth}
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      id="street_of_birth"
                      name="street_of_birth"
                      placeholder="Street"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                    <label htmlFor="ethnicity">Ethnicity/Tribe</label>
                    <input
                      value={this.state.file.ethnicity}
                      onChange={this.handleChange}
                      type="text"
                      className="form-control"
                      id="ethnicity"
                      name="ethnicity"
                      placeholder="Ethnicity/Tribe"
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left "></div>
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left ">Residential Address</legend>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="region_of_residence">
                    Region of Residence
                  </label>
                  <select
                    value={this.state.file.region_of_residence}
                    onChange={this.handleChange}
                    className="form-control"
                    id="region_of_residence"
                    name="region_of_residence"
                  >
                    <option>--Select Region--</option>
                    {getCityNames("asc").map((c) => {
                      return <option key={c}>{c}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="district_of_residence">
                    District of Residence
                  </label>
                  <input
                    value={this.state.file.district_of_residence}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="district_of_residence"
                    name="district_of_residence"
                    placeholder="District"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="ward_of_residence">Ward of Residence</label>
                  <input
                    value={this.state.file.ward_of_residence}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="ward_of_residence"
                    name="ward_of_residence"
                    placeholder="Ward"
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left ">
                  <label htmlFor="street_of_residence">
                    Street of Residence
                  </label>
                  <input
                    value={this.state.file.street_of_residence}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="street_of_residence"
                    name="street_of_residence"
                    placeholder="Street"
                  />
                </div>
              </div>
            </fieldset>

            <div className="row form-group offset-md-1 offset-xl-1 offset-lg-1 my-3 px-2">
              {this.state.isLoading ? (
                <button className="btn btn-primary disabled my-2 mx-2 col-md-3 col-lg-3 col-xl-3">
                  <Spinner animation="border" variant="light" />
                </button>
              ) : (
                <input
                  type="submit"
                  name="btnUpdateFile"
                  id="btnUpdateFile"
                  className="btn btn-primary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                  value="UPDATE"
                />
              )}
              <span className="col-md-4 col-lg-4 col-xl-4"></span>
              <input
                onClick={this.handleCancel}
                type="button"
                name="btnCancel"
                id="btnCancel"
                className="btn btn-secondary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                value="CANCEL"
              />
            </div>
          </form>
        </div>
      );
    }
  }
}

export default FileEdit;
