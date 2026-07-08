"use client";

import { Upload } from "lucide-react";

interface ImageUploaderProps {
  preview: string | null;
  onFileChange: (file: File | null) => void;
}

export function ImageUploader({ preview, onFileChange }: ImageUploaderProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">Imagem *</label>
      <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:border-purple-400 transition-colors">
        {preview ? (
          <img src={preview} alt="Preview" className="h-full object-contain rounded-lg" />
        ) : (
          <>
            <Upload className="h-8 w-8 text-slate-400 mb-2" />
            <span className="text-sm text-slate-500">Clique para selecionar</span>
          </>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
          className="hidden"
        />
      </label>
    </div>
  );
}