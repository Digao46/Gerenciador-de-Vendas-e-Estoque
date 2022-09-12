import React from "react";
import "./Main.scss";

import Home from "../Templates/Home/Home";
import Sales from "../Templates/Sales/Sales";
import Storage from "../Templates/Storage/Storage";
import Caixa from "../Templates/Cash/Cash";

import { Routes, Route, BrowserRouter } from "react-router-dom";

const Main = (props: any) => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route element={<Home props={props} />} path="/" />
          <Route element={<Sales props={props} />} path="/sales" />
          <Route element={<Storage props={props} />} path="/storage" />
          <Route element={<Caixa props={props} />} path="/cash" />
        </Routes>
      </BrowserRouter>

      <div className="otherActions">
        <button>
          <i className="fa fa-plus" />
        </button>
      </div>
    </main>
  );
};

export default Main;
