package com.nca.sistema_miiase_app.domain.entity;

import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "doenca")
public class Doenca {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_doenca")
    private Integer id;

    @NotBlank
    @Size(max = 255)
    @Column(name = "nome_cientifico", nullable = false, length = 255)
    private String nomeCientifico;

    @Column(name = "nome_comum_json", columnDefinition = "json")
    private String nomeComumJson;

    @OneToMany(mappedBy = "doenca")
    private Set<Ocorrencia> ocorrencias = new LinkedHashSet<>();

    @OneToMany(mappedBy = "doenca")
    private Set<Parasito> parasitos = new LinkedHashSet<>();

    public Doenca() {
    }
}
