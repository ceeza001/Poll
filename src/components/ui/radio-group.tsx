"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
import { Circle } from "lucide-react"

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)}
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        "relative w-full rounded-lg border border-border shadow-md flex gap-2 items-center p-[1rem] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    >
      <RadioGroupPrimitive.Indicator className="absolute top-0 left-0 w-full h-full rounded-lg border border-primary ring-offset-primary outline-none ring-1 ring-primary ring-offset-2">
      </RadioGroupPrimitive.Indicator>
      <span className="h-4 w-4 rounded-full overflow-hidden bg-border relative">
        <RadioGroupPrimitive.Indicator className="w-full h-full absolute top-0 left-0 bg-primary flex justify-center items-center">
          <Circle className="h-1.5 w-1.5 fill-current text-current" />
        </RadioGroupPrimitive.Indicator>
      </span>
      {children}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
