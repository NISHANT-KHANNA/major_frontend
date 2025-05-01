// import React, { useEffect, useState, useRef } from "react";
// import { useSearchParams ,useNavigate} from "react-router-dom";
// import io from 'socket.io-client';                         // for socket -client communication
// import { ToastContainer, toast } from 'react-toastify';    // for notification
// import 'react-toastify/dist/ReactToastify.css';            // for notification css
// // import "./game.css";
// import { FaUndo, FaRedo, FaTrashAlt } from "react-icons/fa";
// import { createAvatar } from '@dicebear/core';
// import { lorelei } from '@dicebear/collection';
// import "./Board.css";
// import audio2 from "./audio00.mp3";


// const Game = () => {
//   const navigate = useNavigate();                               // to navigate the page to winner.jsx
//   const [searchParams] = useSearchParams();                    // to get the roomId and name of the player through the link
//   const name = searchParams.get('name');
//   const roomId = searchParams.get('roomId');

// // set of hooks ----------------------------------------------------------------------------------------------------

//   const canvasRef = useRef(null);                               // for canvas refrencing
//   const contextRef = useRef(null);                              // for shapes refrencing
//   const isDrawing = useRef(false);                              // to check whether the pencil is drawing or not
//   const isDrawer = useRef(false);                               // to check who is the current drawer
//   const socket = useRef(null);                                  // to join the frontend communication with backend
//   const [color, setColor] = useState("black");                  // to set the color of the pencil
//   const undoStack = useRef([]);                                 // a stack or array to store the elements that are done undo 
//   const redoStack = useRef([]);                                 // a stack or array to store the elements that are done redo 
//   const currentLine = useRef([]);                               // to store the line points 
//   const [message,setMessage]=useState("");                      //sets the current message of the player
//   const [messages,setMessages]=useState([]);                    //array to store the messages of all the players
//   const [players,setPlayers]=useState([]);                      // array to store the information of all the players playing in the current room
//   const [wordToDraw ,setWordToDraw]= useState("");              // to store the word for the current drawer to draw
//   const [underscoreWord ,setUnderscoreWord]= useState("");              // to store the word for the current drawer to draw
//   const [currentDrawer ,setCurentDrawer] = useState(null);      // to store the name of the current drawer
//   // const [dataUri, setDataUri] = useState("");
//   const [timer,setTimer] = useState(30);
//   const audioPlayed = useRef(null);


//  // avatar code 
// // useEffect(() => {
// //   const avatar = createAvatar(lorelei, {
// //     seed: name,
// //     size: 60,
// //     backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "red", "blue"],
// //     backgroundType: ["gradientLinear"],
// //     radius: 60,
// //   });
// //   const avatarDataUri = avatar.toDataUri(); // Generate the Data URI
// //   setDataUri(avatarDataUri); // Store it in state
// // }, []);


// // listen for timer updates 
// // useEffect(()=>{
// //    socket.current.on("timerUpdate", (timeLeft) => {
// //       setTimer(timeLeft);
// //    });
// // },[]);
// //  useEffect(() => {
// //     const avatar = createAvatar(lorelei, {
// //     seed:name,
// //     size: 300,
// //     backgroundColor: ["b6e3f4","c0aede","d1d4f9","red","blue"],
// //     backgroundType: ["gradientLinear"],
// //     radius: 60,
// // });
 
// // const dataUri = avatar.toDataUri();
// // setDataUri(dataUri); 
// // },[name]);

// useEffect(() => {
//     audioPlayed.current = false;
//   }, [timer]);

  
// // code for the canvas setup ----------------------------------------------------------------------------------------------------

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     canvas.width = 870;
//     canvas.height = 530;
//     const context = canvas.getContext('2d');
//     context.strokeStyle = color;
//     context.lineWidth = 5;
//     context.lineCap = 'round';
//     contextRef.current = context;


// //----------------------------------------------------------------------------------------------------

//     // Initialize socket connection
//     socket.current = io('http://localhost:5000');

//     // Join room with the id 
//     socket.current.emit('joinroom', { name, roomId });

