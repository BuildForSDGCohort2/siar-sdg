import React from "react";

const FileReportItem = (props) => {
  const d = props.data;
  const viewOffender = (id) => {
    console.info("viewOffender");
  };
  return (
    <tr>
      <th scope="row">{props.position + 1}</th>

      <td
        className="text-left text-primary btn"
        onClick={() => viewOffender(d.offender.id)}
      >
        {d.offender.first_name + " " + d.offender.last_name}
      </td>

      <td className="text-left">{d.offense}</td>
      <td className="text-left">{d.date_modified}</td>
      <td className="text-left">{d.case_officer_detail.username}</td>
      <td className="text-left">{d.status}</td>
    </tr>
  );
};
export default FileReportItem;
