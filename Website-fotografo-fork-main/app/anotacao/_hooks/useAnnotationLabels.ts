import { useState, useEffect } from 'react';

const FALLBACK_LABELS = [
  'Bumba-meu-boi',
  'Tambor-de-Crioula',
  'Arquitetura-Historica',
  'Festa-Popular',
  'Cacuriá',
  'Lencois-Maranhenses',
  'Outro',
];

export function useAnnotationLabels() {
  const [availableLabels, setAvailableLabels] = useState<string[]>([]);
  const [selectedLabel, setSelectedLabel] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchLabels = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('/api/dominios');
        if (res.ok) {
          const data = await res.json();
          const labels = data.map((item: any) => item.nome_categoria);
          setAvailableLabels(labels);
          if (labels.length > 0) {
            setSelectedLabel(labels[0]);
          }
        } else {
          setAvailableLabels(FALLBACK_LABELS);
          setSelectedLabel(FALLBACK_LABELS[0]);
        }
      } catch {
        setAvailableLabels(FALLBACK_LABELS);
        setSelectedLabel(FALLBACK_LABELS[0]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLabels();
  }, []);

  return {
    availableLabels,
    selectedLabel,
    setSelectedLabel,
    isLoadingLabels: isLoading,
  };
}