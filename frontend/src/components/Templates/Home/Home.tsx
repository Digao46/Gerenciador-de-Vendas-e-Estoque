import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import "./Home.scss";

const Home = (props: any) => {
  useEffect(() => {
    props.props.getPath("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <section className="container d-flex justify-content-around pt-3">
      <div className="card sales d-flex justify-content-center align-items-center col-3">
        <div className="row w-100 h-80">
          <div className="col-6 d-flex flex-column align-items-start justify-content-around">
            <p>Vendas</p>
            <p className="counter">0</p>
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
            <p className="counter">0</p>
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
            <p className="counter">0</p>
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
};

export default Home;
