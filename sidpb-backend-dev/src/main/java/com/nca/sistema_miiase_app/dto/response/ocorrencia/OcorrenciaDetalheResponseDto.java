package com.nca.sistema_miiase_app.dto.response.ocorrencia;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

//DTO de detalhe de ocorrência.
//Estrutura completa para telas de visualização detalhada.

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class OcorrenciaDetalheResponseDto {

    private Integer idOcorrencia;
    private LocalDate dataOcorrencia;
    private String parteCorpo;
    private String tratamento;
    private String desfecho;
    private LocalResumoDto local;
    private HospedeiroResumoDto hospedeiro;
    private DoencaResumoDto doenca;
    private VetorResumoDto vetor;
    private List<FonteResumoDto> fontes = new ArrayList<>();

    // Resumo de localidade para detalhe da ocorrência. 
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class LocalResumoDto {
        private String uf;
        private String cidade;
        private String bairro;
        private BigDecimal longitude;
        private BigDecimal latitude;
    }

    // Resumo do hospedeiro para detalhe da ocorrência.
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class HospedeiroResumoDto {
        private Integer idHospedeiro;
        private String sexo;
        private String idade;
        private String especie;
    }

    // Resumo da doença para detalhe da ocorrência. */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DoencaResumoDto {
        private Integer idDoenca;
        private String nomeCientifico;
        private String nomeComumJson;
    }

    //Resumo do vetor para detalhe da ocorrência. 
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class VetorResumoDto {

        private Integer idVetor;
        private String nomeCientifico;
        private String nomeComumJson;
    }

    // Resumo da fonte científica para detalhe da ocorrência. 
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class FonteResumoDto {

        private Integer idFonte;
        private String nomeFonte;
        private String tipoFonte;
        private String autor;
        private String titulo;
        private String url;
        private LocalDate data;
    }
}
