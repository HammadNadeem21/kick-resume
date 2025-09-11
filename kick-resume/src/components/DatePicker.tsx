"use client"

import * as React from "react"
import { ChevronDownIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Label } from "@/components/ui/label"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

type DatePickerProps = {
  label?: string
  id?: string
  value?: Date | undefined
  onChange: (date: Date | undefined) => void
  disabled?: boolean
  className?: string
  buttonClassName?: string
}

export function DatePicker({
  label,
  id = "date",
  value,
  onChange,
  disabled,
  className,
  buttonClassName,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className={"flex flex-col gap-2 " + (className ?? "") }>
      {label && (
        <Label htmlFor={id} className="px-1">
          {label}
        </Label>
      )}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id={id}
            disabled={disabled}
            className={(buttonClassName ?? "") + " w-full justify-between font-normal"}
          >
            {value ? value.toLocaleDateString() : "Select date"}
            <ChevronDownIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            onSelect={(date) => {
              onChange(date)
              setOpen(false)
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

// Backward-compatible export name (if previously used)
export const Calendar22 = DatePicker
