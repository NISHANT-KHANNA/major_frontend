import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FallingPage.css";
import bgVideo from "./bgVideo.mp4";


const FallingPage = () => {
  const [falling, setFalling] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const navigate = useNavigate();

  const handlePlay = () => {
    setFalling(true); // Start the falling effect
    setTimeout(() => setShowContent(true), 1200); // Show content after the fall
  };

  useEffect(() => {
    if (showContent) {
      // After showing content for 3 seconds, navigate to a new page
      setTimeout(() => navigate("/new"), 3000);
    }
  }, [showContent, navigate]);

  return (
    <>
    

    <div className="container1">
      {!falling && (
        <>
          <video loop autoPlay muted className="bg-video">
            <source src={bgVideo} type="video/mp4" />
          </video>
        <button className="play-button" onClick={handlePlay}>
          Play
        </button>
        </>
      )}

      <div className={`falling-page ${falling ? "fall" : ""}`}>
        {showContent && (
          <h1 className="content">Welcome to the New Page!</h1>
        )}
      </div>
    </div>
    </>
  );
};

export default FallingPage;