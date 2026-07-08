import { Building2, Mail, MapPin } from "lucide-react"

export function AppFooter() {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-none bg-primary flex items-center justify-center">
                <MapPin className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground">SIDPB</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Sistema de Informação de Doenças Parasitárias no Brasil - Plataforma científica para monitoramento epidemiológico de parasitos.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Instituição
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Universidade Federal do Maranhão - UFMA</p>
              <p>Laboratório de Controle de Parasitos</p>
              <p>Centro de Ciências Biológicas e da Saúde</p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Contato
            </h4>
            <div className="text-sm text-muted-foreground space-y-2">
              <p>Av. dos Portugueses, 1966</p>
              <p>Cidade Universitária do Bacanga</p>
              <p>CEP 65080-805, São Luís, MA</p>
              <a href="mailto:contato@sidpb.org.br" className="text-primary hover:underline block mt-2">
                contato@sidpb.org.br
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} SIDPB - Sistema de Informação de Doenças Parasitárias no Brasil. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
