import React from "react";

class UserItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <img src={this.props.avatar} className="avatar" alt="user avatar" />
        <p>{this.props.name}</p>
      </div>
    );
  }
}
export default UserItem;
