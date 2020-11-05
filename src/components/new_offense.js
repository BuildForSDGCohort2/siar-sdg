import React from "react";

import logo from "../images/avatar.jpg";
import config from "../config.json";
import Dashboard from "./dashboard";
import { Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";

class OffenseForm extends React.Component {
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
    this.recordOffense = this.recordOffense.bind(this);
  }
  handleCancel() {
    this.props.onClose();
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let inputs = Array.from(event.target);
    let body = {
      file_id: this.props.file.id,
      officer_id: this.props.currentUser.id,
      offense: inputs[1].options[inputs[1].options.selectedIndex].value,
      description: inputs[2].value,
      region_of_crime: inputs[4].options[inputs[4].options.selectedIndex].value,
      district_of_crime: inputs[5].value,
      ward_of_crime: inputs[6].value,
      street_of_crime: inputs[7].value,
      victims: inputs[8].value,
      date_of_crime: inputs[9].value,
      time_of_crime: inputs[10].value,
      case_officer: inputs[11].options[inputs[11].options.selectedIndex].value,
      btnSubmitOffense: "submit",
    };
    console.log("body: ", body);
    this.recordOffense(body);
  }
  recordOffense(data) {
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
        this.setState(
          {
            hasFailFeedback: true,
            isLoading: false,
            feedback: "An error occurred!",
          },
          () => {
            this.props.onFeedback(
              this.state.feedback,
              this.state.hasFailFeedback
            );
          }
        );
      });
  }
  render() {
    return (
      <div className="my-2 col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1">
        <h3 className="my-4">Offense Details</h3>

        <form
          className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
          onSubmit={this.handleSubmit}
        >
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">Charges/Offenses</legend>
            <select id="offense" name="offense" className="form-control">
              <option value="none">--Select Offense--</option>
              {this.state.offenses.map((of) => {
                return (
                  <option key={of.id} value={of.name}>
                    {of.name}
                  </option>
                );
              })}
            </select>
            <div className="form-group text-left">
              <label htmlFor="description">Description</label>
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
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <select
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
                    type="text"
                    className="form-control"
                    id="ward_of_crime"
                    name="ward_of_crime"
                    placeholder="Ward"
                  />
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
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
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
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
              <div className="row">
                <div className=" text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <label htmlFor="date_of_crime">Date of Crime</label>
                  <input
                    type="date"
                    className="form-control"
                    id="date_of_crime"
                    name="date_of_crime"
                    placeholder="Date of crime"
                  />
                </div>
                <div className=" text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <label htmlFor="date_of_crime">Time of Crime</label>
                  <input
                    type="time"
                    className="form-control"
                    id="time_of_crime"
                    name="time_of_crime"
                    placeholder="Time of crime"
                  />
                </div>
              </div>
              <div className="row">
                <div className=" text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2">
                  <label htmlFor="case_officer">Case Officer</label>
                  <select
                    className="form-control"
                    id="case_officer"
                    name="case_officer"
                  >
                    {this.props.officers.map((off) => {
                      return (
                        <option key={off.id} value={off.id}>
                          {off.username}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12col-sm-12 col-xs-12 py-2"></div>
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

export default OffenseForm;
