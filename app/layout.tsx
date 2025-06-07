import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Script from "next/script"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
  title: "HyperTrack - Hypertrophy Workout Tracker",
  description: "Track your hypertrophy workouts and build muscle effectively",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-body antialiased`}>
        {children}
        <Script id="localStorage-check" strategy="afterInteractive">
          {`
            try {
              // Test localStorage availability
              if (typeof window !== 'undefined') {
                window.localStorage.setItem('localStorage_test', 'test');
                window.localStorage.removeItem('localStorage_test');
              }
            } catch (e) {
              console.warn('localStorage is not available. Data persistence will not work.');
            }
          `}
        </Script>
      </body>
    </html>
  )
}
