import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Gerente } from '../../core/models/gerente.model';

@Injectable({
  providedIn: 'root'
})
export class GerenteService {
    private apiUrl = 'http://localhost:8080/api/gerentes';

    constructor(private http: HttpClient) {}

    listarGerentes(): Observable<Gerente[]> {
        return this.http.get<Gerente[]>(`${this.apiUrl}/listar`);
    }

    registrarGerente(gerente: any) {
        return this.http.post(`${this.apiUrl}/registrar`, gerente, { responseType: 'text' });
    }

    actualizarGerente(gerente: any): Observable<string> {
        return this.http.put(`${this.apiUrl}/actualizar`, gerente, { responseType: 'text' });
    }

    eliminarGerente(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' });
    }
}
