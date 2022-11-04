import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import "./assets/scss/globals.scss";

import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";
import Main from "./components/Main/Main";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      title: "Dashboard",
      isActive: false,
    };
  }

  handleNav = () => {
    const app = document.querySelector(".App")!;
    const element = document.querySelector(".navMenu")!;

    if (!this.state.isActive) {
      element.className = "navMenu d-block";
      app.className = "App menu";
    } else {
      element.className = "navMenu d-none";
      app.className = "App";
    }
  };

  getActive = (isActive: boolean) => {
    this.setState({ isActive: isActive });
  };

  setTitle = (newTitle: string) => {
    this.setState({ title: newTitle });
  };

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/login">
            <div className="App d-flex justify-content-center align-items-center">
              <Login />
            </div>

            <Toaster />
          </Route>

          <Route path="/">
            <div className="App">
              <Header
                title={this.state.title}
                getActive={this.getActive}
                handleNav={this.handleNav}
              />
              <Nav active={this.state.isActive} handleNav={this.handleNav} />
              <Main setTitle={this.setTitle} state={this.state} />

              <Toaster />
            </div>
          </Route>
        </Switch>
      </Router>
    );
  }
}

export default App;
