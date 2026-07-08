package com.nca.sistema_miiase_app.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nca.sistema_miiase_app.domain.entity.Hospedeiro;

public interface HospedeiroRepository extends JpaRepository<Hospedeiro, Integer> {
}
