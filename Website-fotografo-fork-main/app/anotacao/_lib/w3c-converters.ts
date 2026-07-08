import type { W3CAnnotation } from '@annotorious/react';
import { BoundingBoxData, getLabelFromAnnotation, getGeometryFromAnnotation } from './geometry-parsers';

const W3C_CONTEXT = 'http://www.w3.org/ns/anno.jsonld';

//Converte anotações W3C para o formato simplificado da API

export function annotationsToBoundingBoxes(
  annotations: W3CAnnotation[]
): BoundingBoxData[] {
  return annotations
    .map((ann) => {
      const label = getLabelFromAnnotation(ann);
      const geometry = getGeometryFromAnnotation(ann);
      if (!geometry) return null;
      return { label, ...geometry };
    })
    .filter((item): item is BoundingBoxData => item !== null);
}

 //Converte bounding boxes do banco para anotações W3C (para exibição)

export function boundingBoxesToAnnotations(
  boxes: BoundingBoxData[],
  imageUrl: string
): W3CAnnotation[] {
  return boxes.map((box, i) => ({
    '@context': W3C_CONTEXT,
    id: `saved-${i}`,
    type: 'Annotation' as const,
    body: [
      {
        type: 'TextualBody' as const,
        value: box.label,
        purpose: 'tagging' as const,
      },
    ],
    target: {
      source: imageUrl,
      selector: {
        type: 'FragmentSelector' as const,
        conformsTo: 'http://www.w3.org/TR/media-frags/',
        value: `xywh=pixel:${box.x},${box.y},${box.width},${box.height}`,
      },
    },
  }));
}