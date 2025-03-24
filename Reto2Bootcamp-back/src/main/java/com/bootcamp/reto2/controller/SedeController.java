package com.bootcamp.reto2.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bootcamp.reto2.model.Sede;
import com.bootcamp.reto2.service.SedeService;

@RestController
@RequestMapping("/api/sedes")
@CrossOrigin(origins = "http://localhost:4200")
public class SedeController {
    private final SedeService sedeService;

    public SedeController(SedeService sedeService) {
        this.sedeService = sedeService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarSede(@RequestBody Sede sede) {
        try {
            sedeService.registrarSede(sede);
            return ResponseEntity.ok("✅ Sede registrada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al registrar sede: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarSede(@RequestBody Sede sede) {
        try {
            sedeService.actualizarSede(sede);
            return ResponseEntity.ok("✅ Sede actualizada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al actualizar sede: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarSede(@PathVariable Long id) {
        try {
            sedeService.eliminarSede(id);
            return ResponseEntity.ok("✅ Sede eliminada exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al eliminar sede: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Map<String, Object>>> listarSedes() {
        return ResponseEntity.ok(sedeService.listarSedes());
    }
}
