import React, { useState } from "react";

import "./assets/scss/globals.scss";

import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";
import Main from "./components/Main/Main";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  let [path, setPath] = useState("/");
  let [isActive, setActive] = useState(false);

  let title = "Dashboard";

  const getActive = (isActive: boolean) => {
    setActive(isActive);
  };

  const handleNav = () => {
    const app = document.querySelector(".App")!;
    const element = document.querySelector(".navMenu")!;

    if (!isActive) {
      element.className = "navMenu d-block";
      app.className = "App menu";
    } else {
      element.className = "navMenu d-none";
      app.className = "App";
    }
  };

  const getPath = (newTitle: string) => {
    setPath(newTitle);
  };

  switch (path) {
    case (path = "/"):
      title = "Dashboard";
      break;

    case (path = "/sales"):
      title = "Vendas";
      break;

    case (path = "/storage"):
      title = "Estoque";
      break;

    case (path = "/cash"):
      title = "Caixa";
      break;
  }

  return (
    <Router>
      <div className="App">
        <Header title={title} getActive={getActive} handleNav={handleNav} />
        <Nav active={isActive} handleNav={handleNav} />
        <Main getPath={getPath} />
      </div>
    </Router>
  );
}

export default App;
