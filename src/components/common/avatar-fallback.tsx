import { Building2, UserRound } from "lucide-react";
import type { DirectoryType } from "@/lib/types";
import { cn } from "@/lib/utils";

interface AvatarFallbackProps {
  name: string;
  type: DirectoryType;
  src?: string;
  className?: string;
}

export function AvatarFallback({ name, type, src, className }: AvatarFallbackProps) {
  if (src) {
    return <img alt={name} className={cn("h-full w-full object-cover", className)} src={src} />;
  }

  const Icon = type === "employees" ? UserRound : Building2;

  return (
    <div
      className={cn(
        "flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-secondary text-white",
        className,
      )}
    >
      <Icon className="h-10 w-10" />
    </div>
  );
}
