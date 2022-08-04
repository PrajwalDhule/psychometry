import React from "react";
import Dashboard from "./components/Dashboard";
import "./assets/main.css";
import Records from "./data.json";

function App() {
  return (
    <div className="main">
      <Dashboard placeholder="Enter a Name" data={Records} />
    </div>
  );
}

export default App;
