import React, { useState } from "react";

const OffenseCard = (props) => {
  const [showDetail, setShowDetail] = useState(false);
  const showEditOffense = (offense) => {
    props.showOffenseForm(offense);
    props.onClose();
  };
  return (
    <div className="card m-2 text-left">
      <div className="card-header bg-info">{props.data.offense}</div>
      <div className="card-body">
        <h5 className="card-title">{props.data.date_of_crime}</h5>
        <p className="card-text">{props.data.description}</p>
        {showDetail ? (
          <>
            <div className="">
              <span>Time and Place</span>
              <p>
                {props.data.date_of_crime +
                  " at " +
                  props.data.time_of_crime +
                  " on  " +
                  props.data.street_of_crime +
                  " in " +
                  props.data.ward_of_crime +
                  " ward in " +
                  props.data.district_of_crime +
                  " ," +
                  props.data.region_of_crime}
              </p>
              <span>Case Officer</span>
              <p>
                {props.data.case_officer_detail.first_name +
                  " " +
                  props.data.case_officer_detail.last_name +
                  " (" +
                  props.data.case_officer_detail.username +
                  ")"}
              </p>
              <span>Last Update Officer</span>
              <p>
                {props.data.attending_officer.first_name +
                  " " +
                  props.data.attending_officer.last_name +
                  " (" +
                  props.data.attending_officer.username +
                  ")"}
              </p>
              <span>Victims</span>
              <p>{props.data.victims}</p>
            </div>
          </>
        ) : null}
        <div className="d-flex justify-content-between">
          <button
            className="btn btn-info"
            onClick={() => setShowDetail(!showDetail)}
          >
            {!showDetail ? "View Details" : "Show Less"}
          </button>
          <button
            className="btn btn-info"
            onClick={() => showEditOffense(props.data)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffenseCard;
