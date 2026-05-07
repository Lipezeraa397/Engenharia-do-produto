import type { MachineStatus } from "@/types/database";

export const STATUS_COLORS: Record<MachineStatus, string> = {
  active: "#3A7D44",
  idle: "#F4C542",
  offline: "#6b7280",
};

export function statusLabel(s: MachineStatus) {
  switch (s) {
    case "active":
      return "Ativo";
    case "idle":
      return "Ocioso";
    case "offline":
      return "Offline";
    default:
      return s;
  }
}
