package com.dragonball.repository;

import com.dragonball.model.Personaje;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface PersonajeRepository extends JpaRepository<Personaje, Integer> {
    
    // Buscar personajes no eliminados
    List<Personaje> findByEliminadoFalse();
    
    // Buscar personajes eliminados
    List<Personaje> findByEliminadoTrue();
    
    // Buscar por ID sin considerar eliminados
    Optional<Personaje> findByIdAndEliminadoFalse(Integer id);
    
    // Buscar por nombre (no eliminados)
    List<Personaje> findByNombreContainingIgnoreCaseAndEliminadoFalse(String nombre);
    
    // Buscar por raza
    List<Personaje> findByRazaIdAndEliminadoFalse(Integer razaId);
    
    // Buscar por planeta
    List<Personaje> findByPlanetaIdAndEliminadoFalse(Integer planetaId);
    
    // Buscar por nivel de poder mayor a
    List<Personaje> findByNivelPoderGreaterThanAndEliminadoFalse(Long nivelPoder);
    
    // Buscar por afiliación
    List<Personaje> findByAfiliacionContainingIgnoreCaseAndEliminadoFalse(String afiliacion);
    
    @Query("SELECT p FROM Personaje p WHERE p.eliminado = false ORDER BY p.nivelPoder DESC")
    List<Personaje> findAllOrderByNivelPoderDesc();
}