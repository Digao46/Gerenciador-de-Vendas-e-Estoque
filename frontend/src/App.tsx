import React from "react";
import "./assets/scss/globals.scss";

import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
      <Main />
    </div>
  );
}

export default App;
