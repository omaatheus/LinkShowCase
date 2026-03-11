"use client";

import useOnClickOutside from "@/app/hooks/useOnClickOuside";
import { RefObject, useRef, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  children,
  isOpen,
  setIsOpen,
  closeOnClickOutside = false,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  closeOnClickOutside?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useOnClickOutside(ref as RefObject<HTMLDivElement>, () => {
    if (!closeOnClickOutside) {
      setIsOpen(false);
    }
  });

  if (!isOpen || !mounted) return null;
  return createPortal(
    <div className="fixed inset-0 bg-[#787878]/10 flex items-center justify-center backdrop-blur-md z-[9999]">
      <div ref={ref}>{children}</div>
    </div>,
    document.body
  );
}