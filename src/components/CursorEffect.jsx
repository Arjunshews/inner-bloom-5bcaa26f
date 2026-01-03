import { useEffect, useState } from "react";

const CursorEffect = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = () => setIsVisible(true);
    const handleMouseLeave = () => setIsVisible(false);

    const handleHoverStart = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(true);
      }
    };

    const handleHoverEnd = (e) => {
      if (e.target.closest('a, button, [role="button"]')) {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseover", handleHoverStart);
    document.addEventListener("mouseout", handleHoverEnd);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseover", handleHoverStart);
      document.removeEventListener("mouseout", handleHoverEnd);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor glow */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-screen transition-transform duration-150 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.5 : 1})`,
        }}
      >
        <div className={`rounded-full bg-gradient-to-r from-sage/60 to-primary/40 blur-sm transition-all duration-300 ${isHovering ? 'w-10 h-10' : 'w-6 h-6'}`} />
      </div>

      {/* Trailing orb 1 */}
      <div
        className="pointer-events-none fixed z-[9998] mix-blend-screen transition-all duration-300 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-4 h-4 rounded-full bg-sage/30 blur-md animate-pulse-soft" />
      </div>

      {/* Trailing orb 2 */}
      <div
        className="pointer-events-none fixed z-[9997] mix-blend-screen transition-all duration-500 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className="w-8 h-8 rounded-full bg-primary/20 blur-xl" />
      </div>

      {/* Outer glow ring */}
      <div
        className="pointer-events-none fixed z-[9996] mix-blend-screen transition-all duration-700 ease-out"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        <div className={`rounded-full border border-sage/20 transition-all duration-300 ${isHovering ? 'w-16 h-16 opacity-100' : 'w-12 h-12 opacity-50'}`} />
      </div>
    </>
  );
};

export default CursorEffect;