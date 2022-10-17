import React from "react";
import { Link, Redirect } from "react-router-dom";

import { getProducts, getSales } from "../../../services/api";

import "./Home.scss";

class Home extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      productsLength: 0,
      salesLength: 0,
    };
  }

  componentDidMount(): void {
    this.props.props.setTitle("Dashboard");
    
      getProducts().then((res) => this.setState({ productsLength: res.data }));
      getSales().then((res) => this.setState({ salesLength: res.data }));
  }

  render() {
    // if (!this.props.props.state.validToken) {
    //   return <Redirect to={this.props.props.state.redirectTo} />;
    // }

    return (
      <section className="container d-flex justify-content-around pt-3">
        <div className="card sales d-flex justify-content-center align-items-center col-3">
          <div className="row w-100 h-80">
            <div className="col-6 d-flex flex-column align-items-start justify-content-around">
              <p>Vendas</p>
              {this.state.salesLength.length > 0 ? (
                <p className="counter d-flex ms-4">
                  {this.state.salesLength.length}
                </p>
              ) : (
                <p className="counter d-flex ms-4">0</p>
              )}
              <button className="btn">
                <Link to="/sales">Ver Mais</Link>
              </button>
            </div>

            <div className="col-6 d-flex justify-content-center align-items-center">
              <i className="fa fa-dollar-sign" />
            </div>
          </div>
        </div>

        <div className="card storage d-flex justify-content-center align-items-center col-3">
          <div className="row w-100 h-80">
            <div className="col-6 d-flex flex-column align-items-start justify-content-around">
              <p>Estoque</p>

              {this.state.productsLength.length > 0 ? (
                <p className="counter d-flex ms-4">
                  {this.state.productsLength.length}
                </p>
              ) : (
                <p className="counter d-flex ms-4">0</p>
              )}
              <button className="btn">
                <Link to="/storage">Ver Mais</Link>
              </button>
            </div>

            <div className="col-6 d-flex justify-content-center align-items-center">
              <i className="fa fa-warehouse" />
            </div>
          </div>
        </div>

        <div className="card cashRegister d-flex justify-content-center align-items-center col-3">
          <div className="row w-100 h-80">
            <div className="col-6 d-flex flex-column align-items-start justify-content-around">
              <p>Caixa</p>
              <p className="counter d-flex ms-4 transparent">0</p>
              <button className="btn">
                <Link to="/cash">Ver Mais</Link>
              </button>
            </div>

            <div className="col-6 d-flex justify-content-center align-items-center">
              <i className="fa fa-cash-register" />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default Home;
