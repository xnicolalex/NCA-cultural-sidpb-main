package com.nca.sistema_miiase_app.dto.filter.ocorrencia;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class OcorrenciaFiltroDto {

    private String uf;
    private String cidade;
    private Integer anoInicial;
    private Integer anoFinal;
    private CategoriaHospedeiro categoriaHospedeiro;
    private Integer doencaId;
    private Integer vetorId;
    private Integer parasitaId;
    private Integer fonteId;
    private String tipoFonte;
}
