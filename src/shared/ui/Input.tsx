import type { InputHTMLAttributes } from 'react'
import { Search } from 'lucide-react'

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  icon?: 'search'
}

export function Input({
  label,
  icon,
  id,
  className = '',
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  return (
    <label className="block" htmlFor={inputId}>
      {label && (
        <span className="mb-2 block text-sm font-medium text-ink">{label}</span>
      )}
      <span className="relative block">
        {icon === 'search' && (
          <Search
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            size={18}
          />
        )}
        <input
          id={inputId}
          className={`input ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </span>
    </label>
  )
}
