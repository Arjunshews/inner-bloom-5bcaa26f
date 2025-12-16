import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-calm">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-sage/10 rounded-full blur-3xl animate-breathe" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-earth/10 rounded-full blur-3xl animate-breathe animation-delay-200" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-sage-light/30 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 pt-24 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sage font-medium tracking-widest uppercase text-sm mb-6 animate-fade-in-up opacity-0">
            Find your inner peace
          </p>
          
          <h1 className="font-display text-5xl md:text-7xl font-semibold text-foreground leading-tight mb-8 animate-fade-in-up opacity-0 animation-delay-200 text-balance">
            Heal Your Mind,
            <br />
            <span className="text-primary italic">Transform Your Life</span>
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto mb-12 animate-fade-in-up opacity-0 animation-delay-400 leading-relaxed">
            Guided meditations and a transformative 21-day trauma release journey 
            to help you find lasting peace and emotional freedom.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in-up opacity-0 animation-delay-600">
            <Button asChild variant="hero" size="xl">
              <Link to="/meditate" className="gap-3">
                <Play className="w-5 h-5" />
                Start Meditating
              </Link>
            </Button>
            <Button asChild variant="calm" size="xl">
              <Link to="/journey" className="gap-3">
                <Heart className="w-5 h-5" />
                Begin 21-Day Journey
              </Link>
            </Button>
          </div>
        </div>

        {/* Floating meditation visual */}
        <div className="mt-20 flex justify-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full gradient-sage opacity-20 animate-float" />
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-earth/30 animate-float animation-delay-200" />
            <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-sage/40 animate-float animation-delay-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
