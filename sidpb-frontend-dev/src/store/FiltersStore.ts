import { useSyncExternalStore } from "react";

type GeographicLevel = "country" | "state" | "city";

interface FiltersState {
  geographicLevel: GeographicLevel;
  selectedRegion: string | null;
  selectedDiseases: string[];
  selectedVectors: string[];
  selectedHosts: string[];
  visibleLayers: string[];
  showLegend: boolean;
  setGeographicLevel: (level: GeographicLevel) => void;
  setSelectedRegion: (region: string | null) => void;
  toggleDisease: (disease: string) => void;
  toggleLayer: (layerId: string) => void;
  setShowLegend: (show: boolean) => void;
  resetFilters: () => void;
}

type Listener = () => void;

const STORAGE_KEY = "sidpb-filters-storage";

type FilterValues = Pick<
  FiltersState,
  | "geographicLevel"
  | "selectedRegion"
  | "selectedDiseases"
  | "selectedVectors"
  | "selectedHosts"
  | "visibleLayers"
  | "showLegend"
>;

const initialState: FilterValues = {
  geographicLevel: "country",
  selectedRegion: null,
  selectedDiseases: [],
  selectedVectors: [],
  selectedHosts: [],
  visibleLayers: ["occurrences"],
  showLegend: true,
};

let state: FilterValues = initialState;
const listeners = new Set<Listener>();
let cachedSnapshot: FiltersState;

function getPersistedState() {
  if (typeof window === "undefined") return null;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;

    const parsed = JSON.parse(stored) as { state?: Partial<FilterValues> };
    return parsed.state ?? parsed;
  } catch {
    return null;
  }
}

function persistState() {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ state }));
}

function emit(nextState: FilterValues) {
  state = nextState;
  cachedSnapshot = createSnapshot();
  persistState();
  listeners.forEach((listener) => listener());
}

function setState(partial: Partial<FilterValues>) {
  emit({ ...state, ...partial });
}

function ensureHydrated() {
  const persisted = getPersistedState();
  if (persisted) {
    state = { ...state, ...persisted };
    cachedSnapshot = createSnapshot();
  }
}

const actions = {
  setGeographicLevel: (level: GeographicLevel) => setState({ geographicLevel: level }),
  setSelectedRegion: (region: string | null) => setState({ selectedRegion: region }),
  toggleDisease: (disease: string) =>
    setState({
      selectedDiseases: state.selectedDiseases.includes(disease)
        ? state.selectedDiseases.filter((item) => item !== disease)
        : [...state.selectedDiseases, disease],
    }),
  toggleLayer: (layerId: string) =>
    setState({
      visibleLayers: state.visibleLayers.includes(layerId)
        ? state.visibleLayers.filter((item) => item !== layerId)
        : [...state.visibleLayers, layerId],
    }),
  setShowLegend: (show: boolean) => setState({ showLegend: show }),
  resetFilters: () =>
    setState({
      selectedDiseases: [],
      selectedVectors: [],
      selectedHosts: [],
      geographicLevel: "country",
      selectedRegion: null,
    }),
};

function createSnapshot(): FiltersState {
  return { ...state, ...actions };
}

cachedSnapshot = createSnapshot();

const getSnapshot = (): FiltersState => cachedSnapshot;
const getServerSnapshot = getSnapshot;

function subscribe(listener: Listener) {
  ensureHydrated();
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function useFiltersStore(): FiltersState;
export function useFiltersStore<T>(selector: (state: FiltersState) => T): T;
export function useFiltersStore<T>(selector?: (state: FiltersState) => T) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return selector ? selector(snapshot) : snapshot;
}
