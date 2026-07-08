import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

const termosJson = [
  {
    id: "sobre-plataforma",
    num: "01",
    title: "Sobre a Plataforma e Seu Objetivo",
    content: "Bem vindo(a) à **Plataforma de Colaboração Cultural Maranhense**. Este sistema é uma iniciativa dedicada à preservação, catalogação e compartilhamento do patrimônio cultural do Estado do Maranhão.\n\nO objetivo principal da plataforma é permitir a construção colaborativa de um conjunto de dados (dataset) focado exclusivamente na coleta e curadoria de imagens que documentem as diversas manifestações culturais maranhenses. Através da colaboração contínua, a plataforma visa não apenas salvaguardar a memória e o patrimônio imaterial do estado, mas também fomentar pesquisas acadêmicas, o desenvolvimento de novas tecnologias e a disseminação do conhecimento cultural para a sociedade em geral."
  },
  {
    id: "aceitacao",
    num: "02",
    title: "Aceitação dos Termos de Uso",
    content: "O presente Termo de Uso estabelece as condições e as regras para o acesso e a utilização da Plataforma de Colaboração Cultural Maranhense. Ao acessar, navegar, cadastrar-se ou enviar qualquer tipo de material (dados, arquivos de mídia ou informações) para a plataforma, o usuário declara ter lido, compreendido e concordado expressa e integralmente com todas as disposições contidas neste documento, bem como com a nossa Política de Privacidade.\n\n> Caso o usuário não concorde com qualquer uma das regras aqui descritas, deverá abster-se de utilizar a plataforma e de submeter quaisquer dados ao acervo."
  },
  {
    id: "cadastro",
    num: "03",
    title: "Cadastro de Usuários",
    content: "Para submeter imagens ao acervo da Plataforma de Colaboração Cultural Maranhense, o usuário deverá realizar um cadastro prévio, fornecendo informações exatas, precisas e verdadeiras (como nome e e-mail).\n\n- O usuário é o único responsável por manter o sigilo de suas credenciais de acesso (login e senha), devendo notificar imediatamente os administradores da plataforma em caso de uso não autorizado da sua conta.\n- A administração da plataforma reserva-se o direito de suspender ou cancelar contas que forneçam informações falsas ou que descumpram as regras deste Termo."
  },
  {
    id: "regras",
    num: "04",
    title: "Regras de Utilização e Responsabilidades",
    content: "Ao utilizar a plataforma e submeter imagens para o dataset, o usuário compromete-se a:\n\n- **Autoria e Direitos de Imagem:** Garantir que é o autor legítimo das imagens enviadas ou que possui todas as autorizações e licenças necessárias (incluindo o consentimento de pessoas que eventualmente apareçam de forma identificável nas fotografias) para compartilhá-las neste projeto.\n- **Conteúdo Adequado:** Não enviar imagens que contenham material ilícito, difamatório, ofensivo, discriminatório, que violem a privacidade de terceiros ou que fujam do escopo cultural proposto pela plataforma.\n- **Isenção da Plataforma:** O usuário reconhece que a Plataforma de Colaboração Cultural Maranhense atua apenas como um repositório colaborativo, não se responsabilizando por infrações de direitos autorais ou violações de privacidade cometidas pelos usuários no envio das imagens."
  },
{
  id: "licenciamento",
  num: "05",
  title: "Licenciamento e Direitos sobre as Imagens Submetidas",
  content: `A Plataforma de Colaboração Cultural Maranhense não reivindica a propriedade das imagens enviadas pelos usuários. O usuário (ou o detentor dos direitos originais) mantém os direitos autorais sobre suas obras, quando aplicável.

**Licenciamento para Treinamento de IA Generativa**

Ao submeter uma imagem à plataforma, o usuário concorda em licenciá-la sob a **Licença OpenRAIL-D** (Responsible AI License), especificamente adaptada para o treinamento de modelos de Inteligência Artificial generativa.

Esta licença estabelece que:

- As imagens podem ser utilizadas **exclusivamente** para fins de pesquisa, desenvolvimento e treinamento de modelos de IA generativa, conforme detalhado na licença;
- O usuário mantém todos os direitos autorais sobre suas imagens;
- A plataforma se compromete a dar o devido crédito ao usuário em publicações acadêmicas e técnicas;
- O uso das imagens está sujeito a **restrições comportamentais**, incluindo a proibição de uso para vigilância em massa, discriminação, desinformação ou qualquer atividade que cause dano a comunidades ou indivíduos;
- A licença é concedida pelo prazo de **5 (cinco) anos**, sendo que modelos treinados durante este período podem continuar em operação após o término da licença.

> Para mais detalhes, consulte a **[Licença OpenRAIL-D completa](/licenca-openrail)**.

**Atribuição de Autoria**
Em publicações científicas e técnicas que descrevam os modelos treinados com as imagens, a plataforma se compromete a citar o usuário da seguinte forma:

> *"Imagens licenciadas por [Nome do Usuário] para a Plataforma de Colaboração Cultural Maranhense, sob Licença OpenRAIL-D para Treinamento de IA Generativa."*`
},

  {
    id: "exclusao-conta",
    num: "06",
    title: "Exclusão de Conta e Retenção de Dados",
    content: "Em respeito à Lei Geral de Proteção de Dados (LGPD), o usuário tem o direito de solicitar a inativação e exclusão de sua conta a qualquer momento.\n\n- **Anonimização das Contribuições:** Caso o usuário exclua sua conta, seus dados pessoais de cadastro (nome, e-mail, etc.) serão permanentemente apagados de nossos servidores. No entanto, para preservar a integridade da pesquisa acadêmica e do dataset, as imagens previamente submetidas permanecerão no acervo, mas terão sua autoria convertida para \"Usuário Anônimo\".\n- **Exclusão de Imagens:** Caso o usuário deseje que suas imagens sejam totalmente removidas do dataset, deverá solicitar a exclusão específica dos arquivos antes ou durante o processo de exclusão da conta."
  },
  {
    id: "disponibilidade",
    num: "07",
    title: "Disponibilidade do Serviço e Responsabilidades",
    content: "A administração da plataforma empenha-se para manter o sistema acessível e seguro. No entanto, o serviço é fornecido \"no estado em que se encontra\", não havendo garantia de que funcionará ininterruptamente ou livre de erros.\n\n> A administração reserva-se o direito de remover qualquer imagem do acervo, a qualquer momento, caso identifique violação deste Termo de Uso, da legislação vigente ou de direitos de terceiros."
  },
  {
    id: "atualizacoes",
    num: "08",
    title: "Atualizações destes Termos de Uso",
    content: "A plataforma poderá atualizar este Termo de Uso periodicamente para refletir melhorias no sistema, mudanças legais ou novas diretrizes do projeto.\n\n- Em caso de alterações significativas, os usuários serão notificados (por e-mail ou aviso em destaque na plataforma) e solicitados a fornecer um novo consentimento (aceite) na versão atualizada ao realizarem um novo login.\n- A versão atual e a data de vigência estarão sempre disponíveis na plataforma. O uso contínuo do serviço após a concordância com os novos termos constitui a aceitação das regras atualizadas."
  },
  {
    id: "legislacao",
    num: "09",
    title: "Legislação Aplicável e Foro",
    content: "Este Termo de Uso é regido pelas leis da República Federativa do Brasil, em especial:\n\n- Marco Civil da Internet (Lei nº 12.965/2014)\n- Lei Geral de Proteção de Dados (Lei nº 13.709/2018)\n- Lei de Direitos Autorais (Lei nº 9.610/1998)\n\nPara dirimir quaisquer dúvidas ou litígios decorrentes deste documento, fica eleito o foro da Comarca de São Luís, Estado do Maranhão, com renúncia expressa a qualquer outro, por mais privilegiado que seja."
  }
];


