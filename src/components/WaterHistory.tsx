import { WaterEntry } from "@/types/water";
import { Button } from "@/components/ui/button";
import { Trash2, Droplet } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface WaterHistoryProps {
  entries: WaterEntry[];
  onRemove: (id: string) => void;
  showAll?: boolean;
}

export function WaterHistory({ entries, onRemove, showAll = false }: WaterHistoryProps) {
  const displayEntries = showAll ? entries : entries.slice(0, 5);

  if (entries.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <Droplet className="w-12 h-12 mx-auto mb-3 opacity-30" />
        <p>Nenhum registro ainda</p>
        <p className="text-sm">Adicione sua primeira água!</p>
      </div>
    );
  }

  // Group entries by date
  const groupedEntries = displayEntries.reduce((acc, entry) => {
    const dateKey = entry.date;
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(entry);
    return acc;
  }, {} as Record<string, WaterEntry[]>);

  const sortedDates = Object.keys(groupedEntries).sort((a, b) => b.localeCompare(a));

  return (
    <div className="space-y-4">
      {sortedDates.map((date) => (
        <div key={date} className="space-y-2">
          <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
            {format(new Date(date + "T12:00:00"), "EEEE, d 'de' MMMM", { locale: ptBR })}
          </h4>
          <div className="space-y-2">
            {groupedEntries[date].map((entry) => (
              <div
                key={entry.id}
                className="flex items-center justify-between p-3 bg-muted/50 rounded-xl animate-fade-in"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-water-light flex items-center justify-center">
                    <Droplet className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{entry.amount}ml</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(entry.timestamp), "HH:mm", { locale: ptBR })}
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon-sm"
                  onClick={() => onRemove(entry.id)}
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
