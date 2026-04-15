import { Outlet } from "react-router-dom";
import { BackgroundShell } from "@/components/layout/background-shell";
import { TopBar } from "@/components/layout/top-bar";

export function AppLayout() {
  return (
    <div className="min-h-screen overflow-x-hidden px-3 pb-10 sm:px-4 lg:px-6">
      <BackgroundShell />
      <TopBar />
      <main className="mx-auto mt-6 w-full max-w-[1440px]">
        <Outlet />
      </main>
    </div>
  );
}
