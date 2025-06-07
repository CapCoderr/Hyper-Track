"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Edit2, Save, X } from "lucide-react"

interface EditableDashboardCardProps {
  title: string
  value: string
  subtitle: string
  icon?: React.ReactNode
  inputType?: "text" | "number"
  suffix?: string
  storageKey?: string
}

export default function EditableDashboardCard({
  title,
  value: initialValue,
  subtitle,
  icon,
  inputType = "text",
  suffix = "",
  storageKey,
}: EditableDashboardCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [value, setValue] = useState(initialValue)
  const [editValue, setEditValue] = useState(initialValue)

  // Load from localStorage on mount
  useEffect(() => {
    if (storageKey) {
      try {
        const saved = localStorage.getItem(storageKey)
        if (saved !== null) {
          setValue(saved)
          setEditValue(saved)
        }
      } catch (e) {
        console.error(`Failed to load data for ${storageKey}`, e)
      }
    }
  }, [storageKey])

  const handleSave = () => {
    setValue(editValue)
    setIsEditing(false)

    // Save to localStorage
    if (storageKey) {
      try {
        localStorage.setItem(storageKey, editValue)
      } catch (e) {
        console.error(`Failed to save data for ${storageKey}`, e)
      }
    }
  }

  const handleCancel = () => {
    setEditValue(value)
    setIsEditing(false)
  }

  const handleEdit = () => {
    setIsEditing(true)
    setEditValue(value)
  }

  return (
    <Card className="bg-gradient-to-br from-white to-blue-50/30 border border-blue-100 shadow-md hover:shadow-lg transition-all duration-300">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1 sm:pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
        <CardTitle className="text-xs font-semibold text-gray-700 leading-tight font-display">{title}</CardTitle>
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
          {icon && <div className="h-3 w-3 text-blue-600">{icon}</div>}
        </div>
      </CardHeader>
      <CardContent className="pt-0 pb-2 sm:pb-3 px-3 sm:px-6">
        {isEditing ? (
          <div className="space-y-2">
            <div className="flex items-center gap-1 sm:gap-2">
              <Input
                type={inputType}
                value={editValue}
                onChange={(e) => setEditValue(e.target.value)}
                className="text-lg sm:text-xl font-bold h-7 sm:h-8 border-blue-200 focus:border-blue-400 text-center font-body"
                autoFocus
              />
              {suffix && <span className="text-lg sm:text-xl font-bold text-blue-900 font-display">{suffix}</span>}
            </div>
          </div>
        ) : (
          <>
            <div className="text-xl sm:text-2xl font-bold text-blue-900 mb-1 text-center sm:text-left font-display">
              {value}
              {suffix}
            </div>
            <p className="text-xs text-gray-600 text-center sm:text-left leading-tight font-body">{subtitle}</p>
          </>
        )}
      </CardContent>
    </Card>
  )
}
