import { useState, useEffect, useCallback } from "react";
import { WaterEntry, DailyData, WaterSettings } from "@/types/water";

const STORAGE_KEYS = {
  ENTRIES: "water_entries",
  SETTINGS: "water_settings",
};

const DEFAULT_SETTINGS: WaterSettings = {
  dailyGoal: 2000,
};

export function useWaterTracker() {
  const [entries, setEntries] = useState<WaterEntry[]>([]);
  const [settings, setSettings] = useState<WaterSettings>(DEFAULT_SETTINGS);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load data from localStorage
  useEffect(() => {
    try {
      const savedEntries = localStorage.getItem(STORAGE_KEYS.ENTRIES);
      const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS);

      if (savedEntries) {
        setEntries(JSON.parse(savedEntries));
      }
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error("Error loading data from localStorage:", error);
    }
    setIsLoaded(true);
  }, []);

  // Save entries to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.ENTRIES, JSON.stringify(entries));
    }
  }, [entries, isLoaded]);

  // Save settings to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(settings));
    }
  }, [settings, isLoaded]);

  const addEntry = useCallback((amount: number) => {
    const now = new Date();
    const entry: WaterEntry = {
      id: crypto.randomUUID(),
      amount,
      timestamp: now.toISOString(),
      date: now.toISOString().split("T")[0],
    };
    setEntries((prev) => [entry, ...prev]);
  }, []);

  const removeEntry = useCallback((id: string) => {
    setEntries((prev) => prev.filter((entry) => entry.id !== id));
  }, []);

  const updateGoal = useCallback((goal: number) => {
    setSettings((prev) => ({ ...prev, dailyGoal: goal }));
  }, []);

  const getTodayTotal = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return entries
      .filter((entry) => entry.date === today)
      .reduce((sum, entry) => sum + entry.amount, 0);
  }, [entries]);

  const getTodayEntries = useCallback(() => {
    const today = new Date().toISOString().split("T")[0];
    return entries.filter((entry) => entry.date === today);
  }, [entries]);

  const getDailyData = useCallback((days: number = 7): DailyData[] => {
    const result: DailyData[] = [];
    const today = new Date();

    for (let i = days - 1; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split("T")[0];

      const total = entries
        .filter((entry) => entry.date === dateStr)
        .reduce((sum, entry) => sum + entry.amount, 0);

      result.push({ date: dateStr, total });
    }

    return result;
  }, [entries]);

  const getAllDailyData = useCallback((): DailyData[] => {
    const dailyTotals = new Map<string, number>();

    entries.forEach((entry) => {
      const current = dailyTotals.get(entry.date) || 0;
      dailyTotals.set(entry.date, current + entry.amount);
    });

    return Array.from(dailyTotals.entries())
      .map(([date, total]) => ({ date, total }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [entries]);

  return {
    entries,
    settings,
    isLoaded,
    addEntry,
    removeEntry,
    updateGoal,
    getTodayTotal,
    getTodayEntries,
    getDailyData,
    getAllDailyData,
  };
}
