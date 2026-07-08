export interface ImageMetadata {
  id: string
  title: string
  description: string
  photographer: {
    name: string
    contact_email?: string
    profile_url?: string
  }
  date_taken: string
  location: {
    latitude: number
    longitude: number
    municipality: string
    state: string
  }
  tags: string[]
  manifestation: string
  license: string
  consent_provided: boolean
  technical: {
    resolution: string
    file_type: string
    file_size_bytes: number
  }
  curation_status: "pending" | "accepted" | "rejected" | "needs_context"
  language: string
  url: string
  views?: number
}

export const mockImages: ImageMetadata[] = [
  {
    id: "img-001",
    title: "Bumba-meu-boi no Centro Histórico",
    description:
      "Apresentação tradicional do Bumba-meu-boi durante o São João, com brincantes em trajes coloridos e elaborados. A manifestação representa a resistência cultural e a identidade maranhense.",
    photographer: {
      name: "Maria Santos",
      profile_url: "/perfil/maria-santos",
    },
    date_taken: "2024-06-23",
    location: {
      latitude: -2.5297,
      longitude: -44.3028,
      municipality: "São Luís",
      state: "Maranhão",
    },
    tags: ["bumba-meu-boi", "são-joão", "festas-populares", "tradição"],
    manifestation: "Bumba-meu-boi",
    license: "CC-BY-SA",
    consent_provided: true,
    technical: {
      resolution: "4000x3000",
      file_type: "image/jpeg",
      file_size_bytes: 5242880,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/bumba-meu-boi-colorful-traditional-costume-maranha.jpg",
    views: 1247,
  },
  {
    id: "img-002",
    title: "Tambor de Crioula em Alcântara",
    description:
      "Mulheres dançando o Tambor de Crioula, patrimônio imaterial brasileiro de matriz africana. A dança circular celebra a cultura afro-brasileira com movimentos característicos e o toque dos tambores.",
    photographer: {
      name: "João Silva",
      profile_url: "/perfil/joao-silva",
    },
    date_taken: "2024-05-15",
    location: {
      latitude: -2.4072,
      longitude: -44.4183,
      municipality: "Alcântara",
      state: "Maranhão",
    },
    tags: ["tambor-de-crioula", "dança", "cultura-afro", "patrimônio"],
    manifestation: "Tambor de Crioula",
    license: "CC-BY",
    consent_provided: true,
    technical: {
      resolution: "3840x2160",
      file_type: "image/jpeg",
      file_size_bytes: 4718592,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/tambor-de-crioula-afro-brazilian-dance-maranhao-wo.jpg",
    views: 892,
  },
  {
    id: "img-003",
    title: "Azulejos do Centro Histórico",
    description:
      "Fachada colonial com azulejos portugueses característicos do século XVIII. São Luís possui o maior conjunto arquitetônico de azulejos das Américas, reconhecido pela UNESCO.",
    photographer: {
      name: "Ana Ferreira",
      profile_url: "/perfil/ana-ferreira",
    },
    date_taken: "2024-03-10",
    location: {
      latitude: -2.5297,
      longitude: -44.3028,
      municipality: "São Luís",
      state: "Maranhão",
    },
    tags: ["arquitetura", "azulejos", "unesco", "colonial", "patrimônio"],
    manifestation: "Arquitetura Colonial",
    license: "CC0",
    consent_provided: true,
    technical: {
      resolution: "5472x3648",
      file_type: "image/jpeg",
      file_size_bytes: 8388608,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/sao-luis-historical-center-portuguese-tiles-coloni.jpg",
    views: 2103,
  },
  {
    id: "img-004",
    title: "Festa do Divino Espírito Santo",
    description:
      "Celebração religiosa centenária que mescla elementos católicos e tradições populares. Os mastros coloridos e bandeiras são símbolos da devoção ao Divino.",
    photographer: {
      name: "Carlos Mendes",
      profile_url: "/perfil/carlos-mendes",
    },
    date_taken: "2024-07-20",
    location: {
      latitude: -2.5297,
      longitude: -44.3028,
      municipality: "São Luís",
      state: "Maranhão",
    },
    tags: ["divino", "festa-religiosa", "tradição", "fé"],
    manifestation: "Divino Espírito Santo",
    license: "CC-BY-SA",
    consent_provided: true,
    technical: {
      resolution: "4608x3456",
      file_type: "image/jpeg",
      file_size_bytes: 6291456,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/festa-divino-espirito-santo-maranhao-colorful-reli.jpg",
    views: 567,
  },
  {
    id: "img-005",
    title: "Artesanato em Fibra de Buriti",
    description:
      "Artesã confeccionando peça tradicional com fibra de buriti, técnica milenar transmitida entre gerações. O artesanato maranhense é reconhecido pela qualidade e originalidade.",
    photographer: {
      name: "Paula Rodrigues",
      profile_url: "/perfil/paula-rodrigues",
    },
    date_taken: "2024-04-05",
    location: {
      latitude: -3.7319,
      longitude: -42.8034,
      municipality: "Barreirinhas",
      state: "Maranhão",
    },
    tags: ["artesanato", "buriti", "tradição", "cultura-popular"],
    manifestation: "Artesanato",
    license: "CC-BY",
    consent_provided: true,
    technical: {
      resolution: "3000x2000",
      file_type: "image/jpeg",
      file_size_bytes: 3145728,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/maranhao-buriti-fiber-handicraft-artisan-tradition.jpg",
    views: 423,
  },
  {
    id: "img-006",
    title: "Cacuriá de Dona Teté",
    description:
      "Roda de Cacuriá, dança típica maranhense de origem indígena e cabocla. Os passos marcados e os cânticos mantêm viva a memória ancestral.",
    photographer: {
      name: "Roberto Lima",
      profile_url: "/perfil/roberto-lima",
    },
    date_taken: "2024-08-12",
    location: {
      latitude: -2.5297,
      longitude: -44.3028,
      municipality: "São Luís",
      state: "Maranhão",
    },
    tags: ["cacuriá", "dança", "tradição", "cultura-popular"],
    manifestation: "Festas Juninas",
    license: "CC-BY-SA",
    consent_provided: true,
    technical: {
      resolution: "4000x3000",
      file_type: "image/jpeg",
      file_size_bytes: 5500000,
    },
    curation_status: "pending",
    language: "pt-BR",
    url: "/cacuria-dance-maranhao-traditional-circle-dance.jpg",
    views: 312,
  },
  {
    id: "img-007",
    title: "Mercado Central de São Luís",
    description:
      "Interior do mercado histórico com produtos típicos, especiarias e artesanato local. Ponto de encontro comercial e cultural desde o século XIX.",
    photographer: {
      name: "Fernanda Costa",
      profile_url: "/perfil/fernanda-costa",
    },
    date_taken: "2024-02-28",
    location: {
      latitude: -2.5297,
      longitude: -44.3028,
      municipality: "São Luís",
      state: "Maranhão",
    },
    tags: ["mercado", "comércio", "cultura", "gastronomia"],
    manifestation: "Arquitetura Colonial",
    license: "CC0",
    consent_provided: true,
    technical: {
      resolution: "5184x3456",
      file_type: "image/jpeg",
      file_size_bytes: 7340032,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/sao-luis-central-market-maranhao-traditional-comme.jpg",
    views: 789,
  },
  {
    id: "img-008",
    title: "Chapada das Mesas",
    description:
      "Paisagem natural das formações rochosas da Chapada das Mesas. Patrimônio natural que integra a identidade territorial maranhense.",
    photographer: {
      name: "Pedro Oliveira",
      profile_url: "/perfil/pedro-oliveira",
    },
    date_taken: "2024-09-05",
    location: {
      latitude: -7.1289,
      longitude: -46.9561,
      municipality: "Carolina",
      state: "Maranhão",
    },
    tags: ["natureza", "chapada", "paisagem", "turismo"],
    manifestation: "Arquitetura Colonial",
    license: "CC-BY",
    consent_provided: true,
    technical: {
      resolution: "6000x4000",
      file_type: "image/jpeg",
      file_size_bytes: 9437184,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/chapada-das-mesas-maranhao-rock-formations-landsca.jpg",
    views: 1567,
  },
  {
    id: "img-009",
    title: "Renda de Bilro Tradicional",
    description:
      "Artesã executando a técnica ancestral da renda de bilro, patrimônio cultural com raízes portuguesas adaptado ao contexto maranhense.",
    photographer: {
      name: "Lucia Almeida",
      profile_url: "/perfil/lucia-almeida",
    },
    date_taken: "2024-01-18",
    location: {
      latitude: -2.5893,
      longitude: -44.2108,
      municipality: "São José de Ribamar",
      state: "Maranhão",
    },
    tags: ["artesanato", "renda", "bilro", "tradição"],
    manifestation: "Artesanato",
    license: "CC-BY-SA",
    consent_provided: true,
    technical: {
      resolution: "3600x2400",
      file_type: "image/jpeg",
      file_size_bytes: 4194304,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/bobbin-lace-maranhao-traditional-handcraft-artisan.jpg",
    views: 445,
  },
  {
    id: "img-010",
    title: "Carnaval de Caxias",
    description:
      "Blocos carnavalescos nas ruas de Caxias, cidade conhecida pela forte tradição carnavalesca e agremiações centenárias.",
    photographer: {
      name: "Marcos Araújo",
      profile_url: "/perfil/marcos-araujo",
    },
    date_taken: "2024-02-12",
    location: {
      latitude: -4.8586,
      longitude: -43.3558,
      municipality: "Caxias",
      state: "Maranhão",
    },
    tags: ["carnaval", "festa", "música", "cultura-popular"],
    manifestation: "Festas Juninas",
    license: "CC-BY",
    consent_provided: true,
    technical: {
      resolution: "4928x3264",
      file_type: "image/jpeg",
      file_size_bytes: 6815744,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/caxias-carnival-maranhao-street-party-colorful.jpg",
    views: 923,
  },
  {
    id: "img-011",
    title: "Praia dos Lençóis",
    description:
      "Encontro das águas doces dos lençóis maranhenses com o mar. Paisagem única que simboliza a diversidade geográfica do estado.",
    photographer: {
      name: "Beatriz Cunha",
      profile_url: "/perfil/beatriz-cunha",
    },
    date_taken: "2024-07-30",
    location: {
      latitude: -3.7319,
      longitude: -42.8034,
      municipality: "Barreirinhas",
      state: "Maranhão",
    },
    tags: ["lençóis", "praia", "natureza", "paisagem"],
    manifestation: "Arquitetura Colonial",
    license: "CC0",
    consent_provided: true,
    technical: {
      resolution: "5760x3840",
      file_type: "image/jpeg",
      file_size_bytes: 8912896,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/lencois-maranhenses-beach-sand-dunes-water.jpg",
    views: 2456,
  },
  {
    id: "img-012",
    title: "Bumba-meu-boi de Zabumba",
    description:
      "Sotaque de zabumba do Bumba-meu-boi, com seus ritmos característicos e indumentárias únicas. Uma das variantes mais tradicionais da manifestação.",
    photographer: {
      name: "Sandra Moreira",
      profile_url: "/perfil/sandra-moreira",
    },
    date_taken: "2024-06-28",
    location: {
      latitude: -2.5297,
      longitude: -44.3028,
      municipality: "São Luís",
      state: "Maranhão",
    },
    tags: ["bumba-meu-boi", "zabumba", "sotaque", "tradição"],
    manifestation: "Bumba-meu-boi",
    license: "CC-BY-SA",
    consent_provided: true,
    technical: {
      resolution: "4320x2880",
      file_type: "image/jpeg",
      file_size_bytes: 5767168,
    },
    curation_status: "accepted",
    language: "pt-BR",
    url: "/bumba-meu-boi-zabumba-maranhao-drums-traditional-c.jpg",
    views: 678,
  },
]
