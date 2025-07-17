import { cn } from "@/lib/utils"

interface SmartChipProps {
  label: string
  count?: number
  icon?: string
  onClick?: () => void
  variant?: "default" | "urgent" | "success" | "filter"
  isActive?: boolean
  className?: string
}

export function SmartChip({ 
  label, 
  count, 
  icon, 
  onClick, 
  variant = "default",
  isActive = false,
  className 
}: SmartChipProps) {
  const variantClasses = {
    default: "bg-chip-background hover:bg-chip-hover text-secondary-text border-card-border",
    urgent: "bg-human-needed/10 hover:bg-human-needed/20 text-human-needed border-human-needed/20",
    success: "bg-success-green/10 hover:bg-success-green/20 text-success-green border-success-green/20",
    filter: "bg-casey-blue/10 hover:bg-casey-blue/20 text-casey-blue border-casey-blue/20"
  }

  const activeClasses = {
    default: "bg-chip-hover border-secondary-text",
    urgent: "bg-human-needed/20 border-human-needed/40",
    success: "bg-success-green/20 border-success-green/40", 
    filter: "bg-casey-blue/20 border-casey-blue/40"
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-3 py-2 rounded-lg border text-sm font-medium transition-all duration-200 hover:shadow-sm",
        isActive ? activeClasses[variant] : variantClasses[variant],
        className
      )}
    >
      {icon && <span className="text-base">{icon}</span>}
      <span>{label}</span>
      {count !== undefined && (
        <span className="ml-1 px-1.5 py-0.5 bg-white/50 rounded text-xs font-semibold">
          {count}
        </span>
      )}
    </button>
  )
}