package com.nca.sistema_miiase_app.controller;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.math.BigDecimal;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.mapa.MapDataResponseDto;
import com.nca.sistema_miiase_app.dto.response.mapa.MapPointDto;
import com.nca.sistema_miiase_app.service.analytics.MapDataService;

@WebMvcTest(MapController.class)
class MapControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private MapDataService mapDataService;

    @Test
    void deveRetornarPontosMapaComTotal() throws Exception {
        MapDataResponseDto payload = new MapDataResponseDto(
                3L,
                List.of(
                        new MapPointDto(10, "Campinas", "SP", new BigDecimal("-22.9056"), new BigDecimal("-47.0608"), 2L),
                        new MapPointDto(20, "Valinhos", "SP", new BigDecimal("-22.9706"), new BigDecimal("-46.9950"), 1L)
                )
        );
        when(mapDataService.buscarPontosMapa(any(OcorrenciaFiltroDto.class))).thenReturn(payload);

        mockMvc.perform(get("/api/mapa/pontos"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.totalOcorrencias").value(3))
                .andExpect(jsonPath("$.pontos[0].idLocal").value(10))
                .andExpect(jsonPath("$.pontos[0].cidade").value("Campinas"));
    }

    @Test
    void deveRepassarFiltrosParaService() throws Exception {
        when(mapDataService.buscarPontosMapa(any(OcorrenciaFiltroDto.class)))
                .thenReturn(new MapDataResponseDto(0L, List.of()));

        mockMvc.perform(get("/api/mapa/pontos")
                        .queryParam("uf", "Maranhao")
                        .queryParam("cidade", "Sao Luis")
                        .queryParam("anoInicial", "2020")
                        .queryParam("anoFinal", "2023"))
                .andExpect(status().isOk());

        ArgumentCaptor<OcorrenciaFiltroDto> captor = ArgumentCaptor.forClass(OcorrenciaFiltroDto.class);
        verify(mapDataService).buscarPontosMapa(captor.capture());
        OcorrenciaFiltroDto filtro = captor.getValue();
        assertEquals("Maranhao", filtro.getUf());
        assertEquals("Sao Luis", filtro.getCidade());
        assertEquals(2020, filtro.getAnoInicial());
        assertEquals(2023, filtro.getAnoFinal());
    }

    @Test
    void deveRetornar400QuandoFiltroInvalido() throws Exception {
        when(mapDataService.buscarPontosMapa(any(OcorrenciaFiltroDto.class)))
                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Filtro invalido"));

        mockMvc.perform(get("/api/mapa/pontos").queryParam("uf", "Atlantida"))
                .andExpect(status().isBadRequest());
    }
}
