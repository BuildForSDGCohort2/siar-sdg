import React, { useState, useEffect } from "react";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryLabel,
} from "victory";

class CategoryReport extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      files: props.data,
      labels: [],
      data: [],
      filter: "offense",
    };
    this.groupByArray = this.groupByArray.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleFilter = this.handleFilter.bind(this);
  }
  handleFilter(event) {
    let target = event.target;
    let value = target.options[target.options.selectedIndex].value;
    this.setState({ filter: value }, () => {
      this.generateGraph();
    });
  }
  groupByArray = (xs, key) => {
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

  handleClose = () => {
    this.props.onClose();
  };
  generateGraph() {
    let gf = this.groupByArray(this.state.files, this.state.filter);
    let labels = gf.map((f) => {
      return f.key;
    });
    console.info("test: ", gf);
    this.setState({ labels: labels });
    let graphData = gf.map((f) => {
      let dt = {};
      dt.x = f.key;
      dt.y = f.values.length;
      return dt;
    });
    this.setState({ data: graphData });
  }
  componentDidMount() {
    this.generateGraph();
  }
  render() {
    return (
      <>
        <div className="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xl-10 offset-md-1 offset-lg-1 offset-xl-1 my-3 d-flex justify-content-between">
          <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2">
            <label htmlFor="filter" className="text-secondary">
              Select Report Factor
            </label>
            <select
              className="form-control col-md-8 col-lg-8 col-xl-8  offset-md-2 offset-lg-2 offset-xl-2"
              id="filter"
              name="filter"
              onChange={this.handleFilter}
              value={this.state.filter}
            >
              <option value="offense">Offense</option>
              <option value="region_of_crime">Region</option>
              <option value="status">Case Status</option>
              {/* <option value="offense">Offense</option> */}
            </select>
          </div>
          <i
            className="material-icons btn text-dark col-sm-2 col-xs-2 col-md-1 col-lg-1 col-xl-1"
            onClick={this.handleClose}
          >
            close
          </i>
        </div>
        <h2>
          Crime Report by{" "}
          {this.state.filter.charAt(0).toUpperCase() +
            this.state.filter.slice(1).replace(/_/g, " ")}
        </h2>
        <div className="col-xs-12 col-sm-12 col-md-8 col-lg-8 col-xl-8 offset-md-2 offset-lg-2 offset-xl-2 my-5 d-flex justify-content-between">
          <VictoryChart domainPadding={20} theme={VictoryTheme.material}>
            <VictoryAxis
              label={
                this.state.filter.charAt(0).toUpperCase() +
                this.state.filter.slice(1).replace(/_/g, " ")
              }
              style={{
                axis: { stroke: "#756f6a" },
                axisLabel: { fontSize: 10, padding: 30 },

                ticks: { stroke: "grey", size: 5 },
                tickLabels: { fontSize: 10, padding: 10 },
              }}
              tickValues={[]}
              tickFormat={this.state.labels}
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
              label={"Crime Occurence"}
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
              data={this.state.data}
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
  }
}
export default CategoryReport;
