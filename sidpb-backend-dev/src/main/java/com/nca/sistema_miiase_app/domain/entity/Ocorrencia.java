package com.nca.sistema_miiase_app.domain.entity;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "ocorrencia")
public class Ocorrencia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ocorrencia")
    private Integer id;

    @NotNull
    @Column(name = "data", nullable = false)
    private LocalDate data;

    @Size(max = 255)
    @Column(name = "parte_corpo", length = 255)
    private String parteCorpo;

    @Size(max = 255)
    @Column(name = "tratamento", length = 255)
    private String tratamento;

    @Size(max = 255)
    @Column(name = "desfecho", length = 255)
    private String desfecho;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_local", nullable = false)
    private Local local;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_hospedeiro", nullable = false)
    private Hospedeiro hospedeiro;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_doenca", nullable = false)
    private Doenca doenca;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_vetor", nullable = false)
    private Vetor vetor;

    @ManyToMany
    @JoinTable(
            name = "ocorrencia_fonte",
            joinColumns = @JoinColumn(name = "id_ocorrencia"),
            inverseJoinColumns = @JoinColumn(name = "id_fonte")
    )
    private Set<Fonte> fontes = new LinkedHashSet<>();

    public Ocorrencia() {
    }
}
