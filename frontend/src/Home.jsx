// import React,{useState} from "react";
// import {useNavigate} from "react-router-dom";
// import gameIcon from "./gameIcon.png";
// import play from "./play.png";
// import OR from './OR.png';
// import { motion } from "framer-motion";

// import { FaUserAstronaut } from "react-icons/fa";
// import { FaUserNinja } from "react-icons/fa6";
// import { GoLink } from "react-icons/go";
// import { IoIosLink } from "react-icons/io";
// import { LuCopy } from "react-icons/lu";
// import { PiGameControllerDuotone } from "react-icons/pi";
// import { IoCopyOutline } from "react-icons/io5";
// import { PiGlobe } from "react-icons/pi";
// import { IoGameControllerOutline } from "react-icons/io5";
// import { FaLink } from "react-icons/fa6";
// import "./Home.css";
// import Rules from "./Rules";
// import bgVideo from "./bgVideo.mp4";


// function Home() {
//   const [name,setName]=useState("");
//   const [createRoom,setCreateRoom]=useState("");
//   const [room,setRoom]=useState("");
//   const [copy, setCopy] = useState("COPY");
//   const [showRules, setShowRules] = useState(false);

//   const navigate = useNavigate();
//   const handleButton=()=>{
//      // navigate(`/game?name=${name}&roomId=${room}`);
//     setShowRules(true); // Show falling page
    
//     setTimeout(() => {
//     setShowRules(false); // Hide falling page after 2 seconds
//   }, 5000);
//   }


//   const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
//   const generateCode =()=>{
//         let code = " ";
//         const charLength = characters.length;
//         for(let i=0;i<10;i++)
//         {
//             code += characters.charAt(Math.floor(Math.random()*charLength));
//         }
//       return(code);
//     }; 


//     const handleCopy =()=>{
//         if(createRoom)
//         {
//           navigator.clipboard.writeText(createRoom);
//           setCopy("COPIED");
//         }
//         setTimeout(()=>{setCopy("COPY")},2000);
//   };
  
//   const handleGenerate=()=>{
//      const generatedRoomId = generateCode();
//       setCreateRoom(generatedRoomId);
//     };

//   return (
//     <>
//       <div className="container">
        
//         <video loop autoPlay muted className="bg-video">
//             <source src={bgVideo} type="video/mp4" />
//         </video>
        
//         <div className="upperHalf"><img src={gameIcon} alt="gameIcon" className="gameImage" /></div>
//         <div className="lowerHalf">
//          <div className = "form-box">
//           <div className = "icon-boxx">
//              <img src={play} alt="icon" className="play-image" />
//           </div> 

//           <div className="form-boxx">
        
//             <div className="column">
//                 <h2>Create Room</h2>
//                 <div className="form-group">
//                    <FaUserAstronaut size="26px" className="form-icon" />
//                    <input
//                      type="text"
//                      id="createName"
//                      placeholder="User Name"
//                      className="form-input"
//                    />
//                 </div>

//                 <div className="form-group">
//                    <FaLink  size="26px" className="form-icon"/>
//                    <input
//                      type="text"
//                      id="link"
//                      placeholder="GENERATED LINK"
//                      className="generated-input"
//                      value={createRoom}
//                      readOnly
//                    />
//                 </div>

//                 <div className="form-group">
//                    <button type="button"  className="form-button" onClick={handleGenerate}>
//                      <GoLink   className="button-icon" />GENERATE
//                    </button>

//                    <button type="button" className="form-button" onClick={handleCopy}>
//                      <LuCopy className="button-icon" /> {copy}
//                    </button>
//                 </div>
//             </div>

//             <div className="orDiv"><img src={OR} alt="icon" className="or-image"/></div>
       
//             <div className="column">
//               <h2>Join Room</h2>
              
//               <div className="form-group">
//                 <FaUserNinja size="26px" className="form-icon" />
//                 <input
//                   type="text"
//                   id="createName"
//                   placeholder="Nickname"
//                   className="form-input"
//                   value={name}
//                   onChange={(e)=>{setName(e.target.value)}}
//                 />
//               </div>
                  
//               <div className="form-group">
//                 <PiGlobe size="26px" className="form-icon" />
//                 <input
//                   type="text"
//                   id="link"
//                   placeholder="JOINING LINK"
//                   className="generated-input"
//                   value={room} onChange={(e)=>{setRoom(e.target.value)}}
                  
//                 />
//               </div>

//               <div className="form-group">
//                 <button type="button" className="form-button" onClick={handleButton}>
//                   <PiGameControllerDuotone className="button-icon"/> PLAY!
//                 </button>
//               </div>
//             </div>
//           </div>
//          </div>
//         </div>
//       </div>

