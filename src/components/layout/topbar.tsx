"use client";

import { Bell, Moon, Search, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

type Props = {
  email?: string | null;
};

export function Topbar({ email }: Props) {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
    router.refresh();
  }

  const dark = mounted && (resolvedTheme === "dark" || theme === "dark");

  return (
    <header className="sticky top-0 z-20 flex flex-wrap items-center gap-3 border-b border-border bg-card/90 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-card/75 md:px-6">
      <div className="relative min-w-0 flex-1 md:max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <label htmlFor="global-search" className="sr-only">
          Buscar
        </label>
        <input
          id="global-search"
          type="search"
          placeholder="Buscar máquinas, produtos..."
          className="h-11 w-full min-h-[44px] rounded-xl border border-border bg-background pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/30"
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <button
          type="button"
          className={cn(
            "inline-flex h-11 min-h-[44px] w-11 items-center justify-center rounded-xl border border-border bg-background text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
          )}
          aria-label="Notificações"
        >
          <Bell className="h-5 w-5" />
        </button>

        <button
          type="button"
          onClick={() => setTheme(dark ? "light" : "dark")}
          className="inline-flex h-11 min-h-[44px] w-11 items-center justify-center rounded-xl border border-border bg-background text-foreground transition hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary/40"
          aria-label={dark ? "Modo claro" : "Modo escuro"}
        >
          {!mounted ? (
            <Sun className="h-5 w-5" />
          ) : dark ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </button>

        <div className="hidden items-center gap-2 rounded-xl border border-border bg-background px-3 py-2 sm:flex">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <User className="h-5 w-5" aria-hidden />
          </span>
          <div className="min-w-0 text-left">
            <p className="truncate text-xs font-medium text-foreground">
              {email ?? "Conta"}
            </p>
            <button
              type="button"
              onClick={handleSignOut}
              className="text-xs text-secondary hover:underline"
            >
              Sair
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
