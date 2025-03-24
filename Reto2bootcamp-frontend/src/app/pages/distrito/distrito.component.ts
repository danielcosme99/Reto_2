import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { DistritoService } from '../../core/services/distrito.service';
import { Distrito } from '../../core/models/distrito.model';
import { DistritoDialogComponent } from '../../shared/dialogs/distrito-dialog/distrito-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableDataSource } from '@angular/material/table';
import { MatTableModule } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatSortModule } from '@angular/material/sort';
import { ConfirmDialogComponent } from '../../shared/dialogs/confirm-dialog/confirm-dialog.component';
import { MatButtonModule } from '@angular/material/button';



@Component({
  selector: 'app-distrito',
  templateUrl: './distrito.component.html',
  styleUrls: ['./distrito.component.scss'],
  imports: [ MatTableModule, MatIconModule,MatFormFieldModule, MatInputModule,MatSelectModule, MatSortModule,MatButtonModule ]
})
export class DistritoComponent implements OnInit {
  
  displayedColumns: string[] = ['idDistrito', 'nombre', 'nombreProvincia', 'acciones'];
  distritos: Distrito[] = [];
  dataSource = new MatTableDataSource<Distrito>([]);

  constructor(
    private distritoService: DistritoService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadDistritos();
  }

  loadDistritos() {
    this.distritoService.listarDistritos().subscribe({
      next: (res) => {this.distritos = res, this.dataSource = new MatTableDataSource(res);},
      error: (err) => console.error('Error al cargar distritos:', err)
    });
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

