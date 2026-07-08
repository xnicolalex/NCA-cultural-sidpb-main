"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Plus, X } from "lucide-react";

interface AnnotationToolbarProps {
  onAddBox: () => void;
  onClearAll: () => void;
  selectedLabel: string;
  onLabelChange: (label: string) => void;
  availableLabels: string[];
  annotationCount: number; 
}

export function AnnotationToolbar({
  onClearAll,
  selectedLabel,
  onLabelChange,
  availableLabels,
  annotationCount,
}: AnnotationToolbarProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 p-4 bg-white border rounded-lg">
      <div className="flex items-center gap-2">
        <Label htmlFor="label-select" className="text-sm whitespace-nowrap">
          Label da Caixa:
        </Label>
        <Select value={selectedLabel} onValueChange={onLabelChange}>
          <SelectTrigger id="label-select" className="w-[180px]">
            <SelectValue placeholder="Selecione..." />
          </SelectTrigger>
          <SelectContent>
            {availableLabels.map((label) => (
              <SelectItem key={label} value={label}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {annotationCount > 0 && (
        <Button
          onClick={onClearAll}
          variant="destructive"
          size="sm"
          className="gap-1"
        >
          <X className="h-4 w-4" /> Remover Todas
        </Button>
      )}

      <div className="text-sm text-muted-foreground ml-auto">
        {annotationCount > 0
          ? `${annotationCount} caixa${annotationCount > 1 ? 's' : ''}`
          : 'Clique e arraste na imagem para desenhar'}
      </div>
    </div>
  );
}