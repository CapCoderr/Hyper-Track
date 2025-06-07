"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Plus, Trash2 } from "lucide-react"

export default function AddWorkoutPage() {
  const [exercises, setExercises] = useState([{ id: 1, name: "", sets: [] }])
  const [activeExercise, setActiveExercise] = useState(1)

  const addExercise = () => {
    const newId = exercises.length > 0 ? Math.max(...exercises.map((ex) => ex.id)) + 1 : 1
    setExercises([...exercises, { id: newId, name: "", sets: [] }])
    setActiveExercise(newId)
  }

  const removeExercise = (id) => {
    if (exercises.length > 1) {
      const newExercises = exercises.filter((ex) => ex.id !== id)
      setExercises(newExercises)
      setActiveExercise(newExercises[0].id)
    }
  }

  const updateExerciseName = (id, name) => {
    setExercises(exercises.map((ex) => (ex.id === id ? { ...ex, name } : ex)))
  }

  const addSet = (exerciseId) => {
    setExercises(
      exercises.map((ex) =>
        ex.id === exerciseId
          ? {
              ...ex,
              sets: [
                ...ex.sets,
                {
                  id: ex.sets.length > 0 ? Math.max(...ex.sets.map((s) => s.id)) + 1 : 1,
                  weight: "",
                  reps: "",
                },
              ],
            }
          : ex,
      ),
    )
  }

  const updateSet = (exerciseId, setId, field, value) => {
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

  const removeSet = (exerciseId, setId) => {
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

  const currentExercise = exercises.find((ex) => ex.id === activeExercise) || exercises[0]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-semibold">Log Workout</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <div className="grid gap-4 md:grid-cols-[1fr_3fr]">
          <Card>
            <CardHeader>
              <CardTitle>Workout Details</CardTitle>
              <CardDescription>Configure your workout session</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="date">Date</Label>
                  <Input id="date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="type">Workout Type</Label>
                  <Select defaultValue="push">
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select workout type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="push">Push</SelectItem>
                      <SelectItem value="pull">Pull</SelectItem>
                      <SelectItem value="legs">Legs</SelectItem>
                      <SelectItem value="upper">Upper Body</SelectItem>
                      <SelectItem value="lower">Lower Body</SelectItem>
                      <SelectItem value="full">Full Body</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="notes">Notes</Label>
                  <Input id="notes" placeholder="Optional notes about this workout" />
                </div>
              </form>
            </CardContent>
          </Card>
          <div className="grid gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center">
                <div>
                  <CardTitle>Exercises</CardTitle>
                  <CardDescription>Add exercises to your workout</CardDescription>
                </div>
                <Button className="ml-auto" size="sm" onClick={addExercise}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Exercise
                </Button>
              </CardHeader>
              <CardContent>
                <Tabs value={activeExercise.toString()} onValueChange={(v) => setActiveExercise(Number.parseInt(v))}>
                  <TabsList className="mb-4 flex flex-wrap h-auto">
                    {exercises.map((exercise) => (
                      <TabsTrigger
                        key={exercise.id}
                        value={exercise.id.toString()}
                        className="flex items-center gap-2 mb-1"
                      >
                        {exercise.name || `Exercise ${exercise.id}`}
                        {exercises.length > 1 && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-5 w-5 rounded-full p-0 text-muted-foreground"
                            onClick={(e) => {
                              e.stopPropagation()
                              removeExercise(exercise.id)
                            }}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        )}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {exercises.map((exercise) => (
                    <TabsContent key={exercise.id} value={exercise.id.toString()} className="space-y-4">
                      <div className="grid gap-2">
                        <Label htmlFor={`exercise-name-${exercise.id}`}>Exercise Name</Label>
                        <Select
                          value={exercise.name || ""}
                          onValueChange={(value) => updateExerciseName(exercise.id, value)}
                        >
                          <SelectTrigger id={`exercise-name-${exercise.id}`}>
                            <SelectValue placeholder="Select or type an exercise" />
                          </SelectTrigger>
                          <SelectContent>
                            {/* Push exercises */}
                            <SelectItem value="Bench Press">Bench Press</SelectItem>
                            <SelectItem value="Incline Bench Press">Incline Bench Press</SelectItem>
                            <SelectItem value="Shoulder Press">Shoulder Press</SelectItem>
                            <SelectItem value="Tricep Pushdown">Tricep Pushdown</SelectItem>
                            <SelectItem value="Chest Fly">Chest Fly</SelectItem>
                            <SelectItem value="Lateral Raise">Lateral Raise</SelectItem>

                            {/* Pull exercises */}
                            <SelectItem value="Deadlift">Deadlift</SelectItem>
                            <SelectItem value="Pull-up">Pull-up</SelectItem>
                            <SelectItem value="Barbell Row">Barbell Row</SelectItem>
                            <SelectItem value="Lat Pulldown">Lat Pulldown</SelectItem>
                            <SelectItem value="Bicep Curl">Bicep Curl</SelectItem>
                            <SelectItem value="Face Pull">Face Pull</SelectItem>

                            {/* Leg exercises */}
                            <SelectItem value="Squat">Squat</SelectItem>
                            <SelectItem value="Leg Press">Leg Press</SelectItem>
                            <SelectItem value="Romanian Deadlift">Romanian Deadlift</SelectItem>
                            <SelectItem value="Leg Extension">Leg Extension</SelectItem>
                            <SelectItem value="Leg Curl">Leg Curl</SelectItem>
                            <SelectItem value="Calf Raise">Calf Raise</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Sets</Label>
                          <Button variant="outline" size="sm" onClick={() => addSet(exercise.id)}>
                            <Plus className="mr-2 h-3 w-3" />
                            Add Set
                          </Button>
                        </div>

                        {exercise.sets.length === 0 ? (
                          <div className="flex justify-center py-8 text-muted-foreground">
                            No sets added yet. Click "Add Set" to begin.
                          </div>
                        ) : (
                          <div className="space-y-2">
                            <div className="grid grid-cols-12 gap-2 text-xs font-medium text-muted-foreground">
                              <div className="col-span-1">#</div>
                              <div className="col-span-4">Weight (kg)</div>
                              <div className="col-span-4">Reps</div>
                              <div className="col-span-3"></div>
                            </div>

                            {exercise.sets.map((set, index) => (
                              <div key={set.id} className="grid grid-cols-12 items-center gap-2">
                                <div className="col-span-1 text-sm font-medium">{index + 1}</div>
                                <div className="col-span-4">
                                  <Input
                                    type="number"
                                    placeholder="kg"
                                    value={set.weight}
                                    onChange={(e) => updateSet(exercise.id, set.id, "weight", e.target.value)}
                                  />
                                </div>
                                <div className="col-span-4">
                                  <Input
                                    type="number"
                                    placeholder="reps"
                                    value={set.reps}
                                    onChange={(e) => updateSet(exercise.id, set.id, "reps", e.target.value)}
                                  />
                                </div>
                                <div className="col-span-3 flex justify-end">
                                  <Button variant="ghost" size="icon" onClick={() => removeSet(exercise.id, set.id)}>
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="flex justify-end">
          <Button size="lg" className="w-full md:w-auto">
            Save Workout
          </Button>
        </div>
      </main>
    </div>
  )
}
