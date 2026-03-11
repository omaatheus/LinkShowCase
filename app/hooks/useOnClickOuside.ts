import { useEffect, useRef } from "react";

export default function useOnClickOutside(
  ref: React.RefObject<HTMLDivElement>,
  handler: (event: MouseEvent | TouchEvent) => void
) {
  const savedHandler = useRef(handler);

  useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      const target = event.target as HTMLElement;

      if (!ref.current) {
        return;
      }

      if (ref.current.contains(target)) {
        return;
      }
      savedHandler.current(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref]); 
}