//       {showRules && (
//       <motion.div
//         className="falling-page"
//         initial={{ y: "-100vh" }}
//         animate={{ y: 0 }}
//         // exit={{ y: "100vh", opacity: 0 }}
//         transition={{ duration:1, ease: "easeOut" }}
//       >
//         <Rules name={name} room={room} />
//       </motion.div>
//     )}

//     </>
//   );
// }

// export default Home;

























// import React,{useState} from "react";
// import {useNavigate} from "react-router-dom";
// import gameIcon from "./gameIcon.png";
// import play from "./play.png";
// import OR from './OR.png';
// import { motion } from "framer-motion";

// import { FaUserAstronaut } from "react-icons/fa";
// import { FaUserNinja } from "react-icons/fa6";
// import { GoLink } from "react-icons/go";
// import { IoIosLink } from "react-icons/io";
// import { LuCopy } from "react-icons/lu";
// import { PiGameControllerDuotone } from "react-icons/pi";
// import { IoCopyOutline } from "react-icons/io5";
// import { PiGlobe } from "react-icons/pi";
// import { IoGameControllerOutline } from "react-icons/io5";
// import { FaLink } from "react-icons/fa6";
// import "./Home.css";
// import Rules from "./Rules";
// function Home() {
//   const [name,setName]=useState("");
//   const [createRoom,setCreateRoom]=useState("");
//   const [room,setRoom]=useState("");
//   const [copy, setCopy] = useState("COPY");
//   const [showRules, setShowRules] = useState(false);
//   const navigate = useNavigate();
  
//   const handleButton = () => {
//     setShowRules(true); // Show falling page
//   };
  
//   const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
//   const generateCode =()=>{
//         let code = " ";
//         const charLength = characters.length;
//         for(let i=0;i<10;i++)
//         {
//             code += characters.charAt(Math.floor(Math.random()*charLength));
//         }
//       return(code);
//     }; 


//     const handleCopy =()=>{
//         if(createRoom)
//         {
//           navigator.clipboard.writeText(createRoom);
//           setCopy("COPIED");
//         }
//         setTimeout(()=>{setCopy("COPY")},2000);
//   };
  
//   const handleGenerate=()=>{
//      const generatedRoomId = generateCode();
//       setCreateRoom(generatedRoomId);
//     };

//   return (
//     <>
//       <div className="container">
//         <div className="upperHalf"><img src={gameIcon} alt="gameIcon" className="gameImage" /></div>
//         <div className="lowerHalf">
//          <div className = "form-box">
//           <div className = "icon-boxx">
//              <img src={play} alt="icon" className="play-image" />
//           </div> 

//           <div className="form-boxx">
        
//             <div className="column">
//                 <h2>Create Room</h2>
//                 <div className="form-group">
//                    <FaUserAstronaut size="26px" className="form-icon" />
//                    <input
//                      type="text"
//                      id="createName"
//                      placeholder="User Name"
//                      className="form-input"
//                    />
//                 </div>

//                 <div className="form-group">
//                    <FaLink  size="26px" className="form-icon"/>
//                    <input
//                      type="text"
//                      id="link"
//                      placeholder="GENERATED LINK"
//                      className="generated-input"
//                      value={createRoom}
//                      readOnly
//                    />
//                 </div>

//                 <div className="form-group">
//                    <button type="button"  className="form-button" onClick={handleGenerate}>
//                      <GoLink   className="button-icon" />GENERATE
//                    </button>

//                    <button type="button" className="form-button" onClick={handleCopy}>
//                      <LuCopy className="button-icon" /> {copy}
//                    </button>
//                 </div>
//             </div>

//             <div className="orDiv"><img src={OR} alt="icon" className="or-image"/></div>
       
//             <div className="column">
//               <h2>Join Room</h2>
              
//               <div className="form-group">
//                 <FaUserNinja size="26px" className="form-icon" />
//                 <input
//                   type="text"
//                   id="createName"
//                   placeholder="Nickname"
//                   className="form-input"
//                   value={name}
//                   onChange={(e)=>{setName(e.target.value)}}
//                 />
//               </div>
                  
//               <div className="form-group">
//                 <PiGlobe size="26px" className="form-icon" />
//                 <input
//                   type="text"
//                   id="link"
//                   placeholder="JOINING LINK"
//                   className="generated-input"
//                   value={room} onChange={(e)=>{setRoom(e.target.value)}}
                  
//                 />
//               </div>

//               <div className="form-group">
//                 <button type="button" className="form-button" onClick={handleButton}>
//                   <PiGameControllerDuotone className="button-icon"/> PLAY!
//                 </button>
//               </div>
//             </div>
//           </div>
//          </div>
//         </div>
//       </div>
       
