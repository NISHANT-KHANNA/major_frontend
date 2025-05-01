// import React from "react";
// import './Rules.css';
// import rules from './rules.png';
// import rulesIcon from './rulesIcon.png';
// import tick from './tick.png';
// import { GiDiamonds } from "react-icons/gi";
// const Rules=()=>{
//     return(
//         <div className="rules-container">
//         <div className = "form">
//           <div className = "rules-icon-boxx">
//              <img src={rules} alt="icon" className='rules-img'/>
//           </div>
//           <div className = "rules-icon-boxx">
//              <img src={rulesIcon} alt="rules-icon" className='rules-icon'/>
//           </div>
//           <div className = "rules-text-boxx">
                        
//              <p><GiDiamonds /> Players take turns being the "Drawer" while others are "Guessers."</p>
//              <p><GiDiamonds /> Each Drawer has a limited time (e.g., 60 seconds) to complete their drawing.</p>
//              <p><GiDiamonds /> The Drawer is not allowed to use any letters, numbers, or words in their drawing.</p>
            
//           </div>
        
//           <button type="button"><img src={tick} alt="tick" className="tick-icon" />OK</button>
//         </div>
//       </div>
//     );
// };

// export default Rules;




// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";
// import rules from './rules.png';
// import rulesIcon from './rulesIcon.png';
// import './Rules.css';
// import tick from './tick.png';
// import { GiDiamonds } from "react-icons/gi";

// const Rules = ({ name, room }) => {
//   const navigate = useNavigate();
//   const [showContent, setShowContent] = useState(false);
//   const [animateOut, setAnimateOut] = useState(false);

//   // Show content after 2 seconds
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       setShowContent(true);
//     }, 2000);

//     return () => {
//       clearTimeout(timer);
//     };
//   }, []);

//   // Function to handle navigation with animation
//   const handleNavigate = () => {
//     setAnimateOut(true); // Trigger swipe-up animation

//     // Navigate to game page after animation completes (1s)
//     setTimeout(() => {
//       navigate(`/game?name=${name}&roomId=${room}`);
//     }, 1000);
//   };

//   return (
//     <motion.div
//       className="rules-container"
//       initial={{ y: 0 }}
//       animate={animateOut ? { y: "-90vh", opacity: 1 } : { y: 0 }}
//       transition={{ duration: 1, ease: "easeInOut" }}
//     >
//       {showContent && (
//         <div className="rules-container">
//           <div className="form">
//             <div className="rules-icon-boxx">
//               <img src={rules} alt="icon" className="rules-img" />
//             </div>
//             <div className="rules-icon-boxx">
//               <img src={rulesIcon} alt="rules-icon" className="rules-icon" />
//             </div>
//             <div className="rules-text-boxx">
//               <p>
//                 <GiDiamonds /> Players take turns being the "Drawer" while others are "Guessers."
//               </p>
//               <p>
//                 <GiDiamonds /> Each Drawer has a limited time (e.g., 60 seconds) to complete their drawing.
//               </p>
//               <p>
//                 <GiDiamonds /> The Drawer is not allowed to use any letters, numbers, or words in their drawing.
//               </p>
//             </div>

//             {/* Tick Button to Navigate */}
//             <button type="button" onClick={handleNavigate}>
//               <img src={tick} alt="tick" className="tick-icon" />
//             </button>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// };

// export default Rules;



import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import rules from './rules.png';
import rulesIcon from './rulesIcon.png';
import './Rules.css';
import tick from './tick.png';
import { GiDiamonds } from "react-icons/gi";

const Rules = ({ name, room }) => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);

  // Show content after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  // Function to handle navigation with animation
  const handleNavigate = () => {
    setAnimateOut(true); // Trigger swipe-up animation

    // Navigate to game page after animation completes (1s)
    setTimeout(() => {
      navigate(`/game?name=${name}&roomId=${room}`);
    }, 1000);
  };

  return (
    <motion.div
      className="rules-container"
      initial={{ y: 0 }}
      animate={animateOut ? { y: "-90vh", opacity: 1 } : { y: 0 }}
      transition={{ duration: 1, ease: "easeInOut" }}
    >
      {showContent && (
        <div className="rules-container">
          <div className="rules-form">
            <div className="rules-icon-boxx">
              <img src={rules} alt="icon" className="rules-img" />
            </div>
            <div className="rules-icon-boxx">
              <img src={rulesIcon} alt="rules-icon" className="rules-icon" />
            </div>
            <div className="rules-text-boxx">
              <p>
                <GiDiamonds /> Players take turns being the "Drawer" while others are "Guessers."
              </p>
              <p>
                <GiDiamonds /> Each Drawer has a limited time (e.g., 60 seconds) to complete their drawing.
              </p>
              <p>
                <GiDiamonds /> The Drawer is not allowed to use any letters, numbers, or words in their drawing.
              </p>
            </div>

            {/* Tick Button to Navigate */}
            <button type="button" onClick={handleNavigate} className="rules-button">
              <img src={tick} alt="tick" className="tick-icon" />
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default Rules;