//     //toast notification to the user
//      toast.success(`${name} has entered the room!`,{theme: "dark"});

//     //updating the player list with the users added to the game
//      socket.current.on("updatePlayerList",(players)=>{
//           setPlayers(players);   
//      });

//     // to get the word and emit it only to the current drawer not to anyone else
//     socket.current.on("wordToDraw" ,(word)=>{
//        handleClear();                       // each time new word for new player the canvas to be cleared to clear all undo/redo stacks
//        isDrawer.current = true;             //set the person is the current drawer
//        setWordToDraw(word);
//        toast.info(`Your word is : ${word}`,{theme:"dark"});
//     });

//   // to get the drawer name and to notify to all the players
//     socket.current.on("turnStarted",({drawerName,wordLength})=>{
//         if (drawerName !== name) {
//            isDrawer.current=false;     // disable every other player as not the drawer
//            isDrawing.current = false;  // Disable drawing for other players
//         }   
//         let  result = "_ ".repeat(wordLength);
//         setUnderscoreWord(result);
//         setCurentDrawer(drawerName);
//         toast.info(`${drawerName} is drawing!` , {theme:"dark"});
//     });
    
//     // let hasPlayed = false; 
//     let count =0;
//     socket.current.on("timerUpdate", (timeLeft) => {
//       setTimer(timeLeft);
//       // hasPlayed = false;
//       // console.log(`Received timer update: ${timeLeft} seconds`);
//        if(timeLeft <= 100 && !audioPlayed.current) {
//         // console.log(count);
//         count++;
//         const audio = new Audio(audio2);
//         audio.play();
//         audioPlayed.current = true; // Ensure it doesn't play again
//       }
//    });

//     // Receive drawing event from other users
//     socket.current.on('drawing', (data) => {
//       const { startX, startY, endX, endY, width, height, stroke ,receivedTime  } = data;
//       const scaleX = canvas.width / width;
//       const scaleY = canvas.height / height;
//       const latency = Date.now() - data.receivedTime;
//         console.log("Latency:", latency, "ms");
//       drawOnCanvas(startX * scaleX, startY * scaleY, endX * scaleX, endY * scaleY, stroke);
//     });

//     // Receive clearCanvas event from the server
//     socket.current.on('clearCanvas', clearCanvas);

//     // Receive stack updates and synchronize the undo/redo stacks
//     socket.current.on("updateStacks", ({ undo, redo }) => {
//       undoStack.current = undo;
//       redoStack.current = redo;
//       clearCanvas();
//       redrawCanvas();
//     });

//   // to get the message sent from the backend
//     socket.current.on("chatMessage",(data)=>{
//         setMessages((prevMessages)=>[...prevMessages,data]);
//     });

//     return () => {
//       socket.current.disconnect();
//     };
//   }, [name, roomId]);


// //to change the color of the pencil each time color input is clicked ------------------------------------------------------------------

//   useEffect(() => {
//     contextRef.current.strokeStyle = color;
//   }, [color]);

// //to get the correct/wrong guess and also do the gameover ------------------------------------------------------------------

//    useEffect(() => {
//       socket.current.on("correctGuess",({playerName})=>{
//           toast.success(`${playerName} has got the word correctly!!`,{theme:"dark"});
//       });
//       socket.current.on("wrongGuess",()=>{
//          toast.error("Wrong Guess,Try Again!!",{theme:"dark"});
//       });
//       socket.current.on("gameOver",({winner , score})=>{
//            navigate("/result",{state:{winner,score}});
//       });
//       return () => {
//         socket.current.off('gameOver');   // Clean up the event listener
//       };
//     }, [navigate]);

  
 
// //clearing the canvas ----------------------------------------------------------------------------------------------------

//   const clearCanvas = () => {
//     const canvas = canvasRef.current;
//     const context = canvas.getContext('2d');
//     context.clearRect(0, 0, canvas.width, canvas.height);
//   };

//   // Emit clearCanvas event to the server
//   const handleClear = () => {
//     clearCanvas();
//     undoStack.current = [];                //emptying the undo stack
//     redoStack.current = [];                //emptying the redo stack
//     socket.current.emit('updateStacks', { roomId, undo: undoStack.current, redo: redoStack.current });
//     socket.current.emit('clearCanvas', roomId);
//   };


