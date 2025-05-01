import React from "react";
import {useLocation} from "react-router-dom";

const Winner=()=>{
	const location = useLocation();
	const {winner,score} = location.state || {winner:"",score:0};

	return(
    <>
      <h1>Winner : {winner}</h1>
      <h3>Score : {score}</h3>
    </>
		);
};


export default Winner;