package com.dragonball.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "batallas")
public class Batalla {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    
    @NotBlank(message = "El nombre es obligatorio")
    @Size(max = 150, message = "El nombre no puede exceder 150 caracteres")
    @Column(nullable = false)
    private String nombre;
    
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "saga_id")
    private Saga saga;
    
    @Size(max = 100, message = "La ubicación no puede exceder 100 caracteres")
    private String ubicacion;
    
    @Column(columnDefinition = "TEXT")
    private String resultado;
    
    private LocalDate fecha;
    
    @ManyToMany
    @JoinTable(
        name = "participantes_batalla",
        joinColumns = @JoinColumn(name = "batalla_id"),
        inverseJoinColumns = @JoinColumn(name = "personaje_id")
    )
    @JsonIgnoreProperties({"tecnicas", "transformaciones", "raza", "planeta"})
    private List<Personaje> participantes;
    
    // Constructors
    public Batalla() {}
    
    public Batalla(String nombre, Saga saga, String ubicacion, String resultado, LocalDate fecha) {
        this.nombre = nombre;
        this.saga = saga;
        this.ubicacion = ubicacion;
        this.resultado = resultado;
        this.fecha = fecha;
    }
    
    // Getters and Setters
    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    
    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }
    
    public Saga getSaga() { return saga; }
    public void setSaga(Saga saga) { this.saga = saga; }
    
    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }
    
    public String getResultado() { return resultado; }
    public void setResultado(String resultado) { this.resultado = resultado; }
    
    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }
    
    public List<Personaje> getParticipantes() { return participantes; }
    public void setParticipantes(List<Personaje> participantes) { this.participantes = participantes; }
}