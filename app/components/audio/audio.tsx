"use client";
import React, { useEffect, useState, useRef } from "react";

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef: any = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // Ensure audio is allowed to play after a user interaction
      const playPromise = audioRef.current.play();

      // Handle the play promise to check for errors
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch((error: any) => {
            console.error("Playback failed on iOS:", error);
          });
      }
    }
  };

  useEffect(() => {
    // Handle events for loaded data and error handling
    const audioElement = audioRef.current;
    
    const onLoadedData = () => {
      console.log("Audio loaded");
    };
    
    const onError = (event: any) => {
      console.error("Audio error:", event.target.error.message);
    };

    if (audioElement) {
      audioElement.addEventListener("loadeddata", onLoadedData);
      audioElement.addEventListener("error", onError);
    }

    return () => {
      // Cleanup event listeners
      if (audioElement) {
        audioElement.removeEventListener("loadeddata", onLoadedData);
        audioElement.removeEventListener("error", onError);
      }
    };
  }, []);

  return (
    <div className="text-center flex justify-center items-center mt-6">
      <button
        onClick={handlePlayPause}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <audio ref={audioRef} src="assets/audioFile.mp3" />
      <p>Audio Player Testing ..... </p>
    </div>
  );
}

export default AudioPlayer;
