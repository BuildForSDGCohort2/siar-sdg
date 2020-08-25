import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginForm from "./components/login";
import Dashboard from "./components/dashboard";
import NotFound from "./components/notfound";
import Home from "./components/home";
class CustomRouter extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signin" component={LoginForm} />
          <Route path="/dashboard" component={Dashboard} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    );
  }
}
export default CustomRouter;
