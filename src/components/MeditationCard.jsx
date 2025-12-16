import { cn } from "@/lib/utils";
import { Play, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

const MeditationCard = ({
  title,
  description,
  duration,
  category,
  imageGradient = "gradient-sage",
  onStart,
}) => {
  return (
    <div className="group bg-card rounded-2xl overflow-hidden shadow-soft hover:shadow-glow transition-all duration-500 hover:-translate-y-1">
      <div className={cn("h-40 relative", imageGradient)}>
        <div className="absolute inset-0 bg-foreground/5" />
        <div className="absolute bottom-4 left-4">
          <span className="px-3 py-1 bg-background/90 backdrop-blur-sm rounded-full text-xs font-medium text-foreground">
            {category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
          {description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">{duration}</span>
          </div>
          
          <Button 
            size="sm" 
            variant="ghost" 
            className="gap-2 group-hover:bg-sage-light"
            onClick={onStart}
          >
            <Play className="w-4 h-4" />
            Play
          </Button>
        </div>
      </div>
    </div>
  );
};

export default MeditationCard;
