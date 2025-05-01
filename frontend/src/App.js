import React from "react";
import {BrowserRouter , Routes, Route} from "react-router-dom";
import './App.css';
import Home from "./Home";
import Game from "./Game";
import Winner from "./Winner";
import Board from "./Board";
import New from "./New";
import Result from "./Result";
import Rules from "./Rules";
// import FallingPage from './FallingPage.jsx';u

function App() {
   
  return (
    <>
     <BrowserRouter>
       <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game" element={<Game />} />
          <Route path="/winner" element={<Winner />} />
          <Route path="/board" element={<Board />} />
          <Route path="/new" element={<New />} />
          <Route path="/result" element={<Result />} />
          <Route path="/rules" element={<Rules />} />
         

       </Routes>
     </BrowserRouter>
    </>
  );
}

export default App;
