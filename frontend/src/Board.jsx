import React from "react";
import { FaUndo, FaRedo, FaTrashAlt } from "react-icons/fa";
import "./Board.css";

function Board() {
  return (
    <>
      <div className="board-container">
        <div className="upper-section">
          <h1>DoodleDash Game Board</h1>
        </div>

       
        <div className="lower-section">
          <div className="players">
            <h2>Players</h2>
          </div>

          <div className="whiteboard-section">
            <div className="drawing-board">
              <p>Your drawing board will go here.</p>
            </div>
            <div className="tools-section">
              <button className="tool-button">
                <FaUndo /> Undo
              </button>
              <button className="tool-button">
                <FaRedo /> Redo
              </button>
              <input
                type="color"
              />
              <button className="tool-button">
                <FaTrashAlt /> Clear
              </button>

            
            </div>
          </div>

          <div className="chat-section">
            <h2>Chat</h2>
            <div className="chat-box">
              <p>Messages will appear here.</p>
            </div>
            <input
              type="text"
              className="chat-input"
              placeholder="Type your message..."
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Board;





{/*<center>*/}
      // <div>
      //   <canvas                                                   
      //     ref={canvasRef}
      //     onMouseDown={startDrawing}
      //     onMouseMove={draw}
      //     onMouseUp={endDrawing}
      //     onMouseLeave={endDrawing}
      //     className="canvas"
      //   />

      //   {isDrawer.current && (                                    // to give controls like color/undo/redo/clear only to the drawer
      //   <>
      //   <input
      //     type="color"
      //     value={color}
      //     onChange={(e) => setColor(e.target.value)}
      //   />
      //   <button onClick={handleClear}>CLEAR</button>
      //   <button onClick={handleUndo}>UNDO</button>
      //   <button onClick={handleRedo}>REDO</button>
      //  </>
      //  )}
      // </div>
      // <div className="chat-container">                                 {/* chat bar*/}
      //    <div className="chat-box">
      //       {messages.map((mssg,index)=>(
    //           <div className="chat-message">
    //              <strong>{mssg.sender}:</strong> {mssg.text}   
    //           </div>
    //         ))}
    //      </div>
    //      <input 
    //           type="text"
    //           placeholder="enter messgae..."
    //           value={message}
    //           onChange={(event)=>setMessage(event.target.value)}
    //           onKeyDown={(event)=>event.key==='Enter' && handleSendMessage()}
    //           className="chat-input"
    //      />
    //      <button className="send-button" onClick={handleSendMessage}>Send</button>
    //   </div>

    //   <div className="sidebar">                                  {/* side bar*/}
    //     <h3>Players List</h3>
    //     <ul>
    //        {players.map((player)=>(
    //           <li key = {player.id} > {player.name}{player.name === currentDrawer ? "(Drawing)" :""} -Score :{player.score} </li>
           
    //         ))}
    //     </ul>
    //   </div>
    //   <ToastContainer />
    // </center>