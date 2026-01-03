import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden gradient-calm">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-light/20 via-transparent to-earth/10 animate-gradient-shift" />
      
      {/* Large floating orbs */}
      <div className="absolute top-10 left-[10%] w-80 h-80 rounded-full bg-gradient-to-br from-sage/20 to-sage-light/30 blur-3xl animate-float-slow opacity-60" />
      <div className="absolute bottom-20 right-[5%] w-96 h-96 rounded-full bg-gradient-to-tl from-earth/15 to-cream/20 blur-3xl animate-float-delayed opacity-50" />
      <div className="absolute top-1/3 right-[20%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/10 to-sage/15 blur-2xl animate-breathe-slow opacity-40" />
      
      {/* Subtle flowing shapes */}
      <div className="absolute top-1/4 left-[30%] w-40 h-40 rounded-full bg-sage/10 blur-xl animate-drift opacity-30" />
      <div className="absolute bottom-1/3 left-[15%] w-32 h-32 rounded-full bg-earth/10 blur-xl animate-drift-reverse opacity-25" />
      <div className="absolute top-[60%] right-[30%] w-24 h-24 rounded-full bg-primary/10 blur-lg animate-pulse-soft opacity-35" />
      
      {/* Particle-like small orbs */}
      <div className="absolute top-[20%] left-[50%] w-3 h-3 rounded-full bg-sage/40 animate-twinkle" />
      <div className="absolute top-[70%] left-[25%] w-2 h-2 rounded-full bg-primary/30 animate-twinkle-delayed" />
      <div className="absolute top-[40%] right-[15%] w-4 h-4 rounded-full bg-earth/30 animate-twinkle" />
      <div className="absolute bottom-[25%] right-[40%] w-2 h-2 rounded-full bg-sage-light/50 animate-twinkle-delayed" />
      <div className="absolute top-[15%] right-[25%] w-3 h-3 rounded-full bg-cream/40 animate-twinkle" />
      
      {/* Organic wave shape */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="animate-wave fill-sage/30"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

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
