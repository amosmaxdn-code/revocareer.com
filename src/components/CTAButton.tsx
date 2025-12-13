"use client";

import Link from "next/link";

type CTAButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "accent";
  className?: string;
  type?: "button" | "submit" | "reset";
};

export function CTAButton({
  children,
  href,
  onClick,
  variant = "primary",
  className = "",
  type = "button",
}: CTAButtonProps) {
  const baseClasses =
    "px-8 py-3 font-semibold rounded-md shadow-sm transition-transform transform hover:scale-105 duration-300 inline-block text-center";

  const variantClasses = {
    primary: "bg-primary text-white hover:bg-blue-700",
    secondary: "bg-dark-blue text-white hover:bg-gray-800",
    accent: "bg-accent text-dark-blue hover:bg-yellow-500",
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={combinedClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={combinedClasses}>
      {children}
    </button>
  );
}
