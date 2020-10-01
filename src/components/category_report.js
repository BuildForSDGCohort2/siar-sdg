import React, { useState } from "react";
import ReportItem from "./report_list_item";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryPie,
  VictoryLine,
  VictoryLabel,
  VictoryGroup,
  VictoryLegend,
  Border,
} from "victory";
const CategoryReport = (props) => {
  const [filteredFiles, setFilteredFiles] = useState(props.data);
  const [files, setFiles] = useState(props.data);
  const [groupedFiles, setGroupedFiles] = useState([]);
  const [search, setSearch] = useState("");
  const groupByArray = (xs, key) => {
    let result = xs.reduce((rv, x) => {
      let v = key instanceof Function ? key(x) : x[key];
      let el = rv.find((r) => r && r.key === v);
      if (el) {
        el.values.push(x);
      } else {
        rv.push({ key: v, values: [x] });
      }
      return rv;
    }, []);

    return result;
  };
  let gf = groupByArray(files, "offense");
  let labels = gf.map((f) => {
    return f.key;
  });
  let graphData = gf.map((f) => {
    let dt = {};
    dt.x = f.key;
    dt.y = f.values.length;
    return dt;
  });
  //   setGroupedFiles(gf);
  //   console.log(groupedFiles);
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
      <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-5 d-flex justify-content-between">
        <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
          <VictoryAxis
            label={"Offense"}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 10, padding: 30 },

              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 10, padding: 10 },
            }}
            tickValues={[]}
            tickFormat={labels}
            tickLabelComponent={
              <VictoryLabel
                angle={30}
                style={{ fontSize: "6px", wordWrap: "break-word" }}
              />
            }
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => {
              return x;
            }}
            label={"Occurence"}
            style={{
              axis: { stroke: "#756f6a" },
              axisLabel: { fontSize: 10, padding: 40 },

              ticks: { stroke: "grey", size: 5 },
              tickLabels: { fontSize: 10, padding: 5 },
            }}
            tickLabelComponent={
              <VictoryLabel
                angle={0}
                style={{ fontSize: "6px", wordWrap: "break-word" }}
              />
            }
          />

          <VictoryBar
            data={graphData}
            labels={({ datum }) => datum.y}
            style={{ labels: { fontSize: "6px" } }}
            x="x"
            y="y"
            tickLabelComponent={
              <VictoryLabel
                angle={0}
                style={{ fontSize: "6px", wordWrap: "break-word" }}
              />
            }
          />
        </VictoryChart>
      </div>
    </>
  );
};
export default CategoryReport;
