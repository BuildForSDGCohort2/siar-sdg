import React from "react";

import { Spinner } from "react-bootstrap";
import { getCityNames, getPostcode } from "postcodes-tz";
import Geocode from "react-geocode";
import ReactMap from "./react_map";
import config from "../config.json";
const key = config.api_key;

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
      hasGeolocation: "geolocation" in navigator,
      location: null,
      address: "",
      search: "",
      locationChanged: false,
      place: "",
      district: "",
      region: "",
    };
    // this.reactMapRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.readBase64 = this.readBase64.bind(this);
    this.submitReport = this.submitReport.bind(this);
    this.checkLocation = this.checkLocation.bind(this);
    this.updateLocation = this.updateLocation.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.searchLocation = this.searchLocation.bind(this);
  }
  searchLocation = () => {
    let search = document.getElementById("search").value;
    Geocode.setApiKey(key);
    Geocode.setLanguage("en");
    Geocode.setRegion("tz");
    Geocode.fromAddress(search)
      .then((response) => {
        let components = response.results[0].address_components;
        console.log("componensts: ", components);
        let citys = components.filter((c) => {
          return c.types.includes("administrative_area_level_1");
        });
        let districts = components.filter((c) => {
          return c.types.includes("administrative_area_level_2");
        });
        let place = components[0].long_name;
        let city = citys.length ? citys[0].long_name : "Unknown";
        let district = districts.length ? districts[0].long_name : "Unknown";

        let my_address = place + ", " + district + ", " + city;
        let loc = response.results[0].geometry.location;
        if (loc !== this.state.location) {
          // this.reactMapRef.current.handleCenterChange();
          this.updateLocation(loc, my_address);
          console.log("location changed: ", loc);
        }
      })
      .catch((error) => {
        console.error("Geocode failed to find addresss " + error);
      });
  };
  handleChange = (e) => {
    let search = e.target.value;
    this.setState({ search: search });
  };
  updateLocation = (loc, address) => {
    let places = address.split(", ");
    this.setState({
      location: loc,
      address: address,
      search: address,
      place: places[0],
      district: places[1],
      region: places[2],
      locationChanged: true,
    });
  };
  checkLocation() {
    if ("geolocation" in navigator) {
      console.log("geolocation available...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("getting position..", position.coords);
          let pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("position: ", pos);
          this.setState({ location: pos, hasGeolocation: true });
        },
        (error) => {
          console.error("error: ", error);
        },
        {
          timeout: 10000,
        }
      );
    } else {
      console.log("No location available");
      this.setState({ hasGeolocation: false, location: null });
    }
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
    let offenseEl = document.getElementById("offense");
    let description = document.getElementById("description").value;
    let suspect_description = document.getElementById("suspect_description")
      .value;
    let regionEl = document.getElementById("region_of_crime");
    let districtEl = document.getElementById("district_of_crime");

    let date = document.getElementById("date_of_crime").value;
    let time = document.getElementById("time_of_crime").value;
    let region =
      this.state.location === null
        ? regionEl.options[regionEl.options.selectedIndex].value
        : this.state.region;
    let district =
      this.state.location === null
        ? districtEl.options[districtEl.options.selectedIndex].value
        : this.state.district;
    let ward =
      this.state.location === null
        ? document.getElementById("ward_of_crime").value
        : "";
    let street =
      this.state.location === null
        ? document.getElementById("street_of_crime").value
        : this.state.place;
    let address =
      this.state.location === null
        ? street + ", " + district + ", " + region
        : this.state.address;
    let fileEl = document.getElementById("file_image");
    let body = {
      offense: offenseEl.options[offenseEl.options.selectedIndex].value,
      description: description,
      suspect_description: suspect_description,
      region_of_crime: region,
      district_of_crime: district,
      ward_of_crime: ward,
      street_of_crime: street,
      date_of_crime: date,
      time_of_crime: time,
      coordinates: this.state.location.lat + "," + this.state.location.lng,
      address: address,
      btnReportCrime: "submit",
    };
    if (fileEl.files.length > 0) {
      let file = fileEl.files[0];
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
      // mode: "no-cors",
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
  componentDidMount() {
    this.checkLocation();
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
                <label htmlFor="description">Crime Description</label>
                <textarea
                  id="description"
                  name="textarea"
                  className="form-control"
                ></textarea>
                <label htmlFor="suspect_description">Suspect Description</label>
                <textarea
                  id="suspect_description"
                  name="textarea"
                  className="form-control"
                ></textarea>
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

              {this.state.hasGeolocation && this.state.location !== null ? (
                <div className="form-group  text-left">
                  <span className="py-2">
                    Enter Crime Location or Pick From the Map
                  </span>
                  <div className="border border-secondary p-2 align-items-center d-flex justify-content-between">
                    <input
                      id="search"
                      className="form-control my-2"
                      placeholder="Enter Address"
                      value={this.state.search}
                      onChange={this.handleChange}
                    />
                    <i
                      className="material-icons btn text-white bg-primary"
                      onClick={() => this.searchLocation()}
                    >
                      search
                    </i>
                  </div>
                  <div className="form-group col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 col-sm-12 col-xs-12 col-sm-12 col-xs-12 py-2">
                    <ReactMap
                      location={this.state.location}
                      address={this.state.address}
                      zoom={15}
                      onUpdateLocation={this.updateLocation}
                      locationChanged={this.state.locationChanged}
                    />
                  </div>
                </div>
              ) : (
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
                </fieldset>
              )}
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
