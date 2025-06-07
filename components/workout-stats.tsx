"use client"

import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

export default function WorkoutStats() {
  // Sample data - in a real app, this would come from your database
  const data = [
    {
      month: "Jan",
      benchPress: 165,
      squat: 220,
      deadlift: 265,
    },
    {
      month: "Feb",
      benchPress: 170,
      squat: 230,
      deadlift: 275,
    },
    {
      month: "Mar",
      benchPress: 175,
      squat: 240,
      deadlift: 285,
    },
    {
      month: "Apr",
      benchPress: 180,
      squat: 250,
      deadlift: 295,
    },
    {
      month: "May",
      benchPress: 185,
      squat: 265,
      deadlift: 310,
    },
    {
      month: "Jun",
      benchPress: 195,
      squat: 275,
      deadlift: 320,
    },
  ]

  return (
    <ResponsiveContainer width="100%" height={350}>
      <LineChart data={data}>
        <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value} lbs`}
        />
        <Tooltip />
        <Line type="monotone" dataKey="benchPress" stroke="#ca8a04" strokeWidth={2} name="Bench Press" />
        <Line type="monotone" dataKey="squat" stroke="#3b82f6" strokeWidth={2} name="Squat" />
        <Line type="monotone" dataKey="deadlift" stroke="#22c55e" strokeWidth={2} name="Deadlift" />
      </LineChart>
    </ResponsiveContainer>
  )
}
