package com.bootcamp.reto2.controller;

import com.bootcamp.reto2.service.ReferenciaService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/hospitales")
@CrossOrigin(origins = "http://localhost:4200") // Permite el acceso desde Angular
public class ReferenciaController {
    private final ReferenciaService referenciaService;

    public ReferenciaController(ReferenciaService referenciaService) {
        this.referenciaService = referenciaService;
    }

    @GetMapping("/sedes")
    public List<Map<String, Object>> obtenerSedes() {
        return referenciaService.obtenerSedes();
    }

    @GetMapping("/distritos")
    public List<Map<String, Object>> obtenerDistritos() {
        return referenciaService.obtenerDistritos();
    }

    @GetMapping("/gerentes")
    public List<Map<String, Object>> obtenerGerentes() {
        return referenciaService.obtenerGerentes();
    }

    @GetMapping("/condiciones")
    public List<Map<String, Object>> obtenerCondiciones() {
        return referenciaService.obtenerCondiciones();
    }
    
    @GetMapping("/provincias")
    public List<Map<String, Object>> obtenerProvincias() {
        return referenciaService.obtenerProvincias();
    }
}
