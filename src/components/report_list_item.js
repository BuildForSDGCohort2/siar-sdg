import React from "react";

const ReportItem = (props) => {
  const d = props.data;
  return (
    <tr>
      <th scope="row">{props.position + 1}</th>
      <td className="text-left">{d.offense}</td>
      <td className="text-right">{d.date_of_crime}</td>
      <td className="text-right">{d.date_created}</td>
      <td className="text-left">
        {d.street_of_crime +
          " Street, " +
          d.ward_of_crime +
          " Ward in " +
          d.district_of_crime +
          "(" +
          d.region_of_crime +
          ")"}
      </td>
      <td className="text-left">{d.status}</td>
    </tr>
  );
};
export default ReportItem;
