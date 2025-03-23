import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { HospitalDialogComponent } from '../../shared/dialogs/hospital-dialog/hospital-dialog.component';
import { HospitalService } from '../../core/services/hospital.service';
import { Observable } from 'rxjs';
import { Hospital } from '../../core/models/hospital.model';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { DeleteHospitalDialogComponent } from '../../shared/dialogs/delete-dialog/delete-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule]
})
export class HomeComponent {
  loadingChangeState: boolean = false;
  displayedColumns: string[] = ['idHospital', 'nombre', 'antiguedad', 'area', 'nombreSede', 'nombreDistrito', 'nombreGerente', 'nombreCondicion', 'actions'];
  hospitales: Hospital[] = [];
  hospitalesFiltrados: Hospital[] = [];
  filtro: string = '';

  constructor(
    private dialog: MatDialog,
    private hospitalService: HospitalService
  ) {}

  ngOnInit() {
    this.loadHospitales();
  }

  loadHospitales() {
    this.hospitalService.listarHospitales().subscribe(
      (res: Hospital[]) => {
        this.hospitales = res;
        this.hospitalesFiltrados = res; // Inicialmente, muestra todos
      },
      (error) => {
        console.error("Error al obtener hospitales", error);
      }
    );
  }

  aplicarFiltro() {
    const filtroLower = this.filtro.toLowerCase().trim();
    this.hospitalesFiltrados = this.hospitales.filter(hospital => 
      hospital.nombre.toLowerCase().includes(filtroLower) ||
      hospital.nombreDistrito.toLowerCase().includes(filtroLower) ||
      hospital.nombreGerente.toLowerCase().includes(filtroLower)
    );
  }

  addHospital() {
    const dialogRef = this.dialog.open(HospitalDialogComponent, {
      width: '550px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadHospitales();
    });
  }

  deleteHospital(hospital: any) {
    const dialogRef = this.dialog.open(DeleteHospitalDialogComponent, {
      width: '400px',
      data: { idHospital: hospital.idHospital }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadHospitales();
    });
  }

  editHospital(hospital: Hospital) {
    const dialogRef = this.dialog.open(HospitalDialogComponent, {
      width: '550px',
      data: hospital
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadHospitales();
    });
  }
}
