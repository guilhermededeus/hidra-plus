import { DailyData } from "@/types/water";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface FullChartProps {
  data: DailyData[];
  goal: number;
}

export function FullChart({ data, goal }: FullChartProps) {
  const chartData = data.map((d) => ({
    ...d,
    displayDate: format(new Date(d.date + "T12:00:00"), "dd/MM", { locale: ptBR }),
    fullDate: format(new Date(d.date + "T12:00:00"), "EEEE, d 'de' MMMM", { locale: ptBR }),
    goal,
  }));

  if (data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center text-muted-foreground">
        <div className="text-center">
          <p className="text-lg font-medium">Sem dados suficientes</p>
          <p className="text-sm">Comece a registrar para ver o gráfico</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
          <defs>
            <linearGradient id="waterGradientFull" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.5} />
              <stop offset="95%" stopColor="hsl(199, 89%, 48%)" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="hsl(var(--border))"
            vertical={false}
          />
          <XAxis
            dataKey="displayDate"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "hsl(var(--muted-foreground))", fontSize: 12 }}
            tickFormatter={(value) => `${value / 1000}L`}
            dx={-10}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "12px",
              boxShadow: "var(--shadow-lg)",
              padding: "12px",
            }}
            formatter={(value: number) => [`${value}ml`, "Total ingerido"]}
            labelFormatter={(_, payload) => payload[0]?.payload?.fullDate || ""}
          />
          <ReferenceLine
            y={goal}
            stroke="hsl(var(--success))"
            strokeDasharray="5 5"
            label={{
              value: `Meta: ${goal}ml`,
              position: "right",
              fill: "hsl(var(--success))",
              fontSize: 12,
            }}
          />
          <Area
            type="monotone"
            dataKey="total"
            stroke="hsl(199, 89%, 48%)"
            strokeWidth={3}
            fill="url(#waterGradientFull)"
            dot={{ fill: "hsl(199, 89%, 48%)", strokeWidth: 2, r: 4 }}
            activeDot={{ r: 6, fill: "hsl(199, 89%, 48%)" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
