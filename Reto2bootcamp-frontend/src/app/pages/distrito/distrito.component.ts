import { Component, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { DistritoService } from '../../core/services/distrito.service';
import { Distrito } from '../../core/models/distrito.model';
import { DistritoDialogComponent } from '../../shared/dialogs/distrito-dialog/distrito-dialog.component';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';


@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class DistritoComponent{
  
  displayedColumns: string[] = ['IDDISTRITO', 'DESCDISTRITO', 'PROVINCIA', 'acciones'];
  distritos: Distrito[] = [];
  dataSource = new MatTableDataSource<Distrito>([]);

    terminoBusqueda: string = '';
    criterioSeleccionado: keyof Distrito = 'DESCDISTRITO'; 

  setCriterioSeleccionado(nuevoCriterio: keyof Distrito) {
      this.criterioSeleccionado = nuevoCriterio;
      this.terminoBusqueda = ''; // 🔹 Limpiar la barra de búsqueda
      this.aplicarFiltro(); // 🔹 Aplicar filtro para que se restablezca la lista
    }

  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private distritoService: DistritoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDistritos();
  }

  loadDistritos() {
    this.distritoService.listarDistritos().subscribe(
          (res: Distrito[]) => {
            this.distritos = res;
            this.dataSource = new MatTableDataSource(res);
            this.dataSource.sort = this.sort; 
          },
          (error) => {
            console.error("Error al obtener hospitales", error);
          }
        );
  }

  aplicarFiltro() {
      const filtro = this.terminoBusqueda.toLowerCase().trim();
      this.dataSource.filter = filtro;
      this.dataSource.filterPredicate = (data: Distrito, filtro: string) => {
        const valor = (data[this.criterioSeleccionado] as string)?.toLowerCase();
        return valor?.includes(filtro);
      };
    }

  addDistrito() {
    const dialogRef = this.dialog.open(DistritoDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadDistritos();
      }
    });
  }
  editDistrito(distrito: Distrito) {
      const dialogRef = this.dialog.open(DistritoDialogComponent, {
        width: '400px',
        data: distrito
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) this.loadDistritos();
      });
    }

  confirmDelete(idDistrito: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar este distrito?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarDistrito(idDistrito);
      }
    });
  }

  eliminarDistrito(idDistrito: number) {
    console.log('Eliminando distrito con ID:', idDistrito);
    this.distritoService.eliminarDistrito(idDistrito).subscribe({
      next: () => {
        console.log('Distrito eliminado correctamente');
        this.loadDistritos();
      },
      error: (err) => console.error('Error al eliminar distrito:', err)
    });
  }
}

