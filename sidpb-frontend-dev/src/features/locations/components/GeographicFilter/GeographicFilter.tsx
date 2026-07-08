"use client";

import { useState } from "react";
import { useBrazilCities, useBrazilStates } from "@/features/locations/hooks/useBrazilLocations";

interface GeographicFilterProps {
  onLocationChange: (bounds: [number, number][]) => void;
}

export function GeographicFilter({ onLocationChange }: GeographicFilterProps) {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const { data: states } = useBrazilStates();
  const { data: cities } = useBrazilCities(selectedState);

  const handleStateChange = async (uf: string) => {
    setSelectedState(uf);
    setSelectedCity("");

    if (uf === "") {
      onLocationChange([
        [5.27, -73.98],
        [-33.75, -34.79],
      ]);
      return;
    }

    const stateName = states?.find((state) => state.uf === uf)?.name;
    if (!stateName) return;

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?state=${encodeURIComponent(
          stateName
        )}&country=Brazil&format=json`
      );
      const data = await response.json();
      if (data && data.length > 0) {
        const bounds = data[0].boundingbox;
        onLocationChange([
          [Number(bounds[0]), Number(bounds[2])],
          [Number(bounds[1]), Number(bounds[3])],
        ]);
      }
    } catch (err) {
      console.error("Erro ao buscar bounds do estado:", err);
    }
  };

  return (
    <div className="flex gap-2 z-[400] relative mt-2">
      <select
        className="px-3 py-2 border border-border bg-card text-foreground rounded-none text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
        value={selectedState}
        onChange={(event) => handleStateChange(event.target.value)}
      >
        <option value="">Brasil (Pais)</option>
        {(states ?? []).map((state) => (
          <option key={state.id} value={state.uf}>
            {state.name}
          </option>
        ))}
      </select>

      <select
        className="px-3 py-2 border border-border bg-card text-foreground rounded-none text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50"
        value={selectedCity}
        onChange={(event) => setSelectedCity(event.target.value)}
        disabled={!selectedState}
      >
        <option value="">Todos os Municipios</option>
        {(cities ?? []).map((city) => (
          <option key={city.id} value={city.name}>
            {city.name}
          </option>
        ))}
      </select>
    </div>
  );
}
