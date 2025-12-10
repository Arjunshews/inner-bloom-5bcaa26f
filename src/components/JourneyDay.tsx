import { cn } from "@/lib/utils";
import { Check, Lock, Play } from "lucide-react";

interface JourneyDayProps {
  day: number;
  title: string;
  description: string;
  status: "completed" | "current" | "locked";
  onSelect?: () => void;
}

const JourneyDay = ({ day, title, description, status, onSelect }: JourneyDayProps) => {
  return (
    <button
      onClick={onSelect}
      disabled={status === "locked"}
      className={cn(
        "w-full p-6 rounded-2xl text-left transition-all duration-300 group",
        status === "completed" && "bg-sage-light border border-sage/20 hover:shadow-soft",
        status === "current" && "bg-card border-2 border-primary shadow-soft hover:shadow-glow",
        status === "locked" && "bg-muted/50 opacity-60 cursor-not-allowed"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300",
            status === "completed" && "gradient-sage",
            status === "current" && "bg-primary animate-breathe",
            status === "locked" && "bg-muted"
          )}
        >
          {status === "completed" && <Check className="w-5 h-5 text-primary-foreground" />}
          {status === "current" && <Play className="w-5 h-5 text-primary-foreground" />}
          {status === "locked" && <Lock className="w-4 h-4 text-muted-foreground" />}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-medium text-muted-foreground">
              Day {day}
            </span>
            {status === "current" && (
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                Today
              </span>
            )}
          </div>
          <h3
            className={cn(
              "font-display text-lg font-semibold mb-1 transition-colors",
              status === "locked" ? "text-muted-foreground" : "text-foreground group-hover:text-primary"
            )}
          >
            {title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">{description}</p>
        </div>
      </div>
    </button>
  );
};

export default JourneyDay;
