import { Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { GerenteService } from '../../core/services/gerente.service';
import { Gerente } from '../../core/models/gerente.model';
import { GerenteDialogComponent } from '../../shared/dialogs/gerente-dialog/gerente-dialog.component';
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
  selector: 'app-gerente',
  templateUrl: './gerente.component.html',
  styleUrls: ['./gerente.component.scss'],
  imports: [MatButtonModule, CommonModule, MatIconModule, FormsModule, MatTableModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule]
})
export class GerenteComponent implements OnInit {
  loadingChangeState: boolean = false;
  displayedColumns: string[] = ['IDGERENTE', 'DESCGERENTE', 'acciones'];
  gerentes: Gerente[] = [];
  dataSource = new MatTableDataSource<Gerente>([]);

  terminoBusqueda: string = '';
  criterioSeleccionado: keyof Gerente = 'DESCGERENTE'; 

  setCriterioSeleccionado(nuevoCriterio: keyof Gerente) {
        this.criterioSeleccionado = nuevoCriterio;
        this.terminoBusqueda = '';
        this.aplicarFiltro(); 
      }

      @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private gerenteService: GerenteService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadGerentes();
  }

  loadGerentes() {
      this.gerenteService.listarGerentes().subscribe(
        (res: Gerente[]) => {
          this.gerentes = res;
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
          this.dataSource.filterPredicate = (data: Gerente, filtro: string) => {
            const valor = (data[this.criterioSeleccionado] as string)?.toLowerCase();
            return valor?.includes(filtro);
          };
          console.log('filtro', filtro);
        }

  addGerente() {
    const dialogRef = this.dialog.open(GerenteDialogComponent, {
      width: '400px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadGerentes();
      }
    });
  }

  editGerente(gerente: Gerente) {
    const dialogRef = this.dialog.open(GerenteDialogComponent, {
      width: '400px',
      data: gerente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) this.loadGerentes();
    });
  }

  confirmDelete(idGerente: number) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
      data: { message: '¿Está seguro de que desea eliminar este gerente?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.eliminarGerente(idGerente);
      }
    });
  }

  eliminarGerente(idGerente: number) {
    console.log('Eliminando gerente con ID:', idGerente);
    this.gerenteService.eliminarGerente(idGerente).subscribe({
      next: () => {
        console.log('Gerente eliminado correctamente');
        this.loadGerentes();
      },
      error: (err) => console.error('Error al eliminar gerente:', err)
    });
  }
}
