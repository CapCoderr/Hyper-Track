"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X } from "lucide-react"
import PersonalRecordsCarousel from "./personal-records-carousel"

export default function EditablePersonalRecords() {
  const [isEditing, setIsEditing] = useState(false)
  const [records, setRecords] = useState([
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
          setRecords(parsedRecords)
        }
      }
    } catch (e) {
      console.error("Failed to parse saved personal records", e)
    }
  }, [])

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = () => {
    try {
      localStorage.setItem("personalRecords", JSON.stringify(records))
    } catch (e) {
      console.error("Failed to save personal records to localStorage", e)
    }
    setIsEditing(false)
  }

  const handleCancel = () => {
    // Reload from localStorage
    const saved = localStorage.getItem("personalRecords")
    if (saved) {
      try {
        setRecords(JSON.parse(saved))
      } catch (e) {
        console.error("Failed to parse saved personal records", e)
      }
    }
    setIsEditing(false)
  }

  const updateRecord = (index: number, field: string, value: string) => {
    const updatedRecords = [...records]
    updatedRecords[index] = { ...updatedRecords[index], [field]: value }
    setRecords(updatedRecords)
  }

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-xs font-semibold text-gray-700 font-display">Personal Records</CardTitle>
        <div className="flex gap-1">
          {isEditing ? (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 sm:h-6 sm:w-6 rounded-full hover:bg-green-100 text-green-600"
                onClick={handleSave}
              >
                <Save className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-5 w-5 sm:h-6 sm:w-6 rounded-full hover:bg-red-100 text-red-600"
                onClick={handleCancel}
              >
                <X className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
              </Button>
            </>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-full hover:bg-blue-100 text-blue-600"
              onClick={handleEdit}
            >
              <Edit2 className="h-2 w-2 sm:h-2.5 sm:w-2.5" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-0 pb-3">
        {isEditing ? (
          <div className="p-3 space-y-3">
            <div className="text-xs font-medium mb-2 font-display">Edit Personal Records</div>
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2 text-xs font-body">
                <span>Exercise</span>
                <span>Weight</span>
                <span>Date</span>
              </div>
              {records.map((record, index) => (
                <div key={index} className="grid grid-cols-3 gap-2">
                  <Input
                    value={record.exercise}
                    onChange={(e) => updateRecord(index, "exercise", e.target.value)}
                    className="h-6 text-xs font-body"
                  />
                  <Input
                    value={record.weight}
                    onChange={(e) => updateRecord(index, "weight", e.target.value)}
                    className="h-6 text-xs font-body"
                  />
                  <Input
                    type="text"
                    value={record.date}
                    onChange={(e) => updateRecord(index, "date", e.target.value)}
                    className="h-6 text-xs font-body"
                    placeholder="e.g., June 5, 2025"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <PersonalRecordsCarousel />
        )}
      </CardContent>
    </Card>
  )
}
