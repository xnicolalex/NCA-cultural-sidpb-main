package com.nca.sistema_miiase_app.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "animal_selvagem")
public class AnimalSelvagem {

    @Id
    @Column(name = "id_hospedeiro")
    private Integer id;

    @NotNull
    @OneToOne(fetch = FetchType.LAZY, optional = false)
    @MapsId
    @JoinColumn(name = "id_hospedeiro", nullable = false)
    private Hospedeiro hospedeiro;

    @Size(max = 255)
    @Column(name = "lerolero2", length = 255)
    private String lerolero2;

    public AnimalSelvagem() {
    }
}

