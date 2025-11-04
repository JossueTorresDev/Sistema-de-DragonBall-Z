package com.dragonball.controller;

import com.dragonball.model.Personaje;
import com.dragonball.service.PersonajeService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/personajes")
@CrossOrigin(origins = "*")
public class PersonajeController {
    
    @Autowired
    private PersonajeService personajeService;
    
    @GetMapping
    public ResponseEntity<List<Personaje>> listarTodos() {
        List<Personaje> personajes = personajeService.listarTodos();
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/eliminados")
    public ResponseEntity<List<Personaje>> listarEliminados() {
        List<Personaje> personajes = personajeService.listarEliminados();
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Personaje> buscarPorId(@PathVariable Integer id) {
        Optional<Personaje> personaje = personajeService.buscarPorId(id);
        return personaje.map(ResponseEntity::ok)
                       .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Personaje> crear(@Valid @RequestBody Personaje personaje) {
        try {
            Personaje nuevoPersonaje = personajeService.crear(personaje);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPersonaje);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Personaje> actualizar(@PathVariable Integer id, @Valid @RequestBody Personaje personaje) {
        try {
            Personaje personajeActualizado = personajeService.actualizar(id, personaje);
            return ResponseEntity.ok(personajeActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarLogico(@PathVariable Integer id) {
        try {
            personajeService.eliminarLogico(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @PutMapping("/{id}/restaurar")
    public ResponseEntity<Personaje> restaurar(@PathVariable Integer id) {
        try {
            Personaje personajeRestaurado = personajeService.restaurar(id);
            return ResponseEntity.ok(personajeRestaurado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar/nombre")
    public ResponseEntity<List<Personaje>> buscarPorNombre(@RequestParam String nombre) {
        List<Personaje> personajes = personajeService.buscarPorNombre(nombre);
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/buscar/raza/{razaId}")
    public ResponseEntity<List<Personaje>> buscarPorRaza(@PathVariable Integer razaId) {
        List<Personaje> personajes = personajeService.buscarPorRaza(razaId);
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/buscar/planeta/{planetaId}")
    public ResponseEntity<List<Personaje>> buscarPorPlaneta(@PathVariable Integer planetaId) {
        List<Personaje> personajes = personajeService.buscarPorPlaneta(planetaId);
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/buscar/poder")
    public ResponseEntity<List<Personaje>> buscarPorNivelPoder(@RequestParam Long nivelPoder) {
        List<Personaje> personajes = personajeService.buscarPorNivelPoderMayorA(nivelPoder);
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/buscar/afiliacion")
    public ResponseEntity<List<Personaje>> buscarPorAfiliacion(@RequestParam String afiliacion) {
        List<Personaje> personajes = personajeService.buscarPorAfiliacion(afiliacion);
        return ResponseEntity.ok(personajes);
    }
    
    @GetMapping("/ordenados-por-poder")
    public ResponseEntity<List<Personaje>> listarOrdenadosPorPoder() {
        List<Personaje> personajes = personajeService.listarOrdenadosPorPoder();
        return ResponseEntity.ok(personajes);
    }
}