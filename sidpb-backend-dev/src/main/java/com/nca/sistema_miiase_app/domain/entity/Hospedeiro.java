package com.nca.sistema_miiase_app.domain.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "hospedeiro")
public class Hospedeiro {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_hospedeiro")
    private Integer id;

    @Size(max = 50)
    @Column(name = "sexo", length = 50)
    private String sexo;

    @Size(max = 50)
    @Column(name = "idade", length = 50)
    private String idade;

    @Size(max = 255)
    @Column(name = "especie", length = 255)
    private String especie;

    @OneToMany(mappedBy = "hospedeiro")
    private Set<Ocorrencia> ocorrencias = new LinkedHashSet<>();

    @OneToOne(mappedBy = "hospedeiro", fetch = FetchType.LAZY)
    private Humano humano;

    @OneToOne(mappedBy = "hospedeiro", fetch = FetchType.LAZY)
    private AnimalCompanhia animalCompanhia;

    @OneToOne(mappedBy = "hospedeiro", fetch = FetchType.LAZY)
    private AnimalSelvagem animalSelvagem;

    @OneToOne(mappedBy = "hospedeiro", fetch = FetchType.LAZY)
    private AnimalProducao animalProducao;
}
