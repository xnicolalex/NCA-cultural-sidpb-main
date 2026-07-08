package com.nca.sistema_miiase_app.domain.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nca.sistema_miiase_app.domain.entity.Local;

public interface LocalRepository extends JpaRepository<Local, Integer> {
}
