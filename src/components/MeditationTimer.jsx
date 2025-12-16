import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

const AMBIENT_MUSIC_URL = "https://cdn.pixabay.com/audio/2022/03/10/audio_4dedf5bf94.mp3";

const BREATHING_PROMPTS = [
  "Breathe in slowly... feel your lungs expand",
  "Hold gently... embrace the stillness",
  "Release slowly... let go of all tension",
  "Find your center... you are present",
  "Inhale peace... exhale worry",
  "You are safe... you are calm",
  "Feel the warmth within... let it spread",
  "Each breath brings healing... each moment is yours",
];

const MeditationTimer = ({ 
  initialMinutes = 10, 
  title = "Meditation Session",
  onClose 
}) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds] = useState(initialMinutes * 60);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [breathPhase, setBreathPhase] = useState("rest");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const audioRef = useRef(null);
  const speechRef = useRef(null);
  const lastSpokenTime = useRef(0);

  const progress = ((totalSeconds - seconds) / totalSeconds) * 100;

  // Initialize audio
  useEffect(() => {
    audioRef.current = new Audio(AMBIENT_MUSIC_URL);
    audioRef.current.loop = true;
    audioRef.current.volume = volume;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      window.speechSynthesis.cancel();
    };
  }, []);

  // Voice guidance function
  const speakPrompt = useCallback((text) => {
    if (isMuted) return;
    
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.7;
    utterance.pitch = 0.9;
    utterance.volume = Math.min(volume * 1.5, 1);
    
    // Try to get a smooth female voice
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      v.name.includes('Samantha') || 
      v.name.includes('Karen') || 
      v.name.includes('Victoria') ||
      v.name.includes('Google UK English Female') ||
      (v.lang.includes('en') && v.name.toLowerCase().includes('female'))
    ) || voices.find(v => v.lang.includes('en'));
    
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }
    
    speechRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, [isMuted, volume]);

  // Breathing cycle (4-7-8 pattern adapted)
  useEffect(() => {
    if (!isRunning) {
      setBreathPhase("rest");
      return;
    }

    const breathCycle = () => {
      setBreathPhase("inhale");
      setTimeout(() => setBreathPhase("hold"), 4000);
      setTimeout(() => setBreathPhase("exhale"), 7000);
      setTimeout(() => setBreathPhase("rest"), 11000);
    };

    breathCycle();
    const interval = setInterval(breathCycle, 12000);

    return () => clearInterval(interval);
  }, [isRunning]);

  // Voice prompts every 30 seconds
  useEffect(() => {
    if (!isRunning) return;

    const now = totalSeconds - seconds;
    if (now > 0 && now - lastSpokenTime.current >= 30) {
      speakPrompt(BREATHING_PROMPTS[currentPromptIndex % BREATHING_PROMPTS.length]);
      setCurrentPromptIndex(prev => prev + 1);
      lastSpokenTime.current = now;
    }
  }, [seconds, isRunning, totalSeconds, speakPrompt, currentPromptIndex]);

  // Handle play/pause based on timer state
  useEffect(() => {
    if (audioRef.current) {
      if (isRunning) {
        audioRef.current.play().catch(console.error);
        // Initial welcome message
        if (seconds === totalSeconds) {
          setTimeout(() => speakPrompt("Welcome to your meditation. Close your eyes and breathe."), 1000);
        }
      } else {
        audioRef.current.pause();
        window.speechSynthesis.cancel();
      }
    }
  }, [isRunning, seconds, totalSeconds, speakPrompt]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  useEffect(() => {
    let interval;
    
    if (isRunning && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, seconds]);

  const toggleTimer = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const resetTimer = useCallback(() => {
    setIsRunning(false);
    setSeconds(totalSeconds);
    setCurrentPromptIndex(0);
    lastSpokenTime.current = 0;
    window.speechSynthesis.cancel();
  }, [totalSeconds]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
    if (!isMuted) {
      window.speechSynthesis.cancel();
    }
  }, [isMuted]);

  const handleVolumeChange = useCallback((value) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const formatTime = (secs) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, "0")}:${remainingSecs.toString().padStart(2, "0")}`;
  };

  const getBreathText = () => {
    switch (breathPhase) {
      case "inhale": return "Breathe in...";
      case "hold": return "Hold...";
      case "exhale": return "Breathe out...";
      default: return "Ready when you are";
    }
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#0a0a0a] flex items-center justify-center overflow-hidden">
      {/* Close button - top right */}
      {onClose && (
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 text-white/40 hover:text-white/80 transition-colors rounded-full hover:bg-white/5"
        >
          <X className="w-6 h-6" />
        </button>
      )}

      <div className="relative z-10 text-center px-6">

        <p className="text-white/60 font-medium tracking-widest uppercase text-sm mb-8 animate-fade-in-up">
          {title}
        </p>

        {/* Concentric circles container */}
        <div className="relative w-80 h-80 mx-auto mb-12 flex items-center justify-center">
          {/* Outer breathing circles */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className={cn(
                "absolute rounded-full border transition-all duration-1000 ease-in-out",
                breathPhase === "inhale" && "scale-110",
                breathPhase === "hold" && "scale-110",
                breathPhase === "exhale" && "scale-95",
                breathPhase === "rest" && "scale-100"
              )}
              style={{
                width: `${280 - i * 40}px`,
                height: `${280 - i * 40}px`,
                borderColor: `rgba(255, 255, 255, ${0.05 + i * 0.03})`,
                borderWidth: `${1 + i * 0.5}px`,
                transitionDelay: `${i * 100}ms`,
                boxShadow: isRunning 
                  ? `0 0 ${20 + i * 10}px rgba(255, 255, 255, ${0.02 + i * 0.01})` 
                  : 'none',
              }}
            />
          ))}

          {/* Center glowing orb */}
          <div
            className={cn(
              "absolute w-40 h-40 rounded-full transition-all duration-1000 ease-in-out",
              "bg-gradient-to-br from-white/10 via-white/5 to-transparent",
              breathPhase === "inhale" && "scale-125 opacity-100",
              breathPhase === "hold" && "scale-125 opacity-90",
              breathPhase === "exhale" && "scale-90 opacity-70",
              breathPhase === "rest" && "scale-100 opacity-80"
            )}
            style={{
              boxShadow: isRunning 
                ? `0 0 80px rgba(255, 255, 255, 0.15), inset 0 0 40px rgba(255, 255, 255, 0.05)` 
                : `0 0 40px rgba(255, 255, 255, 0.08)`,
            }}
          />

          {/* Progress ring */}
          <svg className="absolute w-72 h-72 transform -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="2"
              fill="none"
            />
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="url(#progressGradient)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              className="transition-all duration-1000"
              strokeDasharray={2 * Math.PI * 130}
              strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(255, 255, 255, 0.6)" />
                <stop offset="100%" stopColor="rgba(255, 255, 255, 0.2)" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="font-display text-5xl font-light text-white tracking-tight">
              {formatTime(seconds)}
            </span>
            <span 
              className={cn(
                "text-sm mt-3 transition-all duration-500 font-light",
                isRunning ? "text-white/70" : "text-white/40"
              )}
            >
              {isRunning ? getBreathText() : "Ready when you are"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-8 mb-10">
          <button
            onClick={resetTimer}
            className="w-14 h-14 rounded-full flex items-center justify-center text-white/40 hover:text-white/80 hover:bg-white/5 transition-all"
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <button
            onClick={toggleTimer}
            className={cn(
              "w-20 h-20 rounded-full flex items-center justify-center transition-all border border-white/20 hover:border-white/40",
              isRunning 
                ? "bg-white/10 text-white" 
                : "bg-white/5 text-white/80 hover:bg-white/10"
            )}
            style={{
              boxShadow: isRunning 
                ? '0 0 60px rgba(255, 255, 255, 0.15)' 
                : '0 0 30px rgba(255, 255, 255, 0.05)',
            }}
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </button>

          <div className="w-14 h-14" />
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
          <button
            onClick={toggleMute}
            className="p-2 text-white/40 hover:text-white/80 transition-colors"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-5 h-5" />
            ) : (
              <Volume2 className="w-5 h-5" />
            )}
          </button>
          <Slider
            value={[isMuted ? 0 : volume]}
            onValueChange={handleVolumeChange}
            max={1}
            step={0.01}
            className="w-32 [&_[role=slider]]:bg-white/80 [&_[role=slider]]:border-0 [&_.relative]:bg-white/20 [&_[data-orientation=horizontal]>div]:bg-white/60"
          />
          <span className="text-xs text-white/40 w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Breathing guide indicator */}
        {isRunning && (
          <div className="mt-8 flex items-center justify-center gap-3">
            {["inhale", "hold", "exhale"].map((phase) => (
              <div
                key={phase}
                className={cn(
                  "w-1.5 h-1.5 rounded-full transition-all duration-500",
                  breathPhase === phase 
                    ? "bg-white scale-150" 
                    : "bg-white/20"
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MeditationTimer;
