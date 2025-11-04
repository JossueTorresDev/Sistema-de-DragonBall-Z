package com.dragonball.controller;

import com.dragonball.model.Tecnica;
import com.dragonball.service.TecnicaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tecnicas")
@CrossOrigin(origins = "*")
public class TecnicaController {
    
    @Autowired
    private TecnicaService tecnicaService;
    
    @GetMapping
    public ResponseEntity<List<Tecnica>> listarTodas() {
        List<Tecnica> tecnicas = tecnicaService.listarTodas();
        return ResponseEntity.ok(tecnicas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Tecnica> buscarPorId(@PathVariable Integer id) {
        Optional<Tecnica> tecnica = tecnicaService.buscarPorId(id);
        return tecnica.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Tecnica> crear(@Valid @RequestBody Tecnica tecnica) {
        try {
            Tecnica nuevaTecnica = tecnicaService.crear(tecnica);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaTecnica);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Tecnica> actualizar(@PathVariable Integer id, @Valid @RequestBody Tecnica tecnica) {
        try {
            Tecnica tecnicaActualizada = tecnicaService.actualizar(id, tecnica);
            return ResponseEntity.ok(tecnicaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            tecnicaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar/nombre")
    public ResponseEntity<List<Tecnica>> buscarPorNombre(@RequestParam String nombre) {
        List<Tecnica> tecnicas = tecnicaService.buscarPorNombre(nombre);
        return ResponseEntity.ok(tecnicas);
    }
    
    @GetMapping("/buscar/tipo")
    public ResponseEntity<List<Tecnica>> buscarPorTipo(@RequestParam String tipo) {
        List<Tecnica> tecnicas = tecnicaService.buscarPorTipo(tipo);
        return ResponseEntity.ok(tecnicas);
    }
}
