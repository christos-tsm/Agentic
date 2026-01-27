"use client"

import * as React from "react"
import { format, parse } from "date-fns"
import { el } from "date-fns/locale"
import { Calendar as CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "@/components/ui/input"

interface DatePickerProps {
  value?: string // Format: d/m/Y (e.g., "27/01/2026")
  defaultValue?: string // Format: d/m/Y (e.g., "27/01/2026")
  onChange?: (value: string) => void
  name?: string
  id?: string
  placeholder?: string
  className?: string
  disabled?: boolean
}

export function DatePicker({
  value,
  defaultValue,
  onChange,
  name,
  id,
  placeholder = "Επιλέξτε ημερομηνία",
  className,
  disabled,
}: DatePickerProps) {
  // Parse date - can be either d/m/Y (display) or YYYY-MM-DD (from backend/MySQL)
  const parseDate = (dateString: string): Date | undefined => {
    if (!dateString) return undefined
    
    // First try MySQL format YYYY-MM-DD
    let parsed = parse(dateString, "yyyy-MM-dd", new Date())
    if (!isNaN(parsed.getTime())) {
      return parsed
    }
    
    // Then try d/MM/yyyy format (with leading zero for month)
    parsed = parse(dateString, "d/MM/yyyy", new Date(), { locale: el })
    if (!isNaN(parsed.getTime())) {
      return parsed
    }
    
    // Try d/M/yyyy in case month doesn't have leading zero
    parsed = parse(dateString, "d/M/yyyy", new Date(), { locale: el })
    if (!isNaN(parsed.getTime())) {
      return parsed
    }
    
    return undefined
  }

  // Format date to d/m/Y format (backend format with leading zero for month)
  const formatDate = (date: Date): string => {
    return format(date, "d/MM/yyyy", { locale: el })
  }

  const initialValue = value || defaultValue || ''
  const [date, setDate] = React.useState<Date | undefined>(
    parseDate(initialValue)
  )
  const [open, setOpen] = React.useState(false)

  // Update date when value prop changes (controlled mode)
  React.useEffect(() => {
    if (value !== undefined) {
      setDate(parseDate(value))
    }
  }, [value])

  const handleSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate)
    if (selectedDate && onChange) {
      const formatted = formatDate(selectedDate)
      onChange(formatted)
    } else if (!selectedDate && onChange) {
      onChange("")
    }
    setOpen(false)
  }

  const displayValue = date ? formatDate(date) : ""
  
  // Format for MySQL (YYYY-MM-DD)
  const mysqlValue = date ? format(date, "yyyy-MM-dd") : ""

  const hiddenInputRef = React.useRef<HTMLInputElement>(null)

  // Update hidden input when date changes - send MySQL format
  React.useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = mysqlValue
      // Trigger change event for Inertia form
      const event = new Event('input', { bubbles: true })
      hiddenInputRef.current.dispatchEvent(event)
    }
  }, [mysqlValue])

  return (
    <div className={cn("relative", className)}>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
            disabled={disabled}
            type="button"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayValue || placeholder}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start" sideOffset={4}>
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleSelect}
            initialFocus
            locale={el}
          />
        </PopoverContent>
      </Popover>
      {/* Hidden input for form submission - MySQL format YYYY-MM-DD */}
      {name && (
        <input
          ref={hiddenInputRef}
          type="hidden"
          name={name}
          id={id}
          defaultValue={mysqlValue}
        />
      )}
    </div>
  )
}
