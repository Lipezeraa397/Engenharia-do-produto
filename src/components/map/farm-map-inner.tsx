"use client";

import "leaflet/dist/leaflet.css";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  useMap,
} from "react-leaflet";
import type { Machine } from "@/types/database";
import { STATUS_COLORS, statusLabel } from "@/lib/machine-styles";
import { useEffect, useMemo } from "react";

type Props = {
  machines: Machine[];
};

function centerFromMachines(machines: Machine[]): [number, number] {
  const valid = machines.filter(
    (m) =>
      typeof m.lat === "number" &&
      typeof m.lng === "number" &&
      !Number.isNaN(m.lat) &&
      !Number.isNaN(m.lng)
  );
  if (valid.length === 0) return [-23.55, -46.63];
  const sum = valid.reduce(
    (acc, m) => ({ lat: acc.lat + m.lat, lng: acc.lng + m.lng }),
    { lat: 0, lng: 0 }
  );
  return [sum.lat / valid.length, sum.lng / valid.length];
}

function MapRecenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom(), { animate: true, duration: 0.35 });
  }, [center, map]);
  return null;
}

export function FarmMapInner({ machines }: Props) {
  const center = useMemo(() => centerFromMachines(machines), [machines]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "min(50vh, 420px)", width: "100%" }}
      className="z-0 rounded-2xl border border-border shadow-card md:[height:420px]"
      scrollWheelZoom
    >
      <MapRecenter center={center} />
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {machines.map((m) => {
        const color = STATUS_COLORS[m.status] ?? "#6b7280";
        return (
          <CircleMarker
            key={m.id}
            center={[m.lat, m.lng]}
            radius={10}
            pathOptions={{
              color,
              fillColor: color,
              fillOpacity: 0.85,
              weight: 2,
            }}
          >
            <Popup>
              <div className="min-w-[160px] space-y-1 text-sm text-foreground">
                <p className="font-semibold">{m.name}</p>
                <p className="text-muted-foreground">
                  Status: {statusLabel(m.status)}
                </p>
                <p className="font-mono text-xs text-muted-foreground">
                  {m.lat.toFixed(5)}, {m.lng.toFixed(5)}
                </p>
              </div>
            </Popup>
          </CircleMarker>
        );
      })}
    </MapContainer>
  );
}
