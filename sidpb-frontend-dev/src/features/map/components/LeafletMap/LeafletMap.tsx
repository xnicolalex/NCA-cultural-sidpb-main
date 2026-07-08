"use client";

import { useEffect, useMemo, useRef } from "react";
import { MapContainer, Marker, TileLayer, useMap } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import L from "leaflet";
import type { OccurrenceFeatureCollection, Occurrence } from "@/entities/occurrence/occurrence.types";
import { occurrenceFeatureToOccurrence } from "@/entities/occurrence/occurrence.mappers";
import { OccurrenceMarker } from "./OccurrenceMarker";

const defaultIcon = new L.Icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
});

const searchedLocationIcon = new L.Icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png",
  iconRetinaUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  shadowSize: [41, 41],
})

const CLUSTER_MAX_ZOOM = 11;
const SCALE_BAR_WIDTH_PX = 120;
const TILE_SIZE = 256;
const ZOOM_SNAP = 0.25;

type MarkerClusterLike = {
  _map: L.Map;
  getAllChildMarkers: () => L.Marker[];
  getLatLng: () => L.LatLng;
  getBounds: () => L.LatLngBounds;
};

type ClusterClickEvent = L.LeafletMouseEvent & {
  layer: MarkerClusterLike;
};

interface LeafletMapProps {
  zoom?: number;
  mapView: "street" | "satellite"
  center?: [number, number];
  bounds?: [number, number][];
  markerPosition?: [number, number] | null;
  occurrences?: OccurrenceFeatureCollection | null;
  searchQuery?: string;
  onOccurrenceClick?: (occurrence: Occurrence) => void;
  onClusterClick?: (occurrences: Occurrence[]) => void;
  onMouseCoordinateChange?: (coordinate: [number, number] | null) => void;
  onScaleChange?: (scaleKm: number) => void;
  selectedOccurrence?: Occurrence | null;
}

function MapMover({
  center,
  zoom,
  bounds,
}: {
  center?: [number, number];
  zoom: number;
  bounds?: [number, number][];
}) {
  const map = useMap();

  useEffect(() => {
    if (bounds && bounds.length === 2) {
      map.fitBounds(bounds as L.LatLngBoundsExpression, { animate: true, duration: 1.5 });
    } else if (center) {
      map.flyTo(center, zoom, { animate: true, duration: 1.5 });
    }
  }, [center, zoom, bounds, map]);

  return null;
}

function metersPerPixel(latitude: number, zoom: number) {
  return (40075016.686 * Math.cos((latitude * Math.PI) / 180)) / Math.pow(2, zoom + 8);
}

function formatScaleKm(value: number) {
  if (value >= 100) return Math.round(value / 10) * 10;
  if (value >= 10) return Math.round(value);
  return Number(value.toFixed(1));
}

function hasSameCoordinates(occurrences: Occurrence[]) {
  const coordinates = new Set(
    occurrences.map((occurrence) => occurrence.coordinates.join(","))
  );

  return coordinates.size === 1;
}

function getClusterRadiusByZoom(zoom: number) {
  if (zoom <= 4) return 70;
  if (zoom <= 6) return 55;
  if (zoom <= 8) return 42;
  if (zoom <= 10) return 30;

  return 0;
}

function getAdaptiveMinZoom(map: L.Map) {
const mapHeight = map.getSize().y

if (!mapHeight) return 0

const rawMinZoom = Math.log2(mapHeight / TILE_SIZE)

return Math.max(
  0,
  Math.ceil(rawMinZoom / ZOOM_SNAP) * ZOOM_SNAP
)
}

function AdaptiveMinZoom() {
  const map = useMap()

  useEffect(() => {
    function updateMinZoom() {
      map.invalidateSize()

      const nextMinZoom = getAdaptiveMinZoom(map)

      map.setMinZoom(nextMinZoom)

      if (map.getZoom() < nextMinZoom) {
        map.setZoom(nextMinZoom, {
          animate: false,
        })
      }
    }

    updateMinZoom()

    const timeout = window.setTimeout(updateMinZoom, 100)

    map.on("resize", updateMinZoom)

    window.addEventListener("resize", updateMinZoom)

    return () => {
      window.clearTimeout(timeout)
      map.off("resize", updateMinZoom)
      window.removeEventListener("resize", updateMinZoom)
    }
  }, [map])

  return null
}

