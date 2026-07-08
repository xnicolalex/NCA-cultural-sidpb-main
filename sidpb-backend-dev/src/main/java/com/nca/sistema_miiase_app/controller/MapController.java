package com.nca.sistema_miiase_app.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.mapa.MapDataResponseDto;
import com.nca.sistema_miiase_app.service.analytics.MapDataService;

@RestController
@RequestMapping("/api/mapa")
public class MapController {

    private final MapDataService mapDataService;

    public MapController(MapDataService mapDataService) {
        this.mapDataService = mapDataService;
    }

    @GetMapping("/pontos")
    public ResponseEntity<MapDataResponseDto> buscarPontosMapa(@ModelAttribute OcorrenciaFiltroDto filtros) {
        return ResponseEntity.ok(mapDataService.buscarPontosMapa(filtros));
    }
}
