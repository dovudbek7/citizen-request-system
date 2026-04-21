import { Outlet } from "react-router-dom"
import { BackgroundShell } from "@/components/layout/background-shell"
import { TopBar } from "@/components/layout/top-bar"
import { BottomNav } from "@/components/layout/bottom-nav"
import { cn } from "@/lib/utils"

export function AppLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden px-3 pb-28 pt-4 transition-colors dark:bg-slate-950 sm:px-4 sm:pb-32 lg:px-6 lg:pb-10">
      
      {/* 1. ASOSIY FON (Diagonal Grid) */}
      <div
        className={cn(
          "fixed inset-0 pointer-events-none transition-colors duration-500",
          "bg-[#fafafa] dark:bg-slate-950" // Light modeda oq, Dark modeda to'q ko'k/qora
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