// //emiting the messages and guesses to the server -------------------------------------------------------------------------------

//   const handleSendMessage=()=>{
//     if(message.trim() === "")  return;      // if no message written then no action performed 
      
//       if(!isDrawer.current){
//           socket.current.emit("guessSubmit",{roomId,guess:message,playerName:name,time:timer,drawerName:currentDrawer});        //emiting the guess to the server
//         }
//         else{ 
//             toast.error("You cannot send messages while drawing!",{theme:"dark"});                           
//             // const chatData = {sender:name ,text :message};                           
//             // socket.current.emit("chatMessage",{roomId,...chatData});                        // emtiing the normal chat to the server
//             // setMessages((prevMessages)=>[...prevMessages,chatData]);
              
//         }
//        setMessage("");                                    // after each message clearing the input panel
//   }; 


//  // to handle the drawing events -----------------------------------------------------------------------------------

//   const startDrawing = (e) => {                               // on mouse down 
//     if(isDrawer.current){                                     // to check if the player is drawer then only drawing allowed   
//     isDrawing.current = true;
//     currentLine.current = [];
//     const { offsetX, offsetY } = e.nativeEvent;
//     contextRef.current.moveTo(offsetX, offsetY);
//     }
//     if(!isDrawing.current) return;                            // to check if the player is guesses no drawing allowed
    
//   };

//   const draw = (e) => {                                         // on mouse move 
//     if (!isDrawing.current) return;
//     const { offsetX, offsetY, movementX, movementY } = e.nativeEvent;

//     const newEndX = offsetX;
//     const newEndY = offsetY;
//     const newStartX = newEndX - movementX;
//     const newStartY = newEndY - movementY;

//     drawOnCanvas(newStartX, newStartY, newEndX, newEndY, color);      //emiting points to the draw canvas to draw along with color 
//     currentLine.current.push({ startX: newStartX, startY: newStartY, endX: newEndX, endY: newEndY, stroke: color });

//     // Emit drawing event to the server, include canvas dimensions
//     socket.current.emit('drawing', {
//       roomId,
//       startX: newStartX,
//       startY: newStartY,
//       endX: newEndX,
//       endY: newEndY,
//       width: canvasRef.current.width,
//       height: canvasRef.current.height,
//       stroke: color,
//     });
//   };

//   const endDrawing = () => {                     // on mouse up ending the drawing 
//     if(isDrawer.current){
//       isDrawing.current = false;
//     if (currentLine.current.length > 0) {
//       const action = { line: [...currentLine.current], stroke: color };
//       undoStack.current.push(action);
//       console.log(undoStack.current);
//       // redoStack.current = [];
//       socket.current.emit('updateStacks', { roomId, undo: undoStack.current, redo: redoStack.current });
//     }
//     }
//     if (!isDrawing.current) return;
    
      

//   };

//   const drawOnCanvas = (startX, startY, endX, endY, stroke) => {                 //used to draw the drawing on canvas
//     if (contextRef.current) {
//       contextRef.current.beginPath();
//       contextRef.current.moveTo(startX, startY);
//       contextRef.current.lineTo(endX, endY);
//       contextRef.current.strokeStyle = stroke || contextRef.current.strokeStyle;
//       contextRef.current.stroke();
//       contextRef.current.closePath();
//     }
//   };


// // handling undo/redo of the drawing -----------------------------------------------------------------------------------------------

//   const handleUndo = () => {
//     if (undoStack.current.length === 0) return;
//     const lastUndoAction = undoStack.current.pop();        //poping the last/recent drawn element 
//     redoStack.current.push(lastUndoAction);                //pushing the popped element 
//     clearCanvas();                                         // clearing the canvas
//     redrawCanvas();                                        // redrawing on then canvas excluding the popeed element
//     socket.current.emit('updateStacks', { roomId, undo: undoStack.current, redo: redoStack.current });  //emiting the new drawing to server
//   };

