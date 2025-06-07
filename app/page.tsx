import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dumbbell, Plus, TrendingUp } from "lucide-react"
import MuscleGroupExercises from "@/components/muscle-group-exercises"
import WorkoutList from "@/components/workout-list"
import EditableDashboardCard from "@/components/editable-dashboard-card"
import EditablePersonalRecords from "@/components/editable-personal-records"

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-gradient-to-br from-slate-50 to-blue-50">
      <header className="sticky top-0 z-10 flex h-14 sm:h-16 items-center gap-2 sm:gap-4 border-b border-blue-200 bg-white/80 backdrop-blur-md px-3 sm:px-4 md:px-6 shadow-sm">
        <Link href="/" className="flex items-center gap-2 sm:gap-3 font-bold">
          <div className="p-1.5 sm:p-2 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg sm:rounded-xl">
            <Dumbbell className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
          </div>
          <span className="text-lg sm:text-xl tracking-tight bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent font-display">
            HyperTrack
          </span>
        </Link>
        <nav className="ml-auto flex gap-2 sm:gap-3">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="h-8 sm:h-9 text-xs sm:text-sm font-medium hover:bg-blue-100 px-2 sm:px-3"
          >
            <Link href="/history">
              <TrendingUp className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline font-medium">History</span>
              <span className="xs:hidden font-medium">Hist</span>
            </Link>
          </Button>
          <Button
            asChild
            size="sm"
            className="h-8 sm:h-9 text-xs sm:text-sm bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 shadow-lg px-2 sm:px-3 font-medium"
          >
            <Link href="/add-workout">
              <Plus className="mr-1 sm:mr-2 h-3 w-3 sm:h-4 sm:w-4" />
              <span className="hidden xs:inline">Log Workout</span>
              <span className="xs:hidden">Log</span>
            </Link>
          </Button>
        </nav>
      </header>

      <main className="flex flex-1 flex-col gap-3 sm:gap-4 p-3 sm:p-4 md:gap-6 md:p-6">
        <div className="grid gap-3 sm:gap-4 grid-cols-2 md:grid-cols-4">
          <EditableDashboardCard
            title="Total Workouts (2025)"
            value="0"
            subtitle="Start tracking today!"
            inputType="number"
            storageKey="totalWorkouts"
          />
          <EditableDashboardCard
            title="Current Weight"
            value="0"
            subtitle="Tap to update"
            inputType="number"
            suffix=" lbs"
            storageKey="currentWeight"
          />
          <EditableDashboardCard
            title="Body Fat %"
            value="0"
            subtitle="Tap to update"
            inputType="number"
            suffix="%"
            storageKey="bodyFat"
          />
          <EditablePersonalRecords />
        </div>

        <Card className="bg-white/70 backdrop-blur-sm border border-blue-200 shadow-xl">
          <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
            <CardTitle className="text-lg sm:text-xl tracking-tight text-gray-800 font-display">My Exercises</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 font-body">
              Track your exercises by muscle group
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <Tabs defaultValue="chest" className="space-y-4 sm:space-y-6">
              <TabsList className="grid grid-cols-3 sm:flex sm:flex-wrap h-auto bg-gradient-to-r from-blue-100 to-indigo-100 p-1 rounded-xl gap-1 sm:gap-0">
                <TabsTrigger
                  value="chest"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Chest
                </TabsTrigger>
                <TabsTrigger
                  value="back"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Back
                </TabsTrigger>
                <TabsTrigger
                  value="shoulders"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Shoulders
                </TabsTrigger>
                <TabsTrigger
                  value="triceps"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Triceps
                </TabsTrigger>
                <TabsTrigger
                  value="biceps"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Biceps
                </TabsTrigger>
                <TabsTrigger
                  value="abs"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Abs
                </TabsTrigger>
                <TabsTrigger
                  value="traps"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Traps
                </TabsTrigger>
                <TabsTrigger
                  value="quads"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Quads
                </TabsTrigger>
                <TabsTrigger
                  value="hamstrings"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Hamstrings
                </TabsTrigger>
                <TabsTrigger
                  value="calves"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Calves
                </TabsTrigger>
                <TabsTrigger
                  value="other-legs"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Other Legs
                </TabsTrigger>
              </TabsList>

              <TabsContent value="chest">
                <MuscleGroupExercises muscleGroup="chest" storageKey="exercises-chest" />
              </TabsContent>

              <TabsContent value="back">
                <MuscleGroupExercises muscleGroup="back" storageKey="exercises-back" />
              </TabsContent>

              <TabsContent value="shoulders">
                <MuscleGroupExercises muscleGroup="shoulders" storageKey="exercises-shoulders" />
              </TabsContent>

              <TabsContent value="triceps">
                <MuscleGroupExercises muscleGroup="triceps" storageKey="exercises-triceps" />
              </TabsContent>

              <TabsContent value="biceps">
                <MuscleGroupExercises muscleGroup="biceps" storageKey="exercises-biceps" />
              </TabsContent>

              <TabsContent value="abs">
                <MuscleGroupExercises muscleGroup="abs" storageKey="exercises-abs" />
              </TabsContent>

              <TabsContent value="traps">
                <MuscleGroupExercises muscleGroup="traps" storageKey="exercises-traps" />
              </TabsContent>

              <TabsContent value="quads">
                <MuscleGroupExercises muscleGroup="quads" storageKey="exercises-quads" />
              </TabsContent>

              <TabsContent value="hamstrings">
                <MuscleGroupExercises muscleGroup="hamstrings" storageKey="exercises-hamstrings" />
              </TabsContent>

              <TabsContent value="calves">
                <MuscleGroupExercises muscleGroup="calves" storageKey="exercises-calves" />
              </TabsContent>

              <TabsContent value="other-legs">
                <MuscleGroupExercises muscleGroup="other-legs" storageKey="exercises-other-legs" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="bg-white/70 backdrop-blur-sm border border-blue-200 shadow-xl">
          <CardHeader className="pb-3 sm:pb-4 px-3 sm:px-6">
            <CardTitle className="text-lg sm:text-xl tracking-tight text-gray-800 font-display">My Workouts</CardTitle>
            <CardDescription className="text-sm sm:text-base text-gray-600 font-body">
              Track your complete workouts by category
            </CardDescription>
          </CardHeader>
          <CardContent className="px-3 sm:px-6">
            <Tabs defaultValue="push" className="space-y-4 sm:space-y-6">
              <TabsList className="grid grid-cols-2 sm:flex sm:flex-wrap h-auto bg-gradient-to-r from-blue-100 to-indigo-100 p-1 rounded-xl gap-1 sm:gap-0">
                <TabsTrigger
                  value="push"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Push
                </TabsTrigger>
                <TabsTrigger
                  value="pull"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Pull
                </TabsTrigger>
                <TabsTrigger
                  value="legs"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Legs
                </TabsTrigger>
                <TabsTrigger
                  value="chest"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Chest
                </TabsTrigger>
                <TabsTrigger
                  value="back"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Back
                </TabsTrigger>
                <TabsTrigger
                  value="arms"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Arms
                </TabsTrigger>
                <TabsTrigger
                  value="shoulders-traps"
                  className="text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-4 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-md font-medium"
                >
                  Shoulders & Traps
                </TabsTrigger>
              </TabsList>

              <TabsContent value="push">
                <WorkoutList category="push" storageKey="workouts-push" />
              </TabsContent>

              <TabsContent value="pull">
                <WorkoutList category="pull" storageKey="workouts-pull" />
              </TabsContent>

              <TabsContent value="legs">
                <WorkoutList category="legs" storageKey="workouts-legs" />
              </TabsContent>

              <TabsContent value="chest">
                <WorkoutList category="chest" storageKey="workouts-chest" />
              </TabsContent>

              <TabsContent value="back">
                <WorkoutList category="back" storageKey="workouts-back" />
              </TabsContent>

              <TabsContent value="arms">
                <WorkoutList category="arms" storageKey="workouts-arms" />
              </TabsContent>

              <TabsContent value="shoulders-traps">
                <WorkoutList category="shoulders-traps" storageKey="workouts-shoulders-traps" />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
