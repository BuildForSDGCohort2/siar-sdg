import React from "react";

const ReportItem = (props) => {
  const d = props.data;
  return (
    <div className="d-flex justify-content-between border border-secondary row col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-1">
      <div className="text-left">{d.offense}</div>
      <div className="text-left">{d.victim}</div>
      <div className="text-left">{d.date_of_crime}</div>
      <div className="text-left">{d.date_created}</div>
      <div className="text-left">
        {d.street_of_crime +
          " Street, " +
          d.ward_of_crime +
          " Ward in " +
          d.district_of_crime +
          "(" +
          d.region_of_crime +
          ")"}
      </div>
    </div>
  );
};
export default ReportItem;
