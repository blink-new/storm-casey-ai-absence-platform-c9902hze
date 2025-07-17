import { useState, useRef, useEffect } from "react"
import { AIOrb } from "./AIOrb"
import { cn } from "@/lib/utils"

interface AutocompleteOption {
  text: string
  description?: string
}

interface NaturalLanguageInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: (value: string) => void
  placeholder?: string
  autocompleteOptions?: AutocompleteOption[]
  isProcessing?: boolean
  className?: string
}

export function NaturalLanguageInput({
  value,
  onChange,
  onSubmit,
  placeholder = "Ask anything...",
  autocompleteOptions = [],
  isProcessing = false,
  className
}: NaturalLanguageInputProps) {
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  const filteredOptions = autocompleteOptions.filter(option =>
    option.text.toLowerCase().includes(value.toLowerCase()) && value.length > 0
  )

  useEffect(() => {
    setShowAutocomplete(filteredOptions.length > 0 && value.length > 0)
    setSelectedIndex(-1)
  }, [value, filteredOptions.length])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      if (selectedIndex >= 0 && filteredOptions[selectedIndex]) {
        onChange(filteredOptions[selectedIndex].text)
        setShowAutocomplete(false)
      } else if (value.trim()) {
        onSubmit(value.trim())
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setSelectedIndex(prev => 
        prev < filteredOptions.length - 1 ? prev + 1 : prev
      )
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setSelectedIndex(prev => prev > 0 ? prev - 1 : -1)
    } else if (e.key === 'Escape') {
      setShowAutocomplete(false)
      setSelectedIndex(-1)
    }
  }

  const handleOptionClick = (option: AutocompleteOption) => {
    onChange(option.text)
    setShowAutocomplete(false)
    inputRef.current?.focus()
  }

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
          <AIOrb isActive={isProcessing} size="md" />
        </div>
        
        <input
          ref={inputRef}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "w-full pl-16 pr-6 py-4 text-lg bg-card-background border border-card-border rounded-xl",
            "placeholder:text-tertiary-text text-primary-text",
            "focus:outline-none focus:ring-2 focus:ring-casey-blue/20 focus:border-casey-blue/50",
            "shadow-sm hover:shadow-md transition-all duration-200",
            isProcessing && "cursor-wait"
          )}
          disabled={isProcessing}
        />
      </div>

      {showAutocomplete && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card-background border border-card-border rounded-xl shadow-lg z-20 animate-fade-in">
          {filteredOptions.map((option, index) => (
            <button
              key={index}
              onClick={() => handleOptionClick(option)}
              className={cn(
                "w-full px-4 py-3 text-left hover:bg-chip-background transition-colors duration-150",
                "first:rounded-t-xl last:rounded-b-xl",
                index === selectedIndex && "bg-chip-background"
              )}
            >
              <div className="text-primary-text font-medium">{option.text}</div>
              {option.description && (
                <div className="text-sm text-secondary-text mt-1">{option.description}</div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}