import { useWaterTracker } from "@/hooks/useWaterTracker";
import { WaterHistory } from "@/components/WaterHistory";
import { Navigation } from "@/components/Navigation";
import { History, Droplets } from "lucide-react";

const HistoryPage = () => {
  const { entries, removeEntry, isLoaded } = useWaterTracker();

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
            <History className="w-7 h-7 text-primary" />
            Histórico
          </h1>
          <p className="text-muted-foreground text-sm">
            {entries.length} {entries.length === 1 ? "registro" : "registros"} no total
          </p>
        </div>
      </header>

      {/* Content */}
      <main className="px-4 max-w-lg mx-auto">
        <section className="water-card animate-fade-in">
          <WaterHistory entries={entries} onRemove={removeEntry} showAll />
        </section>
      </main>

      <Navigation />
    </div>
  );
};

export default HistoryPage;