const privacidadeJson = [
  {
    id: "sobre-plataforma",
    num: "01",
    title: "Sobre a Plataforma e Seu Objetivo",
    content: "Bem vindo(a) à **Plataforma de Colaboração Cultural Maranhense**. Este sistema é uma iniciativa dedicada à preservação, catalogação e compartilhamento do patrimônio cultural do Estado do Maranhão.\n\nO objetivo principal da plataforma é permitir a construção colaborativa de um conjunto de dados (dataset) focado exclusivamente na coleta e curadoria de imagens que documentem as diversas manifestações culturais maranhenses. Através da colaboração contínua, a plataforma visa não apenas salvaguardar a memória e o patrimônio imaterial do estado, mas também fomentar pesquisas acadêmicas, o desenvolvimento de novas tecnologias e a disseminação do conhecimento cultural para a sociedade em geral."
  },
  {
    id: "quais-dados-coletamos",
    num: "02",
    title: "Quais Dados Nós Coletamos?",
    content: "Nós coletamos apenas as informações estritamente necessárias para o funcionamento da plataforma, a garantia de autoria das imagens e a segurança do sistema. Os dados são divididos nas seguintes categorias:\n\n- **Dados de Cadastro (Fornecidos pelo Usuário):** Quando você decide colaborar e cria uma conta, nós coletamos seu Nome, E-mail e Senha (a senha é armazenada de forma criptografada).\n- **Metadados das Imagens:** Ao submeter uma imagem para o dataset, o sistema pode extrair e armazenar informações técnicas atreladas ao arquivo (metadados), tais como: data em que a foto foi tirada, resolução, tamanho do arquivo e origem.\n- **Dados de Registro e Navegação (Coleta Automática):** Para fins de segurança, auditoria e rastreabilidade (evitando fraudes e abusos), nossos servidores coletam automaticamente logs de acesso, que podem incluir o endereço IP utilizado no momento do cadastro ou do envio da imagem, além de data e hora da ação."
  },
  {
    id: "finalidade",
    num: "03",
    title: "Para Que Utilizamos Seus Dados? (Finalidade)",
    content: "Nós utilizamos os dados coletados estritamente para viabilizar o nosso projeto acadêmico de preservação cultural, respeitando o princípio da minimização da LGPD. Nossas finalidades são:\n\n- **Construção do Dataset Cultural:** As imagens e seus metadados comporão o acervo público voltado para o treinamento de Inteligência Artificial e pesquisas sobre a cultura maranhense.\n- **Garantia de Autoria e Licenciamento:** Seu Nome é utilizado para atrelar a autoria à imagem enviada, garantindo o devido crédito moral caso você opte pelo licenciamento CC BY 4.0.\n- **Comunicação e Autenticação:** Seu e-mail e senha são usados exclusivamente para a criação da sua conta, validação do seu login e, caso necessário, envio de comunicados importantes sobre a plataforma (como atualizações dos Termos de Uso).\n- **Segurança e Cumprimento Legal:** Os registros de acesso (logs) são mantidos para garantir a segurança do servidor contra ataques e para cumprir a obrigação legal prevista no Marco Civil da Internet (Lei nº 12.965/2014)."
  },
  {
    id: "compartilhamento",
    num: "04",
    title: "Com Quem Compartilhamos Seus Dados?",
    content: "A Plataforma de Colaboração Cultural Maranhense preza pela sua privacidade. Nós NUNCA venderemos seus dados cadastrais para terceiros. O compartilhamento ocorre apenas nos seguintes cenários:\n\n- **O Dataset Público (Dados Abertos):** A premissa do projeto é a pesquisa aberta. Portanto, as imagens submetidas, juntamente com o seu Nome (como crédito de autoria), poderão ser acessadas e baixadas por pesquisadores, desenvolvedores de IA e pelo público em geral. Seu e-mail e senha jamais serão expostos no dataset.\n- **Provedores de Infraestrutura:** Seus dados e as imagens ficam armazenados em servidores sob a gestão do NCA/UFMA ou em provedores de nuvem de infraestrutura terceirizados, que atuam apenas como operadores tecnológicos do sistema, sob rígidos protocolos de segurança.\n- **Autoridades Legais:** Em cumprimento à lei, poderemos compartilhar dados de cadastro ou logs de acesso com autoridades públicas ou policiais caso haja uma ordem judicial clara e fundamentada."
  },
  {
    id: "direitos",
    num: "05",
    title: "Quais São os Seus Direitos? (Titular dos Dados)",
    content: "Em conformidade com o Artigo 18 da Lei Geral de Proteção de Dados (LGPD), o usuário possui controle sobre as suas informações pessoais. A qualquer momento, através do seu perfil na plataforma ou mediante contato com a nossa equipe, pode solicitar:\n\n- **Acesso e Retificação:** Pode visualizar e corrigir dados incompletos, inexatos ou desatualizados (como alterar o seu nome ou e-mail de registro).\n- **Eliminação e Anonimização:** Como explicado nos nossos Termos de Uso, pode solicitar a exclusão da sua conta. Ao fazê-lo, os seus dados pessoais (nome, e-mail e senha) serão permanentemente eliminados. Para preservar a pesquisa acadêmica, as imagens que enviou serão mantidas no dataset, mas a sua autoria será convertida para \"Usuário Anônimo\" (anonimização).\n- **Revogação do Consentimento:** Pode opor-se ao tratamento dos seus dados, o que implicará o encerramento da sua conta e a cessação de novas submissões."
  },
  {
    id: "armazenamento-seguranca",
    num: "06",
    title: "Como Armazenamos e Protegemos os Seus Dados?",
    content: "Os seus dados pessoais são armazenados em servidores geridos pelo Núcleo de Computação Aplicada (NCA/UFMA), localizados em São Luís, Maranhão, Brasil.\n\n- **Segurança:** Adotamos medidas técnicas e administrativas aptas a proteger os dados pessoais contra acessos não autorizados e situações de destruição, perda ou alteração. Isso inclui a criptografia das senhas na nossa base de dados (PostgreSQL) e o uso de conexões seguras.\n- **Retenção:** Os seus dados de registro são mantidos apenas enquanto a sua conta estiver ativa. Os registros de acesso automático (logs e endereço IP) são mantidos, por obrigação legal do Marco Civil da Internet, pelo período mínimo de 6 (seis) meses em um ambiente controlado e de segurança, sendo eliminados após esse prazo."
  },
  {
    id: "cookies",
    num: "07",
    title: "Utilização de Cookies e Tecnologias de Rastreamento",
    content: "Para o correto funcionamento da Plataforma de Colaboração Cultural Maranhense, utilizamos ferramentas tecnológicas conhecidas como Cookies (pequenos arquivos de texto salvos no seu navegador).\n\n> Utilizamos estritamente os Cookies Necessários, que servem exclusivamente para permitir a sua autenticação no sistema (manter o login ativo enquanto envia as imagens) e garantir a segurança da navegação.\n\nNão utilizamos cookies de marketing ou de rastreamento para venda de publicidade. Você pode configurar o seu navegador para bloquear ou alertar sobre estes cookies, no entanto, algumas partes do sistema (como a área de upload de imagens) poderão não funcionar adequadamente sem eles."
  }
];


