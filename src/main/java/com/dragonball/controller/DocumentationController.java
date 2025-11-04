package com.dragonball.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DocumentationController {
    
    @GetMapping
    public ResponseEntity<Map<String, Object>> getApiInfo() {
        Map<String, Object> info = new HashMap<>();
        info.put("name", "Dragon Ball API");
        info.put("version", "1.0.0");
        info.put("description", "API para gestionar la base de datos de Dragon Ball");
        
        Map<String, Object> endpoints = new HashMap<>();
        
        // Personajes endpoints
        Map<String, String> personajes = new HashMap<>();
        personajes.put("GET /api/personajes", "Listar todos los personajes activos");
        personajes.put("GET /api/personajes/eliminados", "Listar personajes eliminados");
        personajes.put("GET /api/personajes/{id}", "Buscar personaje por ID");
        personajes.put("POST /api/personajes", "Crear nuevo personaje");
        personajes.put("PUT /api/personajes/{id}", "Actualizar personaje");
        personajes.put("DELETE /api/personajes/{id}", "Eliminación lógica de personaje");
        personajes.put("PUT /api/personajes/{id}/restaurar", "Restaurar personaje eliminado");
        personajes.put("GET /api/personajes/buscar/nombre?nombre=", "Buscar por nombre");
        personajes.put("GET /api/personajes/buscar/raza/{razaId}", "Buscar por raza");
        personajes.put("GET /api/personajes/buscar/planeta/{planetaId}", "Buscar por planeta");
        personajes.put("GET /api/personajes/buscar/poder?nivelPoder=", "Buscar por nivel de poder mayor a");
        personajes.put("GET /api/personajes/buscar/afiliacion?afiliacion=", "Buscar por afiliación");
        personajes.put("GET /api/personajes/ordenados-por-poder", "Listar ordenados por poder");
        endpoints.put("personajes", personajes);
        
        // Razas endpoints
        Map<String, String> razas = new HashMap<>();
        razas.put("GET /api/razas", "Listar todas las razas");
        razas.put("GET /api/razas/{id}", "Buscar raza por ID");
        razas.put("POST /api/razas", "Crear nueva raza");
        razas.put("PUT /api/razas/{id}", "Actualizar raza");
        razas.put("DELETE /api/razas/{id}", "Eliminar raza");
        razas.put("GET /api/razas/buscar?nombre=", "Buscar raza por nombre");
        endpoints.put("razas", razas);
        
        // Planetas endpoints
        Map<String, String> planetas = new HashMap<>();
        planetas.put("GET /api/planetas", "Listar todos los planetas");
        planetas.put("GET /api/planetas/{id}", "Buscar planeta por ID");
        planetas.put("POST /api/planetas", "Crear nuevo planeta");
        planetas.put("PUT /api/planetas/{id}", "Actualizar planeta");
        planetas.put("DELETE /api/planetas/{id}", "Eliminar planeta");
        planetas.put("GET /api/planetas/buscar/nombre?nombre=", "Buscar planeta por nombre");
        planetas.put("GET /api/planetas/buscar/sistema?sistema=", "Buscar planeta por sistema");
        endpoints.put("planetas", planetas);
        
        // Sagas endpoints
        Map<String, String> sagas = new HashMap<>();
        sagas.put("GET /api/sagas", "Listar todas las sagas");
        sagas.put("GET /api/sagas/{id}", "Buscar saga por ID");
        sagas.put("POST /api/sagas", "Crear nueva saga");
        sagas.put("PUT /api/sagas/{id}", "Actualizar saga");
        sagas.put("DELETE /api/sagas/{id}", "Eliminar saga");
        sagas.put("GET /api/sagas/buscar?nombre=", "Buscar saga por nombre");
        endpoints.put("sagas", sagas);
        
        // Técnicas endpoints
        Map<String, String> tecnicas = new HashMap<>();
        tecnicas.put("GET /api/tecnicas", "Listar todas las técnicas");
        tecnicas.put("GET /api/tecnicas/{id}", "Buscar técnica por ID");
        tecnicas.put("POST /api/tecnicas", "Crear nueva técnica");
        tecnicas.put("PUT /api/tecnicas/{id}", "Actualizar técnica");
        tecnicas.put("DELETE /api/tecnicas/{id}", "Eliminar técnica");
        tecnicas.put("GET /api/tecnicas/buscar/nombre?nombre=", "Buscar técnica por nombre");
        tecnicas.put("GET /api/tecnicas/buscar/tipo?tipo=", "Buscar técnica por tipo");
        endpoints.put("tecnicas", tecnicas);
        
        // Transformaciones endpoints
        Map<String, String> transformaciones = new HashMap<>();
        transformaciones.put("GET /api/transformaciones", "Listar todas las transformaciones");
        transformaciones.put("GET /api/transformaciones/{id}", "Buscar transformación por ID");
        transformaciones.put("POST /api/transformaciones", "Crear nueva transformación");
        transformaciones.put("PUT /api/transformaciones/{id}", "Actualizar transformación");
        transformaciones.put("DELETE /api/transformaciones/{id}", "Eliminar transformación");
        transformaciones.put("GET /api/transformaciones/buscar?nombre=", "Buscar transformación por nombre");
        endpoints.put("transformaciones", transformaciones);
        
        // Batallas endpoints
        Map<String, String> batallas = new HashMap<>();
        batallas.put("GET /api/batallas", "Listar todas las batallas");
        batallas.put("GET /api/batallas/{id}", "Buscar batalla por ID");
        batallas.put("POST /api/batallas", "Crear nueva batalla");
        batallas.put("PUT /api/batallas/{id}", "Actualizar batalla");
        batallas.put("DELETE /api/batallas/{id}", "Eliminar batalla");
        batallas.put("GET /api/batallas/buscar/nombre?nombre=", "Buscar batalla por nombre");
        batallas.put("GET /api/batallas/buscar/saga/{sagaId}", "Buscar batallas por saga");
        batallas.put("GET /api/batallas/buscar/ubicacion?ubicacion=", "Buscar batalla por ubicación");
        endpoints.put("batallas", batallas);
        
        info.put("endpoints", endpoints);
        
        return ResponseEntity.ok(info);
    }
}