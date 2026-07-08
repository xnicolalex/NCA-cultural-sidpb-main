package com.nca.sistema_miiase_app.dto.response.mapa;

import java.math.BigDecimal;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MapPointDto {

    private Integer idLocal;
    private String cidade;
    private String uf;
    private BigDecimal latitude;
    private BigDecimal longitude;
    private Long totalOcorrencias;
}
