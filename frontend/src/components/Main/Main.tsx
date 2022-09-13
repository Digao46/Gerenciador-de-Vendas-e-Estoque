import React from "react";

import "./Main.scss";

import Home from "../Templates/Home/Home";
import Sales from "../Templates/Sales/Sales";
import Storage from "../Templates/Storage/Storage";
import Cash from "../Templates/Cash/Cash";

import { Switch, Route, Link } from "react-router-dom";

class Main extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      isActive: true,
    };
  }

  close = () => {
    this.handleActive();
    this.handleDropdown();
  };

  handleDropdown = () => {
    this.setState({ isActive: !this.state.isActive });

    const btn = document.getElementById("dropdownArea")!;

    if (this.state.isActive) {
      btn.className = "dropdownArea active";
    } else {
      btn.className = "dropdownArea";

      setTimeout(() => {
        btn.className = "dropdownArea hidden";
      }, 500);
    }
  };

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

        <div>
          <div id="dropdownArea" className="dropdownArea d-none">
            <div className="dropdownMenu">
              <ul className="listMenu d-flex text-start flex-column justify-content-center">
                <li
                  onClick={this.close}
                  className="newSale d-flex justify-content-start align-items-center my-1"
                >
                  <div className="iconArea d-flex justify-content-center">
                    <i className="fa fa-dollar-sign" />
                  </div>
                  <Link to="/">Iniciar Venda</Link>
                </li>

                <li
                  onClick={this.close}
                  className="newProduct d-flex justify-content-start align-items-center my-1"
                >
                  <div className="iconArea d-flex justify-content-center">
                    <i className="fa fa-warehouse" />
                  </div>
                  <Link to="/">Novo Produto</Link>
                </li>
              </ul>
            </div>
          </div>

          <div
            id="otherActions"
            className="otherActions"
            onClick={this.handleActive}
          >
            <button onClick={this.handleDropdown} className="btn">
              <i id="fa" className="fa fa-plus" />
            </button>
          </div>
        </div>
      </main>
    );
  }
}

export default Main;
