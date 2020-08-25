import React from "react";
import logo from "../images/siar_logo.png";

function Home() {
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
        <a className="btn btn-primary" href="signin/">
          View Demo
        </a>
      </header>
    </div>
  );
}

export default Home;