function MapTelemetry({
  onMouseCoordinateChange,
  onScaleChange,
  onInternalScaleChange,
}: {
  onMouseCoordinateChange?: (coordinate: [number, number] | null) => void;
  onScaleChange?: (scaleKm: number) => void;
  onInternalScaleChange?: (scaleKm: number) => void;
}) {

  const map = useMap();

  useEffect(() => {
    const updateScale = () => {
      const center = map.getCenter();
      const scaleKm = (metersPerPixel(center.lat, map.getZoom()) * SCALE_BAR_WIDTH_PX) / 1000;
      const formattedScaleKm = formatScaleKm(scaleKm);
      onInternalScaleChange?.(formattedScaleKm);
      onScaleChange?.(formattedScaleKm);
    };

    const handleMouseMove = (event: L.LeafletMouseEvent) => {
      onMouseCoordinateChange?.([event.latlng.lat, event.latlng.lng]);
    };

    const handleMouseOut = () => {
      onMouseCoordinateChange?.(null);
    };

    updateScale();
    map.on("mousemove", handleMouseMove);
    map.on("mouseout", handleMouseOut);
    map.on("zoomend moveend", updateScale);

    return () => {
      map.off("mousemove", handleMouseMove);
      map.off("mouseout", handleMouseOut);
      map.off("zoomend moveend", updateScale);
    };
  }, [map, onInternalScaleChange, onMouseCoordinateChange, onScaleChange]);

  return null;
}

export default function LeafletMap({
  zoom = 4,
  center = [-14.235, -51.925],
  bounds,
  markerPosition,
  mapView,
  occurrences,
  onOccurrenceClick,
  onClusterClick,
  onMouseCoordinateChange,
  onScaleChange,
  selectedOccurrence,
}: LeafletMapProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const currentScaleKmRef = useRef(500);
  const occurrenceByMarkerRef = useRef(new WeakMap<L.Marker, Occurrence>());
  const occurrenceMarkers = useMemo(
    () => occurrences?.features.map(occurrenceFeatureToOccurrence) ?? [],
    [occurrences]
  );

  const getClusterOccurrences = (cluster: MarkerClusterLike) => {
    return cluster
      .getAllChildMarkers()
      .map((marker: L.Marker) => occurrenceByMarkerRef.current.get(marker))
      .filter((occurrence: Occurrence | undefined): occurrence is Occurrence =>
        Boolean(occurrence)
      );
  };

  const handleClusterClick = (event: ClusterClickEvent) => {
    const cluster = event.layer;
    const clusterOccurrences = getClusterOccurrences(cluster);

    if (clusterOccurrences.length === 0) return;

    const map = cluster._map;
    const currentZoom = map.getZoom();

    const shouldOpenPanel =
      currentZoom >= CLUSTER_MAX_ZOOM || hasSameCoordinates(clusterOccurrences);

    if (shouldOpenPanel) {
      onClusterClick?.(clusterOccurrences);
      return;
    }

    map.fitBounds(cluster.getBounds(), {
      padding: [48, 48],
      maxZoom: CLUSTER_MAX_ZOOM,
    });
  };

const renderOccurrenceMarker = (occurrence: Occurrence) => (
  <OccurrenceMarker
    key={occurrence.id}
    occurrence={occurrence}
    icon={defaultIcon}
    selectedOccurrence={selectedOccurrence}
    onOccurrenceClick={onOccurrenceClick}
    onMarkerRef={(onMarkerRef) => {
      if (onMarkerRef) {
        occurrenceByMarkerRef.current.set(onMarkerRef, occurrence);
      }
    }}
  />
);

  return (
    <div
      ref={mapContainerRef}
      className="relative h-full w-full overflow-hidden bg-white"
    >
      
      <MapContainer
        center={center}
        zoom={zoom}
        scrollWheelZoom={true}
        zoomControl={false}
        worldCopyJump={true}
        zoomSnap={0.25}
        zoomDelta={0.5}
        className="h-full w-full"
        style={{ height: "100%", width: "100%", zIndex: 0 }}
      >

        <AdaptiveMinZoom />

        {/* <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap={false}
        /> */}

        <TileLayer
          attribution={
            mapView === "satellite"
              ? "Tiles &copy; Esri"
              : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          }
          url={
            mapView === "satellite"
              ? "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              : "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
          noWrap={false}
        />

        <MapMover center={center} zoom={zoom} bounds={bounds} />
        <MapTelemetry
          onMouseCoordinateChange={onMouseCoordinateChange}
          onScaleChange={onScaleChange}
          onInternalScaleChange={(nextScaleKm) => {
            currentScaleKmRef.current = nextScaleKm;
          }}
        />

          {markerPosition && (
            <Marker position={markerPosition} icon={searchedLocationIcon} />
          )}

          <MarkerClusterGroup
            key="clustered"
            chunkedLoading
            showCoverageOnHover={false}
            spiderfyOnMaxZoom
            zoomToBoundsOnClick={false}
            disableClusteringAtZoom={CLUSTER_MAX_ZOOM}
            onClick={handleClusterClick}
            maxClusterRadius={getClusterRadiusByZoom}
          >
            {occurrenceMarkers.map(renderOccurrenceMarker)}
          </MarkerClusterGroup>
      </MapContainer>
    </div>
  );
}
