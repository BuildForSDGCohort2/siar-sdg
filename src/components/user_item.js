import React from "react";

class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="col-md-2 col-lg-2 col-xl-2 col-sm-20 col-xs-10 mx-2 my-2">
        <img src={this.props.avatar} className="avatar" alt="user avatar" />
        <p>{this.props.name}</p>
      </div>
    );
  }
}
export default UserItem;
