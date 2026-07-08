package com.nca.sistema_miiase_app.dto.response.ocorrencia;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class OcorrenciaResumoResponseDto {
    // Dto de resumo de uma ocorrência   
    private Integer idOcorrencia;
    private LocalDate dataOcorrencia;
    private String doencaNomeCientifico;
    private String doencaNomeComum;
    private String hospedeiroEspecie;
    private String localUf;
    private String localCidade;
    private String localBairro;
    private String vetorNomeCientifico;
    private String tipoFonte;
    private String nomeFonte;
}
