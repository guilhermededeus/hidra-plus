import { DailyData } from "@/types/water";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MiniChartProps {
  data: DailyData[];
  goal: number;
}

export function MiniChart({ data, goal }: MiniChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    displayDate: format(new Date(d.date + "T12:00:00"), "EEE", { locale: ptBR }),
    goal,
  }));

  if (data.length === 0 || data.every((d) => d.total === 0)) {
    return (
      <div className="h-32 flex items-center justify-center text-muted-foreground text-sm">
        Dados aparecerão aqui
      </div>
    );
  }

  return (
    <div className="h-32">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="waterGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.4} />
              <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 11 }}
          />
          <YAxis hide domain={[0, "auto"]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "var(--shadow-md)",
            }}
            formatter={(value: number) => [`${value}ml`, "Total"]}
            labelFormatter={(label) => label}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="hsl(199, 89%, 48%)"
            strokeWidth={2}
            fill="url(#waterGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
