package com.nca.sistema_miiase_app.domain.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.Repository;

import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;

public interface EstatisticasRepository extends Repository<Ocorrencia, Integer> {

    // Método para contar o total de ocorrências
    @Query("select count(o) from Ocorrencia o")
    long countTotalOcorrencias();

    // Método para contar ocorrências por doença
    @Query("""
            select d.id as doencaId, d.nomeCientifico as nomeCientifico, count(o) as total
            from Ocorrencia o
            join o.doenca d
            group by d.id, d.nomeCientifico
            order by count(o) desc
            """)
    List<ContagemPorDoencaProjection> countOcorrenciasPorDoenca();

    // Método para contar ocorrências por UF
    @Query("""
            select l.uf as uf, count(o) as total
            from Ocorrencia o
            join o.local l
            group by l.uf
            order by count(o) desc
            """)
    List<ContagemPorUfProjection> countOcorrenciasPorUf();

    // Método para contar ocorrências por cidade
    @Query("""
            select l.cidade as cidade, count(o) as total
            from Ocorrencia o
            join o.local l
            group by l.cidade
            order by count(o) desc
            """)
    List<ContagemPorCidadeProjection> countOcorrenciasPorCidade();

    // Método para contar ocorrências por vetor (considerando o vetor associado à ocorrência)  
    @Query("""
            select v.id as vetorId, v.nomeCientifico as nomeCientifico, count(o) as total
            from Ocorrencia o
            join o.vetor v
            group by v.id, v.nomeCientifico
            order by count(o) desc
            """)
    List<ContagemPorVetorProjection> countOcorrenciasPorVetor();

    // Método para contar ocorrências por parasito (considerando os parasitos associados ao vetor da ocorrência)
    @Query("""
            select p.id as parasitoId, p.nomeCientifico as nomeCientifico, count(o) as total
            from Ocorrencia o
            join o.vetor v
            join v.parasitos p
            group by p.id, p.nomeCientifico
            order by count(o) desc
            """)
    List<ContagemPorParasitoProjection> countOcorrenciasPorParasito();

    // Método para contar ocorrências por mês (série temporal mensal)
    @Query(
            value = """
                    select date_trunc('month', o.data)::date as periodo, count(*) as total
                    from "ocorrencia" o
                    group by date_trunc('month', o.data)::date
                    order by periodo
                    """,
            nativeQuery = true
    )
    List<SerieTemporalMensalProjection> serieTemporalMensalOcorrencias();

    // Projeções para os resultados das consultas
    interface ContagemPorDoencaProjection {
        Integer getDoencaId();
        String getNomeCientifico();
        Long getTotal();
    }

    interface ContagemPorUfProjection {
        String getUf();
        Long getTotal();
    }

    interface ContagemPorCidadeProjection {
        String getCidade();
        Long getTotal();
    }

    interface ContagemPorVetorProjection {
        Integer getVetorId();
        String getNomeCientifico();
        Long getTotal();
    }

    interface ContagemPorParasitoProjection {
        Integer getParasitoId();
        String getNomeCientifico();
        Long getTotal();
    }

    interface SerieTemporalMensalProjection {
        LocalDate getPeriodo();
        Long getTotal();
    }
}
