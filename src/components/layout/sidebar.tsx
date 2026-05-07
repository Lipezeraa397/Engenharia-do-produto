"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  LayoutDashboard,
  MapPin,
  Menu,
  Package,
  Settings,
  Sprout,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/map", label: "Mapa", icon: MapPin },
  { href: "/inventory", label: "Inventário", icon: Package },
  { href: "/reports", label: "Relatórios", icon: BarChart3 },
  { href: "/settings", label: "Configurações", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const NavLinks = (
    <nav className="flex flex-1 flex-col gap-1 p-3">
      {nav.map(({ href, label, icon: Icon }) => {
        const active =
          pathname === href || (href !== "/dashboard" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-colors min-h-[44px]",
              active
                ? "bg-secondary text-secondary-foreground shadow-sm"
                : "text-primary-foreground/90 hover:bg-white/10"
            )}
          >
            <Icon className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
            {label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <>
      <button
        type="button"
        className="fixed bottom-4 left-4 z-50 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-card md:hidden"
        onClick={() => setOpen(true)}
        aria-label="Abrir menu"
      >
        <Menu className="h-6 w-6" />
      </button>

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-white/10 bg-primary text-primary-foreground shadow-card transition-transform md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Sprout className="h-6 w-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight">AgroOps</p>
            <p className="text-xs text-primary-foreground/70">Gestão rural</p>
          </div>
          <button
            type="button"
            className="ml-auto rounded-lg p-2 hover:bg-white/10 md:hidden"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {NavLinks}
      </aside>

      {open ? (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/40 md:hidden"
          aria-label="Fechar overlay"
          onClick={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