async function main() {
  console.log('Iniciando o Seed do Banco de Dados')

  // 1. POPULAR DOMÍNIOS CULTURAIS
  const dominios = [
    "Bumba-meu-boi",
    "Tambor-de-Crioula",
    "Festa Religiosa",
    "Arquitetura-Historica",
    "Festa-Popular",
    "Cacuriá",
    "Lencois-Maranhenses",
    "Outro"
  ]
  
  for (const nome of dominios) {
    const existe = await prisma.dominioCultural.findFirst({ where: { nome_categoria: nome } })
    if (!existe) {
      await prisma.dominioCultural.create({ data: { nome_categoria: nome } })
      console.log(`Domínio criado: ${nome}`)
    } else {
      console.log(`Domínio já existe: ${nome}`)
    }
  }

// 2. POPULAR TERMOS DE USO (Stringificando o JSON)
  const termo = await prisma.termoDeUso.upsert({
    where: { id: 1 },
    update: {
      conteudo: JSON.stringify(termosJson), 
      versao: '2.0',
    },
    create: {
      id: 1,
      versao: '2.0',
      conteudo: JSON.stringify(termosJson),
      data_vigencia: new Date('2026-05-08T00:00:00Z'),
    }
  })
  console.log(`Termos de Uso (Versão ${termo.versao}) garantido no banco.`)

  // 3. POPULAR POLÍTICAS DE PRIVACIDADE (Stringificando o JSON)
  const politica = await prisma.politicaDePrivacidade.upsert({
    where: { id: 1 },
    update: {
      conteudo: JSON.stringify(privacidadeJson), 
      versao: '1.0',
    },
    create: {
      id: 1,
      versao: '1.0',
      conteudo: JSON.stringify(privacidadeJson),
      data_vigencia: new Date('2026-05-08T00:00:00Z'),
    }
  })
  console.log(`Política de Privacidade inicial (Versão ${politica.versao}) garantida no banco.`)

  console.log('Seed concluído com sucesso!')

  
  // 4. CRIAR USUÁRIO ADMIN PADRÃO 
  const adminEmail = 'dataset.ma.cultural@gmail.com'
  const adminPassword = 'PIBITIDATASETMULTIMODAL' 

  const adminExists = await prisma.usuario.findUnique({ where: { email: adminEmail } })
  if (!adminExists) {
    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await prisma.usuario.create({
      data: {
        nome: 'Administrador',
        email: adminEmail,
        senha: hashedPassword,
        papel: 'ADMINISTRADOR',
        status_conta: true,
      },
    })
    console.log(`Usuário admin criado: ${adminEmail}`)
  } else {
    console.log(`Usuário admin já existe: ${adminEmail}`)
  }

  console.log('Seed concluído com sucesso!')
}


main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })