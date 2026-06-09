// components/ui/Button.tsx
'use client';

import Link from 'next/link';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'small' | 'default' | 'large';

interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit';
  disabled?: boolean;
  fullWidth?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'default',
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
  fullWidth = false,
}: ButtonProps) {
  const baseClasses = 'font-medium rounded-xl transition-all duration-300 inline-flex items-center justify-center gap-2';

  const sizeClasses: Record<ButtonSize, string> = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-accent hover:bg-accent-hover text-bg-primary hover:scale-105 hover:shadow-lg hover:shadow-accent/25',
    outline: 'border-2 border-accent text-accent hover:bg-accent hover:text-bg-primary',
    ghost: 'text-text-secondary hover:text-accent',
  };

  const widthClass = fullWidth ? 'w-full' : '';
  const disabledClass = disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : '';

  const classes = `${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${widthClass} ${disabledClass} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
    >
      {children}
    </button>
  );
}