// import React from 'react';
// import './Result.css';
// import winner from './winner.png';
// import winIcon from'./winIcon.png';
// import tick from './tick.png';

// const Result=()=>{
//     return(
//       <div className="result-container">
//         <div className = "form">
//           <div className = "icon-boxx">
//              <img src={winner} alt="icon" className='winner-img'/>
//           </div>
//           <div className = "icon-boxx">
//              <img src={winIcon} alt="winner-icon" className='winner-icon'/>
//           </div>
//           <div className = "text-boxx">
//              <h3>Congratulations!!! User5008 is the winner.</h3>
//           </div>
//           <button type="button"><img src={tick} alt="tick" className="tick-icon" />OK</button>
//         </div>
//       </div>
//     );
// };

// export default Result;


import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Result.css';
import Confetti from 'react-confetti';

import winIcon from './winIcon.png';
import tick from './tick.png';
import winBanner from './winBanner.png';
import winnerSound from './winnerSound.mp3';
 
const Winner = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { winner, score } = location.state || { winner: "", score: 0 };

  // Create audio object
  const audio = new Audio(winnerSound);

  // Function to handle navigation to the home page
  const handleNavigate = () => {
    audio.pause(); // Stop audio on navigate
    audio.currentTime = 0;
    navigate("/"); // Redirect to home page
  };

  // Play audio when the component mounts
  useEffect(() => {
    audio.play().catch((err) => console.log(err)); // Play audio
  }, []);

  return (
    <div className="result-container">
      {/* Confetti Effect */}
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={500}
        gravity={0.2}
        recycle={false}
      />

      <div className="result-form">
        <div className="icon-boxx">
          <img src={winBanner} alt="icon" className="winner-img" />
        </div>
        <div className="icon-boxx">
          <img src={winIcon} alt="winner-icon" className="winner-icon" />
        </div>
        <div className="text-boxx">
          <h1>🎉 Winner: {winner}</h1>
          <h3>🏅 Score: {score}</h3>
        </div>

        {/* Tick Button to Navigate */}
        <button type="button" onClick={handleNavigate} className="result-button">
          <img src={tick} alt="tick" className="tick-icon" />
        </button>
      </div>
    </div>
  );
};

export default Winner;