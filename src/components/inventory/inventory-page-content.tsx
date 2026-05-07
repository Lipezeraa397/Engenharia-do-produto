"use client";

import { useInventory } from "@/hooks/use-inventory";
import { Loader2 } from "lucide-react";

export function InventoryPageContent() {
  const { rows, loading, error, reload } = useInventory();

  if (loading && rows.length === 0) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center gap-2 text-muted-foreground">
        <Loader2 className="h-6 w-6 animate-spin" aria-hidden />
        Carregando inventário…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1200px] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Inventário
          </h1>
          <p className="text-sm text-muted-foreground">
            Controle de estoque com atualização em tempo real.
          </p>
        </div>
        <button
          type="button"
          onClick={() => reload()}
          className="inline-flex min-h-[44px] items-center justify-center rounded-xl bg-secondary px-4 text-sm font-medium text-secondary-foreground transition hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
        >
          Atualizar
        </button>
      </div>

      {error ? (
        <div
          className="rounded-2xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm"
          role="alert"
        >
          {error}
        </div>
      ) : null}

      {/* Desktop table */}
      <div className="hidden md:block overflow-x-auto rounded-2xl border border-border bg-card shadow-card">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead className="border-b border-border bg-muted/50">
            <tr>
              <th className="px-4 py-3 font-semibold text-foreground">
                Produto
              </th>
              <th className="px-4 py-3 font-semibold text-foreground">
                Quantidade
              </th>
              <th className="px-4 py-3 font-semibold text-foreground">
                Atualizado
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-b border-border last:border-0 hover:bg-muted/30"
              >
                <td className="px-4 py-3 font-medium text-foreground">
                  {r.product}
                </td>
                <td className="px-4 py-3 tabular-nums text-muted-foreground">
                  {r.quantity}
                </td>
                <td className="px-4 py-3 text-muted-foreground">
                  {new Date(r.updated_at).toLocaleString("pt-BR")}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {rows.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            Nenhum item cadastrado.
          </p>
        ) : null}
      </div>

      {/* Mobile cards */}
      <div className="grid grid-cols-1 gap-3 md:hidden">
        {rows.map((r) => (
          <article
            key={r.id}
            className="rounded-2xl border border-border bg-card p-4 shadow-card"
          >
            <p className="font-semibold text-foreground">{r.product}</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Qtd:{" "}
              <span className="tabular-nums font-medium text-foreground">
                {r.quantity}
              </span>
            </p>
            <p className="mt-2 text-xs text-muted-foreground">
              {new Date(r.updated_at).toLocaleString("pt-BR")}
            </p>
          </article>
        ))}
        {rows.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">
            Nenhum item cadastrado.
          </p>
        ) : null}
      </div>
    </div>
  );
}
