import React from "react";

import config from "../config.json";
import { Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";

class AnonymousReport extends React.Component {
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
      feedback: null,
      isLoading: false,
      hasFeedback: false,
      offenses: offenses,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.readBase64 = this.readBase64.bind(this);
    this.submitReport = this.submitReport.bind(this);
  }
  handleCancel() {}
  readBase64(file) {
    return new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onError = (e) => reject(e);
    });
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });
    let inputs = Array.from(event.target);
    let body = {
      offense: inputs[1].options[inputs[1].options.selectedIndex].value,
      description: inputs[3].value,
      region_of_crime: inputs[5].options[inputs[5].options.selectedIndex].value,
      district_of_crime: inputs[6].value,
      ward_of_crime: inputs[7].value,
      street_of_crime: inputs[8].value,
      date_of_crime: inputs[9].value,
      time_of_crime: inputs[10].value,
      btnReportCrime: "submit",
    };
    if (inputs[2].files.length > 0) {
      let file = inputs[2].files[0];
      this.readBase64(file)
        .then((result) => {
          body.file_image = result;
          this.submitReport(body);
        })
        .catch((e) => {
          this.setState({ hasFeedback: false, feedback: e });
        });
    }
  }
  submitReport(data) {
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
          this.setState({ hasFeedback: true, feedback: feedback });
        } else {
          this.setState({ hasFeedback: false, feedback: response.msg });
        }
      })
      .catch((error) => {
        console.error("error: ", error);
        this.setState({
          hasFeedback: false,
          isLoading: false,
          feedback: "An error occurred!",
        });
      });
  }
  render() {
    return (
      <>
        <div className="d-flex justify-content-between bg-primary text-white py-4 px-4">
          <h3 className="text-white px-5 ">Siar Anonymous Crime Reporting</h3>
        </div>
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
        <div className="my-2 col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1">
          <div className="alert-danger p-2">
            If this is an emergency, please call <b>112</b>
          </div>
          <h3 className="my-4">Crime Details</h3>

          <form
            className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
            onSubmit={this.handleSubmit}
          >
            <fieldset className="border p-2 my-5">
              <legend className="w-auto text-left ">Crime</legend>
              <div className="row">
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2 text-left">
                  {" "}
                  <label htmlFor="offense">Select Crime</label>
                  <select id="offense" name="offense" className="form-control">
                    <option value="none">--Select Crime--</option>
                    {this.state.offenses.map((of) => {
                      return (
                        <option key={of.id} value={of.name}>
                          {of.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2 text-left">
                  <label htmlFor="file_image">Upload Image/Audio/Video</label>
                  <input
                    type="file"
                    className="form-control"
                    id="file_image"
                    name="file_image"
                    accept="image/*,video/*,audio/*"
                  />
                </div>
              </div>
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
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
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
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
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
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                    <input
                      type="text"
                      className="form-control"
                      id="ward_of_crime"
                      name="ward_of_crime"
                      placeholder="Ward"
                    />
                  </div>
                  <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
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
                  <div className="col"></div>
                </div>
                <div className="row">
                  <div className=" text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                    <label htmlFor="date_of_crime">Date of Crime</label>
                    <input
                      type="date"
                      className="form-control"
                      id="date_of_crime"
                      name="date_of_crime"
                      placeholder="Date of crime"
                    />
                  </div>
                  <div className=" text-left col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
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
                  value="SUBMIT"
                />
              )}
              <span className="col-md-4 col-lg-4 col-xl-4"></span>
              <a
                href="/"
                className="btn btn-secondary btn my-2 mx-2 col-md-3 col-lg-3 col-xl-3"
              >
                CANCEL
              </a>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default AnonymousReport;
