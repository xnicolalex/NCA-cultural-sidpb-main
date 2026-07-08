import { useState, useCallback } from 'react';
import type { W3CAnnotation } from '@annotorious/react';
import { annotationsToBoundingBoxes } from '../_lib/w3c-converters';

export function useBoundingBoxes(initialAnnotations: W3CAnnotation[] = []) {
  const [annotations, setAnnotations] = useState<W3CAnnotation[]>(initialAnnotations);

  const handleChange = useCallback(
    (
      newAnnotationsOrFn:
        | W3CAnnotation[]
        | ((prev: W3CAnnotation[]) => W3CAnnotation[])
    ) => {
      setAnnotations((prev) => {
        if (typeof newAnnotationsOrFn === 'function') {
          return newAnnotationsOrFn(prev);
        }
        return newAnnotationsOrFn;
      });
    },
    []
  );

  const clearAnnotations = useCallback(() => {
    setAnnotations([]);
  }, []);

  const getBoundingBoxesForAPI = useCallback(() => {
    return annotationsToBoundingBoxes(annotations);
  }, [annotations]);

  const getAnnotationCount = useCallback(() => annotations.length, [annotations]);

  return {
    annotations,
    setAnnotations,
    handleChange,
    clearAnnotations,
    getBoundingBoxesForAPI,
    hasAnnotations: annotations.length > 0,
    getAnnotationCount,
  };
}