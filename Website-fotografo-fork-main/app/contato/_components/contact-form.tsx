"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { apiPath } from "@/lib/paths";

export function ContactForm() {
  const [formData, setFormData] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    if (submitStatus !== "idle") setSubmitStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitStatus("loading");
    try {
      const response = await fetch(apiPath('/api/contato'), { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(formData) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Falha na conexão ao servidor');
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      setSubmitStatus("error");
      setErrorMessage(error.message || "Não foi possível enviar a sua mensagem neste momento. Tente novamente mais tarde.");
    }
  };

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 md:mb-6">Envie uma Mensagem</h2>

      {submitStatus === "success" && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-green-50 p-4 text-green-900 border border-green-200">
          <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm md:text-base">Mensagem enviada com sucesso!</h3>
            <p className="text-xs md:text-sm mt-1 text-green-800">Entraremos em contato em breve através do seu email.</p>
          </div>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mb-6 flex items-start gap-3 rounded-lg bg-red-50 p-4 text-red-900 border border-red-200">
          <AlertCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
          <div>
            <h3 className="font-medium text-sm md:text-base">Ocorreu um erro</h3>
            <p className="text-xs md:text-sm mt-1 text-red-800">{errorMessage}</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
        <div><Label htmlFor="name" className="text-sm md:text-base">Nome Completo</Label><Input id="name" type="text" placeholder="Seu nome" value={formData.name} onChange={handleChange} required disabled={submitStatus === "loading"} className="mt-2 min-h-[44px]" /></div>
        <div><Label htmlFor="email" className="text-sm md:text-base">Email</Label><Input id="email" type="email" placeholder="seu@email.com" value={formData.email} onChange={handleChange} required disabled={submitStatus === "loading"} className="mt-2 min-h-[44px]" /></div>
        <div><Label htmlFor="subject" className="text-sm md:text-base">Assunto</Label><Input id="subject" type="text" placeholder="Sobre o que você quer falar?" value={formData.subject} onChange={handleChange} required disabled={submitStatus === "loading"} className="mt-2 min-h-[44px]" /></div>
        <div><Label htmlFor="message" className="text-sm md:text-base">Mensagem</Label><Textarea id="message" placeholder="Escreva sua mensagem..." value={formData.message} onChange={handleChange} required disabled={submitStatus === "loading"} className="mt-2 min-h-[120px] md:min-h-[150px] p-3" /></div>
        <Button type="submit" size="lg" className="w-full sm:w-auto min-h-[44px]" disabled={submitStatus === "loading"}>
          {submitStatus === "loading" ? (<><Loader2 className="mr-2 h-4 w-4 md:h-5 md:w-5 animate-spin" /> Enviando...</>) : (<><Send className="mr-2 h-4 w-4 md:h-5 md:w-5" /> Enviar Mensagem</>)}
        </Button>
      </form>
    </div>
  );
}
