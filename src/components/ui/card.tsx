import { type HTMLAttributes, forwardRef } from 'react'

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'muted' | 'accent'
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', className = '', children, ...props }, ref) => {
    const baseStyles = 'relative overflow-hidden transition-all duration-500 hover:-translate-y-1'

    const variantStyles = {
      default: 'bg-[#FEFEFA] border-[#DED8CF]/50 shadow-[0_4px_20px_-2px_rgba(93,112,82,0.15)] hover:shadow-[0_20px_40px_-10px_rgba(93,112,82,0.15)]',
      muted: 'bg-[#F0EBE5]/30 border-[#DED8CF]/30',
      accent: 'bg-[#E6DCCD]/20 border-[#C18C5D]/30'
    }

    return (
      <div
        ref={ref}
        className={`${baseStyles} ${variantStyles[variant]} rounded-[2rem] border ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
)

Card.displayName = 'Card'
