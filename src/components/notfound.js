import React from "react";
import logo from "../images/siar_logo.png";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={logo} className="App-logo" alt="Siar logo" />
        <h1>404: Page Not Found</h1>
      </div>
    );
  }
}
export default NotFound;
