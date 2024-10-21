"use client";
import React, { useRef, useState } from "react";

const AudioSequencePlayer: React.FC = () => {
  const audioRefs = useRef<(HTMLAudioElement | null)[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const [isPlaying, setIsPlaying] = useState(false); // Track playing state

  const audioSources = [
    "assets/audio1.mp3",
    "assets/audio2.mp3",
    "assets/audio3.mp3",
    "assets/audio4.mp3",
    "assets/audio5.mp3",
    "assets/audio6.mp3",
  ];

  const handlePlayPause = () => {
    if (isPlaying) {
      pauseAudioSequence();
    } else {
      playAudioSequence();
    }
  };

  const playAudioSequence = () => {
    // Create a new AudioContext if it doesn't exist
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext )();
    }

    // Check if the AudioContext is suspended
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume().then(() => {
        console.log('Audio context resumed');
        playNextAudio(0); // Start playing from the first audio
      }).catch((error) => {
        console.error('Failed to resume audio context:', error);
      });
    } else {
      playNextAudio(0); // Start playing from the first audio
    }
  };

  const pauseAudioSequence = () => {
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.pause(); // Pause all audio elements
      }
    });
    setIsPlaying(false);
  };

  const playNextAudio = (currentAudioIndex: number) => {
    if (currentAudioIndex < audioRefs.current.length) {
      const audio = audioRefs.current[currentAudioIndex];
      if (audio) {
        const playPromise = audio.play();

        // Handle the play promise to check for errors
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              console.log(`Audio ${currentAudioIndex + 1} is playing`);
              setIsPlaying(true); // Update state to indicate playing
            })
            .catch((error: any) => {
              console.error(`Playback failed for audio ${currentAudioIndex + 1}:`, error);
              alert(`Playback failed for audio ${currentAudioIndex + 1}. Please try again.`);
            });
        }          
        audio.onended = () => {
          setTimeout(() => playNextAudio(currentAudioIndex + 1), 2000); // 2 seconds delay before playing next audio
        };
      }
    } else {
      setIsPlaying(false); // Reset state when playback finishes
    }
  };

  return (
    <div className="text-center flex flex-col items-center mt-6">
      <button
        onClick={handlePlayPause}
        className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mb-4"
      >
        {isPlaying ? "Pause" : "Play"} Audio Sequence
      </button>
      
      {/* Render audio elements using map */}
      {audioSources.map((src, index) => (
        <audio
          key={index}
          ref={(el) => {
            if (el) {
              audioRefs.current[index] = el;
            }
          }}
          src={src}
        />
      ))}
      
      <p>Audio Sequence Testing ...</p>
    </div>
  );
};

export default AudioSequencePlayer;
