import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { HospitalDialogComponent } from '../../shared/dialogs/hospital-dialog/hospital-dialog.component';
import { HospitalService } from '../../core/services/hospital.service';
import { Hospital } from '../../core/models/hospital.model';
import { DeleteHospitalDialogComponent } from '../../shared/dialogs/delete-dialog/delete-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class HomeComponent {
  loadingChangeState: boolean = false;
  displayedColumns: string[] = ['idHospital', 'nombre', 'antiguedad', 'area', 'nombreSede', 'nombreDistrito', 'nombreGerente', 'nombreCondicion', 'actions'];
  hospitales: Hospital[] = [];
  dataSource = new MatTableDataSource<Hospital>([]);
  
  terminoBusqueda: string = '';
  criterioSeleccionado: keyof Hospital = 'nombre'; 

  setCriterioSeleccionado(nuevoCriterio: keyof Hospital) {
    this.criterioSeleccionado = nuevoCriterio;
    this.terminoBusqueda = ''; 
    this.aplicarFiltro(); 
  }
  
  @ViewChild(MatSort) sort!: MatSort;

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
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort; // Inicialmente, muestra todos
      },
      (error) => {
        console.error("Error al obtener hospitales", error);
      }
    );
  }

  aplicarFiltro() {
    const filtro = this.terminoBusqueda.toLowerCase().trim();
    this.dataSource.filter = filtro;
    this.dataSource.filterPredicate = (data: Hospital, filtro: string) => {
      const valor = (data[this.criterioSeleccionado] as string)?.toLowerCase();
      return valor?.includes(filtro);
    };
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
