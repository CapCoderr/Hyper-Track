import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Dumbbell } from "lucide-react"

export default function RecentWorkouts() {
  // Sample data - in a real app, this would come from your database
  const workouts = [
    {
      id: 1,
      type: "Push Day",
      date: "Today",
      exercises: [
        { name: "Bench Press", sets: 4, weight: "185 lbs", reps: "8-10" },
        { name: "Shoulder Press", sets: 3, weight: "115 lbs", reps: "10-12" },
        { name: "Tricep Pushdown", sets: 3, weight: "55 lbs", reps: "12-15" },
      ],
    },
    {
      id: 2,
      type: "Pull Day",
      date: "Yesterday",
      exercises: [
        { name: "Deadlift", sets: 4, weight: "265 lbs", reps: "6-8" },
        { name: "Barbell Row", sets: 3, weight: "155 lbs", reps: "8-10" },
        { name: "Bicep Curl", sets: 3, weight: "45 lbs", reps: "10-12" },
      ],
    },
    {
      id: 3,
      type: "Leg Day",
      date: "3 days ago",
      exercises: [
        { name: "Squat", sets: 4, weight: "225 lbs", reps: "8-10" },
        { name: "Leg Press", sets: 3, weight: "330 lbs", reps: "10-12" },
        { name: "Calf Raise", sets: 3, weight: "90 lbs", reps: "15-20" },
      ],
    },
    {
      id: 4,
      type: "Push Day",
      date: "5 days ago",
      exercises: [
        { name: "Incline Bench", sets: 4, weight: "155 lbs", reps: "8-10" },
        { name: "Lateral Raise", sets: 3, weight: "25 lbs", reps: "12-15" },
        { name: "Tricep Extension", sets: 3, weight: "35 lbs", reps: "12-15" },
      ],
    },
    {
      id: 5,
      type: "Pull Day",
      date: "6 days ago",
      exercises: [
        { name: "Pull-ups", sets: 4, weight: "BW", reps: "8-10" },
        { name: "Lat Pulldown", sets: 3, weight: "145 lbs", reps: "10-12" },
        { name: "Face Pull", sets: 3, weight: "55 lbs", reps: "15-20" },
      ],
    },
  ]

  return (
    <div className="space-y-8">
      {workouts.map((workout) => (
        <div key={workout.id} className="flex items-start">
          <Avatar className="h-9 w-9 mr-4 mt-1 bg-amber-100">
            <AvatarFallback className="bg-amber-100 text-amber-700">
              <Dumbbell className="h-4 w-4" />
            </AvatarFallback>
          </Avatar>
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">{workout.type}</p>
            <p className="text-sm text-muted-foreground">{workout.date}</p>
            <div className="mt-2 text-xs text-muted-foreground">
              {workout.exercises.map((exercise, i) => (
                <div key={i} className="mt-1">
                  {exercise.name}: {exercise.sets} sets × {exercise.reps} @ {exercise.weight}
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
