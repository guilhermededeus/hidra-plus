import { useState } from "react";
import { useWaterTracker } from "@/hooks/useWaterTracker";
import { FullChart } from "@/components/FullChart";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { BarChart3, Droplets } from "lucide-react";

const ChartPage = () => {
  const { settings, getDailyData, getAllDailyData, isLoaded } = useWaterTracker();
  const [period, setPeriod] = useState<7 | 14 | 30 | "all">(7);

  const data = period === "all" ? getAllDailyData() : getDailyData(period);

  // Calculate stats
  const totalDays = data.length;
  const totalWater = data.reduce((sum, d) => sum + d.total, 0);
  const avgWater = totalDays > 0 ? Math.round(totalWater / totalDays) : 0;
  const daysMetGoal = data.filter((d) => d.total >= settings.dailyGoal).length;

  if (!isLoaded) {
    return (
      <div className="min-h-screen gradient-bg flex items-center justify-center">
        <Droplets className="w-12 h-12 text-primary animate-pulse" />
      </div>
    );
  }

  return (
    <div className="min-h-screen gradient-bg pb-24">
      {/* Header */}
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-lg mx-auto">
          <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <BarChart3 className="w-7 h-7 text-primary" />
            Gráficos
          </h1>
          <p className="text-muted-foreground text-sm">Acompanhe sua evolução</p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 space-y-6 max-w-lg mx-auto">
        {/* Period Selector */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { value: 7, label: "7 dias" },
            { value: 14, label: "14 dias" },
            { value: 30, label: "30 dias" },
            { value: "all", label: "Tudo" },
          ].map((option) => (
            <Button
              key={option.value}
              variant={period === option.value ? "water" : "secondary"}
              size="sm"
              onClick={() => setPeriod(option.value as typeof period)}
              className="shrink-0"
            >
              {option.label}
            </Button>
          ))}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-3 gap-3">
          <div className="water-card text-center p-4 animate-scale-in">
            <p className="text-2xl font-bold text-primary">{avgWater}</p>
            <p className="text-xs text-muted-foreground">Média (ml/dia)</p>
          </div>
          <div className="water-card text-center p-4 animate-scale-in" style={{ animationDelay: "0.1s" }}>
            <p className="text-2xl font-bold text-success">{daysMetGoal}</p>
            <p className="text-xs text-muted-foreground">Dias na meta</p>
          </div>
          <div className="water-card text-center p-4 animate-scale-in" style={{ animationDelay: "0.2s" }}>
            <p className="text-2xl font-bold text-foreground">{totalDays}</p>
            <p className="text-xs text-muted-foreground">Dias registrados</p>
          </div>
        </div>

        {/* Main Chart */}
        <section className="water-card animate-slide-up">
          <h2 className="text-lg font-semibold mb-4 text-foreground">
            Consumo Diário
          </h2>
          <FullChart data={data} goal={settings.dailyGoal} />
        </section>
      </main>

      <Navigation />
    </div>
  );
};

export default ChartPage;
