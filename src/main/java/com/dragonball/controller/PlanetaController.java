package com.dragonball.controller;

import com.dragonball.model.Planeta;
import com.dragonball.service.PlanetaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/planetas")
@CrossOrigin(origins = "*")
public class PlanetaController {
    
    @Autowired
    private PlanetaService planetaService;
    
    @GetMapping
    public ResponseEntity<List<Planeta>> listarTodos() {
        List<Planeta> planetas = planetaService.listarTodos();
        return ResponseEntity.ok(planetas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Planeta> buscarPorId(@PathVariable Integer id) {
        Optional<Planeta> planeta = planetaService.buscarPorId(id);
        return planeta.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Planeta> crear(@Valid @RequestBody Planeta planeta) {
        try {
            Planeta nuevoPlaneta = planetaService.crear(planeta);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevoPlaneta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Planeta> actualizar(@PathVariable Integer id, @Valid @RequestBody Planeta planeta) {
        try {
            Planeta planetaActualizado = planetaService.actualizar(id, planeta);
            return ResponseEntity.ok(planetaActualizado);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            planetaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar/nombre")
    public ResponseEntity<List<Planeta>> buscarPorNombre(@RequestParam String nombre) {
        List<Planeta> planetas = planetaService.buscarPorNombre(nombre);
        return ResponseEntity.ok(planetas);
    }
    
    @GetMapping("/buscar/sistema")
    public ResponseEntity<List<Planeta>> buscarPorSistema(@RequestParam String sistema) {
        List<Planeta> planetas = planetaService.buscarPorSistema(sistema);
        return ResponseEntity.ok(planetas);
    }
}
