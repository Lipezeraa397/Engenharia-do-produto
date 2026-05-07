import { DashboardPageContent } from "@/components/dashboard/dashboard-page-content";

export default function DashboardPage() {
  return (
    <div className="space-y-2">
      <div className="mb-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">
          Painel
        </h1>
        <p className="text-sm text-muted-foreground md:text-base">
          Visão geral da operação, mapa e indicadores principais.
        </p>
      </div>
      <DashboardPageContent />
    </div>
  );
}
