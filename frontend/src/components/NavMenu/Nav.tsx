import "./Nav.scss";
import React from "react";

const Nav = () => {
  return (
    <aside>
      <ul className="text-start">
        <li className="my-4 d-flex justify-content-start">
          <div className="iconArea d-flex justify-content-center">
            <i className="fa fa-home" />
          </div>
          <a href="/home" className="ms-2">
            Dashboard
          </a>
        </li>
        <li className="my-4 d-flex justify-content-start">
          <div className="iconArea d-flex justify-content-center">
            <i className="fa fa-dollar-sign" />
          </div>
          <a href="/sales" className="ms-2">
            Vendas
          </a>
        </li>
        <li className="my-4 d-flex justify-content-start">
          <div className="iconArea d-flex justify-content-center">
            <i className="fa fa-warehouse" />
          </div>
          <a href="/storage" className="ms-2">
            Estoque
          </a>
        </li>
        <li className="my-4 d-flex justify-content-start">
          <div className="iconArea d-flex justify-content-center">
            <i className="fa fa-cash-register" />
          </div>
          <a href="/cash" className="ms-2">
            Caixa
          </a>
        </li>
      </ul>
    </aside>
  );
};

export default Nav;
