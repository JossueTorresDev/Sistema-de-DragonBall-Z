package com.dragonball.service;

import com.dragonball.model.Transformacion;
import com.dragonball.repository.TransformacionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class TransformacionService {
    
    @Autowired
    private TransformacionRepository transformacionRepository;
    
    public List<Transformacion> listarTodas() {
        return transformacionRepository.findAll();
    }
    
    public Optional<Transformacion> buscarPorId(Integer id) {
        return transformacionRepository.findById(id);
    }
    
    public Transformacion crear(Transformacion transformacion) {
        if (transformacionRepository.existsByNombre(transformacion.getNombre())) {
            throw new RuntimeException("Ya existe una transformación con el nombre: " + transformacion.getNombre());
        }
        return transformacionRepository.save(transformacion);
    }
    
    public Transformacion actualizar(Integer id, Transformacion transformacionActualizada) {
        Optional<Transformacion> transformacionExistente = buscarPorId(id);
        if (transformacionExistente.isPresent()) {
            Transformacion transformacion = transformacionExistente.get();
            if (!transformacion.getNombre().equals(transformacionActualizada.getNombre()) && 
                transformacionRepository.existsByNombre(transformacionActualizada.getNombre())) {
                throw new RuntimeException("Ya existe una transformación con el nombre: " + transformacionActualizada.getNombre());
            }
            transformacion.setNombre(transformacionActualizada.getNombre());
            transformacion.setDescripcion(transformacionActualizada.getDescripcion());
            transformacion.setMultiplicadorPoder(transformacionActualizada.getMultiplicadorPoder());
            return transformacionRepository.save(transformacion);
        }
        throw new RuntimeException("Transformación no encontrada con ID: " + id);
    }
    
    public void eliminar(Integer id) {
        if (transformacionRepository.existsById(id)) {
            transformacionRepository.deleteById(id);
        } else {
            throw new RuntimeException("Transformación no encontrada con ID: " + id);
        }
    }
    
    public List<Transformacion> buscarPorNombre(String nombre) {
        return transformacionRepository.findByNombreContainingIgnoreCase(nombre);
    }
}
