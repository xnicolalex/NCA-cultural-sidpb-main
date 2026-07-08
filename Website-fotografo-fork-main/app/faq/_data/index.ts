import { Camera, Shield, FileText, HelpCircle, AlertTriangle } from "lucide-react";

export const faqSections = [
  {
    id: "geral",
    title: "Perguntas Gerais",
    icon: HelpCircle,
    questions: [
      { q: "O que é este projeto?", a: "O projeto visa a construção de um dataset multimodal colaborativo que documenta a cultura maranhense através de imagens e metadados detalhados. O objetivo é preservar digitalmente nossas manifestações culturais e torná-las acessíveis para educação, pesquisa e desenvolvimento de tecnologias culturais através de um modelo generativo especializado." },
      { q: "Quem pode contribuir?", a: "Qualquer pessoa com imagens de qualidade da cultura maranhense pode contribuir: fotógrafos profissionais e amadores, membros de comunidades tradicionais, pesquisadores, turistas. O importante é que as imagens respeitem as manifestações culturais e que você tenha os direitos sobre elas." },
      { q: "O projeto é gratuito?", a: "Sim, totalmente gratuito. Tanto para contribuir quanto para acessar o dataset. Nossa missão é democratizar o acesso à cultura maranhense. Não há custos para fazer upload de imagens ou para baixar o dataset para fins educacionais e de pesquisa." },
      { q: "O projeto paga pelas imagens?", a: "Este é um projeto colaborativo sem fins lucrativos. O projeto não oferece remuneração financeira pelas contribuições, mas você ainda tem crédito como autor em todas as imagens e a satisfação de contribuir para a preservação cultural do Maranhão." },
    ],
  },
  {
    id: "contribuicao",
    title: "Sobre Contribuição",
    icon: Camera,
    questions: [
      { q: "Que tipos de imagens são aceitas?", a: "São aceitas imagens com resoluções de no mínimo 800x600 de manifestações culturais maranhenses: Bumba-meu-boi, Tambor de Crioula, festas religiosas, arquitetura histórica, artesanato, culinária tradicional, danças, música, e outras expressões culturais. As imagens devem ser nítidas, bem iluminadas e culturalmente respeitosas." },
      { q: "Posso enviar fotos tiradas com celular?", a: "Sim, desde que atendam aos requisitos mínimos de tamanho e formato. Celulares modernos produzem fotos excelentes. O importante é a resolução adequada (mínimo 800x600), boa iluminação, foco correto e composição que valorize a manifestação cultural." },
      { q: "Quantas imagens posso enviar?", a: "Não há limite! Quanto mais imagens de qualidade, melhor para o dataset. Você pode fazer upload de múltiplas imagens simultaneamente (bulk upload). É recomendado organizar suas contribuições em sessões temáticas ou por evento para facilitar a anotação das imagens." },
      { q: "Quanto tempo leva para minhas imagens serem aprovadas?", a: "A equipe responsável revisa as submissões o mais breve possível. Imagens que necessitam de contexto cultural adicional podem levar mais tempo, pois é necessário consultar especialistas. O Status da submissão será devidamente atualizado no perfil do usuário na aba de Contribuições." },
    ],
  },
  {
    id: "direitos",
    title: "Direitos Autorais e Licenças",
    icon: Shield,
    questions: [
      { q: "Eu mantenho os direitos autorais das minhas fotos?", a: "Sim! Você mantém todos os direitos autorais. Ao contribuir, você apenas concede permissão para que suas imagens sejam incluídas no dataset sob a licença Creative Commons BY. Isso significa que outros podem usar suas imagens, mas sempre com atribuição a você como autor." },
      { q: "Posso apagar ou desativar minha conta depois de contribuir?", a: "Sim, você pode apagar ou desativar sua conta a qualquer momento através do seu painel de usuário. Note que isso não afeta as imagens já contribuídas, apenas os metadados referentes à sua identidade serão apagados." },
      { q: "Posso remover minhas imagens depois?", a: "Sim. Você pode solicitar a remoção de suas imagens a qualquer momento através do seu painel de usuário ou entrando em contato com o suporte. A solicitação será processada o mais breve possível." },
      { q: "E se eu fotografar uma manifestação cultural, preciso de autorização?", a: "Se há pessoas identificáveis na imagem, você deve ter o consentimento delas. Para eventos públicos em espaços públicos, geralmente não é necessário. Porém, por respeito cultural, recomendamos sempre dialogar com responsáveis e participantes, especialmente em contextos religiosos." },
    ],
  },
  {
    id: "boas-praticas",
    title: "Boas Práticas Culturais",
    icon: AlertTriangle,
    questions: [
      { q: "Como fotografar manifestações culturais de forma respeitosa?", a: "Algumas orientações: (1) Peça permissão antes de fotografar, especialmente em rituais religiosos. (2) Não interfira na manifestação ou bloqueie a visão de participantes. (3) Vista-se adequadamente. (4) Evite flash em momentos sensíveis. (5) Converse com mestres e líderes comunitários para entender o contexto. (6) Nunca fotografe sem consentimento pessoas em situações vulneráveis." },
      { q: "Devo evitar algum tipo de fotografia?", a: "Sim. Evite: (1) Fotos que exponham pessoas de forma vexatória. (2) Imagens que reduzam a cultura a estereótipos ou exotismo. (3) Fotografias em rituais fechados sem permissão explícita. (4) Imagens de crianças identificáveis sem consentimento dos responsáveis. (5) Fotos que violem a intimidade ou dignidade das pessoas retratadas." },
      { q: "Como devo contextualizar minhas imagens?", a: "Forneça o máximo de informações possível: nome correto da manifestação cultural, localização específica, data, nomes de mestres ou grupos (se souber), contexto do evento, detalhes sobre vestimentas ou instrumentos. Se não tiver certeza sobre alguma informação cultural, indique isso e nossa equipe consultará especialistas." },
      { q: "Posso fotografar em comunidades quilombolas ou indígenas?", a: "Sim, mas com cuidado especial. Estas comunidades têm direitos específicos sobre sua imagem cultural. Você DEVE obter autorização prévia de lideranças comunitárias. Algumas práticas culturais são protegidas e não devem ser fotografadas. Sempre respeite quando alguém disser não. Compartilhe as fotos com a comunidade antes de submeter." },
    ],
  },
  {
    id: "tecnico",
    title: "Questões Técnicas",
    icon: FileText,
    questions: [
      { q: "Quais formatos de arquivo são aceitos?", a: "Aceitamos JPEG, PNG e JPG. Recomendamos JPEG para fotos convencionais (qualidade 90% ou superior). Para imagens com transparência, use PNG. Não aceitamos arquivos RAW (bruto) diretamente, mas você pode fazer upload deles separadamente." },
      { q: "Qual o tamanho máximo de arquivo?", a: "Não há um limite de tamanho para cada arquivo individual nem para lotes. Se suas imagens são grandes demais (5GB por imagem), é recomendado comprimi-las mantendo qualidade máxima." },
      { q: "Preciso preencher todos os metadados?", a: "Apenas alguns campos são obrigatórios: título e manifestação cultural. Campos opcionais como dados técnicos EXIF e IPTC/XMP podem ser automaticamente coletados das imagens. Quanto mais metadados você fornecer, melhor para a curadoria e para os usuários futuros. Se não souber alguma informação, deixe em branco ou indique 'DESCONHECIDO'." },
      { q: "Como funciona o sistema de curadoria?", a: 'Após o upload, suas imagens entram em uma fila de revisão onde será verificado a: (1) Qualidade técnica. (2) Relevância cultural. (3) Completude dos metadados. (4) Respeito aos contextos culturais. Imagens aprovadas recebem status "Verificado". Imagens que necessitam ajustes recebem status "Pendente" e feedback para correção.' },
    ],
  },
];

export const quickLinks = [
  { id: "boas-praticas", icon: AlertTriangle, title: "Boas Práticas", description: "Como fotografar com respeito cultural" },
  { id: "direitos", icon: Shield, title: "Licenças", description: "Entenda seus direitos autorais" },
  { id: "contribuicao", icon: Camera, title: "Contribuir", description: "Como enviar suas imagens" },
  { id: "tecnico", icon: FileText, title: "Questões Técnicas", description: "Formatos, tamanhos e metadados" },
];