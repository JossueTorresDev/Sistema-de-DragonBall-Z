package com.dragonball.repository;

import com.dragonball.model.Batalla;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface BatallaRepository extends JpaRepository<Batalla, Integer> {
    
    List<Batalla> findByNombreContainingIgnoreCase(String nombre);
    
    List<Batalla> findBySagaId(Integer sagaId);
    
    List<Batalla> findByUbicacionContainingIgnoreCase(String ubicacion);
}