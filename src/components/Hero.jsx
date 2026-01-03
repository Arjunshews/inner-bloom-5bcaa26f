import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Play, Heart } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const Hero = () => {
  const sectionRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      setMousePosition({ x: Math.max(0, Math.min(1, x)), y: Math.max(0, Math.min(1, y)) });
    };

    const section = sectionRef.current;
    section?.addEventListener('mousemove', handleMouseMove);
    return () => section?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxX = (mousePosition.x - 0.5) * 40;
  const parallaxY = (mousePosition.y - 0.5) * 40;

  return (
    <section 
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, hsl(var(--sage-light) / 0.15) 0%, transparent 50%),
          radial-gradient(ellipse 60% 50% at 20% 80%, hsl(var(--earth) / 0.1) 0%, transparent 40%),
          radial-gradient(ellipse 50% 40% at 80% 20%, hsl(var(--primary) / 0.08) 0%, transparent 40%),
          linear-gradient(180deg, hsl(var(--background)) 0%, hsl(var(--cream) / 0.3) 50%, hsl(var(--background)) 100%)
        `
      }}
    >
      {/* Animated mesh gradient layer */}
      <div className="absolute inset-0 opacity-30">
        <div 
          className="absolute inset-0 animate-gradient-shift"
          style={{
            background: `
              conic-gradient(from 0deg at 30% 30%, transparent 0deg, hsl(var(--sage) / 0.1) 60deg, transparent 120deg),
              conic-gradient(from 180deg at 70% 70%, transparent 0deg, hsl(var(--earth) / 0.1) 60deg, transparent 120deg)
            `
          }}
        />
      </div>

      {/* Interactive aurora ribbons */}
      <div 
        className="absolute w-[800px] h-[400px] opacity-20 blur-3xl transition-transform duration-1000 ease-out"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--sage) / 0.4), hsl(var(--primary) / 0.3), hsl(var(--sage-light) / 0.4))',
          transform: `translate(${parallaxX * 2}px, ${parallaxY * 2}px) rotate(-12deg)`,
          top: '10%',
          left: '-10%',
        }}
      />
      <div 
        className="absolute w-[600px] h-[300px] opacity-15 blur-3xl transition-transform duration-1000 ease-out"
        style={{
          background: 'linear-gradient(90deg, hsl(var(--earth) / 0.3), hsl(var(--cream) / 0.4), hsl(var(--earth) / 0.3))',
          transform: `translate(${-parallaxX * 1.5}px, ${-parallaxY * 1.5}px) rotate(8deg)`,
          bottom: '15%',
          right: '-5%',
        }}
      />

      {/* Floating orbs with parallax */}
      <div 
        className="absolute w-72 h-72 rounded-full animate-breathe-slow transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle at 30% 30%, hsl(var(--sage) / 0.25), hsl(var(--sage-light) / 0.1))',
          filter: 'blur(60px)',
          transform: `translate(${parallaxX}px, ${parallaxY}px)`,
          top: '5%',
          left: '5%',
        }}
      />
      <div 
        className="absolute w-96 h-96 rounded-full animate-float-delayed transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle at 70% 70%, hsl(var(--earth) / 0.2), hsl(var(--cream) / 0.08))',
          filter: 'blur(80px)',
          transform: `translate(${-parallaxX * 0.8}px, ${-parallaxY * 0.8}px)`,
          bottom: '10%',
          right: '0%',
        }}
      />
      <div 
        className="absolute w-56 h-56 rounded-full animate-pulse-soft transition-transform duration-700 ease-out"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.15), transparent)',
          filter: 'blur(50px)',
          transform: `translate(${parallaxX * 0.5}px, ${-parallaxY * 0.5}px)`,
          top: '35%',
          right: '15%',
        }}
      />

      {/* Sparkling particles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: `hsl(var(--${['sage', 'primary', 'earth', 'sage-light'][i % 4]}) / ${0.3 + Math.random() * 0.3})`,
            top: `${15 + Math.random() * 70}%`,
            left: `${10 + Math.random() * 80}%`,
            animation: `twinkle ${2 + Math.random() * 2}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
            boxShadow: `0 0 ${6 + Math.random() * 6}px hsl(var(--sage) / 0.3)`,
          }}
        />
      ))}

      {/* Flowing wave layers */}
      <div className="absolute bottom-0 left-0 right-0 h-80 pointer-events-none">
        <svg className="absolute bottom-0 w-full h-48 opacity-10" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="animate-wave"
            fill="hsl(var(--sage) / 0.5)"
            d="M0,160L48,170.7C96,181,192,203,288,192C384,181,480,139,576,138.7C672,139,768,181,864,197.3C960,213,1056,203,1152,186.7C1248,171,1344,149,1392,138.7L1440,128L1440,320L0,320Z"
          />
        </svg>
        <svg className="absolute bottom-0 w-full h-40 opacity-15" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path 
            className="animate-wave"
            style={{ animationDelay: '-2s', animationDuration: '12s' }}
            fill="hsl(var(--earth) / 0.4)"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,213.3C672,224,768,224,864,208C960,192,1056,160,1152,165.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L0,320Z"
          />
        </svg>
      </div>

      {/* Subtle grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
            linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

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

        {/* Floating meditation visual with glow */}
        <div className="mt-20 flex justify-center">
          <div className="relative">
            <div 
              className="absolute -inset-8 rounded-full opacity-30 blur-2xl animate-pulse-soft"
              style={{ background: 'radial-gradient(circle, hsl(var(--sage) / 0.5), transparent)' }}
            />
            <div className="w-32 h-32 rounded-full gradient-sage opacity-30 animate-float shadow-glow" />
            <div className="absolute top-4 left-4 w-24 h-24 rounded-full bg-earth/40 animate-float animation-delay-200" />
            <div className="absolute top-8 left-8 w-16 h-16 rounded-full bg-sage/50 animate-float animation-delay-400" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
