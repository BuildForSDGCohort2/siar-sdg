import React from "react";

class AnonymousDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      report: props.item,
      showEdit: false,
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {}

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
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-start">
          <div className="text-secondary col-md-2 col-lg-2 col-xl-2 px-1 text-left">
            Status
          </div>

          <div className="text-left">{this.state.report.status}</div>
        </div>
      </>
    );
  }
}
export default AnonymousDetail;
