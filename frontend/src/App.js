import logo from "./logo.svg";
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [data, setData] = useState({ message: "" });

  useEffect(() => {
    fetch("/")
      .then((res) => res.json())
      .then((data) => setData(data));
    console.log(data);
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>{data}</p>
      </header>
    </div>
  );
}

export default App;
