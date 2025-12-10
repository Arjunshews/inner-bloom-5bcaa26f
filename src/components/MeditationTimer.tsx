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

// Ambient music URL (royalty-free meditation music)
const AMBIENT_MUSIC_URL = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-14.mp3";

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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
    };
  }, []);

  // Handle play/pause based on timer state
  useEffect(() => {
    if (audioRef.current) {
      if (isRunning) {
        audioRef.current.play().catch(console.error);
      } else {
        audioRef.current.pause();
      }
    }
  }, [isRunning]);

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
  }, [totalSeconds]);

  const toggleMute = useCallback(() => {
    setIsMuted((prev) => !prev);
  }, []);

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

  return (
    <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sage/10 rounded-full blur-3xl animate-breathe" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-earth/10 rounded-full blur-3xl animate-breathe animation-delay-200" />
      </div>

      <div className="relative z-10 text-center px-6">
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        )}

        <p className="text-sage font-medium tracking-widest uppercase text-sm mb-4">
          {title}
        </p>

        <div className="relative w-72 h-72 mx-auto mb-12">
          {/* Background circle */}
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              className="text-muted"
            />
            <circle
              cx="144"
              cy="144"
              r="130"
              stroke="currentColor"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              className="text-primary transition-all duration-1000"
              strokeDasharray={2 * Math.PI * 130}
              strokeDashoffset={2 * Math.PI * 130 * (1 - progress / 100)}
            />
          </svg>

          {/* Timer display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="font-display text-6xl font-semibold text-foreground">
              {formatTime(seconds)}
            </span>
            <span className="text-muted-foreground text-sm mt-2">
              {isRunning ? "Breathe deeply..." : "Ready when you are"}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="calm"
            size="lg"
            onClick={resetTimer}
            className="w-14 h-14 rounded-full p-0"
          >
            <RotateCcw className="w-5 h-5" />
          </Button>

          <Button
            variant="hero"
            size="lg"
            onClick={toggleTimer}
            className={cn(
              "w-20 h-20 rounded-full p-0",
              isRunning && "animate-breathe"
            )}
          >
            {isRunning ? (
              <Pause className="w-8 h-8" />
            ) : (
              <Play className="w-8 h-8 ml-1" />
            )}
          </Button>

          <div className="w-14 h-14" /> {/* Spacer for symmetry */}
        </div>

        {/* Volume control */}
        <div className="flex items-center justify-center gap-3 max-w-xs mx-auto">
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
      </div>
    </div>
  );
};

export default MeditationTimer;
