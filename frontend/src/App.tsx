import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

// import { validateToken } from "./services/api";

import "./assets/scss/globals.scss";

import Login from "./components/Login/Login";
import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";
import Main from "./components/Main/Main";

class App extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      path: "/",
      title: "Dashboard",
      isActive: false,
      validToken: true,
      redirectTo: null,
    };
  }

  // componentDidMount = (): void => {
    // this.validateToken();
  // };

  // validateToken = async () => {
  //   const user = JSON.parse(localStorage.getItem("user")!);

  //   if (!user) {
  //     this.setState({ validToken: false });
  //     this.setState({ redirectTo: "/login" });

  //     localStorage.removeItem("token");
  //     return;
  //   }

  //   validateToken(user).then((res) => {
  //     if (!res.data) {
  //       this.setState({ validToken: false });
  //       this.setState({ redirectTo: "/login" });
  //       localStorage.removeItem("user");

  //       return;
  //     }

  //     this.setState({ validToken: true });
  //     this.setState({ redirectTo: "/" });
  //   });
  // };

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
        {!this.state.validToken && <Redirect to={this.state.redirectTo} />}

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
