import React from "react";
import config from "../config.json";
import ReactMap from "./react_map";
class AnonymousDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: props.item,
      location: null,
      showEdit: false,
    };
    this.setReadStatus = this.setReadStatus.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  setReadStatus() {
    let body = { id: this.state.report.id, btnUpdateReadStatus: "read" };
    fetch(config.api_url + "/auth/", {
      method: "put",
      header: { "Content-type": "application/json" },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((response) => {
        console.log("response: ", response);
        if (response.success == 0) {
          this.props.onUpdateReports(response.crimes);
        }
      })
      .catch((error) => {
        console.error("Error updating read status: ", error);
      });
  }
  handleClick(e) {}
  componentDidMount() {
    this.setReadStatus();
    let coords = this.state.report.coordinates.split(",");
    let location = { lat: coords[0], lng: coords[1] };
    this.setState({ location: location });
  }
  render() {
    return (
      <>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-center">
          <h2>Anonymous Crime Report</h2>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Nature of Crime
          </div>
          <div className="text-left">{this.state.report.offense}</div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Description of Crime
          </div>
          <div className="text-left">{this.state.report.description}</div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Description of Suspect
          </div>
          <div className="text-left">
            {this.state.report.suspect_description}
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Date of Crime
          </div>
          <div className="text-left">{this.state.report.date_created}</div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Time of Crime
          </div>
          <div className="text-left">{this.state.report.time_of_crime}</div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Area of Crime
          </div>
          <div className="text-left">
            {this.state.report.street_of_crime +
              " street in " +
              this.state.report.district_of_crime +
              " (" +
              this.state.report.region_of_crime +
              ") "}
          </div>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Evidence
          </div>
          {this.state.report.has_image == 0 ? (
            "None"
          ) : (
            <div className="text-left">
              <a
                target="_blank"
                href={
                  "https://api.neelansoft.co.tz/data/crimes/" +
                  this.state.report.image_path
                }
              >
                View Evidence
              </a>
            </div>
          )}
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start text-left">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Status
          </div>

          <div className="text-left">{this.state.report.status}</div>
        </div>
        {this.state.location !== null ? (
          <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start text-left">
            <ReactMap
              location={this.state.location}
              address={this.state.report.address}
              zoom={15}
            />
          </div>
        ) : null}
      </>
    );
  }
}
export default AnonymousDetail;
