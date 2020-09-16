import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";

class OffenseEdit extends React.Component {
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
    console.log("cities: ", props.data);
    this.state = {
      authenticated: true,
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasSuccessFeedback: false,
      hasFailFeedback: false,
      feedback: null,
      offenses: offenses,
      offense: props.data,
      editedOffense: props.offense,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updateOffense = this.updateOffense.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.text2Date = this.text2Date.bind(this);
  }
  handleChange(e) {
    let el = e.target;
    var val = null;
    let off = this.state.offense;
    if (el.id == "offense") val = el.options[el.options.selectedIndex].value;
    if (el.id == "description") val = el.value;
    if (el.id == "region_of_crime")
      val = el.options[el.options.selectedIndex].value;
    if (el.id == "district_of_crime") val = el.value;
    if (el.id == "ward_of_crime") val = el.value;
    if (el.id == "street_of_crime") val = el.value;
    if (el.id == "date_of_crime") val = el.value;
    if (el.id == "time_of_crime") val = el.value;
    if (el.id == "victims") val = el.value;
    if (el.id == "case_officer")
      val = el.options[el.options.selectedIndex].value;

    off[el.id] = val;
    this.setState({ offense: off });
  }

  handleCancel() {
    this.props.onClose();
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let body = this.state.offense;
    body.officer_id = this.state.currentUser.id;
    delete body.attending_officer;
    delete body.case_officer_detail;
    body.btnUpdateOffense = "submit";

    console.log("body: ", body);
    this.updateOffense(body);
  }
  text2Date(event) {
    if (event.target.id == "date_of_crime") event.target.type = "date";
    else event.target.type = "time";
  }
  updateOffense(data) {
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
          this.setState({ hasSuccessFeedback: false, feedback: response.msg });
        }
        // this.props.onFeedback(feedback, this.state.hasSuccessFeedback);
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState(
          {
            hasSuccessFeedback: false,
            isLoading: false,
            feedback: "An error occurred!",
          },
          () => {
            this.props.onFeedback(
              this.state.feedback,
              this.state.hasSuccessFeedback
            );
          }
        );
      });
  }
  render() {
    return (
      <div className="my-2 col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1">
        <h3 className="my-4">Edit Offense Details</h3>

        <form
          className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
          onSubmit={this.handleSubmit}
        >
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">Charges/Offenses</legend>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left">
                <label htmlFor="case_officer">Case Officer</label>
                <select
                  id="case_officer"
                  name="case_officer"
                  className="form-control"
                  value={this.state.offense.case_officer}
                  onChange={this.handleChange}
                >
                  <option value="none">--Select Case Officer--</option>
                  {this.props.officers.map((of) => {
                    return (
                      <option key={of.id} value={of.id}>
                        {of.username}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left">
                <label htmlFor="offense">Offense</label>
                <select
                  id="offense"
                  name="offense"
                  className="form-control"
                  value={this.state.offense.offense}
                  onChange={this.handleChange}
                >
                  <option value="none">--Select Offense--</option>
                  {this.state.offenses.map((of) => {
                    return (
                      <option key={of.id} value={of.name}>
                        {of.name}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-group text-left">
              <label htmlFor="description">Description</label>
              <textarea
                value={this.state.offense.description}
                onChange={this.handleChange}
                id="description"
                name="textarea"
                className="form-control"
              />
            </div>
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left small">
                Crime Area/Location
              </legend>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <select
                    value={this.state.offense.region_of_crime}
                    onChange={this.handleChange}
                    className="form-control"
                    id="region_of_crime"
                    name="region_of_crime"
                  >
                    <option>--Select Region--</option>
                    {getCityNames("asc").map((c) => {
                      return <option key={c}>{c}</option>;
                    })}
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    value={this.state.offense.district_of_crime}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="district_of_crime"
                    name="district_of_crime"
                    placeholder="District"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    value={this.state.offense.ward_of_crime}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="ward_of_crime"
                    name="ward_of_crime"
                    placeholder="Ward"
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    value={this.state.offense.street_of_crime}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="street_of_crime"
                    name="street_of_crime"
                    placeholder="Street"
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <input
                    value={this.state.offense.victims}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="victims"
                    name="victims"
                    placeholder="Victims of crime"
                  />
                </div>
                <div className="col"></div>
              </div>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left">
                  <label htmlFor="date_of_crime">Date of Crime</label>
                  <input
                    value={this.state.offense.date_of_crime}
                    onChange={this.handleChange}
                    type="text"
                    className="form-control"
                    id="date_of_crime"
                    name="date_of_crime"
                    placeholder="Date of crime"
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2 text-left">
                  <label htmlFor="date_of_crime">Time of Crime</label>
                  <input
                    value={this.state.offense.time_of_crime}
                    onChange={this.handleChange}
                    onFocus={this.text2Date}
                    type="text"
                    className="form-control"
                    id="time_of_crime"
                    name="time_of_crime"
                    placeholder="Time of crime"
                  />
                </div>
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
                name="btnSubmit"
                id="btnSubmit"
                className="btn btn-primary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
                value="SAVE"
              />
            )}
            <span className="col-md-4 col-lg-4 col-xl-4"></span>
            <input
              onClick={this.props.onClose}
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

export default OffenseEdit;
