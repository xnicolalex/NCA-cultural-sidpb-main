package com.nca.sistema_miiase_app.service.analytics;

import java.text.Normalizer;
import java.util.Map;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.nca.sistema_miiase_app.dto.filter.ocorrencia.CategoriaHospedeiro;
import com.nca.sistema_miiase_app.dto.filter.ocorrencia.OcorrenciaFiltroDto;

@Component
public class OcorrenciaFiltroNormalizer {

    private static final Map<String, String> STATE_NAME_TO_UF = Map.ofEntries(
            Map.entry("ACRE", "AC"),
            Map.entry("ALAGOAS", "AL"),
            Map.entry("AMAPA", "AP"),
            Map.entry("AMAZONAS", "AM"),
            Map.entry("BAHIA", "BA"),
            Map.entry("CEARA", "CE"),
            Map.entry("DISTRITO FEDERAL", "DF"),
            Map.entry("ESPIRITO SANTO", "ES"),
            Map.entry("GOIAS", "GO"),
            Map.entry("MARANHAO", "MA"),
            Map.entry("MATO GROSSO", "MT"),
            Map.entry("MATO GROSSO DO SUL", "MS"),
            Map.entry("MINAS GERAIS", "MG"),
            Map.entry("PARA", "PA"),
            Map.entry("PARAIBA", "PB"),
            Map.entry("PARANA", "PR"),
            Map.entry("PERNAMBUCO", "PE"),
            Map.entry("PIAUI", "PI"),
            Map.entry("RIO DE JANEIRO", "RJ"),
            Map.entry("RIO GRANDE DO NORTE", "RN"),
            Map.entry("RIO GRANDE DO SUL", "RS"),
            Map.entry("RONDONIA", "RO"),
            Map.entry("RORAIMA", "RR"),
            Map.entry("SANTA CATARINA", "SC"),
            Map.entry("SAO PAULO", "SP"),
            Map.entry("SERGIPE", "SE"),
            Map.entry("TOCANTINS", "TO")
    );

    private static final Set<String> VALID_UFS = Set.copyOf(STATE_NAME_TO_UF.values());

    public FiltroNormalizado normalizar(OcorrenciaFiltroDto filtro) {
        OcorrenciaFiltroDto filtroSeguro = filtro;
        if (filtroSeguro == null) {
            filtroSeguro = new OcorrenciaFiltroDto();
        }

        validarIntervaloAnos(filtroSeguro.getAnoInicial(), filtroSeguro.getAnoFinal());

        return new FiltroNormalizado(
                normalizarUfOuEstado(filtroSeguro.getUf()),
                normalizarTexto(filtroSeguro.getCidade()),
                filtroSeguro.getAnoInicial(),
                filtroSeguro.getAnoFinal(),
                normalizarCategoriaHospedeiro(filtroSeguro.getCategoriaHospedeiro()),
                filtroSeguro.getDoencaId(),
                filtroSeguro.getVetorId(),
                filtroSeguro.getParasitaId(),
                filtroSeguro.getFonteId(),
                normalizarTexto(filtroSeguro.getTipoFonte())
        );
    }

    private void validarIntervaloAnos(Integer anoInicial, Integer anoFinal) {
        if (anoInicial != null && anoFinal != null && anoInicial > anoFinal) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Filtro invalido: anoInicial deve ser menor ou igual a anoFinal"
            );
        }
    }

    private String normalizarCategoriaHospedeiro(CategoriaHospedeiro categoriaHospedeiro) {
        return categoriaHospedeiro == null ? null : categoriaHospedeiro.name();
    }

    private String normalizarUfOuEstado(String ufOuEstado) {
        String valor = normalizarTexto(ufOuEstado);
        if (valor == null) {
            return null;
        }

        if (valor.length() == 2) {
            String uf = valor.toUpperCase();
            if (!VALID_UFS.contains(uf)) {
                throw new ResponseStatusException(
                        HttpStatus.BAD_REQUEST,
                        "Filtro invalido: estado/UF nao reconhecido: " + ufOuEstado
                );
            }
            return uf;
        }

        String estadoNormalizado = normalizarParaComparacao(valor);
        String uf = STATE_NAME_TO_UF.get(estadoNormalizado);
        if (uf == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Filtro invalido: estado/UF nao reconhecido: " + ufOuEstado
            );
        }

        return uf;
    }

    private String normalizarTexto(String valor) {
        if (valor == null) {
            return null;
        }

        String textoLimpo = valor.trim();
        return textoLimpo.isEmpty() ? null : textoLimpo;
    }

    private String normalizarParaComparacao(String valor) {
        return Normalizer.normalize(valor, Normalizer.Form.NFD)
                .replaceAll("\\p{M}+", "")
                .toUpperCase();
    }

    public record FiltroNormalizado(
            String uf,
            String cidade,
            Integer anoInicial,
            Integer anoFinal,
            String categoriaHospedeiro,
            Integer doencaId,
            Integer vetorId,
            Integer parasitaId,
            Integer fonteId,
            String tipoFonte
    ) {
    }
}
