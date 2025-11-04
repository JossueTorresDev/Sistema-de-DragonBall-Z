package com.dragonball.repository;

import com.dragonball.model.Raza;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface RazaRepository extends JpaRepository<Raza, Integer> {
    
    Optional<Raza> findByNombre(String nombre);
    
    List<Raza> findByNombreContainingIgnoreCase(String nombre);
    
    boolean existsByNombre(String nombre);
}