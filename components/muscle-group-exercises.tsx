"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Edit2, Plus, Save, Trash2, X } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent } from "@/components/ui/card"
import { Label } from "@/components/ui/label"

interface Exercise {
  id: string
  name: string
  weight: string
  reps: string
  notes: string
}

interface MuscleGroupExercisesProps {
  muscleGroup: string
  storageKey: string
}

export default function MuscleGroupExercises({ muscleGroup, storageKey }: MuscleGroupExercisesProps) {
  const [exercises, setExercises] = useState<Exercise[]>([])
  const [editingId, setEditingId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<Exercise>({
    id: "",
    name: "",
    weight: "",
    reps: "",
    notes: "",
  })
  const [isCreating, setIsCreating] = useState(false)
  const [newExercises, setNewExercises] = useState<Exercise[]>([])

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setExercises(parsed)
        }
      } catch (e) {
        console.error("Failed to parse exercises:", e)
      }
    }
  }, [storageKey])

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(exercises))
  }, [exercises, storageKey])

  const handleStartCreating = () => {
    setIsCreating(true)
    setNewExercises([
      {
        id: `temp-${Date.now()}`,
        name: "",
        weight: "",
        reps: "",
        notes: "",
      },
    ])
  }

  const handleCancelCreating = () => {
    setIsCreating(false)
    setNewExercises([])
  }

  const addNewExercise = () => {
    const newExercise: Exercise = {
      id: `temp-${Date.now()}-${Math.random()}`,
      name: "",
      weight: "",
      reps: "",
      notes: "",
    }
    setNewExercises([...newExercises, newExercise])
  }

  const removeNewExercise = (exerciseId: string) => {
    if (newExercises.length > 1) {
      setNewExercises(newExercises.filter((ex) => ex.id !== exerciseId))
    }
  }

  const updateNewExercise = (exerciseId: string, field: keyof Exercise, value: string) => {
    setNewExercises(newExercises.map((ex) => (ex.id === exerciseId ? { ...ex, [field]: value } : ex)))
  }

  const saveNewExercises = () => {
    const validExercises = newExercises.filter((ex) => ex.name.trim())

    if (validExercises.length === 0) {
      alert("Please add at least one exercise with a name")
      return
    }

    const exercisesToAdd = validExercises.map((ex) => ({
      ...ex,
      id: `${muscleGroup}-${Date.now()}-${Math.random()}`,
    }))

    setExercises([...exercises, ...exercisesToAdd])
    handleCancelCreating()
  }

  const handleEdit = (exercise: Exercise) => {
    setEditingId(exercise.id)
    setEditForm({ ...exercise })
  }

  const handleSaveEdit = () => {
    setExercises(exercises.map((ex) => (ex.id === editingId ? editForm : ex)))
    setEditingId(null)
    setEditForm({
      id: "",
      name: "",
      weight: "",
      reps: "",
      notes: "",
    })
  }

  const handleCancelEdit = () => {
    setEditingId(null)
    setEditForm({
      id: "",
      name: "",
      weight: "",
      reps: "",
      notes: "",
    })
  }

  const handleDelete = (id: string) => {
    setExercises(exercises.filter((ex) => ex.id !== id))
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium capitalize">{muscleGroup.replace("-", " ")} Exercises</h3>
        <Button
          onClick={handleStartCreating}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Exercise
        </Button>
      </div>

      {/* Create New Exercises Form */}
      {isCreating && (
        <Card className="border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Add New Exercises</h4>
                <Button onClick={handleCancelCreating} variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Exercises</Label>
                  <Button onClick={addNewExercise} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>

                {newExercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div className="flex-1 max-w-xs">
                          <Label htmlFor={`exercise-name-${exercise.id}`}>Exercise Name</Label>
                          <Input
                            id={`exercise-name-${exercise.id}`}
                            value={exercise.name}
                            onChange={(e) => updateNewExercise(exercise.id, "name", e.target.value)}
                            placeholder="Enter exercise name"
                          />
                        </div>
                        {newExercises.length > 1 && (
                          <Button onClick={() => removeNewExercise(exercise.id)} variant="ghost" size="icon">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <Label htmlFor={`exercise-weight-${exercise.id}`}>Weight (lbs)</Label>
                          <Input
                            id={`exercise-weight-${exercise.id}`}
                            value={exercise.weight}
                            onChange={(e) => updateNewExercise(exercise.id, "weight", e.target.value)}
                            placeholder="Weight"
                          />
                        </div>
                        <div>
                          <Label htmlFor={`exercise-reps-${exercise.id}`}>Reps</Label>
                          <Input
                            id={`exercise-reps-${exercise.id}`}
                            value={exercise.reps}
                            onChange={(e) => updateNewExercise(exercise.id, "reps", e.target.value)}
                            placeholder="Reps"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor={`exercise-notes-${exercise.id}`}>Notes (optional)</Label>
                        <Input
                          id={`exercise-notes-${exercise.id}`}
                          value={exercise.notes}
                          onChange={(e) => updateNewExercise(exercise.id, "notes", e.target.value)}
                          placeholder="Exercise notes"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={saveNewExercises} className="bg-gradient-to-r from-blue-600 to-indigo-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Exercises
                </Button>
                <Button onClick={handleCancelCreating} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Exercises List */}
      {exercises.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No exercises added yet. Click "Add Exercise" to begin.
        </div>
      ) : (
        <div className="space-y-3">
          {/* Mobile View */}
          <div className="block sm:hidden space-y-3">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="border rounded-lg p-3 bg-white">
                {editingId === exercise.id ? (
                  <div className="space-y-3">
                    <Input
                      value={editForm.name}
                      onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                      placeholder="Exercise name"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <Input
                        value={editForm.weight}
                        onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                        placeholder="Weight"
                      />
                      <Input
                        value={editForm.reps}
                        onChange={(e) => setEditForm({ ...editForm, reps: e.target.value })}
                        placeholder="Reps"
                      />
                    </div>
                    <Input
                      value={editForm.notes}
                      onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                      placeholder="Notes"
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSaveEdit} size="sm">
                        <Save className="h-3 w-3 mr-1" />
                        Save
                      </Button>
                      <Button onClick={handleCancelEdit} variant="outline" size="sm">
                        <X className="h-3 w-3 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium">{exercise.name}</h4>
                      <div className="flex gap-1">
                        <Button onClick={() => handleEdit(exercise)} variant="ghost" size="icon" className="h-8 w-8">
                          <Edit2 className="h-3 w-3" />
                        </Button>
                        <Button
                          onClick={() => handleDelete(exercise.id)}
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <div>Weight: {exercise.weight} lbs</div>
                      <div>Reps: {exercise.reps}</div>
                      {exercise.notes && <div>Notes: {exercise.notes}</div>}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Exercise</TableHead>
                  <TableHead>Weight (lbs)</TableHead>
                  <TableHead>Reps</TableHead>
                  <TableHead>Notes</TableHead>
                  <TableHead className="w-[100px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {exercises.map((exercise) => (
                  <TableRow key={exercise.id}>
                    <TableCell>
                      {editingId === exercise.id ? (
                        <Input
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        exercise.name
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === exercise.id ? (
                        <Input
                          value={editForm.weight}
                          onChange={(e) => setEditForm({ ...editForm, weight: e.target.value })}
                          className="h-8 w-20"
                        />
                      ) : (
                        exercise.weight
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === exercise.id ? (
                        <Input
                          value={editForm.reps}
                          onChange={(e) => setEditForm({ ...editForm, reps: e.target.value })}
                          className="h-8 w-20"
                        />
                      ) : (
                        exercise.reps
                      )}
                    </TableCell>
                    <TableCell>
                      {editingId === exercise.id ? (
                        <Input
                          value={editForm.notes}
                          onChange={(e) => setEditForm({ ...editForm, notes: e.target.value })}
                          className="h-8"
                        />
                      ) : (
                        <span className="text-muted-foreground text-sm">{exercise.notes}</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-1">
                        {editingId === exercise.id ? (
                          <>
                            <Button onClick={handleSaveEdit} variant="ghost" size="icon" className="h-8 w-8">
                              <Save className="h-4 w-4" />
                            </Button>
                            <Button onClick={handleCancelEdit} variant="ghost" size="icon" className="h-8 w-8">
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button
                              onClick={() => handleEdit(exercise)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Edit2 className="h-4 w-4" />
                            </Button>
                            <Button
                              onClick={() => handleDelete(exercise.id)}
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                            >
                              <Trash2 className="h-4 w-4" />
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
        </div>
      )}
    </div>
  )
}
