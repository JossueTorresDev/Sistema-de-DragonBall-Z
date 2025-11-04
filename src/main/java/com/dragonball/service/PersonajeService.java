package com.dragonball.service;

import com.dragonball.model.Personaje;
import com.dragonball.repository.PersonajeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PersonajeService {
    
    @Autowired
    private PersonajeRepository personajeRepository;
    
    // Listar todos los personajes activos
    public List<Personaje> listarTodos() {
        return personajeRepository.findByEliminadoFalse();
    }
    
    // Listar personajes eliminados
    public List<Personaje> listarEliminados() {
        return personajeRepository.findByEliminadoTrue();
    }
    
    // Buscar por ID
    public Optional<Personaje> buscarPorId(Integer id) {
        return personajeRepository.findByIdAndEliminadoFalse(id);
    }
    
    // Crear personaje
    public Personaje crear(Personaje personaje) {
        personaje.setEliminado(false);
        return personajeRepository.save(personaje);
    }
    
    // Actualizar personaje
    public Personaje actualizar(Integer id, Personaje personajeActualizado) {
        Optional<Personaje> personajeExistente = buscarPorId(id);
        if (personajeExistente.isPresent()) {
            Personaje personaje = personajeExistente.get();
            personaje.setNombre(personajeActualizado.getNombre());
            personaje.setRaza(personajeActualizado.getRaza());
            personaje.setPlaneta(personajeActualizado.getPlaneta());
            personaje.setNivelPoder(personajeActualizado.getNivelPoder());
            personaje.setAfiliacion(personajeActualizado.getAfiliacion());
            personaje.setDescripcion(personajeActualizado.getDescripcion());
            return personajeRepository.save(personaje);
        }
        throw new RuntimeException("Personaje no encontrado con ID: " + id);
    }
    
    // Eliminación lógica
    public void eliminarLogico(Integer id) {
        Optional<Personaje> personaje = buscarPorId(id);
        if (personaje.isPresent()) {
            personaje.get().setEliminado(true);
            personajeRepository.save(personaje.get());
        } else {
            throw new RuntimeException("Personaje no encontrado con ID: " + id);
        }
    }
    
    // Restaurar personaje eliminado
    public Personaje restaurar(Integer id) {
        Optional<Personaje> personaje = personajeRepository.findById(id);
        if (personaje.isPresent() && personaje.get().getEliminado()) {
            personaje.get().setEliminado(false);
            return personajeRepository.save(personaje.get());
        }
        throw new RuntimeException("Personaje no encontrado o no está eliminado con ID: " + id);
    }
    
    // Buscar por nombre
    public List<Personaje> buscarPorNombre(String nombre) {
        return personajeRepository.findByNombreContainingIgnoreCaseAndEliminadoFalse(nombre);
    }
    
    // Buscar por raza
    public List<Personaje> buscarPorRaza(Integer razaId) {
        return personajeRepository.findByRazaIdAndEliminadoFalse(razaId);
    }
    
    // Buscar por planeta
    public List<Personaje> buscarPorPlaneta(Integer planetaId) {
        return personajeRepository.findByPlanetaIdAndEliminadoFalse(planetaId);
    }
    
    // Buscar por nivel de poder mayor a
    public List<Personaje> buscarPorNivelPoderMayorA(Long nivelPoder) {
        return personajeRepository.findByNivelPoderGreaterThanAndEliminadoFalse(nivelPoder);
    }
    
    // Buscar por afiliación
    public List<Personaje> buscarPorAfiliacion(String afiliacion) {
        return personajeRepository.findByAfiliacionContainingIgnoreCaseAndEliminadoFalse(afiliacion);
    }
    
    // Listar ordenados por nivel de poder
    public List<Personaje> listarOrdenadosPorPoder() {
        return personajeRepository.findAllOrderByNivelPoderDesc();
    }
}