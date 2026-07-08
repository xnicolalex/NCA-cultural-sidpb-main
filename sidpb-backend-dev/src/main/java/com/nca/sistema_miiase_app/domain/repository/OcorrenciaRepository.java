package com.nca.sistema_miiase_app.domain.repository;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.nca.sistema_miiase_app.domain.entity.Ocorrencia;

public interface OcorrenciaRepository extends JpaRepository<Ocorrencia, Integer> {

    @Query(
            value = """
                    select
                        o.id_ocorrencia as idOcorrencia,
                        o.data as dataOcorrencia,
                        d.nome_cientifico as doencaNomeCientifico,
                        d.nome_comum_json as doencaNomeComum,
                        h.especie as hospedeiroEspecie,
                        l.uf as localUf,
                        l.cidade as localCidade,
                        l.bairro as localBairro,
                        v.nome_cientifico as vetorNomeCientifico,
                        f.tipo_fonte as tipoFonte,
                        f.nome_fonte as nomeFonte
                    from "ocorrencia" o
                    join "doenca" d on d.id_doenca = o.id_doenca
                    join "hospedeiro" h on h.id_hospedeiro = o.id_hospedeiro
                    join "local" l on l.id_local = o.id_local
                    join "vetor" v on v.id_vetor = o.id_vetor
                    left join (
                        select of1.id_ocorrencia, min(of1.id_fonte) as id_fonte
                        from "ocorrencia_fonte" of1
                        group by of1.id_ocorrencia
                    ) of_min on of_min.id_ocorrencia = o.id_ocorrencia
                    left join "fonte" f on f.id_fonte = of_min.id_fonte
                    where o.id_ocorrencia = :id
                    """,
            nativeQuery = true
    )
    Optional<OcorrenciaResumoProjection> findResumoById(@Param("id") Integer id);

    @Query(
            value = """
                    select
                        o.id_ocorrencia as idOcorrencia,
                        o.data as dataOcorrencia,
                        d.nome_cientifico as doencaNomeCientifico,
                        d.nome_comum_json as doencaNomeComum,
                        h.especie as hospedeiroEspecie,
                        l.uf as localUf,
                        l.cidade as localCidade,
                        l.bairro as localBairro,
                        v.nome_cientifico as vetorNomeCientifico,
                        f.tipo_fonte as tipoFonte,
                        f.nome_fonte as nomeFonte
                    from "ocorrencia" o
                    join "doenca" d on d.id_doenca = o.id_doenca
                    join "hospedeiro" h on h.id_hospedeiro = o.id_hospedeiro
                    join "local" l on l.id_local = o.id_local
                    join "vetor" v on v.id_vetor = o.id_vetor
                    left join (
                        select of1.id_ocorrencia, min(of1.id_fonte) as id_fonte
                        from "ocorrencia_fonte" of1
                        group by of1.id_ocorrencia
                    ) of_min on of_min.id_ocorrencia = o.id_ocorrencia
                    left join "fonte" f on f.id_fonte = of_min.id_fonte
                    where (:uf is null or l.uf = :uf)
                      and (:cidade is null or lower(l.cidade) = lower(:cidade))
                      and (:anoInicial is null or extract(year from o.data) >= :anoInicial)
                      and (:anoFinal is null or extract(year from o.data) <= :anoFinal)
                      and (:doencaId is null or o.id_doenca = :doencaId)
                      and (:vetorId is null or o.id_vetor = :vetorId)
                      and (
                            :parasitaId is null
                            or exists (
                                select 1
                                from "vetor_parasito" vp
                                where vp.id_vetor = o.id_vetor
                                  and vp.id_parasito = :parasitaId
                            )
                      )
                      and (
                            (:fonteId is null and :tipoFonte is null)
                            or exists (
                                select 1
                                from "ocorrencia_fonte" of2
                                join "fonte" f2 on f2.id_fonte = of2.id_fonte
                                where of2.id_ocorrencia = o.id_ocorrencia
                                  and (:fonteId is null or f2.id_fonte = :fonteId)
                                  and (:tipoFonte is null or lower(f2.tipo_fonte) = lower(:tipoFonte))
                            )
                      )
                      and (
                            :categoriaHospedeiro is null
                            or (:categoriaHospedeiro = 'HUMANO' and exists (
                                select 1 from "humano" hu where hu.id_hospedeiro = o.id_hospedeiro
                            ))
                            or (:categoriaHospedeiro = 'ANIMAL_COMPANHIA' and exists (
                                select 1 from "animal_companhia" ac where ac.id_hospedeiro = o.id_hospedeiro
                            ))
                            or (:categoriaHospedeiro = 'ANIMAL_SELVAGEM' and exists (
                                select 1 from "animal_selvagem" ase where ase.id_hospedeiro = o.id_hospedeiro
                            ))
                            or (:categoriaHospedeiro = 'ANIMAL_PRODUCAO' and exists (
                                select 1 from "animal_producao" ap where ap.id_hospedeiro = o.id_hospedeiro
                            ))
                      )
                    order by o.data desc, o.id_ocorrencia desc
                    """,
            nativeQuery = true
    )
    List<OcorrenciaResumoProjection> findOcorrenciasParaResumoFiltradas(
            @Param("uf") String uf,
            @Param("cidade") String cidade,
            @Param("anoInicial") Integer anoInicial,
            @Param("anoFinal") Integer anoFinal,
            @Param("categoriaHospedeiro") String categoriaHospedeiro,
            @Param("doencaId") Integer doencaId,
            @Param("vetorId") Integer vetorId,
            @Param("parasitaId") Integer parasitaId,
            @Param("fonteId") Integer fonteId,
            @Param("tipoFonte") String tipoFonte
    );

