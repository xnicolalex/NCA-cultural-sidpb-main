# README Arquitetural — Backend

## Contexto da aplicação

Este backend pertence a uma plataforma web para visualização da distribuição de doenças parasitárias no Brasil.

A V1 da aplicação é focada na distribuição da miíase primária causada por *Cochliomyia hominivorax*. Os dados vêm de artigos científicos, monografias, dissertações e teses usados como referência no artigo de revisão “A review on the occurrence of Cochliomyia hominivorax (Diptera: Calliphoridae) in Brazil”, de Lívio Costa — UFMA.

O sistema possui:

- frontend web em React;
- backend em Spring Boot;
- banco PostgreSQL/PostGIS;
- pipeline externo que extrai dados de PDFs e envia JSON ao backend.

O backend é responsável por centralizar regras de negócio, validar dados científicos, consultar o banco e fornecer dados para mapa, gráficos, tabelas e relatórios.

---

## Papel do backend

O backend deve:

- receber requisições REST/JSON do frontend;
- receber JSON do pipeline externo de extração;
- validar dados antes de salvar;
- consultar ocorrências;
- aplicar filtros epidemiológicos;
- gerar estatísticas;
- fornecer dados para o mapa;
- gerar dados de relatório;
- acessar o PostgreSQL/PostGIS via repositories.

O frontend não acessa diretamente o banco.

O pipeline externo não acessa diretamente o banco.

---

# Componentes principais

## Services de consulta e relatório

- **OccurrenceQueryService**: centraliza filtros epidemiológicos e busca ocorrências.
- **StatisticsService**: gera métricas, gráficos e agregações.
- **MapDataService**: prepara dados geográficos e epidemiológicos para o mapa.
- **ReportService**: consolida dados para relatório.

## Services de gerenciamento científico

**Responsabilidades:**

- **OccurrenceManagementService**: cria, edita, remove e importa ocorrências.
- **SourceService**: gerencia fontes científicas e vínculos com ocorrências.
- **ValidationService**: valida dados antes da persistência.

> Esse grupo trata o fluxo de escrita, ingestão e manutenção dos dados científicos.

## Requisitos

- Java 17 ou superior
- PostgreSQL 16
- Git

## Configuração do banco

Configure as variáveis de ambiente:

```bash
DB_URL=jdbc:postgresql://localhost:5432/sistema_miiase
DB_USER=postgres
DB_PASSWORD=sua_senha