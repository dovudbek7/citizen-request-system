import { Outlet } from "react-router-dom"
import { BackgroundShell } from "@/components/layout/background-shell"
import { TopBar } from "@/components/layout/top-bar"
import { BottomNav } from "@/components/layout/bottom-nav"

export function AppLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden px-3 pb-28 pt-4 transition-colors dark:bg-slate-950 sm:px-4 sm:pb-32 lg:px-6 lg:pb-10">
      <BackgroundShell />
      <TopBar />
      <main className="mx-auto mt-4 w-full max-w-[1440px] lg:mt-6">
        <Outlet />
      </main>
      {/* Bottom nav only visible on mobile and tablet */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  )
}
