package com.bootcamp.reto2.service;

import com.bootcamp.reto2.repository.*;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;

@Service
public class ReferenciaService {
    private final SedeRepository sedeRepository;
    private final DistritoRepository distritoRepository;
    private final GerenteRepository gerenteRepository;
    private final CondicionRepository condicionRepository;
    private final ProvinciaRepository provinciaRepository;

    public ReferenciaService(ProvinciaRepository provinciaRepository, SedeRepository sedeRepository, DistritoRepository distritoRepository,
                             GerenteRepository gerenteRepository, CondicionRepository condicionRepository) {
    	this.provinciaRepository = provinciaRepository;
    	this.sedeRepository = sedeRepository;
        this.distritoRepository = distritoRepository;
        this.gerenteRepository = gerenteRepository;
        this.condicionRepository = condicionRepository;
    }

    public List<Map<String, Object>> obtenerSedes() {
        return sedeRepository.obtenerSedes();
    }

    public List<Map<String, Object>> obtenerDistritos() {
        return distritoRepository.obtenerDistritos();
    }

    public List<Map<String, Object>> obtenerGerentes() {
        return gerenteRepository.obtenerGerentes();
    }

    public List<Map<String, Object>> obtenerCondiciones() {
        return condicionRepository.obtenerCondiciones();
    }
    public List<Map<String, Object>> obtenerProvincias() {
        return provinciaRepository.obtenerProvincias();
    }
}
