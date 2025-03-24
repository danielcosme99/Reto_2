import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Distrito } from '../../core/models/distrito.model';

@Injectable({
  providedIn: 'root'
})

export class DistritoService {
    private apiUrl = 'http://localhost:8080/api/distritos';

    constructor(private http: HttpClient) {}

    listarDistritos(): Observable<Distrito[]> {
        return this.http.get<Distrito[]>(`${this.apiUrl}/listar`);
      }

      registrarDistrito(distrito: any) {
        return this.http.post(`${this.apiUrl}/registrar`, distrito, { responseType: 'text' });
      }
    
      actualizarDistrito(distrito: any): Observable<string> {
        return this.http.put(`${this.apiUrl}/actualizar`, distrito, { responseType: 'text' });
      }
    
      eliminarDistrito(id: number): Observable<string> {
        return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' });
      }
}