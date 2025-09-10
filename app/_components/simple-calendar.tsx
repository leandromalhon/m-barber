"use client"
/* eslint-disable no-unused-vars */

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "./ui/button"
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  isToday,
} from "date-fns"

interface SimpleCalendarProps {
  selected: Date | undefined
  onSelect: (value: Date | undefined) => void
  fromDate?: Date
}

const SimpleCalendar = ({
  selected,
  onSelect,
  fromDate = new Date(),
}: SimpleCalendarProps) => {
  const [currentMonth, setCurrentMonth] = React.useState(new Date())

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
  }

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1))
  }

  const renderHeader = () => {
    return (
      <div className="mb-4 flex items-center justify-between">
        <Button
          variant="outline"
          size="icon"
          onClick={prevMonth}
          className="h-7 w-7"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm font-medium capitalize">
          {currentMonth.toLocaleDateString("pt-BR", {
            month: "long",
            year: "numeric",
          })}
        </span>
        <Button
          variant="outline"
          size="icon"
          onClick={nextMonth}
          className="h-7 w-7"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  const renderDays = () => {
    const weekDays = ["D", "S", "T", "Q", "Q", "S", "S"]

    return (
      <div className="mb-2 grid grid-cols-7 gap-1">
        {weekDays.map((dayName, index) => (
          <div
            key={index}
            className="py-2 text-center text-xs font-medium uppercase text-muted-foreground"
          >
            {dayName}
          </div>
        ))}
      </div>
    )
  }

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth)
    const monthEnd = endOfMonth(monthStart)
    const calendarStart = startOfWeek(monthStart)
    const calendarEnd = endOfWeek(monthEnd)

    const rows = []
    const cells = []
    let currentDay = calendarStart

    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const fromDateWithoutTime = new Date(fromDate)
    fromDateWithoutTime.setHours(0, 0, 0, 0)

    while (currentDay <= calendarEnd) {
      const dayForCell = new Date(currentDay)
      const dayWithoutTime = new Date(currentDay)
      dayWithoutTime.setHours(0, 0, 0, 0)

      const isSelected = selected && isSameDay(currentDay, selected)
      const isCurrentDay = isToday(currentDay)
      const isOtherMonth = !isSameMonth(currentDay, monthStart)
      const isDisabled = dayWithoutTime < fromDateWithoutTime

      cells.push(
        <div
          key={currentDay.toString()}
          className={`rounded-full p-1 text-center text-sm transition-colors ${
            isOtherMonth ? "text-muted-foreground opacity-50" : ""
          } ${isSelected ? "bg-primary text-primary-foreground" : ""} ${
            isCurrentDay && !isSelected ? "border border-border" : ""
          } ${
            isDisabled
              ? "cursor-not-allowed text-muted-foreground opacity-30"
              : "cursor-pointer hover:bg-accent"
          }`}
          onClick={() => {
            if (!isDisabled && !isOtherMonth) {
              onSelect(dayForCell)
            }
          }}
        >
          {currentDay.getDate()}
        </div>,
      )

      if (cells.length === 7) {
        rows.push(
          <div key={cells.length} className="grid grid-cols-7 gap-1">
            {[...cells]}
          </div>,
        )
        cells.length = 0
      }

      currentDay = addDays(currentDay, 1)
    }

    return <div className="space-y-1">{rows}</div>
  }

  return (
    <div className="mx-auto w-full max-w-[280px] p-3">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
    </div>
  )
}

export { SimpleCalendar }
