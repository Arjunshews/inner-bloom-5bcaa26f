import { Brain, Heart, Moon, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "Guided Meditations",
    description: "Expertly crafted sessions for stress relief, focus, and emotional balance.",
  },
  {
    icon: Heart,
    title: "Trauma Release",
    description: "A gentle 21-day program designed to help you process and heal from past wounds.",
  },
  {
    icon: Moon,
    title: "Sleep Stories",
    description: "Calming narratives to guide you into restful, restorative sleep.",
  },
  {
    icon: Sparkles,
    title: "Daily Intentions",
    description: "Start each day with purpose through mindful intention setting.",
  },
];

const FeatureSection = () => {
  return (
    <section className="py-24 bg-card">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl md:text-5xl font-semibold text-foreground mb-4">
            Your Path to <span className="text-primary italic">Healing</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Everything you need to begin your journey toward inner peace and emotional freedom.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-8 rounded-2xl bg-background hover:shadow-soft transition-all duration-500 hover:-translate-y-1 group"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-14 h-14 rounded-2xl gradient-sage flex items-center justify-center mb-6 group-hover:shadow-glow transition-all duration-300">
                <feature.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;
