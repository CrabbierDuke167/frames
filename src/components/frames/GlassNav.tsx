import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

import { brand, navItems } from "@/content/frames";
import { requestIntroReplay } from "@/components/frames/Intro";
import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Toggle light and dark mode"
      className={cn(
        "grid size-9 place-items-center rounded-full border border-glass-border text-foreground/70 transition-colors hover:text-foreground",
        className,
      )}
    >
      {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}

export function GlassNav() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollY } = useScroll();
  const scrollWave = useSpring(scrollY, { stiffness: 120, damping: 28, mass: 0.35 });
  const waveX = useTransform(scrollWave, (value) => Math.sin(value / 115) * 3);
  const waveRotate = useTransform(scrollWave, (value) => Math.sin(value / 160) * 0.18);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const replayHome = () => {
    setOpen(false);
    if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      requestIntroReplay();
      return;
    }
    try {
      // sessionStorage.removeItem("frames-intro-seen");
    } catch {
      // The homepage still opens normally if storage is unavailable.
    }
  };

  return (
    <>
      <motion.header
        initial={false}
        style={{ x: waveX, rotate: waveRotate }}
        className="fixed inset-x-0 top-3 z-50 flex max-w-full justify-center px-3 sm:top-5 sm:px-4"
      >
        <nav className="glass specular flex max-w-full items-center gap-1 rounded-full px-2 py-2 pl-4 sm:pl-5">
          <Link
            to="/"
            onClick={replayHome}
            className="mr-2 shrink-0 text-[0.95rem] font-semibold sm:mr-4"
            aria-label={brand.name}
          >
            {brand.name}
          </Link>

          <div
            className="relative hidden items-center gap-0.5 md:flex"
            onMouseLeave={() => setHovered(null)}
          >
            {navItems.map((item) => {
              const active = pathname === item.to || pathname.startsWith(item.to + "/");
              const lit = hovered ? hovered === item.label : active;
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onMouseEnter={() => setHovered(item.label)}
                  onFocus={() => setHovered(item.label)}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-[0.8rem] font-medium tracking-[0.02em] uppercase transition-colors duration-300",
                    lit || active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  {lit && (
                    <motion.span
                      layoutId="liquid-pill"
                      aria-hidden
                      className="liquid-glass absolute inset-0 -z-10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 32, mass: 0.9 }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
            <ThemeToggle className="ml-1" />
          </div>

          <div className="flex items-center gap-1 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-label="Open menu"
              className="rounded-full bg-foreground px-4 py-2 text-[0.72rem] font-semibold tracking-[0.18em] text-background uppercase"
            >
              {open ? "Close" : "Menu"}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="glass-panel fixed inset-0 z-40 flex h-[100dvh] max-w-full flex-col justify-center overflow-y-auto overscroll-contain px-8 md:hidden"
          >
            <div className="flex flex-col gap-1">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.05 + i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-hairline"
                >
                  <Link
                    to={item.to}
                    onClick={() => setOpen(false)}
                    className="display-md block py-4 text-left"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
            <p className="eyebrow mt-10">{brand.tagline}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
