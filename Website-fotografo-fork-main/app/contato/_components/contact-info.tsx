import { Mail, MapPin, Phone } from "lucide-react";

const contactInfo = [
  { icon: Mail, title: "Email (Rochel)", value: "rochel@nca.ufma.br", link: "mailto:rochel@nca.ufma.br" },
  { icon: Mail, title: "Email (Camilly)", value: "camilly@nca.ufma.br", link: "mailto:camilly@nca.ufma.br" },
  { icon: Phone, title: "Telefone", value: "+55 (98) 98782-5760", link: "tel:+5598987825760" },
  { icon: MapPin, title: "Endereço", value: "NCA Lab, Prédio do CCET - Av. dos Portugueses, 1966 - Vila Bacanga, São Luís - MA, 65080-805", link: null },
];

export function ContactInfo() {
  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl font-bold mb-4 md:mb-6">Informações de Contato</h2>
      <div className="space-y-5 md:space-y-6 mb-8">
        {contactInfo.map((info, index) => (
          <div key={index} className="flex items-start gap-3 md:gap-4">
            <div className="rounded-lg bg-primary/10 p-2 md:p-3 flex-shrink-0"><info.icon className="h-5 w-5 md:h-6 md:w-6 text-primary" /></div>
            <div>
              <p className="font-semibold text-sm md:text-base mb-1">{info.title}</p>
              {info.link ? <a href={info.link} className="text-xs md:text-sm text-muted-foreground hover:text-primary transition-colors block min-h-[24px]">{info.value}</a> : <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{info.value}</p>}
            </div>
          </div>
        ))}
      </div>
      <div className="rounded-xl border border-border bg-card p-5 md:p-6">
        <h3 className="font-semibold text-sm md:text-base mb-3 md:mb-4">Horário de Atendimento</h3>
        <div className="space-y-2 text-xs md:text-sm text-muted-foreground">
          <div className="flex justify-between items-center py-1"><span>Segunda a Sexta:</span><span className="font-medium text-foreground">8h - 18h</span></div>
          <div className="flex justify-between items-center py-1"><span>Sábado e Domingo:</span><span className="font-medium text-foreground">Fechado</span></div>
        </div>
      </div>
    </div>
  );
}