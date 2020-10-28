import React, { useState } from "react";
import PoliceStationDetail from "./police_station_detail";
import PoliceStationItem from "./police_station_item";

const PoliceStationList = (props) => {
  const [filteredList, setFilteredList] = useState(props.data);
  const [list, setList] = useState(props.data);
  const [clickedItem, setClickedItem] = useState(null);
  const handleItemClick = (item) => {
    console.info("clicked item: ", item.name);
    setClickedItem(item);
  };
  const handleSearch = (e) => {
    e.preventDefault();
    let search = e.target.value.toLowerCase();
    if (search == "") setFilteredList(list);
    else {
      let result = list.filter((item) => {
        return (
          item.name.toLowerCase().includes(search) ||
          item.station_chief.first_name.toLowerCase().includes(search) ||
          item.station_chief.last_name.toLowerCase().includes(search) ||
          item.region.toLowerCase().includes(search) ||
          item.district.toLowerCase().includes(search) ||
          item.street.toLowerCase().includes(search)
        );
      });
      setFilteredList(result);
    }
  };
  const handleClose = () => {
    props.onClose();
  };
  const handleCancel = () => {
    setClickedItem(null);
  };
  const handleUpdate = (list) => {
    setList(list);
    setFilteredList(list);
  };
  if (clickedItem != null) {
    return (
      <PoliceStationDetail
        item={clickedItem}
        onCancel={handleCancel}
        officers={props.officers}
        onUpdate={(l) => handleUpdate(l)}
      />
    );
  } else {
    return (
      <>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between">
          <span></span>
          <i
            className="material-icons btn btn-danger  col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
            onClick={handleClose}
          >
            close
          </i>
        </div>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5">
          <input
            type="text"
            className="form-control col-md-8 col-lg-8 col-xl-8  offset-md-2 offset-lg-2 offset-xl-2 my-5"
            id="search"
            name="search"
            placeholder="search"
            onChange={handleSearch}
          />
        </div>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between table-responsive">
          <table className="table">
            <thead className="thead-dark text-left">
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name of Station</th>
                <th scope="col">Station Chief</th>
                <th scope="col">Street</th>
                <th scope="col">District</th>
                <th scope="col">Region</th>
              </tr>
            </thead>
            <tbody>
              {filteredList.length > 0 ? (
                filteredList.map((u, i) => {
                  return (
                    <PoliceStationItem
                      item={u}
                      key={u.id}
                      position={i}
                      onClick={(i) => handleItemClick(i)}
                    />
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center py-2">
                    No Records Matched
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </>
    );
  }
};
export default PoliceStationList;
