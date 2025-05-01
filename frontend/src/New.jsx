import React, {useState ,useEffect } from "react";
import { FaUndo, FaRedo, FaTrashAlt } from "react-icons/fa";
import { createAvatar } from '@dicebear/core';
import { lorelei } from '@dicebear/collection';


// const svg = avatar.toString();
// import "./Board.css";

function New() {
  const [dataUri, setDataUri] = useState("");
  const [name, setName] = useState("");
  useEffect(() => {
    const avatar = createAvatar(lorelei, {
    seed:name,
    size: 300,
    backgroundColor: ["b6e3f4","c0aede","d1d4f9","red","blue"],
    backgroundType: ["gradientLinear"],
    radius: 100,
});
 
const dataUri = avatar.toDataUri();
setDataUri(dataUri); 
},[name]);
  return (
    <>
    
    <input type="text" onChange ={(e)=> setName(e.target.value)} />

    <img src={dataUri}  alt="photo" />
    <p>{dataUri}</p>
    </>
    );
   
};
export default New;