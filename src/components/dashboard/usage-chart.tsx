"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const usageData = [
  { day: "Seg", horas: 6.2 },
  { day: "Ter", horas: 7.5 },
  { day: "Qua", horas: 5.8 },
  { day: "Qui", horas: 8.1 },
  { day: "Sex", horas: 7.0 },
  { day: "Sáb", horas: 4.2 },
  { day: "Dom", horas: 3.5 },
];

export function UsageChart() {
  return (
    <div className="h-64 w-full min-h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={usageData} margin={{ left: 0, right: 8, top: 8 }}>
          <defs>
            <linearGradient id="usageFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#3A7D44" stopOpacity={0.35} />
              <stop offset="100%" stopColor="#3A7D44" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="day"
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={36}
          />
          <Tooltip
            contentStyle={{
              borderRadius: 12,
              border: "1px solid var(--border)",
              background: "var(--card)",
              color: "var(--foreground)",
            }}
            formatter={(v) => [`${Number(v ?? 0)} h`, "Uso"]}
          />
          <Area
            type="monotone"
            dataKey="horas"
            stroke="#3A7D44"
            strokeWidth={2}
            fill="url(#usageFill)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