//   const handleRedo = () => {
//     if (redoStack.current.length === 0) return;
//     const lastRedoAction = redoStack.current.pop();           //poping the last/recent redo element 
//     undoStack.current.push(lastRedoAction);                   //pushing the popped element 
//     redrawLine(lastRedoAction);                               // redrawing on then canvas including the popeed element
//     socket.current.emit('updateStacks', { roomId, undo: undoStack.current, redo: redoStack.current });   //emiting the new drawing to server
//   };

//   const redrawCanvas = () => {
//     undoStack.current.forEach((action) => {
//       action.line.forEach(({ startX, startY, endX, endY }) => {
//         drawOnCanvas(startX, startY, endX, endY, action.stroke);
//       });
//     });
//   };

//   const redrawLine = (action) => {
//     action.line.forEach(({ startX, startY, endX, endY }) => {
//       drawOnCanvas(startX, startY, endX, endY, action.stroke);
//     });
//   };

 




// // the body code of the project ------------------------------------------------------------------------------------------------

//   return (
//     <>
//       <div className="board-container">
//         {/*<div className="upper-section">
//           {
//             isDrawer.current 
//                  ? <h1>{wordToDraw}</h1>
//                  : <h1>DoodleDash Game Board</h1>
//           }
          
//         </div>
//         <div class="timer-container">
//              <div class="timer-line" id="timerLine" 
//                   style={{
//                     width:`${(timer/30)*100}%`,
//                     backgroundColor: timer>20? "green" : timer > 10 ? "orange" : "red",
//                   }}>
//              </div>
//         </div>*/}
//        <div className="upper-section">
//     {
//       isDrawer.current 
//         ? <h1>{wordToDraw}</h1>
//         : <h1>{underscoreWord}</h1>
//     }
//   </div>
//   <div className="timer-container-wrapper">
//     <div className="timer-container">
//       <div className="timer-line" 
//            style={{
//              width: `${(timer / 300) * 100}%`,
//              backgroundColor: timer > 200 ? "green" : timer > 100 ? "orange" : "red"
//            }}>
//       </div>
//     </div>
//   </div>
//         <div className="lower-section">
//           <div className="players">
//             {/*<h2>Players</h2>*/}
//             {/*<ul>*/}
//                 {players.map((player)=>(
//                   <div key = {player.id}  className="playerPart">
//                     <div className="leftPart">
//                        <img src= {player.avatar} alt="pic" />

//                     </div>
//                     <div className="rightPart">
//                       <h3>{player.name}{player.name === currentDrawer ? "✏️" :""}</h3>
//                       <p> {player.score}</p>
//                     </div>
                    
//                   </div>
//                 // <li key = {player.id} > {player.name}{player.name === currentDrawer ? "(Drawing)" :""} -Score :{player.score} </li>
           
//                 ))}
//             {/*</ul>*/}
//           </div>


//           <div className="whiteboard-section">
            
//             <div className="drawing-board">
//               <canvas                                                   
//                 ref={canvasRef}
//                 onMouseDown={startDrawing}
//                 onMouseMove={draw}
//                 onMouseUp={endDrawing}
//                 onMouseLeave={endDrawing}
//                 className="canvas"
//               />
//             </div>

//             <div className="tools-section">
              
//               {isDrawer.current && (                                    // to give controls like color/undo/redo/clear only to the drawer
//                 <>
//                 <input
//                   type="color"
//                   value={color}
//                   onChange={(e) => setColor(e.target.value)}
//                 />
//                 <button className="tool-button" onClick={handleUndo}>
//                       <FaUndo /> Undo
//                 </button>

//                 <button className="tool-button" onClick={handleRedo}>
//                       <FaRedo /> Redo
//                 </button>
                
//                 <button className="tool-button" onClick={handleClear}>
//                       <FaTrashAlt /> Clear
//                 </button>
//                </>
//                )}
//              </div>
            
//             </div>
              
//              {/* <input
//                 type="color"
//               />*/}
              
