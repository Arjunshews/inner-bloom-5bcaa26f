import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Leaf, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const location = useLocation();

  const links = [
    { href: "/", label: "Home" },
    { href: "/meditate", label: "Meditate" },
    { href: "/journey", label: "21-Day Journey" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full gradient-sage flex items-center justify-center shadow-soft group-hover:shadow-glow transition-all duration-300">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display text-2xl font-semibold text-foreground">
              Serene
            </span>
          </Link>

          <div className="flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm font-medium transition-colors duration-300 relative py-1",
                  location.pathname === link.href
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {link.label}
                {location.pathname === link.href && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                )}
              </Link>
            ))}
            <Button asChild variant="outline" size="sm" className="gap-2">
              <Link to="/signin">
                <User className="w-4 h-4" />
                Sign In
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
