package com.nca.sistema_miiase_app.domain.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "parasito")
public class Parasito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_parasito")
    private Integer id;

    @NotNull
    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_doenca", nullable = false)
    private Doenca doenca;

    @NotBlank
    @Size(max = 255)
    @Column(name = "nome_cientifico", nullable = false, length = 255)
    private String nomeCientifico;

    @Size(max = 255)
    @Column(name = "ordem_animal", length = 255)
    private String ordemAnimal;

    @Size(max = 255)
    @Column(name = "estagio_vida", length = 255)
    private String estagioVida;

    @ManyToMany(mappedBy = "parasitos")
    private Set<Vetor> vetores = new LinkedHashSet<>();

    public Parasito() {
    }
}
