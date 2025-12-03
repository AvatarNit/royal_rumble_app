"use client";
import React from "react";
import { useRouter } from "next/navigation";

interface SaveButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void; // properly typed
  href?: string;
}

export default function SaveButton({
  children,
  onClick,
  href = "#",
  ...props
}: SaveButtonProps) {
  const router = useRouter();

  const buttonStyle = {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "var(--primaryBlue)",
    color: "white",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    border: "5px solid transparent",
    borderRadius: "14px",
    padding: "20px 20px",
    width: "100px",
    height: "40px",
    textAlign: "center" as const,
    cursor: "pointer",
    transition: "background-color 0.3s",
    margin: "10px",
  };

  const buttonHover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "white";
    e.currentTarget.style.color = "var(--primaryBlue)";
    e.currentTarget.style.borderColor = "var(--primaryBlue)";
  };

  const buttonUnhover = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.style.backgroundColor = "var(--primaryBlue)";
    e.currentTarget.style.color = "white";
    e.currentTarget.style.borderColor = "transparent";
  };

  return (
    <button
      style={buttonStyle}
      onMouseEnter={buttonHover}
      onMouseLeave={buttonUnhover}
      onClick={onClick ? onClick : () => href && router.push(href)}
      {...props}
    >
      {children}
    </button>
  );
}
