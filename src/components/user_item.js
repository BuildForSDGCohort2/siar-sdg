import React from "react";
import config from "../config.json";

class UserItem extends React.Component {
  constructor(props) {
    super(props);
    this.bgStyle = {
      backgroundImage:
        "url(" + config.api_url + "/data/profiles/" + this.props.avatar + ")",
    };
  }

  render() {
    return (
      <div className="col-md-3 col-lg-2 col-xl-2 col-sm-5 col-xs-10 offset-sm-1 offset-xs-1 mx-sm-1 mx-md-2 mx-2 my-2">
        <div
          onClick={() => this.props.onClick(this.props.id)}
          style={this.bgStyle}
          className="avatar"
          alt="user avatar"
        />
        <p>{this.props.name}</p>
      </div>
    );
  }
}
export default UserItem;
