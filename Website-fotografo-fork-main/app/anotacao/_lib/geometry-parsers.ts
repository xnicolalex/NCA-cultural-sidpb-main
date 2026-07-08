import type { W3CAnnotation, W3CAnnotationBody } from '@annotorious/react';

export interface BoundingBoxData {
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

export function getLabelFromAnnotation(ann: W3CAnnotation): string {
  const body = ann.body;
  if (!body) return 'Sem label';
  if (Array.isArray(body) && body.length > 0) {
    return (body[0] as W3CAnnotationBody)?.value || 'Sem label';
  }
  if (!Array.isArray(body) && body && 'value' in body) {
    return (body as W3CAnnotationBody).value || 'Sem label';
  }
  return 'Sem label';
}

export function parseFragmentSelector(
  value: string
): Omit<BoundingBoxData, 'label'> | null {
  if (!value) return null;
  const match = value.match(
    /xywh=pixel:([\d.]+),([\d.]+),([\d.]+),([\d.]+)/
  );
  if (match) {
    return {
      x: parseFloat(match[1]),
      y: parseFloat(match[2]),
      width: parseFloat(match[3]),
      height: parseFloat(match[4]),
    };
  }
  const fallbackMatch = value.match(/([\d.]+),([\d.]+),([\d.]+),([\d.]+)/);
  if (fallbackMatch) {
    return {
      x: parseFloat(fallbackMatch[1]),
      y: parseFloat(fallbackMatch[2]),
      width: parseFloat(fallbackMatch[3]),
      height: parseFloat(fallbackMatch[4]),
    };
  }
  return null;
}

export function getGeometryFromAnnotation(
  ann: W3CAnnotation
): Omit<BoundingBoxData, 'label'> | null {
  const target = ann.target;
  if (!target) return null;

  if (typeof target === 'object' && target !== null && !Array.isArray(target)) {
    const selector = (target as any).selector;
    if (selector && typeof selector === 'object' && 'value' in selector) {
      return parseFragmentSelector(selector.value as string);
    }
    if ('value' in target && typeof (target as any).value === 'string') {
      return parseFragmentSelector((target as any).value);
    }
  }
  if (typeof target === 'string') {
    return parseFragmentSelector(target);
  }
  return null;
}