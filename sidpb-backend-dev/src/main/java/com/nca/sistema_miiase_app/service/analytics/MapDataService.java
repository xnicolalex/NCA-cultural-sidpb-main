package com.nca.sistema_miiase_app.service.analytics;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nca.sistema_miiase_app.domain.repository.OcorrenciaRepository;
import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.mapa.MapDataResponseDto;
import com.nca.sistema_miiase_app.dto.response.mapa.MapPointDto;

@Service
@Transactional(readOnly = true)
public class MapDataService {

    private final OcorrenciaRepository ocorrenciaRepository;
    private final OcorrenciaFiltroNormalizer ocorrenciaFiltroNormalizer;

    public MapDataService(
            OcorrenciaRepository ocorrenciaRepository,
            OcorrenciaFiltroNormalizer ocorrenciaFiltroNormalizer
    ) {
        this.ocorrenciaRepository = ocorrenciaRepository;
        this.ocorrenciaFiltroNormalizer = ocorrenciaFiltroNormalizer;
    }

    public MapDataResponseDto buscarPontosMapa(OcorrenciaFiltroDto filtros) {
        OcorrenciaFiltroNormalizer.FiltroNormalizado filtroNormalizado = ocorrenciaFiltroNormalizer.normalizar(filtros);

        List<MapPointDto> pontos = ocorrenciaRepository.findPontosMapaAgregadosFiltrados(
                        filtroNormalizado.uf(),
                        filtroNormalizado.cidade(),
                        filtroNormalizado.anoInicial(),
                        filtroNormalizado.anoFinal(),
                        filtroNormalizado.categoriaHospedeiro(),
                        filtroNormalizado.doencaId(),
                        filtroNormalizado.vetorId(),
                        filtroNormalizado.parasitaId(),
                        filtroNormalizado.fonteId(),
                        filtroNormalizado.tipoFonte()
                ).stream()
                .map(this::toMapPointDto)
                .toList();

        long totalOcorrencias = pontos.stream()
                .map(MapPointDto::getTotalOcorrencias)
                .filter(total -> total != null)
                .mapToLong(Long::longValue)
                .sum();

        return new MapDataResponseDto(totalOcorrencias, pontos);
    }

    private MapPointDto toMapPointDto(OcorrenciaRepository.PontoMapaProjection projection) {
        return new MapPointDto(
                projection.getIdLocal(),
                projection.getCidade(),
                projection.getUf(),
                projection.getLatitude(),
                projection.getLongitude(),
                projection.getTotalOcorrencias()
        );
    }
}
