import React from "react";
import "./Main.scss";

import Home from "../Templates/Home/Home";
import Sales from "../Templates/Sales/Sales";
import Storage from "../Templates/Storage/Storage";

import { Routes, Route, BrowserRouter } from "react-router-dom";

const Main = () => {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<Sales />} path="/sales" />
          <Route element={<Storage />} path="/storage" />
          <Route element={<Home />} path="/cash" />
        </Routes>
      </BrowserRouter>

      <div className="newSale">
        <button>
          <i className="fa fa-plus" />
        </button>
      </div>
    </main>
  );
};

export default Main;
