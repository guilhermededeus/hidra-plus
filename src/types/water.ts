export interface WaterEntry {
  id: string;
  amount: number;
  timestamp: string;
  date: string;
}

export interface DailyData {
  date: string;
  total: number;
}

export interface WaterSettings {
  dailyGoal: number;
}
