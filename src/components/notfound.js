import React from "react";
import dino from "../images/dino.png";

class NotFound extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={dino} className="dino" alt="Page not found" />
        <h1 className="my-3 ">404: Page Not Found</h1>
      </div>
    );
  }
}
export default NotFound;
