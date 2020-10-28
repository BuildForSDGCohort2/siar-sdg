import React from "react";

const PoliceStationItem = (props) => {
  const ps = props.item;
  const handleClick = () => {
    props.onClick(ps);
  };
  return (
    <tr onClick={handleClick}>
      <th scope="row">{props.position + 1}</th>
      <td className="text-left">{ps.name}</td>
      <td className="text-left">
        {ps.station_chief.first_name + " " + ps.station_chief.last_name}
      </td>
      <td className="text-left">{ps.street}</td>
      <td className="text-left">{ps.district}</td>
      <td className="text-left">{ps.region}</td>
    </tr>
  );
};
export default PoliceStationItem;
