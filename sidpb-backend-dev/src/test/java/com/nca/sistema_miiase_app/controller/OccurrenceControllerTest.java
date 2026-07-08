package com.nca.sistema_miiase_app.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;

import org.junit.jupiter.api.Test;
import org.mockito.ArgumentCaptor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.webmvc.test.autoconfigure.WebMvcTest;
import org.springframework.http.HttpStatus;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.server.ResponseStatusException;

import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaDetalheResponseDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaResumoResponseDto;
import com.nca.sistema_miiase_app.service.analytics.OccurrenceQueryService;

@WebMvcTest(OccurrenceController.class)
class OccurrenceControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private OccurrenceQueryService occurrenceQueryService;

    @Test
    void deveListarOcorrenciasSemFiltros() throws Exception {
        List<OcorrenciaResumoResponseDto> payload = List.of(
                new OcorrenciaResumoResponseDto(
                        2, LocalDate.of(2026, 5, 2), "Doenca B", "{\"pt\":\"Bicheira\"}",
                        "Canis lupus", "RJ", "Rio de Janeiro", "Centro", "Vetor B",
                        "artigo", "Fonte B"
                )
        );
        when(occurrenceQueryService.listarOcorrencias(any(OcorrenciaFiltroDto.class))).thenReturn(payload);

        mockMvc.perform(get("/api/occurrences"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].idOcorrencia").value(2))
                .andExpect(jsonPath("$[0].nomeFonte").value("Fonte B"));
    }

    @Test
    void deveRepassarUfECidadeNoFiltro() throws Exception {
        when(occurrenceQueryService.listarOcorrencias(any(OcorrenciaFiltroDto.class))).thenReturn(List.of());

        mockMvc.perform(get("/api/occurrences")
                        .queryParam("uf", "Maranhao")
                        .queryParam("cidade", "Sao Luis"))
                .andExpect(status().isOk());

        ArgumentCaptor<OcorrenciaFiltroDto> captor = ArgumentCaptor.forClass(OcorrenciaFiltroDto.class);
        verify(occurrenceQueryService).listarOcorrencias(captor.capture());
        OcorrenciaFiltroDto filtro = captor.getValue();
        assertEquals("Maranhao", filtro.getUf());
        assertEquals("Sao Luis", filtro.getCidade());
    }

    @Test
    void deveRepassarFiltroSomenteCidade() throws Exception {
        when(occurrenceQueryService.listarOcorrencias(any(OcorrenciaFiltroDto.class))).thenReturn(List.of());

        mockMvc.perform(get("/api/occurrences").queryParam("cidade", "Campinas"))
                .andExpect(status().isOk());

        ArgumentCaptor<OcorrenciaFiltroDto> captor = ArgumentCaptor.forClass(OcorrenciaFiltroDto.class);
        verify(occurrenceQueryService).listarOcorrencias(captor.capture());
        OcorrenciaFiltroDto filtro = captor.getValue();
        assertEquals("Campinas", filtro.getCidade());
    }

    @Test
    void deveRepassarCombinacoesDeFonteEVetorParasita() throws Exception {
        when(occurrenceQueryService.listarOcorrencias(any(OcorrenciaFiltroDto.class))).thenReturn(List.of());

        mockMvc.perform(get("/api/occurrences")
                        .queryParam("vetorId", "10")
                        .queryParam("parasitaId", "11")
                        .queryParam("fonteId", "20")
                        .queryParam("tipoFonte", "artigo"))
                .andExpect(status().isOk());

        ArgumentCaptor<OcorrenciaFiltroDto> captor = ArgumentCaptor.forClass(OcorrenciaFiltroDto.class);
        verify(occurrenceQueryService).listarOcorrencias(captor.capture());
        OcorrenciaFiltroDto filtro = captor.getValue();
        assertEquals(10, filtro.getVetorId());
        assertEquals(11, filtro.getParasitaId());
        assertEquals(20, filtro.getFonteId());
        assertEquals("artigo", filtro.getTipoFonte());
    }

    @Test
    void deveRetornar400QuandoFiltroInvalido() throws Exception {
        when(occurrenceQueryService.listarOcorrencias(any(OcorrenciaFiltroDto.class)))
                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Filtro invalido"));

        mockMvc.perform(get("/api/occurrences").queryParam("uf", "Atlantida"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deveRetornar400QuandoAnoInvalido() throws Exception {
        when(occurrenceQueryService.listarOcorrencias(any(OcorrenciaFiltroDto.class)))
                .thenThrow(new ResponseStatusException(HttpStatus.BAD_REQUEST, "Filtro invalido: anoInicial"));

        mockMvc.perform(get("/api/occurrences")
                        .queryParam("anoInicial", "2026")
                        .queryParam("anoFinal", "2025"))
                .andExpect(status().isBadRequest());
    }

    @Test
    void deveBuscarOcorrenciaResumoPorId() throws Exception {
        OcorrenciaResumoResponseDto payload = new OcorrenciaResumoResponseDto(
                2, LocalDate.of(2026, 5, 2), "Doenca B", "{\"pt\":\"Bicheira\"}",
                "Canis lupus", "RJ", "Rio de Janeiro", "Centro", "Vetor B",
                "artigo", "Fonte B"
        );
        when(occurrenceQueryService.buscarOcorrenciaResumidaPorId(2)).thenReturn(payload);

        mockMvc.perform(get("/api/occurrences/resumo/2"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.idOcorrencia").value(2))
                .andExpect(jsonPath("$.nomeFonte").value("Fonte B"));
    }

    @Test
    void deveRetornar404QuandoResumoNaoExistir() throws Exception {
        when(occurrenceQueryService.buscarOcorrenciaResumidaPorId(anyInt()))
                .thenThrow(new NoSuchElementException("Ocorrencia nao encontrada para id: 999"));

        mockMvc.perform(get("/api/occurrences/resumo/999"))
                .andExpect(status().isNotFound());
    }

    @Test
    void deveBuscarOcorrenciaPorId() throws Exception {
        OcorrenciaDetalheResponseDto payload = new OcorrenciaDetalheResponseDto();
        payload.setIdOcorrencia(3);
        payload.setDataOcorrencia(LocalDate.of(2026, 5, 3));
        when(occurrenceQueryService.buscarOcorrenciaDetalhadaPorId(3)).thenReturn(payload);

        mockMvc.perform(get("/api/occurrences/3"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.idOcorrencia").value(3));
    }

    @Test
    void deveRetornar404QuandoOcorrenciaNaoExistir() throws Exception {
        when(occurrenceQueryService.buscarOcorrenciaDetalhadaPorId(anyInt()))
                .thenThrow(new NoSuchElementException("Ocorrencia nao encontrada para id: 999"));

        mockMvc.perform(get("/api/occurrences/999"))
                .andExpect(status().isNotFound());
    }
}
