package com.bootcamp.reto2.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "SEDE")
public class Sede {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idSede;
    private String descSede;
	public Long getIdSede() {
		return idSede;
	}
	public void setIdSede(Long idSede) {
		this.idSede = idSede;
	}
	public String getDescSede() {
		return descSede;
	}
	public void setDescSede(String descSede) {
		this.descSede = descSede;
	}
    
    
}
