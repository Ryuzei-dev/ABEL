import * as React from "react"
import { cn } from "@/lib/utils"

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        "resize-none min-h-24 w-full rounded-md border border-border bg-secondary bg-clip-padding p-2.5 text-sm text-foreground outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:outline-none",
        className
      )}
      {...props}
    />
  )
})

Textarea.displayName = "Textarea"

export { Textarea }
