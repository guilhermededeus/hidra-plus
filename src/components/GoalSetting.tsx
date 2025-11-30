import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Settings, Check } from "lucide-react";

interface GoalSettingProps {
  currentGoal: number;
  onUpdateGoal: (goal: number) => void;
}

const PRESET_GOALS = [1500, 2000, 2500, 3000];

export function GoalSetting({ currentGoal, onUpdateGoal }: GoalSettingProps) {
  const [open, setOpen] = useState(false);
  const [customGoal, setCustomGoal] = useState(currentGoal.toString());

  const handlePresetClick = (goal: number) => {
    onUpdateGoal(goal);
    setCustomGoal(goal.toString());
    setOpen(false);
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const goal = parseInt(customGoal, 10);
    if (goal > 0) {
      onUpdateGoal(goal);
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon-sm" className="text-muted-foreground hover:text-foreground">
          <Settings className="w-5 h-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">Meta Diária</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="grid grid-cols-2 gap-3">
            {PRESET_GOALS.map((goal) => (
              <Button
                key={goal}
                variant={currentGoal === goal ? "water" : "secondary"}
                onClick={() => handlePresetClick(goal)}
                className="h-14 text-lg font-semibold"
              >
                {goal}ml
                {currentGoal === goal && <Check className="w-5 h-5 ml-2" />}
              </Button>
            ))}
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                ou personalize
              </span>
            </div>
          </div>

          <form onSubmit={handleCustomSubmit} className="flex gap-3">
            <div className="relative flex-1">
              <Input
                type="number"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                min="500"
                max="10000"
                className="h-12 pr-12 text-base rounded-xl border-2"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">
                ml
              </span>
            </div>
            <Button type="submit" variant="water">
              Salvar
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
