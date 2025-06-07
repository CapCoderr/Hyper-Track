"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Calendar, Plus, Save, Trash2, Dumbbell, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface WorkoutExercise {
  id: string
  name: string
  sets: Array<{
    id: string
    weight: string
    reps: string
  }>
}

interface Workout {
  id: string
  type: string
  date: string
  notes: string
  exercises: WorkoutExercise[]
}

interface WorkoutListProps {
  category: string
  storageKey: string
}

export default function WorkoutList({ category, storageKey }: WorkoutListProps) {
  const [workouts, setWorkouts] = useState<Workout[]>([])
  const [isCreating, setIsCreating] = useState(false)
  const [workoutForm, setWorkoutForm] = useState({
    type: category,
    date: new Date().toISOString().split("T")[0],
    notes: "",
  })
  const [exercises, setExercises] = useState<WorkoutExercise[]>([])

  // Load workouts from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(storageKey)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        if (Array.isArray(parsed)) {
          setWorkouts(parsed)
        }
      } catch (e) {
        console.error("Failed to parse workouts:", e)
      }
    }
  }, [storageKey])

  // Save workouts to localStorage
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(workouts))
  }, [workouts, storageKey])

  const workoutTypes = [
    { value: "push", label: "Push" },
    { value: "pull", label: "Pull" },
    { value: "legs", label: "Legs" },
    { value: "chest", label: "Chest" },
    { value: "back", label: "Back" },
    { value: "arms", label: "Arms" },
    { value: "shoulders-traps", label: "Shoulders & Traps" },
  ]

  const handleStartCreating = () => {
    setIsCreating(true)
    setWorkoutForm({
      type: category,
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })
    setExercises([])
  }

  const handleCancelCreating = () => {
    setIsCreating(false)
    setWorkoutForm({
      type: category,
      date: new Date().toISOString().split("T")[0],
      notes: "",
    })
    setExercises([])
  }

  const addExercise = () => {
    const newExercise: WorkoutExercise = {
      id: `ex-${Date.now()}`,
      name: "",
      sets: [{ id: `set-${Date.now()}`, weight: "", reps: "" }],
    }
    setExercises([...exercises, newExercise])
  }

  const removeExercise = (exerciseId: string) => {
    setExercises(exercises.filter((ex) => ex.id !== exerciseId))
  }

  const updateExerciseName = (exerciseId: string, name: string) => {
    setExercises(exercises.map((ex) => (ex.id === exerciseId ? { ...ex, name } : ex)))
  }

  const addSet = (exerciseId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [...ex.sets, { id: `set-${Date.now()}`, weight: "", reps: "" }],
            }
          : ex,
      ),
    )
  }

  const removeSet = (exerciseId: string, setId: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.filter((set) => set.id !== setId),
            }
          : ex,
      ),
    )
  }

  const updateSet = (exerciseId: string, setId: string, field: "weight" | "reps", value: string) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: ex.sets.map((set) => (set.id === setId ? { ...set, [field]: value } : set)),
            }
          : ex,
      ),
    )
  }

  const saveWorkout = () => {
    const validExercises = exercises.filter((ex) => ex.name.trim() && ex.sets.some((set) => set.weight && set.reps))

    if (validExercises.length === 0) {
      alert("Please add at least one exercise with sets")
      return
    }

    const workout: Workout = {
      id: `workout-${Date.now()}`,
      type: workoutForm.type,
      date: workoutForm.date,
      notes: workoutForm.notes,
      exercises: validExercises,
    }

    setWorkouts([...workouts, workout])

    // Update total workouts count
    const totalWorkoutsData = localStorage.getItem("totalWorkouts")
    const currentTotal = totalWorkoutsData ? Number.parseInt(totalWorkoutsData) : 0
    localStorage.setItem("totalWorkouts", (currentTotal + 1).toString())

    handleCancelCreating()
  }

  const deleteWorkout = (workoutId: string) => {
    setWorkouts(workouts.filter((w) => w.id !== workoutId))

    // Update total workouts count
    const totalWorkoutsData = localStorage.getItem("totalWorkouts")
    const currentTotal = totalWorkoutsData ? Number.parseInt(totalWorkoutsData) : 0
    if (currentTotal > 0) {
      localStorage.setItem("totalWorkouts", (currentTotal - 1).toString())
    }
  }

  const formatWorkoutType = (type: string) => {
    return type
      .replace("-", " & ")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ")
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-medium capitalize">{category.replace("-", " & ")} Workouts</h3>
        <Button
          onClick={handleStartCreating}
          size="sm"
          className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Workout
        </Button>
      </div>

      {/* Create Workout Form */}
      {isCreating && (
        <Card className="border-2 border-blue-200">
          <CardContent className="p-4">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Create New Workout</h4>
                <Button onClick={handleCancelCreating} variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="workout-type">Workout Type</Label>
                  <Select
                    value={workoutForm.type}
                    onValueChange={(value) => setWorkoutForm({ ...workoutForm, type: value })}
                  >
                    <SelectTrigger id="workout-type">
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      {workoutTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="workout-date">Date</Label>
                  <Input
                    id="workout-date"
                    type="date"
                    value={workoutForm.date}
                    onChange={(e) => setWorkoutForm({ ...workoutForm, date: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="workout-notes">Notes (optional)</Label>
                <Input
                  id="workout-notes"
                  value={workoutForm.notes}
                  onChange={(e) => setWorkoutForm({ ...workoutForm, notes: e.target.value })}
                  placeholder="Workout notes"
                />
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <Label>Exercises</Label>
                  <Button onClick={addExercise} variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Exercise
                  </Button>
                </div>

                {exercises.map((exercise) => (
                  <div key={exercise.id} className="border rounded-lg p-3 bg-gray-50">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <Input
                          value={exercise.name}
                          onChange={(e) => updateExerciseName(exercise.id, e.target.value)}
                          placeholder="Exercise name (e.g., Bench Press)"
                          className="max-w-xs"
                        />
                        <Button onClick={() => removeExercise(exercise.id)} variant="ghost" size="icon">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium">Sets</span>
                          <Button onClick={() => addSet(exercise.id)} variant="outline" size="sm">
                            <Plus className="h-3 w-3 mr-1" />
                            Add Set
                          </Button>
                        </div>

                        {exercise.sets.map((set, index) => (
                          <div key={set.id} className="flex items-center gap-2">
                            <span className="text-sm w-8">{index + 1}.</span>
                            <Input
                              type="number"
                              placeholder="Weight"
                              value={set.weight}
                              onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                              className="w-20"
                            />
                            <span className="text-sm">lbs ×</span>
                            <Input
                              type="number"
                              placeholder="Reps"
                              value={set.reps}
                              onChange={(e) => updateSet(exercise.id, set.id, "reps", e.target.value)}
                              className="w-20"
                            />
                            <span className="text-sm">reps</span>
                            {exercise.sets.length > 1 && (
                              <Button onClick={() => removeSet(exercise.id, set.id)} variant="ghost" size="icon">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <Button onClick={saveWorkout} className="bg-gradient-to-r from-blue-600 to-indigo-700">
                  <Save className="h-4 w-4 mr-2" />
                  Save Workout
                </Button>
                <Button onClick={handleCancelCreating} variant="outline">
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Workouts List */}
      {workouts.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          No workouts added yet. Click "Add Workout" to begin.
        </div>
      ) : (
        <div className="space-y-3">
          {workouts.map((workout) => (
            <Card key={workout.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{formatWorkoutType(workout.type)}</h4>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {new Date(workout.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Dumbbell className="h-3 w-3" />
                          {workout.exercises.length} exercises
                        </div>
                      </div>
                    </div>
                    <Button onClick={() => deleteWorkout(workout.id)} variant="ghost" size="icon">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    {workout.exercises.map((exercise, index) => (
                      <div key={index} className="text-sm">
                        <div className="font-medium">{exercise.name}</div>
                        <div className="text-muted-foreground ml-2">
                          {exercise.sets.map((set, setIndex) => (
                            <div key={setIndex}>
                              Set {setIndex + 1}: {set.weight} lbs × {set.reps} reps
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {workout.notes && (
                    <div className="pt-2 border-t border-gray-100">
                      <p className="text-sm text-muted-foreground">{workout.notes}</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
