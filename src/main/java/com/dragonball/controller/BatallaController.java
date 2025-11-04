package com.dragonball.controller;

import com.dragonball.model.Batalla;
import com.dragonball.service.BatallaService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/batallas")
@CrossOrigin(origins = "*")
public class BatallaController {
    
    @Autowired
    private BatallaService batallaService;
    
    @GetMapping
    public ResponseEntity<List<Batalla>> listarTodas() {
        List<Batalla> batallas = batallaService.listarTodas();
        return ResponseEntity.ok(batallas);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Batalla> buscarPorId(@PathVariable Integer id) {
        Optional<Batalla> batalla = batallaService.buscarPorId(id);
        return batalla.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Batalla> crear(@Valid @RequestBody Batalla batalla) {
        try {
            Batalla nuevaBatalla = batallaService.crear(batalla);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaBatalla);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Batalla> actualizar(@PathVariable Integer id, @Valid @RequestBody Batalla batalla) {
        try {
            Batalla batallaActualizada = batallaService.actualizar(id, batalla);
            return ResponseEntity.ok(batallaActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            batallaService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar/nombre")
    public ResponseEntity<List<Batalla>> buscarPorNombre(@RequestParam String nombre) {
        List<Batalla> batallas = batallaService.buscarPorNombre(nombre);
        return ResponseEntity.ok(batallas);
    }
    
    @GetMapping("/buscar/saga/{sagaId}")
    public ResponseEntity<List<Batalla>> buscarPorSaga(@PathVariable Integer sagaId) {
        List<Batalla> batallas = batallaService.buscarPorSaga(sagaId);
        return ResponseEntity.ok(batallas);
    }
    
    @GetMapping("/buscar/ubicacion")
    public ResponseEntity<List<Batalla>> buscarPorUbicacion(@RequestParam String ubicacion) {
        List<Batalla> batallas = batallaService.buscarPorUbicacion(ubicacion);
        return ResponseEntity.ok(batallas);
    }
}
