import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";

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
      user: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      feedback: null,
      offenses: offenses,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.signup = this.signup.bind(this);
  }
  handleCancel() {
    this.props.onCancelForm(true);
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let first_name = document.getElementById("first_name").value;
    let middle_name = document.getElementById("middle_name").value;
    let last_name = document.getElementById("last_name").value;
    let phone = document.getElementById("phone").value;
    let email = document.getElementById("email").value;
    // let password = document.getElementById("password").value;
    let body = {
      username: username,
      password: password,
      first_name: first_name,
      middle_name: middle_name,
      last_name: last_name,
      phone: phone,
      email: email,
      btnRegister: "register",
    };
    console.log("body: ", body);
    this.signup(body);
  }
  signup(user) {
    fetch(config.api_url + "/auth/", {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((response) => {
        this.setState({ isLoading: false });
        console.log("response: ", response);
        let feedback = response.msg;
        if (response.success == 0) {
          this.setState({ hasSuccessFeedback: true, feedback: feedback });
          this.props.onUpdate(response.users);
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
    return (
      <div className="my-2 col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1">
        <h3 className="my-4">New Offender Form</h3>

        {this.state.feedback !== null ? (
          <div
            className={
              "alert-" +
              (this.state.hasFailFeedback ? "danger" : "success") +
              " py-2 my-2 offset-md-2 offset-lg-2 offset-xl-2 offset-xs-1 offset-sm-1"
            }
          >
            {this.state.feedback}
          </div>
        ) : null}
        <form
          className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
          onSubmit={this.handleSubmit}
        >
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">Personal Information</legend>
            <div className="row">
              <div className="col py-2">
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
              <div className="col py-2">
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
              <div className="col py-2">
                <input
                  className="form-control my-2"
                  id="first_name"
                  placeholder="First Name"
                  name="first_name"
                  type="text"
                  required
                />
              </div>{" "}
              <div className="col py-2">
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
              <div className="col py-2">
                <input
                  className="form-control my-2"
                  id="last_name"
                  placeholder="Last Name"
                  name="last_name"
                  type="text"
                  required
                />
              </div>{" "}
              <div className="col py-2">
                <input
                  className="form-control my-2"
                  id="phone"
                  placeholder="Phone Number"
                  name="phone"
                  type="text"
                  required
                />
              </div>
            </div>
            <div className="row">
              <div className="col py-2">
                <input
                  className="form-control my-2"
                  id="email"
                  placeholder="E-mail"
                  name="email"
                  type="email"
                />
              </div>
              <div className="col py-2">
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
              <div className="col py-2">
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
              <legend className="w-auto text-left small">Place of Birth</legend>
              <div className="row">
                <div className="col py-2">
                  <select
                    className="form-control"
                    id="city_of_birth"
                    name="city_of_birth"
                  >
                    <option>--Select Region--</option>
                    {getCityNames("asc").map((c) => {
                      return <option key={c}>{c}</option>;
                    })}
                  </select>
                </div>
                <div className="col py-2">
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
                <div className="col py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="ward_of_birth"
                    name="ward_of_birth"
                    placeholder="Ward"
                  />
                </div>
                <div className="col py-2">
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
                <div className="col py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="ethnicity"
                    name="ethnicity"
                    placeholder="Ethnicity/Tribe"
                  />
                </div>
                <div className="col"></div>
              </div>
            </fieldset>
          </fieldset>
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">Residential Address</legend>
            <div className="row">
              <div className="col py-2">
                <select className="form-control" id="city" name="city">
                  <option>--Select Region--</option>
                  {getCityNames("asc").map((c) => {
                    return <option key={c}>{c}</option>;
                  })}
                </select>
              </div>
              <div className="col py-2">
                <input
                  type="text"
                  className="form-control"
                  id="district"
                  name="district"
                  placeholder="District"
                />
              </div>
            </div>
            <div className="row">
              <div className="col py-2">
                <input
                  type="text"
                  className="form-control"
                  id="ward"
                  name="ward"
                  placeholder="Ward"
                />
              </div>
              <div className="col py-2">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  placeholder="Street"
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">Charges/Offenses</legend>
            <select id="offense" name="offense" className="form-control">
              <option>--Select Offense--</option>
              {this.state.offenses.map((of) => {
                return (
                  <option key={of.id} value={of.id}>
                    {of.name}
                  </option>
                );
              })}
            </select>
            <div className="form-group">
              <label htmlFor="description" className="text-left">
                Description
              </label>
              <textarea
                id="description"
                name="textarea"
                className="form-control"
              ></textarea>
            </div>
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left small">
                Crime Area/Location
              </legend>
              <div className="row">
                <div className="col py-2">
                  <select
                    className="form-control"
                    id="city_of_crime"
                    name="city_of_crime"
                  >
                    <option>--Select Region--</option>
                    {getCityNames("asc").map((c) => {
                      return <option key={c}>{c}</option>;
                    })}
                  </select>
                </div>
                <div className="col py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="district_of_crime"
                    name="district_of_crime"
                    placeholder="District"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="ward_of_crime"
                    name="ward_of_crime"
                    placeholder="Ward"
                  />
                </div>
                <div className="col py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="street_of_crime"
                    name="street_of_crime"
                    placeholder="Street"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col py-2">
                  <input
                    type="text"
                    className="form-control"
                    id="victims"
                    name="victims"
                    placeholder="Victims of crime"
                  />
                </div>
                <div className="col"></div>
              </div>
            </fieldset>
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

export default File;