//           <div className="chat-section">
//             <h2>Chat</h2>
//             <div className="chat-box">
//               {messages.map((mssg,index)=>(
//               <div key={index} className={`chat-message ${mssg.isCorrect ? "correct" : ""}`}>
//                  <strong>{mssg.sender}:</strong> {mssg.text}   
//               </div>
//             ))}
//             </div>
//             <input
//               type="text"
//               className="chat-input"
//               placeholder="Type your message..."              
//               value={message}
//               onChange={(event)=>setMessage(event.target.value)}
//               onKeyDown={(event)=>event.key==='Enter' && handleSendMessage()}
//             />
//           </div>
//         </div>
//         </div>
//         <ToastContainer />
//     </>
//   );
// };

// export default Game;




import React, { useEffect, useState, useRef } from "react";
import { useSearchParams ,useNavigate} from "react-router-dom";
import io from 'socket.io-client';                         // for socket -client communication
import { ToastContainer, toast } from 'react-toastify';    // for notification
import 'react-toastify/dist/ReactToastify.css';            // for notification css
// import "./game.css";
import { FaUndo, FaRedo, FaTrashAlt } from "react-icons/fa";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';
import "./Board.css";
import audio2 from "./audio00.mp3";
import logo from "./gameIcon.png";

const Game = () => {
  const navigate = useNavigate();                               // to navigate the page to winner.jsx
  const [searchParams] = useSearchParams();                    // to get the roomId and name of the player through the link
  const name = searchParams.get('name');
  const roomId = searchParams.get('roomId');

// set of hooks ----------------------------------------------------------------------------------------------------

  const canvasRef = useRef(null);                               // for canvas refrencing
  const contextRef = useRef(null);                              // for shapes refrencing
  const isDrawing = useRef(false);                              // to check whether the pencil is drawing or not
  const isDrawer = useRef(false);                               // to check who is the current drawer
  const socket = useRef(null);                                  // to join the frontend communication with backend
  const [color, setColor] = useState("black");                  // to set the color of the pencil
  const undoStack = useRef([]);                                 // a stack or array to store the elements that are done undo 
  const redoStack = useRef([]);                                 // a stack or array to store the elements that are done redo 
  const currentLine = useRef([]);                               // to store the line points 
  const [message,setMessage]=useState("");                      //sets the current message of the player
  const [messages,setMessages]=useState([]);                    //array to store the messages of all the players
  const [players,setPlayers]=useState([]);                      // array to store the information of all the players playing in the current room
  const [wordToDraw ,setWordToDraw]= useState("");              // to store the word for the current drawer to draw
  const [underscoreWord ,setUnderscoreWord]= useState("");              // to store the word for the current drawer to draw
  const [currentDrawer ,setCurentDrawer] = useState(null);      // to store the name of the current drawer
  // const [dataUri, setDataUri] = useState("");
  const [timer,setTimer] = useState(30);
  const audioPlayed = useRef(null);


 // avatar code 
// useEffect(() => {
//   const avatar = createAvatar(lorelei, {
//     seed: name,
//     size: 60,
//     backgroundColor: ["b6e3f4", "c0aede", "d1d4f9", "red", "blue"],
//     backgroundType: ["gradientLinear"],
//     radius: 60,
//   });
//   const avatarDataUri = avatar.toDataUri(); // Generate the Data URI
//   setDataUri(avatarDataUri); // Store it in state
// }, []);


// listen for timer updates 
// useEffect(()=>{
//    socket.current.on("timerUpdate", (timeLeft) => {
//       setTimer(timeLeft);
//    });
// },[]);
//  useEffect(() => {
//     const avatar = createAvatar(lorelei, {
//     seed:name,
//     size: 300,
//     backgroundColor: ["b6e3f4","c0aede","d1d4f9","red","blue"],
//     backgroundType: ["gradientLinear"],
//     radius: 60,
// });
 
// const dataUri = avatar.toDataUri();
// setDataUri(dataUri); 
// },[name]);

useEffect(() => {
    audioPlayed.current = false;
  }, [timer]);

  
// code for the canvas setup ----------------------------------------------------------------------------------------------------

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 870;
    canvas.height = 530;
    const context = canvas.getContext('2d');
    context.strokeStyle = color;
    context.lineWidth = 5;
    context.lineCap = 'round';
    contextRef.current = context;


//----------------------------------------------------------------------------------------------------

    // Initialize socket connection
    socket.current = io('http://localhost:5000');

    // Join room with the id 
    socket.current.emit('joinroom', { name, roomId });

    //toast notification to the user
     toast.success(`${name} has entered the room!`,{theme: "dark"});

    //updating the player list with the users added to the game
     socket.current.on("updatePlayerList",(players)=>{
          setPlayers(players);   
     });

    // to get the word and emit it only to the current drawer not to anyone else
    socket.current.on("wordToDraw" ,(word)=>{
       handleClear();                       // each time new word for new player the canvas to be cleared to clear all undo/redo stacks
       isDrawer.current = true;             //set the person is the current drawer
       setWordToDraw(word);
       toast.info(`Your word is : ${word}`,{theme:"dark"});
    });

  // to get the drawer name and to notify to all the players
    socket.current.on("turnStarted",({drawerName,wordLength})=>{
        if (drawerName !== name) {
           isDrawer.current=false;     // disable every other player as not the drawer
           isDrawing.current = false;  // Disable drawing for other players
        }   
        let  result = "_ ".repeat(wordLength);
        setUnderscoreWord(result);
        setCurentDrawer(drawerName);
        toast.info(`${drawerName} is drawing!` , {theme:"dark"});
    });
    
    // let hasPlayed = false; 
    let count =0;
    socket.current.on("timerUpdate", (timeLeft) => {
      setTimer(timeLeft);
      // hasPlayed = false;
      // console.log(`Received timer update: ${timeLeft} seconds`);
       if(timeLeft <= 100 && !audioPlayed.current) {
        // console.log(count);
        count++;
        const audio = new Audio(audio2);
        audio.play();
        audioPlayed.current = true; // Ensure it doesn't play again
      }
   });

    // Receive drawing event from other users
    socket.current.on('drawing', (data) => {
      const { startX, startY, endX, endY, width, height, stroke ,receivedTime  } = data;
      const scaleX = canvas.width / width;
      const scaleY = canvas.height / height;
      const latency = Date.now() - data.receivedTime;
        console.log("Latency:", latency, "ms");
      drawOnCanvas(startX * scaleX, startY * scaleY, endX * scaleX, endY * scaleY, stroke);
    });

    // Receive clearCanvas event from the server
    socket.current.on('clearCanvas', clearCanvas);

    // Receive stack updates and synchronize the undo/redo stacks
    socket.current.on("updateStacks", ({ undo, redo }) => {
      undoStack.current = [...undo];
      redoStack.current = [...redo];
      clearCanvas();
      redrawCanvas();
    });

  // to get the message sent from the backend
    socket.current.on("chatMessage",(data)=>{
        setMessages((prevMessages)=>[...prevMessages,data]);
    });

    return () => {
      socket.current.disconnect();
    };
  }, [name, roomId]);


