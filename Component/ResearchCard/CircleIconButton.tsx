import React from 'react';

interface CircleIconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  ariaLabel: string;
}

const CircleIconButton = React.forwardRef<HTMLButtonElement, CircleIconButtonProps>(
  ({ children, onClick, ariaLabel, className = "", disabled = false, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        onClick={onClick}
        aria-label={ariaLabel}
        disabled={disabled}
        className={`
          w-12 h-12 md:w-14 md:h-14      // Adjusted size slightly
          rounded-full
          border-2 border-neutral-400   // Lighter border for the button itself
          bg-black                      // Background of the button
          text-neutral-400              // Icon color
          flex items-center justify-center
          cursor-pointer
          transition-all duration-200 ease-in-out
          hover:bg-neutral-800          // Hover effect
          hover:border-white
          hover:text-white
          focus:outline-none
          focus:ring-2
          focus:ring-offset-2
          focus:ring-offset-black
          focus:ring-sky-500
          disabled:opacity-50
          disabled:cursor-not-allowed
          ${className}
        `}
        {...props}
      >
        {children}
      </button>
    );
  }
);

CircleIconButton.displayName = "CircleIconButton";
export default CircleIconButton;