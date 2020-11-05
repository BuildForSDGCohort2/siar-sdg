import React from "react";

import config from "../config.json";
import { Alert, Spinner } from "react-bootstrap";
import { getCityNames } from "postcodes-tz";
import OffenseForm from "./new_offense";

class PoliceStationEdit extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentUser: props.currentUser,
      feedback: null,
      isLoading: false,
      hasFeedback: false,
      officers: props.officers,
      station: props.station,
      chief: props.station.station_chief.id,
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.updatePoliceStation = this.updatePoliceStation.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleCancel() {
    this.props.onCancel();
  }
  handleSubmit(event) {
    event.preventDefault();
    this.setState({ isLoading: true });

    let data = this.state.station;
    delete data.station_chief;
    data.station_chief = this.state.chief;

    data.btnUpdateStation = "submit";
    console.info("data: ", data);
    this.updatePoliceStation(data);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.value;
    switch (target.id) {
      case "station_chief":
        value = target.options[target.options.selectedIndex].value;
        this.setState({ chief: value });
        break;
      case "name":
        this.setState({ name: value });
        break;
      default:
        break;
    }
  }
  updatePoliceStation(data) {
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
          this.setState({ hasFeedback: true, feedback: feedback });
          this.props.onUpdate(response.stations);
          // this.handleCancel();
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
      <div className="my-2 col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1">
        {this.state.feedback != null ? (
          <Alert
            variant={this.state.hasFeedback ? "success" : "danger"}
            dismissible
            onClose={() => {
              this.setState({ feedback: null });
            }}
          >
            {this.state.feedback}
          </Alert>
        ) : null}
        <h3 className="my-4">Update Police Station</h3>
        <form
          className="col-md-10 col-lg-10 col-xl-10 col-sm-10 col-sx-10 offset-md-1 offset-lg-1 offset-xl-1 offset-xs-1 offset-sm-1"
          onSubmit={this.handleSubmit}
        >
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">Location</legend>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <select
                  className="form-control"
                  id="region"
                  name="region"
                  defaultValue={this.state.station.region}
                  onChange={this.handleChange}
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
                  id="district"
                  name="district"
                  placeholder="District"
                  defaultValue={this.state.station.district}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <input
                  type="text"
                  className="form-control"
                  id="ward"
                  name="ward"
                  placeholder="Ward"
                  defaultValue={this.state.station.ward}
                  onChange={this.handleChange}
                />
              </div>
              <div className="col-md-6 col-lg-6 col-xl-6 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <input
                  type="text"
                  className="form-control"
                  id="street"
                  name="street"
                  placeholder="Street"
                  defaultValue={this.state.station.street}
                  onChange={this.handleChange}
                />
              </div>
            </div>
          </fieldset>
          <fieldset className="border p-2 my-5">
            <legend className="w-auto text-left ">
              Administrative Information
            </legend>
            <div className="row">
              <div className="text-left col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <label htmlFor="station_chief">Station Chief</label>
                <select
                  className="form-control my-2"
                  id="station_chief"
                  name="station_chief"
                  defaultValue={this.state.chief}
                  onChange={this.handleChange}
                >
                  <option>--Select Officer--</option>
                  {this.state.officers.length > 0 ? (
                    this.state.officers
                      .filter((off) => {
                        return off.station == this.state.station.id;
                      })
                      .map((o) => {
                        return (
                          <option key={o.id} value={o.id}>
                            {o.first_name +
                              " " +
                              o.last_name +
                              " (" +
                              o.username +
                              ")"}
                          </option>
                        );
                      })
                  ) : (
                    <option>No officers available</option>
                  )}
                </select>
              </div>
            </div>
            <div className="row">
              <div className="text-left col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <label htmlFor="station_name">Name of Station</label>
                <input
                  className="form-control my-2"
                  id="station_name"
                  placeholder="Name of Station"
                  name="station_name"
                  type="text"
                  defaultValue={this.state.station.name}
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="row">
              <div className="text-left col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <label htmlFor="station_phone">Station Phone</label>
                <input
                  className="form-control my-2"
                  id="station_phone"
                  placeholder="Phone Number"
                  name="station_phone"
                  type="number"
                  defaultValue={this.state.station.phone}
                />
              </div>
              <div className="text-left col-md-8 offset-md-2 col-lg-8 offset-lg-2 col-xl-8 offset-xl-2 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                <label htmlFor="station_email">Station E-mail</label>
                <input
                  className="form-control my-2"
                  id="station_email"
                  placeholder="E-mail"
                  name="station_email"
                  type="station_email"
                  defaultValue={this.state.station.email}
                  onChange={this.handleChange}
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
                value="SAVE"
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

export default PoliceStationEdit;
