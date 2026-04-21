import { useCallback, useEffect, useRef, useState } from "react";

const KONAMI_SEQUENCE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];

export function useKonamiCode(onActivate: () => void) {
  const positionRef = useRef(0);

  const handleKey = useCallback(
    (e: KeyboardEvent) => {
      const key = e.key;
      if (key === KONAMI_SEQUENCE[positionRef.current]) {
        positionRef.current += 1;
        if (positionRef.current === KONAMI_SEQUENCE.length) {
          positionRef.current = 0;
          onActivate();
        }
      } else {
        // Reset, but check if first key
        positionRef.current = key === KONAMI_SEQUENCE[0] ? 1 : 0;
      }
    },
    [onActivate],
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [handleKey]);
}

// ── Titan Mode ────────────────────────────────────────────────────────────────

const TITAN_DURATION_MS = 30_000;

export function useTitanMode() {
  const [titanActive, setTitanActive] = useState(false);
  const [konamiVisible, setKonamiVisible] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const activate = useCallback(() => {
    if (titanActive) return;
    setKonamiVisible(true);
    setTitanActive(true);
    document.body.classList.add("titan-mode");

    timerRef.current = setTimeout(() => {
      setTitanActive(false);
      setKonamiVisible(false);
      document.body.classList.remove("titan-mode");
    }, TITAN_DURATION_MS);
  }, [titanActive]);

  const dismissOverlay = useCallback(() => {
    setKonamiVisible(false);
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      document.body.classList.remove("titan-mode");
    };
  }, []);

  return { titanActive, konamiVisible, activate, dismissOverlay };
}
