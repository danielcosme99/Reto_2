import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Condicion } from '../../core/models/condicion.model';

@Injectable({
  providedIn: 'root'
})
export class CondicionService {
    private apiUrl = 'http://localhost:8080/api/condiciones';

    constructor(private http: HttpClient) {}

    listarCondiciones(): Observable<Condicion[]> {
        return this.http.get<Condicion[]>(`${this.apiUrl}/listar`);
    }

    registrarCondicion(condicion: any) {
        return this.http.post(`${this.apiUrl}/registrar`, condicion, { responseType: 'text' });
    }

    actualizarCondicion(condicion: any): Observable<string> {
        return this.http.put(`${this.apiUrl}/actualizar`, condicion, { responseType: 'text' });
    }

    eliminarCondicion(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' });
    }
}
