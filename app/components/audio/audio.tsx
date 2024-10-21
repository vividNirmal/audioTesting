"use client"
import React, { useEffect, useState, useRef } from 'react';


function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef :any = useRef(null);

  const handlePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audioRef.current.addEventListener('loadeddata', () => {
      console.log('Audio loaded');
    });

    audioRef.current.addEventListener('error', (event:any ) => {
      console.error('Audio error:', event.target.error.message);
    });
  }, []);

  return (
    <div  className='text-center flex justify-center items-center mt-6'>
      <button onClick={handlePlayPause} className='bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>

        {isPlaying ? 'Pause' : 'Play'}
      </button>
      <audio ref={audioRef} src="assets/audioFile.mp3" />
    </div>
  );
}

export default AudioPlayer;