package com.nca.sistema_miiase_app.dto.response.mapa;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MapDataResponseDto {

    private Long totalOcorrencias;
    private List<MapPointDto> pontos = new ArrayList<>();
}
