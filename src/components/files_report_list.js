import React, { useState } from "react";
import FileReportItem from "./file_report_item";

const FileReportList = (props) => {
  const [filteredList, setFilteredList] = useState(props.data);
  const [list, setList] = useState(props.data);
  const handleSearch = (e) => {
    e.preventDefault();
    let search = e.target.value.toLowerCase();
    if (search == "") setFilteredList(list);
    else {
      let result = list.filter((item) => {
        return (
          item.offense.toLowerCase().includes(search) ||
          item.status.toLowerCase().includes(search) ||
          item.region_of_crime.toLowerCase().includes(search) ||
          item.district_of_crime.toLowerCase().includes(search) ||
          item.street_of_crime.toLowerCase().includes(search) ||
          item.offender.first_name.toLowerCase().includes(search) ||
          item.offender.last_name.toLowerCase().includes(search) ||
          item.case_officer_detail.username.toLowerCase().includes(search)
        );
      });
      setFilteredList(result);
    }
  };
  const handleClose = () => {
    props.onClose();
  };
  return (
    <>
      <h2>Files Sent For Prosecution</h2>
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between">
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2">
          <input
            type="text"
            className="form-control col-md-8 col-lg-8 col-xl-8  offset-md-2 offset-lg-2 offset-xl-2"
            id="search"
            name="search"
            placeholder="search"
            onChange={handleSearch}
          />
        </div>
        <i
          className="material-icons btn btn-danger  col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
          onClick={handleClose}
        >
          close
        </i>
      </div>

      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between table-responsive">
        <table className="table">
          <thead className="thead-dark">
            <tr>
              <th scope="col" className="text-right">
                #
              </th>
              <th scope="col" className="text-left">
                Offender
              </th>
              <th scope="col" className="text-left">
                Charges
              </th>
              <th scope="col" className="text-left">
                Last Updated
              </th>
              <th scope="col" className="text-left">
                Case Officer
              </th>
              <th scope="col" className="text-left">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredList.length > 0 ? (
              filteredList.map((u, i) => {
                return <FileReportItem data={u} key={u.id} position={i} />;
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
};
export default FileReportList;
