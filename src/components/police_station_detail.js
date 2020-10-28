import React, { useState } from "react";
import PoliceStationEdit from "./police_station_edit";

const PoliceStationDetail = (props) => {
  const [showEdit, setShowEdit] = useState(false);
  const handleCancel = () => {
    props.onCancel();
  };

  if (showEdit) {
    return (
      <PoliceStationEdit
        station={props.item}
        officers={props.officers}
        onUpdate={props.onUpdate}
        onCancel={handleCancel}
      />
    );
  }
  return (
    <>
      <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-around text-center">
        <i className="material-icons display-2 text-primary">apartments</i>
      </div>
      <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-center">
        <span>Name of Station: </span>
        <span className="px-2">{props.item.name}</span>
      </div>
      <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-center">
        <span>Chief of Station: </span>
        <span className="px-2">
          {props.item.station_chief.first_name +
            " " +
            props.item.station_chief.last_name}
        </span>
      </div>
      <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-center">
        <span>Location: </span>
        <span className="px-2">
          {props.item.street +
            ", " +
            props.item.district +
            " (" +
            props.item.region +
            ")"}
        </span>
      </div>
      <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-center">
        <span>Contacts: </span>
        <span className="px-2">
          {props.item.phone + " " + props.item.email}
        </span>
      </div>
      <div className="row col-md-8 col-lg-8 col-xl-8 col-sm-10 col-xs-10 offset-sm-1 offset-xs-1 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-between justify-content-sm-around">
        <button
          className="btn btn-primary"
          onClick={() => {
            setShowEdit(true);
          }}
        >
          Edit
        </button>
        <button className="btn btn-secondary" onClick={handleCancel}>
          Cancel
        </button>
        <button className="btn btn-danger">Delete</button>
      </div>
    </>
  );
};
export default PoliceStationDetail;
