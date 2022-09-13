import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

const Logo = require("../../assets/imgs/logo.png");

class Header extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isActive: true,
    };
  }

  handleActive = () => {
    this.setState({ isActive: !this.state.isActive });

    const btn = document.getElementById("toggleButton")!;

    if (this.state.isActive) {
      btn.className = "toggleButton active";
      console.log(btn.className);
    } else {
      btn.className = "toggleButton";
      console.log(btn.className);
    }
  };

  render() {
    return (
      <header className="d-flex align-items-center">
        <div className="container d-flex align-items-center">
          <div className="logoArea container col-6">
            <div className="d-flex ms-5 justify-content-start align-items-center">
              <div className="logo">
                <img src={Logo} alt="Logo" className="me-3" />
              </div>
              <p>
                <Link to="/">Dashboard {this.props.title}</Link>
              </p>
            </div>
          </div>

          <div className="navArea container col-6">
            <div className="d-flex me-5 justify-content-end align-items-center">
              <div className="user me-3">
                <p>Digrau</p>
              </div>
              <div className="userImg me-2 d-flex justify-content-center align-items-center">
                <img src={Logo} alt="Imagem Usuário" />
              </div>
              <div id="toggleButton" className="toggleButton">
                <button id="btn" className="btn" onClick={this.handleActive}>
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
