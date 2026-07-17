"use client";

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import type { W3CAnnotation } from '@annotorious/react';
import { AnnotationSync } from './annotation-sync';
import { withBasePath } from '@/lib/paths';
import '@annotorious/react/annotorious-react.css';

const Annotorious = dynamic(
  () => import('@annotorious/react').then((mod) => mod.Annotorious),
  { ssr: false }
);

const ImageAnnotator = dynamic(
  () => import('@annotorious/react').then((mod) => mod.ImageAnnotator),
  { ssr: false }
);

interface AnnotationCanvasProps {
  imageUrl: string;
  annotations: W3CAnnotation[];
  onAnnotationChange: (
    annotationsOrFn: W3CAnnotation[] | ((prev: W3CAnnotation[]) => W3CAnnotation[])
  ) => void;
  readOnly?: boolean;
  className?: string;
  minHeight?: string;
  onImageLoad?: () => void;
  onImageError?: () => void;
  selectedLabel?: string;
}

export function AnnotationCanvas({
  imageUrl,
  annotations,
  onAnnotationChange,
  readOnly = false,
  className = '',
  minHeight = '400px',
  onImageLoad,
  onImageError,
  selectedLabel = '',
}: AnnotationCanvasProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const resolvedImageUrl = withBasePath(imageUrl);

  // Preload image
  useEffect(() => {
    if (!imageUrl) {
      setIsLoading(false);
      setHasError(true);
      return;
    }

    setIsLoading(true);
    setHasError(false);

    const img = new Image();
    img.src = resolvedImageUrl;

    img.onload = () => {
      setIsLoading(false);
      setHasError(false);
      onImageLoad?.();
    };

    img.onerror = () => {
      setIsLoading(false);
      setHasError(true);
      onImageError?.();
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [resolvedImageUrl, onImageLoad, onImageError]);

  const annotoriousKey = `${resolvedImageUrl}-${readOnly ? 'readonly' : 'editable'}`;

  return (
    <div
      className={`relative w-full bg-black/5 rounded-lg overflow-hidden ${className}`}
      style={{ minHeight }}
      onDragStart={(e) => e.preventDefault()}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center text-muted-foreground text-sm bg-slate-100/50 z-10">
          Carregando imagem...
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center text-red-500 text-sm bg-red-50/80 z-10 p-4 text-center">
          <div>
            <p className="font-medium">Erro ao carregar a imagem</p>
            <p className="text-xs text-muted-foreground">
              Verifique se o arquivo está disponível
            </p>
          </div>
        </div>
      )}

      <Annotorious key={annotoriousKey}>
        <ImageAnnotator drawingEnabled={!readOnly} tool="rectangle">
          <img
            src={resolvedImageUrl}
            alt="Imagem para anotação"
            className="w-full h-auto block"
            draggable={false}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            onLoad={() => {
              setIsLoading(false);
              setHasError(false);
              onImageLoad?.();
            }}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
              onImageError?.();
            }}
            onDragStart={(e) => e.preventDefault()}
          />
        </ImageAnnotator>
        <AnnotationSync
          annotations={annotations}
          onAnnotationChange={onAnnotationChange}
          selectedLabel={selectedLabel}
        />
      </Annotorious>
    </div>
  );
}
