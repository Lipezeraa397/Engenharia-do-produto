import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/sidebar";
import { Topbar } from "@/components/layout/topbar";

export async function DashboardShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Sidebar />
      <div className="md:pl-64">
        <Topbar email={user?.email} />
        <main className="p-4 pb-24 md:p-6 md:pb-8">{children}</main>
      </div>
    </div>
  );
}
