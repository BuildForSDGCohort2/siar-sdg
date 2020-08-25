import React from "react";
import logo from "../images/siar_logo.png";
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="Siar logo" />
        <p>Dashboard</p>
      </div>
    );
  }
}
export default Dashboard;
