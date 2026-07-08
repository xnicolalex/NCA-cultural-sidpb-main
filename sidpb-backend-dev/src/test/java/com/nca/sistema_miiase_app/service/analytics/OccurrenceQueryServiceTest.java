package com.nca.sistema_miiase_app.service.analytics;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.web.server.ResponseStatusException;

import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;
import com.nca.sistema_miiase_app.domain.repository.OcorrenciaRepository;
import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaDetalheResponseDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaResumoResponseDto;
import com.nca.sistema_miiase_app.mapper.OccurrenceQueryMapper;

@ExtendWith(MockitoExtension.class)
class OccurrenceQueryServiceTest {

    @Mock
    private OcorrenciaRepository ocorrenciaRepository;

    @Mock
    private OccurrenceQueryMapper occurrenceQueryMapper;

    @Mock
    private OcorrenciaFiltroNormalizer ocorrenciaFiltroNormalizer;

    @InjectMocks
    private OccurrenceQueryService service;

    @Test
    void listarOcorrenciasDeveDelegarParaRepositoryEMapperSemFiltros() {
        OcorrenciaFiltroDto filtro = new OcorrenciaFiltroDto();
        OcorrenciaFiltroNormalizer.FiltroNormalizado filtroNormalizado = new OcorrenciaFiltroNormalizer.FiltroNormalizado(
                null, null, null, null, null, null, null, null, null, null
        );
        List<OcorrenciaRepository.OcorrenciaResumoProjection> projections = List.of();
        List<OcorrenciaResumoResponseDto> esperado = List.of(new OcorrenciaResumoResponseDto());

        when(ocorrenciaFiltroNormalizer.normalizar(filtro)).thenReturn(filtroNormalizado);
        when(ocorrenciaRepository.findOcorrenciasParaResumoFiltradas(
                null, null, null, null, null, null, null, null, null, null
        )).thenReturn(projections);
        when(occurrenceQueryMapper.toResumoDtoList(projections)).thenReturn(esperado);

        List<OcorrenciaResumoResponseDto> resultado = service.listarOcorrencias(filtro);

        assertEquals(esperado, resultado);
        verify(ocorrenciaFiltroNormalizer).normalizar(filtro);
        verify(ocorrenciaRepository).findOcorrenciasParaResumoFiltradas(
                null, null, null, null, null, null, null, null, null, null
        );
        verify(occurrenceQueryMapper).toResumoDtoList(projections);
    }

    @Test
    void listarOcorrenciasDeveUsarFiltrosNormalizados() {
        OcorrenciaFiltroDto filtro = new OcorrenciaFiltroDto();
        OcorrenciaFiltroNormalizer.FiltroNormalizado filtroNormalizado = new OcorrenciaFiltroNormalizer.FiltroNormalizado(
                "MA", "Sao Luis", 2020, 2024, "HUMANO", 1, 2, 3, 4, "artigo"
        );

        when(ocorrenciaFiltroNormalizer.normalizar(filtro)).thenReturn(filtroNormalizado);
        when(ocorrenciaRepository.findOcorrenciasParaResumoFiltradas(
                "MA", "Sao Luis", 2020, 2024, "HUMANO", 1, 2, 3, 4, "artigo"
        )).thenReturn(List.of());
        when(occurrenceQueryMapper.toResumoDtoList(List.of())).thenReturn(List.of());

        service.listarOcorrencias(filtro);

        verify(ocorrenciaRepository).findOcorrenciasParaResumoFiltradas(
                "MA", "Sao Luis", 2020, 2024, "HUMANO", 1, 2, 3, 4, "artigo"
        );
    }

    @Test
    void listarOcorrenciasDevePropagarBadRequestDoNormalizador() {
        OcorrenciaFiltroDto filtro = new OcorrenciaFiltroDto();
        when(ocorrenciaFiltroNormalizer.normalizar(filtro))
                .thenThrow(new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Filtro invalido"));

        assertThrows(ResponseStatusException.class, () -> service.listarOcorrencias(filtro));
    }

    @Test
    void buscarOcorrenciaResumidaPorIdDeveRetornarResumoQuandoEncontrar() {
        Integer id = 8;
        OcorrenciaRepository.OcorrenciaResumoProjection resumoProjection = new OcorrenciaRepository.OcorrenciaResumoProjection() {
            @Override
            public Integer getIdOcorrencia() { return id; }
            @Override
            public LocalDate getDataOcorrencia() { return LocalDate.of(2026, 5, 2); }
            @Override
            public String getDoencaNomeCientifico() { return "Doenca"; }
            @Override
            public String getDoencaNomeComum() { return "{}"; }
            @Override
            public String getHospedeiroEspecie() { return "Homo sapiens"; }
            @Override
            public String getLocalUf() { return "SP"; }
            @Override
            public String getLocalCidade() { return "Campinas"; }
            @Override
            public String getLocalBairro() { return "Centro"; }
            @Override
            public String getVetorNomeCientifico() { return "Vetor"; }
            @Override
            public String getTipoFonte() { return "artigo"; }
            @Override
            public String getNomeFonte() { return "Fonte"; }
        };

        OcorrenciaResumoResponseDto resumoDto = new OcorrenciaResumoResponseDto();
        resumoDto.setIdOcorrencia(id);

        when(ocorrenciaRepository.findResumoById(id)).thenReturn(Optional.of(resumoProjection));
        when(occurrenceQueryMapper.toResumoDto(resumoProjection)).thenReturn(resumoDto);

        OcorrenciaResumoResponseDto resultado = service.buscarOcorrenciaResumidaPorId(id);

        assertEquals(id, resultado.getIdOcorrencia());
        verify(ocorrenciaRepository).findResumoById(id);
        verify(occurrenceQueryMapper).toResumoDto(resumoProjection);
    }

    @Test
    void buscarOcorrenciaResumidaPorIdDeveLancarExcecaoQuandoNaoEncontrar() {
        Integer id = 100;
        when(ocorrenciaRepository.findResumoById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.buscarOcorrenciaResumidaPorId(id));
        verify(ocorrenciaRepository).findResumoById(id);
    }

    @Test
    void buscarOcorrenciaPorIdDeveRetornarDetalheQuandoEncontrar() {
        Integer id = 7;
        Ocorrencia ocorrencia = new Ocorrencia();
        ocorrencia.setId(id);

        OcorrenciaDetalheResponseDto detalhe = new OcorrenciaDetalheResponseDto();
        detalhe.setIdOcorrencia(id);
        detalhe.setDataOcorrencia(LocalDate.of(2026, 5, 1));

        when(ocorrenciaRepository.findDetalheById(id)).thenReturn(Optional.of(ocorrencia));
        when(occurrenceQueryMapper.toDetalheDto(ocorrencia)).thenReturn(detalhe);

        OcorrenciaDetalheResponseDto resultado = service.buscarOcorrenciaDetalhadaPorId(id);

        assertEquals(id, resultado.getIdOcorrencia());
        verify(ocorrenciaRepository).findDetalheById(id);
        verify(occurrenceQueryMapper).toDetalheDto(ocorrencia);
    }

    @Test
    void buscarOcorrenciaPorIdDeveLancarExcecaoQuandoNaoEncontrar() {
        Integer id = 99;
        when(ocorrenciaRepository.findDetalheById(id)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> service.buscarOcorrenciaDetalhadaPorId(id));
        verify(ocorrenciaRepository).findDetalheById(id);
    }
}
