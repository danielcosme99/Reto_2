package com.bootcamp.reto2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "CONDICION")
public class Condicion {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCondicion;
    private String descCondicion;
	public Long getIdCondicion() {
		return idCondicion;
	}
	public void setIdCondicion(Long idCondicion) {
		this.idCondicion = idCondicion;
	}
	public String getDescCondicion() {
		return descCondicion;
	}
	public void setDescCondicion(String descCondicion) {
		this.descCondicion = descCondicion;
	}

    
}
