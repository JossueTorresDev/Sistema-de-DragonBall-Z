package com.dragonball.repository;

import com.dragonball.model.Planeta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PlanetaRepository extends JpaRepository<Planeta, Integer> {
    
    Optional<Planeta> findByNombre(String nombre);
    
    List<Planeta> findByNombreContainingIgnoreCase(String nombre);
    
    List<Planeta> findBySistemaOrigenContainingIgnoreCase(String sistemaOrigen);
    
    boolean existsByNombre(String nombre);
}