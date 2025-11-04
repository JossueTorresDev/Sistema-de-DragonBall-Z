package com.dragonball.controller;

import com.dragonball.model.Transformacion;
import com.dragonball.service.TransformacionService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/transformaciones")
@CrossOrigin(origins = "*")
public class TransformacionController {
    
    @Autowired
    private TransformacionService transformacionService;
    
    @GetMapping
    public ResponseEntity<List<Transformacion>> listarTodas() {
        List<Transformacion> transformaciones = transformacionService.listarTodas();
        return ResponseEntity.ok(transformaciones);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Transformacion> buscarPorId(@PathVariable Integer id) {
        Optional<Transformacion> transformacion = transformacionService.buscarPorId(id);
        return transformacion.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.notFound().build());
    }
    
    @PostMapping
    public ResponseEntity<Transformacion> crear(@Valid @RequestBody Transformacion transformacion) {
        try {
            Transformacion nuevaTransformacion = transformacionService.crear(transformacion);
            return ResponseEntity.status(HttpStatus.CREATED).body(nuevaTransformacion);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        }
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Transformacion> actualizar(@PathVariable Integer id, @Valid @RequestBody Transformacion transformacion) {
        try {
            Transformacion transformacionActualizada = transformacionService.actualizar(id, transformacion);
            return ResponseEntity.ok(transformacionActualizada);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Integer id) {
        try {
            transformacionService.eliminar(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
    
    @GetMapping("/buscar")
    public ResponseEntity<List<Transformacion>> buscarPorNombre(@RequestParam String nombre) {
        List<Transformacion> transformaciones = transformacionService.buscarPorNombre(nombre);
        return ResponseEntity.ok(transformaciones);
    }
}
