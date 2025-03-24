package com.bootcamp.reto2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "DISTRITO")
public class Distrito {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idDistrito;
    private Long idProvincia;
    private String nombreProvincia;
    private String descDistrito;
    
	public Long getIdDistrito() {
		return idDistrito;
	}
	public void setIdDistrito(Long idDistrito) {
		this.idDistrito = idDistrito;
	}
	public Long getIdProvincia() {
		return idProvincia;
	}
	public void setIdProvincia(Long idProvincia) {
		this.idProvincia = idProvincia;
	}
	public String getDescDistrito() {
		return descDistrito;
	}
	public void setDescDistrito(String descDistrito) {
		this.descDistrito = descDistrito;
	}
	public String getNombreProvincia() {
		return nombreProvincia;
	}
	public void setNombreProvincia(String nombreProvincia) {
		this.nombreProvincia = nombreProvincia;
	}
    
    
}
