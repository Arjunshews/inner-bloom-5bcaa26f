import { useState, useEffect, useCallback, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, X, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/utils";

interface MeditationTimerProps {
  initialMinutes?: number;
  title?: string;
  onClose?: () => void;
}

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
}: MeditationTimerProps) => {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [totalSeconds] = useState(initialMinutes * 60);
  const [volume, setVolume] = useState(0.3);
  const [isMuted, setIsMuted] = useState(false);
  const [breathPhase, setBreathPhase] = useState<"inhale" | "hold" | "exhale" | "rest">("rest");
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const speechRef = useRef<SpeechSynthesisUtterance | null>(null);
  const lastSpokenTime = useRef<number>(0);

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
  const speakPrompt = useCallback((text: string) => {
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
    let interval: NodeJS.Timeout;
    
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

  const handleVolumeChange = useCallback((value: number[]) => {
    setVolume(value[0]);
    if (value[0] > 0 && isMuted) {
      setIsMuted(false);
    }
  }, [isMuted]);

  const formatTime = (secs: number) => {
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
    <div className="fixed inset-0 z-50 bg-gradient-to-b from-background via-background to-sage/5 flex items-center justify-center overflow-hidden">
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-sage/5 blur-3xl"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 3) * 20}%`,
              animation: `float ${8 + i * 2}s ease-in-out infinite`,
              animationDelay: `${i * 0.5}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-6">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute -top-16 right-0 p-3 text-muted-foreground hover:text-foreground transition-colors rounded-full hover:bg-muted/50"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <p className="text-sage font-medium tracking-widest uppercase text-sm mb-8 animate-fade-in-up">
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
                borderColor: `hsl(var(--sage) / ${0.1 + i * 0.08})`,
                borderWidth: `${1 + i * 0.5}px`,
                transitionDelay: `${i * 100}ms`,
                boxShadow: isRunning 
                  ? `0 0 ${20 + i * 10}px hsl(var(--sage) / ${0.05 + i * 0.02})` 
                  : 'none',
              }}
            />
          ))}

          {/* Center glowing orb */}
          <div
            className={cn(
              "absolute w-40 h-40 rounded-full transition-all duration-1000 ease-in-out",
              "bg-gradient-to-br from-sage/20 via-sage/10 to-transparent",
              breathPhase === "inhale" && "scale-125 opacity-100",
              breathPhase === "hold" && "scale-125 opacity-90",
              breathPhase === "exhale" && "scale-90 opacity-70",
              breathPhase === "rest" && "scale-100 opacity-80"
            )}
            style={{
              boxShadow: isRunning 
                ? `0 0 60px hsl(var(--sage) / 0.3), inset 0 0 40px hsl(var(--sage) / 0.1)` 
                : `0 0 30px hsl(var(--sage) / 0.15)`,
            }}
          />

          {/* Progress ring */}
          <svg className="absolute w-72 h-72 transform -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="currentColor"
              strokeWidth="4"
              fill="none"
              className="text-muted/30"
            />
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="url(#progressGradient)"
              strokeWidth="4"
              fill="none"
              strokeLinecap="round"
              className="transition-all duration-1000"
              strokeDasharray={2 * Math.PI * 130}
              strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
            />
            <defs>
              <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="hsl(var(--sage))" />
                <stop offset="100%" stopColor="hsl(var(--earth))" />
              </linearGradient>
            </defs>
          </svg>

          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <span className="font-display text-5xl font-semibold text-foreground tracking-tight">
              {formatTime(seconds)}
            </span>
            <span 
              className={cn(
                "text-sm mt-3 transition-all duration-500 font-medium",
                isRunning ? "text-sage" : "text-muted-foreground"
              )}
            >
              {isRunning ? getBreathText() : "Ready when you are"}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-6 mb-10">
          <Button
            variant="calm"
            size="lg"
            onClick={resetTimer}
            className="w-14 h-14 rounded-full p-0 shadow-lg hover:shadow-xl transition-shadow"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            variant="hero"
            size="lg"
            onClick={toggleTimer}
            className={cn(
              "w-24 h-24 rounded-full p-0 shadow-xl hover:shadow-2xl transition-all",
              isRunning && "animate-pulse"
            )}
            style={{
              boxShadow: isRunning 
                ? '0 0 40px hsl(var(--sage) / 0.4)' 
                : '0 10px 40px hsl(var(--sage) / 0.2)',
            }}
          >
            {isRunning ? (
              <Pause className="w-10 h-10" />
            ) : (
              <Play className="w-10 h-10 ml-1" />
            )}
          </Button>

          <div className="w-14 h-14" />
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto bg-muted/30 backdrop-blur-sm rounded-full px-4 py-3">
          <button
            onClick={toggleMute}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
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
            className="w-32"
          />
          <span className="text-xs text-muted-foreground w-8">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>

        {/* Breathing guide indicator */}
        {isRunning && (
          <div className="mt-8 flex items-center justify-center gap-2">
            {["inhale", "hold", "exhale"].map((phase) => (
              <div
                key={phase}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  breathPhase === phase 
                    ? "bg-sage scale-150" 
                    : "bg-muted-foreground/30"
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
