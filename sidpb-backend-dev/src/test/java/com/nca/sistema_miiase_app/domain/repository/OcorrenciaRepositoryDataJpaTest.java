package com.nca.sistema_miiase_app.domain.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import jakarta.persistence.EntityManager;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.data.jpa.test.autoconfigure.DataJpaTest;
import org.springframework.boot.jdbc.test.autoconfigure.AutoConfigureTestDatabase;
import org.springframework.test.context.ActiveProfiles;

import com.nca.sistema_miiase_app.domain.entity.AnimalCompanhia;
import com.nca.sistema_miiase_app.domain.entity.AnimalProducao;
import com.nca.sistema_miiase_app.domain.entity.AnimalSelvagem;
import com.nca.sistema_miiase_app.domain.entity.Doenca;
import com.nca.sistema_miiase_app.domain.entity.Fonte;
import com.nca.sistema_miiase_app.domain.entity.Hospedeiro;
import com.nca.sistema_miiase_app.domain.entity.Humano;
import com.nca.sistema_miiase_app.domain.entity.Local;
import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;
import com.nca.sistema_miiase_app.domain.entity.Parasito;
import com.nca.sistema_miiase_app.domain.entity.Vetor;

@DataJpaTest
@ActiveProfiles("test")
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class OcorrenciaRepositoryDataJpaTest {

    @Autowired
    private EntityManager entityManager;

    @Autowired
    private OcorrenciaRepository ocorrenciaRepository;

    @Test
    void deveRetornarTodasOcorrenciasSemFiltro() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(null, null, null, null, null, null, null, null, null, null);

        assertEquals(4, resultados.size());
        assertEquals(ids.ocorrencia4Id(), resultados.get(0).getIdOcorrencia());
        assertEquals(ids.ocorrencia1Id(), resultados.get(3).getIdOcorrencia());
    }

    @Test
    void deveFiltrarPorUf() {
        persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas("MA", null, null, null, null, null, null, null, null, null);

        assertEquals(2, resultados.size());
    }

    @Test
    void deveFiltrarPorCidadeComCaseInsensitive() {
        persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(null, "sao luis", null, null, null, null, null, null, null, null);

        assertEquals(1, resultados.size());
        assertEquals("Sao Luis", resultados.getFirst().getLocalCidade());
    }

    @Test
    void deveFiltrarPorIntervaloDeAnosInclusivo() {
        persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(null, null, 2021, 2022, null, null, null, null, null, null);

        assertEquals(2, resultados.size());
        assertEquals(LocalDate.of(2022, 5, 5), resultados.get(0).getDataOcorrencia());
        assertEquals(LocalDate.of(2021, 3, 20), resultados.get(1).getDataOcorrencia());
    }

    @Test
    void deveFiltrarPorDoenca() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(null, null, null, null, null, ids.doencaAId(), null, null, null, null);

        assertEquals(2, resultados.size());
    }

    @Test
    void deveFiltrarPorVetorEParasitaComAndCoerente() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(
                        null, null, null, null, null, null,
                        ids.vetorAId(), ids.parasitaAId(), null, null
                );

        assertEquals(2, resultados.size());
    }

    @Test
    void deveRetornarVazioQuandoVetorEParasitaNaoCombinam() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(
                        null, null, null, null, null, null,
                        ids.vetorAId(), ids.parasitaBId(), null, null
                );

        assertTrue(resultados.isEmpty());
    }

    @Test
    void deveFiltrarPorFonteETipoFonteComAnd() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(
                        null, null, null, null, null, null, null, null,
                        ids.fonteArtigoId(), "artigo"
                );

        assertEquals(2, resultados.size());
    }

    @Test
    void deveRetornarVazioQuandoFonteETipoNaoCombinam() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(
                        null, null, null, null, null, null, null, null,
                        ids.fonteArtigoId(), "tese"
                );

        assertTrue(resultados.isEmpty());
    }

    @Test
    void deveFiltrarPorCategoriaHospedeiro() {
        persistirMassaParaFiltros();

        List<OcorrenciaRepository.OcorrenciaResumoProjection> resultados = ocorrenciaRepository
                .findOcorrenciasParaResumoFiltradas(
                        null, null, null, null, "HUMANO", null, null, null, null, null
                );

        assertEquals(1, resultados.size());
        assertEquals("Homo sapiens", resultados.getFirst().getHospedeiroEspecie());
    }

    @Test
    void deveAgregarPontosMapaPorLocal() {
        persistirMassaParaFiltros();

        List<OcorrenciaRepository.PontoMapaProjection> resultados = ocorrenciaRepository
                .findPontosMapaAgregadosFiltrados(null, null, null, null, null, null, null, null, null, null);

        assertEquals(4, resultados.size());
        long total = resultados.stream().mapToLong(OcorrenciaRepository.PontoMapaProjection::getTotalOcorrencias).sum();
        assertEquals(4L, total);
    }

    @Test
    void deveSomarOcorrenciasNoMesmoPontoDeMapa() {
        BaseIds ids = persistirMassaParaFiltros();
        Ocorrencia base = entityManager.find(Ocorrencia.class, ids.ocorrencia1Id());

        criarOcorrencia(
                LocalDate.of(2024, 1, 10),
                base.getLocal(),
                base.getHospedeiro(),
                base.getDoenca(),
                base.getVetor(),
                base.getFontes()
        );
        entityManager.flush();
        entityManager.clear();

        List<OcorrenciaRepository.PontoMapaProjection> resultados = ocorrenciaRepository
                .findPontosMapaAgregadosFiltrados(null, null, null, null, null, null, null, null, null, null);

        assertEquals(4, resultados.size());
        long total = resultados.stream().mapToLong(OcorrenciaRepository.PontoMapaProjection::getTotalOcorrencias).sum();
        assertEquals(5L, total);

        OcorrenciaRepository.PontoMapaProjection pontoSaoLuis = resultados.stream()
                .filter(ponto -> "Sao Luis".equals(ponto.getCidade()) && "MA".equals(ponto.getUf()))
                .findFirst()
                .orElseThrow();
        assertEquals(2L, pontoSaoLuis.getTotalOcorrencias());
    }

    @Test
    void deveFiltrarPontosMapaPorVetorParasitaEFonteTipoFonte() {
        BaseIds ids = persistirMassaParaFiltros();

        List<OcorrenciaRepository.PontoMapaProjection> porVetorParasita = ocorrenciaRepository
                .findPontosMapaAgregadosFiltrados(
                        null, null, null, null, null, null,
                        ids.vetorAId(), ids.parasitaAId(), null, null
                );
        assertEquals(2, porVetorParasita.size());

        List<OcorrenciaRepository.PontoMapaProjection> porFonteTipoFonte = ocorrenciaRepository
                .findPontosMapaAgregadosFiltrados(
                        null, null, null, null, null, null,
                        null, null, ids.fonteArtigoId(), "artigo"
                );
        assertEquals(2, porFonteTipoFonte.size());
    }

    @Test
    void deveUsarCoordenadasDoIbgeComFallbackParaLocal() {
        persistirMassaParaFiltros();

        List<OcorrenciaRepository.PontoMapaProjection> resultados = ocorrenciaRepository
                .findPontosMapaAgregadosFiltrados(null, null, null, null, null, null, null, null, null, null);

        OcorrenciaRepository.PontoMapaProjection pontoSaoLuis = resultados.stream()
                .filter(ponto -> "Sao Luis".equals(ponto.getCidade()) && "MA".equals(ponto.getUf()))
                .findFirst()
                .orElseThrow();

        assertEquals(0, pontoSaoLuis.getLatitude().compareTo(new BigDecimal("-2.5299")));
        assertEquals(0, pontoSaoLuis.getLongitude().compareTo(new BigDecimal("-44.3019")));

        OcorrenciaRepository.PontoMapaProjection pontoNiteroi = resultados.stream()
                .filter(ponto -> "Niteroi".equals(ponto.getCidade()) && "RJ".equals(ponto.getUf()))
                .findFirst()
                .orElseThrow();

        assertEquals(0, pontoNiteroi.getLatitude().compareTo(new BigDecimal("-22.8832")));
        assertEquals(0, pontoNiteroi.getLongitude().compareTo(new BigDecimal("-43.1034")));
    }

    @Test
    void deveBuscarResumoPorId() {
        BaseIds ids = persistirMassaParaFiltros();

        Optional<OcorrenciaRepository.OcorrenciaResumoProjection> resultado =
                ocorrenciaRepository.findResumoById(ids.ocorrencia1Id());

        assertTrue(resultado.isPresent());
        assertEquals(ids.ocorrencia1Id(), resultado.get().getIdOcorrencia());
        assertEquals("artigo", resultado.get().getTipoFonte());
    }

    private BaseIds persistirMassaParaFiltros() {
        Doenca doencaA = new Doenca();
        doencaA.setNomeCientifico("Doenca A");
        doencaA.setNomeComumJson("{\"pt\":\"A\"}");
        entityManager.persist(doencaA);

        Doenca doencaB = new Doenca();
        doencaB.setNomeCientifico("Doenca B");
        doencaB.setNomeComumJson("{\"pt\":\"B\"}");
        entityManager.persist(doencaB);

        Parasito parasitaA = new Parasito();
        parasitaA.setDoenca(doencaA);
        parasitaA.setNomeCientifico("Parasito A");
        entityManager.persist(parasitaA);

        Parasito parasitaB = new Parasito();
        parasitaB.setDoenca(doencaB);
        parasitaB.setNomeCientifico("Parasito B");
        entityManager.persist(parasitaB);

        Vetor vetorA = new Vetor();
        vetorA.setNomeCientifico("Vetor A");
        vetorA.setNomeComumJson("{\"pt\":\"VA\"}");
        entityManager.persist(vetorA);

        Vetor vetorB = new Vetor();
        vetorB.setNomeCientifico("Vetor B");
        vetorB.setNomeComumJson("{\"pt\":\"VB\"}");
        entityManager.persist(vetorB);

        vetorA.getParasitos().add(parasitaA);
        vetorB.getParasitos().add(parasitaB);

        Fonte fonteArtigo = new Fonte();
        fonteArtigo.setNomeFonte("Fonte Artigo");
        fonteArtigo.setTipoFonte("artigo");
        fonteArtigo.setData(LocalDate.of(2020, 1, 1));
        entityManager.persist(fonteArtigo);

        Fonte fonteRelatorio = new Fonte();
        fonteRelatorio.setNomeFonte("Fonte Relatorio");
        fonteRelatorio.setTipoFonte("relatorio");
        fonteRelatorio.setData(LocalDate.of(2021, 1, 1));
        entityManager.persist(fonteRelatorio);

        Fonte fonteTese = new Fonte();
        fonteTese.setNomeFonte("Fonte Tese");
        fonteTese.setTipoFonte("tese");
        fonteTese.setData(LocalDate.of(2022, 1, 1));
        entityManager.persist(fonteTese);

        inserirMunicipioIbge("2111300", "Sao Luis", -2.5299d, -44.3019d);
        inserirMunicipioIbge("2111301", "Sao Luis", -2.5000d, -44.2000d);
        inserirMunicipioIbge("3550308", "Campinas", -22.9053d, -47.0632d);
        inserirMunicipioIbge("2105302", "Imperatriz", -5.5263d, -47.4916d);

        Local localMaSaoLuis = criarLocal("MA", "Sao Luis", "Centro", "-44.3028", "-2.5307");
        Local localMaImperatriz = criarLocal("MA", "Imperatriz", "Centro", "-47.4917", "-5.5264");
        Local localSpCampinas = criarLocal("SP", "Campinas", "Centro", "-47.0608", "-22.9056");
        Local localRjNiteroi = criarLocal("RJ", "Niteroi", "Centro", "-43.1034", "-22.8832");

        Hospedeiro hospedeiroHumano = criarHospedeiro("Homo sapiens");
        Humano humano = new Humano();
        humano.setHospedeiro(hospedeiroHumano);
        entityManager.persist(humano);

        Hospedeiro hospedeiroCompanhia = criarHospedeiro("Canis lupus familiaris");
        AnimalCompanhia animalCompanhia = new AnimalCompanhia();
        animalCompanhia.setHospedeiro(hospedeiroCompanhia);
        entityManager.persist(animalCompanhia);

        Hospedeiro hospedeiroSelvagem = criarHospedeiro("Mazama americana");
        AnimalSelvagem animalSelvagem = new AnimalSelvagem();
        animalSelvagem.setHospedeiro(hospedeiroSelvagem);
        entityManager.persist(animalSelvagem);

        Hospedeiro hospedeiroProducao = criarHospedeiro("Bos taurus");
        AnimalProducao animalProducao = new AnimalProducao();
        animalProducao.setHospedeiro(hospedeiroProducao);
        entityManager.persist(animalProducao);

        entityManager.flush();

        Integer ocorrencia1Id = criarOcorrencia(
                LocalDate.of(2020, 1, 10),
                localMaSaoLuis,
                hospedeiroHumano,
                doencaA,
                vetorA,
                Set.of(fonteArtigo, fonteRelatorio)
        );

        Integer ocorrencia2Id = criarOcorrencia(
                LocalDate.of(2021, 3, 20),
                localMaImperatriz,
                hospedeiroCompanhia,
                doencaB,
                vetorB,
                Set.of(fonteTese)
        );

        Integer ocorrencia3Id = criarOcorrencia(
                LocalDate.of(2022, 5, 5),
                localSpCampinas,
                hospedeiroSelvagem,
                doencaA,
                vetorA,
                Set.of(fonteRelatorio)
        );

        Integer ocorrencia4Id = criarOcorrencia(
                LocalDate.of(2023, 7, 15),
                localRjNiteroi,
                hospedeiroProducao,
                doencaB,
                vetorB,
                Set.of(fonteArtigo)
        );

        entityManager.flush();
        entityManager.clear();

        return new BaseIds(
                doencaA.getId(),
                vetorA.getId(),
                parasitaA.getId(),
                parasitaB.getId(),
                fonteArtigo.getId(),
                ocorrencia1Id,
                ocorrencia2Id,
                ocorrencia3Id,
                ocorrencia4Id
        );
    }

    private Local criarLocal(String uf, String cidade, String bairro, String longitude, String latitude) {
        Local local = new Local();
        local.setUf(uf);
        local.setCidade(cidade);
        local.setBairro(bairro);
        local.setLongitude(new BigDecimal(longitude));
        local.setLatitude(new BigDecimal(latitude));
        entityManager.persist(local);
        return local;
    }

    private void inserirMunicipioIbge(String codigo, String nome, double latitude, double longitude) {
        entityManager.createNativeQuery("""
                insert into "ibge_municipios_2025" (cd_mun, nm_mun, latitude, longitude)
                values (:codigo, :nome, :latitude, :longitude)
                """)
                .setParameter("codigo", codigo)
                .setParameter("nome", nome)
                .setParameter("latitude", latitude)
                .setParameter("longitude", longitude)
                .executeUpdate();
    }

    private Hospedeiro criarHospedeiro(String especie) {
        Hospedeiro hospedeiro = new Hospedeiro();
        hospedeiro.setSexo("F");
        hospedeiro.setIdade("30");
        hospedeiro.setEspecie(especie);
        entityManager.persist(hospedeiro);
        return hospedeiro;
    }

    private Integer criarOcorrencia(
            LocalDate data,
            Local local,
            Hospedeiro hospedeiro,
            Doenca doenca,
            Vetor vetor,
            Set<Fonte> fontes
    ) {
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setData(data);
        ocorrencia.setParteCorpo("perna");
        ocorrencia.setTratamento("limpeza");
        ocorrencia.setDesfecho("cura");
        ocorrencia.setDoenca(doenca);
        ocorrencia.setHospedeiro(hospedeiro);
        ocorrencia.setLocal(local);
        ocorrencia.setVetor(vetor);
        ocorrencia.setFontes(new LinkedHashSet<>(fontes));
        entityManager.persist(ocorrencia);
        entityManager.flush();
        return ocorrencia.getId();
    }

    private record BaseIds(
            Integer doencaAId,
            Integer vetorAId,
            Integer parasitaAId,
            Integer parasitaBId,
            Integer fonteArtigoId,
            Integer ocorrencia1Id,
            Integer ocorrencia2Id,
            Integer ocorrencia3Id,
            Integer ocorrencia4Id
    ) {
    }
}
