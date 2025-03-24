import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Provincia } from '../../core/models/provincia.model';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {
  private apiUrl = 'http://localhost:8080/api/provincias';

  constructor(private http: HttpClient) {}

  listarProvincias(): Observable<Provincia[]> {
    return this.http.get<Provincia[]>(`${this.apiUrl}/listar`);
  }

  registrarProvincia(provincia: any) {
    return this.http.post(`${this.apiUrl}/registrar`, provincia, { responseType: 'text' });
  }

  actualizarProvincia(provincia: any): Observable<string> {
    return this.http.put(`${this.apiUrl}/actualizar`, provincia, { responseType: 'text' });
  }

  eliminarProvincia(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' });
  }
}
