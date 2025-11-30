import { Button } from "@/components/ui/button";
import { Droplets } from "lucide-react";

interface QuickAddButtonsProps {
  onAdd: (amount: number) => void;
}

const QUICK_AMOUNTS = [100, 200, 300, 500];

export function QuickAddButtons({ onAdd }: QuickAddButtonsProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {QUICK_AMOUNTS.map((amount) => (
        <Button
          key={amount}
          variant="quick"
          size="lg"
          onClick={() => onAdd(amount)}
          className="flex flex-col items-center gap-1 h-auto py-4"
        >
          <Droplets className="w-5 h-5" />
          <span className="text-lg font-bold">+{amount}ml</span>
        </Button>
      ))}
    </div>
  );
}