//to change the color of the pencil each time color input is clicked ------------------------------------------------------------------

  useEffect(() => {
    contextRef.current.strokeStyle = color;
  }, [color]);

//to get the correct/wrong guess and also do the gameover ------------------------------------------------------------------

   useEffect(() => {
      socket.current.on("correctGuess",({playerName})=>{
          toast.success(`${playerName} has got the word correctly!!`,{theme:"dark"});
      });
      socket.current.on("wrongGuess",()=>{
         toast.error("Wrong Guess,Try Again!!",{theme:"dark"});
      });
      socket.current.on("gameOver",({winner , score})=>{
           navigate("/result",{state:{winner,score}});
      });
      return () => {
        socket.current.off('gameOver');   // Clean up the event listener
      };
    }, [navigate]);

  
 
//clearing the canvas ----------------------------------------------------------------------------------------------------

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Emit clearCanvas event to the server
  const handleClear = () => {
    clearCanvas();
    undoStack.current = [];                //emptying the undo stack
    redoStack.current = [];                //emptying the redo stack
    socket.current.emit('updateStacks', { roomId, undo: undoStack.current, redo: redoStack.current });
    socket.current.emit('clearCanvas', roomId);
  };


//emiting the messages and guesses to the server -------------------------------------------------------------------------------

  const handleSendMessage=()=>{
    if(message.trim() === "")  return;      // if no message written then no action performed 
      
      if(!isDrawer.current){
          socket.current.emit("guessSubmit",{roomId,guess:message,playerName:name,time:timer,drawerName:currentDrawer});        //emiting the guess to the server
        }
        else{ 
            toast.error("You cannot send messages while drawing!",{theme:"dark"});                           
            // const chatData = {sender:name ,text :message};                           
            // socket.current.emit("chatMessage",{roomId,...chatData});                        // emtiing the normal chat to the server
            // setMessages((prevMessages)=>[...prevMessages,chatData]);
              
        }
       setMessage("");                                    // after each message clearing the input panel
  }; 


 // to handle the drawing events -----------------------------------------------------------------------------------

  const startDrawing = (e) => {                               // on mouse down 
    if(isDrawer.current){                                     // to check if the player is drawer then only drawing allowed   
    isDrawing.current = true;
    currentLine.current = [];
    const { offsetX, offsetY } = e.nativeEvent;
    contextRef.current.moveTo(offsetX, offsetY);
    }
    if(!isDrawing.current) return;                            // to check if the player is guesses no drawing allowed
    
  };

  const draw = (e) => {                                         // on mouse move 
    if (!isDrawing.current) return;
    const { offsetX, offsetY, movementX, movementY } = e.nativeEvent;

    const newEndX = offsetX;
    const newEndY = offsetY;
    const newStartX = newEndX - movementX;
    const newStartY = newEndY - movementY;

    drawOnCanvas(newStartX, newStartY, newEndX, newEndY, color);      //emiting points to the draw canvas to draw along with color 
    currentLine.current.push({ startX: newStartX, startY: newStartY, endX: newEndX, endY: newEndY, stroke: color });

    // Emit drawing event to the server, include canvas dimensions
    socket.current.emit('drawing', {
      roomId,
      startX: newStartX,
      startY: newStartY,
      endX: newEndX,
      endY: newEndY,
      width: canvasRef.current.width,
      height: canvasRef.current.height,
      stroke: color,
    });
  };

  const endDrawing = () => {                     // on mouse up ending the drawing 
    if(isDrawer.current){
      isDrawing.current = false;
    if (currentLine.current.length > 0) {
      const action = { line: [...currentLine.current], stroke: color };
      undoStack.current.push(action);
      console.log(undoStack.current);
      // redoStack.current = [];
      socket.current.emit('updateStacks', { 
      roomId, 
      undo: [...undoStack.current],  // Send a copy to avoid mutation issues
      redo: [...redoStack.current]
    });
    }
    }
     currentLine.current = [];
    if (!isDrawing.current) return;
    
      

  };

  const drawOnCanvas = (startX, startY, endX, endY, stroke) => {                 //used to draw the drawing on canvas
    if (contextRef.current) {
      contextRef.current.beginPath();
      contextRef.current.moveTo(startX, startY);
      contextRef.current.lineTo(endX, endY);
      contextRef.current.strokeStyle = stroke || contextRef.current.strokeStyle;
      contextRef.current.stroke();
      contextRef.current.closePath();
    }
  };


