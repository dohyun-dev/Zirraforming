import { useRef } from "react";
import { useState, useEffect, useCallback } from "react";

function useScript(src) {
  const [status, setStatus] = useState(src ? "loading" : "idle");

  useEffect(
    () => {
      if (!src) {
        setStatus("idle");
        return;
      }

      let script = document.querySelector(`script[src="${src}"]`);

      if (!script) {
        script = document.createElement("script");
        script.src = src;
        script.async = true;
        script.setAttribute("data-status", "loading");

        document.body.appendChild(script);

        const setAttributeFromEvent = (event) => {
          script.setAttribute(
            "data-status",
            event.type === "load" ? "ready" : "error"
          );
        };

        script.addEventListener("load", setAttributeFromEvent);
        script.addEventListener("error", setAttributeFromEvent);
      } else {
        setStatus(script.getAttribute("data-status"));
      }

      const setStateFromEvent = (event) => {
        setStatus(event.type === "load" ? "ready" : "error");
      };

      script.addEventListener("load", setStateFromEvent);
      script.addEventListener("error", setStateFromEvent);

      return () => {
        if (script) {
          script.removeEventListener("load", setStateFromEvent);
          script.removeEventListener("error", setStateFromEvent);
        }
      };
    },
    [src] // Only re-run effect if script src changes
  );

  return status;
}

export { useScript };

export function useInterval(maxValue) {
  const [now, setNow] = useState(0);
  const [play, setPlay] = useState(true);

  const intervalRef = useRef(null);

  const start = useCallback(() => {
    setPlay(true);
    if (intervalRef.current !== null) {
      return;
    }

    intervalRef.current = setInterval(() => {
      setNow((v) => {
        if (v === maxValue) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
          setPlay(false);
          return v;
        } else return v + 1;
      });
    }, 500);
  }, []);

  const stop = useCallback(() => {
    setPlay(false);
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  return { now, setNow, start, stop, play, setPlay };
}
