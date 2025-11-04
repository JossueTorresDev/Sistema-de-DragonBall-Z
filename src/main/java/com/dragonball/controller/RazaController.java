package com.dragonball.controller;

import com.dragonball.model.Raza;
import com.dragonball.service.RazaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/razas")
@CrossOrigin(origins = "*")
public class RazaController {
    
    @Autowired
    private RazaService razaService;
    
    @GetMapping
    public ResponseEntity<List<Raza>> listarTodas() {
        List<Raza> razas = razaService.listarTodas();
        return ResponseEntity.ok(razas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Raza> buscarPorId(@PathVariable Integer id) {
        Optional<Raza> raza = razaService.buscarPorId(id);
        return raza.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Raza> crear(@Valid @RequestBody Raza raza) {
        try {
            Raza nuevaRaza = razaService.crear(raza);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaRaza);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Raza> actualizar(@PathVariable Integer id, @Valid @RequestBody Raza raza) {
        try {
            Raza razaActualizada = razaService.actualizar(id, raza);
            return ResponseEntity.ok(razaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            razaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Raza>> buscarPorNombre(@RequestParam String nombre) {
        List<Raza> razas = razaService.buscarPorNombre(nombre);
        return ResponseEntity.ok(razas);
    }
}
