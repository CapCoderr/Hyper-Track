"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Calendar, Edit2, Plus, Save, Trash2 } from "lucide-react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"

interface Exercise {
  name: string
  weight: string
  reps: string
  sets: string
  notes: string
}

interface Workout {
  id: string
  name: string
  date: string
  exercises: Exercise[]
}

interface WorkoutListProps {
  category: string
  storageKey: string
}

export default function WorkoutList({ category, storageKey }: WorkoutListProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [isAddingWorkout, setIsAddingWorkout] = useState(false)
  const [newWorkout, setNewWorkout] = useState<Workout>({
    id: "",
    name: "",
    date: new Date().toISOString().split("T")[0],
    exercises: [],
  })
  const [editingWorkoutId, setEditingWorkoutId] = useState<string | null>(null)
  const [editingExerciseIndex, setEditingExerciseIndex] = useState<number | null>(null)
  const [editedExercise, setEditedExercise] = useState<Exercise | null>(null)

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedWorkouts = localStorage.getItem(storageKey)
      if (savedWorkouts) {
        const parsedWorkouts = JSON.parse(savedWorkouts)
        if (Array.isArray(parsedWorkouts)) {
          setWorkouts(parsedWorkouts)
        }
      }
    } catch (e) {
      console.error("Failed to parse saved workouts", e)
    }
  }, [storageKey])

  // Save to localStorage whenever workouts change
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(workouts))
    } catch (e) {
      console.error("Failed to save workouts to localStorage", e)
    }
  }, [workouts, storageKey])

  const addWorkout = () => {
    if (newWorkout.name.trim() === "") {
      return
    }

    const workoutToAdd = {
      ...newWorkout,
      id: `${category}-${Date.now()}`,
      exercises: newWorkout.exercises.length > 0 ? newWorkout.exercises : [],
    }

    setWorkouts([...workouts, workoutToAdd])
    setIsAddingWorkout(false)
    setNewWorkout({
      id: "",
      name: "",
      date: new Date().toISOString().split("T")[0],
      exercises: [],
    })
  }

  const deleteWorkout = (id: string) => {
    setWorkouts(workouts.filter((workout) => workout.id !== id))
  }

  const addExerciseToWorkout = (workoutId: string) => {
    const newExercise: Exercise = {
      name: "",
      weight: "",
      reps: "",
      sets: "",
      notes: "",
    }

    setWorkouts(
      workouts.map((workout) => {
        if (workout.id === workoutId) {
          return {
            ...workout,
            exercises: [...workout.exercises, newExercise],
          }
        }
        return workout
      }),
    )

    // Find the index of the workout and set editing to the new exercise
    const workoutIndex = workouts.findIndex((w) => w.id === workoutId)
    if (workoutIndex !== -1) {
      setEditingWorkoutId(workoutId)
      setEditingExerciseIndex(workouts[workoutIndex].exercises.length)
      setEditedExercise(newExercise)
    }
  }

  const startEditingExercise = (workoutId: string, exerciseIndex: number) => {
    const workout = workouts.find((w) => w.id === workoutId)
    if (workout) {
      setEditingWorkoutId(workoutId)
      setEditingExerciseIndex(exerciseIndex)
      setEditedExercise({ ...workout.exercises[exerciseIndex] })
    }
  }

  const cancelEditingExercise = () => {
    setEditingWorkoutId(null)
    setEditingExerciseIndex(null)
    setEditedExercise(null)
  }

  const saveEditedExercise = () => {
    if (editingWorkoutId && editingExerciseIndex !== null && editedExercise) {
      setWorkouts(
        workouts.map((workout) => {
          if (workout.id === editingWorkoutId) {
            const updatedExercises = [...workout.exercises]
            updatedExercises[editingExerciseIndex] = editedExercise
            return {
              ...workout,
              exercises: updatedExercises,
            }
          }
          return workout
        }),
      )
      cancelEditingExercise()
    }
  }

  const handleExerciseChange = (field: keyof Exercise, value: string) => {
    if (editedExercise) {
      setEditedExercise({
        ...editedExercise,
        [field]: value,
      })
    }
  }

  const deleteExercise = (workoutId: string, exerciseIndex: number) => {
    setWorkouts(
      workouts.map((workout) => {
        if (workout.id === workoutId) {
          const updatedExercises = [...workout.exercises]
          updatedExercises.splice(exerciseIndex, 1)
          return {
            ...workout,
            exercises: updatedExercises,
          }
        }
        return workout
      }),
    )

    if (editingWorkoutId === workoutId && editingExerciseIndex === exerciseIndex) {
      cancelEditingExercise()
    }
  }

  const addExerciseToNewWorkout = () => {
    setNewWorkout({
      ...newWorkout,
      exercises: [...newWorkout.exercises, { name: "", weight: "", reps: "", sets: "", notes: "" }],
    })
  }

  const updateNewWorkoutExercise = (index: number, field: keyof Exercise, value: string) => {
    const updatedExercises = [...newWorkout.exercises]
    updatedExercises[index] = {
      ...updatedExercises[index],
      [field]: value,
    }

    setNewWorkout({
      ...newWorkout,
      exercises: updatedExercises,
    })
  }

  const removeExerciseFromNewWorkout = (index: number) => {
    const updatedExercises = [...newWorkout.exercises]
    updatedExercises.splice(index, 1)

    setNewWorkout({
      ...newWorkout,
      exercises: updatedExercises,
    })
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    // Allow touch events to propagate in tables for mobile scrolling
    e.stopPropagation()
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h3 className="text-base sm:text-lg font-medium capitalize font-display">
          {category.replace("-", " & ")} Workouts
        </h3>
        <Dialog open={isAddingWorkout} onOpenChange={setIsAddingWorkout}>
          <DialogTrigger asChild>
            <Button
              size="sm"
              className="h-8 text-xs bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-md w-full sm:w-auto font-medium"
            >
              <Plus className="h-3 w-3 mr-1" />
              Add Workout
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col">
            <DialogHeader>
              <DialogTitle className="font-display">Add New Workout</DialogTitle>
              <DialogDescription className="font-body">
                Create a new workout for your {category.replace("-", " & ")} training.
              </DialogDescription>
            </DialogHeader>

            <div className="overflow-y-auto flex-1 pr-1 -mr-1">
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="workout-name" className="font-medium">
                      Workout Name
                    </Label>
                    <Input
                      id="workout-name"
                      value={newWorkout.name}
                      onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
                      placeholder="e.g., Heavy Push Day"
                      className="font-body"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="workout-date" className="font-medium">
                      Date
                    </Label>
                    <div className="flex">
                      <Input
                        id="workout-date"
                        type="date"
                        value={newWorkout.date}
                        onChange={(e) => setNewWorkout({ ...newWorkout, date: e.target.value })}
                        className="font-body"
                      />
                      <Button variant="outline" size="icon" className="ml-2">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <Label className="font-medium">Exercises</Label>
                    <Button variant="outline" size="sm" onClick={addExerciseToNewWorkout} className="font-medium">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Exercise
                    </Button>
                  </div>

                  {newWorkout.exercises.length > 0 ? (
                    <div className="overflow-x-auto" onTouchStart={handleTouchStart}>
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-blue-50">
                            <TableHead className="font-display">Exercise</TableHead>
                            <TableHead className="font-display">Sets</TableHead>
                            <TableHead className="font-display">Reps</TableHead>
                            <TableHead className="font-display">Weight</TableHead>
                            <TableHead className="font-display">Notes</TableHead>
                            <TableHead className="w-[80px]"></TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {newWorkout.exercises.map((exercise, index) => (
                            <TableRow key={index}>
                              <TableCell>
                                <Input
                                  value={exercise.name}
                                  onChange={(e) => updateNewWorkoutExercise(index, "name", e.target.value)}
                                  placeholder="Exercise name"
                                  className="h-8 font-body"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={exercise.sets}
                                  onChange={(e) => updateNewWorkoutExercise(index, "sets", e.target.value)}
                                  placeholder="Sets"
                                  className="h-8 w-16 font-body"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={exercise.reps}
                                  onChange={(e) => updateNewWorkoutExercise(index, "reps", e.target.value)}
                                  placeholder="Reps"
                                  className="h-8 w-16 font-body"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={exercise.weight}
                                  onChange={(e) => updateNewWorkoutExercise(index, "weight", e.target.value)}
                                  placeholder="Weight"
                                  className="h-8 w-20 font-body"
                                />
                              </TableCell>
                              <TableCell>
                                <Input
                                  value={exercise.notes}
                                  onChange={(e) => updateNewWorkoutExercise(index, "notes", e.target.value)}
                                  placeholder="Notes"
                                  className="h-8 font-body"
                                />
                              </TableCell>
                              <TableCell>
                                <Button variant="ghost" size="icon" onClick={() => removeExerciseFromNewWorkout(index)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-4 text-muted-foreground font-body">
                      No exercises added yet. Click "Add Exercise" to begin.
                    </div>
                  )}
                </div>
              </div>
            </div>

            <DialogFooter className="pt-4 border-t mt-4">
              <Button variant="outline" onClick={() => setIsAddingWorkout(false)} className="font-medium">
                Cancel
              </Button>
              <Button
                onClick={addWorkout}
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 font-medium"
              >
                Save Workout
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {workouts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground font-body">
          No workouts added yet. Click "Add Workout" to begin.
        </div>
      ) : (
        <Accordion type="single" collapsible className="space-y-4">
          {workouts.map((workout) => (
            <AccordionItem key={workout.id} value={workout.id} className="border rounded-lg px-4 bg-white">
              <div className="flex items-center justify-between">
                <AccordionTrigger className="py-4">
                  <div className="flex flex-col items-start">
                    <span className="font-medium font-display">{workout.name}</span>
                    <span className="text-sm text-muted-foreground flex items-center font-body">
                      <Calendar className="h-3 w-3 mr-1" />
                      {workout.date}
                    </span>
                  </div>
                </AccordionTrigger>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteWorkout(workout.id)
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <AccordionContent className="pb-4">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium font-display">Exercises</h4>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => addExerciseToWorkout(workout.id)}
                      className="font-medium"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Exercise
                    </Button>
                  </div>

                  {workout.exercises.length > 0 ? (
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow className="bg-blue-50">
                            <TableHead className="font-display">Exercise</TableHead>
                            <TableHead className="font-display">Sets</TableHead>
                            <TableHead className="font-display">Reps</TableHead>
                            <TableHead className="font-display">Weight (lbs)</TableHead>
                            <TableHead className="font-display">Notes</TableHead>
                            <TableHead className="w-[100px] font-display">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {workout.exercises.map((exercise, index) => (
                            <TableRow key={index}>
                              <TableCell className="font-body">
                                {editingWorkoutId === workout.id && editingExerciseIndex === index ? (
                                  <Input
                                    value={editedExercise?.name}
                                    onChange={(e) => handleExerciseChange("name", e.target.value)}
                                    className="h-8 font-body"
                                  />
                                ) : (
                                  exercise.name
                                )}
                              </TableCell>
                              <TableCell className="font-body">
                                {editingWorkoutId === workout.id && editingExerciseIndex === index ? (
                                  <Input
                                    value={editedExercise?.sets}
                                    onChange={(e) => handleExerciseChange("sets", e.target.value)}
                                    className="h-8 w-16 font-body"
                                  />
                                ) : (
                                  exercise.sets
                                )}
                              </TableCell>
                              <TableCell className="font-body">
                                {editingWorkoutId === workout.id && editingExerciseIndex === index ? (
                                  <Input
                                    value={editedExercise?.reps}
                                    onChange={(e) => handleExerciseChange("reps", e.target.value)}
                                    className="h-8 w-16 font-body"
                                  />
                                ) : (
                                  exercise.reps
                                )}
                              </TableCell>
                              <TableCell className="font-body">
                                {editingWorkoutId === workout.id && editingExerciseIndex === index ? (
                                  <Input
                                    value={editedExercise?.weight}
                                    onChange={(e) => handleExerciseChange("weight", e.target.value)}
                                    className="h-8 w-20 font-body"
                                  />
                                ) : (
                                  exercise.weight
                                )}
                              </TableCell>
                              <TableCell className="font-body">
                                {editingWorkoutId === workout.id && editingExerciseIndex === index ? (
                                  <Input
                                    value={editedExercise?.notes}
                                    onChange={(e) => handleExerciseChange("notes", e.target.value)}
                                    className="h-8 font-body"
                                  />
                                ) : (
                                  <span className="text-muted-foreground text-sm">{exercise.notes}</span>
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex space-x-1">
                                  {editingWorkoutId === workout.id && editingExerciseIndex === index ? (
                                    <>
                                      <Button variant="ghost" size="icon" onClick={saveEditedExercise}>
                                        <Save className="h-4 w-4" />
                                      </Button>
                                      <Button variant="ghost" size="icon" onClick={cancelEditingExercise}>
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </>
                                  ) : (
                                    <>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => startEditingExercise(workout.id, index)}
                                      >
                                        <Edit2 className="h-4 w-4" />
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => deleteExercise(workout.id, index)}
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
                  ) : (
                    <div className="text-center py-4 text-muted-foreground font-body">
                      No exercises added yet. Click "Add Exercise" to begin.
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
    </div>
  )
}
