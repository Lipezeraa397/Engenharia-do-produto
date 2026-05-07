"use client";

import { FarmMap } from "@/components/map/farm-map";
import { StatCard } from "@/components/dashboard/stat-card";
import { StockBarChart } from "@/components/dashboard/stock-bar-chart";
import { UsageChart } from "@/components/dashboard/usage-chart";
import { useInventory } from "@/hooks/use-inventory";
import { useMachines } from "@/hooks/use-machines";
import { AlertTriangle, Loader2, MapPin, Package, Tractor } from "lucide-react";

export function DashboardPageContent() {
  const { machines, loading: lm, error: em } = useMachines();
  const { rows: inventory, loading: li, error: ei } = useInventory();

  const loading = lm || li;
  const activeCount = machines.filter((m) => m.status === "active").length;
  const lowStock = inventory.filter((r) => Number(r.quantity) < 10).length;
  const alerts =
    machines.filter((m) => m.status === "offline").length +
    lowStock;

  if (loading && machines.length === 0 && inventory.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        <span>Carregando painel…</span>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-6">
      {(em || ei) && (
        <div
          className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          <p className="font-medium">Aviso de dados</p>
          <p className="text-muted-foreground">
            {em && `${em} `}
            {ei && `${ei}`}
          </p>
        </div>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Máquinas ativas"
          subtitle="Operação em campo"
          icon={Tractor}
          value={activeCount}
          trend={`Total monitorado: ${machines.length}`}
        />
        <StatCard
          title="Itens em estoque"
          subtitle="SKUs cadastrados"
          icon={Package}
          value={inventory.length}
          trend={
            inventory.length
              ? `Última atualização em tempo real`
              : "Cadastre itens no inventário"
          }
        />
        <StatCard
          title="Alertas"
          subtitle="Baixo estoque + offline"
          icon={AlertTriangle}
          value={alerts}
          trend={alerts === 0 ? "Tudo dentro do esperado" : "Exige atenção"}
        />
        <StatCard
          title="Mapa ao vivo"
          subtitle="Leaflet + OSM"
          icon={MapPin}
          value={machines.filter((m) => m.status !== "offline").length}
          trend="Posições atualizadas via Supabase Realtime"
        />
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <section className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
          <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-foreground">
                Mapa da propriedade
              </h2>
              <p className="text-sm text-muted-foreground">
                Marcadores por status — clique para detalhes
              </p>
            </div>
          </div>
          <FarmMap machines={machines} />
        </section>

        <section className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
          <h2 className="text-lg font-bold text-foreground">
            Uso semanal (exemplo)
          </h2>
          <p className="mb-4 text-sm text-muted-foreground">
            Horas máquinas — dados ilustrativos; conecte métricas reais depois.
          </p>
          <UsageChart />
        </section>
      </div>

      <section className="rounded-2xl border border-border bg-card p-4 shadow-card md:p-5">
        <h2 className="text-lg font-bold text-foreground">
          Estoque por produto
        </h2>
        <p className="mb-4 text-sm text-muted-foreground">
          Atualização automática quando o inventário mudar.
        </p>
        <StockBarChart rows={inventory} />
      </section>
    </div>
  );
}