//     {showRules && (
//       <motion.div
//         className="falling-page"
//         initial={{ y: "-100vh" }}
//         animate={{ y: 0 }}
//         transition={{ duration:1, ease: "easeOut" }}
//       >
//         <Rules name={name} room={room} />
//       </motion.div>
//     )}
//   </>
// );
// }

// export default Home;


























import React,{useState} from "react";
import {useNavigate} from "react-router-dom";
import gameIcon from "./gameIcon.png";
import play from "./play.png";
import OR from './OR.png';
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";


import { FaUserAstronaut } from "react-icons/fa";
import { FaUserNinja } from "react-icons/fa6";
import { GoLink } from "react-icons/go";
import { IoIosLink } from "react-icons/io";
import { LuCopy } from "react-icons/lu";
import { PiGameControllerDuotone } from "react-icons/pi";
import { IoCopyOutline } from "react-icons/io5";
import { PiGlobe } from "react-icons/pi";
import { IoGameControllerOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";
import "./Home.css";
import Rules from "./Rules";
import bgVideo from "./bgVideo.mp4";


function Home() {
  const [name,setName]=useState("");
  const [createRoom,setCreateRoom]=useState("");
  const [room,setRoom]=useState("");
  const [copy, setCopy] = useState("COPY");
  const [showRules, setShowRules] = useState(false);

  const navigate = useNavigate();
  const handleButton=()=>{
     // navigate(`/game?name=${name}&roomId=${room}`);
    setShowRules(true); // Show falling page
    
    
  };


  const characters ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123456789";
  const generateCode =()=>{
        let code = " ";
        const charLength = characters.length;
        for(let i=0;i<10;i++)
        {
            code += characters.charAt(Math.floor(Math.random()*charLength));
        }
      return(code);
    }; 


    const handleCopy =()=>{
        if(createRoom)
        {
          navigator.clipboard.writeText(createRoom);
          setCopy("COPIED");
        }
        setTimeout(()=>{setCopy("COPY")},2000);
  };
  
  const handleGenerate=()=>{
     const generatedRoomId = generateCode();
      setCreateRoom(generatedRoomId);
    };

  return (
    <>
      <div className="container">
        
        <video loop autoPlay muted className="bg-video">
            <source src={bgVideo} type="video/mp4" />
        </video>
        
        <div className="upperHalf"><img src={gameIcon} alt="gameIcon" className="gameImage" /></div>
        <div className="lowerHalf">
         <div className = "form-box">
          <div className = "icon-boxx">
             <img src={play} alt="icon" className="play-image" />
          </div> 

          <div className="form-boxx">
        
            <div className="column">
                <h2>Create Room</h2>
                <div className="form-group">
                   <FaUserAstronaut size="26px" className="form-icon" />
                   <input
                     type="text"
                     id="createName"
                     placeholder="User Name"
                     className="form-input"
                   />
                </div>

                <div className="form-group">
                   <FaLink  size="26px" className="form-icon"/>
                   <input
                     type="text"
                     id="link"
                     placeholder="GENERATED LINK"
                     className="generated-input"
                     value={createRoom}
                     readOnly
                   />
                </div>

                <div className="form-group">
                   <button type="button"  className="form-button" onClick={handleGenerate}>
                     <GoLink   className="button-icon" />GENERATE
                   </button>

                   <button type="button" className="form-button" onClick={handleCopy}>
                     <LuCopy className="button-icon" /> {copy}
                   </button>
                </div>
            </div>

            <div className="orDiv"><img src={OR} alt="icon" className="or-image"/></div>
       
            <div className="column">
              <h2>Join Room</h2>
              
              <div className="form-group">
                <FaUserNinja size="26px" className="form-icon" />
                <input
                  type="text"
                  id="createName"
                  placeholder="Nickname"
                  className="form-input"
                  value={name}
                  onChange={(e)=>{setName(e.target.value)}}
                />
              </div>
                  
              <div className="form-group">
                <PiGlobe size="26px" className="form-icon" />
                <input
                  type="text"
                  id="link"
                  placeholder="JOINING LINK"
                  className="generated-input"
                  value={room} onChange={(e)=>{setRoom(e.target.value)}}
                  
                />
              </div>

              <div className="form-group">
                <button type="button" className="form-button-play" onClick={handleButton}>
                  <PiGameControllerDuotone className="button-icon"/> PLAY!
                </button>
              </div>
            </div>
          </div>
         </div>
        </div>
      </div>

      <AnimatePresence>
  {showRules && (
    <motion.div
      className="falling-page"
      initial={{ y: "-100vh" }}
      animate={{ y: 0 }}
      // exit={{ y: "-100vh" }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <Rules name={name} room={room} setShowRules={setShowRules} />
    </motion.div>
  )}
</AnimatePresence>


    </>
  );
}

export default Home;