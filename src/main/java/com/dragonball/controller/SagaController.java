package com.dragonball.controller;

import com.dragonball.model.Saga;
import com.dragonball.service.SagaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/sagas")
@CrossOrigin(origins = "*")
public class SagaController {
    
    @Autowired
    private SagaService sagaService;
    
    @GetMapping
    public ResponseEntity<List<Saga>> listarTodas() {
        List<Saga> sagas = sagaService.listarTodas();
        return ResponseEntity.ok(sagas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Saga> buscarPorId(@PathVariable Integer id) {
        Optional<Saga> saga = sagaService.buscarPorId(id);
        return saga.map(ResponseEntity::ok)
                   .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Saga> crear(@Valid @RequestBody Saga saga) {
        try {
            Saga nuevaSaga = sagaService.crear(saga);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaSaga);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Saga> actualizar(@PathVariable Integer id, @Valid @RequestBody Saga saga) {
        try {
            Saga sagaActualizada = sagaService.actualizar(id, saga);
            return ResponseEntity.ok(sagaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            sagaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Saga>> buscarPorNombre(@RequestParam String nombre) {
        List<Saga> sagas = sagaService.buscarPorNombre(nombre);
        return ResponseEntity.ok(sagas);
    }
}
