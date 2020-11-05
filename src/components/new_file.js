import React from "react";

import config from "../config.json";
import { Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";
import OffenseForm from "./new_offense";

class File extends React.Component {
  constructor(props) {
    super(props);
    let offenses = [
      { id: 0, name: "Armed Robbery" },
      { id: 1, name: "Assault" },
      { id: 2, name: "Domestic Violence" },
      { id: 3, name: "Child Abuse" },
      { id: 4, name: "Illegal Possession of Fire Arm" },
      { id: 5, name: "Trespassing" },
      { id: 6, name: "Fraud" },
      { id: 7, name: "Economic Sabbotage" },
      { id: 8, name: "Cyber Crime" },
      { id: 9, name: "Murder" },
    ];
    // console.log("cities: ", getCityNames("asc"));
    this.state = {
      authenticated: true,
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      offenses: offenses,
      next: false,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.createFile = this.createFile.bind(this);
    this.readBase64 = this.readBase64.bind(this);
  }
  handleCancel() {
    this.props.onCancelForm(true);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let inputs = Array.from(event.target);

    console.log("inputs: ", inputs);
    let data = {
      officer_id: this.state.currentUser.id,
      id_type: inputs[1].options[inputs[1].options.selectedIndex].value,
      id_number: inputs[2].value,
      first_name: inputs[3].value,
      middle_name: inputs[4].value,
      last_name: inputs[5].value,
      gender: inputs[6].options[inputs[6].options.selectedIndex].value,
      phone: inputs[7].value,
      email: inputs[8].value,
      dob: inputs[9].value,
      file_picture: null,
      file_fingerprint: null,
      education: inputs[12].options[inputs[12].options.selectedIndex].value,
      region_of_birth:
        inputs[14].options[inputs[14].options.selectedIndex].value,
      district_of_birth: inputs[15].value,
      ward_of_birth: inputs[16].value,
      street_of_birth: inputs[17].value,
      ethnicity: inputs[18].value,
      region_of_residence:
        inputs[20].options[inputs[20].options.selectedIndex].value,
      district_of_residence: inputs[21].value,
      ward_of_residence: inputs[22].value,
      street_of_residence: inputs[23].value,
    };
    if (inputs[10].files) {
      this.readBase64(inputs[10].files[0])
        .then((result) => {
          // console.info("base64 result: ", result);
          data.file_picture = result;
          data.btnCreateFile = "new_file";
          if (inputs[11].files) {
            this.readBase64(inputs[11].files[0])
              .then((result) => {
                console.info("base64 result: ", result);
                data.file_fingerprint = result;
                this.createFile(data);
              })
              .catch((e) => {
                console.error("error: ", e);
              });
          } else this.createFile(data);
        })
        .catch((e) => {
          console.error("error: ", e);
        });
    } else {
      if (inputs[11].files) {
        this.readBase64(inputs[11].files[0])
          .then((result) => {
            // console.info("base64 result: ", result);
            data.file_fingerprint = result;
            this.createFile(data);
          })
          .catch((e) => {
            console.error("error: ", e);
          });
      } else this.createFile(data);
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
  createFile(data) {
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
        if (response.success === 0) {
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
          <h3 className="my-4">New Offender File</h3>
          <form
            className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
            onSubmit={this.handleSubmit}
          >
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left ">
                Personal Information
              </legend>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <select
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
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    className="form-control my-2"
                    id="id_number"
                    placeholder="ID Number"
                    name="id_number"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    className="form-control my-2"
                    id="first_name"
                    placeholder="First Name"
                    name="first_name"
                    type="text"
                    required
                  />
                </div>{" "}
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    className="form-control my-2"
                    id="middle_name"
                    placeholder="Middle Name"
                    name="middle_name"
                    type="text"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    className="form-control my-2"
                    id="last_name"
                    placeholder="Last Name"
                    name="last_name"
                    type="text"
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <select
                    className="form-control my-2"
                    id="gender"
                    name="gender"
                    type="text"
                    required
                  >
                    <option>--Select Gender--</option>
                    <option>Female</option>
                    <option>Male</option>
                  </select>
                </div>{" "}
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    className="form-control my-2"
                    id="phone"
                    placeholder="Phone Number"
                    name="phone"
                    type="text"
                    required
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    className="form-control my-2"
                    id="email"
                    placeholder="E-mail"
                    name="email"
                    type="email"
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left">
                  <label htmlFor="dob">Date of Birth</label>
                  <input
                    className="form-control my-2"
                    id="dob"
                    placeholder="Date of Birth"
                    name="dob"
                    type="date"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Date of birth"
                  />
                </div>
              </div>
              <div className="row">
                <div className="text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <label htmlFor="file_picture">Upload Profile Picture</label>
                  <input
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
                  <label htmlFor="file_fingerprint">Upload Fingerprint</label>
                  <input
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
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <select
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
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                    <select
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
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                    <input
                      type="text"
                      className="form-control"
                      id="district_of_birth"
                      name="district_of_birth"
                      placeholder="District"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                    <input
                      type="text"
                      className="form-control"
                      id="ward_of_birth"
                      name="ward_of_birth"
                      placeholder="Ward"
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                    <input
                      type="text"
                      className="form-control"
                      id="street_of_birth"
                      name="street_of_birth"
                      placeholder="Street"
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                    <input
                      type="text"
                      className="form-control"
                      id="ethnicity"
                      name="ethnicity"
                      placeholder="Ethnicity/Tribe"
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2"></div>
                </div>
              </fieldset>
            </fieldset>
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left ">Residential Address</legend>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <select
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
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="district_of_residence"
                    name="district_of_residence"
                    placeholder="District"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="ward_of_residence"
                    name="ward_of_residence"
                    placeholder="Ward"
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
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
                  name="btnRegister"
                  id="btnRegister"
                  className="btn btn-primary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                  value="PROCEED"
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

export default File;
