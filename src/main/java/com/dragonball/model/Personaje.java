package com.dragonball.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.util.List;

@Entity
@Table(name = "personajes")
public class Personaje {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 100, message = "El nombre no puede exceder 100 caracteres")
    @Column(nullable = false)
    private String nombre;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "raza_id")
    private Raza raza;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "planeta_id")
    private Planeta planeta;
    
    @Column(name = "nivel_poder")
    private Long nivelPoder;
    
    @Size(max = 100, message = "La afiliación no puede exceder 100 caracteres")
    private String afiliacion;
    
    @Column(columnDefinition = "TEXT")
    private String descripcion;
    
    @Column(name = "eliminado")
    private Boolean eliminado = false;
    
    @ManyToMany
    @JoinTable(
        name = "personaje_tecnica",
        joinColumns = @JoinColumn(name = "personaje_id"),
        inverseJoinColumns = @JoinColumn(name = "tecnica_id")
    )
    @JsonIgnoreProperties("personajes")
    private List<Tecnica> tecnicas;
    
    @ManyToMany
    @JoinTable(
        name = "personaje_transformacion",
        joinColumns = @JoinColumn(name = "personaje_id"),
        inverseJoinColumns = @JoinColumn(name = "transformacion_id")
    )
    @JsonIgnoreProperties("personajes")
    private List<Transformacion> transformaciones;
    
    // Constructors
    public Personaje() {}
    
    public Personaje(String nombre, Raza raza, Planeta planeta, Long nivelPoder, String afiliacion, String descripcion) {
        this.nombre = nombre;
        this.raza = raza;
        this.planeta = planeta;
        this.nivelPoder = nivelPoder;
        this.afiliacion = afiliacion;
        this.descripcion = descripcion;
        this.eliminado = false;
    }
    
    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public Raza getRaza() { return raza; }
    public void setRaza(Raza raza) { this.raza = raza; }
    
    public Planeta getPlaneta() { return planeta; }
    public void setPlaneta(Planeta planeta) { this.planeta = planeta; }
    
    public Long getNivelPoder() { return nivelPoder; }
    public void setNivelPoder(Long nivelPoder) { this.nivelPoder = nivelPoder; }
    
    public String getAfiliacion() { return afiliacion; }
    public void setAfiliacion(String afiliacion) { this.afiliacion = afiliacion; }
    
    public String getDescripcion() { return descripcion; }
    public void setDescripcion(String descripcion) { this.descripcion = descripcion; }
    
    public Boolean getEliminado() { return eliminado; }
    public void setEliminado(Boolean eliminado) { this.eliminado = eliminado; }
    
    public List<Tecnica> getTecnicas() { return tecnicas; }
    public void setTecnicas(List<Tecnica> tecnicas) { this.tecnicas = tecnicas; }
    
    public List<Transformacion> getTransformaciones() { return transformaciones; }
    public void setTransformaciones(List<Transformacion> transformaciones) { this.transformaciones = transformaciones; }
}