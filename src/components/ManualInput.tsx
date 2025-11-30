import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";

interface ManualInputProps {
  onAdd: (amount: number) => void;
}

export function ManualInput({ onAdd }: ManualInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseInt(value, 10);
    if (amount > 0) {
      onAdd(amount);
      setValue("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <div className="relative flex-1">
        <Input
          type="number"
          placeholder="Quantidade em ml"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          min="1"
          max="5000"
          className="h-12 pr-12 text-base rounded-xl border-2 border-border focus:border-primary"
        />
        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
          ml
        </span>
      </div>
      <Button type="submit" variant="water" size="icon-lg" disabled={!value || parseInt(value) <= 0}>
        <Plus className="w-6 h-6" />
      </Button>
    </form>
  );
}
