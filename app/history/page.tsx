import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, ChevronRight, Dumbbell } from "lucide-react"

export default function HistoryPage() {
  // Sample data - in a real app, this would come from your database
  const workoutsByCategory = {
    push: [
      { id: 1, date: "June 5, 2025", exercises: 5, volume: "4,200 kg" },
      { id: 3, date: "June 1, 2025", exercises: 4, volume: "3,800 kg" },
      { id: 7, date: "May 28, 2025", exercises: 5, volume: "4,100 kg" },
    ],
    pull: [
      { id: 2, date: "June 3, 2025", exercises: 6, volume: "4,500 kg" },
      { id: 6, date: "May 30, 2025", exercises: 5, volume: "4,300 kg" },
      { id: 9, date: "May 26, 2025", exercises: 6, volume: "4,400 kg" },
    ],
    legs: [
      { id: 4, date: "May 31, 2025", exercises: 5, volume: "6,200 kg" },
      { id: 8, date: "May 27, 2025", exercises: 4, volume: "5,800 kg" },
      { id: 10, date: "May 24, 2025", exercises: 5, volume: "6,000 kg" },
    ],
    other: [
      { id: 5, date: "May 29, 2025", exercises: 7, volume: "3,200 kg", type: "Full Body" },
      { id: 11, date: "May 22, 2025", exercises: 6, volume: "2,800 kg", type: "Upper Body" },
      { id: 12, date: "May 20, 2025", exercises: 5, volume: "4,100 kg", type: "Core" },
    ],
  }

  const muscleGroups = [
    { name: "Chest", count: 8, lastWorked: "2 days ago" },
    { name: "Back", count: 7, lastWorked: "4 days ago" },
    { name: "Shoulders", count: 6, lastWorked: "2 days ago" },
    { name: "Biceps", count: 7, lastWorked: "4 days ago" },
    { name: "Triceps", count: 8, lastWorked: "2 days ago" },
    { name: "Quads", count: 5, lastWorked: "5 days ago" },
    { name: "Hamstrings", count: 5, lastWorked: "5 days ago" },
    { name: "Glutes", count: 5, lastWorked: "5 days ago" },
    { name: "Calves", count: 5, lastWorked: "5 days ago" },
    { name: "Abs", count: 4, lastWorked: "7 days ago" },
  ]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <Button asChild variant="ghost" size="icon">
          <Link href="/">
            <ChevronLeft className="h-5 w-5" />
          </Link>
        </Button>
        <h1 className="font-semibold">Workout History</h1>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <Tabs defaultValue="by-category" className="space-y-4">
          <TabsList>
            <TabsTrigger value="by-category">By Category</TabsTrigger>
            <TabsTrigger value="by-muscle">By Muscle Group</TabsTrigger>
            <TabsTrigger value="all">All Workouts</TabsTrigger>
          </TabsList>

          <TabsContent value="by-category" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {Object.entries(workoutsByCategory).map(([category, workouts]) => (
                <Card key={category}>
                  <CardHeader>
                    <CardTitle className="capitalize">{category}</CardTitle>
                    <CardDescription>{workouts.length} recent workouts</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workouts.map((workout) => (
                        <div key={workout.id} className="flex items-center justify-between">
                          <div>
                            <div className="font-medium">{workout.date}</div>
                            <div className="text-sm text-muted-foreground">
                              {workout.exercises} exercises • {workout.volume}
                            </div>
                          </div>
                          <Button variant="ghost" size="icon">
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="by-muscle" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Muscle Groups</CardTitle>
                <CardDescription>Frequency and last workout by muscle group</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-2">
                  {muscleGroups.map((muscle) => (
                    <div key={muscle.name} className="flex items-center gap-4 rounded-lg border p-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
                        <Dumbbell className="h-5 w-5 text-red-500" />
                      </div>
                      <div>
                        <div className="font-medium">{muscle.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {muscle.count} workouts • Last: {muscle.lastWorked}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>All Workouts</CardTitle>
                <CardDescription>Your complete workout history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {Object.values(workoutsByCategory)
                    .flat()
                    .sort((a, b) => {
                      const dateA = new Date(a.date)
                      const dateB = new Date(b.date)
                      return dateB - dateA
                    })
                    .map((workout) => (
                      <div key={workout.id} className="flex items-start gap-4 rounded-lg border p-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
                          <Dumbbell className="h-6 w-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="font-medium">{workout.date}</div>
                            <Button variant="ghost" size="sm">
                              View Details
                            </Button>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {workout.type || workout.id % 3 === 0 ? "Push" : workout.id % 3 === 1 ? "Pull" : "Legs"} •{" "}
                            {workout.exercises} exercises • {workout.volume}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
