import React from "react";
import "./Main.scss";

import Home from "../Templates/Home/Home";
import Sales from "../Templates/Sales/Sales";
import Storage from "../Templates/Storage/Storage";
import Cash from "../Templates/Cash/Cash";

import { Switch, Route } from "react-router-dom";

const Main = (props: any) => {
  return (
    <main>
      <Switch>
        <Route path="/sales">
          <Sales props={props} />
        </Route>
        <Route path="/storage">
          <Storage props={props} />
        </Route>
        <Route path="/cash">
          <Cash props={props} />
        </Route>
        <Route path="/">
          <Home props={props} />
        </Route>
      </Switch>

      <div className="otherActions">
        <button>
          <i className="fa fa-plus" />
        </button>
      </div>
    </main>
  );
};

export default Main;
