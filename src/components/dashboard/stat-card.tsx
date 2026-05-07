import { cn } from "@/lib/utils";
import type { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  icon: LucideIcon;
  value: string | number;
  trend?: string;
  className?: string;
};

export function StatCard({
  title,
  subtitle,
  icon: Icon,
  value,
  trend,
  className,
}: Props) {
  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-4 shadow-card transition-shadow duration-200 hover:shadow-card-hover md:p-5",
        className
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {subtitle ? (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          ) : null}
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Icon className="h-5 w-5" aria-hidden />
        </span>
      </div>
      <p className="mt-4 text-2xl font-bold tracking-tight text-foreground md:text-3xl">
        {value}
      </p>
      {trend ? (
        <p className="mt-2 text-xs font-medium text-secondary">{trend}</p>
      ) : null}
    </div>
  );
}
