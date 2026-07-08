import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Licença OpenRAIL-D - Dataset Multimodal Maranhense",
  description: "Licença de Uso de Imagens para Treinamento de Modelos de Inteligência Artificial Generativa.",
};

export default function LicencaOpenRAILPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <SiteHeader />

      <main className="flex-1 container mx-auto px-4 py-8 max-w-4xl">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar ao início
          </Link>
        </div>

        <div className="bg-white rounded-xl border border-border shadow-sm p-6 md:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h1 className="font-serif text-2xl md:text-3xl font-bold">
              Licença OpenRAIL-D
            </h1>
          </div>

          <div className="prose prose-slate max-w-none">
            <p className="text-sm text-muted-foreground mb-6">
              <strong>Versão 1.0</strong> | Regido pela Licença OpenRAIL-D e pela Lei de Direitos Autorais (Lei nº 9.610/1998)
            </p>

            <hr className="my-6" />

            {/* CLÁUSULA PRIMEIRA: DO OBJETO */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA PRIMEIRA: DO OBJETO</h2>
            <p>
              1.1. O presente instrumento tem por objeto a concessão, pelo LICENCIANTE à PLATAFORMA, de licença de uso das imagens fotográficas e/ou obras visuais descritas no Anexo I deste instrumento, denominadas coletivamente IMAGENS, para a finalidade exclusiva descrita na Cláusula Segunda.
            </p>
            <p>
              1.2. O LICENCIANTE declara ser o titular legítimo dos direitos patrimoniais sobre as IMAGENS ou possuir as devidas autorizações e cessões de todos os demais titulares de direitos sobre o conteúdo retratado, incluindo o consentimento de pessoas identificáveis eventualmente presentes nas fotografias, nos termos da Lei nº 13.709/2018 (LGPD) e do Art. 20 do Código Civil Brasileiro.
            </p>
            <p>
              1.3. A presente LICENÇA é concedida em caráter não exclusivo, intransferível e restrito à finalidade estabelecida neste instrumento.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4">
              <p className="text-sm font-semibold text-amber-800">ESCOPO RESTRITO</p>
              <p className="text-sm text-amber-700">
                Esta licença autoriza o uso das IMAGENS EXCLUSIVAMENTE para as finalidades de desenvolvimento de Inteligência Artificial descritas na Cláusula Segunda. Qualquer outro uso, incluindo publicação editorial, publicidade, licenciamento de stock ou reprodução fora do contexto de treinamento de IA, é expressamente vedado.
              </p>
            </div>

            {/* CLÁUSULA SEGUNDA: DA FINALIDADE EXCLUSIVA */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA SEGUNDA: DA FINALIDADE EXCLUSIVA</h2>
            <p>2.1. As IMAGENS são licenciadas exclusivamente para uso nos seguintes processos de desenvolvimento de modelos de Inteligência Artificial generativa pela PLATAFORMA:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Treinamento supervisionado:</strong> uso das IMAGENS como dados de entrada (input) anotados ou não anotados para o aprendizado de padrões visuais por redes neurais, incluindo modelos de geração de imagens, modelos de difusão (diffusion models), modelos autorregressivos e arquiteturas similares;
              </li>
              <li>
                <strong>Treinamento autossupervisionado (self-supervised learning):</strong> uso das IMAGENS em métodos como Masked Autoencoders (MAE), contrastive learning (SimCLR, CLIP, DINO) e outros paradigmas que não requerem anotação humana explícita;
              </li>
              <li>
                <strong>Ajuste fino (fine-tuning) e adaptação de domínio:</strong> uso das IMAGENS para especializar modelos fundacionais pré-treinados ao contexto cultural maranhense, incluindo técnicas como LoRA, DreamBooth e similares;
              </li>
              <li>
                <strong>Aprendizado em contexto (in-context learning e few-shot learning):</strong> uso das IMAGENS como exemplos de referência para adaptar o comportamento de modelos generativos sem atualização de pesos;
              </li>
              <li>
                <strong>Avaliação e benchmarking:</strong> uso das IMAGENS como conjunto de teste ou validação para medir o desempenho de modelos generativos;
              </li>
              <li>
                <strong>Pesquisa e desenvolvimento internos</strong> da PLATAFORMA relacionados à preservação e difusão do patrimônio cultural maranhense por meio de tecnologias de IA.
              </li>
            </ul>

            <p>2.2. É expressamente vedado à PLATAFORMA utilizar as IMAGENS para qualquer finalidade não prevista no item 2.1, especialmente:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Licenciar, sublicenciar, vender ou transferir as IMAGENS a terceiros para qualquer finalidade;</li>
              <li>Utilizar as IMAGENS em campanhas publicitárias, materiais editoriais ou qualquer forma de comunicação comercial;</li>
              <li>Utilizar as IMAGENS para treinar modelos cujo único propósito seja a reprodução fiel ou a substituição comercial da obra original do LICENCIANTE;</li>
              <li>Utilizar as IMAGENS para desenvolver sistemas de vigilância, reconhecimento facial não consentido ou rastreamento de indivíduos;</li>
              <li>Utilizar as IMAGENS para gerar conteúdo que difame, desonre ou cause dano moral ao LICENCIANTE ou às pessoas eventualmente retratadas.</li>
            </ul>

            {/* CLÁUSULA TERCEIRA: DO PRAZO */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA TERCEIRA: DO PRAZO</h2>
            <p>
              3.1. A presente LICENÇA é concedida pelo prazo de <strong>5 (cinco) anos</strong>, contados a partir da data de assinatura deste instrumento, podendo ser renovada mediante acordo expresso entre as partes.
            </p>
            <p>
              3.2. Findo o prazo sem renovação, a PLATAFORMA deverá <strong>cessar imediatamente</strong> qualquer novo uso das IMAGENS para os fins descritos na Cláusula Segunda.
            </p>
            <p>
              3.3. A PLATAFORMA reconhece que modelos de IA já treinados com as IMAGENS durante a vigência desta LICENÇA incorporam os dados de forma estatística e irreversível em seus parâmetros, não sendo tecnicamente possível a remoção retroativa das IMAGENS de modelos já treinados. Tal limitação técnica não constitui violação deste instrumento, desde que os modelos já treinados não sejam submetidos a novos ciclos de treinamento com as IMAGENS após o término da LICENÇA.
            </p>
            <p>
              3.4. Após o término da vigência, a PLATAFORMA poderá continuar a operar, distribuir e disponibilizar os modelos de IA já treinados durante o período de licença, mas não poderá utilizar as IMAGENS em novos treinamentos ou atualizações.
            </p>

            {/* CLÁUSULA QUARTA: DA REMUNERAÇÃO */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA QUARTA: DA REMUNERAÇÃO</h2>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 my-4">
              <p className="font-semibold text-green-800">✓ Licença Gratuita</p>
              <p className="text-sm text-green-700">
                A presente licença é concedida a título gratuito, em reconhecimento ao caráter de interesse público, cultural e acadêmico da PLATAFORMA e de sua missão de preservação do patrimônio imaterial maranhense.
              </p>
            </div>

            {/* CLÁUSULA QUINTA: DOS DIREITOS AUTORAIS E DA TITULARIDADE */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA QUINTA: DOS DIREITOS AUTORAIS E DA TITULARIDADE</h2>
            <p>
              5.1. A presente LICENÇA não implica cessão, transferência ou alienação dos direitos autorais patrimoniais ou morais do LICENCIANTE sobre as IMAGENS. O LICENCIANTE permanece como o titular original e integral de todos os direitos sobre suas obras.
            </p>
            <p>
              5.2. Os direitos morais do LICENCIANTE, nos termos do Art. 24 da Lei nº 9.610/1998, são irrenunciáveis e inalienáveis, permanecendo íntegros independentemente desta LICENÇA.
            </p>
            <p>5.3. A PLATAFORMA reconhece expressamente que:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Os modelos de IA generativa treinados com as IMAGENS são obras derivadas sujeitas a direitos autorais, e não se confundem com as IMAGENS originais;</li>
              <li>A PLATAFORMA é titular dos direitos sobre os modelos de IA por ela desenvolvidos, mas não adquire, por esse motivo, qualquer direito adicional sobre as IMAGENS originais;</li>
              <li>A utilização das IMAGENS para treinamento de IA não confere à PLATAFORMA o direito de reproduzir, publicar ou distribuir as IMAGENS em sua forma original fora do contexto técnico de processamento de dados.</li>
            </ul>

            {/* CLÁUSULA SEXTA: DA ATRIBUIÇÃO DE AUTORIA */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA SEXTA: DA ATRIBUIÇÃO DE AUTORIA</h2>
            <p>
              6.1. Em publicações acadêmicas, artigos técnicos, demonstrações públicas de modelos e qualquer divulgação que faça referência ao dataset utilizado no treinamento, a PLATAFORMA se compromete a citar o LICENCIANTE da seguinte forma:
            </p>
            <blockquote className="border-l-4 border-primary pl-4 py-2 my-2 text-sm text-muted-foreground">
              "Imagens licenciadas por [Nome do Licenciante] para a Plataforma de Colaboração Cultural Maranhense, sob Licença OpenRAIL-D para Treinamento de IA Generativa."
            </blockquote>
            <p>6.2. A obrigação de atribuição prevista no item 6.1 aplica-se a:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Publicações científicas e técnicas que descrevam os modelos treinados com as IMAGENS;</li>
              <li>Documentação pública do dataset disponibilizada pela PLATAFORMA;</li>
              <li>Apresentações em conferências ou eventos nos quais os modelos treinados sejam apresentados.</li>
            </ul>

            {/* CLÁUSULA SÉTIMA: RESTRIÇÕES COMPORTAMENTAIS (OPENRAIL-D) */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA SÉTIMA: RESTRIÇÕES COMPORTAMENTAIS (OPENRAIL-D)</h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-4 my-4">
              <p className="text-sm font-semibold text-red-800">RESTRIÇÕES COMPORTAMENTAIS</p>
              <p className="text-sm text-red-700">
                Esta cláusula incorpora as restrições comportamentais da Licença OpenRAIL-D. Tais restrições acompanham os modelos derivados e devem ser observadas mesmo após o término da vigência desta LICENÇA.
              </p>
            </div>
            <p>7.1. A PLATAFORMA se compromete a não utilizar as IMAGENS, direta ou indiretamente, nem os modelos de IA delas derivados, para:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Gerar, amplificar ou disseminar desinformação, conteúdo falso ou narrativas enganosas sobre a cultura maranhense, sobre o LICENCIANTE ou sobre as pessoas eventualmente retratadas nas IMAGENS;</li>
              <li>Desenvolver ou aprimorar sistemas de vigilância em massa, reconhecimento facial não consentido, rastreamento de indivíduos ou qualquer tecnologia de monitoramento que viole direitos fundamentais;</li>
              <li>Treinar ou aprimorar modelos cujos resultados sejam utilizados para discriminar pessoas com base em raça, etnia, gênero, religião, origem cultural, condição socioeconômica ou qualquer outra característica protegida pela Constituição Federal;</li>
              <li>Desenvolver aplicações que causem dano direto ou indireto às comunidades, grupos culturais ou manifestações do patrimônio imaterial representados nas IMAGENS;</li>
              <li>Criar conteúdo gerado por IA que se passe por obra autêntica do LICENCIANTE sem sua expressa autorização;</li>
              <li>Sublicenciar o acesso às IMAGENS ou aos modelos treinados para terceiros em termos mais permissivos do que os estabelecidos neste instrumento.</li>
            </ul>

            {/* CLÁUSULA OITAVA: PROTEÇÃO DE DADOS E IMAGEM DAS PESSOAS RETRATADAS */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA OITAVA: PROTEÇÃO DE DADOS E IMAGEM DAS PESSOAS RETRATADAS</h2>
            <p>
              8.1. O LICENCIANTE declara ter obtido, nos termos da Lei nº 13.709/2018 (LGPD) e do Art. 20 do Código Civil, o consentimento livre, específico, informado e inequívoco de todas as pessoas identificáveis que apareçam nas IMAGENS para que suas imagens sejam utilizadas no treinamento de modelos de IA generativa.
            </p>
            <p>8.2. O consentimento mencionado no item 8.1 deve contemplar expressamente:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>A coleta e o armazenamento da imagem em dataset destinado a treinamento de IA;</li>
              <li>O uso da imagem como dado de entrada em processos automatizados de aprendizado de máquina;</li>
              <li>A possibilidade de que modelos treinados com a imagem sejam capazes de gerar representações visuais sintéticas influenciadas pelo conjunto de dados do qual a imagem faz parte.</li>
            </ul>

            {/* CLÁUSULA NONA: DA RESCISÃO */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA NONA: DA RESCISÃO</h2>
            <p>9.1. O LICENCIANTE poderá rescindir este instrumento, mediante notificação escrita com antecedência mínima de 30 (trinta) dias, nas seguintes hipóteses:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Descumprimento pela PLATAFORMA de qualquer obrigação prevista neste instrumento;</li>
              <li>Uso das IMAGENS fora das finalidades expressamente autorizadas na Cláusula Segunda;</li>
              <li>Violação das restrições comportamentais previstas na Cláusula Sétima;</li>
              <li>Dissolução ou encerramento das atividades da PLATAFORMA.</li>
            </ul>

            {/* CLÁUSULA DÉCIMA: DAS GARANTIAS E DECLARAÇÕES */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA DÉCIMA: DAS GARANTIAS E DECLARAÇÕES</h2>
            <p>10.1. O LICENCIANTE declara e garante que:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>É o legítimo titular dos direitos patrimoniais sobre as IMAGENS ou possui autorização expressa dos titulares para celebrar este instrumento;</li>
              <li>As IMAGENS não violam direitos autorais, direitos de imagem, direitos de personalidade ou qualquer outro direito de terceiros;</li>
              <li>Não existe qualquer ônus, gravame, litígio ou restrição judicial ou extrajudicial sobre as IMAGENS que impeça ou limite a concessão desta LICENÇA.</li>
            </ul>
            <p>10.2. A PLATAFORMA declara e garante que:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Utilizará as IMAGENS estritamente dentro dos limites desta LICENÇA;</li>
              <li>Adotará medidas técnicas e organizacionais adequadas para proteger as IMAGENS contra acesso não autorizado, perda ou destruição;</li>
              <li>Notificará o LICENCIANTE, no prazo máximo de 72 (setenta e duas) horas, em caso de incidente de segurança que envolva as IMAGENS.</li>
            </ul>

            {/* CLÁUSULA DÉCIMA PRIMEIRA: DISPOSIÇÕES GERAIS */}
            <h2 className="font-serif text-xl font-bold mt-6">CLÁUSULA DÉCIMA PRIMEIRA: DISPOSIÇÕES GERAIS</h2>
            <p>
              11.1. Este instrumento é regido pelas leis da República Federativa do Brasil, em especial a Lei de Direitos Autorais (Lei nº 9.610/1998), a Lei Geral de Proteção de Dados (Lei nº 13.709/2018), o Marco Civil da Internet (Lei nº 12.965/2014) e, quando vigente, o Marco Legal da Inteligência Artificial (PL nº 2338/2023).
            </p>
            <p>
              11.2. Fica eleito o foro da Comarca de São Luís, Estado do Maranhão, com renúncia expressa a qualquer outro, por mais privilegiado que seja, para dirimir quaisquer dúvidas ou litígios decorrentes deste instrumento.
            </p>

            <hr className="my-6" />

            <div className="bg-slate-50 rounded-lg p-4 text-sm text-muted-foreground">
              <p className="font-semibold">ANEXO I: IDENTIFICAÇÃO DAS IMAGENS LICENCIADAS</p>
              <p className="mt-2">
                As imagens licenciadas são aquelas enviadas pelo usuário à Plataforma de Colaboração Cultural Maranhense, conforme descrito no ato de upload e registradas no banco de dados da plataforma.
              </p>
            </div>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Button asChild className="flex-1">
                <Link href="/contribuir">Contribuir com Imagens</Link>
              </Button>
              <Button asChild variant="outline" className="flex-1">
                <Link href="/termos">Voltar aos Termos de Uso</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}