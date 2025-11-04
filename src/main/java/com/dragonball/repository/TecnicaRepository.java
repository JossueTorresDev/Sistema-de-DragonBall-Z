package com.dragonball.repository;

import com.dragonball.model.Tecnica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface TecnicaRepository extends JpaRepository<Tecnica, Integer> {
    
    Optional<Tecnica> findByNombre(String nombre);
    
    List<Tecnica> findByNombreContainingIgnoreCase(String nombre);
    
    List<Tecnica> findByTipo(String tipo);
    
    boolean existsByNombre(String nombre);
}