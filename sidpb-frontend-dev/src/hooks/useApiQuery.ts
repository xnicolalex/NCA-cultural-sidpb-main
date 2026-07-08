"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseApiQueryOptions<T> {
  enabled?: boolean;
  fallbackData?: T | (() => T);
  keepPreviousData?: boolean;
}

interface UseApiQueryResult<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

function resolveFallback<T>(fallback?: T | (() => T)) {
  if (typeof fallback === "function") {
    return (fallback as () => T)();
  }

  return fallback ?? null;
}

export function useApiQuery<T>(
  queryKey: readonly unknown[],
  queryFn: (signal: AbortSignal) => Promise<T>,
  options: UseApiQueryOptions<T> = {}
): UseApiQueryResult<T> {
  const { enabled = true, fallbackData, keepPreviousData = true } = options;
  const [data, setData] = useState<T | null>(() => resolveFallback(fallbackData));
  const [isLoading, setIsLoading] = useState(enabled);
  const [error, setError] = useState<Error | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const queryFnRef = useRef(queryFn);
  const fallbackDataRef = useRef(fallbackData);
  const keepPreviousDataRef = useRef(keepPreviousData);
  const stableKey = useMemo(() => JSON.stringify(queryKey), [queryKey]);

  useEffect(() => {
    queryFnRef.current = queryFn;
    fallbackDataRef.current = fallbackData;
    keepPreviousDataRef.current = keepPreviousData;
  }, [fallbackData, keepPreviousData, queryFn]);

  const execute = useCallback(async () => {
    if (!enabled) {
      setIsLoading(false);
      return;
    }

    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setIsLoading(true);
    if (!keepPreviousDataRef.current) setData(resolveFallback(fallbackDataRef.current));

    try {
      const response = await queryFnRef.current(controller.signal);
      setData(response);
      setError(null);
    } catch (err) {
      if (controller.signal.aborted) return;
      setError(err instanceof Error ? err : new Error("Erro desconhecido na requisicao."));
      const fallback = resolveFallback(fallbackDataRef.current);
      if (fallback !== null) setData(fallback);
    } finally {
      if (!controller.signal.aborted) setIsLoading(false);
    }
  }, [enabled]);

  useEffect(() => {
    execute();
    return () => abortRef.current?.abort();
  }, [execute, stableKey]);

  return { data, isLoading, error, refetch: execute };
}
