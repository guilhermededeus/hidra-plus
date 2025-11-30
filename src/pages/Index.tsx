import { useWaterTracker } from "@/hooks/useWaterTracker";
import { ProgressRing } from "@/components/ProgressRing";
import { QuickAddButtons } from "@/components/QuickAddButtons";
import { ManualInput } from "@/components/ManualInput";
import { GoalSetting } from "@/components/GoalSetting";
import { MiniChart } from "@/components/MiniChart";
import { WaterHistory } from "@/components/WaterHistory";
import { Navigation } from "@/components/Navigation";
import { Link } from "react-router-dom";
import { Droplets, ChevronRight, Sparkles } from "lucide-react";
import { toast } from "sonner";

const Index = () => {
  const {
    entries,
    settings,
    isLoaded,
    addEntry,
    removeEntry,
    updateGoal,
    getTodayTotal,
    getTodayEntries,
    getDailyData,
  } = useWaterTracker();

  const todayTotal = getTodayTotal();
  const progress = Math.min((todayTotal / settings.dailyGoal) * 100, 100);
  const remaining = Math.max(settings.dailyGoal - todayTotal, 0);
  const todayEntries = getTodayEntries();
  const weekData = getDailyData(7);
  const isGoalReached = todayTotal >= settings.dailyGoal;

  const handleAdd = (amount: number) => {
    addEntry(amount);
    const newTotal = todayTotal + amount;
    if (newTotal >= settings.dailyGoal && !isGoalReached) {
      toast.success("🎉 Parabéns! Você atingiu sua meta diária!", {
        duration: 4000,
      });
    } else {
      toast.success(`+${amount}ml adicionado!`);
    }
  };

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
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
              <Droplets className="w-7 h-7 text-primary" />
              Água
            </h1>
            <p className="text-muted-foreground text-sm">Mantenha-se hidratado</p>
          </div>
          <GoalSetting currentGoal={settings.dailyGoal} onUpdateGoal={updateGoal} />
        </div>
      </header>

      {/* Main Content */}
      <main className="px-4 space-y-6 max-w-lg mx-auto">
        {/* Progress Card */}
        <section className="water-card animate-scale-in">
          <div className="flex flex-col items-center">
            <ProgressRing progress={progress} size={180} strokeWidth={14}>
              <div className="text-center">
                {isGoalReached ? (
                  <>
                    <Sparkles className="w-8 h-8 text-primary mx-auto mb-1 animate-pulse-water" />
                    <p className="text-sm font-medium text-primary">Meta atingida!</p>
                  </>
                ) : (
                  <>
                    <p className="text-4xl font-bold text-foreground">{todayTotal}</p>
                    <p className="text-sm text-muted-foreground">de {settings.dailyGoal}ml</p>
                  </>
                )}
              </div>
            </ProgressRing>

            <div className="mt-4 text-center">
              {isGoalReached ? (
                <p className="text-lg font-semibold text-success">
                  Total: {todayTotal}ml 💧
                </p>
              ) : (
                <p className="text-muted-foreground">
                  Faltam <span className="font-semibold text-foreground">{remaining}ml</span> para sua meta
                </p>
              )}
            </div>
          </div>
        </section>

        {/* Quick Add Section */}
        <section className="water-card animate-slide-up" style={{ animationDelay: "0.1s" }}>
          <h2 className="text-lg font-semibold mb-4 text-foreground">Adicionar Água</h2>
          <div className="space-y-4">
            <QuickAddButtons onAdd={handleAdd} />
            <ManualInput onAdd={handleAdd} />
          </div>
        </section>

        {/* Mini Chart Section */}
        <section className="water-card animate-slide-up" style={{ animationDelay: "0.2s" }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-lg font-semibold text-foreground">Últimos 7 dias</h2>
            <Link
              to="/graficos"
              className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              Ver mais <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <MiniChart data={weekData} goal={settings.dailyGoal} />
        </section>

        {/* Today's History */}
        <section className="water-card animate-slide-up" style={{ animationDelay: "0.3s" }}>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Hoje</h2>
            <Link
              to="/historico"
              className="text-sm text-primary font-medium flex items-center gap-1 hover:underline"
            >
              Ver tudo <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <WaterHistory entries={todayEntries} onRemove={removeEntry} />
        </section>
      </main>

      <Navigation />
    </div>
  );
};

export default Index;
