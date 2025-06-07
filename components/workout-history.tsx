"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

export default function WorkoutHistory() {
  // Sample data - in a real app, this would come from your database
  const data = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - 29 + i)

    // Random workout count (0-2) with higher probability on certain days
    // Simulating a push/pull/legs split routine
    let workouts = 0
    const dayOfWeek = date.getDay()

    // Higher chance of workouts on Monday, Wednesday, Friday
    if ([1, 3, 5].includes(dayOfWeek)) {
      workouts = Math.random() > 0.2 ? 1 : 0
    } else if ([2, 6].includes(dayOfWeek)) {
      // Medium chance on Tuesday, Saturday
      workouts = Math.random() > 0.5 ? 1 : 0
    } else {
      // Lower chance on Sunday, Thursday (rest days)
      workouts = Math.random() > 0.8 ? 1 : 0
    }

    return {
      date: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      workouts,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis dataKey="date" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
        <Bar dataKey="workouts" fill="#ca8a04" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}
