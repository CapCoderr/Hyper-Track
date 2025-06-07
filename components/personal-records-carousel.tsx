"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PersonalRecordsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [personalRecords, setPersonalRecords] = useState([
    { exercise: "Bench Press", weight: "0", date: "Not set" },
    { exercise: "Squat", weight: "0", date: "Not set" },
    { exercise: "Overhead Press", weight: "0", date: "Not set" },
    { exercise: "Pull-up", weight: "BW+0", date: "Not set" },
  ])

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("personalRecords")
      if (saved) {
        const parsedRecords = JSON.parse(saved)
        if (Array.isArray(parsedRecords) && parsedRecords.length > 0) {
          setPersonalRecords(parsedRecords)
        }
      }
    } catch (e) {
      console.error("Failed to parse saved personal records", e)
    }
  }, [])

  // Save to localStorage whenever records change
  useEffect(() => {
    try {
      localStorage.setItem("personalRecords", JSON.stringify(personalRecords))
    } catch (e) {
      console.error("Failed to save personal records to localStorage", e)
    }
  }, [personalRecords])

  const nextRecord = () => {
    setCurrentIndex((prevIndex) => (prevIndex === personalRecords.length - 1 ? 0 : prevIndex + 1))
  }

  const prevRecord = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? personalRecords.length - 1 : prevIndex - 1))
  }

  const record = personalRecords[currentIndex]

  return (
    <div className="relative h-full flex items-center justify-center">
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full absolute left-2 z-10 opacity-70 hover:opacity-100 hover:bg-blue-50"
        onClick={prevRecord}
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="sr-only">Previous record</span>
      </Button>

      <div className="text-center w-full py-4">
        <div className="text-2xl font-bold text-blue-900 font-display">{record.weight}</div>
        <div className="text-sm font-medium text-gray-700 font-display">{record.exercise}</div>
        <div className="text-xs text-gray-500 font-body">{record.date}</div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 rounded-full absolute right-2 z-10 opacity-70 hover:opacity-100 hover:bg-blue-50"
        onClick={nextRecord}
      >
        <ChevronRight className="h-4 w-4" />
        <span className="sr-only">Next record</span>
      </Button>

      <div className="absolute bottom-1 left-0 right-0 flex justify-center gap-1">
        {personalRecords.map((_, index) => (
          <div
            key={index}
            className={`h-1 w-6 rounded-full transition-colors ${index === currentIndex ? "bg-blue-500" : "bg-gray-300"}`}
          />
        ))}
      </div>
    </div>
  )
}
