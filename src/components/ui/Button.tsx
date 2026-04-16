import React from "react";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "secondary";
  className?: string;
}

export default function Button({
  text,
  onClick,
  variant = "primary",
  className,
}: ButtonProps) {
  // ADDED: shadow-md for baseline depth, hover:shadow-lg for the hover glow/depth,
  // and hover:scale-[1.02] for that exact, subtle 2px popup effect!
  const baseStyles =
    "px-6 py-2 rounded-full font-semibold transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]";

  // Removed shadow-md from here since it is now globally applied in baseStyles
  const primaryStyles = "bg-blue-600 text-white hover:bg-blue-700";

  const finalClassName = className
    ? `${baseStyles} ${className}`
    : `${baseStyles} ${primaryStyles}`;

  return (
    <button onClick={onClick} className={finalClassName}>
      {text}
    </button>
  );
}