// handling undo/redo of the drawing -----------------------------------------------------------------------------------------------

  const handleUndo = () => {
    if (undoStack.current.length === 0) return;
    const lastUndoAction = undoStack.current.pop();        //poping the last/recent drawn element 
    redoStack.current.push(lastUndoAction);                //pushing the popped element 
    clearCanvas();                                         // clearing the canvas
    redrawCanvas();                                        // redrawing on then canvas excluding the popeed element
    socket.current.emit('updateStacks', { 
    roomId, 
    undo: [...undoStack.current], 
    redo: [...redoStack.current] 
  });
   };

  const handleRedo = () => {
    if (redoStack.current.length === 0) return;
    const lastRedoAction = redoStack.current.pop();           //poping the last/recent redo element 
    undoStack.current.push(lastRedoAction);                   //pushing the popped element 
    redrawLine(lastRedoAction);                               // redrawing on then canvas including the popeed element
    socket.current.emit('updateStacks', { roomId, undo: undoStack.current, redo: redoStack.current });   //emiting the new drawing to server
  };

  const redrawCanvas = () => {
    undoStack.current.forEach((action) => {
      action.line.forEach(({ startX, startY, endX, endY }) => {
        drawOnCanvas(startX, startY, endX, endY, action.stroke);
      });
    });
  };

  const redrawLine = (action) => {
    action.line.forEach(({ startX, startY, endX, endY }) => {
      drawOnCanvas(startX, startY, endX, endY, action.stroke);
    });
  };

 




