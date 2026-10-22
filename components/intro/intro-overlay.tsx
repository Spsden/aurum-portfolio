"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  { id: "user", label: "User" },
  { id: "edge", label: "Global Edge" },
  { id: "vercel", label: "Vercel" },
  { id: "domain", label: "pratap.world" },
  { id: "compute", label: "Compute Backend" },
];

const STEP_DELAY = 350;
const INITIAL_DELAY = 400;
const FINAL_PAUSE = 800;
const FADE_DURATION = 600;

function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, [query]);

  return matches;
}

export default function IntroOverlay() {
  const [phase, setPhase] = useState(-2);
  const [visible, setVisible] = useState(true);
  const isMobile = useMediaQuery("(max-width: 767px)");
  const prefersReduced = useReducedMotion();

  const startSequence = useCallback(() => {
    setPhase(-1);
    setTimeout(() => setPhase(0), INITIAL_DELAY);
    setTimeout(() => setPhase(1), INITIAL_DELAY + STEP_DELAY * 1);
    setTimeout(() => setPhase(2), INITIAL_DELAY + STEP_DELAY * 2);
    setTimeout(() => setPhase(3), INITIAL_DELAY + STEP_DELAY * 3);
    setTimeout(() => setPhase(4), INITIAL_DELAY + STEP_DELAY * 4);
    setTimeout(() => setPhase(5), INITIAL_DELAY + STEP_DELAY * 5);

    const total = INITIAL_DELAY + STEP_DELAY * 5 + FINAL_PAUSE;
    setTimeout(() => {
      setPhase(6);
      setTimeout(() => {
        setVisible(false);
      }, FADE_DURATION);
    }, total);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      setVisible(false);
      return;
    }
    startSequence();
  }, [prefersReduced, startSequence]);

  if (!visible) return null;

  const isActive = (index: number) => phase >= index;
  const isComplete = phase >= 5;

  const connectorWidth = isMobile ? 20 : 40;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === 6 ? 0 : 1 }}
      transition={{ duration: FADE_DURATION / 1000, ease: [0.25, 0.1, 0.25, 1] }}
      style={{ backgroundColor: "#0a0a0a", pointerEvents: "none" }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 8 : 0,
        }}
      >
        {NODES.map((node, i) => (
          <div
            key={node.id}
            className="flex items-center justify-center"
            style={{
              flexDirection: isMobile ? "column" : "row",
              gap: isMobile ? 8 : 0,
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={
                isActive(i)
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.5 }
              }
              transition={{
                duration: 0.4,
                ease: [0.25, 0.1, 0.25, 1],
              }}
              className="flex items-center gap-3"
              style={{
                flexDirection: isMobile ? "column" : "row",
              }}
            >
              <div
                className="rounded-full shrink-0"
                style={{
                  width: isMobile ? 10 : 12,
                  height: isMobile ? 10 : 12,
                  border: `1.5px solid ${
                    isComplete
                      ? "#a6e3a1"
                      : isActive(i)
                        ? "#89b4fa"
                        : "#313244"
                  }`,
                  backgroundColor: isComplete
                    ? "#a6e3a120"
                    : isActive(i)
                      ? "#89b4fa15"
                      : "transparent",
                  boxShadow:
                    isComplete
                      ? "0 0 12px rgba(166, 227, 161, 0.3)"
                      : isActive(i)
                        ? "0 0 8px rgba(137, 180, 250, 0.2)"
                        : "none",
                  transition: "all 0.4s ease",
                }}
              />
              <span
                style={{
                  fontSize: isMobile ? 11 : 13,
                  fontWeight: isActive(i) ? 600 : 400,
                  color: isComplete
                    ? "#a6e3a1"
                    : isActive(i)
                      ? "#cdd6f4"
                      : "#6c7086",
                  whiteSpace: "nowrap",
                  fontFamily:
                    "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
                  letterSpacing: "0.02em",
                  transition: "all 0.4s ease",
                }}
              >
                {node.label}
              </span>
            </motion.div>

            {i < NODES.length - 1 && (
              <motion.div
                initial={false}
                animate={
                  isActive(i + 1)
                    ? {
                        opacity: 1,
                        scaleX: isMobile ? 1 : 1,
                        scaleY: isMobile ? 1 : 1,
                      }
                    : {
                        opacity: 0,
                        scaleX: 0,
                        scaleY: 0,
                      }
                }
                transition={{
                  duration: 0.35,
                  ease: [0.25, 0.1, 0.25, 1],
                  delay: 0.05,
                }}
                className="flex items-center justify-center"
                style={{
                  marginLeft: isMobile ? 0 : 4,
                  marginRight: isMobile ? 0 : 4,
                  marginTop: isMobile ? 4 : 0,
                  marginBottom: isMobile ? 4 : 0,
                  transformOrigin: isMobile ? "top center" : "left center",
                }}
              >
                {isMobile ? (
                  <svg
                    width="8"
                    height={connectorWidth}
                    viewBox={`0 0 8 ${connectorWidth}`}
                    fill="none"
                    aria-hidden
                  >
                    <line
                      x1="4"
                      y1="0"
                      x2="4"
                      y2={connectorWidth - 6}
                      stroke={isComplete ? "#a6e3a1" : "#585b70"}
                      strokeWidth="1"
                      strokeDasharray={connectorWidth}
                      strokeDashoffset={
                        isActive(i + 1) ? 0 : connectorWidth
                      }
                      style={{ transition: "stroke-dashoffset 0.4s ease" }}
                    />
                    <path
                      d="M1.5 14L4 17.5L6.5 14"
                      stroke={isComplete ? "#a6e3a1" : "#585b70"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                ) : (
                  <svg
                    width={connectorWidth}
                    height="8"
                    viewBox={`0 0 ${connectorWidth} 8`}
                    fill="none"
                    aria-hidden
                  >
                    <line
                      x1="0"
                      y1="4"
                      x2={connectorWidth - 6}
                      y2="4"
                      stroke={isComplete ? "#a6e3a1" : "#585b70"}
                      strokeWidth="1"
                      strokeDasharray={connectorWidth}
                      strokeDashoffset={
                        isActive(i + 1) ? 0 : connectorWidth
                      }
                      style={{ transition: "stroke-dashoffset 0.4s ease" }}
                    />
                    <path
                      d={`M${connectorWidth - 8} 1.5L${connectorWidth - 4.5} 4L${connectorWidth - 8} 6.5`}
                      stroke={isComplete ? "#a6e3a1" : "#585b70"}
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                )}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {phase >= 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isComplete ? 1 : 0.5 }}
          transition={{ duration: 0.6 }}
          className="absolute bottom-12 left-0 right-0 text-center"
          style={{ pointerEvents: "none" }}
        >
          <span
            style={{
              fontSize: 10,
              color: isComplete ? "#a6e3a1" : "#585b70",
              fontFamily: "'Geist Mono', 'SF Mono', 'Fira Code', monospace",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              opacity: isComplete ? 0.8 : 0.4,
              transition: "all 0.6s ease",
            }}
          >
            {isComplete ? "connection established" : "routing request..."}
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}
