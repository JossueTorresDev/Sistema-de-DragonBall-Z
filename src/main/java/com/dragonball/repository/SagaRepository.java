package com.dragonball.repository;

import com.dragonball.model.Saga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface SagaRepository extends JpaRepository<Saga, Integer> {
    
    Optional<Saga> findByNombre(String nombre);
    
    List<Saga> findByNombreContainingIgnoreCase(String nombre);
    
    boolean existsByNombre(String nombre);
}