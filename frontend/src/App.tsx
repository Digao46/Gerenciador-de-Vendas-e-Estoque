import React, { useState } from "react";
import "./assets/scss/globals.scss";

import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";
import Main from "./components/Main/Main";

import { BrowserRouter as Router } from "react-router-dom";

function App() {
  let [path, setPath] = useState("/");
  let title = "";

  const getPath = (newTitle: string) => {
    setPath(newTitle);
  };

  switch (path) {
    case (path = "/"):
      title = "";
      break;

    case (path = "/sales"):
      title = "> Gerenciamento de Vendas";
      break;

    case (path = "/storage"):
      title = "> Gerenciamento de Estoque";
      break;

    case (path = "/cash"):
      title = "> Gerenciamento de Caixa";
      break;
  }

  return (
    <Router>
      <div className="App">
        <Header title={title} />
        <Nav />
        <Main getPath={getPath} />
      </div>
    </Router>
  );
}

export default App;
