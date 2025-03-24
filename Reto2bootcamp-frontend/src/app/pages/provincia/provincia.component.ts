import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { ProvinciaService } from '../../core/services/provincia.service';
import { Provincia } from '../../core/models/provincia.model';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { ProvinciaDialogComponent } from '../../shared/dialogs/provincia-dialog/provincia-dialog.component';

import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-provincia',
  templateUrl: './provincia.component.html',
  styleUrls: ['./provincia.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class ProvinciaComponent implements OnInit {
  loadingChangeState: boolean = false;
  displayedColumns: string[] = ['IDPROVINCIA', 'DESCPROVINCIA', 'acciones'];
  provincias: Provincia[] = [];
  dataSource = new MatTableDataSource<Provincia>([]);

  terminoBusqueda: string = '';
  criterioSeleccionado: keyof Provincia = 'DESCPROVINCIA';

  setCriterioSeleccionado(nuevoCriterio: keyof Provincia) {
        this.criterioSeleccionado = nuevoCriterio;
        this.terminoBusqueda = '';
        this.aplicarFiltro(); 
      }

      @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private provinciaService: ProvinciaService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadProvincias();
  }

  loadProvincias() {
      this.provinciaService.listarProvincias().subscribe(
        (res: Provincia[]) => {
          this.provincias = res;
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error("Error al obtener condiciones", error);
        }
      );
    }

  aplicarFiltro() {
        const filtro = this.terminoBusqueda.toLowerCase().trim();
        this.dataSource.filter = filtro;
        this.dataSource.filterPredicate = (data: Provincia, filtro: string) => {
          const valor = (data[this.criterioSeleccionado] as string)?.toLowerCase();
          return valor?.includes(filtro);
        };
        console.log('filtro', filtro);
      }

  addProvincia() {
    const dialogRef = this.dialog.open(ProvinciaDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProvincias();
    });
  }

  editProvincia(provincia: Provincia) {
    const dialogRef = this.dialog.open(ProvinciaDialogComponent, {
      width: '400px',
      data: provincia
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadProvincias();
    });
  }

  confirmDelete(idProvincia: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar esta provincia?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.eliminarProvincia(idProvincia);
    });
  }

  eliminarProvincia(idProvincia: number) {
    this.provinciaService.eliminarProvincia(idProvincia).subscribe({
      next: () => {
        console.log('Provincia eliminada correctamente');
        this.loadProvincias();
      },
      error: (err) => console.error('Error al eliminar provincia:', err)
    });
  }
}
