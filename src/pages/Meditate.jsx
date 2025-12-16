import { useState } from "react";
import Navigation from "@/components/Navigation";
import MeditationCard from "@/components/MeditationCard";
import MeditationTimer from "@/components/MeditationTimer";

const meditations = [
  {
    id: 1,
    title: "Morning Calm",
    description: "Start your day with clarity and intention through this gentle awakening meditation.",
    duration: "10 min",
    category: "Morning",
    gradient: "gradient-sage",
  },
  {
    id: 2,
    title: "Stress Relief",
    description: "Release tension and find peace with this soothing guided breathing exercise.",
    duration: "15 min",
    category: "Stress",
    gradient: "gradient-warm",
  },
  {
    id: 3,
    title: "Deep Focus",
    description: "Enhance concentration and mental clarity for work or creative pursuits.",
    duration: "20 min",
    category: "Focus",
    gradient: "gradient-sage",
  },
  {
    id: 4,
    title: "Body Scan",
    description: "A gentle journey through your body to release physical tension and stress.",
    duration: "25 min",
    category: "Relaxation",
    gradient: "gradient-warm",
  },
  {
    id: 5,
    title: "Loving Kindness",
    description: "Cultivate compassion for yourself and others with this heart-opening practice.",
    duration: "15 min",
    category: "Compassion",
    gradient: "gradient-sage",
  },
  {
    id: 6,
    title: "Sleep Journey",
    description: "Drift into peaceful slumber with this calming bedtime meditation.",
    duration: "30 min",
    category: "Sleep",
    gradient: "gradient-warm",
  },
];

const Meditate = () => {
  const [selectedMeditation, setSelectedMeditation] = useState(null);

  const getDurationMinutes = (duration) => {
    return parseInt(duration.replace(" min", ""));
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h1 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
              Guided <span className="text-primary italic">Meditations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose a meditation that speaks to your current needs. Each session is designed 
              to guide you gently toward peace and presence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {meditations.map((meditation) => (
              <MeditationCard
                key={meditation.id}
                title={meditation.title}
                description={meditation.description}
                duration={meditation.duration}
                category={meditation.category}
                imageGradient={meditation.gradient}
                onStart={() => setSelectedMeditation(meditation)}
              />
            ))}
          </div>
        </div>
      </main>

      {selectedMeditation && (
        <MeditationTimer
          initialMinutes={getDurationMinutes(selectedMeditation.duration)}
          title={selectedMeditation.title}
          onClose={() => setSelectedMeditation(null)}
        />
      )}
    </div>
  );
};

export default Meditate;
