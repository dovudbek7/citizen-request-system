import { useEffect, useRef } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { TopBar } from "@/components/layout/top-bar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { cn } from "@/lib/utils"

export function AppLayout() {
  const navigate = useNavigate()
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const resetTimer = () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      
      timerRef.current = setTimeout(() => {
        navigate("/")
      }, 1000 * 60 * 5) // 5000ms = 5s
    }

    const events = ["mousedown", "mousemove", "keypress", "scroll", "touchstart"]

    events.forEach((event) => window.addEventListener(event, resetTimer))
    
    resetTimer()

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
      events.forEach((event) => window.removeEventListener(event, resetTimer))
    }
  }, [navigate])

  return (
    <div className="relative min-h-screen overflow-x-hidden px-3 pb-28 pt-4 transition-colors dark:bg-slate-950 sm:px-4 sm:pb-32 lg:px-6 lg:pb-10">
      
      {/* 1. ASOSIY FON */}
      <div
        className={cn(
          "fixed inset-0 pointer-events-none transition-colors duration-500",
          "bg-[#fafafa] dark:bg-slate-950"
        )}
        style={{
          zIndex: 0,
          backgroundImage: `
            repeating-linear-gradient(45deg, rgba(255, 0, 100, 0.07) 0, rgba(255, 0, 100, 0.07) 1px, transparent 1px, transparent 20px),
            repeating-linear-gradient(-45deg, rgba(255, 0, 100, 0.07) 0, rgba(255, 0, 100, 0.07) 1px, transparent 1px, transparent 20px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* 2. KONTENT QISMI */}
      <div className="relative z-10"> 
        <TopBar />
        <main className="mx-auto mt-4 w-full max-w-[1440px] lg:mt-6">
          <Outlet />
        </main>
        
        <div className="lg:hidden">
          <BottomNav />
        </div>
      </div>
    </div>
  )
}