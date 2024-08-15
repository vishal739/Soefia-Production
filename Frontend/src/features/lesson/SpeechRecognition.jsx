import React, { useState } from "react";
import mic from "../../assets/mic.png";
const SpeechRecognition = ({ onSave }) => {
  const [listening, setListening] = useState(false);
  const recognition =
    window.SpeechRecognition || window.webkitSpeechRecognition
      ? new (window.SpeechRecognition || window.webkitSpeechRecognition)()
      : null;

  const handleStart = () => {
    if (recognition) {
      setListening(true);
      recognition.start();
      recognition.onresult = (event) => {
        const speechToText = event.results[0][0].transcript;
        onSave(speechToText);
        setListening(false);
      };
    } else {
      alert("Speech Recognition API is not supported in this browser.");
    }
  };

  return (
    <div className="speech-recognition">
      {/* <img
        src={mic}
        alt="Mic"
        className="mic-icon"
      /> */}
      <button onClick={handleStart} disabled={listening}>
        {listening ? "Listening..." : "Talk to Me"}
      </button>
    </div>
  );
};

export default SpeechRecognition;