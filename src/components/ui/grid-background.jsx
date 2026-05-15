import { cn } from "@/lib/utils";

/**
 * MagentaOrbGrid – A light-themed grid with a magenta/purple radial orb.
 * Usage: Wrap content or use as full-page background layer.
 */
export function MagentaOrbGrid({ className, children }) {
  return (
    <div className={cn("min-h-screen w-full bg-white relative", className)}>
      {/* Magenta Orb Grid Background */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: "white",
          backgroundImage: `
            linear-gradient(to right, rgba(71,85,105,0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(71,85,105,0.15) 1px, transparent 1px),
            radial-gradient(circle at 50% 60%, rgba(236,72,153,0.15) 0%, rgba(168,85,247,0.05) 40%, transparent 70%)
          `,
          backgroundSize: "40px 40px, 40px 40px, 100% 100%",
        }}
      />
      {/* Content rendered above the grid */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

/**
 * DarkMultiplierGrid – A dark-themed grid with layered diagonal lines
 * and green/pink accent glow.
 * Usage: Full-page background or section wrapper for dark UIs.
 */
export function DarkMultiplierGrid({ className, children }) {
  return (
    <div
      className={cn(
        "min-h-screen w-full bg-[#101014] relative text-white",
        className
      )}
    >
      {/* Complex Multiplier Pattern (Enhanced) */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0, rgba(255,255,255,0.04) 1px, transparent 1px, transparent 40px),
            repeating-linear-gradient(45deg, rgba(59,130,246,0.08) 0, rgba(59,130,246,0.08) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(99,102,241,0.07) 0, rgba(99,102,241,0.07) 1px, transparent 1px, transparent 30px),
            repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 80px),
            radial-gradient(circle at 60% 40%, rgba(59,130,246,0.06) 0, transparent 60%)
          `,
          backgroundSize:
            "80px 80px, 40px 40px, 60px 60px, 80px 80px, 100% 100%",
          backgroundPosition: "0 0, 0 0, 0 0, 40px 40px, center",
        }}
      />
      {/* Content rendered above the grid */}
      {children && <div className="relative z-10">{children}</div>}
    </div>
  );
}

export default DarkMultiplierGrid;
