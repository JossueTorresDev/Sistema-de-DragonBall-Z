package com.dragonball.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "planetas")
public class Planeta {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    @Column(unique = true, nullable = false)
    private String nombre;
    
    @Size(max = 100, message = "El sistema origen no puede exceder 100 caracteres")
    @Column(name = "sistema_origen")
    private String sistemaOrigen;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @OneToMany(mappedBy = "planeta", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Personaje> personajes;
    
    // Constructors
    public Planeta() {}
    
    public Planeta(String nombre, String sistemaOrigen, String descripcion) {
        this.nombre = nombre;
        this.sistemaOrigen = sistemaOrigen;
        this.descripcion = descripcion;
    }
    
    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public String getSistemaOrigen() { return sistemaOrigen; }
    public void setSistemaOrigen(String sistemaOrigen) { this.sistemaOrigen = sistemaOrigen; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public List<Personaje> getPersonajes() { return personajes; }
    public void setPersonajes(List<Personaje> personajes) { this.personajes = personajes; }
}