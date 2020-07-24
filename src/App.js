import React from 'react';
import './App.css';
import InputComponent from "./InputComponent.tsx"

function App() {
  return (
    <div className="App">
      <h1>
        Capstone assignment 7
      </h1>
      <br />
      <p className="description">
        Given a body of text and 2 couple of keywords, this tool generates a rating based on each of the ideas expressed by the keywords.
      </p>
      <InputComponent />
    </div>
  );
}

export default App;
