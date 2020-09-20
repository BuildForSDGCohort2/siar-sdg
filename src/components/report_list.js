import React, { useState } from "react";
import ReportItem from "./report_list_item";

const ReportList = (props) => {
  const [filteredList, setFilteredList] = useState(props.data);
  const [list, setList] = useState(props.data);
  const [search, setSearch] = useState("");
  const handleSearch = (e) => {
    e.preventDefault();
    let search = e.target.value;
    setSearch(search);
  };
  const handleClose = () => {
    props.onClose();
  };
  return (
    <>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between">
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
      <div className="row col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5">
        {filteredList.length > 0 ? (
          filteredList.map((u) => {
            return <ReportItem data={u} key={u.id} />;
          })
        ) : (
          <span className="col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5 text-center">
            No Records Matched
          </span>
        )}
      </div>
    </>
  );
};
export default ReportList;
