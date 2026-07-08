package com.nca.sistema_miiase_app.service.analytics;

import java.util.List;
import java.util.NoSuchElementException;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;
import com.nca.sistema_miiase_app.domain.repository.OcorrenciaRepository;
import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaDetalheResponseDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaResumoResponseDto;
import com.nca.sistema_miiase_app.mapper.OccurrenceQueryMapper;

@Service
@Transactional(readOnly = true)
public class OccurrenceQueryService {

    private final OcorrenciaRepository ocorrenciaRepository;
    private final OccurrenceQueryMapper occurrenceQueryMapper;
    private final OcorrenciaFiltroNormalizer ocorrenciaFiltroNormalizer;

    public OccurrenceQueryService(
            OcorrenciaRepository ocorrenciaRepository,
            OccurrenceQueryMapper occurrenceQueryMapper,
            OcorrenciaFiltroNormalizer ocorrenciaFiltroNormalizer
    ) {
        this.ocorrenciaRepository = ocorrenciaRepository;
        this.occurrenceQueryMapper = occurrenceQueryMapper;
        this.ocorrenciaFiltroNormalizer = ocorrenciaFiltroNormalizer;
    }

    public List<OcorrenciaResumoResponseDto> listarOcorrencias(OcorrenciaFiltroDto filtro) {
        OcorrenciaFiltroNormalizer.FiltroNormalizado filtroNormalizado = ocorrenciaFiltroNormalizer.normalizar(filtro);

        return occurrenceQueryMapper.toResumoDtoList(
                ocorrenciaRepository.findOcorrenciasParaResumoFiltradas(
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
                )
        );
    }

    public OcorrenciaResumoResponseDto buscarOcorrenciaResumidaPorId(Integer id) {
        OcorrenciaRepository.OcorrenciaResumoProjection resumo = ocorrenciaRepository.findResumoById(id)
                .orElseThrow(() -> new NoSuchElementException("Ocorrencia nao encontrada para id: " + id));

        return occurrenceQueryMapper.toResumoDto(resumo);
    }

    public OcorrenciaDetalheResponseDto buscarOcorrenciaDetalhadaPorId(Integer id) {
        Ocorrencia ocorrencia = ocorrenciaRepository.findDetalheById(id)
                .orElseThrow(() -> new NoSuchElementException("Ocorrencia nao encontrada para id: " + id));

        return occurrenceQueryMapper.toDetalheDto(ocorrencia);
    }
}
