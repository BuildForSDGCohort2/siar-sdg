import React from "react";

const ReportButton = (props) => {
  const handleClick = () => {
    props.onClick(props.id);
  };
  return (
    <div className="d-flex align-items-center px-0 col-xl-3 col-lg-3 col-md-4 col-sm-6 col-xs-6 rounded-left border border-primary">
      <div className="btn-primary text-white p-4 btn" onClick={handleClick}>
        <i className="material-icons display-4">{props.icon}</i>
      </div>
      <span className="text-left px-2 py-1 text-secondary">{props.text}</span>
    </div>
  );
};
export default ReportButton;
