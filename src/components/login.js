import React from "react";

import logo from "../images/siar_logo.png";
import Dashboard from "./dashboard";
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    this.setState({ clicked: true }, () => {
      if (this.state.clicked) this.props.history.push("/dashboard");
    });
  }

  render() {
    // if (this.state.clicked) return <Dashboard />;
    return (
      <div>
        <img src={logo} className="App-logo" alt="Siar logo" />
        <p></p>
        <form
          className="col-md-4 col-lg-4 col-xl-4 offset-md-4 offset-lg-4 offset-xl-4"
          onSubmit={this.handleSubmit}
        >
          <input
            className="form-control my-2"
            id="userid"
            placeholder="Enter ID"
            name="userid"
            type="text"
            required
          />
          <input
            className="form-control my-2"
            id="password"
            placeholder="Enter password"
            name="password"
            type="password"
          />
          <input
            type="submit"
            name="submit"
            id="submit"
            class="form-control btn-primary btn my-2"
            value="Login"
          />
        </form>
        <footer className="text-secondary text-small my-5">
          All Rights Reserved
        </footer>
      </div>
    );
  }
}
export default LoginForm;
