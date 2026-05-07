import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Configurações
        </h1>
        <p className="text-sm text-muted-foreground">
          Conta e preferências do painel.
        </p>
      </div>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-lg font-semibold text-foreground">Conta</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sessão Supabase Auth (JWT). Perfil estendido na tabela{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">users</code>.
        </p>
        <dl className="mt-4 space-y-2 text-sm">
          <div>
            <dt className="text-muted-foreground">E-mail</dt>
            <dd className="font-medium text-foreground">
              {user?.email ?? "—"}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">ID</dt>
            <dd className="break-all font-mono text-xs text-muted-foreground">
              {user?.id ?? "—"}
            </dd>
          </div>
        </dl>
      </section>

      <section className="rounded-2xl border border-border bg-card p-5 shadow-card">
        <h2 className="text-lg font-semibold text-foreground">Aparência</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Use o botão sol/lua na barra superior para alternar modo claro e
          escuro. Preferência salva no navegador.
        </p>
      </section>
    </div>
  );
}
