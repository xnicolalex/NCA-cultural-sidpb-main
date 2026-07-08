package com.nca.sistema_miiase_app.domain.entity;

import java.time.LocalDate;
import java.util.LinkedHashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "fonte")
public class Fonte {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fonte")
    private Integer id;

    @NotBlank
    @Size(max = 255)
    @Column(name = "nome_fonte", nullable = false, length = 255)
    private String nomeFonte;

    @Size(max = 100)
    @Column(name = "tipo_fonte", length = 100)
    private String tipoFonte;

    @Size(max = 255)
    @Column(name = "autor", length = 255) // por que colocar size e lenght?
    private String autor;

    @Size(max = 255)
    @Column(name = "titulo", length = 255)
    private String titulo;

    @Size(max = 2048)
    @Column(name = "url", length = 2048)
    private String url;

    @Column(name = "data")
    private LocalDate data;

    @ManyToMany(mappedBy = "fontes")
    private Set<Ocorrencia> ocorrencias = new LinkedHashSet<>();

    public Fonte() {
    }
}
