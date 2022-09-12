import "./Nav.scss";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";

const Nav = () => {
  return (
    <BrowserRouter>
      <aside>
        <ul className="text-start">
          <li className="my-4 d-flex justify-content-start">
            <div className="iconArea d-flex justify-content-center">
              <i className="fa fa-home" />
            </div>
            <Link to="/" className="ms-2">
              Dashboard
            </Link>
          </li>
          <li className="my-4 d-flex justify-content-start">
            <div className="iconArea d-flex justify-content-center">
              <i className="fa fa-dollar-sign" />
            </div>
            <Link to="/sales" className="ms-2">
              Vendas
            </Link>
          </li>
          <li className="my-4 d-flex justify-content-start">
            <div className="iconArea d-flex justify-content-center">
              <i className="fa fa-warehouse" />
            </div>
            <Link to="/storage" className="ms-2">
              Estoque
            </Link>
          </li>
          <li className="my-4 d-flex justify-content-start">
            <div className="iconArea d-flex justify-content-center">
              <i className="fa fa-cash-register" />
            </div>
            <Link to="/cash" className="ms-2">
              Caixa
            </Link>
          </li>
        </ul>
      </aside>
    </BrowserRouter>
  );
};

export default Nav;
