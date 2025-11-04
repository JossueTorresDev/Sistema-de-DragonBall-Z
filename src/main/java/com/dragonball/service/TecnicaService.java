package com.dragonball.service;

import com.dragonball.model.Tecnica;
import com.dragonball.repository.TecnicaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TecnicaService {
    
    @Autowired
    private TecnicaRepository tecnicaRepository;
    
    public List<Tecnica> listarTodas() {
        return tecnicaRepository.findAll();
    }
    
    public Optional<Tecnica> buscarPorId(Integer id) {
        return tecnicaRepository.findById(id);
    }
    
    public Tecnica crear(Tecnica tecnica) {
        if (tecnicaRepository.existsByNombre(tecnica.getNombre())) {
            throw new RuntimeException("Ya existe una técnica con el nombre: " + tecnica.getNombre());
        }
        return tecnicaRepository.save(tecnica);
    }
    
    public Tecnica actualizar(Integer id, Tecnica tecnicaActualizada) {
        Optional<Tecnica> tecnicaExistente = buscarPorId(id);
        if (tecnicaExistente.isPresent()) {
            Tecnica tecnica = tecnicaExistente.get();
            if (!tecnica.getNombre().equals(tecnicaActualizada.getNombre()) && 
                tecnicaRepository.existsByNombre(tecnicaActualizada.getNombre())) {
                throw new RuntimeException("Ya existe una técnica con el nombre: " + tecnicaActualizada.getNombre());
            }
            tecnica.setNombre(tecnicaActualizada.getNombre());
            tecnica.setDescripcion(tecnicaActualizada.getDescripcion());
            tecnica.setTipo(tecnicaActualizada.getTipo());
            return tecnicaRepository.save(tecnica);
        }
        throw new RuntimeException("Técnica no encontrada con ID: " + id);
    }
    
    public void eliminar(Integer id) {
        if (tecnicaRepository.existsById(id)) {
            tecnicaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Técnica no encontrada con ID: " + id);
        }
    }
    
    public List<Tecnica> buscarPorNombre(String nombre) {
        return tecnicaRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
    public List<Tecnica> buscarPorTipo(String tipo) {
        return tecnicaRepository.findByTipo(tipo);
    }
}
