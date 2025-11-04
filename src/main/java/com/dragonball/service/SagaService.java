package com.dragonball.service;

import com.dragonball.model.Saga;
import com.dragonball.repository.SagaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class SagaService {
    
    @Autowired
    private SagaRepository sagaRepository;
    
    public List<Saga> listarTodas() {
        return sagaRepository.findAll();
    }
    
    public Optional<Saga> buscarPorId(Integer id) {
        return sagaRepository.findById(id);
    }
    
    public Saga crear(Saga saga) {
        if (sagaRepository.existsByNombre(saga.getNombre())) {
            throw new RuntimeException("Ya existe una saga con el nombre: " + saga.getNombre());
        }
        return sagaRepository.save(saga);
    }
    
    public Saga actualizar(Integer id, Saga sagaActualizada) {
        Optional<Saga> sagaExistente = buscarPorId(id);
        if (sagaExistente.isPresent()) {
            Saga saga = sagaExistente.get();
            if (!saga.getNombre().equals(sagaActualizada.getNombre()) && 
                sagaRepository.existsByNombre(sagaActualizada.getNombre())) {
                throw new RuntimeException("Ya existe una saga con el nombre: " + sagaActualizada.getNombre());
            }
            saga.setNombre(sagaActualizada.getNombre());
            saga.setDescripcion(sagaActualizada.getDescripcion());
            saga.setFechaInicio(sagaActualizada.getFechaInicio());
            saga.setFechaFin(sagaActualizada.getFechaFin());
            return sagaRepository.save(saga);
        }
        throw new RuntimeException("Saga no encontrada con ID: " + id);
    }
    
    public void eliminar(Integer id) {
        if (sagaRepository.existsById(id)) {
            sagaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Saga no encontrada con ID: " + id);
        }
    }
    
    public List<Saga> buscarPorNombre(String nombre) {
        return sagaRepository.findByNombreContainingIgnoreCase(nombre);
    }
}