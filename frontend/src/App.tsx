import React from "react";
import "./assets/scss/globals.scss";

import Header from "./components/Header/Header";
import Nav from "./components/NavMenu/Nav";

function App() {
  return (
    <div className="App">
      <Header />
      <Nav />
    </div>
  );
}

export default App;
