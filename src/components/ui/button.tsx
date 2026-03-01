import { type ButtonHTMLAttributes, forwardRef } from 'react'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline' | 'ghost'
  size?: 'sm' | 'default' | 'lg'
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'default', className = '', children, ...props }, ref) => {
    const baseStyles = 'rounded-full font-semibold transition-all duration-300 hover:scale-105 active:scale-95'

    const variantStyles = {
      primary: 'bg-[#5D7052] text-[#F3F4F1] shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:shadow-[0_6px_24px_-4px_rgba(93,112,82,0.25)]',
      outline: 'border-2 border-[#C18C5D] text-[#C18C5D] bg-transparent hover:bg-[#C18C5D]/10',
      ghost: 'bg-transparent text-[#5D7052] hover:bg-[#5D7052]/10'
    }

    const sizeStyles = {
      sm: 'h-10 px-6 text-sm',
      default: 'h-12 px-8 text-base',
      lg: 'h-14 px-10 text-lg'
    }

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
