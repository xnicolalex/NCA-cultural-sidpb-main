package com.nca.sistema_miiase_app.service.analytics;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.nca.sistema_miiase_app.domain.repository.OcorrenciaRepository;
import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.mapa.MapDataResponseDto;

@ExtendWith(MockitoExtension.class)
class MapDataServiceTest {

    @Mock
    private OcorrenciaRepository ocorrenciaRepository;

    @Mock
    private OcorrenciaFiltroNormalizer ocorrenciaFiltroNormalizer;

    @InjectMocks
    private MapDataService mapDataService;

    @Test
    void buscarPontosMapaDeveConverterProjectionECalcularTotalGeral() {
        OcorrenciaFiltroDto filtro = new OcorrenciaFiltroDto();
        OcorrenciaFiltroNormalizer.FiltroNormalizado normalizado = new OcorrenciaFiltroNormalizer.FiltroNormalizado(
                "SP", "Campinas", null, null, null, null, null, null, null, null
        );

        OcorrenciaRepository.PontoMapaProjection projectionA = projection(
                1, "Campinas", "SP", "-22.9056", "-47.0608", 2L
        );
        OcorrenciaRepository.PontoMapaProjection projectionB = projection(
                2, "Valinhos", "SP", "-22.9706", "-46.9950", 3L
        );

        when(ocorrenciaFiltroNormalizer.normalizar(filtro)).thenReturn(normalizado);
        when(ocorrenciaRepository.findPontosMapaAgregadosFiltrados(
                "SP", "Campinas", null, null, null, null, null, null, null, null
        )).thenReturn(List.of(projectionA, projectionB));

        MapDataResponseDto resultado = mapDataService.buscarPontosMapa(filtro);

        assertEquals(5L, resultado.getTotalOcorrencias());
        assertEquals(2, resultado.getPontos().size());
        assertEquals("Campinas", resultado.getPontos().get(0).getCidade());
        assertEquals(2L, resultado.getPontos().get(0).getTotalOcorrencias());
        assertEquals("Valinhos", resultado.getPontos().get(1).getCidade());
        assertEquals(3L, resultado.getPontos().get(1).getTotalOcorrencias());

        verify(ocorrenciaRepository).findPontosMapaAgregadosFiltrados(
                "SP", "Campinas", null, null, null, null, null, null, null, null
        );
    }

    @Test
    void buscarPontosMapaDeveRetornarVazioComTotalZero() {
        OcorrenciaFiltroDto filtro = new OcorrenciaFiltroDto();
        OcorrenciaFiltroNormalizer.FiltroNormalizado normalizado = new OcorrenciaFiltroNormalizer.FiltroNormalizado(
                null, null, null, null, null, null, null, null, null, null
        );

        when(ocorrenciaFiltroNormalizer.normalizar(filtro)).thenReturn(normalizado);
        when(ocorrenciaRepository.findPontosMapaAgregadosFiltrados(
                null, null, null, null, null, null, null, null, null, null
        )).thenReturn(List.of());

        MapDataResponseDto resultado = mapDataService.buscarPontosMapa(filtro);

        assertEquals(0L, resultado.getTotalOcorrencias());
        assertEquals(0, resultado.getPontos().size());
    }

    @Test
    void buscarPontosMapaDevePropagarErroDoNormalizador() {
        OcorrenciaFiltroDto filtro = new OcorrenciaFiltroDto();

        when(ocorrenciaFiltroNormalizer.normalizar(filtro))
                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Filtro invalido"));

        ResponseStatusException ex = org.junit.jupiter.api.Assertions.assertThrows(
                ResponseStatusException.class,
                () -> mapDataService.buscarPontosMapa(filtro)
        );
        assertEquals(HttpStatus.BAD_REQUEST, ex.getStatusCode());
    }

    private OcorrenciaRepository.PontoMapaProjection projection(
            Integer idLocal,
            String cidade,
            String uf,
            String latitude,
            String longitude,
            Long total
    ) {
        return new OcorrenciaRepository.PontoMapaProjection() {
            @Override
            public Integer getIdLocal() {
                return idLocal;
            }

            @Override
            public String getCidade() {
                return cidade;
            }

            @Override
            public String getUf() {
                return uf;
            }

            @Override
            public BigDecimal getLatitude() {
                return new BigDecimal(latitude);
            }

            @Override
            public BigDecimal getLongitude() {
                return new BigDecimal(longitude);
            }

            @Override
            public Long getTotalOcorrencias() {
                return total;
            }
        };
    }
}
