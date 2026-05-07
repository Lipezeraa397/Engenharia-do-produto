"use client";

import { FarmMap } from "@/components/map/farm-map";
import { useMachines } from "@/hooks/use-machines";
import { STATUS_COLORS, statusLabel } from "@/lib/machine-styles";
import { Loader2 } from "lucide-react";

export function MapPageContent() {
  const { machines, loading, error } = useMachines();

  if (loading && machines.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        Carregando posições…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1400px] space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Rastreamento
        </h1>
        <p className="text-sm text-muted-foreground">
          Posições ao vivo — atualização suave via Supabase Realtime.
        </p>
      </div>

      {error ? (
        <div
          className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      <div className="flex flex-wrap gap-4 rounded-2xl border border-border bg-card p-4 shadow-card">
        {(["active", "idle", "offline"] as const).map((s) => (
          <div key={s} className="flex items-center gap-2 text-sm">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: STATUS_COLORS[s] }}
              aria-hidden
            />
            <span className="text-muted-foreground">{statusLabel(s)}</span>
          </div>
        ))}
      </div>

      <FarmMap machines={machines} />

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {machines.map((m) => (
          <article
            key={m.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-card"
          >
            <p className="font-semibold text-foreground">{m.name}</p>
            <p className="text-sm text-muted-foreground">
              {statusLabel(m.status)}
            </p>
            <p className="mt-2 font-mono text-xs text-muted-foreground">
              {m.lat.toFixed(5)}, {m.lng.toFixed(5)}
            </p>
          </article>
        ))}
      </div>
    </div>
  );
}
