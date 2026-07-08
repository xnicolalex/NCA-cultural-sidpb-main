"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

interface Dominio {
  id: number;
  nome_categoria: string;
}

interface UseAddImageReturn {
  formData: {
    titulo: string;
    descricao: string;
    municipio: string;
    dominioId: string;
    modeloIa: string;
    promptIa: string;
    detalhesIa: string;
    file: File | null;
    preview: string | null;
    licencaAccepted: boolean;
  };
  setField: <K extends keyof UseAddImageReturn["formData"]>(
    field: K,
    value: UseAddImageReturn["formData"][K]
  ) => void;
  dominios: Dominio[];
  loadingDominios: boolean;
  isSubmitting: boolean;
  handleFileChange: (file: File | null) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
}

export function useAddImage(): UseAddImageReturn {
  const router = useRouter();
  const [dominios, setDominios] = useState<Dominio[]>([]);
  const [loadingDominios, setLoadingDominios] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    titulo: "",
    descricao: "",
    municipio: "",
    dominioId: "",
    modeloIa: "",
    promptIa: "",
    detalhesIa: "",
    file: null as File | null,
    preview: null as string | null,
    licencaAccepted: false,
  });

  useEffect(() => {
    const fetchDominios = async () => {
      setLoadingDominios(true);
      try {
        const res = await fetch("/api/dominios");
        if (res.ok) {
          const data = await res.json();
          setDominios(data);
        } else {
          toast.error("Erro ao carregar categorias.");
        }
      } catch {
        toast.error("Erro de conexão ao carregar categorias.");
      } finally {
        setLoadingDominios(false);
      }
    };
    fetchDominios();
  }, []);

  const setField = useCallback(
    <K extends keyof typeof formData>(field: K, value: (typeof formData)[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleFileChange = useCallback((file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      file,
      preview: file ? URL.createObjectURL(file) : null,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      const { file, titulo, dominioId, modeloIa, promptIa, licencaAccepted } = formData;

      if (!file || !titulo || !dominioId || !modeloIa || !promptIa) {
        toast.error("Preencha todos os campos obrigatórios.");
        return;
      }
      if (!licencaAccepted) {
        toast.error("Você precisa aceitar os termos da licença OpenRAIL-D.");
        return;
      }

      setIsSubmitting(true);
      const formDataToSend = new FormData();
      formDataToSend.append("imagem", file);
      formDataToSend.append("titulo", titulo);
      formDataToSend.append("descricao", formData.descricao);
      formDataToSend.append("municipio", formData.municipio);
      formDataToSend.append("dominioId", dominioId);
      formDataToSend.append("licenca", "OPENRAIL-D");
      formDataToSend.append("origem", "IA_GENERATIVA");
      formDataToSend.append("modelo_ia", modeloIa);
      formDataToSend.append("prompt_ia", promptIa);
      if (formData.detalhesIa) {
        formDataToSend.append("detalhes_ia", formData.detalhesIa);
      }

      try {
        const res = await fetch("/api/upload", { method: "POST", body: formDataToSend });
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.error || "Erro ao enviar imagem.");
        }
        toast.success("Imagem IA enviada com sucesso!");
        router.push("/admin");
      } catch (err: any) {
        toast.error(err.message);
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, router]
  );

  return {
    formData,
    setField,
    dominios,
    loadingDominios,
    isSubmitting,
    handleFileChange,
    handleSubmit,
  };
}