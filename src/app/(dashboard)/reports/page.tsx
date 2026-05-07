"use client";

import { StockBarChart } from "@/components/dashboard/stock-bar-chart";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { useInventory } from "@/hooks/use-inventory";
import { Loader2 } from "lucide-react";

export default function ReportsPage() {
  const { rows, loading } = useInventory();

  return (
    <div className="mx-auto max-w-[1200px] space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Relatórios
        </h1>
        <p className="text-sm text-muted-foreground">
          Tendências de uso (exemplo) e distribuição de estoque.
        </p>
      </div>

      {loading && rows.length === 0 ? (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" aria-hidden />
          Carregando dados…
        </div>
      ) : null}

      <section className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Uso semanal
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Série ilustrativa — substitua pela sua fonte de métricas.
        </p>
        <UsageChart />
      </section>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-6">
        <h2 className="text-lg font-semibold text-foreground">
          Estoque por produto
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Baseado nos itens do inventário atual.
        </p>
        <StockBarChart rows={rows} />
      </section>
    </div>
  );
}
