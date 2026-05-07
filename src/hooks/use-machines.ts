"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { Machine } from "@/types/database";

export function useMachines() {
  const supabase = useMemo(() => createClient(), []);
  const [machines, setMachines] = useState<Machine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    const { data, error: qError } = await supabase
      .from("machines")
      .select("*")
      .order("name");
    if (qError) setError(qError.message);
    else {
      setError(null);
      setMachines((data as Machine[]) ?? []);
    }
    setLoading(false);
  }, [supabase]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      await load();
      if (cancelled) return;
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  useEffect(() => {
    const channel = supabase
      .channel("machines-realtime")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "machines" },
        () => {
          load();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [supabase, load]);

  return { machines, loading, error, reload: load };
}
