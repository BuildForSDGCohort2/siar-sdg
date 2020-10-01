import React from "react";

const ReportItem = (props) => {
  const d = props.data;
  return (
    <tr>
      <th scope="row">{props.position + 1}</th>
      <td>{d.offense}</td>
      <td>{d.victim}</td>
      <td>{d.date_of_crime}</td>
      <td>{d.date_created}</td>
      <td>
        {d.street_of_crime +
          " Street, " +
          d.ward_of_crime +
          " Ward in " +
          d.district_of_crime +
          "(" +
          d.region_of_crime +
          ")"}
      </td>
      <td>{d.status}</td>
    </tr>
  );
};
export default ReportItem;
