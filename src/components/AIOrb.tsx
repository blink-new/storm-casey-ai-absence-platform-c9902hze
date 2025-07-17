import { cn } from "@/lib/utils"

interface AIOrbProps {
  isActive?: boolean
  size?: "sm" | "md" | "lg"
  className?: string
}

export function AIOrb({ isActive = false, size = "md", className }: AIOrbProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-8 h-8", 
    lg: "w-12 h-12"
  }

  return (
    <div className={cn(
      "rounded-full bg-gradient-to-br from-casey-purple to-casey-blue flex items-center justify-center",
      sizeClasses[size],
      isActive && "animate-pulse-gentle",
      className
    )}>
      <div className="w-2 h-2 bg-white rounded-full opacity-90" />
    </div>
  )
}