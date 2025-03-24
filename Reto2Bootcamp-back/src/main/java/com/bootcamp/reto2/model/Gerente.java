package com.bootcamp.reto2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "GERENTE")
public class Gerente {
	
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idGerente;
    private String descGerente;
    
	public Long getIdGerente() {
		return idGerente;
	}
	public void setIdGerente(Long idGerente) {
		this.idGerente = idGerente;
	}
	public String getDescGerente() {
		return descGerente;
	}
	public void setDescGerente(String descGerente) {
		this.descGerente = descGerente;
	}
    
    

}
