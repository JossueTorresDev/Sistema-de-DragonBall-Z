package com.dragonball.service;

import com.dragonball.model.Planeta;
import com.dragonball.repository.PlanetaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PlanetaService {
    
    @Autowired
    private PlanetaRepository planetaRepository;
    
    public List<Planeta> listarTodos() {
        return planetaRepository.findAll();
    }
    
    public Optional<Planeta> buscarPorId(Integer id) {
        return planetaRepository.findById(id);
    }
    
    public Planeta crear(Planeta planeta) {
        if (planetaRepository.existsByNombre(planeta.getNombre())) {
            throw new RuntimeException("Ya existe un planeta con el nombre: " + planeta.getNombre());
        }
        return planetaRepository.save(planeta);
    }
    
    public Planeta actualizar(Integer id, Planeta planetaActualizado) {
        Optional<Planeta> planetaExistente = buscarPorId(id);
        if (planetaExistente.isPresent()) {
            Planeta planeta = planetaExistente.get();
            if (!planeta.getNombre().equals(planetaActualizado.getNombre()) && 
                planetaRepository.existsByNombre(planetaActualizado.getNombre())) {
                throw new RuntimeException("Ya existe un planeta con el nombre: " + planetaActualizado.getNombre());
            }
            planeta.setNombre(planetaActualizado.getNombre());
            planeta.setSistemaOrigen(planetaActualizado.getSistemaOrigen());
            planeta.setDescripcion(planetaActualizado.getDescripcion());
            return planetaRepository.save(planeta);
        }
        throw new RuntimeException("Planeta no encontrado con ID: " + id);
    }
    
    public void eliminar(Integer id) {
        if (planetaRepository.existsById(id)) {
            planetaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Planeta no encontrado con ID: " + id);
        }
    }
    
    public List<Planeta> buscarPorNombre(String nombre) {
        return planetaRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
    public List<Planeta> buscarPorSistema(String sistema) {
        return planetaRepository.findBySistemaOrigenContainingIgnoreCase(sistema);
    }
}
