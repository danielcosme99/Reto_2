import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Sede } from '../../core/models/sede.model';

@Injectable({
  providedIn: 'root'
})
export class SedeService {
    private apiUrl = 'http://localhost:8080/api/sedes';

    constructor(private http: HttpClient) {}

    listarSedes(): Observable<Sede[]> {
        return this.http.get<Sede[]>(`${this.apiUrl}/listar`);
    }

    registrarSede(sede: any) {
        return this.http.post(`${this.apiUrl}/registrar`, sede, { responseType: 'text' });
    }

    actualizarSede(sede: any): Observable<string> {
        return this.http.put(`${this.apiUrl}/actualizar`, sede, { responseType: 'text' });
    }

    eliminarSede(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' });
    }
}
