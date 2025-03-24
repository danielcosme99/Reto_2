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

import com.bootcamp.reto2.model.Gerente;
import com.bootcamp.reto2.service.GerenteService;

@RestController
@RequestMapping("/api/gerentes")
@CrossOrigin(origins = "http://localhost:4200")
public class GerenteController {
    private final GerenteService gerenteService;

    public GerenteController(GerenteService gerenteService) {
        this.gerenteService = gerenteService;
    }

    @PostMapping("/registrar")
    public ResponseEntity<String> registrarGerente(@RequestBody Gerente gerente) {
        try {
            gerenteService.registrarGerente(gerente);
            return ResponseEntity.ok("✅ Gerente registrado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al registrar gerente: " + e.getMessage());
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<String> actualizarGerente(@RequestBody Gerente gerente) {
        try {
            gerenteService.actualizarGerente(gerente);
            return ResponseEntity.ok("✅ Gerente actualizado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al actualizar gerente: " + e.getMessage());
        }
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<String> eliminarGerente(@PathVariable Long id) {
        try {
            gerenteService.eliminarGerente(id);
            return ResponseEntity.ok("✅ Gerente eliminado exitosamente.");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("❌ Error al eliminar gerente: " + e.getMessage());
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<List<Map<String, Object>>> listarGerentes() {
        return ResponseEntity.ok(gerenteService.listarGerentes());
    }
}
