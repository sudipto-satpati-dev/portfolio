"use client";

import React, { useEffect, useState } from "react";

interface TypewriterTaglineProps {
  text: string;
}

export const TypewriterTagline: React.FC<TypewriterTaglineProps> = ({ text }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text.charAt(index));
        setIndex((prev) => prev + 1);
      }, 35);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return (
    <div className="font-mono text-sm sm:text-base text-text-secondary flex items-baseline flex-wrap gap-1 leading-relaxed">
      <span>{displayedText}</span>
      <span className="w-2.5 h-4 bg-accent-primary inline-block animate-blink align-middle ml-0.5" />
    </div>
  );
};
