package com.dragonball.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "transformaciones")
public class Transformacion {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    @Column(unique = true, nullable = false)
    private String nombre;
    
    @Column(name = "multiplicador_poder", precision = 10, scale = 2)
    private BigDecimal multiplicadorPoder;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @ManyToMany(mappedBy = "transformaciones")
    @JsonIgnore
    private List<Personaje> personajes;
    
    // Constructors
    public Transformacion() {}
    
    public Transformacion(String nombre, BigDecimal multiplicadorPoder, String descripcion) {
        this.nombre = nombre;
        this.multiplicadorPoder = multiplicadorPoder;
        this.descripcion = descripcion;
    }
    
    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public BigDecimal getMultiplicadorPoder() { return multiplicadorPoder; }
    public void setMultiplicadorPoder(BigDecimal multiplicadorPoder) { this.multiplicadorPoder = multiplicadorPoder; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public List<Personaje> getPersonajes() { return personajes; }
    public void setPersonajes(List<Personaje> personajes) { this.personajes = personajes; }
}