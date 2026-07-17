import { withBasePath } from "@/lib/paths";

export function AboutContext() {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16 items-start">
          <div>
            <h2 className="font-serif text-2xl md:text-4xl font-bold mb-4 md:mb-6">O Contexto</h2>
            <div className="prose prose-sm md:prose-lg max-w-none">
              <p className="text-muted-foreground leading-relaxed mb-4">O Maranhão possui uma das culturas mais ricas e diversificadas do Brasil. Nosso estado é lar do <strong className="text-foreground">Bumba-meu-boi</strong>, reconhecido pela UNESCO como Patrimônio Cultural Imaterial da Humanidade, do <strong className="text-foreground">Tambor de Crioula</strong>, do Centro Histórico de São Luís com seus azulejos coloniais, das Festas do Divino, e inúmeras outras manifestações que refletem nossa herança indígena, africana e europeia.</p>
              <p className="text-muted-foreground leading-relaxed mb-4">Apesar dessa riqueza, a cultura maranhense sofre com a <strong className="text-foreground">subrepresentação em acervos digitais globais</strong>. Quando pesquisadores, educadores ou desenvolvedores de tecnologia buscam datasets culturais, raramente encontram material adequado sobre o Maranhão.</p>
              <p className="text-muted-foreground leading-relaxed">Este projeto nasce da necessidade de <strong className="text-foreground">documentar, preservar e compartilhar</strong> nossa cultura de forma ética, respeitosa e acessível, garantindo que futuras gerações tenham acesso a esse patrimônio.</p>
            </div>
          </div>
          <div className="relative pb-4 sm:pb-0">
            <div className="rounded-xl overflow-hidden shadow-xl"><img src={withBasePath("/tambor_de_crioula01.jpg")} alt="Tambor de Crioula" className="w-full h-auto" /></div>
            <div className="relative sm:absolute mt-4 sm:mt-0 sm:-bottom-6 sm:-right-6 bg-card border border-border rounded-lg p-5 md:p-6 shadow-lg max-w-full sm:max-w-xs">
              <p className="font-semibold mb-1 md:mb-2 text-sm md:text-base">Impacto Social</p>
              <p className="text-xs md:text-sm text-muted-foreground">Cada imagem contribui para a valorização das comunidades tradicionais e o recognition dos mestres culturais.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
