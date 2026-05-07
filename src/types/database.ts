export type MachineStatus = "active" | "idle" | "offline";

export type Machine = {
  id: string;
  user_id: string;
  name: string;
  status: MachineStatus;
  lat: number;
  lng: number;
  updated_at: string;
};

export type InventoryRow = {
  id: string;
  user_id: string;
  product: string;
  quantity: number;
  updated_at: string;
};

export type UserProfile = {
  id: string;
  full_name: string | null;
  created_at: string;
};
