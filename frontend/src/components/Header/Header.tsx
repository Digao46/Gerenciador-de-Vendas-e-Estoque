import React from "react";
import { Redirect } from "react-router";

import "./Header.scss";

const Logo = require("../../assets/imgs/logo.png");

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isDropdownActive: true,
      isMenuActive: true,
      username: "Usuário",
      redirectTo: null,
    };
  }

  componentDidMount(): void {
    const localStorageItem = localStorage.getItem("user")!;
    const user = JSON.parse(localStorageItem);

    if (user) {
      this.setState({ username: user.username });
    }
  }

  logOut = () => {
    localStorage.removeItem("user");

    this.setState({ redirectTo: "/login" });
  };

  handleActive = (class1: string, class2: string) => {
    this.setState({ isDropdownActive: !this.state.isDropdownActive });

    const element = document.getElementById("toggleButton")!;

    if (this.state.isDropdownActive) {
      element.className = "toggleButton active";
    } else {
      element.className = "toggleButton";
    }
  };

  handleMenu = () => {
    this.setState({ isMenuActive: !this.state.isMenuActive });

    const element = document.getElementById("menu")!;

    if (this.state.isMenuActive) {
      element.className = "menu active";
    } else {
      element.className = "menu";
    }

    this.props.getActive(this.state.isMenuActive);
    this.props.handleNav();
  };

  render() {
    if (this.state.redirectTo) return <Redirect to={this.state.redirectTo} />;

    return (
      <header className="d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <div className="logoArea container col-6">
            <div className="d-flex justify-content-start align-items-center">
              <button onClick={this.handleMenu} id="menu" className="menu">
                <span className="line"></span>
                <span className="line"></span>
              </button>
              <p className="ms-3">{this.props.title}</p>
            </div>
          </div>

          <div className="navArea container col-6">
            <div className="d-flex me-5 justify-content-end align-items-center">
              <div className="user me-3">
                <p>{this.state.username}</p>
              </div>
              <div className="userImg me-2 d-flex justify-content-center align-items-center">
                <img src={Logo} alt="Imagem Usuário" />
              </div>
              <div id="toggleButton" className="toggleButton">
                <button
                  id="btn"
                  className="btn"
                  onClick={() => {
                    this.handleActive("toggleButton", "active");
                    this.logOut();
                  }}
                >
                  <i className="fa fa-angle-right"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
