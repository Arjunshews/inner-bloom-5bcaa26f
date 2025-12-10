import { useState } from "react";
import Navigation from "@/components/Navigation";
import JourneyDay from "@/components/JourneyDay";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, Heart } from "lucide-react";

const journeyDays = [
  { day: 1, title: "Acknowledging Your Journey", description: "Begin by honoring where you are and setting your intention for healing." },
  { day: 2, title: "Creating Safety", description: "Establish inner resources and a sense of safety within your body." },
  { day: 3, title: "Grounding Practice", description: "Learn grounding techniques to stay present during emotional moments." },
  { day: 4, title: "Breath as Anchor", description: "Discover how conscious breathing can regulate your nervous system." },
  { day: 5, title: "Recognizing Patterns", description: "Gently explore recurring emotional patterns without judgment." },
  { day: 6, title: "The Body Remembers", description: "Understanding how trauma is stored in the body." },
  { day: 7, title: "Week One Reflection", description: "Integrate the first week's learnings with a compassionate reflection." },
  { day: 8, title: "Inner Child Connection", description: "Begin the gentle process of connecting with your younger self." },
  { day: 9, title: "Naming Your Emotions", description: "Practice identifying and naming emotions without being overwhelmed." },
  { day: 10, title: "Boundaries as Self-Care", description: "Explore how healthy boundaries support your healing journey." },
  { day: 11, title: "Releasing Shame", description: "Work through shame with compassion and understanding." },
  { day: 12, title: "Forgiveness Practice", description: "Explore forgiveness—not for others, but for your own freedom." },
  { day: 13, title: "Movement & Release", description: "Use gentle movement to release stored tension and energy." },
  { day: 14, title: "Week Two Integration", description: "Celebrate your progress and prepare for deeper work ahead." },
  { day: 15, title: "Meeting Your Protectors", description: "Understand the parts of you that developed to keep you safe." },
  { day: 16, title: "Grief & Loss", description: "Create space for grieving what was lost or never had." },
  { day: 17, title: "Rewiring Beliefs", description: "Identify and gently challenge limiting beliefs from the past." },
  { day: 18, title: "Self-Compassion Practice", description: "Deepen your capacity for self-love and acceptance." },
  { day: 19, title: "Connecting with Others", description: "Explore how healing impacts your relationships." },
  { day: 20, title: "Your Future Self", description: "Visualize and connect with your healed, whole self." },
  { day: 21, title: "Celebration & Continuation", description: "Honor your journey and create a plan for ongoing healing." },
];

const Journey = () => {
  const [currentDay, setCurrentDay] = useState(4); // Simulating user progress
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const progress = (currentDay / 21) * 100;

  const getStatus = (day: number): "completed" | "current" | "locked" => {
    if (day < currentDay) return "completed";
    if (day === currentDay) return "current";
    return "locked";
  };

  const selectedDayData = selectedDay ? journeyDays.find(d => d.day === selectedDay) : null;

  if (selectedDayData) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        
        <main className="pt-24 pb-16">
          <div className="container mx-auto px-6 max-w-3xl">
            <Button
              variant="ghost"
              onClick={() => setSelectedDay(null)}
              className="mb-8 gap-2"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Journey
            </Button>

            <div className="bg-card rounded-3xl p-8 md:p-12 shadow-soft">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-full gradient-sage flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold">{selectedDayData.day}</span>
                </div>
                <span className="text-muted-foreground font-medium">Day {selectedDayData.day} of 21</span>
              </div>

              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-4">
                {selectedDayData.title}
              </h1>
              
              <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                {selectedDayData.description}
              </p>

              <div className="bg-sage-light rounded-2xl p-6 mb-8">
                <h3 className="font-display text-xl font-semibold text-foreground mb-4">
                  Today's Practice
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Find a quiet, comfortable space where you won't be disturbed. Take a few deep breaths 
                  to center yourself before beginning. Remember, there's no right or wrong way to experience 
                  this—simply allow whatever arises to be present.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  This practice takes approximately 15-20 minutes. You may wish to have a journal nearby 
                  to capture any insights or emotions that surface.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button variant="hero" size="lg" className="flex-1">
                  Begin Session
                </Button>
                <Button 
                  variant="calm" 
                  size="lg" 
                  onClick={() => setCurrentDay(Math.max(currentDay, selectedDayData.day + 1))}
                >
                  Mark Complete
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-light rounded-full text-sage-dark text-sm font-medium mb-6">
                <Heart className="w-4 h-4" />
                21-Day Trauma Release Journey
              </div>
              
              <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
                Your Healing <span className="text-primary italic">Journey</span>
              </h1>
              <p className="text-muted-foreground text-lg">
                A gentle, guided path to release stored trauma and reclaim your inner peace.
              </p>
            </div>

            {/* Progress Section */}
            <div className="bg-card rounded-2xl p-6 mb-8 shadow-soft">
              <div className="flex items-center justify-between mb-4">
                <span className="font-display text-lg font-semibold text-foreground">
                  Your Progress
                </span>
                <span className="text-primary font-medium">
                  Day {currentDay} of 21
                </span>
              </div>
              <Progress value={progress} className="h-3" />
              <p className="text-muted-foreground text-sm mt-3">
                {currentDay < 21 
                  ? `${21 - currentDay} days remaining in your journey`
                  : "Congratulations! You've completed the journey!"
                }
              </p>
            </div>

            {/* Days List */}
            <div className="space-y-4">
              {journeyDays.map((day) => (
                <JourneyDay
                  key={day.day}
                  day={day.day}
                  title={day.title}
                  description={day.description}
                  status={getStatus(day.day)}
                  onSelect={() => getStatus(day.day) !== "locked" && setSelectedDay(day.day)}
                />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Journey;
