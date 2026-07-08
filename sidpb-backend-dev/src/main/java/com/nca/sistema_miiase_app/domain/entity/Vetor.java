package com.nca.sistema_miiase_app.domain.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinTable;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "vetor")
public class Vetor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_vetor")
    private Integer id;

    @NotBlank
    @Size(max = 255)
    @Column(name = "nome_cientifico", nullable = false, length = 255)
    private String nomeCientifico;

    @Column(name = "nome_comum_json", columnDefinition = "json")
    private String nomeComumJson;

    @OneToMany(mappedBy = "vetor")
    private Set<Ocorrencia> ocorrencias = new LinkedHashSet<>();

    @ManyToMany
    @JoinTable(
            name = "vetor_parasito",
            joinColumns = @JoinColumn(name = "id_vetor"),
            inverseJoinColumns = @JoinColumn(name = "id_parasito") // o que é um jointable?
    )
    private Set<Parasito> parasitos = new LinkedHashSet<>();

    public Vetor() {
    }
}
