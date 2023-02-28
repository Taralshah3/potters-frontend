import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ClientRequest } from 'http';

function App() {

  // function handleFileChange(event) {
  //   console.log("test");
  // }

  return (
    <div style={{marginLeft: "50%", marginTop: "5%"}}>
      <h3> File Summarizer ting </h3>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
}

export default App;
