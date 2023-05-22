import React from "react";
// import { Route, BrowserRouter as Router, Switch} from 'react-router-dom'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Player from "./Player";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/player/:id" element={<Player />} />
      </Routes>
    </BrowserRouter>

    // <div className="App">
    //   <header className="App-header">
    //     <video controls muted>
    //     <source src="http://localhost:4000/video" type="video/mp4"></source>
    //     </video>
    //   </header>
    // </div>
  );
}

export default App;
