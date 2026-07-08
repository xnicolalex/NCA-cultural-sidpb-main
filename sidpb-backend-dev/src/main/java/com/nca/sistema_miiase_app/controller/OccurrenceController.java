package com.nca.sistema_miiase_app.controller;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaDetalheResponseDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaResumoResponseDto;
import com.nca.sistema_miiase_app.service.analytics.OccurrenceQueryService;

@RestController
@RequestMapping("/api/occurrences")
public class OccurrenceController {

    private final OccurrenceQueryService occurrenceQueryService;

    public OccurrenceController(OccurrenceQueryService occurrenceQueryService) {
        this.occurrenceQueryService = occurrenceQueryService;
    }

    // devolve uma lista de resumos de ocorrencias
    @GetMapping
    public ResponseEntity<List<OcorrenciaResumoResponseDto>> listarOcorrencias(@ModelAttribute OcorrenciaFiltroDto filtro ) {
        return ResponseEntity.ok(occurrenceQueryService.listarOcorrencias(filtro));
    }

    // devolve resumo especificado por um ID
    @GetMapping("/resumo/{id}")
    public ResponseEntity<OcorrenciaResumoResponseDto> buscarOcorrenciaResumidaPorId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(occurrenceQueryService.buscarOcorrenciaResumidaPorId(id));
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }

    // retorna ocorrencia detalhada especificada por um ID
    @GetMapping("/{id}")
    public ResponseEntity<OcorrenciaDetalheResponseDto> buscarOcorrenciaPorId(@PathVariable Integer id) {
        try {
            return ResponseEntity.ok(occurrenceQueryService.buscarOcorrenciaDetalhadaPorId(id));
        } catch (NoSuchElementException ex) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, ex.getMessage(), ex);
        }
    }
}