    @Query(
            value = """
                    select
                        l.id_local as idLocal,
                        l.cidade as cidade,
                        l.uf as uf,
                        coalesce(m.latitude::numeric, l.latitude) as latitude,
                        coalesce(m.longitude::numeric, l.longitude) as longitude,
                        count(distinct o.id_ocorrencia) as totalOcorrencias
                    from "ocorrencia" o
                    join "local" l on l.id_local = o.id_local
                    left join "ibge_municipios_2025" m
                      on m.cd_mun = (
                          select min(m2.cd_mun)
                          from "ibge_municipios_2025" m2
                          where lower(trim(m2.nm_mun)) = lower(trim(l.cidade))
                      )
                    where (:uf is null or l.uf = :uf)
                      and (:cidade is null or lower(l.cidade) = lower(:cidade))
                      and (:anoInicial is null or extract(year from o.data) >= :anoInicial)
                      and (:anoFinal is null or extract(year from o.data) <= :anoFinal)
                      and (:doencaId is null or o.id_doenca = :doencaId)
                      and (:vetorId is null or o.id_vetor = :vetorId)
                      and (
                            :parasitaId is null
                            or exists (
                                select 1
                                from "vetor_parasito" vp
                                where vp.id_vetor = o.id_vetor
                                  and vp.id_parasito = :parasitaId
                            )
                      )
                      and (
                            (:fonteId is null and :tipoFonte is null)
                            or exists (
                                select 1
                                from "ocorrencia_fonte" of2
                                join "fonte" f2 on f2.id_fonte = of2.id_fonte
                                where of2.id_ocorrencia = o.id_ocorrencia
                                  and (:fonteId is null or f2.id_fonte = :fonteId)
                                  and (:tipoFonte is null or lower(f2.tipo_fonte) = lower(:tipoFonte))
                            )
                      )
                      and (
                            :categoriaHospedeiro is null
                            or (:categoriaHospedeiro = 'HUMANO' and exists (
                                select 1 from "humano" hu where hu.id_hospedeiro = o.id_hospedeiro
                            ))
                            or (:categoriaHospedeiro = 'ANIMAL_COMPANHIA' and exists (
                                select 1 from "animal_companhia" ac where ac.id_hospedeiro = o.id_hospedeiro
                            ))
                            or (:categoriaHospedeiro = 'ANIMAL_SELVAGEM' and exists (
                                select 1 from "animal_selvagem" ase where ase.id_hospedeiro = o.id_hospedeiro
                            ))
                            or (:categoriaHospedeiro = 'ANIMAL_PRODUCAO' and exists (
                                select 1 from "animal_producao" ap where ap.id_hospedeiro = o.id_hospedeiro
                            ))
                      )
                    group by l.id_local, l.cidade, l.uf, m.latitude, m.longitude, l.latitude, l.longitude
                    order by totalOcorrencias desc, l.id_local asc
                    """,
            nativeQuery = true
    )
    List<PontoMapaProjection> findPontosMapaAgregadosFiltrados(
            @Param("uf") String uf,
            @Param("cidade") String cidade,
            @Param("anoInicial") Integer anoInicial,
            @Param("anoFinal") Integer anoFinal,
            @Param("categoriaHospedeiro") String categoriaHospedeiro,
            @Param("doencaId") Integer doencaId,
            @Param("vetorId") Integer vetorId,
            @Param("parasitaId") Integer parasitaId,
            @Param("fonteId") Integer fonteId,
            @Param("tipoFonte") String tipoFonte
    );

    @Query("""
            select distinct o
            from Ocorrencia o
            join fetch o.local l
            join fetch o.hospedeiro h
            join fetch o.doenca d
            join fetch o.vetor v
            left join fetch o.fontes f
            where o.id = :id
            """)
    Optional<Ocorrencia> findDetalheById(@Param("id") Integer id);

    interface OcorrenciaResumoProjection {
        Integer getIdOcorrencia();
        LocalDate getDataOcorrencia();
        String getDoencaNomeCientifico();
        String getDoencaNomeComum();
        String getHospedeiroEspecie();
        String getLocalUf();
        String getLocalCidade();
        String getLocalBairro();
        String getVetorNomeCientifico();
        String getTipoFonte();
        String getNomeFonte();
    }

    interface PontoMapaProjection {
        Integer getIdLocal();
        String getCidade();
        String getUf();
        BigDecimal getLatitude();
        BigDecimal getLongitude();
        Long getTotalOcorrencias();
    }
}
