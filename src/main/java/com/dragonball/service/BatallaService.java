package com.dragonball.service;

import com.dragonball.model.Batalla;
import com.dragonball.repository.BatallaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class BatallaService {
    
    @Autowired
    private BatallaRepository batallaRepository;
    
    public List<Batalla> listarTodas() {
        return batallaRepository.findAll();
    }
    
    public Optional<Batalla> buscarPorId(Integer id) {
        return batallaRepository.findById(id);
    }
    
    public Batalla crear(Batalla batalla) {
        return batallaRepository.save(batalla);
    }
    
    public Batalla actualizar(Integer id, Batalla batallaActualizada) {
        Optional<Batalla> batallaExistente = buscarPorId(id);
        if (batallaExistente.isPresent()) {
            Batalla batalla = batallaExistente.get();
            batalla.setNombre(batallaActualizada.getNombre());
            batalla.setSaga(batallaActualizada.getSaga());
            batalla.setUbicacion(batallaActualizada.getUbicacion());
            batalla.setResultado(batallaActualizada.getResultado());
            batalla.setFecha(batallaActualizada.getFecha());
            batalla.setParticipantes(batallaActualizada.getParticipantes());
            return batallaRepository.save(batalla);
        }
        throw new RuntimeException("Batalla no encontrada con ID: " + id);
    }
    
    public void eliminar(Integer id) {
        if (batallaRepository.existsById(id)) {
            batallaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Batalla no encontrada con ID: " + id);
        }
    }
    
    public List<Batalla> buscarPorNombre(String nombre) {
        return batallaRepository.findByNombreContainingIgnoreCase(nombre);
    }
    
    public List<Batalla> buscarPorSaga(Integer sagaId) {
        return batallaRepository.findBySagaId(sagaId);
    }
    
    public List<Batalla> buscarPorUbicacion(String ubicacion) {
        return batallaRepository.findByUbicacionContainingIgnoreCase(ubicacion);
    }
}