// the body code of the project ------------------------------------------------------------------------------------------------

  return (
    <>
      <div className="board-container">
        {/*<div className="upper-section">
          {
            isDrawer.current 
                 ? <h1>{wordToDraw}</h1>
                 : <h1>DoodleDash Game Board</h1>
          }
          
        </div>
        <div class="timer-container">
             <div class="timer-line" id="timerLine" 
                  style={{
                    width:`${(timer/30)*100}%`,
                    backgroundColor: timer>20? "green" : timer > 10 ? "orange" : "red",
                  }}>
             </div>
        </div>*/}
       <div className="upper-section">
       <div className="image-section">
         <img src={logo} alt="logo" className="logo" />
       </div>
       
       <div className="word-section">
      {
        isDrawer.current 
          ? <h1>{wordToDraw}</h1>
          : <h1>{underscoreWord}</h1>
      }
       </div>
       
       <div className="roomId-section">
         <p>{roomId}</p>
       </div>
  </div>
  <div className="timer-container-wrapper">
    <div className="timer-container">
      <div className="timer-line" 
           style={{
             width: `${(timer / 300) * 100}%`,
             backgroundColor: timer > 200 ? "green" : timer > 100 ? "orange" : "red"
           }}>
      </div>
    </div>
  </div>
        <div className="lower-section">
          <div className="players">
            {/*<h2>Players</h2>*/}
            {/*<ul>*/}
                {players.map((player)=>(
                  <div key = {player.id}  className="playerPart">
                    <div className="leftPart">
                       <img src= {player.avatar} alt="pic" />

                    </div>
                    <div className="rightPart">
                      <h3>{player.name}{player.name === currentDrawer ? "✏️" :""}</h3>
                      <p> {player.score}</p>
                    </div>
                    
                  </div>
                // <li key = {player.id} > {player.name}{player.name === currentDrawer ? "(Drawing)" :""} -Score :{player.score} </li>
           
                ))}
            {/*</ul>*/}
          </div>


          <div className="whiteboard-section">
            
            <div className="drawing-board">
              <canvas                                                   
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={endDrawing}
                onMouseLeave={endDrawing}
                className="canvas"
              />
            </div>

            <div className="tools-section">
              
              {isDrawer.current && (                                    // to give controls like color/undo/redo/clear only to the drawer
                <>
                <input
                  type="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                />
                <button className="tool-button" onClick={handleUndo}>
                      <FaUndo />
                </button>

                <button className="tool-button" onClick={handleRedo}>
                      <FaRedo /> 
                </button>
                
                <button className="tool-button" onClick={handleClear}>
                      <FaTrashAlt /> 
                </button>
               </>
               )}
             </div>
            
            </div>
              
             {/* <input
                type="color"
              />*/}
              
          <div className="chat-section">
            {/*<h2>Chat</h2>*/}
            <div className="chat-box">
              {messages.map((mssg,index)=>(
              // <div key={index} className={`chat-message ${mssg.isCorrect ? "correct" : ""}`}>
                <div key={index} className={`chat-message ${mssg.isCorrect ? "correct" : mssg.text === wordToDraw ? "word" : ""}`}>

                 <strong>{mssg.sender}:</strong> {mssg.text}   
              </div>
            ))}
            </div>
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."              
              value={message}
              onChange={(event)=>setMessage(event.target.value)}
              onKeyDown={(event)=>event.key==='Enter' && handleSendMessage()}
            />
          </div>
        </div>
        </div>
        <ToastContainer />
    </>
  );
};

export default Game;




