"use client";

import { useState } from 'react';
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

interface BoundingBoxViewerProps {
  imageUrl: string;
  annotations: W3CAnnotation[];
  className?: string;
  minHeight?: string;
}

export function BoundingBoxViewer({
  imageUrl,
  annotations,
  className = '',
  minHeight = '300px',
}: BoundingBoxViewerProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const resolvedImageUrl = withBasePath(imageUrl);

  const handleNoop = () => {};

  return (
    <div
      className={`relative w-full bg-black/5 rounded-lg overflow-hidden ${className}`}
      style={{ minHeight }}
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

      <Annotorious key={resolvedImageUrl}>
        <ImageAnnotator drawingEnabled={false}>
          <img
            src={resolvedImageUrl}
            alt="Visualização da anotação"
            className="w-full h-auto block"
            draggable={false}
            style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        </ImageAnnotator>
        <AnnotationSync
          annotations={annotations}
          onAnnotationChange={handleNoop}
          selectedLabel=""
        />
      </Annotorious>
    </div>
  );
}
