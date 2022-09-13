import React from "react";
import "./Main.scss";

import Home from "../Templates/Home/Home";
import Sales from "../Templates/Sales/Sales";
import Storage from "../Templates/Storage/Storage";
import Cash from "../Templates/Cash/Cash";

import { Switch, Route } from "react-router-dom";

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isActive: true,
    };
  }

  handleActive = () => {
    this.setState({ isActive: !this.state.isActive });

    const btn = document.getElementById("otherActions")!;

    if (this.state.isActive) {
      btn.className = "otherActions active";
    } else {
      btn.className = "otherActions";
    }
  };

  render() {
    return (
      <main>
        <Switch>
          <Route path="/sales">
            <Sales props={this.props} />
          </Route>
          <Route path="/storage">
            <Storage props={this.props} />
          </Route>
          <Route path="/cash">
            <Cash props={this.props} />
          </Route>
          <Route path="/">
            <Home props={this.props} />
          </Route>
        </Switch>

        <div
          id="otherActions"
          className="otherActions"
          onClick={this.handleActive}
        >
          <button className="btn">
            <i id="fa" className="fa fa-plus" />
          </button>
        </div>
      </main>
    );
  }
}

export default Main;
