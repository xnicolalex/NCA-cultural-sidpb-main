package com.nca.sistema_miiase_app.mapper;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.stereotype.Component;

import com.nca.sistema_miiase_app.domain.entity.Fonte;
import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;
import com.nca.sistema_miiase_app.domain.repository.OcorrenciaRepository;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaDetalheResponseDto;
import com.nca.sistema_miiase_app.dto.response.ocorrencia.OcorrenciaResumoResponseDto;

@Component
public class OccurrenceQueryMapper {

    // Método para converter uma entidade Ocorrencia em um DTO de detalhe
    public OcorrenciaDetalheResponseDto toDetalheDto(Ocorrencia ocorrencia) {
        if (ocorrencia == null) {
            return null;
        }

        OcorrenciaDetalheResponseDto dto = new OcorrenciaDetalheResponseDto();
        dto.setIdOcorrencia(ocorrencia.getId());
        dto.setDataOcorrencia(ocorrencia.getData());
        dto.setParteCorpo(ocorrencia.getParteCorpo());
        dto.setTratamento(ocorrencia.getTratamento());
        dto.setDesfecho(ocorrencia.getDesfecho());

        dto.setLocal(new OcorrenciaDetalheResponseDto.LocalResumoDto(
                ocorrencia.getLocal().getUf(),
                ocorrencia.getLocal().getCidade(),
                ocorrencia.getLocal().getBairro(),
                ocorrencia.getLocal().getLongitude(),
                ocorrencia.getLocal().getLatitude()
        ));

        dto.setHospedeiro(new OcorrenciaDetalheResponseDto.HospedeiroResumoDto(
                ocorrencia.getHospedeiro().getId(),
                ocorrencia.getHospedeiro().getSexo(),
                ocorrencia.getHospedeiro().getIdade(),
                ocorrencia.getHospedeiro().getEspecie()
        ));

        dto.setDoenca(new OcorrenciaDetalheResponseDto.DoencaResumoDto(
                ocorrencia.getDoenca().getId(),
                ocorrencia.getDoenca().getNomeCientifico(),
                ocorrencia.getDoenca().getNomeComumJson()
        ));

        dto.setVetor(new OcorrenciaDetalheResponseDto.VetorResumoDto(
                ocorrencia.getVetor().getId(),
                ocorrencia.getVetor().getNomeCientifico(),
                ocorrencia.getVetor().getNomeComumJson()
        ));

        List<OcorrenciaDetalheResponseDto.FonteResumoDto> fontes = ocorrencia.getFontes()
                .stream()
                .filter(Objects::nonNull)
                .map(this::toFonteResumoDto)
                .toList();
        dto.setFontes(fontes);

        return dto;
    }

    // Método para converter uma projeção de resumo em um DTO de resumo
    public OcorrenciaResumoResponseDto toResumoDto(OcorrenciaRepository.OcorrenciaResumoProjection projection) {
        if (projection == null) {
            return null;
        }

        return new OcorrenciaResumoResponseDto(
                projection.getIdOcorrencia(),
                projection.getDataOcorrencia(),
                projection.getDoencaNomeCientifico(),
                projection.getDoencaNomeComum(),
                projection.getHospedeiroEspecie(),
                projection.getLocalUf(),
                projection.getLocalCidade(),
                projection.getLocalBairro(),
                projection.getVetorNomeCientifico(),
                projection.getTipoFonte(),
                projection.getNomeFonte()
        );
    }

    // Método para converter uma lista de projeções de resumo em uma lista de DTOs de resumo
    public List<OcorrenciaResumoResponseDto> toResumoDtoList(List<OcorrenciaRepository.OcorrenciaResumoProjection> projections) {
        if (projections == null || projections.isEmpty()) {
            return Collections.emptyList();
        }

        List<OcorrenciaResumoResponseDto> dtos = new ArrayList<>(projections.size());
        
        for (OcorrenciaRepository.OcorrenciaResumoProjection projection : projections) {
            dtos.add(toResumoDto(projection));
        }
        return dtos;
    }

    // Método para converter uma entidade Ocorrencia em um DTO de resumo
    public OcorrenciaResumoResponseDto toResumoDto(Ocorrencia ocorrencia) {
        if (ocorrencia == null) {
            return null;
        }

        Optional<Fonte> primeiraFontePorId = ocorrencia.getFontes()
                .stream()
                .filter(Objects::nonNull)
                .filter(fonte -> fonte.getId() != null)
                .min(Comparator.comparing(Fonte::getId));

        String tipoFonte = primeiraFontePorId.map(Fonte::getTipoFonte).orElse(null);
        String nomeFonte = primeiraFontePorId.map(Fonte::getNomeFonte).orElse(null);

        return new OcorrenciaResumoResponseDto(
                ocorrencia.getId(),
                ocorrencia.getData(),
                ocorrencia.getDoenca().getNomeCientifico(),
                ocorrencia.getDoenca().getNomeComumJson(),
                ocorrencia.getHospedeiro().getEspecie(),
                ocorrencia.getLocal().getUf(),
                ocorrencia.getLocal().getCidade(),
                ocorrencia.getLocal().getBairro(),
                ocorrencia.getVetor().getNomeCientifico(),
                tipoFonte,
                nomeFonte
        );
    }

    // Método para converter uma lista de entidades Ocorrencia em uma lista de DTOs de resumo
    public List<OcorrenciaResumoResponseDto> toResumoDtoListFromEntity(List<Ocorrencia> ocorrencias) {
        if (ocorrencias == null || ocorrencias.isEmpty()) {
            return Collections.emptyList();
        }

        List<OcorrenciaResumoResponseDto> dtos = new ArrayList<>(ocorrencias.size());
        for (Ocorrencia ocorrencia : ocorrencias) {
            dtos.add(toResumoDto(ocorrencia));
        }
        return dtos;
    }

    // Método para converter uma entidade Fonte em um DTO de resumo de fonte
    private OcorrenciaDetalheResponseDto.FonteResumoDto toFonteResumoDto(Fonte fonte) {
        return new OcorrenciaDetalheResponseDto.FonteResumoDto(
                fonte.getId(),
                fonte.getNomeFonte(),
                fonte.getTipoFonte(),
                fonte.getAutor(),
                fonte.getTitulo(),
                fonte.getUrl(),
                fonte.getData()
        );
    }
}
