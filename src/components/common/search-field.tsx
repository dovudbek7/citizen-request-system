import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

interface SearchFieldProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
}

export function SearchField({ placeholder, value, onChange }: SearchFieldProps) {
  return (
    <div className="relative w-full">
      <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
      <Input className="pl-12" placeholder={placeholder} value={value} onChange={(event) => onChange(event.target.value)} />
    </div>
  );
}
