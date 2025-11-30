import { NavLink } from "react-router-dom";
import { Droplets, BarChart3, History } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { to: "/", icon: Droplets, label: "Início" },
  { to: "/historico", icon: History, label: "Histórico" },
  { to: "/graficos", icon: BarChart3, label: "Gráficos" },
];

export function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around h-16 max-w-lg mx-auto">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all duration-200",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <div
                  className={cn(
                    "p-2 rounded-xl transition-all duration-200",
                    isActive && "bg-water-light"
                  )}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">{label}</span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
