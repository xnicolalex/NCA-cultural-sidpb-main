package com.nca.sistema_miiase_app.mapper;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

import org.junit.jupiter.api.Test;

import com.nca.sistema_miiase_app.domain.entity.Doenca;
import com.nca.sistema_miiase_app.domain.entity.Fonte;
import com.nca.sistema_miiase_app.domain.entity.Hospedeiro;
import com.nca.sistema_miiase_app.domain.entity.Local;
import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;
import com.nca.sistema_miiase_app.domain.entity.Vetor;
import com.nca.sistema_miiase_app.domain.repository.OcorrenciaRepository;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaDetalheResponseDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaResumoResponseDto;

class OccurrenceQueryMapperTest {

    private final OccurrenceQueryMapper mapper = new OccurrenceQueryMapper();

    @Test
    void deveConverterProjectionParaResumoDto() {
        OcorrenciaRepository.OcorrenciaResumoProjection projection = new OcorrenciaRepository.OcorrenciaResumoProjection() {
            @Override
            public Integer getIdOcorrencia() { return 11; }
            @Override
            public LocalDate getDataOcorrencia() { return LocalDate.of(2026, 5, 2); }
            @Override
            public String getDoencaNomeCientifico() { return "Doenca X"; }
            @Override
            public String getDoencaNomeComum() { return "{\"pt\":\"Bicheira\"}"; }
            @Override
            public String getHospedeiroEspecie() { return "Canis lupus"; }
            @Override
            public String getLocalUf() { return "RJ"; }
            @Override
            public String getLocalCidade() { return "Rio de Janeiro"; }
            @Override
            public String getLocalBairro() { return "Centro"; }
            @Override
            public String getVetorNomeCientifico() { return "C. hominivorax"; }
            @Override
            public String getTipoFonte() { return "artigo"; }
            @Override
            public String getNomeFonte() { return "Fonte A"; }
        };

        OcorrenciaResumoResponseDto dto = mapper.toResumoDto(projection);

        assertEquals(11, dto.getIdOcorrencia());
        assertEquals("{\"pt\":\"Bicheira\"}", dto.getDoencaNomeComum());
        assertEquals("Fonte A", dto.getNomeFonte());
    }

    @Test
    void deveConverterEntityParaResumoDtoSelecionandoMenorIdFonte() {
        Ocorrencia ocorrencia = buildOcorrenciaBase();

        Fonte fonteId5 = new Fonte();
        fonteId5.setId(5);
        fonteId5.setNomeFonte("Fonte Cinco");
        fonteId5.setTipoFonte("tese");

        Fonte fonteId2 = new Fonte();
        fonteId2.setId(2);
        fonteId2.setNomeFonte("Fonte Dois");
        fonteId2.setTipoFonte("artigo");

        Set<Fonte> fontes = new LinkedHashSet<>();
        fontes.add(fonteId5);
        fontes.add(fonteId2);
        ocorrencia.setFontes(fontes);

        OcorrenciaResumoResponseDto dto = mapper.toResumoDto(ocorrencia);

        assertEquals("Fonte Dois", dto.getNomeFonte());
        assertEquals("artigo", dto.getTipoFonte());
    }

    @Test
    void deveConverterEntityParaDetalheDto() {
        Ocorrencia ocorrencia = buildOcorrenciaBase();

        Fonte fonte = new Fonte();
        fonte.setId(1);
        fonte.setNomeFonte("Fonte Principal");
        fonte.setTipoFonte("artigo");
        fonte.setData(LocalDate.of(2024, 1, 1));

        ocorrencia.setFontes(Set.of(fonte));

        OcorrenciaDetalheResponseDto dto = mapper.toDetalheDto(ocorrencia);

        assertNotNull(dto.getLocal());
        assertNotNull(dto.getHospedeiro());
        assertNotNull(dto.getDoenca());
        assertNotNull(dto.getVetor());
        assertEquals(1, dto.getFontes().size());
    }

    @Test
    void deveConverterListaProjectionParaResumoDtoList() {
        OcorrenciaRepository.OcorrenciaResumoProjection projection = new OcorrenciaRepository.OcorrenciaResumoProjection() {
            @Override
            public Integer getIdOcorrencia() { return 12; }
            @Override
            public LocalDate getDataOcorrencia() { return LocalDate.of(2026, 5, 3); }
            @Override
            public String getDoencaNomeCientifico() { return "Doenca Y"; }
            @Override
            public String getDoencaNomeComum() { return "{}"; }
            @Override
            public String getHospedeiroEspecie() { return "Felis catus"; }
            @Override
            public String getLocalUf() { return "MG"; }
            @Override
            public String getLocalCidade() { return "Belo Horizonte"; }
            @Override
            public String getLocalBairro() { return "Savassi"; }
            @Override
            public String getVetorNomeCientifico() { return "Vetor Y"; }
            @Override
            public String getTipoFonte() { return null; }
            @Override
            public String getNomeFonte() { return null; }
        };

        List<OcorrenciaResumoResponseDto> dtos = mapper.toResumoDtoList(List.of(projection));
        assertEquals(1, dtos.size());
        assertEquals(12, dtos.getFirst().getIdOcorrencia());
    }

    private Ocorrencia buildOcorrenciaBase() {
        Doenca doenca = new Doenca();
        doenca.setId(100);
        doenca.setNomeCientifico("Doenca Teste");
        doenca.setNomeComumJson("{\"pt\":\"Nome Comum\"}");

        Hospedeiro hospedeiro = new Hospedeiro();
        hospedeiro.setId(200);
        hospedeiro.setSexo("F");
        hospedeiro.setIdade("35");
        hospedeiro.setEspecie("Homo sapiens");

        Local local = new Local();
        local.setId(300);
        local.setUf("SP");
        local.setCidade("Campinas");
        local.setBairro("Centro");
        local.setLongitude(new BigDecimal("-47.0608"));
        local.setLatitude(new BigDecimal("-22.9056"));

        Vetor vetor = new Vetor();
        vetor.setId(400);
        vetor.setNomeCientifico("Cochliomyia hominivorax");
        vetor.setNomeComumJson("{\"pt\":\"mosca-da-bicheira\"}");

        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setId(500);
        ocorrencia.setData(LocalDate.of(2026, 5, 10));
        ocorrencia.setParteCorpo("perna");
        ocorrencia.setTratamento("limpeza");
        ocorrencia.setDesfecho("cura");
        ocorrencia.setDoenca(doenca);
        ocorrencia.setHospedeiro(hospedeiro);
        ocorrencia.setLocal(local);
        ocorrencia.setVetor(vetor);
        return ocorrencia;
    }
}
