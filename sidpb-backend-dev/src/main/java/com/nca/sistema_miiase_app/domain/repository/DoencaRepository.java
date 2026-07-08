package com.nca.sistema_miiase_app.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nca.sistema_miiase_app.domain.entity.Doenca;

public interface DoencaRepository extends JpaRepository<Doenca, Integer> {
}
