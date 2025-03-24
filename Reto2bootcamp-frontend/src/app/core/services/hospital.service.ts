import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {
  private apiUrl = 'http://localhost:8080/api/hospitales';

  constructor(private http: HttpClient) {}

  listarHospitales(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/listar`);
  }

  registrarHospital(hospital: any) {
    return this.http.post(`${this.apiUrl}/registrar`, hospital, { responseType: 'text' });
  }
  

  actualizarHospital(hospital: any): Observable<string> {
    return this.http.put(`${this.apiUrl}/actualizar`, hospital,{ responseType: 'text' });
  }

  eliminarHospital(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/eliminar/${id}`, { responseType: 'text' });
  }
  

  getSedes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/sedes`);
  }

  listarDistritos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/distritos`);
  }

  getGerentes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/gerentes`);
  }

  getCondiciones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/condiciones`);
  }
  getProvincias(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/provincias`);
  }
}