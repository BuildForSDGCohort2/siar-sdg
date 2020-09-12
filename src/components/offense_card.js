import React, { useState } from "react";
import config from "../config.json";

const OffenseCard = (props) => {
  const [showDetail, setShowDetail] = useState(false);
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
                  "on  " +
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
                {props.data.officer.first_name +
                  " " +
                  props.data.officer.last_name +
                  "(" +
                  props.data.officer.username +
                  ")"}
              </p>
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
          <button className="btn btn-info">Edit</button>
        </div>
      </div>
    </div>
  );
};

export default OffenseCard;
