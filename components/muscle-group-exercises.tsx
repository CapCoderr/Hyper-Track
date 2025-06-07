"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Plus, Save, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Exercise {
  name: string
  weight: string
  reps: string
  notes: string
}

interface MuscleGroupExercisesProps {
  muscleGroup: string
  exercises?: Exercise[]
  storageKey: string
}

export default function MuscleGroupExercises({
  muscleGroup,
  exercises: initialExercises = [],
  storageKey,
}: MuscleGroupExercisesProps) {
  const [exercises, setExercises] = useState<Exercise[]>(initialExercises)
  const [editingIndex, setEditingIndex] = useState<number | null>(null)
  const [editedExercise, setEditedExercise] = useState<Exercise | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedExercises = localStorage.getItem(storageKey)
      if (savedExercises) {
        const parsedExercises = JSON.parse(savedExercises)
        if (Array.isArray(parsedExercises)) {
          setExercises(parsedExercises)
        }
      }
    } catch (e) {
      console.error("Failed to parse saved exercises", e)
    }
  }, [storageKey])

  // Save to localStorage whenever exercises change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(exercises))
    } catch (e) {
      console.error("Failed to save exercises to localStorage", e)
    }
  }, [exercises, storageKey])

  const startEditing = (index: number) => {
    setEditingIndex(index)
    setEditedExercise({ ...exercises[index] })
  }

  const cancelEditing = () => {
    setEditingIndex(null)
    setEditedExercise(null)
  }

  const saveEditing = () => {
    if (editingIndex !== null && editedExercise) {
      const newExercises = [...exercises]
      newExercises[editingIndex] = editedExercise
      setExercises(newExercises)
      setEditingIndex(null)
      setEditedExercise(null)
    }
  }

  const handleEditChange = (field: keyof Exercise, value: string) => {
    if (editedExercise) {
      setEditedExercise({
        ...editedExercise,
        [field]: value,
      })
    }
  }

  const addNewExercise = () => {
    const newExercise: Exercise = {
      name: "",
      weight: "",
      reps: "",
      notes: "",
    }
    setExercises([...exercises, newExercise])
    setEditingIndex(exercises.length)
    setEditedExercise(newExercise)
  }

  const deleteExercise = (index: number) => {
    const newExercises = [...exercises]
    newExercises.splice(index, 1)
    setExercises(newExercises)
    if (editingIndex === index) {
      cancelEditing()
    }
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow touch events to propagate in tables for mobile scrolling
    e.stopPropagation()
  }

  return (
    <div className="space-y-3 sm:space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className="text-base sm:text-lg font-medium capitalize font-display">{muscleGroup} Exercises</h3>
        <Button
          size="sm"
          className="h-8 text-xs bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md w-full sm:w-auto font-medium"
          onClick={addNewExercise}
        >
          <Plus className="h-3 w-3 mr-1" />
          Add Exercise
        </Button>
      </div>

      {exercises.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground font-body">
          No exercises added yet. Click "Add Exercise" to begin.
        </div>
      ) : (
        <>
          {/* Mobile Card View */}
          <div className="block sm:hidden space-y-3">
            {exercises.map((exercise, index) => (
              <div key={index} className="bg-white rounded-lg border border-blue-100 p-3 shadow-sm">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    {editingIndex === index ? (
                      <Input
                        value={editedExercise?.name}
                        onChange={(e) => handleEditChange("name", e.target.value)}
                        className="h-8 text-sm font-medium mb-2 font-body"
                        placeholder="Exercise name"
                      />
                    ) : (
                      <h4 className="font-medium text-sm text-gray-900 font-display">{exercise.name}</h4>
                    )}
                  </div>
                  <div className="flex gap-1 ml-2">
                    {editingIndex === index ? (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={saveEditing}>
                          <Save className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={cancelEditing}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEditing(index)}>
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => deleteExercise(index)}>
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs font-body">
                  <div>
                    <span className="text-gray-500 block mb-1">Weight (lbs)</span>
                    {editingIndex === index ? (
                      <Input
                        value={editedExercise?.weight}
                        onChange={(e) => handleEditChange("weight", e.target.value)}
                        className="h-7 text-xs font-body"
                      />
                    ) : (
                      <span className="font-medium">{exercise.weight}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-gray-500 block mb-1">Reps</span>
                    {editingIndex === index ? (
                      <Input
                        value={editedExercise?.reps}
                        onChange={(e) => handleEditChange("reps", e.target.value)}
                        className="h-7 text-xs font-body"
                      />
                    ) : (
                      <span className="font-medium">{exercise.reps}</span>
                    )}
                  </div>
                </div>

                {(exercise.notes || editingIndex === index) && (
                  <div className="mt-2">
                    <span className="text-gray-500 text-xs block mb-1">Notes</span>
                    {editingIndex === index ? (
                      <Input
                        value={editedExercise?.notes}
                        onChange={(e) => handleEditChange("notes", e.target.value)}
                        className="h-7 text-xs font-body"
                        placeholder="Add notes..."
                      />
                    ) : (
                      <span className="text-xs text-gray-600 font-body">{exercise.notes}</span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto" onTouchStart={handleTouchStart}>
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-50">
                  <TableHead className="text-xs sm:text-sm font-display">Exercise</TableHead>
                  <TableHead className="text-xs sm:text-sm font-display">Weight (lbs)</TableHead>
                  <TableHead className="text-xs sm:text-sm font-display">Reps</TableHead>
                  <TableHead className="text-xs sm:text-sm font-display">Notes</TableHead>
                  <TableHead className="w-[100px] text-xs sm:text-sm font-display">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercises.map((exercise, index) => (
                  <TableRow key={index}>
                    <TableCell className="text-xs sm:text-sm font-body">
                      {editingIndex === index ? (
                        <Input
                          value={editedExercise?.name}
                          onChange={(e) => handleEditChange("name", e.target.value)}
                          className="h-8 font-body"
                        />
                      ) : (
                        exercise.name
                      )}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm font-body">
                      {editingIndex === index ? (
                        <Input
                          value={editedExercise?.weight}
                          onChange={(e) => handleEditChange("weight", e.target.value)}
                          className="h-8 font-body"
                        />
                      ) : (
                        exercise.weight
                      )}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm font-body">
                      {editingIndex === index ? (
                        <Input
                          value={editedExercise?.reps}
                          onChange={(e) => handleEditChange("reps", e.target.value)}
                          className="h-8 font-body"
                        />
                      ) : (
                        exercise.reps
                      )}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm font-body">
                      {editingIndex === index ? (
                        <Input
                          value={editedExercise?.notes}
                          onChange={(e) => handleEditChange("notes", e.target.value)}
                          className="h-8 font-body"
                        />
                      ) : (
                        <span className="text-muted-foreground text-xs sm:text-sm">{exercise.notes}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {editingIndex === index ? (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={saveEditing}>
                              <Save className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={cancelEditing}>
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEditing(index)}>
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => deleteExercise(index)}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}
    </div>
  )
}
