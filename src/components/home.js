import React from "react";
import logo from "../images/siar_logo.png";
import LoginForm from "./login";
import Dashboard from "./dashboard";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = { clicked: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.setState({ clicked: true });
  }
  render() {
    if (this.state.clicked) return <Dashboard />;
    else {
      return (
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="Siar logo" />
            <p></p>
            <p>Siar Project by Landry Kapela (Team-1101)</p>
            <a
              className="App-link"
              href="https://buildforsdg.andela.com/program"
              target="_blank"
              rel="noopener noreferrer"
            >
              #BuildForSDGCohort2
            </a>
            <span className="my-3"></span>
            <button className="btn btn-primary" onClick={this.handleClick}>
              View Demo
            </button>
          </header>
        </div>
      );
    }
  }
}
export default Home;
