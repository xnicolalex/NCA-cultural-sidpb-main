"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { MarkdownViewer } from "@/components/markdown-viewer"
import { ChevronRight } from "lucide-react"
import { ScrollToTop } from "@/components/scroll-to-top"
import { withBasePath } from "@/lib/paths"

interface Subsection {
  title: string
  content: React.ReactNode
}

interface Chapter {
  num: string
  title: string
  shortTitle: string
  subsections: Subsection[]
}

function EntityCard({ title, description, attributes }: { title: string; description: string; attributes: { name: string; detail: string }[] }) {
  return (
    <div className="bg-neutral-50 border border-border rounded-[1.5rem] md:rounded-2xl p-5 md:p-6 space-y-3 md:space-y-4">
      <div>
        <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#0056A4] font-semibold mb-1">Entidade</p>
        <h4 className="font-black text-base md:text-lg text-foreground font-mono">{title}</h4>
        <p className="text-xs md:text-sm text-muted-foreground mt-1">{description}</p>
      </div>
      <ul className="space-y-2">
        {attributes.map((attr) => (
          <li key={attr.name} className="flex gap-2 md:gap-3 text-xs md:text-sm">
            <span className="font-mono text-[#0056A4] font-semibold flex-shrink-0">{attr.name}</span>
            <span className="text-muted-foreground">{attr.detail}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function StackCard({ label, title, description }: { label: string; title: string; description: string }) {
  return (
    <div className="bg-primary/10 rounded-[1.5rem] md:rounded-2xl p-4 md:p-5 space-y-1.5 md:space-y-2">
      <p className="text-[10px] md:text-xs uppercase tracking-widest text-[#0056A4] font-semibold">{label}</p>
      <p className="font-black text-sm md:text-base text-foreground">{title}</p>
      <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  )
}

const chapters: Chapter[] = [
  {
    num: "01",
    title: "Introdução e Escopo do Projeto",
    shortTitle: "Introdução",
    subsections: [
      {
        title: "1.1. Visão Geral da Plataforma",
        content: (
          <MarkdownViewer content={`
A **Plataforma de Colaboração Cultural Maranhense** é um sistema web desenvolvido para atuar como um repositório científico de *crowdsourcing* (colaboração coletiva). Diferente de plataformas comerciais de hospedagem de imagens, este sistema foi arquitetado com um propósito singular e estrito: a coleta estruturada, licenciada e rastreável de registros iconográficos.

Trata-se do motor de ingestão de dados para a construção de um pré-dataset. A plataforma recebe as contribuições da sociedade, gerencia o fluxo de consentimento legal (adequação à LGPD e gestão de Direitos Autorais) e armazena os arquivos físicos e seus metadados de forma relacional. Esses dados brutos são mantidos em ambiente seguro e isolado, aguardando as etapas subsequentes de curadoria e validação por pares.
          `} />
        ),
      },
      {
        title: "1.2. Objetivos Científicos e Culturais",
        content: (
          <MarkdownViewer content={`
A concepção deste sistema surge para mitigar um problema latente na área de Inteligência Artificial: a sub-representação regional em grandes conjuntos de dados multimodais (como o LAION-5B e o MS-COCO). Esses datasets globais carecem de dados autênticos e contextualmente ricos sobre o Sul Global e, especificamente, sobre o patrimônio cultural do Maranhão.

> O objetivo científico primário desta plataforma é viabilizar a **Construção e Anotação** de um dataset de alta fidelidade. Os dados estruturados serão utilizados para o treinamento e *fine-tuning* de modelos de IA Generativa de difusão, como o *Stable Diffusion*.

Do ponto de vista cultural, o sistema restringe-se a catalogar domínios culturais inerentes ao Maranhão, englobando o Bumba Meu Boi, o Tambor de Crioula, a culinária típica, a arquitetura histórica, entre outros.
          `} />
        ),
      },
      {
        title: "1.3. Atores e Stakeholders do Sistema",
        content: (
          <MarkdownViewer content={`
O ecossistema é composto por dois grupos principais de atores:

- **Gestores e Controladores (Equipe de Pesquisa):** O sistema é gerenciado conjuntamente pela **UFMA**, através do **NCA**. Esta instituição figura como Controladora dos Dados, responsáveis pela infraestrutura, segurança e curadoria do dataset acadêmico.

- **Colaboradores Voluntários (Titulares e Autores):** O público em geral, fotógrafos, pesquisadores e entusiastas da cultura maranhense. O colaborador detém autonomia sobre seus dados e é o responsável legal primário pelas obras que submete, cedendo direitos via licenças Creative Commons.
          `} />
        ),
      },
    ],
  },
  {
    num: "02",
    title: "Arquitetura do Sistema e Infraestrutura",
    shortTitle: "Arquitetura",
    subsections: [
      {
        title: "2.1. Ambiente de Desenvolvimento e Produção (Conteinerização)",
        content: (
          <MarkdownViewer content={`
Toda a arquitetura é baseada em contêineres utilizando o ecossistema **Docker**. A orquestração dos múltiplos serviços é gerenciada via \`docker-compose\`, conferindo portabilidade, isolamento de processos e facilidade de *deploy*.

> Em vez de instalações locais tradicionais que geram conflitos de dependências, o sistema constrói suas próprias imagens a partir de um Dockerfile customizado, garantindo que a aplicação seja sempre instanciada com as versões exatas definidas na engenharia inicial do projeto.
          `} />
        ),
      },
      {
        title: "2.2. Stack Tecnológica",
        content: (
          <div className="space-y-4">
            <MarkdownViewer content={`A seleção tecnológica concilia um sistema relacional robusto com uma interface de usuário ágil e moderna:`} />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              <StackCard label="Banco de Dados" title="PostgreSQL + PostGIS" description="Conformidade ACID, integridade referencial rígida e suporte à extensão espacial PostGIS para análises geográficas futuras da iconografia." />
              <StackCard label="Frontend" title="Tailwind CSS" description="Framework utility-first com uso avançado de valores arbitrários (como bg-[url(...)]) para carregamento dinâmico de texturas e padronagens regionais." />
              <StackCard label="Backend" title="Servidor de Aplicação" description="Núcleo lógico responsável pelas APIs, regras de negócio, autenticação, hashing de senhas e sanitização dos uploads multimídia." />
            </div>
          </div>
        ),
      },
      {
        title: "2.3. Topologia de Implantação e Persistência",
        content: (
          <MarkdownViewer content={`
- **Inicialização Automatizada:** O fluxo de *deploy* utiliza o diretório \`/docker-entrypoint-initdb.d/\` do PostgreSQL. Ao iniciar pela primeira vez, o script DDL \`01_tabelas_mvp.sql\` é executado automaticamente, construindo todo o esquema relacional sem intervenção manual.

- **Mapeamento de Volumes:** O \`docker-compose.yml\` declara volumes persistentes que separam estritamente os arquivos binários (imagens em disco) dos seus metadados e caminhos no PostgreSQL.

- **Isolamento de Redes (Least Privilege):** Apenas as portas da aplicação (80/443) são expostas à internet pública. O PostgreSQL opera enclausurado em uma rede interna Docker, incomunicável a partir do exterior.
          `} />
        ),
      },
    ],
  },
  {
    num: "03",
    title: "Modelagem de Banco de Dados",
    shortTitle: "Banco de Dados",
    subsections: [
      {
        title: "3.1. Princípios de Modelagem (Privacy by Design)",
        content: (
          <MarkdownViewer content={`
A modelagem foi concebida sob o paradigma do **Privacy by Design**. Em conformidade com o Princípio da Minimização da LGPD, o esquema não armazena nenhum dado sensível e coleta o mínimo absoluto necessário para garantir a rastreabilidade e a autoria jurídica das contribuições.

> A separação lógica entre dados identificadores (Tabela USUARIO) e os dados científicos (Tabela REGISTRO_ICONOGRAFICO) garante que as exportações do dataset para treinamento de IA possam isolar completamente a identidade do usuário.
          `} />
        ),
      },
      {
        title: "3.2. Entidades e Atributos (Dicionário de Dados)",
        content: (
          <div className="space-y-4">
            <MarkdownViewer content={`O Modelo de Entidade-Relacionamento (MER) físico é traduzido nas seguintes entidades fortes:`} />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <EntityCard title="USUARIO" description="Gerencia o ciclo de vida da autenticação e identificação." attributes={[{ name: "ID_USUARIO", detail: "Primary Key, identificador único universal." }, { name: "NOME", detail: "Atribuição de crédito na licença CC BY 4.0." }, { name: "EMAIL", detail: "Restrição UNIQUE, atua como credencial de login." }, { name: "STATUS_CONTA", detail: "Controle de estado (Ativa/Inativa)." }, { name: "SENHA", detail: "Armazenada obrigatoriamente em hash criptográfico." }]} />
              <EntityCard title="REGISTRO_ICONOGRAFICO" description="Núcleo científico do sistema, a peça informacional do dataset." attributes={[{ name: "ID_REGISTRO", detail: "Primary Key." }, { name: "URL", detail: "Caminho relativo para o arquivo binário da imagem." }, { name: "TITULO / DESCRICAO", detail: "Contexto semântico para treinamento da IA." }, { name: "MUNICIPIO", detail: "Localização geográfica da manifestação cultural." }, { name: "CATEGORIA_SUGERIDA", detail: "Tipificação cultural preliminar pelo colaborador." }, { name: "LICENCA", detail: "Restrição via Constraint (CC BY 4.0 ou CC0)." }, { name: "METADADOS", detail: "Coluna JSONB para dados EXIF flexíveis." }]} />
              <EntityCard title="TERMOS_DE_USO" description="Garante o versionamento histórico do contrato de licenciamento autoral." attributes={[{ name: "ID_TERMO", detail: "Primary Key." }, { name: "VERSAO", detail: "Identificador da versão do contrato." }, { name: "DATA_VIGENCIA", detail: "Timestamp de entrada em vigor da versão." }, { name: "CONTEUDO", detail: "Texto legal estruturado do termo." }]} />
              <EntityCard title="POLITICA_DE_PRIVACIDADE" description="Versiona as regras de tratamento de dados pessoais (transparência LGPD)." attributes={[{ name: "ID_POLITICA", detail: "Primary Key." }, { name: "VERSAO", detail: "Identificador da versão da política." }, { name: "DATA_VIGENCIA", detail: "Controle cronológico das atualizações." }, { name: "CONTEUDO", detail: "Regras de coleta, armazenamento e anonimização." }]} />
            </div>
          </div>
        ),
      },
      {
        title: "3.3. Relacionamentos e Manutenção da Integridade",
        content: (
          <MarkdownViewer content={`
- **[USUARIO] N — ACEITA — N [TERMOS DE USO]:** Relacionamento N:N que gera a tabela associativa \`USUARIO_ACEITE_TERMO\`, capturando o timestamp exato do consentimento via \`DATA_ACEITE\`.

- **[USUARIO] N — ACEITA — N [POLITICA DE PRIVACIDADE]:** Trilha de Auditoria LGPD. Gera a tabela \`USUARIO_ACEITE_POLITICA\`, garantindo granularidade de consentimento por versão da política.

- **[USUARIO] 1 — ENVIA — N [REGISTRO ICONOGRAFICO]:** Relacionamento um-para-muitos. A chave primária \`ID_USUARIO\` migra para a entidade de registros como Foreign Key, estabelecendo a autoria.

> A chave estrangeira é projetada **SEM ON DELETE CASCADE**. Ao solicitar exclusão, o banco executa um Hard Delete na tabela USUARIO e um Trigger aplica \`SET NULL\` ou anonimiza os registros órfãos, preservando o dataset e cumprindo o direito ao esquecimento da LGPD simultaneamente.
          `} />
        ),
      },
    ],
  },
  {
    num: "04",
    title: "Fluxos de Usuário e Regras de Negócio",
    shortTitle: "Fluxos de Usuário",
    subsections: [
      {
        title: "4.1. Módulo de Autenticação e Cadastro",
        content: (
          <MarkdownViewer content={`
O fluxo de entrada foi desenhado para ser o mais enxuto possível, minimizando a fricção sem comprometer a rigidez legal exigida pelo projeto.

- **Coleta de Dados:** O formulário coleta apenas Nome, E-mail e Senha, o mínimo estipulado na modelagem.

- **Ato Inequívoco de Consentimento:** O formulário apresenta *checkboxes* desmarcados por padrão para os Termos de Uso e para a Política de Privacidade. Ambos precisam ser ativados.

- **Registro Relacional do Aceite:** O backend executa uma transação atômica: insere na tabela USUARIO, recupera o \`ID_USUARIO\` gerado e insere duas tuplas nas tabelas associativas, cravando o \`timestamp\` e o identificador das versões legais vigentes naquele segundo.
          `} />
        ),
      },
      {
        title: "4.2. Módulo de Submissão (Upload Flow)",
        content: (
          <MarkdownViewer content={`
- **Ingestão de Arquivo e Metadados:** O usuário seleciona a imagem física. O sistema extrai os metadados EXIF embarcados, populando a coluna JSONB com Data da Foto, Origem, Tamanho e Resolução.

- **Enriquecimento Semântico (Anotação):** O colaborador preenche Título, Descrição, Local e Categoria Sugerida, formando os pares "imagem-texto" essenciais para o treinamento multimodal.

- **Declaração de Licenciamento (Open Data):** Uma regra imperativa exige que o usuário declare autoria e escolha a licença via *radio buttons* exclusivos: **CC0 1.0** ou **CC BY 4.0**.
          `} />
        ),
      },
      {
        title: "4.3. Módulo de Curadoria e Ciclo de Vida do Dado",
        content: (
          <MarkdownViewer content={`
- **Estado de Quarentena (Latência):** Ao entrar no banco, a imagem não vai imediatamente para o dataset público. Ela repousa em "estado de quarentena" aguardando acesso exclusivo da equipe de curadoria do projeto.

- **Exportação e Validação por Pares:** A validação se dará externamente, onde especialistas avaliarão o peso representativo, qualidade técnica e aderência da categoria cultural para o treinamento da IA.

- **Rejeição Silenciosa:** Caso a imagem viole regras ou fuja do escopo cultural, ela é rejeitada silenciosamente, o usuário não recebe notificação. A contribuição simplesmente não é exportada para o dataset curado, poupando overhead de processamento.
          `} />
        ),
      },
    ],
  },
  {
    num: "05",
    title: "Conformidade Legal e Segurança",
    shortTitle: "LGPD & Segurança",
    subsections: [
      {
        title: "5.1. Minimização de Dados e Finalidade da Coleta",
        content: (
          <MarkdownViewer content={`
Toda a arquitetura foi orientada pelo **Princípio da Minimização de Dados (Art. 6º, inciso III da LGPD)**. Cada campo possui justificativa técnica e legal estrita:

- **Nome:** Exclusivamente para garantir os direitos morais do autor e a atribuição de créditos (licença CC BY 4.0).

- **E-mail e Senha:** Utilizados estritamente para criação da credencial de acesso, validação de identidade e contato administrativo. A senha jamais é visível em texto plano.

- Nenhuma informação biométrica, rastreador de marketing ou dado sensível (raça, religião) é solicitado na plataforma.
          `} />
        ),
      },
      {
        title: "5.2. Gestão de Logs e Marco Civil da Internet",
        content: (
          <MarkdownViewer content={`
Para garantir conformidade com o **Marco Civil da Internet (Lei nº 12.965/2014)**:

- **Retenção Obrigatória:** O backend registra automaticamente logs de acesso (IP, data e hora da conexão e submissão).

- **Ciclo de Vida do Log:** Mantidos por período mínimo legal de 6 meses para rastreabilidade em caso de incidentes. Após esse prazo, podem ser descartados se não houver demanda legal.
          `} />
        ),
      },
      {
        title: "5.3. O Direito ao Esquecimento e a Danger Zone",
        content: (
          <MarkdownViewer content={`
A plataforma concilia o direito de apagar dados (Art. 18 da LGPD) com a necessidade de manter a integridade da pesquisa científica (Art. 16 da LGPD) através de dois mecanismos protegidos por modais de confirmação:

- **Inativar Conta:** Ação reversível. O atributo \`STATUS_CONTA\` é alterado para \`'Inativo'\`. O usuário perde o acesso, mas seus dados permanecem intactos.

- **Deletar Conta (Hard Delete + Anonimização):** Ação definitiva. O sistema executa Hard Delete na tabela USUARIO (apagando Nome, E-mail e Senha) e em seguida um Update transacional converte a autoria de todas as imagens para "Usuário Anônimo" ou aplica \`SET NULL\` na FK, quebrando irreversivelmente o vínculo pessoa-dado, retirando o registro do escopo da LGPD.
          `} />
        ),
      },
      {
        title: "5.4. Segurança da Informação",
        content: (
          <MarkdownViewer content={`
- **Criptografia em Repouso:** Senhas armazenadas via algoritmos fortes de *hashing* com *salt* criptográfico. Nunca em texto plano.

- **Segurança em Trânsito:** Comunicação exclusivamente via HTTPS/TLS entre o navegador e o servidor.

- **Isolamento de Banco de Dados:** PostgreSQL operando em rede interna Docker, sem portas expostas à internet pública.
          `} />
        ),
      },
    ],
  },
  {
    num: "06",
    title: "Licenciamento e Gestão de Direitos de Autor",
    shortTitle: "Licenciamento",
    subsections: [
      {
        title: "6.1. Modelos de Licença Implementados",
        content: (
          <div className="space-y-4">
            <MarkdownViewer content={`O sistema restringe o licenciamento a dois modelos estandardizados globais, abolindo o uso de copyright fechado:`} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4 pt-2">
              <div className="bg-primary/10 rounded-[1.5rem] md:rounded-2xl p-4 md:p-5 space-y-1.5 md:space-y-2">
                <p className="font-semibold text-foreground text-sm">Creative Commons Atribuição 4.0 (CC BY 4.0)</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">Permite que a plataforma e terceiros copiem, redistribuam e adaptem a imagem para qualquer fim, inclusive comercial. Única exigência: manutenção do crédito de autoria.</p>
              </div>
              <div className="bg-primary/10 rounded-[1.5rem] md:rounded-2xl p-4 md:p-5 space-y-1.5 md:space-y-2">
                <p className="font-semibold text-foreground text-sm">Dedicação ao Domínio Público (CC0 1.0)</p>
                <p className="text-xs md:text-sm text-muted-foreground leading-relaxed">O colaborador abdica, na máxima extensão permitida por lei, de todos os direitos autorais, reduzindo a complexidade de rastreamento em grandes arquiteturas de Machine Learning.</p>
              </div>
            </div>
          </div>
        ),
      },
      {
        title: "6.2. Declaração de Autoria e Trilha de Auditoria",
        content: (
          <MarkdownViewer content={`
O mecanismo de submissão atua como um contrato vinculativo, nenhum upload ocorre sem:

- Interação com componentes de interface (radio buttons ou checkboxes) atestando autoria legítima.

- Consolidação no banco da junção: \`ID_USUARIO\` + \`DATA_UPLOAD\` + \`LICENCA\`, criando uma trilha de auditoria que isenta a plataforma (NCA - UFMA) de responsabilidade direta por violações de direitos de terceiros.
          `} />
        ),
      },
      {
        title: "6.3. Impacto na Viabilidade para IA",
        content: (
          <MarkdownViewer content={`
> Como 100% das imagens submetidas passam pelo funil obrigatório de licenciamento aberto (CC BY 4.0 ou CC0), o dataset final gerado após a curadoria nasce juridicamente "limpo", sem risco de litígios por violação de propriedade intelectual no treinamento das redes neurais.

Pesquisadores e empresas que consumirem o repositório para *fine-tuning* de modelos de difusão terão total segurança legal de que o material pode ser processado sem restrições.
          `} />
        ),
      },
    ],
  },
  {
    num: "07",
    title: "Estrutura do Dataset e Viabilidade para IA",
    shortTitle: "Dataset & IA",
    subsections: [
      {
        title: "7.1. Formato de Saída e Construção dos Pares (Imagem-Texto)",
        content: (
          <MarkdownViewer content={`
Modelos de IA não consomem bancos SQL diretamente. As rotinas de exportação transformam a estrutura relacional no formato padrão da indústria de *Machine Learning*: **pares de imagem-texto**.

Os arquivos físicos das fotografias são organizados em diretórios e empacotados com arquivos tabulares (JSON ou CSV) contendo as "legendas" (*captions*) formadas pela concatenação de TITULO, DESCRICAO e MUNICIPIO, enriquecidas pelos METADADOS de origem, preparando o terreno ideal para ingestão em frameworks de treinamento de redes neurais.
          `} />
        ),
      },
      {
        title: "7.2. Taxonomia Cultural e Mitigação de Alucinações",
        content: (
          <MarkdownViewer content={`
A viabilidade do dataset para mitigar a sub-representação do Sul Global depende diretamente da qualidade semântica dos dados. A plataforma é regida por um rigoroso **Mapeamento Iconográfico e Terminológico**. O atributo CATEGORIA_SUGERIDA guia a categorização para domínios culturais como:

- Bumba Meu Boi — complexidades visuais e indumentárias.
- Tambor de Crioula — dinâmica e instrumentos.
- Culinária Típica maranhense.
- Arquitetura Histórica secular (casarões, azulejos).

> Esta taxonomia restrita assegura que os elementos visuais sejam corretamente rotulados, prevenindo que a IA gere "alucinações" ou reproduza estereótipos visuais incorretos sobre a cultura local durante o fine-tuning.
          `} />
        ),
      },
    ],
  },
  {
    num: "08",
    title: "Interface de Usuário (UI/UX) e Componentes",
    shortTitle: "UI/UX",
    subsections: [
      {
        title: "8.1. Design System e Estilização (Tailwind CSS)",
        content: (
          <MarkdownViewer content={`
O frontend foi construído com **Tailwind CSS**. O projeto faz uso avançado do recurso de "valores arbitrários" para aumentar a imersão cultural, classes dinâmicas de injeção de *background* como \`bg-[url('/caminho/imagem.jpg')]\` carregam padronagens e texturas regionais (azulejos, indumentárias) diretamente nos componentes, enriquecendo o aspecto visual sem comprometer a performance.
          `} />
        ),
      },
      {
        title: "8.2. Hierarquia de Navegação e CTAs",
        content: (
          <MarkdownViewer content={`
A UX foi projetada para focar na utilidade e na redução do tempo de tela, direcionando o colaborador imediatamente para a ação principal:

- **Ação Primária (CTA):** Botão sólido (fundo preto, texto branco) intitulado "NOVA CONTRIBUIÇÃO" ou "ENVIAR IMAGEM", motor do sistema, guiando o voluntário diretamente para a rota de upload.

- **Ação Secundária (Logout):** Botão de estilo *outline* para encerramento seguro da sessão, sem competir visualmente com o CTA principal.
          `} />
        ),
      },
      {
        title: "8.3. Modais de Confirmação e a Danger Zone",
        content: (
          <MarkdownViewer content={`
A **Danger Zone** é a representação visual direta do cumprimento da LGPD no frontend. Nenhuma das ações destrutivas (Inativar ou Deletar conta) possui execução direta.

> No caso específico da deleção, o modal possui caráter educativo e legal: explica que dados pessoais serão apagados permanentemente, mas as imagens previamente submetidas sob licenciamento aberto serão mantidas de forma anonimizada para preservar a integridade do dataset científico.
          `} />
        ),
      },
    ],
  },
  {
    num: "09",
    title: "Próximos Passos e Escalabilidade",
    shortTitle: "Próximos Passos",
    subsections: [
      {
        title: "9.1. Evolução Multimodal",
        content: (
          <MarkdownViewer content={`
O MVP foca na captação de dados iconográficos, mas o banco foi concebido para expansão fluida. A adoção de atributos JSONB garante capacidade de indexar novos tipos de mídia no futuro, amostras de áudio (toadas de Bumba Meu Boi), registros em vídeo (coreografias do Tambor de Crioula) ou compilações de texto puro, sem reestruturação severa do MER.

À medida que o projeto escalar, a arquitetura modular baseada em Docker facilitará a transição do armazenamento em disco local para soluções robustas de **Object Storage** (AWS S3, MinIO ou equivalentes gerenciados pelo NCA), garantindo alta disponibilidade.
          `} />
        ),
      },
      {
        title: "9.2. Módulo de Curadoria e APIs de Consumo",
        content: (
          <MarkdownViewer content={`
- **Módulo de Validação e Curadoria:** Desenvolvimento de interface e regras de negócio para Validação Cultural. Especialistas e curadores acessarão um painel de *peer-review* com sistema de votação ponderada para aprovar ou descartar submissões em estado de quarentena.

- **Endpoints de Consumo (API RESTful):** Criação de rotas programáticas seguras para que sistemas de Machine Learning, pesquisadores independentes e instituições tecnológicas possam consultar, filtrar e extrair o dataset curado, respeitando as licenças CC BY 4.0 e CC0 1.0 atribuídas pelos usuários originais.
          `} />
        ),
      },
    ],
  },
]

function SubsectionCard({ subsection }: { subsection: Subsection }) {
  return (
    <div className="bg-white rounded-2xl md:rounded-[2rem] shadow-sm hover:shadow-md transition-shadow duration-300 px-6 py-8 md:px-8 md:py-8">
      <h3 className="font-black text-base md:text-lg text-foreground mb-4 md:mb-5">{subsection.title}</h3>
      {subsection.content}
    </div>
  )
}

export default function DocumentacaoTecnicaPage() {
  const [activeChapter, setActiveChapter] = useState(0)
  const chapter = chapters[activeChapter]

  return (
    <main className="min-h-screen bg-background">
      <ScrollToTop />
      <SiteHeader />

      <section className="relative min-h-[35vh] md:min-h-[45vh] flex items-center justify-center bg-neutral-50 overflow-hidden">
        <img src={withBasePath("/azulejossite.svg")} alt="" aria-hidden="true" className="hidden sm:block absolute top-0 left-0 w-64 md:w-96 pointer-events-none opacity-80 z-0" />
        <img src={withBasePath("/azulejossite.svg")} alt="" aria-hidden="true" className="hidden sm:block absolute bottom-0 right-0 w-64 md:w-96 pointer-events-none rotate-180 opacity-80 z-0" />

        <div className="relative z-10 text-center space-y-4 md:space-y-5 px-4 sm:px-6">
          <p className="text-[10px] md:text-xs uppercase tracking-widest text-muted-foreground font-medium">Versão 1.0 - NCA - UFMA</p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-normal text-foreground leading-[0.95] text-balance">Documentação Técnica</h1>
          <p className="text-sm md:text-lg text-muted-foreground max-w-lg mx-auto leading-relaxed">Arquitetura, modelagem de dados, fluxos de usuário, conformidade legal e diretrizes científicas da plataforma.</p>
          <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 pt-2 text-[10px] md:text-xs text-muted-foreground/60">
            <span>9 seções</span>
            <span className="h-1 w-1 rounded-full bg-muted-foreground/40 hidden sm:block" />
            <span className="w-full sm:w-auto text-center">Plataforma de Colaboração Cultural Maranhense</span>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="container mx-auto px-4 md:px-8 py-10 md:py-20 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6 md:gap-10">

            <aside className="hidden lg:block">
              <div className="sticky top-24 bg-white rounded-[2rem] shadow-lg p-6">
                <p className="text-xs uppercase tracking-widest text-muted-foreground font-semibold mb-4">Seções</p>
                <nav className="flex flex-col gap-1">
                  {chapters.map((ch, index) => (
                    <button key={ch.num} onClick={() => setActiveChapter(index)} className={`flex items-center gap-3 text-sm px-3 py-2 rounded-xl border-l-2 transition-all duration-150 text-left w-full min-h-[44px] ${activeChapter === index ? "border-[#0056A4] bg-primary/10 text-[#0056A4] font-semibold" : "border-transparent text-muted-foreground hover:bg-primary/10 hover:text-[#0056A4] hover:border-[#0056A4]"}`}>
                      <span className="text-xs text-muted-foreground/40 font-mono flex-shrink-0">{ch.num}</span>
                      <span>{ch.shortTitle}</span>
                      {activeChapter === index && <ChevronRight className="ml-auto h-3 w-3 flex-shrink-0" />}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>

            <div className="flex flex-col gap-5 md:gap-6">
              <div className="bg-white rounded-[1.5rem] md:rounded-[3rem] shadow-lg px-6 py-6 md:px-10 md:py-10">
                <div className="flex items-start gap-3 md:gap-4">
                  <span aria-hidden="true" className="font-serif text-4xl md:text-6xl font-normal leading-none text-primary/10 select-none flex-shrink-0">{chapter.num}</span>
                  <h2 className="font-black text-2xl md:text-3xl text-foreground pt-1 md:pt-2">{chapter.title}</h2>
                </div>
              </div>

              {chapter.subsections.map((sub) => (
                <SubsectionCard key={sub.title} subsection={sub} />
              ))}

              <div className="flex flex-col sm:flex-row justify-between gap-3 md:gap-4 pt-2">
                <Button variant="outline" className="w-full sm:flex-1 min-h-[44px]" onClick={() => setActiveChapter((prev) => Math.max(0, prev - 1))} disabled={activeChapter === 0}>← Seção Anterior</Button>
                <Button className="w-full sm:flex-1 bg-black text-white min-h-[44px]" onClick={() => setActiveChapter((prev) => Math.min(chapters.length - 1, prev + 1))} disabled={activeChapter === chapters.length - 1}>Próxima Seção →</Button>
              </div>

              {activeChapter === chapters.length - 1 && (
                <div className="bg-neutral-900 rounded-[1.5rem] md:rounded-[3rem] p-6 md:px-10 md:py-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-5 md:gap-6 mt-4">
                  <div>
                    <h3 className="font-serif text-xl md:text-2xl text-white mb-1">Dúvidas técnicas sobre a plataforma?</h3>
                    <p className="text-xs md:text-sm text-neutral-400">Entre em contato com a equipe.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto flex-shrink-0">
                    <Button size="lg" className="w-full sm:w-auto bg-white text-neutral-900 hover:bg-neutral-100 rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-base font-semibold transition-all min-h-[44px]" asChild>
                      <Link href="/contato">Falar com a Equipe</Link>
                    </Button>
                    <Button size="lg" variant="outline" className="w-full sm:w-auto border-white/30 text-white hover:bg-white/10 rounded-full px-6 py-4 md:px-8 md:py-6 text-sm md:text-base bg-transparent transition-all min-h-[44px]" asChild>
                      <Link href="/">Voltar ao Início</Link>
                    </Button>
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  )
}
