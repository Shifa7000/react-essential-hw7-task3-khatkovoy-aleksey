import React from "react";
import ToDoList from "../ToDoList";

import "./index.css";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <ToDoList />
      </div>
    );
  }
}

export default App;
