"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit2, Save, X, Plus, Minus } from "lucide-react"

interface EditableDashboardCardProps {
  title: string
  value: string
  subtitle: string
  inputType?: string
  suffix?: string
  storageKey: string
}

export default function EditableDashboardCard({
  title,
  value: initialValue,
  subtitle,
  inputType = "text",
  suffix = "",
  storageKey,
}: EditableDashboardCardProps) {
  const [value, setValue] = useState(initialValue)
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(initialValue)

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      setValue(saved)
      setEditValue(saved)
    }
  }, [storageKey])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, value)
  }, [value, storageKey])

  const handleEdit = () => {
    setIsEditing(true)
    setEditValue(value)
  }

  const handleSave = () => {
    setValue(editValue)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleIncrement = () => {
    const currentNum = Number.parseInt(value) || 0
    const newValue = (currentNum + 1).toString()
    setValue(newValue)
  }

  const handleDecrement = () => {
    const currentNum = Number.parseInt(value) || 0
    const newValue = Math.max(0, currentNum - 1).toString()
    setValue(newValue)
  }

  // Special handling for Total Workouts counter
  const isTotalWorkouts = storageKey === "totalWorkouts"

  return (
    <Card className="bg-white/70 backdrop-blur-sm border border-blue-200 shadow-lg hover:shadow-xl transition-shadow">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
            <CardDescription className="text-xs text-gray-500">{subtitle}</CardDescription>
          </div>
          {!isEditing && !isTotalWorkouts && (
            <Button onClick={handleEdit} variant="ghost" size="icon" className="h-6 w-6">
              <Edit2 className="h-3 w-3" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        {isEditing ? (
          <div className="space-y-2">
            <Input
              type={inputType}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="h-8 text-sm"
              autoFocus
            />
            <div className="flex gap-1">
              <Button onClick={handleSave} size="sm" className="h-6 text-xs">
                <Save className="h-3 w-3 mr-1" />
                Save
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm" className="h-6 text-xs">
                <X className="h-3 w-3 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : isTotalWorkouts ? (
          <div className="space-y-2">
            <div className="text-2xl font-bold text-gray-900">
              {value}
              {suffix}
            </div>
            <div className="flex gap-1">
              <Button onClick={handleDecrement} variant="outline" size="sm" className="h-6 w-6 p-0">
                <Minus className="h-3 w-3" />
              </Button>
              <Button onClick={handleIncrement} variant="outline" size="sm" className="h-6 w-6 p-0">
                <Plus className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-2xl font-bold text-gray-900">
            {value}
            {suffix}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
