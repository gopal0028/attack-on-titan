import { useEffect, useRef, useState } from "react";

interface RippleItem {
  id: number;
  x: number;
  y: number;
}

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [ripples, setRipples] = useState<RippleItem[]>([]);
  const [isHovering, setIsHovering] = useState(false);
  const rippleIdRef = useRef(0);
  const posRef = useRef({ x: -100, y: -100 });
  const rafRef = useRef<number>(0);

  useEffect(() => {
    document.documentElement.style.cursor = "none";

    const moveCursor = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const animateCursor = () => {
      const { x, y } = posRef.current;
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${x - 12}px, ${y - 12}px)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${x - 20}px, ${y - 20}px)`;
      }
      rafRef.current = requestAnimationFrame(animateCursor);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest(
        "button, a, [role='button'], input, select, [data-interactive]",
      );
      setIsHovering(!!interactive);
    };

    const handleClick = (e: MouseEvent) => {
      const id = rippleIdRef.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("click", handleClick);
    rafRef.current = requestAnimationFrame(animateCursor);

    return () => {
      document.documentElement.style.cursor = "";
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Cursor glow halo */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed left-0 top-0 z-[9999] w-10 h-10 rounded-full transition-all duration-150"
        style={{
          background: isHovering
            ? "radial-gradient(circle, oklch(0.45 0.28 22 / 0.35) 0%, transparent 70%)"
            : "radial-gradient(circle, oklch(0.26 0.22 25 / 0.2) 0%, transparent 70%)",
          willChange: "transform",
        }}
      />

      {/* Main cursor blade */}
      <div
        ref={cursorRef}
        className="pointer-events-none fixed left-0 top-0 z-[10000] w-6 h-6"
        style={{ willChange: "transform" }}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-full transition-all duration-150 ${isHovering ? "scale-125" : "scale-100"}`}
          style={{
            filter: isHovering
              ? "drop-shadow(0 0 4px oklch(0.45 0.28 22)) drop-shadow(0 0 8px oklch(0.65 0.15 60))"
              : "drop-shadow(0 0 2px oklch(0.26 0.22 25))",
          }}
          role="img"
          aria-label="Custom blade cursor"
        >
          <path
            d="M4 20L20 4M15 4H20V9"
            stroke="oklch(0.95 0 0)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M4 20L20 4"
            stroke="oklch(0.65 0.15 60)"
            strokeWidth="1"
            strokeLinecap="round"
            opacity="0.6"
          />
        </svg>
      </div>

      {/* Click ripples */}
      {ripples.map((ripple) => (
        <div
          key={ripple.id}
          className="pointer-events-none fixed z-[9998] rounded-full"
          style={{
            left: ripple.x - 20,
            top: ripple.y - 20,
            width: 40,
            height: 40,
            border: "2px solid oklch(0.26 0.22 25 / 0.7)",
            animation: "ripple-expand 0.6s ease-out forwards",
          }}
        />
      ))}

      <style>{`
        @keyframes ripple-expand {
          0% { transform: scale(0.5); opacity: 1; }
          100% { transform: scale(2.5); opacity: 0; }
        }
      `}</style>
    </>
  );
}
