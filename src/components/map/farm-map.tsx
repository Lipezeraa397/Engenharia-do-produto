"use client";

import dynamic from "next/dynamic";
import type { Machine } from "@/types/database";
import { Loader2 } from "lucide-react";

const FarmMapInner = dynamic(
  () => import("./farm-map-inner").then((m) => m.FarmMapInner),
  {
    ssr: false,
    loading: () => (
      <div className="flex min-h-[min(50vh,420px)] w-full items-center justify-center rounded-2xl border border-border bg-card text-muted-foreground">
        <Loader2 className="h-8 w-8 animate-spin" aria-hidden />
        <span className="sr-only">Carregando mapa</span>
      </div>
    ),
  }
);

type Props = {
  machines: Machine[];
  className?: string;
};

export function FarmMap({ machines, className }: Props) {
  return (
    <div className={className}>
      <FarmMapInner machines={machines} />
    </div>
  );
}
