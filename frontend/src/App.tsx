import React, { useState } from "react";
import "./assets/scss/globals.scss";

import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";
import Main from "./components/Main/Main";

function App() {
  let [path, setPath] = useState("/");
  let title = "Dashboard";

  const getPath = (newTitle: string) => {
    setPath(newTitle);
  };

  switch (path) {
    case (path = "/"):
      title = "Dashboard";
      break;

    case (path = "/sales"):
      title = "Gerenciamento de Vendas";
      break;

    case (path = "/storage"):
      title = "Gerenciamento de Estoque";
      break;

    case (path = "/cash"):
      title = "Gerenciamento de Caixa";
      break;
  }

  return (
    <div className="App">
      <Header title={title} />
      <Nav />
      <Main getPath={getPath} />
    </div>
  );
}

export default App;
