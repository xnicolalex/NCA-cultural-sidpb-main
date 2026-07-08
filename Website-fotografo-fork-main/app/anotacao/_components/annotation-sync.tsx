"use client";

import { useEffect, useRef } from 'react';
import type { W3CAnnotation } from '@annotorious/react';
import { useAnnotator } from '@annotorious/react';

interface AnnotationSyncProps {
  annotations: W3CAnnotation[];
  onAnnotationChange: (
    annotationsOrFn: W3CAnnotation[] | ((prev: W3CAnnotation[]) => W3CAnnotation[])
  ) => void;
  selectedLabel: string;
}

export function AnnotationSync({
  annotations,
  onAnnotationChange,
  selectedLabel,
}: AnnotationSyncProps) {
  const annotator = useAnnotator();
  const isInternal = useRef(false);
  const loadedRef = useRef(false);
  const idMap = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (!annotator || loadedRef.current) return;
    loadedRef.current = true;

    if (annotations.length > 0 && annotator.addAnnotation) {
      isInternal.current = true;
      idMap.current.clear();

      annotations.forEach((ann) => {
        const { id, ...rest } = ann as any;
        annotator.addAnnotation(rest);
      });

      requestAnimationFrame(() => {
        isInternal.current = false;
      });
    }
  }, [annotator]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (annotations.length === 0 && annotator && !isInternal.current) {
      isInternal.current = true;
      idMap.current.clear();
      if (annotator.clearAnnotations) {
        annotator.clearAnnotations();
      }
      requestAnimationFrame(() => {
        isInternal.current = false;
      });
    }
  }, [annotations.length, annotator]);

  useEffect(() => {
    if (!annotator) return;

    const handleCreate = (annotation: unknown) => {
      const ann = annotation as W3CAnnotation;
      if (isInternal.current) return;

      const internalId = String(ann.id);
      const cleanId = `box-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
      idMap.current.set(internalId, cleanId);

      if (selectedLabel && annotator.updateAnnotation) {
        annotator.updateAnnotation({
          ...ann,
          body: [
            {
              type: 'TextualBody',
              value: selectedLabel,
              purpose: 'tagging',
            },
          ],
        });
      }

      onAnnotationChange((prev: W3CAnnotation[]) => [
        ...prev,
        {
          ...ann,
          id: cleanId,
          body: [
            {
              type: 'TextualBody',
              value: selectedLabel,
              purpose: 'tagging',
            },
          ],
        },
      ]);
    };

    const handleDelete = (annotation: unknown) => {
      const ann = annotation as W3CAnnotation;
      if (isInternal.current) return;

      const internalId = String(ann.id);
      const cleanId = idMap.current.get(internalId) || internalId;
      idMap.current.delete(internalId);

      onAnnotationChange((prev: W3CAnnotation[]) =>
        prev.filter((a) => a.id !== cleanId)
      );
    };

    annotator.on('createAnnotation', handleCreate);
    annotator.on('deleteAnnotation', handleDelete);

    return () => {
      annotator.off('createAnnotation', handleCreate);
      annotator.off('deleteAnnotation', handleDelete);
    };
  }, [annotator, selectedLabel, onAnnotationChange]);

  return null;
}