"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { InventoryRow } from "@/types/database";

type Props = {
  rows: InventoryRow[];
};

export function StockBarChart({ rows }: Props) {
  const data = rows.slice(0, 8).map((r) => ({
    name:
      r.product.length > 14 ? `${r.product.slice(0, 12)}…` : r.product,
    qty: Number(r.quantity),
  }));

  if (data.length === 0) {
    return (
      <p className="py-12 text-center text-sm text-muted-foreground">
        Sem dados de estoque para exibir.
      </p>
    );
  }

  return (
    <div className="h-64 w-full min-h-[240px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: 0, right: 8, top: 8 }}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
          <XAxis
            dataKey="name"
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            interval={0}
            angle={-18}
            textAnchor="end"
            height={56}
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
            formatter={(v) => [`${Number(v ?? 0)}`, "Quantidade"]}
          />
          <Bar dataKey="qty" fill="#1F3D2B" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
