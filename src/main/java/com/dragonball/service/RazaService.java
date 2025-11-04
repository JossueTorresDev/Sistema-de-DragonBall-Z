package com.dragonball.service;

import com.dragonball.model.Raza;
import com.dragonball.repository.RazaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class RazaService {
    
    @Autowired
    private RazaRepository razaRepository;
    
    public List<Raza> listarTodas() {
        return razaRepository.findAll();
    }
    
    public Optional<Raza> buscarPorId(Integer id) {
        return razaRepository.findById(id);
    }
    
    public Raza crear(Raza raza) {
        if (razaRepository.existsByNombre(raza.getNombre())) {
            throw new RuntimeException("Ya existe una raza con el nombre: " + raza.getNombre());
        }
        return razaRepository.save(raza);
    }
    
    public Raza actualizar(Integer id, Raza razaActualizada) {
        Optional<Raza> razaExistente = buscarPorId(id);
        if (razaExistente.isPresent()) {
            Raza raza = razaExistente.get();
            if (!raza.getNombre().equals(razaActualizada.getNombre()) && 
                razaRepository.existsByNombre(razaActualizada.getNombre())) {
                throw new RuntimeException("Ya existe una raza con el nombre: " + razaActualizada.getNombre());
            }
            raza.setNombre(razaActualizada.getNombre());
            raza.setDescripcion(razaActualizada.getDescripcion());
            return razaRepository.save(raza);
        }
        throw new RuntimeException("Raza no encontrada con ID: " + id);
    }
    
    public void eliminar(Integer id) {
        if (razaRepository.existsById(id)) {
            razaRepository.deleteById(id);
        } else {
            throw new RuntimeException("Raza no encontrada con ID: " + id);
        }
    }
    
    public List<Raza> buscarPorNombre(String nombre) {
        return razaRepository.findByNombreContainingIgnoreCase(nombre);
    }
}